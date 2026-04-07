# 빠른 시작: Storybook 현대적 레이아웃 스토리 확장

**Branch**: `010-storybook-layout-stories` | **Date**: 2026-04-06

## 개요

이 가이드는 구현자가 신규 modern layout stories 4개를 빠르게 추가하고 검증할 수 있도록 최소 작업 순서와 패턴을 정리한다.

---

## 1. 작업 시작 명령

```bash
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui storybook
```

구현 후 검증:

```bash
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui build-storybook
pnpm --filter @myorg/ui test
```

---

## 2. 파일 생성 대상

```text
packages/ui/src/stories/layouts/
├── BrandSiteLayout.stories.tsx
├── ProductLandingLayout.stories.tsx
├── DocsHubLayout.stories.tsx
└── PricingComparisonLayout.stories.tsx
```

---

## 3. 기본 story 패턴

```tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Page/Layouts/BrandSite',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      {/* header */}
      {/* hero */}
      {/* sections */}
      {/* footer */}
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

핵심 규칙:
- `title`은 `Page/Layouts/*`
- `layout`은 `fullscreen`
- story는 `Default` 하나를 기본값으로 유지
- 외부 fetch, router, new reusable component 금지

---

## 4. 레이아웃별 권장 구현 순서

1. `BrandSiteLayout`
2. `ProductLandingLayout`
3. `DocsHubLayout`
4. `PricingComparisonLayout`

이 순서를 권장하는 이유:
- 브랜드 홈과 제품 랜딩이 공통 hero/CTA 패턴의 기준이 된다.
- 문서 허브는 탐색 구조가 달라 별도 검토가 필요하다.
- pricing/comparison은 카드 밀도와 responsive 검토가 가장 까다롭다.

---

## 5. 컴포넌트 선택 기준

### BrandSite / ProductLanding

- `NavigationMenu`
- `Button`
- `Badge`
- `Card`
- `Avatar`
- `Accordion`
- `AspectRatio`

### DocsHub

- `Sidebar` 계열
- `Breadcrumb`
- `InputGroup` 또는 `Command`
- `Card`
- `Pagination`
- `Separator`

### PricingComparison

- `Card`
- `Badge`
- `Button`
- `Accordion`
- `Separator`
- `Item` 또는 `Kbd`

---

## 6. theme / viewport 검증 체크

Storybook preview는 이미 아래 도구를 제공한다.

- Theme toolbar: `light`, `dark`
- Viewports:
  - `Desktop (1280px)`
  - `Tablet (768px)`
  - `Mobile (375px)`

각 신규 스토리에서 확인할 것:

- dark mode에서 텍스트/배경 대비 유지
- mobile 375px에서 hero, 카드 grid, CTA가 겹치지 않음
- tablet 768px에서 섹션 전환이 자연스러움
- desktop 1280px에서 정보 밀도가 지나치게 비어 보이지 않음

---

## 7. 카피 작성 체크리스트

- 개발자 도구 / 생산성 제품 맥락 유지
- 의미 없는 Lorem ipsum 금지
- CTA 문구는 실제 제품처럼 보이게 작성
- 기존 `DESIGN.md` 브랜드 방향과 충돌하는 raw hex 스타일 금지

예시 문구:
- `Ship design-safe UI faster`
- `Start with spec-backed layouts`
- `Browse implementation patterns`
- `Compare plans for growing product teams`
