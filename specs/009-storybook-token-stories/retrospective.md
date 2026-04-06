---
feature: "Storybook 디자인 토큰 스토리 개선"
branch: "009-storybook-token-stories"
date: "2026-04-06"
completion_rate: 100
spec_adherence: 75.0
total_requirements: 14
implemented_count: 8
partial_count: 5
modified_count: 0
not_implemented_count: 1
unspecified_count: 0
critical_findings: 0
significant_findings: 3
minor_findings: 2
positive_findings: 2
---

# Retrospective: Storybook 디자인 토큰 스토리 개선

## Executive Summary

이번 구현은 Storybook 가이드 스토리 구조, 페이지 카테고리 정규화, fullscreen 레이아웃 적용, 일부 컴포넌트 gallery story 추가를 안정적으로 완료했다. 작업 완료율은 `19/19 = 100%`이며, `pnpm --filter @myorg/ui lint`와 `pnpm --filter @myorg/ui build-storybook`도 모두 통과했다.

다만 스펙 대비 가장 큰 차이는 두 가지다. 첫째, spacing 가이드는 Tailwind spacing 전체 스케일이 아니라 주요 구간만 시각화했다. 둘째, 컴포넌트 props 전체 커버리지 요구사항은 스펙상 `약 15~20개 대상 / 100% 커버리지`였지만 실제 tasks와 구현은 5개 스토리 파일 중심으로 축소되었다. 이 차이는 구현 단계보다 **tasks 생성 단계에서 범위가 축소된 planning drift**로 보는 것이 맞다.

계산식:

`Spec Adherence % = (Implemented 8 + Modified 0 + Partial 5 * 0.5) / 14 = 75.0%`

## Proposed Spec Changes

다음 변경은 **권고안**이며, 아직 `spec.md`에는 반영하지 않았다.

### FR-004 / SC-002

- spacing 요구사항의 표현을 `모든 단계`에서 `전체 Tailwind spacing scale` 또는 `주요 단계 curated scale` 중 하나로 명확히 고정할 것
- 이유: 현재 spec은 전체 스케일을 암시하지만 tasks와 구현은 주요 값만 선택적으로 렌더링했다

### FR-005 / SC-003

- `약 15~20개`와 `100%` 같은 개방형 범위를 제거하고, 이번 iteration의 대상 컴포넌트 목록을 spec에 명시할 것
- 또는 `Phase A: 핵심 5개`, `Phase B: 잔여 variant/size 보유 컴포넌트`로 나눠 단계화할 것
- 이유: 이번 구현은 alert/avatar/switch/spinner/tabs만 다뤘고, 스펙의 전체 커버리지 선언과 직접 충돌한다

### User Story 1 Acceptance Scenario

- Typography acceptance scenario의 `Line Height 토큰 표시`를 유지할지 삭제할지 결정할 것
- 이유: 현재 FR-002와 tasks는 font-family/font-weight/font-size 중심이고, 구현에도 line-height 시각화는 없다

## Requirement Coverage Matrix

| ID | Status | Evidence | Notes |
|----|--------|----------|-------|
| FR-001 | Implemented | `title` 정규화 및 guide story 추가 | Components, Page, Typography, Color, Spacing, Motion 6개 카테고리 충족 |
| FR-002 | Implemented | `guide/typography.stories.tsx` | font-family, font-weight, font-size 시각화 완료 |
| FR-003 | Implemented | `guide/color.stories.tsx`, `guide/_helpers.tsx` | gray, brand, destructive palette를 이름과 hex 값으로 표시 |
| FR-004 | Partial | `guide/spacing.stories.tsx` | Tailwind spacing의 전체 단계가 아니라 주요 단계만 표시 |
| FR-004b | Implemented | `guide/motion.stories.tsx`, `guide/_helpers.tsx` | duration/easing 전 항목 시각화 완료 |
| FR-005 | Partial | `alert/avatar/switch/spinner/tabs` story 수정 | 대상이 5개로 축소되었고 전체 variant/size 보유 컴포넌트 audit는 미완료 |
| FR-006 | Implemented | `AuthPage`, `DashboardPage`, `FormPage`, `SettingsPage` | 페이지 스토리 fullscreen 적용 완료 |
| FR-007 | Partial | 기존 `argTypes` 유지, 일부 gallery 추가 | 주요 props controls는 일부 파일에서 충족되나 전체 대상 커버리지는 미입증 |
| FR-008 | Implemented | `SemanticColorTable` | light/dark semantic token을 side-by-side 렌더링 |
| SC-001 | Implemented | Story title 구조 | 6개 최상위 카테고리 충족 |
| SC-002 | Partial | 가이드 스토리 4개 존재 | spacing이 전체 값 기준으로는 미완료 |
| SC-003 | Not Implemented | tasks/implementation 범위 비교 | `100%` 기준 미달 |
| SC-004 | Implemented | 페이지 4개 fullscreen | 측정 가능하게 충족 |
| SC-005 | Partial | 카테고리 구조 개선 | `30초 이내 탐색`은 실제 측정/관찰 데이터 없음 |

