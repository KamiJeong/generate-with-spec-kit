# Tasks: Storybook 품질 고도화

**Input**: `/specs/007-storybook-setup/` 설계 문서 전체
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**조직**: 사용자 스토리 별로 태스크를 구성하여 각 스토리를 독립적으로 구현·검증 가능하게 함

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 다른 파일에서 병렬 실행 가능 (의존성 없음)
- **[Story]**: 해당 태스크가 속한 사용자 스토리 (US1~US7)
- 설명에 정확한 파일 경로 포함

### 핵심 규칙 (research.md 결정사항)
- union/enum 타입 Controls 위젯은 모두 `select`로 통일 (radio 사용 안 함)
- `docs.source.type: 'dynamic'`으로 Controls 변경 시 코드 실시간 반영
- 기존 play 테스트와 meta `render`는 절대 변경하지 않는다
- 시각적 스냅샷 기준선은 `packages/ui/__snapshots__/`에 저장, git 커밋
- 단위 테스트는 기존 play 테스트와 독립적으로 추가 작성

---

## Phase 1: Setup (환경 구성)

**목적**: Vitest 단위 테스트 환경 및 시각적 테스트 설정 구성

- [x] T001 `packages/ui/package.json` devDependencies에 vitest 관련 6개 패키지 추가: `vitest@^2.0.0`, `@vitest/coverage-v8@^2.0.0`, `@storybook/experimental-addon-test@10.3.3`, `@testing-library/react@^16.0.0`, `@testing-library/jest-dom@^6.0.0`, `jsdom@^26.0.0` — `pnpm install` 실행
- [x] T002 `packages/ui/src/test-setup.ts` 신규 생성 — `@testing-library/jest-dom` import 및 vitest globals 설정
- [x] T003 `packages/ui/vitest.config.ts` 신규 생성 — jsdom 환경, coverage provider v8, include: `src/components/**/*.tsx`, exclude: `**/*.stories.tsx`, reporter: `['text', 'html', 'lcov']`
- [x] T004 `packages/ui/.storybook/test-runner-setup.ts` 신규 생성 — Playwright `toHaveScreenshot()` postVisit 훅, maxDiffPixelRatio: 0.02, animations: 'disabled'
- [x] T005 `packages/ui/package.json` scripts에 `"test": "vitest"`, `"test:coverage": "vitest --coverage"` 추가

---

## Phase 2: Foundational (공통 Storybook 설정)

**목적**: US2~US3에 필요한 preview.tsx 전역 설정 변경. 이후 모든 US 구현의 기반

**⚠️ CRITICAL**: T001~T005 완료 후 진행

- [x] T006 `packages/ui/.storybook/preview.tsx` 수정 — `parameters.controls`에 `expanded: true` 추가, `parameters.docs`에 `source: { type: 'dynamic' }` 추가
- [x] T007 `pnpm --filter @myorg/ui lint` 실행하여 현재 lint 에러 기준선 확인
- [x] T008 `pnpm --filter @myorg/ui build-storybook` 실행하여 현재 빌드 상태 확인

**Checkpoint**: Foundational 완료 — US1~US7 병렬 시작 가능 (T001~T008 완료 필요)

---

## Phase 3: User Story 1 — Props Controls 타입 매핑 (Priority: P1) 🎯 MVP

**Goal**: 주요 8개 컴포넌트의 Controls 패널에서 union/enum prop이 select 위젯으로 표시된다.

**Independent Test**: Button 스토리 Controls 패널에서 `variant` prop이 select 드롭다운으로 표시되고 유효한 옵션만 선택 가능하면 통과

### Implementation for User Story 1

