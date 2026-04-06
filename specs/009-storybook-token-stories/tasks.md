# Tasks: Storybook 디자인 토큰 스토리 개선

**Input**: Design documents from `/specs/009-storybook-token-stories/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: 사용자 스토리별로 그룹화 — 각 스토리를 독립적으로 구현·검증 가능

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존 관계 없음)
- **[Story]**: 해당 사용자 스토리 레이블 (US1~US4)

---

## Phase 1: Setup (공유 인프라)

**Purpose**: 가이드 스토리 폴더 구조 생성

- [X] T001 `packages/ui/src/stories/guide/` 디렉터리 생성 (빈 폴더, `.gitkeep` 불필요 — 이후 파일로 채워짐)

---

## Phase 2: Foundational (차단 전제조건)

**Purpose**: 4개 가이드 스토리가 공통으로 사용하는 헬퍼 컴포넌트 생성. Phase 3 전체가 이 파일에 의존함.

**⚠️ CRITICAL**: 이 페이즈 완료 후 Phase 3 진행 가능

- [X] T002 `packages/ui/src/stories/guide/_helpers.tsx` 신규 생성 — 아래 6개 헬퍼 컴포넌트 구현:
  - `ColorSwatch({ name, value }: { name: string; value: string })` — 색상 사각형 + 이름 + hex 값 표시
  - `PrimitiveColorGroup({ name, palette }: { name: string; palette: Record<string, string> })` — 팔레트 전체 행 렌더링
  - `SemanticColorTable({ light, dark }: { light: Record<string, string>; dark: Record<string, string> })` — light/dark 두 열 side-by-side 테이블
  - `SpacingBar({ name, value, px }: { name: string; value: string; px: number })` — 가로 막대 + 이름 + 수치 표시
  - `FontFamilySection({ families }: { families: Record<string, readonly string[]> })` — 폰트 패밀리별 샘플 텍스트
  - `MotionDemo({ name, durationMs, cssEasing }: { name: string; durationMs: number; cssEasing: string })` — CSS transition으로 슬라이드 애니메이션 미리보기

**Checkpoint**: `_helpers.tsx` 완성 → 가이드 스토리 4개 병렬 작업 시작 가능

---

## Phase 3: User Story 1 — 디자인 토큰 가이드 스토리 탐색 (Priority: P1) 🎯 MVP

**Goal**: Typography, Color, Spacing, Motion 4개 전용 가이드 스토리 신규 생성. 각 스토리에서 해당 카테고리의 모든 토큰 값이 시각적으로 표시됨.

**Independent Test**: Storybook 사이드바에서 "Typography", "Color", "Spacing", "Motion" 최상위 폴더가 나타나고, 각 폴더 내 Overview 스토리를 열면 모든 토큰 값이 시각적으로 표시되는지 확인.

### US1 구현

- [X] T003 [P] [US1] `packages/ui/src/stories/guide/typography.stories.tsx` 신규 생성:
  - `title: 'Typography/Overview'`, `parameters: { layout: 'padded' }`
  - `@myorg/tokens`에서 `fontFamily`, `fontWeight` 임포트
  - Story `FontFamilies`: `FontFamilySection` 헬퍼로 sans/heading/mono 패밀리 표시 (폰트 이름, 폴백 스택, 샘플 텍스트 "가나다 ABC 123")
  - Story `FontWeights`: `FontWeightSection` 헬퍼로 normal/medium/semibold/bold 표시
  - Story `FontSizes`: Tailwind 기본 폰트 스케일(xs~9xl) 정적 배열로 표시

- [X] T004 [P] [US1] `packages/ui/src/stories/guide/color.stories.tsx` 신규 생성:
  - `title: 'Color/Overview'`, `parameters: { layout: 'padded' }`
  - `@myorg/tokens`에서 `gray`, `brand`, `destructivePalette` 임포트
  - `packages/ui/src/stories/guide/_helpers.tsx`의 헬퍼 컴포넌트 사용
  - Story `PrimitiveColors`: `PrimitiveColorGroup`으로 gray(11단계), brand(11단계), destructive 팔레트 렌더링. 각 견본에 토큰 이름 + hex 값 표시.
  - Story `SemanticTokens`: `SemanticColorTable`으로 `semanticHsl`(light)과 `semanticHslDark`(dark) side-by-side 23개 토큰 렌더링. HSL 값 `hsl()` 함수로 색상 렌더링.
  - Import paths: `@myorg/tokens` (primitives), `../../tokens/src/semantic/index` → 실제 경로는 `@myorg/tokens/src/semantic`

- [X] T005 [P] [US1] `packages/ui/src/stories/guide/spacing.stories.tsx` 신규 생성:
  - `title: 'Spacing/Overview'`, `parameters: { layout: 'padded' }`
  - Tailwind 기본 spacing 스케일을 정적 배열로 정의 (px=4 단위, 주요 값: 0.5/2px, 1/4px, 2/8px, 3/12px, 4/16px, 5/20px, 6/24px, 8/32px, 10/40px, 12/48px, 16/64px, 20/80px, 24/96px, 32/128px)
  - Story `Scale`: `SpacingBar` 헬퍼로 각 스케일 값을 시각적 막대(width: 해당 px값) + 이름 + rem/px 수치와 함께 목록 렌더링

- [X] T006 [P] [US1] `packages/ui/src/stories/guide/motion.stories.tsx` 신규 생성:
  - `title: 'Motion/Overview'`, `parameters: { layout: 'padded' }`
  - `@myorg/tokens`에서 `motion` 임포트
  - Story `Duration`: `motion.duration` 3개 값(fast 150ms, normal 250ms, slow 400ms)을 각각 `MotionDemo` 헬퍼로 슬라이드 애니메이션 표시. 각 항목에 이름 + ms 값 표시.
  - Story `Easing`: `motion.easing` 4개 값(ease, easeIn, easeOut, spring)을 각각 `MotionDemo` 헬퍼로 표시. spring은 `cubic-bezier(0.34, 1.56, 0.64, 1)` 근사값으로 CSS 표현.

**Checkpoint**: Phase 3 완료 → Storybook에 Typography/Color/Spacing/Motion 폴더 4개와 가이드 스토리 확인 가능. MVP 검증 후 Phase 4 진행.

---

## Phase 4: User Story 2 — 컴포넌트 props 전체 커버리지 (Priority: P2)

**Goal**: variant 또는 size props를 보유한 컴포넌트 스토리에 `AllVariants`/`AllSizes` 갤러리 story 추가.

**Independent Test**: Alert, Avatar, Switch, Spinner, Tabs 각각의 스토리 파일을 열어 `AllVariants` 또는 `AllSizes` named story가 존재하고, 해당 컴포넌트의 모든 값을 한 화면에 표시하는지 확인.

### US2 구현

- [X] T007 [P] [US2] `packages/ui/src/stories/alert.stories.tsx` 수정 — 파일 끝에 `AllVariants` story 추가:
  ```tsx
  export const AllVariants: Story = {
    render: () => (
      <div className="flex flex-col gap-4 w-96">
        <Alert><AlertTitle>Default</AlertTitle><AlertDescription>Default alert.</AlertDescription></Alert>
        <Alert variant="destructive"><AlertTitle>Destructive</AlertTitle><AlertDescription>Destructive alert.</AlertDescription></Alert>
      </div>
    ),
  };
  ```

- [X] T008 [P] [US2] `packages/ui/src/components/avatar.stories.tsx` 수정 — 파일 끝에 `AllSizes` story 추가:
  ```tsx
  export const AllSizes: Story = {
    render: () => (
      <div className="flex items-end gap-4">
        <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>MD</AvatarFallback></Avatar>
        <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
      </div>
    ),
  };
  ```

- [X] T009 [P] [US2] `packages/ui/src/components/switch.stories.tsx` 수정 — 파일 끝에 `AllSizesAndStates` story 추가:
  ```tsx
  export const AllSizesAndStates: Story = {
    render: () => (
      <div className="grid gap-3">
        <div className="flex items-center gap-2"><Switch aria-label="Default on" /><Label>Default (on)</Label></div>
        <div className="flex items-center gap-2"><Switch size="sm" aria-label="Small on" /><Label>Small (on)</Label></div>
        <div className="flex items-center gap-2"><Switch disabled aria-label="Disabled" /><Label>Disabled</Label></div>
      </div>
    ),
  };
  ```

- [X] T010 [P] [US2] `packages/ui/src/stories/spinner.stories.tsx` 수정 — 파일 끝에 `AllSizes` story 추가:
  ```tsx
  export const AllSizes: Story = {
    render: () => (
      <div className="flex items-end gap-4">
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" />
      </div>
    ),
  };
  ```

- [X] T011 [P] [US2] `packages/ui/src/stories/tabs.stories.tsx` 수정 — 파일 끝에 `AllOrientations` story 추가:
  - horizontal (기본값)과 vertical 두 가지 orientation을 나란히 렌더링하는 story 추가
  - TabsList, TabsTrigger, TabsContent를 각각 포함하여 실제 사용 방식 표시

**Checkpoint**: Phase 4 완료 → 5개 컴포넌트 스토리에서 AllVariants/AllSizes/AllSizesAndStates/AllOrientations story 확인 가능.

---

## Phase 5: User Story 3 — 카테고리 폴더 구조 (Priority: P3)

**Goal**: Storybook 사이드바에서 Components, Page, Typography, Color, Spacing, Motion 6개 최상위 카테고리 폴더 확인 가능. 페이지 스토리 title을 `Pages/X` → `Page/X`로 정규화.

**Independent Test**: Storybook 사이드바 루트 레벨에 "Page" 폴더가 나타나고 (복수형 "Pages" 아님), Auth, Dashboard, Form, Settings 스토리가 그 안에 있는지 확인. Typography/Color/Spacing/Motion 폴더는 Phase 3에서 이미 생성됨.

### US3 구현

- [X] T012 [P] [US3] `packages/ui/src/stories/AuthPage.stories.tsx` 수정 — `title: 'Pages/AuthPage'` → `title: 'Page/Auth'`로 변경
- [X] T013 [P] [US3] `packages/ui/src/stories/DashboardPage.stories.tsx` 수정 — `title: 'Pages/DashboardPage'` → `title: 'Page/Dashboard'`로 변경
- [X] T014 [P] [US3] `packages/ui/src/stories/FormPage.stories.tsx` 수정 — `title: 'Pages/FormPage'` → `title: 'Page/Form'`으로 변경
- [X] T015 [P] [US3] `packages/ui/src/stories/SettingsPage.stories.tsx` 수정 — `title: 'Pages/SettingsPage'` → `title: 'Page/Settings'`으로 변경

**Checkpoint**: Phase 5 완료 → 사이드바에 Page 폴더(단수) 아래 4개 페이지 스토리 확인. 6개 카테고리 폴더 모두 존재.

---

## Phase 6: User Story 4 — 레이아웃 옵션 확장 (Priority: P4)

**Goal**: 페이지 스토리 전체를 `layout: 'fullscreen'`으로 설정. FormPage와 SettingsPage가 현재 `padded`이므로 수정 필요. AuthPage와 DashboardPage는 이미 `fullscreen`으로 설정됨.

**Independent Test**: FormPage와 SettingsPage 스토리를 열어 viewport 전체를 사용하는 fullscreen 레이아웃으로 렌더링되는지 확인.

### US4 구현

- [X] T016 [P] [US4] `packages/ui/src/stories/FormPage.stories.tsx` 수정 — `parameters.layout: 'padded'` → `parameters.layout: 'fullscreen'`으로 변경
- [X] T017 [P] [US4] `packages/ui/src/stories/SettingsPage.stories.tsx` 수정 — `parameters.layout: 'padded'` → `parameters.layout: 'fullscreen'`으로 변경

**Checkpoint**: Phase 6 완료 → 페이지 스토리 4개 모두 fullscreen 레이아웃 사용 확인.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 린트/포맷 검증, Storybook 빌드 확인

- [X] T018 [P] `packages/ui/src/stories/guide/_helpers.tsx` 및 4개 가이드 스토리 파일 Biome 린트 통과 확인: `pnpm --filter @myorg/ui lint`
- [X] T019 `pnpm --filter @myorg/ui build-storybook` 실행하여 전체 빌드 성공 및 에러 없음 확인

---

## Dependencies & Execution Order

### Phase 의존 관계

```
Phase 1 (Setup)
    └── Phase 2 (Foundational: _helpers.tsx)
            └── Phase 3 (US1: 가이드 스토리 4개) ← BLOCKS
