# Research: AI Wiki Portal Platform 화면 개발

**Branch**: `021-ai-wiki-portal` | **Date**: 2026-04-15

## 결정 사항 요약

### 1. 라우팅 라이브러리

- **결정**: `react-router-dom` v6 (Data Router 방식)
- **근거**: React 18 + Vite 환경에서 가장 표준적인 SPA 라우팅 솔루션. `apps/sfood`에서도 동일 패턴. URL 기반 라우팅(FR-024) 요구사항 충족. `createBrowserRouter` + `RouterProvider` 패턴으로 라우트 정의 중앙화.
- **고려 대안**: TanStack Router — 타입 안정성 우수하나 팀에 새로운 학습 비용 발생. 현재 스코프(5개 화면)에서 오버엔지니어링.

### 2. 마크다운 렌더링

- **결정**: `react-markdown` 라이브러리 대신 **간단한 HTML 문자열 + dangerouslySetInnerHTML** 방식 (Mock 데이터 전용)
- **근거**: 실제 마크다운 파싱이 필요한 Confluence/외부 소스 연동은 범위 외. Mock 데이터는 미리 HTML로 변환하거나 구조화된 JSON으로 표현. 외부 의존성 최소화 원칙(Constitution V) 준수.
- **고려 대안**: `react-markdown` — 실제 마크다운 파싱 필요 시 사용. Mock 앱에서는 불필요한 번들 증가.

### 3. 상태 관리

- **결정**: React 내장 `useState` + `useReducer` + Context API (전역 상태 최소화)
- **근거**: Mock 앱 특성상 서버 상태 없음. Get Started 진행률, Blueprint 생성 상태 등 로컬 UI 상태만 필요. 외부 상태 라이브러리(Zustand, Jotai) 불필요.
- **고려 대안**: Zustand — 전역 상태가 복잡해질 경우 도입 검토. 현재 스코프에서는 YAGNI.

### 4. Mock 데이터 구조

- **결정**: TypeScript 타입 정의 + 정적 Mock 데이터 파일 (`src/mock/*.ts`)
- **근거**: 타입 안전성 확보 및 컴포넌트와 데이터 계약 명확화. 향후 실제 API 연동 시 Mock 파일만 교체하면 됨.
- **패턴**: 각 엔티티 타입을 `src/types/index.ts`에 정의하고, Mock 파일에서 해당 타입으로 배열 export.

### 5. 레이아웃 구조

- **결정**: `@myorg/ui`의 `SidebarProvider` + `Sidebar` + `SidebarInset` 패턴 (DocsHubLayout.stories.tsx 참조)
- **근거**: 명세서 참고 기준(DocsHubLayout) 그대로 채택. `collapsible="icon"` 으로 사이드바 접기/펼치기(FR-002) 지원. `variant="inset"` 으로 메인 콘텐츠 영역과 자연스럽게 분리.
- **구체적 라우트 구조**:
  - `/` → `/dashboard` 리다이렉트
  - `/dashboard` → DashboardPage
  - `/wiki` → WikiPage (문서 목록)
  - `/wiki/:docId` → WikiDocPage (문서 상세)
  - `/blueprint` → BlueprintPage
  - `/get-started` → GetStartedPage
  - `/projects/:id` → ProjectDetailPage

### 6. 테스트 전략

- **결정**: Vitest + @testing-library/react, 주요 사용자 인터랙션 중심 테스트
- **근거**: Mock UI 앱에서 비즈니스 로직 없음. 테스트 가치는 (1) 컴포넌트가 렌더링되는지, (2) 클릭 인터랙션이 상태를 올바르게 변경하는지에 집중.
- **커버리지 목표**: 주요 인터랙션 컴포넌트 80% (StepList 체크박스, BlueprintForm 제출, EmptyState 렌더링 등)

### 7. 스타일링

- **결정**: Tailwind CSS v4 + `@myorg/ui` 의미 토큰 전용 사용
- **근거**: Constitution III — 임의 스타일 오버라이드 금지. `@myorg/tokens`의 CSS 변수 기반 토큰 사용.
- **주의**: `bg-primary`, `text-foreground`, `border-border` 등 의미 토큰 사용. 임의 hex 색상 사용 금지.
