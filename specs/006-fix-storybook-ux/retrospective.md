---
feature: Storybook 품질 개선
branch: 006-fix-storybook-ux
date: 2026-04-06
completion_rate: 94
spec_adherence: 100
total_requirements: 10
implemented: 10
partial: 0
not_implemented: 0
critical_findings: 0
---

# Retrospective: Storybook 품질 개선

## Executive Summary

16/17 태스크 완료 (94%). Spec adherence **100%** — spec.md 업데이트(FR-003 범위 명확화, Assumptions 추가) 후 모든 10개 요구사항이 IMPLEMENTED로 전환. 4가지 Storybook 품질 문제(Biome 포맷팅 116건, 콘솔 에러, 좁은 뷰포트, Controls 미동작)가 모두 해소되었다. Critical 위반 없음. 잔여 MINOR 이슈 2건: Badge.Ghost children 오타, T017 수동 검증 미완료.

> 이 회고는 `2026-04-06` 두 번째 실행분이다. 첫 번째 회고(90% adherence)에서 도출된 spec 변경이 승인·반영되었으며, 현재 spec.md 기준으로 재계산한 결과다.

---

## Self-Assessment Checklist

| 항목 | 결과 | 비고 |
|------|------|------|
| Evidence completeness | PASS | 모든 deviation에 파일·커밋·태스크 근거 포함 |
| Coverage integrity | PASS | FR-001~FR-005, SC-001~SC-005 전부 검토 |
| Metrics sanity | PASS | (10 + 0×0.5) / 10 = 100% — 공식 정확 적용 |
| Severity consistency | PASS | CRITICAL 없음, MINOR 2건, POSITIVE 2건 |
| Constitution review | PASS | 위반 없음 명시 |
| Human Gate readiness | PASS | Proposed Spec Changes 없음 (이미 반영 완료) |
| Actionability | PASS | 권장 조치 파일·우선순위 지정 |

---

## Proposed Spec Changes

없음 — 이전 회고 실행에서 제안된 변경이 사용자 승인 후 이미 `spec.md`에 반영되었다.

- FR-003: Alert/Tabs/Sheet 제외, Switch.Small Controls 범위 제외 명시 ✅ 반영
- Assumptions: 공식 Storybook 애드온 추가 허용 ✅ 반영

---

## Requirement Coverage Matrix

| ID | 설명 | 상태 | 근거 |
|----|------|------|------|
| FR-001 | 콘솔 에러 0건 | IMPLEMENTED | T005: `preview.tsx` decorator `<Story />` 패턴 수정 ✅ |
| FR-002 | 기본 뷰포트 1280px | IMPLEMENTED | T007: `desktop1280` (1280×900) + layout `padded` ✅ |
| FR-003 | 주요 컴포넌트 Controls 동작 (범위: Button/Badge/Spinner/Avatar/Switch 기본) | IMPLEMENTED | T008~T011 완료; Alert/Tabs/Sheet 이미 render; Switch.Small 범위 제외 — spec 업데이트로 100% 충족 ✅ |
| FR-004 | Biome lint 에러 0건 | IMPLEMENTED | T003: biome auto-fix; `pnpm lint` → "No fixes applied" ✅ |
| FR-005 | 기존 play 테스트 0 regression | IMPLEMENTED | T016: `test-storybook` 통과 ✅ |
| SC-001 | 콘솔 에러 0건 | IMPLEMENTED | FR-001과 동일 ✅ |
| SC-002 | 캔버스 너비 1280px | IMPLEMENTED | FR-002와 동일 ✅ |
| SC-003 | Controls 100% 조작 가능 | IMPLEMENTED | FR-003 범위 기준 충족 (spec 업데이트 반영) ✅ |
| SC-004 | lint 에러 0건 | IMPLEMENTED | FR-004와 동일 ✅ |
| SC-005 | play 테스트 0 regressions | IMPLEMENTED | FR-005와 동일 ✅ |

**Spec Adherence**: (10 / 10) × 100 = **100%**

---

## Architecture Drift

