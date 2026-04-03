# Tasks: 스토리북 전체 Variant 커버리지

**Input**: `/specs/004-story-variant-coverage/` 설계 문서 전체
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**조직**: 사용자 스토리 별로 태스크를 구성하여 각 스토리를 독립적으로 구현·검증 가능하게 함

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 다른 파일에서 병렬 실행 가능 (의존성 없음)
- **[Story]**: 해당 태스크가 속한 사용자 스토리 (US1, US2, US3)
- 설명에 정확한 파일 경로 포함

### 핵심 규칙 (research.md 결정사항)
- `Default` export와 meta `render` 함수는 절대 변경하지 않는다
- 새 스토리는 `Default` export 아래에 추가한다
- 단순 variant → `args` 패턴, 복합 조합 → `render` 패턴
- 새 스토리에 play 테스트 추가하지 않는다

---

## Phase 1: Setup (확인)

**목적**: 수정 전 현재 Storybook 빌드 상태 확인

- [X] T001 `pnpm --filter @myorg/ui build-storybook` 실행하여 현재 8개 대상 스토리 파일이 오류 없이 빌드되는지 확인 — 기준선 수립

---

## Phase 2: Foundational (공통 import 확인)

**목적**: icon 스토리에 필요한 `Plus` 아이콘 import 가용성 확인

**⚠️ CRITICAL**: T001 완료 후 진행

- [X] T002 `packages/ui/src/stories/button.stories.tsx`에서 `lucide-react`가 이미 import 가능한지 확인 — 필요시 패키지 의존성 체크 (`packages/ui/package.json`)

**Checkpoint**: Setup 완료 — P1 스토리 구현 시작 가능

---

## Phase 3: User Story 1 — Button, Badge, Alert Variant 발견 (Priority: P1) 🎯 MVP

**Goal**: AI 에이전트가 `button.stories.tsx`, `badge.stories.tsx`, `alert.stories.tsx`의 named export 목록만으로 각 컴포넌트의 모든 variant를 소스 파일 없이 열거할 수 있다.

**Independent Test**: 세 파일의 named export 목록을 열거 → Button 9개+, Badge 7개+, Alert 2개 이상이면 통과

### Implementation for User Story 1

- [X] T003 [P] [US1] `packages/ui/src/stories/button.stories.tsx`에 args 패턴으로 개별 variant 스토리 추가:
  ```
  export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } }
  export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
  export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } }
  export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } }
  export const Link: Story = { args: { variant: 'link', children: 'Link' } }
  ```
- [X] T004 [US1] `packages/ui/src/stories/button.stories.tsx`에 size 비교 및 icon size 스토리 추가:
  ```
  export const Sizes: Story — xs/sm/default/lg를 나란히 render
  export const IconSizes: Story — icon/icon-xs/icon-sm/icon-lg를 Plus 아이콘과 함께 render
  ```
  (Plus 아이콘은 `import { Plus } from 'lucide-react'` 사용, T002 결과 반영)
- [X] T005 [P] [US1] `packages/ui/src/stories/badge.stories.tsx`에 args 패턴으로 개별 variant 스토리 추가:
  ```
  export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary' } }
  export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } }
  export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
  export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } }
  export const Link: Story = { args: { variant: 'link', children: 'Link' } }
  ```
- [X] T006 [P] [US1] `packages/ui/src/stories/alert.stories.tsx`에 Destructive variant 스토리 추가:
  ```
  export const Destructive: Story = {
    render: () => (
      <Alert variant="destructive" className="w-96">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    ),
  }
  ```

**Checkpoint**: T003~T006 완료 시 US1 독립 테스트 가능

---

## Phase 4: User Story 2 — Spinner, Tabs, Switch, Avatar, Sheet Variant 발견 (Priority: P2)

**Goal**: AI 에이전트가 5개 컴포넌트 스토리의 named export 목록만으로 각 컴포넌트의 size/variant/방향 옵션을 소스 파일 없이 열거할 수 있다.

**Independent Test**: 5개 파일 named export 확인 → Spinner 3개, Tabs 3개, Switch 2개, Avatar 5개, Sheet 4개 이상이면 통과

### Implementation for User Story 2

- [X] T007 [P] [US2] `packages/ui/src/stories/spinner.stories.tsx`에 size 스토리 추가:
  ```
  export const Small: Story = { args: { size: 'sm' } }
  export const Large: Story = { args: { size: 'lg' } }
  ```
- [X] T008 [P] [US2] `packages/ui/src/stories/tabs.stories.tsx`에 variant/orientation 스토리 추가:
  ```
  export const Line: Story = { render: () => <Tabs>...<TabsList variant="line">...</TabsList>...</Tabs> }
  export const Vertical: Story = { render: () => <Tabs orientation="vertical">...</Tabs> }
  ```
- [X] T009 [P] [US2] `packages/ui/src/components/switch.stories.tsx`에 small size 스토리 추가:
  ```
  export const Small: Story = {
    render: () => (
      <div className="flex items-center gap-2">
        <Switch id="small" size="sm" aria-label="Small switch" />
        <Label htmlFor="small">Small</Label>
      </div>
    ),
  }
  ```
