# Data Model: SFood 브랜드 사이트 구축

**Branch**: `018-sfood-brand-site` | **Date**: 2026-04-14

정적 SPA이므로 데이터베이스 스키마는 없다. 이 문서는 `packages/sfood/src/content/sfood-content.ts`와 `packages/sfood/src/routing/routes.ts`에서 사용할 콘텐츠 타입과 검증 규칙을 정의한다.

## PageRoute

```ts
interface PageRoute {
  path: '/' | '/about' | '/sustainability' | '/brands' | '/talent' | '/support/notice' | '/support/news' | '/support/faq';
  label: string;
  navGroup?: 'support';
  pageTitle: string;
  description: string;
}
```

**Validation rules**:
- FR-001의 8개 경로가 모두 정확히 한 번씩 존재해야 한다.
- 전역 내비게이션 항목은 `PageRoute.path`만 참조해야 한다.
- 고객지원 하위 경로는 `/support/*` prefix를 사용하고 `navGroup: 'support'`를 가진다.
- 존재하지 않는 경로는 `NotFoundPage`를 렌더링하거나 메인 이동 CTA를 제공한다.

## SiteConfig

```ts
interface SiteConfig {
  name: 'SFood';
  tagline: string;
  mission: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaPath: PageRoute['path'];
}
```

**Validation rules**:
- `mission`은 spec.md의 문구 "더 좋은 식품으로 더 좋은 세상을 만든다"를 포함해야 한다.
- CTA path는 `PageRoute.path` 중 하나여야 한다.

## Brand

```ts
type BrandType = 'B2B' | 'B2C';

interface Brand {
  id: string;
  name: string;
  type: BrandType;
  slogan: string;
  productCategories: string[];
  image: ImageAsset;
}
```

**Validation rules**:
- `type`은 `B2B` 또는 `B2C`만 허용한다.
- `/brands` 페이지는 두 타입을 모두 표시해야 한다.
- `productCategories`는 1개 이상이어야 하며 대표 제품군(햄, 소시지, 베이컨 등)을 포함한다.

## ProductCategory

```ts
interface ProductCategory {
  id: string;
  name: '햄' | '소시지' | '베이컨' | '바비큐' | '치즈' | '빵' | '소스' | 'HMR';
  iconName: string;
  description: string;
}
```

**Validation rules**:
- 메인 페이지 카테고리 하이라이트는 최소 4개 이상을 표시한다.
- `iconName`은 구현에서 사용하는 `lucide-react` icon mapping에 존재해야 한다.

## Article

```ts
type ArticleType = 'notice' | 'news';

interface Article {
  id: string;
  type: ArticleType;
  title: string;
  date: string; // YYYY-MM-DD
  category: string;
  summary: string;
  body?: string;
  image?: ImageAsset;
}
```

**Validation rules**:
- `/support/notice`는 `type: 'notice'` 항목만 날짜 역순으로 표시한다.
- `/support/news`는 `type: 'news'` 항목만 카드 그리드로 표시한다.
- 메인 페이지는 최신 뉴스/공지 2건만 표시한다.
- 뉴스 카드는 이미지가 필요하므로 `type: 'news'` 항목은 `image`를 가져야 한다.
- 개별 상세 페이지는 이번 범위에서 제외하므로 `body`는 선택값이다.

## FaqItem

```ts
interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
```

**Validation rules**:
- 질문과 답변은 비어 있으면 안 된다.
- FAQ 페이지는 `Accordion type="single" collapsible`로 렌더링한다.
- 한 항목이 열리면 이전에 열려 있던 항목은 닫힌 상태로 전환된다.

## HiringStep

```ts
interface HiringStep {
  step: 1 | 2 | 3 | 4;
  title: string;
  description: string;
}
```

**Validation rules**:
- 단계는 `서류`, `1차 면접`, `2차 면접`, `최종 합격` 순서를 유지한다.
- `/talent` 페이지는 4개 단계를 모두 표시한다.

## SustainabilityMetric

```ts
interface SustainabilityMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  targetValue: number;
  description: string;
}
```

**Validation rules**:
- `/sustainability` 페이지는 정량 지표를 최소 2개 이상 표시한다.
- `value`와 `targetValue`는 0 이상이어야 한다.
- 인포그래픽 표현에 사용하는 색상은 `chart-*` 또는 semantic token을 사용한다.

## Certification

```ts
interface Certification {
  id: string;
  name: 'FSSC 22000' | 'HACCP' | 'DLG';
  description: string;
  badgeLabel: string;
}
```

**Validation rules**:
- `/about`와 메인 품질 인증 섹션은 FSSC 22000, HACCP, DLG를 모두 표시한다.

## ImageAsset

```ts
interface ImageAsset {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
}
```

**Validation rules**:
- `alt`는 필수이며 빈 문자열을 허용하지 않는다.
- 히어로 이미지는 초기 브랜드 메시지를 보조하는 설명형 alt를 가진다.
- 카드/뉴스 이미지는 기본적으로 `loading: 'lazy'`를 사용한다.