## Success Criteria Assessment

| Success Criterion | Result | Assessment |
|------------------|--------|------------|
| SC-001 | PASS | 카테고리 폴더 구조는 구현됨 |
| SC-002 | PARTIAL | 가이드 스토리는 존재하지만 spacing 전 범위 충족은 아님 |
| SC-003 | FAIL | 전체 variant/size 보유 컴포넌트 100% 커버리지 미달 |
| SC-004 | PASS | 페이지 스토리 4개 fullscreen 확인 |
| SC-005 | PARTIAL | 탐색성은 개선되었으나 시간 측정 근거 없음 |

## Architecture Drift

| Area | Planned | Actual | Severity | Notes |
|------|---------|--------|----------|-------|
| Guide story foundation | `guide/_helpers.tsx`로 공통 추상화 | 동일 | None | 계획 일치 |
| Token source strategy | 기존 `@myorg/tokens` 재사용 | 동일 | None | 신규 의존성 없음 |
| Component story scope | variant/size props 보유 컴포넌트 약 15~20개 개선 | 5개 파일 우선 개선 | Significant | drift는 tasks 범위 축소에서 발생 |
| Spacing coverage | Tailwind spacing scale 전체 시각화 | 주요 값 subset 시각화 | Significant | spec 문구와 구현 수준 불일치 |
| Page story layout | 모든 page story fullscreen | 동일 | None | 계획 일치 |

## Significant Deviations

### SIGNIFICANT: 컴포넌트 props 커버리지 범위 축소

- Evidence: `tasks.md`는 T007~T011 다섯 개 파일만 대상으로 정의했고, 실제 수정도 5개에 그쳤다
- Impact: FR-005와 SC-003의 전체 커버리지 목표를 충족하지 못함
- Discovery point: tasks generation
- Cause: scope reduction without back-propagating spec change
- Prevention: tasks 생성 시 `spec.md`의 정량 목표(`100%`, `15~20개`)를 체크리스트로 강제 검증

### SIGNIFICANT: spacing guide가 전체 스케일이 아닌 curated subset으로 구현됨

- Evidence: `packages/ui/src/stories/guide/spacing.stories.tsx`
- Impact: FR-004와 SC-002를 부분 충족에 머무르게 함
- Discovery point: implementation
- Cause: research의 `주요 값` 표현이 spec의 `모든 단계` 표현을 약화시킴
- Prevention: research/plan 단계에서 `all` vs `major`를 명시적으로 고정

### SIGNIFICANT: Typography acceptance scenario의 line-height 항목 누락

- Evidence: `spec.md` User Story 1 Acceptance Scenario 1 vs `guide/typography.stories.tsx`
- Impact: 시나리오 레벨 검증 기준과 구현 기준이 어긋남
- Discovery point: specification/tasks mismatch
- Cause: spec scenario와 FR/task 정렬 부족
- Prevention: spec 작성 후 acceptance scenario와 FR/task 간 cross-check 자동화

## Minor Deviations

### MINOR: FR-007은 전체 대상 기준으로 명시적 입증이 부족함

- 기존 `argTypes`는 유지되었지만, variant/size 보유 전 대상 컴포넌트에 대해 controls completeness를 검증한 흔적은 없다

### MINOR: SC-005는 탐색성 개선은 분명하지만 측정 근거가 없다

- UX 가치는 높지만 `30초 이내`라는 정량 기준은 테스트나 관찰 데이터가 필요하다

## Innovations And Best Practices

### POSITIVE: 공통 helper 추상화는 계획보다 재사용성이 높음

- `ColorSwatch`, `PrimitiveColorGroup`, `SemanticColorTable`, `SpacingBar`, `FontFamilySection`, `FontWeightSection`, `MotionDemo`를 하나의 helper layer에 정리했다
- 반복되는 문서 UI를 Storybook 내부에서 일관된 패턴으로 유지할 수 있다
- 향후 token guide 확장 시 재사용성이 높다

### POSITIVE: primitive color import를 public aggregate export로 정리

- 실제 구현은 direct source path 대신 `@myorg/tokens`의 `colors` export를 사용했다
- public API를 따르는 방향이라 유지보수성과 패키지 경계 측면에서 더 안전하다

## Constitution Compliance

| Article | Status | Notes |
|--------|--------|-------|
| I. 코드 품질 | PASS | helper 추상화로 중복 감소, lint 통과 |
| II. 테스트 표준 | PASS | 비즈니스 로직 추가 없음, 기존 play function 유지, lint/build 검증 수행 |
| III. UX 일관성 | PASS | semantic utility class와 기존 Storybook 패턴 유지 |
| IV. 성능 요구사항 | PASS | 정적 Storybook 문서 범위, 성능 회귀 징후 없음 |
| V. 단순성 | PASS | 신규 의존성 없이 파일 단위 변경으로 해결 |

