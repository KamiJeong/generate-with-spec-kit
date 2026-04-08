---
feature: Storybook Stories Props 정의 보강
branch: 011-storybook-props-improve
date: 2026-04-08
completion_rate: 100
spec_adherence: 92
tasks_total: 47
tasks_completed: 47
critical_findings: 0
significant_findings: 1
minor_findings: 2
positive_findings: 2
---

# 회고 보고서: Storybook Stories Props 정의 보강

## 요약

47개 태스크 전부 완료(100%). 모든 대상 스토리 파일에 `argTypes` 보강이 이루어졌고, Controls 연동·Docs 탭 자동 문서화·named story args 초기값 설정까지 세 User Story를 모두 충족했다. 기존 play 함수는 전부 유지되었으며(FR-008), Storybook 빌드·lint·test가 모두 통과(T045–T047)했다. 전반적으로 스펙 준수도가 높고 품질 게이트도 통과했으나, FR-005(`children` argTypes 정의)가 일부 미흡하고, 특정 스토리에서 Default render가 args와 완전히 연동되지 않는 패턴이 남아 있다.

**Spec Adherence 계산**

| 항목 | 수 |
|------|-----|
| 총 요구사항 (FR×8 + SC×5) | 13 |
| IMPLEMENTED | 11 |
| PARTIAL | 2 (FR-005, FR-004 일부) |
| NOT IMPLEMENTED | 0 |

`Spec Adherence = (11 + 2×0.5) / 13 × 100 ≈ 92%`

---

## Proposed Spec Changes

> 아래 변경을 `spec.md`에 반영하려면 별도 승인이 필요합니다.

| 항목 | 현재 내용 | 제안 변경 |
|------|-----------|-----------|
| FR-005 | `children` prop을 argTypes에 항상 정의 | compound 구조 및 play 함수 보호 스토리에서는 meta-level argTypes 대신 story-level args로 `children` 제공 허용 |
| FR-004 | 모든 named story에 args 기반 render 요구 | showcase(Sizes, IconSizes, Variants) 스토리는 고정 render 허용 — 단, Controls 연동 목적의 named story는 args 기반 필수 유지 |

---

## 요구사항 커버리지 매트릭스

| ID | 설명 | 상태 | 근거 |
|----|------|------|------|
| FR-001 | 모든 스토리에 argTypes 선언 | ✅ IMPLEMENTED | 대상 20개 파일 전부 argTypes 보강 완료 |
| FR-002 | 컨트롤 타입 명시 (select/boolean/text/number) | ✅ IMPLEMENTED | 전 파일에서 control 타입 명시 확인 |
| FR-003 | enum/union props에 options 배열 | ✅ IMPLEMENTED | variant·orientation·type 등 select 타입 전부 options 포함 |
| FR-004 | named story에 args 포함 + args 기반 render | ⚠️ PARTIAL | Primary/Destructive/Outline 등 args 기반 완료, Sizes·IconSizes·Variants 등 showcase 스토리는 고정 render 유지 |
| FR-005 | `children` prop argTypes 정의 | ⚠️ PARTIAL | `button.stories.tsx` Playground에서 args로만 제공; meta-level argTypes에 children 미포함 |
| FR-006 | boolean props에 `control: 'boolean'` 명시 | ✅ IMPLEMENTED | disabled·required·collapsible·decorative 전부 boolean control 확인 |
| FR-007 | 고정 render 스토리에 Playground 추가 또는 args 연동 수정 | ✅ IMPLEMENTED | button, alert, spinner, empty, item 등 Pattern B(Playground 추가) 적용 |
| FR-008 | 기존 play 함수 동작 유지 | ✅ IMPLEMENTED | T046 통과, 기존 interaction tests 전부 유지 |
| SC-001 | 모든 스토리 Controls에 1개 이상 조작 가능한 prop | ✅ IMPLEMENTED | 전 대상 스토리 argTypes 보강 |
| SC-002 | variant/size/disabled 변경 시 캔버스 즉시 업데이트 | ✅ IMPLEMENTED | args 기반 render로 연동됨 |
| SC-003 | autodocs Docs 탭 Props 테이블에 주요 props 표시 | ✅ IMPLEMENTED | description·table.defaultValue 추가 완료 |
| SC-004 | 기존 play 함수 모두 통과 | ✅ IMPLEMENTED | T046 통과 |
| SC-005 | Controls 패널만으로 상태 탐색 가능 | ✅ IMPLEMENTED | Playground 스토리 또는 args 연동 render로 달성 |

