# 계약: Storybook 레이아웃 스토리

**Feature**: `010-storybook-layout-stories`  
**Scope**: `packages/ui/src/stories/layouts/*.stories.tsx`

## 목적

이 계약은 신규 modern layout stories가 Storybook에서 어떻게 노출되고, 어떤 최소 구조를 가져야 하는지 정의한다. 구현 세부 코드보다 Storybook 소비자가 기대할 수 있는 인터페이스를 고정한다.

---

## 파일 계약

다음 4개 파일이 존재해야 한다.

| 파일 경로 | Storybook title | 필수 export |
|----------|-----------------|-------------|
| `packages/ui/src/stories/layouts/BrandSiteLayout.stories.tsx` | `Page/Layouts/BrandSite` | `Default` |
| `packages/ui/src/stories/layouts/ProductLandingLayout.stories.tsx` | `Page/Layouts/ProductLanding` | `Default` |
| `packages/ui/src/stories/layouts/DocsHubLayout.stories.tsx` | `Page/Layouts/DocsHub` | `Default` |
| `packages/ui/src/stories/layouts/PricingComparisonLayout.stories.tsx` | `Page/Layouts/PricingComparison` | `Default` |

---

## Meta 계약

모든 파일은 아래 조건을 만족해야 한다.

```ts
const meta = {
  title: 'Page/Layouts/<Name>',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => <FullPageLayout />,
} satisfies Meta;

export default meta;
export const Default: Story = {};
```

### 불변 규칙

- `title`은 반드시 `Page/Layouts/` prefix를 사용한다.
- `parameters.layout`은 반드시 `fullscreen`이다.
- `Default` named export는 반드시 존재한다.
- 동일 레이아웃에 대해 별도 dark/mobile 전용 story variant를 요구하지 않는다.

---

## 콘텐츠 계약

모든 스토리는 다음 콘텐츠 품질을 만족해야 한다.

- 개발자 도구 및 생산성 제품 맥락의 카피를 사용한다.
- 외부 API, 라우팅, 비동기 fetch 없이 독립적으로 렌더링된다.
- 기존 `packages/ui` 컴포넌트와 현재 semantic token만 조합한다.
- 모바일과 데스크톱 viewport 모두에서 주요 섹션이 읽기 가능해야 한다.
- light/dark theme 전환 시 대비가 유지되어야 한다.

---

## 레이아웃 패밀리별 최소 섹션 계약

| 스토리 | 최소 섹션 |
|--------|-----------|
| `BrandSite` | header, hero, feature/value section, trust/proof section, CTA, footer |
| `ProductLanding` | hero, feature highlight section, proof/testimonial section, CTA |
| `DocsHub` | global nav, content navigation, main content cards or article list, supporting CTA/footer |
| `PricingComparison` | pricing hero, comparison cards/table, FAQ or reassurance block, CTA/footer |

---

## 검증 계약

구현 완료 후 다음이 통과해야 한다.

```bash
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui build-storybook
```

권장 추가 확인:

```bash
pnpm --filter @myorg/ui test
```

Storybook 수동 확인:
- Theme toolbar: `light`, `dark`
- Viewports: `Desktop (1280px)`, `Tablet (768px)`, `Mobile (375px)`
