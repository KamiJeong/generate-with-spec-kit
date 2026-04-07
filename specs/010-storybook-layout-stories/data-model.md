# 데이터 모델: Storybook 현대적 레이아웃 스토리 확장

**Branch**: `010-storybook-layout-stories` | **Date**: 2026-04-06

## 개요

이 기능은 데이터베이스나 API 스키마를 추가하지 않는다. 여기서의 데이터 모델은 Storybook 레이아웃 스토리를 구성하는 문서화용 콘텐츠 구조와 story metadata 계약을 의미한다.

---

## 1. LayoutStory

각 신규 스토리 파일이 표현하는 최상위 엔터티다.

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `id` | `string` | 내부 식별자 | `"brand-site"` |
| `fileName` | `string` | 스토리 파일명 | `"BrandSiteLayout.stories.tsx"` |
| `title` | `string` | Storybook title 계약 | `"Page/Layouts/BrandSite"` |
| `intent` | `string` | 페이지 목적 | `"브랜드 소개 및 CTA 유도"` |
| `contentContext` | `string` | 카피 도메인 | `"developer-tooling"` |
| `layoutMode` | `string` | Storybook layout | `"fullscreen"` |
| `themeSupport` | `string[]` | 지원 테마 | `["light", "dark"]` |
| `responsiveTargets` | `string[]` | 검토 viewport | `["desktop1280", "tablet768", "mobile375"]` |

**검증 규칙**:
- `title`은 반드시 `Page/Layouts/` prefix를 가져야 한다.
- `layoutMode`는 `fullscreen`이어야 한다.
- `themeSupport`는 `light`, `dark` 두 값을 모두 포함해야 한다.

---

## 2. LayoutFamily

스토리 유형을 분류하는 상위 개념이다.

| 값 | 설명 | 대응 스토리 |
|----|------|------------|
| `brand-site` | 메인 브랜드/제품 홈 | `BrandSiteLayout` |
| `product-landing` | 기능 출시, 캠페인, 전환 중심 랜딩 | `ProductLandingLayout` |
| `docs-hub` | 문서/리소스 탐색 허브 | `DocsHubLayout` |
| `pricing-comparison` | 플랜/패키지 비교와 선택 유도 | `PricingComparisonLayout` |

**관계**:
- 하나의 `LayoutStory`는 정확히 하나의 `LayoutFamily`에 속한다.
- 각 `LayoutFamily`는 최소 1개의 고유한 페이지 흐름을 가진다.

---

## 3. SectionBlock

각 레이아웃을 구성하는 의미 단위다.

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `kind` | `string` | 섹션 유형 | `"hero"` |
| `headline` | `string` | 주요 제목 | `"Ship design-safe UI faster"` |
| `supportingText` | `string` | 보조 설명 | `"Spec-driven UI references for agents and teams"` |
| `ctaType` | `string \| null` | CTA 유형 | `"primary"`, `null` |
| `components` | `string[]` | 사용 컴포넌트 목록 | `["Button", "Badge", "Card"]` |
| `required` | `boolean` | 해당 story에서 필수 여부 | `true` |

### 공통 SectionBlock 유형

| `kind` | 설명 |
|--------|------|
| `header` | 상단 탐색, 브랜드 식별, 전역 액션 |
| `hero` | 핵심 메시지, 가치 제안, 대표 CTA |
| `feature-grid` | 기능/가치 카드 모음 |
| `social-proof` | 고객사, testimonial, metrics |
| `content-nav` | 문서 허브용 탐색 영역 |
| `comparison` | 플랜 또는 기능 비교 블록 |
| `faq` | 선택 보조를 위한 질문/답변 |
| `footer` | 하단 링크 및 마지막 CTA |

**검증 규칙**:
- 모든 `LayoutStory`는 최소 `header`, `hero` 또는 이에 준하는 시작 섹션, 그리고 `footer` 또는 마지막 CTA 섹션을 가져야 한다.
- 각 story는 상단부터 하단까지 4개 이상의 section block으로 완결된 흐름을 형성해야 한다.

---

## 4. StoryContentToken

스토리 안에서 반복 사용하는 더미 데이터 항목이다.

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `label` | `string` | 짧은 UI 텍스트 | `"Start free"` |
| `category` | `string` | 카피 유형 | `"cta"`, `"nav"`, `"plan-name"` |
| `tone` | `string` | 문맥 톤 | `"developer-productivity"` |

**검증 규칙**:
- `tone`은 모두 developer-tooling / productivity 맥락이어야 한다.
- Lorem ipsum, placeholder-only text는 허용하지 않는다.

---

## 5. StoryMetaContract

각 파일이 만족해야 하는 Storybook 메타 구조다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `title` | `string` | `Page/Layouts/<Name>` |
| `parameters.layout` | `'fullscreen'` | 전체 페이지 레이아웃 표시 |
| `render` | `() => JSX.Element` | 단일 기본 레이아웃 렌더 |
| `export Default` | `Story` | 기본 named export |

**검증 규칙**:
- 각 파일은 최소 `Default` export 1개를 가진다.
- 별도 dark-mode 전용 또는 mobile 전용 variant는 추가하지 않는다.
- theme/viewport 검증은 Storybook global toolbar로 수행한다.