---

## 성공 기준 평가

| SC | 결과 | 비고 |
|----|------|------|
| SC-001 | PASS | 전 스토리 Controls에 최소 1개 이상 prop 표시 |
| SC-002 | PASS | args 연동 render로 실시간 업데이트 |
| SC-003 | PASS | description + defaultValue 보강 완료 |
| SC-004 | PASS | T046(pnpm test) 통과 |
| SC-005 | PASS | Playground 스토리 또는 args render로 달성 |

---

## 아키텍처 드리프트

| 항목 | Plan 내용 | 구현 결과 | 분류 |
|------|-----------|-----------|------|
| Pattern A/B 분기 | play 함수 유무로 A/B 결정 | 그대로 적용 | NONE |
| button.stories.tsx meta render | args 무시 fixed render 유지 + Playground 추가 | Playground 추가로 충족; meta render는 고정 유지 | MINOR |
| item.stories.tsx | Playground 추가 (패턴 B or A) | Default는 fixed render, Playground story 추가 | MINOR |
| 컴포넌트 구현 파일 수정 금지 | 스토리 파일만 수정 | 준수 | NONE |

---

## 주요 편차

### SIGNIFICANT

#### S01: FR-005 (`children` argTypes) — meta 레벨 미정의

**근거**: `packages/ui/src/stories/button.stories.tsx`의 meta `argTypes`에 `children`이 없음. Playground story `args: { children: 'Button' }` 으로만 제공됨.

**영향**: Docs 탭 Props 테이블에 `children`이 자동 노출되지 않아 문서화 불완전.

**권장 조치**: FR-005를 완화하거나 해당 스토리에 `children: { control: 'text' }` argType을 meta에 추가.

**심각도**: SIGNIFICANT

---

### MINOR

#### M01: button.stories.tsx Default — meta render args 미연동

`Default` 스토리는 고정 render(`() => <div><Button>...</Button></div>`)를 유지. Controls를 변경해도 Default 스토리 캔버스는 업데이트되지 않음. `Playground` 스토리가 이를 보완하므로 SC-001·SC-002는 충족.

**심각도**: MINOR

#### M02: showcase 스토리 고정 render 유지

`Sizes`, `IconSizes`, `Variants` 등 조합 표시 스토리는 고정 render 유지. FR-004의 "named story는 args 기반"의 정확한 범위가 spec에서 불명확했음.

**심각도**: MINOR

---

## 긍정적 편차 (Innovations)

### P01: renderAccordionStory helper 함수 도입

`accordion.stories.tsx`에서 `type`과 `collapsible` args를 받아 단일 vs. 다중 패널 구조를 분기하는 헬퍼 함수 사용. Accordion의 compound 구조 특성상 단순 `{...args}` spread가 불가능한 제약을 우아하게 해결.

**재사용 가능성**: compound 컴포넌트 스토리 패턴으로 정착 가능.

### P02: table.defaultValue 일관 적용

spec FR-002는 control 타입만 요구했으나, 구현에서 `table.defaultValue.summary`를 거의 모든 argType에 추가. Docs 탭 Props 테이블의 정보 밀도가 spec 기대치 이상으로 향상.

---

## Constitution 준수 검토

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 (단일 책임, DRY) | ✅ PASS | 각 스토리 파일은 단일 컴포넌트. argTypes 반복은 각 파일 독립 메타데이터이므로 추상화 불필요 (2회 이하 규칙 적용) |
| II. 테스트 표준 (play 함수 유지) | ✅ PASS | T046 통과, 모든 interaction tests 유지 |
| III. UX 일관성 (Controls 패턴 통일) | ✅ PASS | Pattern A/B/C 일관 적용 |
| IV. 성능 요구사항 | ✅ PASS | 스토리 메타데이터 변경, 런타임 영향 없음 |
| V. 단순성 (YAGNI) | ✅ PASS | 외부 의존성 추가 없음 |

**Constitution 위반: 없음**

---

## 미지정 구현 (Unspecified Implementations)