| 영역 | plan.md 계획 | 실제 구현 | 판정 |
|------|-------------|-----------|------|
| 수정 대상 파일 | preview.ts + 5개 story 파일 | 동일 + main.ts(addon 추가) | ✅ Assumptions 업데이트로 정당화 |
| Biome 수정 방식 | `biome check --write` 단일 명령 | 동일 | ✅ |
| decorator 패턴 | `Story()` → `<Story />` | 동일 | ✅ |
| preview 확장자 | .ts → .tsx 가능성 언급 | .tsx로 변경 확인 | ✅ |
| 새 외부 패키지 | 없음 | `@storybook/addon-docs@10.3.3` 추가 | ✅ Assumptions 업데이트로 정당화 |
| Switch.Small Controls | args 패턴 또는 수정 불필요 | 고정 render 유지 (범위 제외) | ✅ FR-003 업데이트로 정당화 |
| badge.stories.tsx 구현 커밋 | `902fe0d` (메인) | `aa2e574` (선행 fix 커밋) + `902fe0d` | ℹ️ 정보성 |

---

## Significant Deviations

### [MINOR] Badge.Ghost children 오타

**발견 시점**: 코드 검토

**상황**: `badge.stories.tsx:67`의 Ghost 스토리에 `children: 'Helodd'` 오타. 올바른 값은 `'Ghost'`.

**영향**: 기능 동작에 영향 없음. Storybook 미리보기에서 "Helodd" 텍스트 표시.

**수정**: `'Helodd'` → `'Ghost'` 1줄 변경.

---

### [MINOR] T017 수동 UI 검증 미완료

**상황**: Polish 단계 T017 "Storybook 개발 서버에서 Controls 패널 수동 확인"이 체크되지 않았다. 코드 구현은 완료. 수동 브라우저 검증만 미실시.

**영향**: 코드 기반 신뢰도는 확보. 단, 브라우저 렌더링 레벨에서의 시각적 확인이 없는 상태.

---

## Innovations and Best Practices

### [POSITIVE] Biome auto-fix 일괄 수정 전략

116개 포맷팅 에러를 `biome check --write src .storybook` 단일 명령으로 해결. 코드 동작 무변경, 순수 포맷팅 일괄 적용 — 안전하고 일관된 접근.

**Constitution 후보**: CLAUDE.md 또는 quickstart 템플릿에 "Windows CRLF 에러 일괄 수정" 패턴 추가 권장.

### [POSITIVE] meta render 보호 + variant 스토리 개별 render 추가 패턴

Default play 테스트를 완전히 보호하면서 Controls를 정상화하는 최소 침습적 방법. `render: (args) => <Component {...args} />` 패턴을 args 패턴 variant 스토리에만 선택적 추가.

**Constitution 후보**: "play 테스트가 있는 스토리의 meta render는 변경하지 않는다 — variant Controls는 개별 story render로 추가" 원칙으로 정식화 가능.

---

## Constitution Compliance

헌법 파일(`memory/constitution.md`) 없음 — plan.md 내 헌법 검토 섹션 준용.

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 | ✅ PASS | Biome 포맷팅 통일, lint 0건 |
| II. 테스트 표준 | ✅ PASS | 기존 play 테스트 보호, T016 통과 |
| III. UX 일관성 | ✅ PASS | Controls 정상화, 뷰포트 확장, docs 렌더러 활성화 |
| IV. 성능 요구사항 | ✅ N/A | 정적 스토리 파일 수정 |
| V. 단순성 | ✅ PASS | `@storybook/addon-docs`는 공식 필수 애드온 — 과도한 의존성 아님 |

Constitution 위반 없음.

---

## Unspecified Implementations

| 항목 | 설명 | spec.md 반영 필요 |
|------|------|-----------------|
| viewport `tablet768`, `mobile375` 추가 | 1280px 외 두 뷰포트 추가 — 개선 사항 | 불필요 |
| layout `'padded'` 전환 | spec은 너비만 언급, layout 값은 구현 세부사항 | 불필요 |
| `@storybook/addon-docs` 설치 | plan 제약 외였으나 Assumptions 업데이트로 정당화 | ✅ 이미 반영 |
| preview.ts → preview.tsx 확장자 변경 | plan에서 "가능성 언급"으로만 명시 | 불필요 |

---

## Task Execution Analysis

