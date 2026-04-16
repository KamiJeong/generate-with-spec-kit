# Research: 패키지 및 Storybook 자동 배포

## Decision: GitHub Packages npm registry에 `packages/tokens`, `packages/ui` 게시

**Decision**: `packages/tokens`와 `packages/ui`는 GitHub Packages npm registry(`https://npm.pkg.github.com`)로 게시한다. Workflow는 `main`의 승인된 release event에서만 publish job을 실행하고, package publication에는 최소 `contents: read`, `packages: write` 권한을 사용한다.

**Rationale**: GitHub Docs는 GitHub Packages npm registry 게시 시 `setup-node`의 `registry-url`을 `https://npm.pkg.github.com`으로 설정하고, repository package 게시에는 `GITHUB_TOKEN`과 `packages: write` permission을 사용할 수 있다고 설명한다. 이는 별도 외부 token을 줄이고 credential surface를 최소화한다.

**Alternatives considered**:

- npmjs.com private package: 별도 `NPM_TOKEN`과 npm organization/private package billing이 필요하므로 현재 "GitHub npm private package" 요구와 덜 맞다.
- manual local publish: credentials와 release provenance 관리가 분산되어 FR-008과 SC-005 달성이 어렵다.
- PAT classic 기본 사용: 다른 repository/package에 게시해야 할 때만 필요하므로 기본 경로로 채택하지 않는다.

**References**:

- https://docs.github.com/en/actions/tutorials/publish-packages/publish-nodejs-packages
- https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

## Decision: package manifest를 publish-ready 상태로 정리

**Decision**: `packages/tokens/package.json`와 `packages/ui/package.json`는 publish 가능한 metadata를 가져야 한다. 현재 `"private": true`는 npm publish를 막는 안전장치이므로 구현 단계에서 제거 또는 publish 전용 manifest 처리로 해결하고, `publishConfig.registry`와 repository metadata를 검토한다.

**Rationale**: 요구사항은 private package registry에 실제 게시하는 것이므로 package manager가 publish 자체를 거부하는 상태를 유지할 수 없다. Package visibility는 package.json의 `"private": true`가 아니라 GitHub Packages repository/organization permissions로 통제해야 한다.

**Alternatives considered**:

- `"private": true` 유지: accidental publish 방지는 가능하지만 자동 게시 요구를 충족하지 못한다.
- 배포 중 임시 manifest 생성: source manifest 변경을 줄일 수 있으나 workflow 복잡도가 증가한다. tasks 단계에서 repo 정책에 맞춰 단순한 방법을 선택한다.
- package 이름 변경: 현재 `@myorg/tokens`, `@myorg/ui` scope를 유지하되, GitHub owner/org scope와 맞지 않으면 구현 task에서 명시적으로 조정한다.

## Decision: `packages/ui` Storybook은 GitHub Pages custom workflow로 배포

**Decision**: `packages/ui`의 `build-storybook` 산출물(`storybook-static`)을 Pages artifact로 업로드하고 GitHub Pages deploy job에서 배포한다. Workflow는 build와 deploy job을 분리하고 deploy job에는 `pages: write`, `id-token: write` 권한을 부여한다.

**Rationale**: GitHub Pages custom workflow는 `configure-pages`, `upload-pages-artifact`, `deploy-pages` actions를 사용하는 패턴을 제공한다. Build와 deploy를 분리하면 Storybook validation 실패 시 기존 Pages site 보존 요구(FR-006)를 만족하기 쉽다.

**Alternatives considered**:

- `gh-pages` branch push: 추가 branch state와 write logic이 필요하고 Pages artifact/deploy 표준 경로보다 운영 surface가 크다.
- Storybook을 npm package artifact로만 배포: UI 문서 접근성 요구와 GitHub Pages destination 요구를 충족하지 못한다.
- 기존 `storybook-test.yml`에 deploy 추가: 테스트와 배포 책임이 섞이므로 release workflow에서 명시적으로 분리한다.

**References**:

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Decision: publish와 deploy는 `main` release boundary와 least privilege permissions 사용

**Decision**: publish/deploy job은 `main`에서만 실행되며 pull request, fork, non-main branch에서는 validation만 허용한다. Workflow permissions는 job 단위로 최소화한다.

**Rationale**: Spec clarification이 `main` branch를 publication boundary로 지정했다. GitHub Actions는 `GITHUB_TOKEN` permission을 workflow 또는 job 수준에서 제한할 수 있으므로 package publish와 Pages deploy에 필요한 권한만 부여한다.

**Alternatives considered**:

- 모든 push에서 publish: duplicate version, credential exposure, accidental release 위험이 높다.
- PR에서 dry-run publish: registry credential 접근이 필요할 수 있어 fork/PR 보안 boundary와 맞지 않는다.
- global write permissions: 구현은 간단하지만 FR-008과 least privilege 원칙에 맞지 않는다.

**References**:

- https://docs.github.com/en/actions/security-guides/automatic-token-authentication

## Decision: rerun은 package별 중복 방지와 status 분리로 지원

**Decision**: Workflow는 `packages/tokens`, `packages/ui`, Storybook Pages의 status를 분리해서 보고하고, 이미 게시된 package version은 중복 publish를 차단하거나 skip으로 표시한다.

**Rationale**: FR-009와 FR-011은 부분 실패를 식별하고 실패한 path만 재실행할 수 있어야 한다. Package별 duplicate version check는 rerun 시 이미 성공한 package를 다시 게시하지 않게 한다.

**Alternatives considered**:

- 하나의 monolithic publish job: 단순하지만 어떤 package/site가 실패했는지 식별하기 어렵다.
- 항상 전체 재게시: npm package version immutability와 충돌하고 duplicate failure를 만든다.