| 항목 | 위치 | 비고 |
|------|------|------|
| renderFieldStory 헬퍼 함수 | `field.stories.tsx` | Field는 children으로 Input을 받는 compound 구조라 args spread 불가 — 적절한 해결책 |
| `accordion.stories.tsx` 중 collapsible을 Multiple 스토리에서 false 고정 | `accordion.stories.tsx:88` | Multiple 타입에선 collapsible 무의미하므로 args를 false로 고정 — 스펙 외 세부 결정이나 적절함 |

---

## 태스크 실행 분석

| 단계 | 태스크 수 | 완료 | 완료율 |
|------|-----------|------|--------|
| Phase 1 (Setup) | 1 | 1 | 100% |
| Phase 2 (Foundational) | 1 | 1 | 100% |
| Phase 3 (US1) | 17 | 17 | 100% |
| Phase 4 (US2) | 18 | 18 | 100% |
| Phase 5 (US3) | 7 | 7 | 100% |
| Phase 6 (Polish) | 3 | 3 | 100% |
| **전체** | **47** | **47** | **100%** |

---

## 교훈 및 권장사항

### HIGH

1. **FR-005 명확화**: 다음 feature에서 `children`을 가진 컴포넌트 스토리 작성 시, meta-level argTypes에 명시할지 story-level args로만 처리할지 spec에 명확히 기술한다. "compound 구조이면 args만, 단순 컴포넌트면 meta argTypes에도 포함" 기준 도입 권장.

2. **named story 범위 정의**: FR-004의 "named story"에서 showcase(Sizes, Variants 등) 스토리를 명시적으로 제외하는 조항 추가. showcase 스토리는 고정 render가 적합하다는 패턴 C를 명문화.

### MEDIUM

3. **Pattern C(compound/showcase) 스펙 반영**: research.md와 quickstart.md에 이미 패턴 C가 정의되어 있으나, spec.md의 FR-004가 이를 반영하지 못함. 다음 speckit 사이클에서 spec ↔ plan 일관성 검토 강화.

### LOW

4. **`table.defaultValue` 표준화**: P02 긍정적 편차를 constitution 또는 quickstart.md에 베스트 프랙티스로 문서화하면 이후 스토리 작성 시 일관성을 높일 수 있음.

---

## 파일 추적 부록

| 파일 | 태스크 | 변경 유형 |
|------|--------|-----------|
| `packages/ui/src/stories/button.stories.tsx` | T003, T020, T038 | argTypes 보강 + Playground 추가 + named stories args |
| `packages/ui/src/stories/alert.stories.tsx` | T004, T021, T039 | argTypes 보강 + Playground 추가 + named stories args |
| `packages/ui/src/stories/checkbox.stories.tsx` | T005, T022 | argTypes 추가 + description 보강 |
| `packages/ui/src/stories/input.stories.tsx` | T006, T023 | argTypes 추가 + description 보강 |
| `packages/ui/src/stories/spinner.stories.tsx` | T007, T024 | render args 연동 + description |
| `packages/ui/src/stories/tabs.stories.tsx` | T008, T025, T041 | Playground 추가 + description + named story args |
| `packages/ui/src/stories/radio-group.stories.tsx` | T009, T026, T042 | argTypes 추가 + description + named story args |
| `packages/ui/src/stories/native-select.stories.tsx` | T010, T027 | argTypes 추가 + description |
| `packages/ui/src/stories/field.stories.tsx` | T011, T028 | argTypes 추가 + description |
| `packages/ui/src/stories/input-group.stories.tsx` | T012, T029 | argTypes 추가 + description |
| `packages/ui/src/stories/accordion.stories.tsx` | T013, T030, T040 | argTypes 추가 + description + named story args |
| `packages/ui/src/stories/card.stories.tsx` | T037 | component description 추가 (패턴 C) |
| `packages/ui/src/components/progress.stories.tsx` | T014, T031, T043 | argTypes 추가 + description + named story args |
| `packages/ui/src/components/separator.stories.tsx` | T015, T032, T044 | argTypes 추가 + description + named story args |
| `packages/ui/src/components/kbd.stories.tsx` | T016, T033 | argTypes 추가 + Playground |
| `packages/ui/src/components/label.stories.tsx` | T017, T034 | argTypes 추가 + Playground |
| `packages/ui/src/components/empty.stories.tsx` | T018, T035 | argTypes 추가 + Playground |
| `packages/ui/src/components/item.stories.tsx` | T019, T036 | argTypes 추가 + Playground |
