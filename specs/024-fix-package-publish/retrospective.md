---
feature: 024-fix-package-publish
branch: 024-fix-package-publish
date: 2026-04-16
completion_rate: 100
spec_adherence: 100
requirement_counts:
  total: 11
  implemented: 11
  partial: 0
  modified: 0
  not_implemented: 0
  unspecified: 0
severity_counts:
  critical: 0
  significant: 1
  minor: 0
  positive: 2
---

# Retrospective: GitHub Packages Publish Permission Recovery

## Executive Summary

`024-fix-package-publish`는 계획된 범위 안에서 완료되었고, `packages/ui` publish blocker였던 GitHub Packages owner/scope mismatch를 해결했다. 구현은 package identity를 `@kamijeong/*`로 정렬하고, release workflow에 owner/scope preflight 및 `owner-scope-mismatch` failure category를 추가했으며, release verification script와 workspace consumers를 함께 갱신했다.

- Task completion: 31/31 (100%)
- Spec adherence: 11/11 requirements and success criteria satisfied (100%)
- Critical findings: 없음
- Most important lesson: package publish identity 변경은 package manifest만이 아니라 workspace import graph, CI filters, lockfile, maintainer docs까지 하나의 변경 단위로 다뤄야 한다.

## Proposed Spec Changes

None.

현재 retrospective 결과는 `spec.md` 수정 없이도 구현과 문서가 정합적이다. 향후 spec을 업데이트한다면 이는 선택적 문서 정제 수준이며, 현재 기능 요구사항을 충족하기 위해 필수적이지 않다.

## Requirement Coverage Matrix

| ID | Type | Status | Evidence | Notes |
|---|---|---|---|---|
| FR-001 | Functional | Implemented | `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs` | publish 전 owner/scope compatibility preflight 추가 |
| FR-002 | Functional | Implemented | `packages/ui/package.json`, `.github/workflows/publish.yml` | `@kamijeong/ui`로 identity 정렬 |
| FR-003 | Functional | Implemented | `.github/workflows/publish.yml`, `README.md` | `owner-scope-mismatch` remediation guidance 추가 |
| FR-004 | Functional | Implemented | `packages/ui/package.json`, `packages/web/package.json`, `apps/*/package.json`, `pnpm-lock.yaml` | workspace dependency 및 consumer imports 동기화 |
| FR-005 | Functional | Implemented | `.github/workflows/publish.yml`, `scripts/verify-release-automation.mjs` | `published`, `duplicate-version`, `credential`, `permission`, `owner-scope-mismatch`, `external-service` 유지/확장 |
| FR-006 | Functional | Implemented | `README.md`, `specs/024-fix-package-publish/quickstart.md`, `specs/024-fix-package-publish/contracts/package-publication.md` | owner/package scope convention 문서화 |
| FR-007 | Functional | Implemented | `.github/workflows/publish.yml` | release trigger와 manual dispatch 모두 동일 preflight 적용 |
| SC-001 | Success | Implemented | `packages/ui/package.json`, `.github/workflows/publish.yml`, validation runs | owner-aligned identity에서 publish path 준비 완료 |
| SC-002 | Success | Implemented | `.github/workflows/publish.yml`의 `Verify UI package identity` / `Verify tokens package identity` steps |
| SC-003 | Success | Implemented | `.github/workflows/publish.yml`, `README.md` | maintainers가 raw npm log 없이 category로 판단 가능 |
| SC-004 | Success | Implemented | `README.md`, `specs/024-fix-package-publish/quickstart.md` | retry flow와 remediation guidance 정리 |

## Success Criteria Assessment

| Success Criterion | Assessment | Evidence |
|---|---|---|
| SC-001 | PASS | `@kamijeong/ui`로 package identity 정렬 후 `pnpm install --frozen-lockfile`, `pnpm --filter @kamijeong/ui build-storybook`, `pnpm --filter @kamijeong/ui build` 성공 |
| SC-002 | PASS | `.github/workflows/publish.yml`의 `Verify UI package identity` / `Verify tokens package identity` steps |
| SC-003 | PASS | workflow summary의 `failure_category` 및 `reason`, `README.md`의 maintainer decision flow |
| SC-004 | PASS | `README.md`와 `specs/024-fix-package-publish/quickstart.md`의 retry instructions |

