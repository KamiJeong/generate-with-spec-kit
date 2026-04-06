# Tasks: Storybook 품질 개선

**Input**: `/specs/006-fix-storybook-ux/` 설계 문서 전체
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**조직**: 사용자 스토리 별로 태스크를 구성하여 각 스토리를 독립적으로 구현·검증 가능하게 함

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 다른 파일에서 병렬 실행 가능 (의존성 없음)
- **[Story]**: 해당 태스크가 속한 사용자 스토리 (US1, US2, US3, US4)
- 설명에 정확한 파일 경로 포함

### 핵심 규칙 (research.md 결정사항)
- `Default` 스토리와 meta `render` 함수는 절대 변경하지 않는다 (play 테스트 보호)
- args 패턴을 사용하는 variant 스토리에만 `render: (args) => <Component {...args} />` 추가
- render 패턴을 이미 사용하는 스토리(Sizes, IconSizes, Variants, Destructive/render 등)는 수정하지 않는다

---

## Phase 1: Setup (확인)

**목적**: 현재 상태 기준선 확인

- [X] T001 `pnpm --filter @myorg/ui lint` 실행하여 현재 116개 포맷팅 에러 존재 확인 — 기준선 수립
- [X] T002 `pnpm --filter @myorg/ui build-storybook` 실행하여 현재 빌드 상태 확인

---

## Phase 2: Foundational (린트 에러 일괄 해소)

**목적**: 모든 US 구현 전 Biome 포맷팅 에러 일괄 수정

**⚠️ CRITICAL**: T001~T002 완료 후 진행

- [X] T003 `packages/ui` 디렉토리에서 `pnpm biome check --write src .storybook` 실행하여 116개 포맷팅 에러 일괄 수정
- [X] T004 `pnpm --filter @myorg/ui lint` 재실행하여 포맷팅 에러 0건 확인 — T003 결과 검증

**Checkpoint**: Foundational 완료 — US1~US4 병렬 시작 가능

---

## Phase 3: User Story 1 — 콘솔 에러 수정 (Priority: P1) 🎯 MVP

**Goal**: 모든 스토리를 열었을 때 브라우저 콘솔에 에러가 표시되지 않는다.

**Independent Test**: Storybook 개발 서버 실행 후 임의 스토리 3개 이상을 열어 브라우저 콘솔에 에러 0건이면 통과

### Implementation for User Story 1

- [X] T005 [US1] `packages/ui/.storybook/preview.ts`의 decorator를 `return Story()` → `return <Story />` 패턴으로 수정:
  ```typescript
  // 변경 전
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      return Story();
    },
  ],
  // 변경 후
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.setAttribute('data-theme', theme);
      return <Story />;
    },
  ],
  ```
  - `preview.ts` → `preview.tsx`로 파일 확장자 변경 필요 (JSX 구문 사용을 위해) 또는 파일 상단에 `import React from 'react'` 추가 확인
- [X] T006 [US1] `pnpm --filter @myorg/ui build-storybook` 실행하여 빌드 성공 및 TypeScript 에러 0건 확인

**Checkpoint**: T005~T006 완료 시 US1 독립 테스트 가능

---

## Phase 4: User Story 2 — 미리보기 너비 개선 (Priority: P2)

**Goal**: Storybook 기본 캔버스 너비가 1280px 이상으로 표시된다.

**Independent Test**: Storybook에서 Button 스토리를 열었을 때 컴포넌트가 찌그러지지 않고 충분한 너비로 표시되면 통과

### Implementation for User Story 2

- [X] T007 [US2] `packages/ui/.storybook/preview.ts`에 viewport 기본값 및 layout 변경:
  ```typescript
  parameters: {
    layout: 'padded',            // 'centered' → 'padded'
    viewport: {
      defaultViewport: 'desktop1280',
      viewports: {
        desktop1280: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
        tablet768: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        mobile375: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
      },
    },
    controls: { ... },           // 기존 controls 설정 유지
    a11y: { ... },               // 기존 a11y 설정 유지
  },
  ```
  - `fullscreen` 레이아웃이 필요한 DashboardPage, AuthPage 스토리는 이미 개별 `parameters: { layout: 'fullscreen' }`으로 설정되어 있으므로 전역 변경의 영향 없음