| 단계 | 태스크 | 완료 | 비고 |
|------|--------|------|------|
| Phase 1 (Setup) | T001, T002 | ✅ | 기준선 확인 — 116건 포맷팅 에러 |
| Phase 2 (Foundational) | T003, T004 | ✅ | biome auto-fix 성공 |
| Phase 3 (US1 — 콘솔) | T005, T006 | ✅ | decorator `<Story />`, preview.tsx 확장자 변경 |
| Phase 4 (US2 — 뷰포트) | T007 | ✅ | viewport + layout 설정 |
| Phase 5 (US3 — Controls) | T008~T011 | ✅ | button/badge/spinner/avatar 완료 |
| Phase 5 (US3 — Controls) | T012 | ✅ | Switch.Small 기존 render 확인 → 범위 제외 처리 |
| Phase 6 (US4 — 린트) | T013, T014 | ✅ | 최종 lint 0건 |
| Polish | T015, T016 | ✅ | 빌드 성공 + play 테스트 통과 |
| Polish | T017 | ⬜ | 수동 브라우저 Controls 확인 미완료 |

---

## Lessons Learned

### 1. Windows CRLF/LF 불일치는 `.gitattributes`로 사전 차단해야 함

Windows + AI 생성 파일 조합에서 일관되게 발생. feature 004/005 파일들이 CRLF였으나 feature 006에서야 116건 일괄 발견. `.gitattributes`에 `*.ts text=auto eol=lf`, `*.tsx text=auto eol=lf` 설정으로 예방 가능.

### 2. args 패턴과 고정 render의 구분이 설계 시 명시되어야 함

"render 패턴이면 수정 불필요" 규칙이 Switch.Small의 고정 `render: () => ...`를 Controls 미동작 상태로 통과시켰다. 규칙은 "args-based render(`render: (args) => ...`)이면 수정 불필요"로 구체화해야 한다.

### 3. 계획에 없는 패키지 추가 시 plan/spec에 즉시 기록해야 함

`@storybook/addon-docs` 추가가 fix 커밋(`aa2e574`)에서 이루어졌으나 plan.md 제약과 spec.md Assumptions는 사후 회고에서야 업데이트되었다. 제약 변경 시 실시간 문서 업데이트 필요.

### 4. 회고 주도 spec 업데이트가 adherence를 90% → 100%로 끌어올렸다

첫 번째 회고에서 FR-003/SC-003 PARTIAL 판정 → spec 업데이트 → 두 번째 회고에서 IMPLEMENTED. 스펙과 구현의 gap을 회고 사이클로 해소하는 패턴이 효과적임을 확인.

---

## Recommendations

| 우선순위 | 권장 조치 | 대상 |
|---------|----------|------|
| HIGH | `.gitattributes`에 `*.ts text=auto eol=lf`, `*.tsx text=auto eol=lf` 추가 | 저장소 루트 |
| MEDIUM | Badge.Ghost children 오타 수정: `'Helodd'` → `'Ghost'` | `badge.stories.tsx:67` |
| LOW | T017 수동 브라우저 Controls 확인 완료 후 태스크 체크 | `tasks.md:T017` |
| LOW | `/speckit.constitution` — "meta render 보호 + args render 추가" 원칙 정식화 검토 | constitution |

---

## File Traceability

| 파일 | 관련 태스크 | FR/SC | 커밋 |
|------|-----------|-------|------|
| `packages/ui/.storybook/preview.tsx` | T005, T007 | FR-001, FR-002, SC-001, SC-002 | `902fe0d` |
| `packages/ui/.storybook/main.ts` | 미계획 (Assumptions 반영) | — | `aa2e574` |
| `packages/ui/src/stories/button.stories.tsx` | T008 | FR-003, SC-003 | `902fe0d` |
| `packages/ui/src/components/badge.stories.tsx` | T009 | FR-003, SC-003 | `aa2e574`, `902fe0d` |
| `packages/ui/src/stories/spinner.stories.tsx` | T010 | FR-003, SC-003 | `902fe0d` |
| `packages/ui/src/components/avatar.stories.tsx` | T011 | FR-003, SC-003 | `902fe0d` |
| `packages/ui/src/components/switch.stories.tsx` | T012 | FR-003 (범위 제외) | 미수정 |
| `packages/ui/src/` (전체 포맷팅) | T003, T013 | FR-004, SC-004 | `902fe0d` |
| `packages/ui/package.json` | 미계획 (Assumptions 반영) | — | `aa2e574` |
| `specs/006-fix-storybook-ux/spec.md` | — | 회고 반영 업데이트 | 미커밋 |
