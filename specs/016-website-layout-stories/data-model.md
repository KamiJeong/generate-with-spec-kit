# Data Model: 10가지 웹사이트 레이아웃 스토리북 추가

**Phase**: 1 | **Date**: 2026-04-14 | **Branch**: `016-website-layout-stories`

## 엔티티 정의

이 피처는 런타임 데이터 모델(DB, API)이 없는 UI 시각화 목적의 Storybook 스토리이다.
데이터 모델은 각 스토리 파일 내 TypeScript 타입 및 상수로 표현된다.

---

### LayoutMeta

각 레이아웃 스토리 파일에서 공유되는 메타데이터 구조 (TypeScript 인터페이스).

```ts
interface LayoutMeta {
  title: string;           // 레이아웃 이름 (예: "Z-Pattern Layout")
  description: string;     // 레이아웃 설명 (한국어, 1~2문장)
  qualityFeatures: QualityFeature[];  // 적용된 품질 특성 목록
  useCases: string[];      // 적합한 사용 사례 (2~3개)
}
```

### QualityFeature

7가지 우수 웹사이트 품질 특성 열거형.

```ts
type QualityFeature =
  | 'Clear visual hierarchy'
  | 'Balanced use of space'
  | 'Intuitive navigation'
  | 'Mobile-friendly structure'
  | 'Purposeful CTA placement'
  | 'Consistent alignment'
  | 'Adaptive layout styles';
```

### PlaceholderContent

레이아웃 예시에 사용되는 플레이스홀더 콘텐츠 구조. 각 스토리 파일 내 상수로 정의.

```ts
interface PlaceholderContent {
  heading: string;         // 주요 헤딩 텍스트
  subheading?: string;     // 서브 헤딩 (선택)
  body: string;            // 본문 텍스트 (Lorem ipsum 계열)
  ctaLabel?: string;       // CTA 버튼 텍스트 (선택)
  navItems: string[];      // 내비게이션 항목 (2~5개)
}
```

### ImagePlaceholder

이미지 영역을 대체하는 CSS 색상 블록 구조.

```ts
interface ImagePlaceholder {
  aspectRatio: 'video' | 'square' | 'wide' | 'portrait';  // 비율 클래스 매핑
  bgToken: string;    // Tailwind 배경색 토큰 (예: 'bg-muted', 'bg-primary/20')
  label: string;      // aria-label 값 (접근성)
}
```

---

## 레이아웃별 스토리 파일 매핑

| 파일명 | Storybook title | 주요 variant |
|--------|----------------|-------------|
| `ZPatternLayout.stories.tsx` | `Page/Layouts/ZPattern` | `Default`, `WithHeroImage` |
| `FPatternLayout.stories.tsx` | `Page/Layouts/FPattern` | `Default`, `ContentHeavy` |
| `FullscreenImageLayout.stories.tsx` | `Page/Layouts/FullscreenImage` | `Default`, `DarkOverlay` |
| `SplitScreenLayout.stories.tsx` | `Page/Layouts/SplitScreen` | `Default`, `Reversed` |
| `AsymmetricalLayout.stories.tsx` | `Page/Layouts/Asymmetrical` | `Default`, `ImageLeft` |
| `SingleColumnLayout.stories.tsx` | `Page/Layouts/SingleColumn` | `Default`, `WithSidebar` |
| `BoxBasedLayout.stories.tsx` | `Page/Layouts/BoxBased` | `Default`, `DenseGrid` |
| `CardsLayout.stories.tsx` | `Page/Layouts/Cards` | `Default`, `MasonryStyle` |
| `MagazineLayout.stories.tsx` | `Page/Layouts/Magazine` | `Default`, `FeaturedPost` |
| `HorizontalStripsLayout.stories.tsx` | `Page/Layouts/HorizontalStrips` | `Default`, `AlternatingStrips` |

---

## 상태 전이

해당 없음. 스토리는 정적 시각적 예시이며 상태 관리 로직 없음.
