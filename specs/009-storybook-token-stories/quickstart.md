# Quickstart: Storybook 디자인 토큰 스토리 개선

**Branch**: `009-storybook-token-stories` | **Date**: 2026-04-06

## 개요

이 가이드는 구현자가 빠르게 작업을 시작할 수 있도록 핵심 패턴과 참고 정보를 제공한다.

---

## 1. 로컬 개발 환경

```bash
# UI 패키지 Storybook 실행
pnpm --filter @myorg/ui build-storybook

# 개발 서버 (Storybook이 지원하는 경우)
pnpm --filter @myorg/ui storybook

# Lint 검사
pnpm --filter @myorg/ui lint
```

---

## 2. 신규 가이드 스토리 생성 패턴

**파일 위치**: `packages/ui/src/stories/guide/`

### Typography 가이드 스토리 예시 구조

```tsx
// packages/ui/src/stories/guide/typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fontFamily, fontWeight } from '@myorg/tokens';
import { FontFamilySection, FontWeightSection } from './_helpers';

const meta = {
  title: 'Typography/Overview',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamilies: Story = {
  render: () => <FontFamilySection families={fontFamily} />,
};

export const FontWeights: Story = {
  render: () => <FontWeightSection weights={fontWeight} />,
};
```

### Color 가이드 스토리 (라이트/다크 side-by-side) 예시

```tsx
// packages/ui/src/stories/guide/color.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { gray, brand } from '@myorg/tokens/primitives/colors';
import { semanticHsl } from '@myorg/tokens/semantic';
import { semanticHslDark } from '@myorg/tokens/semantic/dark';
import { PrimitiveColorGroup, SemanticColorTable } from './_helpers';

const meta = {
  title: 'Color/Overview',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primitives: Story = {
  render: () => (
    <>
      <PrimitiveColorGroup name="gray" palette={gray} />
      <PrimitiveColorGroup name="brand" palette={brand} />
    </>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <SemanticColorTable light={semanticHsl} dark={semanticHslDark} />
  ),
};
```

---

## 3. AllVariants 갤러리 추가 패턴

기존 컴포넌트 스토리 파일 끝에 아래 패턴으로 추가:

```tsx
// 기존 named stories 다음에 추가
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Alert variant="default">...</Alert>
      <Alert variant="destructive">...</Alert>
    </div>
  ),
};
```

**참고**: Button의 `Variants` story (button.stories.tsx:138)와 Badge의 `Variants` story (badge.stories.tsx:93)가 동일 패턴의 기존 구현 예시.

---

## 4. 페이지 스토리 fullscreen 레이아웃 적용

기존 페이지 스토리 meta의 `parameters`에 추가:

```tsx
const meta = {
  title: 'Page/Dashboard',
  // ...
  parameters: {
    layout: 'fullscreen',  // 이 줄 추가
  },
} satisfies Meta<...>;
```

**대상 파일**:
- `packages/ui/src/stories/DashboardPage.stories.tsx`
- `packages/ui/src/stories/AuthPage.stories.tsx`
- `packages/ui/src/stories/FormPage.stories.tsx`
- `packages/ui/src/stories/SettingsPage.stories.tsx`

---

## 5. 헬퍼 컴포넌트 구조 (`guide/_helpers.tsx`)

```tsx
// packages/ui/src/stories/guide/_helpers.tsx

// ColorSwatch: 단일 색상 견본
export function ColorSwatch({ name, value }: { name: string; value: string }) { ... }

// PrimitiveColorGroup: 팔레트 그룹 (예: gray 11단계)
export function PrimitiveColorGroup({ name, palette }: ...) { ... }

// SemanticColorTable: light/dark side-by-side 테이블
export function SemanticColorTable({ light, dark }: ...) { ... }

// SpacingBar: 스페이싱 스케일 시각화 막대
export function SpacingBar({ name, value, px }: ...) { ... }

// FontFamilySection: 폰트 패밀리 표시
export function FontFamilySection({ families }: ...) { ... }

// FontWeightSection: 폰트 weight 표시
export function FontWeightSection({ weights }: ...) { ... }

// MotionDemo: 애니메이션 토큰 시각화
export function MotionDemo({ name, duration, easing }: ...) { ... }
```

---

## 6. 카테고리 폴더 구조 체크리스트

스토리 파일 `title` 필드가 다음 패턴을 따르는지 확인:

| 카테고리 | `title` 패턴 | 예시 |
|----------|-------------|------|
| 컴포넌트 | `Components/{Name}` | `Components/Button` |
| 페이지 | `Page/{Name}` | `Page/Dashboard` |
| Typography | `Typography/{Name}` | `Typography/Overview` |
| Color | `Color/{Name}` | `Color/Overview` |
| Spacing | `Spacing/{Name}` | `Spacing/Overview` |
| Motion | `Motion/{Name}` | `Motion/Overview` |

---

## 7. Biome 린트 통과 주의사항

- 불필요한 `import` 없이 사용하는 것만 임포트
- JSX에서 불필요한 fragment(`<>`) 사용 지양
- 타입 임포트는 `import type` 사용

린트 확인:
```bash
pnpm --filter @myorg/ui lint
```
