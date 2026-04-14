# Research: 10가지 웹사이트 레이아웃 스토리북 추가

**Phase**: 0 | **Date**: 2026-04-14 | **Branch**: `016-website-layout-stories`

## 결정 사항 (Decisions)

### 1. 스토리 파일 위치

- **결정**: `packages/ui/src/stories/layouts/` 기존 폴더 사용
- **근거**: 이미 `BrandSiteLayout`, `DocsHubLayout`, `PricingComparisonLayout`, `ProductLandingLayout` 등 동일 패턴의 페이지 레이아웃 스토리가 해당 폴더에 존재함. 신규 폴더 생성 없이 기존 구조를 따르는 것이 단순성 원칙(V)에 부합.
- **검토된 대안**: `packages/ui/src/layouts/` 신규 폴더 — 기존 관행과 분리될 수 있어 기각.

### 2. Storybook 타이틀 네이밍 컨벤션

- **결정**: `Page/Layouts/[PatternName]` 형식
- **근거**: 기존 스토리들이 `Page/Layouts/BrandSite` 형식을 사용 중. 일관성 유지.
- **예시**: `Page/Layouts/ZPattern`, `Page/Layouts/FPattern`, `Page/Layouts/FullscreenImage` 등

### 3. 반응형 Breakpoint

- **결정**: Tailwind CSS v4 기본 breakpoint 활용 — `sm` (640px), `md` (768px), `lg` (1024px)
- **근거**: 프로젝트 스택이 Tailwind CSS v4이므로 별도 커스텀 breakpoint 불필요. `sm:`, `md:`, `lg:` 접두사로 3단계 레이아웃 변화 표현.
- **뷰포트 매핑**: 모바일(기본 ~639px) → 태블릿(`sm`/`md`: 640px~1023px) → 데스크탑(`lg`+: 1024px~)

### 4. 이미지 영역 처리

- **결정**: CSS 배경색/그라디언트 div로 대체 (`bg-muted`, `bg-primary/20` 등 디자인 토큰 활용)
- **근거**: 외부 서비스(picsum.photos 등) 의존 없이 항상 일관된 렌더링. 성능 원칙(IV) 및 단순성 원칙(V) 부합.
- **구현 패턴**: `<div className="aspect-video bg-muted rounded-lg" aria-label="이미지 플레이스홀더" />`

### 5. 품질 특성 문서화 방식

- **결정**: 각 스토리의 `parameters.docs.description` 필드에 텍스트로 기재
- **근거**: Storybook Docs 탭에서 자동으로 표시되며, 별도 MDX 파일 없이 `.stories.tsx` 단일 파일에서 관리 가능.
- **형식 예시**:
  ```ts
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
  ## Z-Pattern Layout
  눈의 움직임이 Z자 형태로 이동하는 레이아웃 패턴.

  **적용된 품질 특성:**
  - ✅ Clear visual hierarchy
  - ✅ Purposeful CTA placement
  - ✅ Consistent alignment
        `,
      },
    },
  },
  ```

### 6. Story Variant 전략

- **결정**: 각 스토리에 최소 2개 named export 제공 — `Default`(기본 콘텐츠) + `WithCTA`(CTA 강조 변형) 또는 패턴에 적합한 variant
- **근거**: FR-004 요건 충족 (최소 1개 이상 variant). 기존 레이아웃 스토리 패턴과 일관성 유지.

### 7. 공통 플레이스홀더 콘텐츠

- **결정**: 각 파일 내 상수로 정의 (파일 간 공유 모듈 불필요)
- **근거**: 10개 스토리 각각의 콘텐츠가 레이아웃 특성에 맞게 달라야 하므로 공유 모듈화보다 파일 내 상수가 단순성 원칙(V)에 부합. 동일 상수가 3회 이상 등장하는 경우에만 추상화.

### 8. 10가지 레이아웃 특성 및 주요 품질 특성 매핑

| 레이아웃 | 주요 특성 | 핵심 품질 특성 |
|---|---|---|
| Z-pattern | 상단→우→좌→하단 대각선 시선 흐름 | Clear visual hierarchy, Purposeful CTA placement |
| F-pattern | 좌→우 수평 스캔 반복 | Clear visual hierarchy, Consistent alignment |
| Fullscreen image | 전체 화면 배경 이미지 + 중앙 콘텐츠 | Balanced use of space, Purposeful CTA placement |
| Split screen | 좌우 50:50 분할 | Balanced use of space, Consistent alignment |
| Asymmetrical | 비대칭 콘텐츠 배치로 시각적 긴장감 | Clear visual hierarchy, Adaptive layout styles |
| Single column | 세로 단일 컬럼 | Intuitive navigation, Mobile-friendly structure |
| Box-based | 격자형 박스 레이아웃 | Consistent alignment, Balanced use of space |
| Cards | 카드 컴포넌트 기반 그리드 | Consistent alignment, Balanced use of space |
| Magazine | 다단 비정형 그리드 | Clear visual hierarchy, Adaptive layout styles |
| Horizontal strips | 수평 스트립 섹션 반복 | Consistent alignment, Intuitive navigation |

## 미해결 사항 없음

모든 NEEDS CLARIFICATION 항목이 spec.md Clarifications 세션에서 해결되었음.
