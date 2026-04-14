# Research: 서비스 소개 웹사이트 (017)

**Branch**: `017-intro-website` | **Date**: 2026-04-14

---

## 기술 스택 선택: Next.js vs SPA

**결정**: SPA (Vite + React) — `packages/web` 패키지로 모노레포에 추가

**근거**:
- 현재 모노레포는 `@storybook/react-vite` 기반이며, Vite + React + Tailwind CSS v4 + shadcn/ui가 이미 `packages/ui`에서 사용 중이다.
- 정적 콘텐츠 소개 사이트이므로 SSR, ISR, API Routes가 불필요하다. Next.js를 도입하면 Constitution V(단순성)에 어긋나는 불필요한 복잡성이 추가된다.
- `@myorg/ui` 컴포넌트를 workspace 의존성으로 직접 임포트하면 별도 빌드 없이 재사용 가능하다.
- "Next.js v16"은 2026년 4월 기준 존재하지 않는 버전이다. 최신 안정 버전은 15.x이며, 이 규모의 프로젝트에 도입 비용 대비 이점이 없다.

**검토한 대안**:
- **Next.js 15 (App Router)**: 파일 기반 라우팅, SSR/SSG 지원 — 단일 페이지 정적 사이트에 과도한 설정이다.
- **Astro**: 정적 사이트에 적합하나 팀이 익숙하지 않고 shadcn/ui 호환성 설정이 필요하다.
- **Plain HTML + CSS**: 기존 `@myorg/ui` 컴포넌트 재사용 불가.

---

## 기존 Storybook 레이아웃 패턴 분석

**결정**: `BrandSiteLayout` 스토리를 주요 레퍼런스로 활용한다.

**근거**: `packages/ui/src/stories/layouts/BrandSiteLayout.stories.tsx`는 이 피처에서 요구하는 모든 섹션을 이미 구현하고 있다:
- sticky 헤더 (NavigationMenu + Button)
- 히어로 섹션 (h1 + 설명 + CTA Button)
- 숫자 지표 카드 그리드 (Card + CardContent)
- 강점 카드 섹션 (icon + CardTitle + CardDescription)
- 신뢰/proof 섹션 (CheckCircle2 + 텍스트 리스트)
- 최종 CTA 섹션 (bg-primary Card + Button 쌍)
- 푸터

`ProductLandingLayout` 스토리는 보조 레퍼런스로 참고한다 (히어로 내 숫자 지표 배치 패턴).

**인라인 문의 폼 패턴**: `FormPage.stories.tsx`에서 Field + Input + Textarea + Button 조합을 확인했다. 이 패턴을 CTA 섹션 내에 인라인으로 적용한다.

**모바일 햄버거 메뉴**: `Sheet` 컴포넌트(`packages/ui/src/components/sheet.tsx`)를 사용한다. BrandSiteLayout의 헤더는 `hidden md:flex`로 데스크톱 전용 NavigationMenu를 표시하므로, 모바일에서는 Sheet 기반 드로어로 대체한다.

---

## 모노레포 패키지 구조

**결정**: `packages/web`을 신규 패키지로 추가한다.

**근거**:
- 기존 `packages/ui`와 `packages/tokens`의 패턴을 따른다.
- `@myorg/web` 패키지명을 사용하고, `@myorg/ui`를 workspace 의존성으로 추가한다.
- Vite(`vite@6.x`) + `@vitejs/plugin-react` 조합으로 설정한다.
- 빌드 출력은 정적 파일(`dist/`)로, 호스팅 환경(Vercel, Netlify, S3 등)에 배포 가능하다.

---

## 접근성 (WCAG 2.1 AA)

**결정**: `@storybook/addon-vitest` 기반 접근성 테스트 + 수동 체크리스트 병행

**근거**:
- 기존 Storybook 스토리들은 `@storybook/addon-vitest`로 테스트한다. 소개 웹사이트 컴포넌트도 동일 패턴을 따른다.
- shadcn/ui 컴포넌트들은 Radix UI 기반으로 WCAG 2.1 AA를 기본적으로 만족한다.
- 추가로 검증이 필요한 항목: 충분한 색상 대비(4.5:1 이상), 포커스 링 가시성, `alt` 텍스트, `aria-label`, 랜드마크 순서.

---

## 성능 목표

**결정**: FCP(First Contentful Paint) 1.5초 이하 (Constitution IV 준수)

**근거**:
- 정적 SPA로 번들 크기를 최소화한다. 코드 스플리팅 불필요 (단일 페이지).
- 이미지 없는 구조 (플레이스홀더 텍스트만)이므로 이미지 최적화 불필요.
- `@myorg/ui` tree-shaking 지원으로 실제 사용 컴포넌트만 번들에 포함된다.

---

## 테스트 전략

**결정**: Vitest + Storybook 스토리 기반 컴포넌트 테스트

**근거** (Constitution II 준수):
- 각 섹션 컴포넌트(HeroSection, FeaturesSection, TrustSection, ContactSection 등)에 대해 Vitest 단위 테스트를 작성한다.
- 접근성 검사는 `@storybook/addon-vitest`의 a11y addon을 통해 자동화한다.
- 폼 유효성 검사 로직(이름 필수, 이메일 형식)은 별도 단위 테스트로 검증한다.
- Mock DB 없음 — 서버 연동 없으므로 해당 없음.