결론: **명시적인 constitution violation 없음**

## Unspecified Implementations

- `FontWeightSection` helper는 tasks의 foundational helper 목록에는 직접 적혀 있지 않았지만 typography story 구성을 위해 추가되었다
- `MotionDemo`는 hook 기반 자동 재생 애니메이션을 사용해 정적 문서보다 더 명확한 motion preview를 제공한다

## Task Execution Analysis

- Task completion: `19/19 = 100%`
- Validation tasks(T018, T019)까지 완료되어 task plan 자체는 fully executed 상태다
- 핵심 문제는 implementation failure가 아니라 **tasks 자체가 spec의 일부 정량 요구를 충분히 대표하지 못했다는 점**이다
- 즉, execution fidelity는 높았고, planning fidelity가 낮았다

## Lessons Learned

1. `spec.md`에 정량 목표가 있으면 `tasks.md`에도 동일한 정량 검증 항목이 직접 나타나야 한다.
2. `all`, `100%`, `30초 이내` 같은 표현은 측정 방법이 함께 정의되지 않으면 쉽게 drift가 생긴다.
3. Storybook 문서 작업처럼 정적 산출물 중심 기능도 acceptance scenario와 task scope의 교차 검증이 필요하다.
4. guide story helper 추상화는 반복 렌더링이 많은 문서형 기능에서 특히 효과적이었다.

## Recommendations

### HIGH

1. FR-005/SC-003 대상 컴포넌트 inventory를 먼저 확정하고, 남은 variant/size 보유 컴포넌트에 대한 follow-up task를 생성한다.
2. spacing guide를 Tailwind 전체 scale로 확장하거나, 반대로 spec을 `주요 단계 curated scale`로 수정한다.

### MEDIUM

1. Typography guide에 line-height를 추가할지 spec에서 제거할지 결정한다.
2. SC-005 같은 UX 성공 기준에는 실제 측정 절차를 quickstart 또는 checklist에 추가한다.

### LOW

1. retrospective 단계에서 spec/task 정량 목표 diff를 자동 계산하는 검증 스크립트를 추가한다.

## File Traceability Appendix

| File | Purpose | Requirement Links |
|------|---------|-------------------|
| `packages/ui/src/stories/guide/_helpers.tsx` | guide 공통 렌더링 helper | FR-002, FR-003, FR-004, FR-004b, FR-008 |
| `packages/ui/src/stories/guide/typography.stories.tsx` | typography guide | FR-002, SC-002 |
| `packages/ui/src/stories/guide/color.stories.tsx` | color guide | FR-003, FR-008, SC-002 |
| `packages/ui/src/stories/guide/spacing.stories.tsx` | spacing guide | FR-004, SC-002 |
| `packages/ui/src/stories/guide/motion.stories.tsx` | motion guide | FR-004b, SC-002 |
| `packages/ui/src/stories/alert.stories.tsx` | alert gallery | FR-005, FR-007 |
| `packages/ui/src/components/avatar.stories.tsx` | avatar size gallery | FR-005, FR-007 |
| `packages/ui/src/components/switch.stories.tsx` | switch size/state gallery | FR-005, FR-007 |
| `packages/ui/src/stories/spinner.stories.tsx` | spinner size gallery | FR-005, FR-007 |
| `packages/ui/src/stories/tabs.stories.tsx` | tabs orientation gallery | FR-005, FR-007 |
| `packages/ui/src/stories/AuthPage.stories.tsx` | page category/title normalization | FR-001, FR-006, SC-001, SC-004 |
| `packages/ui/src/stories/DashboardPage.stories.tsx` | page category/title normalization | FR-001, FR-006, SC-001, SC-004 |
| `packages/ui/src/stories/FormPage.stories.tsx` | page title + fullscreen | FR-001, FR-006, SC-001, SC-004 |
| `packages/ui/src/stories/SettingsPage.stories.tsx` | page title + fullscreen | FR-001, FR-006, SC-001, SC-004 |
| `specs/009-storybook-token-stories/tasks.md` | execution evidence | completion_rate, task fidelity |

## Self-Assessment Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Evidence completeness | PASS | 모든 주요 deviation에 file/task evidence 포함 |
| Coverage integrity | PASS | FR/SC 전체 14개 항목 평가 완료 |
| Metrics sanity | PASS | completion_rate 100%, adherence 75.0% 계산식 명시 |
| Severity consistency | PASS | 영향도에 맞춰 SIGNIFICANT/MINOR/POSITIVE 구분 |
| Constitution review | PASS | 위반 없음 명시 |
| Human Gate readiness | PASS | Proposed Spec Changes 섹션 준비 완료 |
| Actionability | PASS | 우선순위별 follow-up 제안 포함 |
