# Tasks: Storybook Stories Props 정의 보강

**Input**: Design documents from `/specs/011-storybook-props-improve/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: 태스크는 User Story 단위로 구성되어 각 스토리를 독립적으로 구현하고 테스트할 수 있다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 태스크가 속한 User Story (US1, US2, US3)
- 파일 경로를 설명에 포함

---

## Phase 1: Setup

**Purpose**: 스토리 파일 수정 전 현황 파악 및 빌드 환경 확인

- [X] T001 현재 storybook 빌드가 정상인지 확인: `pnpm --filter @myorg/ui build-storybook`

---

## Phase 2: Foundational (공통 패턴 결정)

**Purpose**: 모든 User Story에 적용할 argTypes 패턴 확정 (research.md, quickstart.md 기반)

**⚠️ CRITICAL**: 패턴 A/B/C 결정이 완료되어야 개별 스토리 수정 가능. 단, research.md에서 이미 결정되어 있으므로 이 Phase는 문서 확인용

- [X] T002 research.md의 패턴 A/B/C 및 data-model.md의 argTypes 스펙 최종 확인

**Checkpoint**: 패턴 확정 — 이후 모든 User Story 작업 병렬 진행 가능

---

## Phase 3: User Story 1 - Controls 패널에서 props 조작 (Priority: P1) 🎯 MVP

**Goal**: Controls 패널에서 주요 props를 인터랙티브하게 조작하여 컴포넌트 상태를 실시간으로 변경할 수 있다.

**Independent Test**: 개선된 스토리를 Storybook에서 열고 Controls 탭에서 적어도 1개 이상의 prop이 조작 가능한 컨트롤로 표시되며, 변경 시 캔버스가 업데이트되면 충족.

### 3-1. stories/ 디렉토리 스토리 개선

- [X] T003 [P] [US1] `packages/ui/src/stories/button.stories.tsx` — 기존 argTypes(variant/size/disabled) 유지, Default render를 args 연동으로 수정 또는 Playground 스토리 추가 (패턴 B: play 함수 확인 후 결정)
- [X] T004 [P] [US1] `packages/ui/src/stories/alert.stories.tsx` — variant argTypes 유지, Default render args 연동 또는 Playground 스토리 추가 (패턴 B)
- [X] T005 [P] [US1] `packages/ui/src/stories/checkbox.stories.tsx` — argTypes 추가(defaultChecked boolean, disabled boolean), render → `(args) => <Checkbox {...args} />` 연동 (패턴 A)
- [X] T006 [P] [US1] `packages/ui/src/stories/input.stories.tsx` — argTypes 추가(type select, placeholder text, disabled boolean), render → args 연동 (패턴 A)
- [X] T007 [P] [US1] `packages/ui/src/stories/spinner.stories.tsx` — 기존 size argTypes 유지, Default render → `(args) => <Spinner {...args} />` 연동 (패턴 A, play 함수 안전 여부 research.md 확인)
- [X] T008 [P] [US1] `packages/ui/src/stories/tabs.stories.tsx` — orientation argTypes 유지, named stories 유지하고 Playground 스토리 추가 (패턴 B)
- [X] T009 [P] [US1] `packages/ui/src/stories/radio-group.stories.tsx` — argTypes 추가(orientation select, disabled boolean), render → args 연동 (패턴 A)
- [X] T010 [P] [US1] `packages/ui/src/stories/native-select.stories.tsx` — argTypes 추가(disabled boolean, required boolean), render → args 연동 (패턴 A)
- [X] T011 [P] [US1] `packages/ui/src/stories/field.stories.tsx` — argTypes 추가(label text, error text, required boolean), render → args 연동 (패턴 A)
- [X] T012 [P] [US1] `packages/ui/src/stories/input-group.stories.tsx` — argTypes 추가(prefix text, suffix text), render → args 연동 (패턴 A)
- [X] T013 [P] [US1] `packages/ui/src/stories/accordion.stories.tsx` — argTypes 추가(type select ['single','multiple'], collapsible boolean), render → args 연동 (패턴 A)

### 3-2. components/ 디렉토리 스토리 개선

- [X] T014 [P] [US1] `packages/ui/src/components/progress.stories.tsx` — argTypes 추가(value number {min:0,max:100}, max number {min:1}), render → args 연동 (패턴 A)
- [X] T015 [P] [US1] `packages/ui/src/components/separator.stories.tsx` — argTypes 추가(orientation select ['horizontal','vertical'], decorative boolean), render → args 연동 (패턴 A)
- [X] T016 [P] [US1] `packages/ui/src/components/kbd.stories.tsx` — argTypes 추가(children text), Playground 스토리 추가 `args: { children: 'K' }` (패턴 B or A)
- [X] T017 [P] [US1] `packages/ui/src/components/label.stories.tsx` — argTypes 추가(children text), Playground 스토리 추가 `args: { children: 'Label' }` (패턴 B or A)
- [X] T018 [P] [US1] `packages/ui/src/components/empty.stories.tsx` — argTypes 추가(title text, description text), Playground 스토리 추가 `args: { title: 'No data', description: '' }` (패턴 B or A)
- [X] T019 [P] [US1] `packages/ui/src/components/item.stories.tsx` — argTypes 추가(label text, shortcut text), Playground 스토리 추가 `args: { label: 'Profile', shortcut: 'P' }` (패턴 B or A)

**Checkpoint**: 이 시점에서 Controls 패널에서 모든 대상 컴포넌트의 props를 인터랙티브하게 조작 가능해야 함

---

## Phase 4: User Story 2 - ArgTypes를 통한 자동 문서화 (Priority: P2)

**Goal**: Docs 탭에서 각 컴포넌트의 props 테이블이 완전하게 표시되며 타입·기본값·설명을 확인 가능.

**Independent Test**: Docs 탭의 Props 테이블에 각 prop의 이름, 타입, 기본값, description이 표시되면 충족.

### 4-1. argTypes에 description 및 table.defaultValue 보강

- [X] T020 [P] [US2] `packages/ui/src/stories/button.stories.tsx` — 기존 argTypes에 description 및 `table.defaultValue` 추가
- [X] T021 [P] [US2] `packages/ui/src/stories/alert.stories.tsx` — variant argTypes에 description 및 defaultValue 추가
- [X] T022 [P] [US2] `packages/ui/src/stories/checkbox.stories.tsx` — T005에서 추가한 argTypes에 description 및 defaultValue 확인 (data-model.md 기준으로 보강)
- [X] T023 [P] [US2] `packages/ui/src/stories/input.stories.tsx` — T006에서 추가한 argTypes에 description 및 defaultValue 확인
- [X] T024 [P] [US2] `packages/ui/src/stories/spinner.stories.tsx` — size argTypes에 description 추가
- [X] T025 [P] [US2] `packages/ui/src/stories/tabs.stories.tsx` — orientation argTypes에 description 추가
- [X] T026 [P] [US2] `packages/ui/src/stories/radio-group.stories.tsx` — T009에서 추가한 argTypes description 확인
- [X] T027 [P] [US2] `packages/ui/src/stories/native-select.stories.tsx` — T010에서 추가한 argTypes description 확인
- [X] T028 [P] [US2] `packages/ui/src/stories/field.stories.tsx` — T011에서 추가한 argTypes description 확인
- [X] T029 [P] [US2] `packages/ui/src/stories/input-group.stories.tsx` — T012에서 추가한 argTypes description 확인 (단순 문자열만 지원 명시)
- [X] T030 [P] [US2] `packages/ui/src/stories/accordion.stories.tsx` — T013에서 추가한 argTypes description 확인
- [X] T031 [P] [US2] `packages/ui/src/components/progress.stories.tsx` — T014에서 추가한 argTypes description 확인
- [X] T032 [P] [US2] `packages/ui/src/components/separator.stories.tsx` — T015에서 추가한 argTypes description 확인
- [X] T033 [P] [US2] `packages/ui/src/components/kbd.stories.tsx` — T016에서 추가한 argTypes description 확인
- [X] T034 [P] [US2] `packages/ui/src/components/label.stories.tsx` — T017에서 추가한 argTypes description 확인
- [X] T035 [P] [US2] `packages/ui/src/components/empty.stories.tsx` — T018에서 추가한 argTypes description 확인
- [X] T036 [P] [US2] `packages/ui/src/components/item.stories.tsx` — T019에서 추가한 argTypes description 확인
- [X] T037 [P] [US2] `packages/ui/src/stories/card.stories.tsx` — argTypes 없이 meta에 description만 추가 (compound 구조상 Controls 연동 불가, 패턴 C)

**Checkpoint**: 이 시점에서 Docs 탭 Props 테이블에 모든 주요 props의 타입·기본값·설명이 표시되어야 함

---

## Phase 5: User Story 3 - 스토리별 args를 통한 초기 상태 표현 (Priority: P3)

**Goal**: 각 named story에 `args`가 설정되어 Controls 패널에 시작 상태가 표시되고, 사용자가 추가 조작 가능.

**Independent Test**: Accordion의 Single 스토리를 열었을 때 Controls에 `type: 'single'`이 초기값으로 표시되고 변경 가능하면 충족.

### 5-1. Named stories에 args 추가

- [X] T038 [P] [US3] `packages/ui/src/stories/button.stories.tsx` — 각 named story(Primary, Secondary, Destructive 등)에 해당 variant/size args 확인 및 추가
- [X] T039 [P] [US3] `packages/ui/src/stories/alert.stories.tsx` — named story(Default, Destructive, Warning 등)에 variant args 확인 및 추가
- [X] T040 [P] [US3] `packages/ui/src/stories/accordion.stories.tsx` — Single/Multiple named stories에 `type` args 추가
- [X] T041 [P] [US3] `packages/ui/src/stories/tabs.stories.tsx` — Line/Vertical/AllOrientations named stories에 `orientation` args 확인
- [X] T042 [P] [US3] `packages/ui/src/stories/radio-group.stories.tsx` — Horizontal/Vertical named stories에 `orientation` args 추가
- [X] T043 [P] [US3] `packages/ui/src/components/progress.stories.tsx` — named stories(Loading, Complete 등)에 `value` args 확인 및 추가
- [X] T044 [P] [US3] `packages/ui/src/components/separator.stories.tsx` — Horizontal/Vertical named stories에 `orientation` args 추가

**Checkpoint**: 모든 named story에서 Controls 패널에 해당 스토리의 초기 args가 표시되어야 함

---

## Phase 6: Polish & 검증

**Purpose**: 빌드 확인, play 함수 테스트 통과, 전체 품질 검증

- [X] T045 Storybook 빌드 확인: `pnpm --filter @myorg/ui build-storybook` (SC-001~005 검증)
- [X] T046 [P] Storybook interaction tests (play 함수) 실행: `pnpm --filter @myorg/ui test` (SC-004 검증: 기존 play 함수 모두 통과 확인)
- [X] T047 [P] Storybook lint 확인: `pnpm --filter @myorg/ui lint`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 후 — 이후 모든 User Story 병렬 진행 가능
- **User Story 1 (Phase 3)**: Foundational 완료 후 시작. T003~T019 모두 [P] — 병렬 실행 가능
- **User Story 2 (Phase 4)**: Phase 3 완료 후 시작 (argTypes가 먼저 추가되어야 description 보강 가능)
- **User Story 3 (Phase 5)**: Phase 3 완료 후 시작 (render 연동이 먼저 되어야 args가 의미 있음)
- **Polish (Phase 6)**: 원하는 User Story 완료 후 언제든 실행

### User Story Dependencies

- **US1 (P1)**: Foundational 완료 후 즉시 시작 — 다른 스토리 의존 없음
- **US2 (P2)**: US1 완료 후 시작 — argTypes 추가가 선행되어야 description 보강 가능
- **US3 (P3)**: US1 완료 후 시작 — render 연동이 선행되어야 named story args가 의미 있음

### Parallel Opportunities

- Phase 3 내 T003~T019: 모두 다른 파일, 병렬 실행 가능
- Phase 4 내 T020~T037: 모두 다른 파일, 병렬 실행 가능
- Phase 5 내 T038~T044: 모두 다른 파일, 병렬 실행 가능
- Phase 6의 T046, T047: 병렬 실행 가능

---

## Parallel Example: User Story 1

```bash
# Phase 3의 모든 스토리 파일 동시 수정 가능:
Task: T003 packages/ui/src/stories/button.stories.tsx
Task: T004 packages/ui/src/stories/alert.stories.tsx
Task: T005 packages/ui/src/stories/checkbox.stories.tsx
Task: T006 packages/ui/src/stories/input.stories.tsx
Task: T007 packages/ui/src/stories/spinner.stories.tsx
Task: T008 packages/ui/src/stories/tabs.stories.tsx
Task: T009 packages/ui/src/stories/radio-group.stories.tsx
Task: T010 packages/ui/src/stories/native-select.stories.tsx
Task: T011 packages/ui/src/stories/field.stories.tsx
Task: T012 packages/ui/src/stories/input-group.stories.tsx
Task: T013 packages/ui/src/stories/accordion.stories.tsx
Task: T014 packages/ui/src/components/progress.stories.tsx
Task: T015 packages/ui/src/components/separator.stories.tsx
Task: T016 packages/ui/src/components/kbd.stories.tsx
Task: T017 packages/ui/src/components/label.stories.tsx
Task: T018 packages/ui/src/components/empty.stories.tsx
Task: T019 packages/ui/src/components/item.stories.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: 빌드 환경 확인
2. Phase 2: 패턴 확인
3. Phase 3: US1 — Controls 패널 조작 가능 (T003~T019, 병렬 실행)
4. **STOP and VALIDATE**: `pnpm --filter @myorg/ui build-storybook` 실행 후 각 스토리 Controls 확인
5. 충분하면 여기서 완료 가능

### Incremental Delivery

1. Phase 1+2 → 환경 확인
2. Phase 3 (US1) → Controls 조작 가능 → 검증
3. Phase 4 (US2) → Docs 탭 Props 테이블 완성 → 검증
4. Phase 5 (US3) → named story args 완성 → 검증
5. Phase 6 → 최종 빌드·테스트 통과

---

## Notes

- [P] 태스크 = 다른 파일, 병렬 실행 가능
- [Story] 레이블이 User Story와 태스크 추적 연결
- 컴포넌트 구현 파일(`.tsx`) 수정 금지 — 스토리 파일만 수정
- play 함수가 있는 스토리(button, alert, spinner 등)는 패턴 B 적용 (Default 유지 + Playground 추가)
- play 함수가 없는 스토리는 패턴 A 적용 (render → args 연동)
- badge.stories.tsx, switch.stories.tsx, avatar.stories.tsx는 이미 충분 — 수정 불필요
- card.stories.tsx는 compound 구조 — description만 추가 (T037)
- 총 태스크: 47개 (Setup 1, Foundational 1, US1 17, US2 18, US3 7, Polish 3)