- [x] T009 [P] [US1] `packages/ui/src/stories/button.stories.tsx` — meta `argTypes`에 `variant: { control: 'select', options: [...] }`, `size: { control: 'select', options: [...] }`, `disabled: { control: 'boolean' }` 추가
- [x] T010 [P] [US1] `packages/ui/src/components/badge.stories.tsx` — meta `argTypes`에 `variant: { control: 'select', options: [...] }` 추가
- [x] T011 [P] [US1] `packages/ui/src/stories/alert.stories.tsx` — meta `argTypes`에 `variant: { control: 'select', options: [...] }` 추가
- [x] T012 [P] [US1] `packages/ui/src/stories/spinner.stories.tsx` — meta `argTypes`에 `size: { control: 'select', options: ['sm', 'default', 'lg'] }` 추가
- [x] T013 [P] [US1] `packages/ui/src/stories/tabs.stories.tsx` — meta `argTypes`에 적용 가능한 prop에 `control: 'select'` 추가
- [x] T014 [P] [US1] `packages/ui/src/components/switch.stories.tsx` — meta `argTypes`에 `size: { control: 'select', options: [...] }`, `disabled: { control: 'boolean' }` 추가
- [x] T015 [P] [US1] `packages/ui/src/components/avatar.stories.tsx` — meta `argTypes`에 `size: { control: 'select', options: [...] }` 추가
- [x] T016 [P] [US1] `packages/ui/src/components/sheet.stories.tsx` — meta `argTypes`에 `side: { control: 'select', options: ['top', 'bottom', 'left', 'right'] }` 추가
- [x] T017 [US1] Storybook 개발 서버 실행 후 Button/Badge/Avatar 스토리에서 Controls 패널 select 위젯 동작 확인 — variant/size 선택 시 캔버스 업데이트 검증

**Checkpoint**: T009~T017 완료 시 US1 독립 테스트 가능

---

## Phase 4: User Story 2 — 스토리 코드 확인 및 복사 (Priority: P2)

**Goal**: canvas 탭 "Show code" 토글 활성화, Controls 변경 시 코드 실시간 반영

**Independent Test**: Button > Destructive 스토리 canvas 탭에서 "Show code" 토글 클릭 시 JSX 코드 표시, Controls variant 변경 시 코드 즉시 업데이트되면 통과

### Implementation for User Story 2

- [x] T018 [US2] Storybook 개발 서버 실행 후 Button > Destructive 스토리 canvas 탭에서 "Show code" 토글 존재 및 동작 확인 — T006의 `docs.source.type: 'dynamic'` 설정 반영 여부 검증
- [x] T019 [US2] Controls 패널에서 `variant`를 변경할 때 "Show code" 코드 블록이 실시간으로 업데이트되는지 확인 — 정상 동작하지 않을 경우 해당 스토리에 `parameters.docs.source.type: 'dynamic'` 개별 추가

**Checkpoint**: T018~T019 완료 시 US2 독립 테스트 가능

---

## Phase 5: User Story 3 — 반응형 뷰포트 확인 (Priority: P3)

**Goal**: Storybook 툴바에서 Mobile/Tablet/Desktop 뷰포트 전환 동작 검증 (feature 006 기존 설정 활용)

**Independent Test**: Storybook 툴바에서 Mobile(375px) 선택 시 캔버스가 375px로 즉시 조정되면 통과

### Implementation for User Story 3

- [x] T020 [US3] Storybook 개발 서버에서 toolbar viewport 드롭다운으로 Mobile(375px) → Tablet(768px) → Desktop(1280px) 순서로 전환하여 캔버스 너비 변경 확인 — DashboardPage 스토리에서 각 뷰포트 렌더링 검증

**Checkpoint**: T020 완료 시 US3 독립 테스트 가능

---

## Phase 6: User Story 4 — 컴포넌트 단위 테스트 (Priority: P4)

**Goal**: 8개 주요 컴포넌트의 단위 테스트 작성 및 전체 통과 확인

**Independent Test**: `pnpm --filter @myorg/ui test` 실행 시 Button 단위 테스트가 포함되어 통과하면 통과

### Implementation for User Story 4

