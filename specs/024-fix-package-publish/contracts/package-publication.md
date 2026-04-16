# Contract: Package Publication Identity and Preflight

## Purpose

Maintainer가 GitHub Packages publish 실패를 raw npm error 없이 진단하고, repository owner와 호환되는 package identity로 `packages/tokens`와 `packages/ui`를 안정적으로 게시하기 위한 contract를 정의한다.

## Identity Contract

| Field | Required | Contract |
|-------|----------|----------|
| `registry` | Yes | 모든 package publish는 `https://npm.pkg.github.com`를 사용한다. |
| `package_name` | Yes | 각 package name은 GitHub Packages owner namespace와 호환되는 scoped name이어야 한다. |
| `repository_owner` | Yes | publish를 수행하는 repository owner는 package scope와 호환되거나 연결 가능한 owner여야 한다. |
| `access` | Yes | publish access mode는 private publication 정책에 맞는 `restricted`를 유지한다. |
| `workspace_dependency_consistency` | Yes | workspace dependency 명은 publish-facing package identity와 일치해야 한다. |

## Preflight Contract

| Check | Blocking | Expected Behavior |
|-------|----------|-------------------|
| Credential presence | Yes | `NODE_AUTH_TOKEN` 또는 동등 credential이 없으면 publish 전에 실패한다. |
| Owner/scope compatibility | Yes | scope와 repository owner가 호환되지 않으면 `npm publish`를 실행하지 않는다. |
| Package ownership linkage | Yes | package가 다른 owner/repository에 묶여 현재 token으로 publish 불가하면 명시적 mismatch/permission failure를 반환한다. |
| Duplicate version | Yes | 동일 version이 이미 존재하면 publish를 건너뛰고 duplicate 상태를 기록한다. |
| Validation gates | Yes | lint/test/build 등 기존 quality gate가 실패하면 publish를 시도하지 않는다. |

## Failure Category Contract

Workflow summary와 job output은 아래 category를 구분해야 한다.

| Result Key | Values |
|------------|--------|
| `tokens_publication` | `published`, `skipped`, `failed` |
| `ui_publication` | `published`, `skipped`, `failed` |
| `failure_category` | `validation`, `credential`, `permission`, `owner-scope-mismatch`, `duplicate-version`, `external-service`, `none` |

Expected behavior:

- `owner-scope-mismatch`는 generic `permission`과 별개로 유지한다.
- summary reason은 maintainer가 다음 액션을 결정할 수 있을 정도로 구체적이어야 한다.
- raw token 값이나 민감한 credential 정보는 logs, summaries, artifacts에 출력하지 않는다.

## Rerun Contract

- Maintainer는 owner/scope 또는 permission remediation 후 동일 path만 재실행할 수 있어야 한다.
- duplicate version 상태에서는 새 publish를 시도하지 않는다.
- 한 package의 identity failure가 다른 package 또는 Storybook deploy status reporting을 숨기면 안 된다.
