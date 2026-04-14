# Research: SFood 브랜드 사이트 구축

**Branch**: `018-sfood-brand-site` | **Date**: 2026-04-14

## 기술 스택 및 패키지 위치

**Decision**: `packages/sfood`를 신규 패키지로 만들고 `packages/web`과 동일한 Vite + React + Tailwind CSS v4 + `@myorg/ui` + `@myorg/tokens` 구성을 따른다.

**Rationale**: spec.md에서 `packages/sfood` 독립 구현과 `packages/web` 동일 스택 재사용이 이미 명확히 정리되어 있다. 기존 `packages/web`의 `package.json`, Vite 설정, Vitest 설정, Tailwind v4 진입점이 해당 구조의 레퍼런스다. workspace 의존성으로 `@myorg/ui`와 `@myorg/tokens`를 직접 재사용하면 디자인 시스템과 빌드 파이프라인이 일관된다.

**Alternatives considered**: 기존 `packages/web` 확장, Next.js/SSR 도입, Astro 도입. 기존 `packages/web` 확장은 독립 패키지 요구와 충돌한다. SSR/SSG 프레임워크는 정적 콘텐츠 8개 경로에 과도하고 신규 의존성을 늘린다.

## 라우팅 전략

**Decision**: React Router 같은 신규 라우터 의존성 없이 typed route table과 History API 기반의 작은 `useCurrentRoute` 훅을 구현한다.

**Rationale**: 필요한 경로는 고정된 8개이고 상세 페이지, 중첩 동적 라우팅, loader/action, 서버 데이터 연동이 없다. `routes.ts`에 경로, 라벨, 페이지 컴포넌트, 고객지원 하위 항목을 명시하면 테스트하기 쉽고 내비게이션 active state도 같은 source of truth에서 처리할 수 있다.

**Alternatives considered**: `react-router-dom` 추가, hash routing, 서버 라우팅. `react-router-dom`은 이번 범위에 비해 과하고 신규 의존성 검토가 필요하다. hash routing은 요구 URL(`/about` 등)과 맞지 않는다. 서버 라우팅은 정적 SPA 범위를 벗어난다.

## 브랜드 색상 및 semantic token 적용

**Decision**: UI 코드에는 `bg-primary`, `text-foreground`, `bg-background`, `text-muted-foreground` 같은 semantic class만 사용하고, `packages/sfood/src/index.css`에서 SFood 전용 CSS 변수를 HSL 값으로 재정의한다.

**Rationale**: FR-014는 브랜드 팔레트 적용을 요구하지만 `DESIGN.md`는 raw color 사용을 금지한다. 따라서 색상 코드는 CSS 변수 정의 계층에만 존재해야 한다. 팔레트 변환값은 다음과 같이 고정한다: Primary `#C8102E` -> `350 85% 42%`, Secondary `#1A1A2E` -> `240 28% 14%`, Accent `#F5A623` -> `37 91% 55%`, Background `#FAFAF8` -> `60 17% 98%`, Text `#2D2D2D` -> `0 0% 18%`. 대비 확인 결과 Primary/White 5.88:1, Secondary/White 17.06:1, Accent/Text 6.80:1, Background/Text 13.18:1로 WCAG AA 기준을 충족한다.

**Alternatives considered**: Tailwind arbitrary color class 사용, 토큰 패키지 전역 변경. arbitrary color는 `DESIGN.md`와 충돌한다. 토큰 패키지 전역 변경은 다른 패키지의 브랜드 색상을 바꾸므로 피한다.

## UI 컴포넌트 재사용

**Decision**: 전역 내비게이션은 `NavigationMenu` + 모바일 `Sheet`, 브랜드 분류는 `Tabs`, FAQ는 `Accordion type="single" collapsible`, 주요 콘텐츠 블록은 `Card`, `Badge`, `Separator`, 필요 시 `Progress`를 사용한다.

**Rationale**: `DESIGN.md`와 AGENTS.md는 기존 `packages/ui/src/components` 우선 재사용을 요구한다. 요구사항의 핵심 상호작용(모바일 메뉴, 탭/섹션 구분, FAQ 단일 아코디언)은 이미 Radix 기반 UI 컴포넌트로 제공되므로 접근성과 키보드 동작을 직접 구현하지 않아도 된다.

**Alternatives considered**: 커스텀 disclosure/menu/tabs 구현. 접근성, 포커스 관리, 키보드 동작을 수동 구현해야 하므로 불필요한 위험이다.

## 정적 콘텐츠와 이미지 정책

**Decision**: 모든 텍스트와 콘텐츠 엔티티는 `src/content/sfood-content.ts`의 typed constant로 관리한다. 이미지는 콘텐츠 객체에 `src`, `alt`, `loading` 정책을 포함하며, 히어로 이미지는 eager 또는 기본 로드, 카드/뉴스 이미지는 lazy 로드한다.

**Rationale**: FR-012는 외부 API 없이 동작해야 한다. 로컬 상수는 가장 단순하고 테스트 가능하다. 이미지 실패 시 alt 텍스트가 의미를 전달해야 하므로 이미지 데이터 모델에 alt를 필수 필드로 둔다.

**Alternatives considered**: JSON 파일, CMS, API mock. JSON은 타입 안정성과 icon/component 참조가 불편하다. CMS/API는 명시적으로 범위 밖이다.

## 테스트 전략

**Decision**: TDD 흐름으로 route/content 테스트와 주요 컴포넌트 테스트를 먼저 작성한다. Vitest + Testing Library로 렌더링, active navigation, FAQ 단일 모드, 정렬 순서, 필수 콘텐츠 존재 여부를 검증한다.

**Rationale**: Constitution II는 테스트 선행을 요구한다. 정적 사이트에서 가장 중요한 회귀 위험은 경로 누락, 링크 불일치, 콘텐츠 구조 누락, FAQ 상호작용, 공지 날짜 정렬, 접근성 이름 누락이다. 이 항목은 DOM 테스트와 순수 함수 테스트로 충분히 검증 가능하다.

**Alternatives considered**: E2E 테스트만 사용, 수동 QA만 사용. E2E만으로는 TDD 속도가 느리고, 수동 QA만으로는 품질 증거가 부족하다.

## 반응형 및 성능 검증

**Decision**: 구현 후 `pnpm --filter @myorg/sfood build`, `test`, `lint`를 실행하고, 개발 서버에서 320px, 768px, 1280px 기준 viewport를 수동 확인한다.

**Rationale**: SC-003은 세 기준 해상도에서 레이아웃이 깨지지 않아야 한다. 현재 패키지 구조에는 별도 viewport 자동화 스크립트가 없으므로 빌드/테스트와 브라우저 검증을 병행한다. 레이아웃은 모바일 우선 grid/flex, 안정적인 aspect ratio 이미지, 텍스트 wrapping을 기준으로 설계한다.

**Alternatives considered**: Playwright 의존성 추가, Storybook 전용 구현. 신규 의존성은 이번 범위에 필요하지 않고, 사이트는 독립 패키지 SPA로 동작해야 한다.
