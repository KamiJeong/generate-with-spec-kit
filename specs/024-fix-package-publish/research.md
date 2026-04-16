# Research: GitHub Packages Publish Permission Recovery

## Decision: GitHub Packages publish identity를 repository owner 규칙에 맞게 정렬한다

**Decision**: `packages/ui` publish가 `@myorg/ui` scope로 진행되는 현재 상태를 GitHub Packages owner namespace 규칙과 비교 검증하고, 필요하면 package scope를 repository owner 또는 organization namespace와 일치하도록 조정한다. 동일 정책은 `packages/tokens`와 workspace internal dependency에도 함께 반영한다.

**Rationale**: GitHub Packages npm publish는 일반적으로 package scope가 publishing owner와 연결되어야 한다. 현재 repository owner는 `kamijeong`인데 package scope는 `@myorg`이므로, `GITHUB_TOKEN`이 있어도 첫 publish 또는 package ownership linkage 단계에서 `403 Forbidden`과 `The requested installation does not exist.`가 발생할 수 있다.

**Alternatives considered**:
- `@myorg/*` scope를 유지하고 추가 secret/PAT만 사용: 권한 부족 문제일 수는 있지만 owner mismatch를 해결하지 못하면 동일 실패가 반복될 수 있다.
- npmjs.com 등 다른 registry로 전환: 현재 spec 및 기존 release automation 범위를 벗어나며 불필요하게 범위를 확장한다.

## Decision: publish 전에 owner/scope mismatch를 별도 preflight로 감지한다

**Decision**: workflow는 duplicate version check와 별도로 package scope, repository owner, package access linkage를 검증하는 preflight 단계를 추가하고, mismatch 시 `owner-scope-mismatch` 또는 동등한 명시적 failure category로 종료한다.

**Rationale**: 현재 workflow는 credential 존재 여부와 duplicate version만 점검하고 실제 `npm publish`가 거부된 후에야 모호한 permission failure로 분류한다. owner/scope mismatch를 preflight로 분리하면 raw npm debug log 없이도 빠르게 수정 방향을 제시할 수 있다.

**Alternatives considered**:
- 기존 `permission` failure category만 유지: root cause가 흐려져 maintainer가 token 문제와 namespace 문제를 구분하기 어렵다.
- publish 후 stderr 문자열만 파싱: 늦고 brittle하며 job runtime과 유지보수 비용을 높인다.

## Decision: workspace rename 영향은 package metadata, dependencies, verification script, docs까지 함께 반영한다

**Decision**: package identity 변경이 필요할 경우 `packages/ui/package.json`, `packages/tokens/package.json`, internal workspace dependency 이름, `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs`, `README.md`를 하나의 변경 집합으로 다룬다.

**Rationale**: 현재 verification script와 workflow는 `@myorg/tokens`, `@myorg/ui`를 하드코딩하고 있다. package manifest만 바꾸면 release verification과 publish steps가 바로 drift를 일으킨다.

**Alternatives considered**:
- package manifest만 변경: local workspace와 CI 검증 로직이 즉시 깨질 가능성이 높다.
- workflow만 변경하고 package manifest는 유지: 실제 publish artifact identity와 문서가 불일치한다.

## Decision: `GITHUB_TOKEN` 중심 인증 모델은 유지하되 필요한 permission/ownership 문서를 강화한다

**Decision**: package publication 인증은 계속 job-level `packages: write` + `GITHUB_TOKEN`을 기본값으로 사용하고, 문서에 repository owner package settings 및 package access linkage 요구사항을 명시한다.

**Rationale**: 현재 workflow는 이미 최소 권한 원칙을 따르고 있으며, 문제는 credential의 존재 자체보다 package ownership compatibility일 가능성이 높다. 인증 방식을 유지하면 변경 폭이 작고 secret 관리 surface를 늘리지 않는다.

**Alternatives considered**:
- PAT를 기본 인증으로 전환: 유지보수 비용과 보안 surface가 증가한다.
- organization secret 다중 fallback 추가: 현재 root cause가 확인되기 전에는 불필요한 복잡성이다.

## Decision: verification script는 package identity 규칙을 단언하도록 확장한다

**Decision**: `scripts/verify-release-automation.mjs`는 publish workflow 존재 여부만 확인하지 않고 package identity convention, summary failure category, preflight step 존재를 검증하도록 확장한다.

**Rationale**: release automation 변경은 config drift가 쉽게 생긴다. verification script가 owner/scope rule을 codify하면 regression을 조기에 감지할 수 있다.

**Alternatives considered**:
- workflow review만 수동 수행: 반복성이 낮고 drift를 놓치기 쉽다.
- unit test만 추가: workflow YAML 및 documentation contract drift를 충분히 잡지 못한다.