Phase 4 (US2: AllVariants) ← Phase 2 불필요, 독립 실행 가능
Phase 5 (US3: 폴더 정규화) ← 독립 실행 가능
Phase 6 (US4: 레이아웃) ← 독립 실행 가능
Phase 7 (Polish) ← 모든 Phase 완료 후
```

### User Story 의존 관계

- **US1 (P1)**: Phase 1 + Phase 2 완료 후 시작 — T003~T006 병렬 실행 가능
- **US2 (P2)**: Phase 2 불필요 — Phase 1 완료 즉시 시작 가능. T007~T011 병렬 실행 가능
- **US3 (P3)**: 완전 독립 — Phase 1 이후 즉시 T012~T015 병렬 실행 가능
- **US4 (P4)**: 완전 독립 — Phase 1 이후 즉시 T016~T017 병렬 실행 가능

### 파일 내 의존 관계

- T003~T006는 모두 T002(`_helpers.tsx`)에 의존
- T007~T017는 서로 다른 파일 → 완전 병렬

---

## Parallel Example: User Story 1 (가이드 스토리)

```bash
# T002 완료 후 4개 스토리 동시 작업:
Task: "T003 typography.stories.tsx 생성"
Task: "T004 color.stories.tsx 생성"
Task: "T005 spacing.stories.tsx 생성"
Task: "T006 motion.stories.tsx 생성"
```

## Parallel Example: User Story 2~4 (컴포넌트 + 폴더 + 레이아웃)

```bash
# Phase 1 완료 후 US2~US4 동시 작업 가능:
Task: "T007~T011 AllVariants/AllSizes 추가 (US2)"
Task: "T012~T015 페이지 title 정규화 (US3)"
Task: "T016~T017 페이지 레이아웃 fullscreen (US4)"
```

---

## Implementation Strategy

### MVP (User Story 1만)

1. Phase 1: Setup 완료
2. Phase 2: `_helpers.tsx` 완성
3. Phase 3: 가이드 스토리 4개 완성
4. **STOP & VALIDATE**: Storybook에서 4개 가이드 폴더 + 스토리 시각적 확인
5. `pnpm --filter @myorg/ui lint` 통과 확인

### 전체 점진적 전달

1. Setup + Foundational → 헬퍼 준비 완료
2. US1 → 가이드 스토리 4개 완성 → MVP 검증
3. US2 → 컴포넌트 AllVariants 추가 → 검증
4. US3 → 폴더 구조 정규화 → 검증
5. US4 → 레이아웃 수정 → 검증
6. Polish → 린트 + 빌드 최종 확인

---

## Notes

- `_helpers.tsx`는 Storybook 외부에서 임포트되지 않으므로 public API 문서화 불필요
- Color 가이드에서 `semanticHsl`과 `semanticHslDark`는 `@myorg/tokens`의 임포트 경로 확인 필요 (research.md 참조)
- Motion spring easing의 CSS 근사값은 `cubic-bezier(0.34, 1.56, 0.64, 1)` 사용 (framer-motion spring과 시각적으로 유사)
- 모든 스토리 파일 수정 후 Biome `lint` 실행 권장 (T018)