**Checkpoint**: T007 완료 시 US2 독립 테스트 가능

---

## Phase 5: User Story 3 — Props Controls 정상화 (Priority: P3)

**Goal**: Controls 패널에서 variant/size 변경 시 컴포넌트에 즉시 반영된다.

**Independent Test**: Button > Destructive 스토리에서 Controls 패널의 variant를 다른 값으로 바꾸면 캔버스가 즉시 업데이트되면 통과

### Implementation for User Story 3

- [X] T008 [P] [US3] `packages/ui/src/stories/button.stories.tsx`에서 args 패턴 variant 스토리에 render 함수 추가:
  ```typescript
  // Destructive, Outline, Secondary, Ghost, Link 각각에 render 추가
  export const Destructive: Story = {
    render: (args) => <Button {...args} />,
    args: { variant: 'destructive', children: 'Destructive' },
  }
  export const Outline: Story = {
    render: (args) => <Button {...args} />,
    args: { variant: 'outline', children: 'Outline' },
  }
  // Secondary, Ghost, Link 동일 패턴 적용
  ```
  - meta `render` 함수와 Default 스토리는 절대 변경하지 않는다
  - Sizes, IconSizes, Variants 스토리는 이미 render 함수가 있으므로 수정하지 않는다

- [X] T009 [P] [US3] `packages/ui/src/components/badge.stories.tsx`에서 args 패턴 variant 스토리에 render 함수 추가:
  ```typescript
  // Secondary, Destructive, Outline, Ghost, Link 각각에 render 추가
  export const Secondary: Story = {
    render: (args) => <Badge {...args} />,
    args: { variant: 'secondary', children: 'Secondary' },
  }
  // Destructive, Outline, Ghost, Link 동일 패턴 적용
  ```
  - Default 스토리와 meta render 변경 금지
  - Variants 스토리는 이미 render 함수가 있으므로 수정하지 않는다

- [X] T010 [P] [US3] `packages/ui/src/stories/spinner.stories.tsx`에서 args 패턴 size 스토리에 render 함수 추가:
  ```typescript
  // Spinner 컴포넌트 import 확인 후 적용
  export const Small: Story = {
    render: (args) => <Spinner {...args} />,
    args: { size: 'sm' },
  }
  export const Large: Story = {
    render: (args) => <Spinner {...args} />,
    args: { size: 'lg' },
  }
  ```

- [X] T011 [P] [US3] `packages/ui/src/components/avatar.stories.tsx`에서 args 패턴 size 스토리에 render 함수 추가:
  ```typescript
  // Avatar 컴포넌트에 맞게 적용
  export const Small: Story = {
    render: (args) => <Avatar {...args} />,
    args: { size: 'sm' },
  }
  export const Large: Story = {
    render: (args) => <Avatar {...args} />,
    args: { size: 'lg' },
  }
  ```
  - WithBadge, Group 스토리는 이미 render 패턴이므로 수정하지 않는다

- [X] T012 [P] [US3] `packages/ui/src/components/switch.stories.tsx`에서 Small 스토리 확인:
  - Switch 스토리의 Small이 render 패턴이면 수정 불필요
  - args 패턴이면 `render: (args) => <div className="flex items-center gap-2"><Switch {...args} /></div>` 추가

**Checkpoint**: T008~T012 완료 시 US3 독립 테스트 가능

---

## Phase 6: User Story 4 — 린트 최종 통과 확인 (Priority: P4)

**Goal**: `pnpm --filter @myorg/ui lint` 에러 0건

**Independent Test**: lint 명령 실행 시 에러 0건이면 통과

