# Quickstart: GitHub Packages publish permission 오류 복구

## Prerequisites

- GitHub repository owner와 package scope 규칙을 확인할 수 있어야 한다.
- `publish.yml` workflow가 `main` branch publish boundary를 유지해야 한다.
- `GITHUB_TOKEN` 기반 package publish permission(`packages: write`)이 job 단위로 설정되어 있어야 한다.
- package가 이미 존재한다면 현재 repository/token이 해당 package에 publish 가능한 owner linkage를 가져야 한다.

## Local Validation

구현 전후로 다음 검증이 성공해야 한다.

```bash
pnpm --filter @kamijeong/tokens build
pnpm --filter @kamijeong/ui lint
pnpm --filter @kamijeong/ui test
pnpm --filter @kamijeong/ui build
node scripts/verify-release-automation.mjs
```

package identity가 변경되면 위 명령의 filter/package name도 새 manifest name 기준으로 갱신되어야 한다.

## Release Review Checklist

1. `packages/tokens/package.json`과 `packages/ui/package.json`의 package name/scope가 repository owner 규칙과 일치하는지 확인한다.
2. `packages/ui`의 workspace dependency가 tokens package의 최신 manifest name을 가리키는지 확인한다.
3. `.github/workflows/publish.yml`에 owner/scope preflight와 explicit failure category가 포함되어 있는지 확인한다.
4. `scripts/verify-release-automation.mjs`가 새 package identity와 failure categories를 검증하는지 확인한다.
5. `README.md` release guide가 maintainer remediation 절차를 설명하는지 확인한다.

## Maintainer Retry Flow

1. `main`에 병합된 변경이 package identity, workflow preflight, documentation을 모두 포함하는지 확인한다.
2. Release 또는 `workflow_dispatch`를 실행한다.
3. UI/tokens publish job summary에서 `failure_category`를 확인한다.
4. `owner-scope-mismatch`이면 package scope 또는 package linkage를 수정한 뒤 rerun한다.
5. `permission`이면 repository/package permissions를 수정한 뒤 rerun한다.
6. `duplicate-version`이면 version bump 후 새 release를 준비한다.
7. 성공 시 GitHub Packages에서 새 version이 게시되었는지 확인한다.

## Failure Handling

- `owner-scope-mismatch`: package scope와 publishing owner를 정렬하거나 package ownership linkage를 수정한다.
- `permission`: token/repository/package settings를 확인하고 `packages: write` 또는 package admin access를 수정한다.
- `credential`: secret/token injection 경로를 확인하되 값을 로그에 출력하지 않는다.
- `duplicate-version`: 기존 published version을 유지하고 새 version으로 release를 다시 준비한다.
- `external-service`: GitHub Packages 장애 가능성을 고려해 잠시 후 rerun한다.