- [x] T021 [US4] `packages/ui/src/components/button.test.tsx` 신규 작성 — 기본 렌더링, variant prop 반영(`bg-destructive` 클래스 등), disabled 상태, onClick 이벤트 핸들링 테스트 (4개 이상 test case)
- [x] T022 [P] [US4] `packages/ui/src/components/badge.test.tsx` 신규 작성 — 기본 렌더링, variant별 클래스 반영, children 렌더링 테스트
- [x] T023 [P] [US4] `packages/ui/src/components/alert.test.tsx` 신규 작성 — 기본 렌더링, variant별 표시, title/description 렌더링 테스트
- [x] T024 [P] [US4] `packages/ui/src/components/spinner.test.tsx` 신규 작성 — 기본 렌더링, size prop 반영, aria-label('Loading') 존재 테스트
- [x] T025 [P] [US4] `packages/ui/src/components/switch.test.tsx` 신규 작성 — 기본 렌더링, 클릭 시 상태 변경(checked), disabled 상태 테스트
- [x] T026 [P] [US4] `packages/ui/src/components/avatar.test.tsx` 신규 작성 — 기본 렌더링, AvatarFallback 텍스트 표시, size prop 반영 테스트
- [x] T027 [P] [US4] `packages/ui/src/components/tabs.test.tsx` 신규 작성 — 기본 렌더링, 탭 전환 시 content 변경 테스트
- [x] T028 [P] [US4] `packages/ui/src/components/sheet.test.tsx` 신규 작성 — trigger 클릭 시 sheet 열림, close 버튼으로 닫힘 테스트
- [x] T029 [US4] `pnpm --filter @myorg/ui test` 실행하여 8개 컴포넌트 단위 테스트 전체 통과 확인
- [x] T030 [US4] `pnpm --filter @myorg/ui test-storybook` 실행하여 기존 play 테스트 regression 없음 확인

**Checkpoint**: T021~T030 완료 시 US4 독립 테스트 가능

---

## Phase 7: User Story 5 — 접근성 테스트 (Priority: P5)

**Goal**: 모든 컴포넌트 스토리 WCAG 접근성 위반 0건 달성

**Independent Test**: Storybook Accessibility 패널에서 임의의 컴포넌트 스토리가 "No violations"를 표시하면 통과

### Implementation for User Story 5

- [x] T031 [US5] Storybook 개발 서버 실행 후 주요 8개 컴포넌트 스토리의 Accessibility 패널을 열어 위반 항목 목록 수집 — 위반 유형별 분류 (명암비/aria/role 등)
- [x] T032 [P] [US5] T031에서 발견된 명암비(color-contrast) 위반 항목 수정 — 해당 컴포넌트 소스 파일(`packages/ui/src/components/*.tsx`) CSS 변수 또는 클래스 수정
- [x] T033 [P] [US5] T031에서 발견된 aria-label/accessible name 누락 위반 수정 — 해당 스토리 파일 또는 컴포넌트 소스에 `aria-label` 추가
- [x] T034 [US5] Storybook 재실행하여 주요 8개 컴포넌트 스토리 Accessibility 패널 "No violations" 확인 — `pnpm --filter @myorg/ui lint` 에러 0건 확인

**Checkpoint**: T031~T034 완료 시 US5 독립 테스트 가능

---

## Phase 8: User Story 6 — 시각적 회귀 테스트 (Priority: P6)

**Goal**: 모든 컴포넌트 스토리 시각적 기준선 스냅샷 생성 및 git 커밋

**Independent Test**: `pnpm --filter @myorg/ui test-storybook` 실행 후 `__snapshots__/` 디렉토리에 스냅샷 파일이 생성되면 통과

### Implementation for User Story 6

- [x] T035 [US6] `pnpm --filter @myorg/ui build-storybook` 실행하여 최신 Storybook 빌드 생성
- [x] T036 [US6] `packages/ui/.storybook/test-runner-setup.ts` 설정 기반으로 기준선 스냅샷 초기 생성 실행 — `pnpm --filter @myorg/ui test-storybook -- --update-snapshots`
- [x] T037 [US6] `packages/ui/__snapshots__/` 디렉토리를 git에 추가하여 커밋 — 기준선 스냅샷 팀 공유
- [x] T038 [US6] 기준선 대비 스냅샷 비교 재실행 (`pnpm --filter @myorg/ui test-storybook`) — 변경 없음 확인 (기준선과 일치)

**Checkpoint**: T035~T038 완료 시 US6 독립 테스트 가능

---

## Phase 9: User Story 7 — 테스트 커버리지 리포트 (Priority: P7)

**Goal**: 컴포넌트 테스트 실행 후 라인·함수·브랜치 커버리지 리포트 생성

**Independent Test**: `pnpm --filter @myorg/ui test:coverage` 실행 후 `packages/ui/coverage/index.html`이 생성되고 컴포넌트별 커버리지 % 확인되면 통과

### Implementation for User Story 7

- [x] T039 [US7] `pnpm --filter @myorg/ui test:coverage` 실행하여 커버리지 리포트 생성 확인
- [x] T040 [US7] `packages/ui/coverage/index.html` 열어 8개 주요 컴포넌트의 라인·함수·브랜치 커버리지 % 확인 — 전체 커버리지 비율 기록