## Architecture Drift

| Area | Planned | Implemented | Severity | Assessment |
|---|---|---|---|---|
| Package identity | tokens/UI identity alignment | tokens/UI plus all workspace consumers and imports renamed to `@kamijeong/*` | POSITIVE | 실제 workspace consistency를 위해 필요한 확장 |
| Workflow diagnostics | owner/scope preflight and explicit failure category | planned 그대로 구현 | None | drift 없음 |
| Verification | release verification script update | planned 그대로 구현 + repository owner 기반 expected scope 계산 | POSITIVE | static string보다 재사용성과 안정성이 높음 |
| Validation flow | targeted release validation | targeted validation + `pnpm install --frozen-lockfile` 추가 | SIGNIFICANT | rename 후 workspace links 재생성이 필요했음 |

## Significant Deviations

### 1. Workspace-wide package scope rename 수행

- **Severity**: SIGNIFICANT
- **Discovery point**: implementation / validation
- **Evidence**: `packages/*/package.json`, `apps/*/package.json`, `packages/ui/src/index.css`, `packages/ui/src/stories/guide/*.stories.tsx`, `pnpm-lock.yaml`
- **What changed**: 초기 task/plan은 release files 중심이었지만 실제 구현에서는 모든 workspace consumers와 imports를 함께 `@kamijeong/*`로 바꿨다.
- **Why**: UI/Storybook/apps가 여전히 `@myorg/*`를 import하면 build/storybook/test가 깨지거나 workspace graph가 split-brain 상태가 된다.
- **Recommendation**: future specs that rename published package identities should explicitly call out consumer import graph and lockfile refresh as first-class scope.

## Innovations and Best Practices

### 1. Repository owner 기반 expected scope 계산

- **Severity**: POSITIVE
- **Evidence**: `scripts/verify-release-automation.mjs`
- **Improvement**: verification script가 hard-coded scope 대신 repository metadata에서 expected owner scope를 계산한다.
- **Why better**: owner rename/org migration 시 verification logic drift 가능성을 줄인다.
- **Reusable?**: Yes. 다른 GitHub Packages workflows에도 재사용 가능.
- **Constitution candidate?**: 아니오, but a good release-automation pattern.

### 2. Owner/scope mismatch를 permission과 분리

- **Severity**: POSITIVE
- **Evidence**: `.github/workflows/publish.yml`, `README.md`
- **Improvement**: generic `permission` failure에서 숨겨지던 namespace mismatch를 별도 category로 노출했다.
- **Why better**: maintainer triage 시간이 줄고 재시도 경로가 명확해진다.
- **Reusable?**: Yes. 모든 package publication pipeline에 적용 가능.
- **Constitution candidate?**: 운영 workflow best practice로는 적합하지만 constitution 변경까지는 불필요.

## Constitution Compliance

- **I. 코드 품질**: PASS — workflow diagnostics, package manifests, docs, verification script가 명확히 분리되었고 중복을 줄였다.
- **II. 테스트 표준**: PASS — verification script를 먼저 확장했고 lint/test/build/storybook validation을 실제 실행했다.
- **III. 사용자 경험 일관성**: PASS — 사용자-facing UI 동작은 변하지 않았고 maintainer-facing error guidance는 일관되게 개선되었다.
- **IV. 성능 요구사항**: PASS — preflight failure path가 publish 전 빠르게 종료되도록 설계되었다.
- **V. 단순성**: PASS — GitHub Packages, `GITHUB_TOKEN`, 기존 pnpm/GitHub Actions stack을 유지했다.
- **기술 스택 및 의존성 제약사항**: PASS — 신규 runtime dependency 없음.
- **개발 워크플로우 및 품질 게이트**: PASS — `main` publish boundary와 least-privilege permissions 유지.
- **문서 언어 정책**: PASS — speckit artifacts를 한국어 중심으로 유지.

