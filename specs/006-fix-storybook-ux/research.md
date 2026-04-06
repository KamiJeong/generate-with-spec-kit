# 리서치: Storybook 품질 개선

**Feature**: 006-fix-storybook-ux | **Date**: 2026-04-03

## 현황 분석 (Findings)

### 1. Biome 린트 에러 (FR-004)

**발견**: `pnpm --filter @myorg/ui lint` 실행 시 **116개 에러** 발생. 전부 포맷팅 에러(`Formatter would have printed the following content`).

**원인**: feature 004/005에서 Codex가 생성한 파일들이 LF line ending을 가지지만, Windows 환경에서 git checkout 시 CRLF로 변환되었고, Biome formatter는 LF를 기대한다. 코드 품질 에러(lint rule violations)는 없음.

**결정**: `biome check --write src .storybook` 실행으로 일괄 포맷팅 수정.

**대안**: 파일별 수동 수정 — 기각, 116개 파일에 비효율적.

---

### 2. Controls 패널 미동작 (FR-003 / US3-A+B)

**발견**: `button.stories.tsx` meta 구조 분석:

```typescript
const meta = {
  component: Button,    // ← argTypes 자동 추론 가능
  render: () => (       // ← args를 받지 않는 render!
    <div className="flex gap-3">
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}
```

`export const Destructive: Story = { args: { variant: 'destructive', children: 'Destructive' } }` — args를 설정하지만 meta의 `render: () => (...)` 함수는 args 파라미터를 받지 않으므로, Controls에서 값을 바꿔도 컴포넌트에 반영되지 않는다.

**문제 A (Controls 패널에 항목 미표시)**: `component: Button`이 설정되어 있으면 Storybook이 TypeScript 타입에서 argTypes를 자동 추론한다. 따라서 항목은 표시된다. 단, 일부 스토리에서 `component`가 없거나 meta 타입이 `Meta` (generic 없음)인 경우 항목이 미표시될 수 있다.

**문제 B (값 변경이 컴포넌트에 미반영)**: meta `render`가 args를 무시하므로 Controls 변경이 반영되지 않는다. 동일한 문제가 badge, avatar, spinner, tabs, switch, sheet 스토리에도 존재할 가능성이 높다.

**결정**: variant 스토리(args 패턴 사용)에 개별 `render: (args) => <Component {...args} />` 추가. meta의 `render` 함수는 Default play 테스트 보호를 위해 **변경하지 않는다**.

**영향 파일**: button, badge, spinner, avatar (Small/Large), switch — args 패턴을 사용하는 스토리가 있는 파일.

**대안**: meta render를 `render: (args) => <Button {...args} />`로 변경 — 기각, Default play 테스트가 깨질 위험.

---

### 3. 컴포넌트 미리보기 너비 (FR-002)

**발견**:
- `preview.ts`의 전역 `layout: 'centered'` — 컴포넌트를 중앙에 배치하지만 캔버스 자체 크기를 제한하지는 않음.
- `@storybook/addon-essentials` 미설치 — viewport switcher 없음. `addons: ['@storybook/addon-a11y']`만 존재.
- Storybook 10.x에서 viewport 설정은 `@storybook/addon-essentials` 없이도 `preview.ts`의 `parameters.viewport`로 가능하지만, UI 스위처가 없어 고정 뷰포트만 설정 가능.

**결정**:
1. 전역 `layout`을 `'centered'`에서 `'padded'`로 변경 — 컴포넌트 주변에 padding을 주어 더 자연스럽게 표시.
2. `parameters.viewport`에 기본 뷰포트를 `1280px` 너비로 설정.
3. `DashboardPage`, `AuthPage`처럼 `fullscreen`이 필요한 스토리는 개별 parameters로 유지.

**대안**: `@storybook/addon-essentials` 설치 — 기각, 불필요한 대형 패키지 추가. Storybook 10.x core에서 viewport 설정 가능.

---

### 4. 콘솔 에러 원인 (FR-001)

**발견 (정적 분석 기반)**:

1. **preview.ts decorator `Story()` 호출 패턴**:
   ```typescript
   decorators: [
     (Story, context) => {
       ...
       return Story(); // ← 함수 직접 호출
     }
   ]
   ```
   React 17+ strict mode에서 컴포넌트를 함수로 직접 호출하면 hooks 컨텍스트 경고가 발생할 수 있다. Storybook 권장 패턴은 `<Story />`.

2. **일부 stories에서 누락된 required props**: e.g. render 패턴에서 서브컴포넌트 사용 시 필수 context나 wrapper가 누락되면 에러 발생.

3. **biome 포맷팅 에러가 빌드/실행에 영향 주는 경우**: 포맷팅 에러 자체는 콘솔 에러를 유발하지 않지만, Biome 검사 실패가 빌드 중단으로 이어질 수 있다.

**결정**:
1. `Story()` → `<Story />` 패턴으로 변경.
2. 빌드 후 실제 콘솔 에러 항목을 plan/tasks 단계에서 확인하여 개별 수정.
3. 정적 분석으로 발견된 다른 잠재적 에러 패턴도 수정.

---

### 5. 적용 순서 (Implementation Order)

1. **Biome 포맷팅 수정** (가장 빠르고 안전) — `biome check --write`
2. **Viewport/layout 설정** — preview.ts 수정
3. **Decorator 패턴 수정** — `Story()` → `<Story />`
4. **variant story render 수정** — args 반영
5. **빌드 후 콘솔 에러 확인** — 실제 에러 목록 파악 후 수정