**Checkpoint**: T039~T040 완료 시 US7 독립 테스트 가능

---

## Polish Phase: 빌드 및 최종 통합 검증

**목적**: 모든 수정 후 전체 통합 확인

- [x] T041 `pnpm --filter @myorg/ui lint` 최종 실행 — 에러 0건 확인
- [x] T042 `pnpm --filter @myorg/ui build-storybook` 최종 빌드 성공 및 TypeScript 에러 0건 확인
- [x] T043 [P] `pnpm --filter @myorg/ui test` 최종 실행 — 8개 컴포넌트 단위 테스트 전체 통과
- [x] T044 [P] `pnpm --filter @myorg/ui test-storybook` 최종 실행 — 기존 play 테스트 + 시각적 스냅샷 비교 모두 통과

---

## 의존성 및 실행 순서

### Phase 의존성

- **Phase 1 (Setup)**: 즉시 시작
- **Phase 2 (Foundational)**: Phase 1 완료 후 — preview.tsx 변경
- **Phase 3 (US1)**: Phase 2 완료 후 — argTypes 스토리 파일 수정 (T009~T016 병렬 가능)
- **Phase 4 (US2)**: Phase 2 완료 후 — Phase 3과 독립적 병렬 가능
- **Phase 5 (US3)**: Phase 2 완료 후 — 검증만이므로 즉시 가능
- **Phase 6 (US4)**: Phase 1 완료 후 — vitest 환경 독립적 (Phase 2 불필요)
- **Phase 7 (US5)**: Phase 2 완료 후 — Storybook 실행 필요
- **Phase 8 (US6)**: Phase 1 완료 후 (T004 test-runner-setup 필요), Phase 2 후 build 필요
- **Phase 9 (US7)**: Phase 6 완료 후 (단위 테스트 존재 필요)
- **Polish**: 모든 Phase 완료 후

### 병렬 실행 가능 태스크

```
# Phase 1 내 병렬:
T001 → T002, T003, T004, T005 순차 (T001 완료 후 나머지 병렬 가능)

# Phase 3 내 병렬:
T009, T010, T011, T012, T013, T014, T015, T016 (모두 다른 파일)

# Phase 2 완료 후 병렬:
Phase 3 (US1) ‖ Phase 4 (US2) ‖ Phase 5 (US3) ‖ Phase 7 (US5)

# Phase 1 완료 후 별도 병렬:
Phase 6 (US4 — vitest)

# Phase 6 내 병렬:
T022, T023, T024, T025, T026, T027, T028 (모두 다른 파일)
```

---

## 구현 전략

### MVP First (US1만 구현)

1. Phase 1: Setup (T001~T005)
2. Phase 2: Foundational (T006~T008)
3. Phase 3: US1 (T009~T017) — argTypes Controls
4. **STOP & VALIDATE**: Storybook에서 select 위젯 동작 확인
5. 유효하면 Phase 4~9 진행

### 점진적 제공

1. T001~T008 → 환경 기반 확립
2. T009~T017 → Controls select 위젯 (P1 MVP)
3. T018~T019 → Show code 토글 (P2)
4. T020 → 뷰포트 검증 (P3)
5. T021~T030 → 단위 테스트 8개 (P4)
6. T031~T034 → a11y 위반 0건 (P5)
7. T035~T038 → 시각적 스냅샷 (P6)
8. T039~T040 → 커버리지 리포트 (P7)
9. T041~T044 → 최종 검증

---

## Notes

- **[P]** 태스크 = 서로 다른 파일을 수정하므로 동시 실행 가능
- T006과 T009~T016은 모두 `.storybook/preview.tsx` 또는 개별 `*.stories.tsx` — T006 먼저 완료 후 스토리 작업
- US4 단위 테스트(T021~T028)는 vitest 환경(T001~T003)만 필요, Phase 2 불필요 — US1/US2와 병렬 가능
- 시각적 스냅샷 기준선 업데이트 시 `--update-snapshots` 플래그 후 반드시 git 커밋
- `coverage/` 디렉토리는 `.gitignore`에 추가 (빌드 아티팩트)
- `__snapshots__/` 디렉토리는 git 추적 (팀 공유 기준선)
