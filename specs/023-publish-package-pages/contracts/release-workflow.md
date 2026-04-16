# Contract: Release Workflow

## Purpose

Maintainer가 `main` 브랜치에서 `packages/tokens`, `packages/ui`, `packages/ui` Storybook을 안전하게 배포하기 위한 GitHub Actions workflow contract를 정의한다.

## Trigger Contract

| Field | Required | Contract |
|-------|----------|----------|
| `branch` | Yes | Publication jobs는 `main`에서만 실행된다. |
| `event` | Yes | 기본 trigger는 release published event이다. Maintainer용 manual dispatch를 추가할 수 있으나 `main` boundary를 유지해야 한다. |
| `targets` | Yes | `packages/tokens`, `packages/ui`, `storybook` 세 path를 지원한다. |
| `actor` | Yes | Repository write permission과 package/pages publication permission이 필요하다. |

## Permission Contract

| Job | Minimum Permissions |
|-----|---------------------|
| Validate packages | `contents: read` |
| Publish packages | `contents: read`, `packages: write` |
| Build Storybook | `contents: read` |
| Deploy GitHub Pages | `contents: read`, `pages: write`, `id-token: write` |

Credentials는 logs, artifacts, PR output에 출력하지 않는다. Fork, pull request, non-main branch context에서는 publish/deploy permissions를 사용하는 job을 실행하지 않는다.

## Package Publication Contract

| Package Path | Package Identity | Registry | Required Gates |
|--------------|------------------|----------|----------------|
| `packages/tokens` | package manifest의 scoped name | `https://npm.pkg.github.com` | lint, test, build, duplicate version check |
| `packages/ui` | package manifest의 scoped name | `https://npm.pkg.github.com` | lint, test, build, duplicate version check |

Expected behavior:

- 이미 registry에 존재하는 package version은 publish하지 않고 duplicate 또는 skipped 상태로 보고한다.
- 하나의 package validation 실패가 다른 package의 상태 보고를 숨기면 안 된다.
- Manifest가 publish를 막는 상태이면 validation failure로 처리한다.

## Storybook Pages Contract

| Source | Artifact | Target | Required Gates |
|--------|----------|--------|----------------|
| `packages/ui` | `packages/ui/storybook-static` | GitHub Pages | build-storybook, storybook tests where available, artifact upload |

Expected behavior:

- Storybook build 또는 validation 실패 시 deploy job은 실행되지 않는다.
- Deploy 실패 시 기존 GitHub Pages site는 유지되어야 한다.
- 성공 시 maintainer가 Pages URL 또는 deployment result를 확인할 수 있어야 한다.

## Status Contract

Workflow summary 또는 job output은 다음 결과를 분리해서 제공해야 한다.

| Result Key | Values |
|------------|--------|
| `tokens_publication` | `published`, `skipped`, `failed` |
| `ui_publication` | `published`, `skipped`, `failed` |
| `storybook_publication` | `deployed`, `skipped`, `failed` |
| `failure_category` | `validation`, `permission`, `credential`, `duplicate-version`, `external-service`, `none` |

## Rerun Contract

- Maintainer는 실패한 path만 다시 실행할 수 있어야 한다.
- 이미 published된 package version은 rerun에서 다시 publish하지 않는다.
- Storybook deploy만 실패한 경우 package publication 성공 상태를 보존하고 Storybook path만 재시도할 수 있어야 한다.