**Constitution violations**: None.

## Unspecified Implementations

| Implementation | Why It Happened | Impact |
|---|---|---|
| `@kamijeong/*` rename이 apps, docs-canonical, CLAUDE/AGENTS instructions까지 확장 | package identity rename의 실제 blast radius가 spec보다 넓었음 | Positive - workspace consistency 확보 |
| `pnpm install --frozen-lockfile`를 validation 단계에 포함 | renamed workspace packages가 실제 node_modules links에 반영되어야 Storybook이 성공했음 | Positive - validation realism 향상 |

## Task Execution Analysis

| Metric | Value |
|---|---|
| Total tasks | 31 |
| Completed tasks | 31 |
| Completion rate | 100% |
| Added ad-hoc tasks | 0 |
| Dropped tasks | 0 |
| Modified task scope | 1 significant expansion (workspace-wide consumer rename) |

### Fidelity Notes

- Setup/Foundation/User Story/Polish phases 모두 완료했다.
- Task labels and execution order는 대체로 유지되었다.
- US3 implementation 범위가 가장 넓었지만, 실제로는 US1 validation 성공을 위해 필요했던 consistency work였다.

## Root Cause Analysis

| Finding | Discovery Point | Cause | Prevention Recommendation |
|---|---|---|---|
| Original deploy error was caused by package scope mismatch with GitHub owner | Specification analysis / implementation | prior publish feature assumed placeholder scope `@myorg` would work in GitHub Packages | release specs should explicitly compare package scope with real GitHub owner before implementation |
| Storybook failed after rename until workspace relink | Validation | workspace rename affected resolution graph beyond manifest files | include `pnpm install --frozen-lockfile` in rename validation checklist |
| Consumer blast radius was broader than initial task wording | Implementation | package identity changes propagate through imports, css `@import`, package filters, tests, docs | future tasks should enumerate consumer packages and import paths up front |

## Lessons Learned and Recommendations

1. **Prioritize real owner metadata early** — placeholder scopes like `@myorg` are fine for scaffolding but must be resolved before publish automation is considered done.
2. **Treat package renames as graph changes** — manifests, imports, CSS imports, workspace filters, lockfile, CI, docs all move together.
3. **Codify operational diagnostics** — explicit failure categories such as `owner-scope-mismatch` reduce triage cost more than generic permission failures.
4. **Validate after relinking** — `pnpm install --frozen-lockfile` should be part of any workspace package identity migration.
5. **Keep verification scripts dynamic where possible** — deriving expected owner scope from repository metadata is safer than hard-coded strings.

## Self-Assessment Checklist

- Evidence completeness: PASS
- Coverage integrity: PASS
- Metrics sanity: PASS
- Severity consistency: PASS
- Constitution review: PASS
- Human Gate readiness: PASS
- Actionability: PASS

## File Traceability Appendix

### Primary implementation files

- `.github/workflows/publish.yml`
- `.github/workflows/storybook-test.yml`
- `scripts/verify-release-automation.mjs`
- `packages/tokens/package.json`
- `packages/ui/package.json`
- `README.md`
- `pnpm-lock.yaml`

### Workspace consistency files

- `apps/sfood/package.json`
- `apps/ai-wiki-portal-platform-by-claude/package.json`
- `apps/ai-wiki-portal-platform-by-codex/package.json`
- `packages/web/package.json`
- multiple `apps/*`, `packages/*`, and CSS/story files consuming `@kamijeong/ui` or `@kamijeong/tokens`

### Validation evidence

- `node scripts/verify-release-automation.mjs`
- `pnpm --filter @kamijeong/ui lint`
- `pnpm --filter @kamijeong/ui test`
- `pnpm --filter @kamijeong/tokens build`
- `pnpm --filter @kamijeong/ui build`
- `pnpm install --frozen-lockfile`
- `pnpm --filter @kamijeong/ui build-storybook`
