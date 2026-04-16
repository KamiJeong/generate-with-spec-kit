# Spec Drift Report

Generated: 2026-04-16T22:44:09+09:00
Project: generate-with-spec-kit

## Summary

| Category | Count |
|----------|-------|
| Specs Analyzed | 1 (active: 023-publish-package-pages) |
| Requirements Checked | 17 (FRx12 + SCx5) |
| Aligned | 17 (100%) |
| Drifted | 0 (0%) |
| Not Implemented | 0 (0%) |
| Unspecced Code | 0 |

---

## Detailed Findings

### Spec: 023-publish-package-pages - 패키지 및 Storybook 자동 배포

#### Aligned

- **FR-001**: `main` release/workflow_dispatch publication boundary for `packages/tokens` and `packages/ui` → `.github/workflows/publish.yml`
- **FR-002**: explicit target packages and duplicate-version guards before package publish → `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs`
- **FR-003**: package manifests publish to GitHub Packages with restricted access and no `private: true` publish blocker → `packages/tokens/package.json`, `packages/ui/package.json`
- **FR-004**: package lint, test, and build gates run before publish → `.github/workflows/publish.yml`
- **FR-005**: approved `packages/ui` Storybook Pages deployment path on `main` → `.github/workflows/publish.yml`
- **FR-006**: Storybook build and test gates run before Pages artifact upload/deploy → `.github/workflows/publish.yml`
- **FR-007**: fork, pull request, non-main, and unauthorized event paths do not run publish/deploy jobs → `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs`
- **FR-008**: workflow uses `NODE_AUTH_TOKEN` without echoing tokens or writing secrets to summaries → `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs`
- **FR-009**: separate `tokens_publication`, `ui_publication`, and `storybook_publication` status outputs and summaries → `.github/workflows/publish.yml`
- **FR-010**: validation, credential, permission, duplicate-version, and external-service failure categories are explicitly emitted → `.github/workflows/publish.yml`
- **FR-011**: duplicate-version skip behavior and manual rerun inputs allow failed paths to rerun without republishing successful versions → `.github/workflows/publish.yml`
- **FR-012**: maintainer release triggers, permissions, credentials, outcomes, and recovery guidance documented → `README.md`
- **SC-001**: package status is surfaced in workflow summary; local validation gates passed.
- **SC-002**: untrusted contexts are blocked by job conditions and no pull_request trigger exists in the publish workflow.
- **SC-003**: Storybook Pages deployment reports `page_url` and deploys the static artifact after successful validation.
- **SC-004**: failure categories are machine-visible in per-job and consolidated summaries.
- **SC-005**: maintainer release setup is documented in the root README.

#### Drifted

None.

#### Not Implemented

None.

---

## Unspecced Code

None detected for the active feature. Changes are limited to release workflow, package publish metadata, verification script, README guidance, and Speckit task/report artifacts.

## Inter-Spec Conflicts

None detected.

## Recommendations

1. Keep the generated reports with the feature branch so reviewers can see post-implementation verification context.
2. After merge to `main`, run the workflow via a GitHub release or guarded manual dispatch to validate registry and Pages permissions in GitHub Actions.