### Implementation for User Story 4

- [X] T013 [US4] T005(preview 수정), T007(viewport 수정), T008~T012(render 추가) 완료 후 `pnpm --filter @myorg/ui lint` 실행하여 에러 0건 확인 — US4 독립 검증
- [X] T014 [US4] T013에서 추가 린트 에러 발견 시 해당 파일 개별 수정 (`biome check --write <파일>`)

**Checkpoint**: T013~T014 완료 시 US4 독립 테스트 가능

---

## Polish Phase: 빌드 및 회귀 검증

**목적**: 모든 수정 후 빌드 성공 및 기존 play 테스트 regression 없는지 확인

- [X] T015 `pnpm --filter @myorg/ui build-storybook` 실행 — 빌드 성공 및 TypeScript 에러 0건 확인 (SC-002, SC-004)
- [X] T016 [P] `pnpm --filter @myorg/ui test-storybook` 실행 — 기존 play 테스트 모두 통과 확인 (SC-005)
- [X] T017 [P] Storybook 개발 서버 실행 후 Button > Destructive, Badge > Secondary, Avatar > Small 스토리에서 Controls 패널 동작 확인 (SC-003)

---

## 의존성 및 실행 순서

### Phase 의존성

- **Phase 1 (Setup)**: 즉시 시작
- **Phase 2 (Foundational)**: Phase 1 완료 후 — 포맷팅 에러 해소
- **Phase 3 (US1)**: Phase 2 완료 후
- **Phase 4 (US2)**: Phase 2 완료 후 (US1과 독립적으로 병렬 시작 가능, 같은 파일 preview.ts 수정 — T005/T007은 동일 파일이므로 순차 처리)
- **Phase 5 (US3)**: Phase 2 완료 후 (US1, US2와 독립적, T008~T012는 모두 다른 파일이므로 병렬)
- **Phase 6 (US4)**: Phase 3~5 완료 후
- **Polish**: 모든 Phase 완료 후

### 중요: T005와 T007 순서

T005(decorator 수정)와 T007(viewport/layout 수정)은 모두 `preview.ts`를 수정한다 — **반드시 순차 처리**:
1. T005 먼저 (`Story()` → `<Story />` + 파일 확장자 변경)
2. T007 이후 (viewport + layout 추가)

### 병렬 실행 가능 태스크

```
# Phase 2 완료 후:
T005 → T007 (순차, 같은 파일)

# T007 완료 후 US3 병렬:
T008 — button.stories.tsx
T009 — badge.stories.tsx
T010 — spinner.stories.tsx
T011 — avatar.stories.tsx
T012 — switch.stories.tsx
```

---

## 구현 전략

### MVP First (US1만 구현)

1. Phase 1: Setup (T001~T002)
2. Phase 2: Foundational (T003~T004) — 린트 포맷팅 수정
3. Phase 3: US1 (T005~T006) — 콘솔 에러 수정
4. **STOP & VALIDATE**: Storybook 개발 서버에서 콘솔 에러 확인
5. 유효하면 Phase 4~6 진행

### 점진적 제공

1. T001~T004 → 린트 기준선 확립
2. T005~T006 → 콘솔 에러 해소 (MVP)
3. T007 → 미리보기 너비 개선
4. T008~T012 → Controls 정상화 (5개 파일 병렬)
5. T013~T017 → 최종 검증

---

## Notes

- **[P]** 태스크 = 서로 다른 파일을 수정하므로 동시 실행 가능
- T005와 T007은 `preview.ts` 같은 파일 — T005 먼저, T007은 T005 완료 후
- T005에서 `<Story />` JSX 사용 시 파일을 `.tsx`로 변경하거나 tsconfig 확인 필요
- Default 스토리와 meta render는 절대 변경하지 않는다
- T003의 biome auto-fix는 코드 동작에 영향 없이 포맷팅만 수정함 — 안전한 일괄 적용 가능
