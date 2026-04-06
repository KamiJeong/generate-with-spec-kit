# 리서치: Storybook 현대적 레이아웃 스토리 확장

**Branch**: `010-storybook-layout-stories` | **Date**: 2026-04-06

## 조사 결과 요약

### 1. 신규 레이아웃 스토리의 물리적 위치

- **Decision**: `packages/ui/src/stories/layouts/` 디렉터리를 신설하고 4개 신규 레이아웃 스토리를 그 아래에 배치한다.
- **Rationale**: 기존 `AuthPage`, `DashboardPage`, `FormPage`, `SettingsPage`는 utilitarian page examples이고, 이번 기능은 보다 참조용인 modern layout gallery다. 물리적 디렉터리를 분리하면 유지보수와 탐색성이 함께 좋아진다.
- **Alternatives considered**:
  - `packages/ui/src/stories/` 루트에 그대로 추가: 파일 수 증가에 따라 기존 페이지 스토리와 의도가 섞여 기각.
  - `packages/ui/src/stories/guide/` 재사용: guide는 토큰/문서성 overview 성격이라 레이아웃 예시와 성격이 다름.

### 2. Storybook navigation 계약

- **Decision**: 모든 신규 스토리는 `title: 'Page/Layouts/<Name>'` 패턴을 사용한다.
- **Rationale**: 이미 현재 페이지 스토리가 `Page/*` 패턴을 사용하므로, `Page/Layouts/*`는 기존 정보 구조를 유지하면서도 신규 참조 세트를 분리한다.
- **Alternatives considered**:
  - `Layout/*` 최상위 카테고리: 기존 `Page/*` 체계와 분리되어 탐색 문맥이 끊김.
  - `Page/*` 루트에 직접 혼합: Auth/Dashboard 같은 기능형 페이지와 레이아웃 레퍼런스가 혼재되어 의도가 모호해짐.

### 3. 다크 모드 표현 방식

- **Decision**: 별도 dark-mode 전용 스토리는 만들지 않고, `packages/ui/.storybook/preview.tsx`의 global theme toolbar를 그대로 활용한다.
- **Rationale**: preview는 이미 `light`/`dark` 글로벌 theme 전환과 `.dark`, `[data-theme="dark"]` 적용을 지원한다. 별도 스토리를 추가하면 스토리 수만 늘고 유지비가 커진다.
- **Alternatives considered**:
  - 각 레이아웃별 light/dark 2종 스토리: 범위 증가와 중복 증가로 기각.
  - light mode만 보장: `DESIGN.md`의 dark-mode 규칙과 상충.

### 4. responsive 검증 기준

- **Decision**: 각 스토리는 단일 기본 story만 제공하고, `Desktop 1280`, `Tablet 768`, `Mobile 375` viewport에서 주요 섹션이 재배치되도록 설계한다.
- **Rationale**: preview에 이미 커스텀 viewport 세트가 준비되어 있어 추가 Storybook 설정 없이 반응형 품질을 확인할 수 있다. 별도 mobile-specific variant 없이도 사용자가 요구한 범위를 충족한다.
- **Alternatives considered**:
  - desktop-only 레이아웃: clarified scope와 충돌.
  - desktop/mobile 별도 variant: 관리 비용이 커지고 범위 초과.

### 5. 신규 재사용 UI 컴포넌트 추가 여부

- **Decision**: 신규 재사용 UI 컴포넌트나 토큰은 추가하지 않는다. 필요한 표현은 기존 `packages/ui/src/components` 조합과 story-local 데이터/마크업으로 해결한다.
- **Rationale**: `DESIGN.md`와 feature clarification 모두 기존 시스템 재사용을 우선 요구한다. 이 기능의 목적은 디자인 시스템 확장이 아니라 reference story 확장이다.
- **Alternatives considered**:
  - story 전용 shared presentational component 추가: 반복이 3회 이상 검증되기 전까지는 YAGNI 위배 가능성이 높음.
  - 새 reusable component 도입: 범위가 component feature로 확장되어 기각.

### 6. 개발자 도구 맥락의 카피 전략

- **Decision**: 모든 레이아웃은 일반 소비자 서비스가 아니라 개발자 도구 / 생산성 제품 문맥의 더미 카피를 사용한다.
- **Rationale**: 저장소의 제품 정체성과 일치해야 Storybook이 AI coding agent에게 더 실전적인 참고 자료가 된다.
- **Alternatives considered**:
  - generic SaaS copy: 범용성은 높지만 저장소 맥락이 약해짐.
  - 레이아웃별 다른 산업군 혼합: 학습 기준점이 흔들리고 일관성이 떨어짐.

### 7. 레이아웃별 파일명 및 story 이름

- **Decision**: 아래 4개 파일/스토리 세트를 사용한다.

| 파일 | Storybook title | 목적 |
|------|-----------------|------|
| `BrandSiteLayout.stories.tsx` | `Page/Layouts/BrandSite` | 메인 브랜드 사이트 |
| `ProductLandingLayout.stories.tsx` | `Page/Layouts/ProductLanding` | 전환 중심 제품 랜딩 |
| `DocsHubLayout.stories.tsx` | `Page/Layouts/DocsHub` | 문서/리소스 허브 |
| `PricingComparisonLayout.stories.tsx` | `Page/Layouts/PricingComparison` | 요금제/비교 페이지 |

- **Rationale**: 파일명은 기존 `DashboardPage.stories.tsx` 패턴과 유사한 PascalCase를 유지하고, title segment는 Storybook sidebar에서 짧고 일관되게 보이도록 했다.
- **Alternatives considered**:
  - 띄어쓰기 있는 title (`Brand Site` 등): sidebar 가독성은 좋지만 파일명/title 대응이 느슨해짐.
  - `MainBrandSite`, `PlansPage` 등 다른 명칭: 의미 범위가 더 좁거나 모호함.

### 8. 검증 및 품질 게이트

- **Decision**: 구현 후 최소 검증 세트는 `pnpm --filter @myorg/ui lint` + `pnpm --filter @myorg/ui build-storybook` + 필요 시 `pnpm --filter @myorg/ui test` 실행으로 잡는다.
- **Rationale**: 이 기능은 주로 story composition 변경이므로 lint/build-storybook이 가장 직접적인 안전망이다. `packages/ui/vitest.config.ts`는 기존 unit/storybook 프로젝트를 이미 정의하므로 회귀 확인이 가능하다.
- **Alternatives considered**:
  - 신규 play 함수 추가: 정적 레이아웃 참조 스토리에 비해 효용이 낮고, 범위를 테스트 작성 중심으로 넓힘.
  - 수동 검증만 수행: 헌법의 품질 게이트 요구에 비해 약함.