- [X] T010 [P] [US2] `packages/ui/src/components/avatar.stories.tsx`에 개별 size 및 그룹 스토리 추가:
  ```
  export const Small: Story = { args: { size: 'sm' } }
  export const Large: Story = { args: { size: 'lg' } }
  export const WithBadge: Story — AvatarBadge + CheckIcon 조합 render
  export const Group: Story — AvatarGroup + AvatarGroupCount 조합 render
  ```
- [X] T011 [P] [US2] `packages/ui/src/components/sheet.stories.tsx`에 방향별 스토리 추가:
  ```
  export const Left: Story = { render: () => <Sheet>...<SheetContent side="left" />...</Sheet> }
  export const Top: Story = { render: () => <Sheet>...<SheetContent side="top" />...</Sheet> }
  export const Bottom: Story = { render: () => <Sheet>...<SheetContent side="bottom" />...</Sheet> }
  ```

**Checkpoint**: T007~T011 완료 시 US2 독립 테스트 가능

---

## Phase 5: User Story 3 — Variants 통합 비교 스토리 (Priority: P3)

**Goal**: Button, Badge에 모든 variant를 한 화면에 보여주는 `Variants` named export가 존재한다.

**Independent Test**: Storybook에서 Button > Variants, Badge > Variants 스토리 열어 모든 variant가 한 화면에 렌더링되면 통과

### Implementation for User Story 3

- [X] T012 [P] [US3] `packages/ui/src/stories/button.stories.tsx`에 Variants 통합 스토리 추가:
  ```
  export const Variants: Story = {
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
  }
  ```
- [X] T013 [P] [US3] `packages/ui/src/stories/badge.stories.tsx`에 Variants 통합 스토리 추가:
  ```
  export const Variants: Story = {
    render: () => (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    ),
  }
  ```

**Checkpoint**: T012~T013 완료 시 US3 독립 테스트 가능

---

## Polish Phase: 빌드 검증

**목적**: 모든 수정 후 Storybook 빌드 오류 없는지 확인

- [X] T014 `pnpm --filter @myorg/ui build-storybook` 실행 — 빌드 성공 및 0 TypeScript 오류 확인
- [X] T015 [P] 각 수정 파일의 named export 수 최종 카운트 확인 — spec.md SC-002 기준(기존 대비 최소 2배 증가) 충족 여부 검증

---

## 의존성 및 실행 순서

### Phase 의존성

- **Phase 1 (Setup)**: 즉시 시작
- **Phase 2 (Foundational)**: Phase 1 완료 후
- **Phase 3 (US1)**: Phase 2 완료 후 — T003~T006은 모두 다른 파일이므로 **병렬 실행 가능**
- **Phase 4 (US2)**: Phase 2 완료 후 (US1과 독립적으로 병렬 시작 가능) — T007~T011 모두 다른 파일이므로 **병렬 실행 가능**
- **Phase 5 (US3)**: US1 완료 후 (Button, Badge 파일에 의존)
- **Polish**: 모든 Phase 완료 후

### 사용자 스토리 의존성

- **US1 (P1)**: T003~T006 — 모두 다른 파일, 완전 병렬
- **US2 (P2)**: T007~T011 — 모두 다른 파일, 완전 병렬, US1과도 독립
- **US3 (P3)**: T012~T013 — US1의 button/badge 파일 수정 완료 후 (같은 파일에 추가하므로 순서 중요)

---

## 병렬 실행 예시: User Story 1 + 2 동시 진행

```
# Phase 2 완료 후 US1과 US2를 동시에 시작:

# US1 병렬 실행:
T003 — button.stories.tsx (variant 5개)
T005 — badge.stories.tsx (variant 5개)
T006 — alert.stories.tsx (Destructive)
# T004는 T003과 같은 파일이므로 T003 완료 후 실행

# US2 병렬 실행 (US1과 독립):
T007 — spinner.stories.tsx
T008 — tabs.stories.tsx
T009 — switch.stories.tsx
T010 — avatar.stories.tsx
T011 — sheet.stories.tsx
```

---

## 구현 전략

### MVP First (US1만 구현)

1. Phase 1: Setup (T001)
2. Phase 2: Foundational (T002)
3. Phase 3: US1 (T003~T006) — Button, Badge, Alert 완료
4. **STOP & VALIDATE**: 3개 파일 named export 목록 확인
5. 유효하면 Phase 4, 5 진행

### 점진적 제공

1. T001~T002 → 기준선 확인
2. T003~T006 완료 → AI 에이전트가 Button/Badge/Alert 모든 variant 인식 (MVP!)
3. T007~T011 완료 → 5개 추가 컴포넌트 커버
4. T012~T013 완료 → 시각 비교 뷰 완성
5. T014~T015 완료 → 빌드 검증

---

## Notes

- **[P]** 태스크 = 서로 다른 파일을 수정하므로 동시 실행 가능
- T003과 T012(button), T005와 T013(badge)는 같은 파일 — T003 먼저, T012는 US1 완료 후
- `Default` export와 meta `render`는 절대 변경하지 않는다
- T014 빌드 실패 시 TypeScript 오류 메시지로 문제 파일 즉시 특정하여 수정

