#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const workflowPath = path.join(root, '.github/workflows/publish.yml');
const rootPackagePath = path.join(root, 'package.json');
const tokensPackagePath = path.join(root, 'packages/tokens/package.json');
const uiPackagePath = path.join(root, 'packages/ui/package.json');

const failures = [];

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    failures.push(`Missing required file: ${path.relative(root, filePath)}`);
    return '';
  }
}

function readJson(filePath) {
  const text = readText(filePath);
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    failures.push(`Invalid JSON in ${path.relative(root, filePath)}: ${error.message}`);
    return {};
  }
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function contains(text, needle, message) {
  check(text.includes(needle), message);
}

function matches(text, pattern, message) {
  check(pattern.test(text), message);
}

const workflow = readText(workflowPath);
const rootPackage = readJson(rootPackagePath);
const packageManifests = [
  { path: tokensPackagePath, label: 'tokens', expectedName: '@myorg/tokens' },
  { path: uiPackagePath, label: 'ui', expectedName: '@myorg/ui' },
].map((entry) => ({ ...entry, manifest: readJson(entry.path) }));

check(
  rootPackage.scripts?.['release:verify'] === 'node scripts/verify-release-automation.mjs',
  'Root package.json must define scripts.release:verify',
);

contains(workflow, 'release:', 'publish.yml must run on release events');
contains(workflow, 'types: [published]', 'publish.yml must restrict release trigger to published releases');
contains(workflow, 'workflow_dispatch:', 'publish.yml must support guarded workflow_dispatch reruns');
contains(workflow, "github.event.release.target_commitish == 'main'", 'release publication must target main');
contains(workflow, "github.ref == 'refs/heads/main'", 'workflow_dispatch publication must run from main');
contains(workflow, '!github.event.repository.fork', 'publication jobs must skip fork contexts');
check(!/^\s*pull_request:/m.test(workflow), 'publish.yml intentionally has no pull_request trigger');

contains(workflow, 'packages/tokens', 'workflow must include packages/tokens target');
contains(workflow, 'packages/ui', 'workflow must include packages/ui target');
contains(workflow, '@myorg/tokens', 'workflow must include @myorg/tokens package identity');
contains(workflow, '@myorg/ui', 'workflow must include @myorg/ui package identity');

contains(workflow, 'actions/checkout@v4', 'workflow must checkout repository');
contains(workflow, 'pnpm/action-setup@v4', 'workflow must setup pnpm');
contains(workflow, 'actions/setup-node@v4', 'workflow must setup Node.js');
contains(workflow, 'node-version: 20', 'workflow must use Node.js 20');
contains(workflow, 'pnpm install --frozen-lockfile', 'workflow must use frozen pnpm install');
contains(workflow, 'registry-url: https://npm.pkg.github.com', 'workflow must configure GitHub Packages npm registry');

contains(workflow, 'contents: read', 'workflow jobs must use contents: read permission');
contains(workflow, 'packages: write', 'package publish jobs must use packages: write permission');
contains(workflow, 'pages: write', 'Pages deploy job must use pages: write permission');
contains(workflow, 'id-token: write', 'Pages deploy job must use id-token: write permission');

contains(workflow, 'pnpm --filter @myorg/tokens lint', 'tokens lint gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/tokens test', 'tokens test gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/tokens build', 'tokens build gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/ui lint', 'ui lint gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/ui test', 'ui test gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/ui build', 'ui build gate must run before publish');
contains(workflow, 'pnpm --filter @myorg/ui build-storybook', 'Storybook build gate must run before Pages deploy');
contains(workflow, 'test-storybook --url http://127.0.0.1:6006', 'Storybook test gate must run before Pages deploy');

contains(workflow, 'pnpm view', 'workflow must check duplicate package versions before publish');
contains(workflow, 'already_published', 'workflow must expose duplicate-version state');
contains(workflow, 'Verify tokens registry credential', 'tokens publish job must preflight registry credentials');
contains(workflow, 'Verify UI registry credential', 'ui publish job must preflight registry credentials');
contains(workflow, 'pnpm --filter @myorg/tokens publish', 'workflow must publish @myorg/tokens');
contains(workflow, 'pnpm --filter @myorg/ui publish', 'workflow must publish @myorg/ui');
contains(workflow, '--access restricted', 'package publish must use restricted access');
contains(workflow, 'tokens_publication', 'workflow summary must include tokens_publication');
contains(workflow, 'ui_publication', 'workflow summary must include ui_publication');
contains(workflow, 'storybook_publication', 'workflow summary must include storybook_publication');
contains(workflow, 'failure_category', 'workflow summary must include failure_category');
contains(workflow, 'failure_category="validation"', 'workflow must explicitly categorize validation failures');
contains(workflow, 'failure_category="credential"', 'workflow must explicitly categorize credential failures');
contains(workflow, 'failure_category="permission"', 'workflow must explicitly categorize permission failures');
contains(workflow, 'failure_category="duplicate-version"', 'workflow must explicitly categorize duplicate version failures');
contains(workflow, 'failure_category=external-service', 'workflow must explicitly categorize external service failures');

contains(workflow, 'actions/configure-pages@v5', 'workflow must configure GitHub Pages');
contains(workflow, 'actions/upload-pages-artifact@v3', 'workflow must upload Pages artifact');
contains(workflow, 'actions/deploy-pages@v4', 'workflow must deploy Pages');
contains(workflow, 'packages/ui/storybook-static', 'workflow must upload packages/ui/storybook-static');
contains(workflow, 'page_url', 'workflow must report Pages URL');

contains(workflow, 'NODE_AUTH_TOKEN', 'workflow must use NODE_AUTH_TOKEN for registry authentication');
check(!/echo\s+["']?\$NODE_AUTH_TOKEN/.test(workflow), 'workflow must not echo NODE_AUTH_TOKEN');
check(!/secrets\.[A-Z0-9_]+.*GITHUB_STEP_SUMMARY/.test(workflow), 'workflow must not write secrets to summary');
contains(workflow, 'rerun guidance', 'workflow must include rerun guidance in summary');

for (const { path: manifestPath, label, expectedName, manifest } of packageManifests) {
  check(manifest.name === expectedName, `${label} package name must remain ${expectedName}`);
  check(manifest.private !== true, `${label} package must not have private: true because it blocks publish`);
  check(
    manifest.publishConfig?.registry === 'https://npm.pkg.github.com',
    `${label} package must publish to https://npm.pkg.github.com`,
  );
  check(manifest.publishConfig?.access === 'restricted', `${label} package must publish with restricted access`);
  check(Array.isArray(manifest.files) && manifest.files.includes('dist'), `${label} package must include dist in files`);
  check(
    Boolean(manifest.repository?.url),
    `${path.relative(root, manifestPath)} must include repository metadata for GitHub Packages`,
  );
}

const tokensFiles = packageManifests.find((entry) => entry.label === 'tokens')?.manifest.files ?? [];
const uiFiles = packageManifests.find((entry) => entry.label === 'ui')?.manifest.files ?? [];
check(tokensFiles.includes('src/css/base.css'), 'tokens package must include src/css/base.css');
check(tokensFiles.includes('src/css/base.css.d.ts'), 'tokens package must include src/css/base.css.d.ts');
check(uiFiles.includes('src/index.css'), 'ui package must include src/index.css');
check(uiFiles.includes('src/index.css.d.ts'), 'ui package must include src/index.css.d.ts');

if (failures.length > 0) {
  console.error('Release automation verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Release automation verification passed.');
