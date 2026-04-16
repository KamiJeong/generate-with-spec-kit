# Quickstart: 패키지 및 Storybook 자동 배포

## Prerequisites

- GitHub repository에서 Actions가 활성화되어 있어야 한다.
- GitHub Pages source가 GitHub Actions로 설정되어 있어야 한다.
- `packages/tokens`와 `packages/ui` package metadata가 GitHub Packages npm registry publish를 허용해야 한다.
- Repository 또는 organization package permissions가 private package 소비자에게 적절히 부여되어 있어야 한다.

## Local Validation

구현 전후로 다음 명령이 성공해야 한다.

```bash
pnpm --filter @myorg/tokens lint
pnpm --filter @myorg/tokens test
pnpm --filter @myorg/tokens build
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui test
pnpm --filter @myorg/ui build
pnpm --filter @myorg/ui build-storybook
```

Storybook test environment가 준비되어 있으면 다음도 실행한다.

```bash
pnpm --filter @myorg/ui test-storybook
```

## Release Dry Run Review

1. Feature branch에서 workflow syntax와 validation jobs가 PR에서 실행되는지 확인한다.
2. PR/fork/non-main context에서 package publish와 Pages deploy jobs가 실행되지 않는지 확인한다.
3. `main` merge 전 workflow permissions가 job 단위 최소 권한인지 확인한다.
4. `packages/tokens`와 `packages/ui`의 package name, version, registry metadata가 GitHub Packages publish 조건을 충족하는지 확인한다.

## Maintainer Release Flow

1. Release 대상 변경을 `main`에 병합한다.
2. `packages/tokens`와 `packages/ui` version이 의도한 release version인지 확인한다.
3. GitHub release를 publish하거나 maintainer-approved manual dispatch를 실행한다.
4. Workflow summary에서 다음 상태를 확인한다.
   - `packages/tokens`: published, skipped, failed 중 하나
   - `packages/ui`: published, skipped, failed 중 하나
   - `packages/ui` Storybook: deployed, skipped, failed 중 하나
5. Package publication 성공 후 허용된 소비자가 private registry에서 해당 version을 설치할 수 있는지 확인한다.
6. Storybook deployment 성공 후 GitHub Pages URL에서 최신 `packages/ui` Storybook 콘텐츠가 제공되는지 확인한다.

## Failure Handling

- Duplicate package version: 해당 package path는 publish하지 않고 skipped 또는 failed-with-duplicate로 보고한다.
- Missing credential/permission: publish 또는 deploy 전에 실패해야 하며 credential 값은 출력하지 않는다.
- Storybook build failure: Pages deploy를 실행하지 않고 기존 site를 유지한다.
- Partial failure: 성공한 package version을 다시 publish하지 않고 실패 path만 rerun한다.
