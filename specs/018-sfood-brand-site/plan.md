# Implementation Plan: SFood 브랜드 사이트 구축

**Branch**: `018-sfood-brand-site` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/018-sfood-brand-site/spec.md`

## Summary

SFood 프리미엄 육가공 식품 기업의 정적 브랜드 사이트를 신규 `packages/sfood` SPA 패키지로 구현한다. `packages/web`과 동일한 Vite + React + Tailwind CSS v4 기반을 사용하고, `@myorg/ui` 및 `@myorg/tokens`를 workspace 의존성으로 재사용한다. 사이트는 8개 경로(`/`, `/about`, `/sustainability`, `/brands`, `/talent`, `/support/notice`, `/support/news`, `/support/faq`)를 제공하며, 정적 콘텐츠 데이터와 typed route table로 라우팅, 전역 헤더/푸터, 브랜드 색상 토큰, 반응형 레이아웃, 단일 모드 FAQ 아코디언을 구성한다.

## Technical Context

**Language/Version**: TypeScript 5.9.x, React 19.2.x
**Primary Dependencies**: Vite 6.4.x, @vitejs/plugin-react 5.x, Tailwind CSS v4, @tailwindcss/vite, @myorg/ui (workspace), @myorg/tokens (workspace), lucide-react
**Storage**: N/A
**Testing**: Vitest 3.2.x, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
**Target Platform**: 정적 웹 SPA, 모바일 320px 이상 및 데스크톱 1280px 이상 브라우저
**Project Type**: web-application (client-side routed SPA)
**Performance Goals**: First Contentful Paint 1.5초 이하, 모바일 3G 기준 3초 이하, 사용자 인터랙션 피드백 200ms 이내
**Constraints**: `DESIGN.md` 준수, UI 코드에서 raw color class/hex 금지, semantic token 기반 브랜드 테마 적용, `@myorg/ui` 우선 재사용, WCAG 2.1 AA, 신규 외부 의존성 추가 없음
**Scale/Scope**: 신규 패키지 1개, 8개 라우트, 전역 레이아웃 2개, 페이지 컴포넌트 8개, 정적 콘텐츠 엔티티 6종, FAQ 단일 모드 상호작용

## Constitution Check

*GATE: spec.md -> plan.md 순서 완료. Phase 1 설계 후 재검토.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 | PASS | `routes`, `content`, `layout`, `pages`, `components`로 책임을 분리하고 typed content model을 사용한다. |
| II. 테스트 표준 | PASS | TDD 기준으로 route/content 단위 테스트와 주요 UI 컴포넌트 테스트를 먼저 작성한다. 데이터베이스가 없으므로 Mock DB 금지 조항은 해당 없음. |
| III. UX 일관성 | PASS | `DESIGN.md`와 `@myorg/ui` 컴포넌트(`NavigationMenu`, `Sheet`, `Tabs`, `Accordion`, `Card`, `Badge`)를 우선 재사용한다. |
| IV. 성능 | PASS | 정적 SPA, 로컬 상수 데이터, lazy image loading으로 FCP 목표를 지원한다. 신규 런타임 라우터 의존성을 추가하지 않는다. |
| V. 단순성 | PASS | 8개 정적 경로는 typed route table + History API로 처리하고 CMS/API/React Router/SSR을 도입하지 않는다. |
| 기술 스택 제약 | PASS | 신규 외부 의존성 없음. 기존 workspace 및 `packages/web`에 이미 쓰이는 프런트엔드 의존성만 사용한다. |
| 문서 언어 정책 | PASS | 계획/연구/데이터 모델/계약/퀵스타트 문서를 한국어로 작성한다. |
| 브랜치 전략 | PASS | 현재 feature branch는 `018-sfood-brand-site` 형식이다. |

**Post-Design Re-check**: PASS. Phase 0/1 설계 결과에서도 신규 외부 의존성, 서버 레이어, 데이터베이스, 불필요한 추상화는 추가하지 않는다.

## Project Structure

### Documentation (this feature)

```text
specs/018-sfood-brand-site/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── route-content-contract.md
└── tasks.md             # Phase 2 산출물 (/speckit.tasks 명령 생성)
```

### Source Code (repository root)

```text
packages/sfood/
├── src/
│   ├── assets/
│   │   └── README.md                 # 이미지 소스/alt 정책 문서 또는 로컬 더미 자산 설명
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx        # 전역 내비게이션, 활성 경로, 모바일 Sheet
│   │   │   └── SiteFooter.tsx        # 전역 푸터
│   │   ├── shared/
│   │   │   ├── CertificationBadge.tsx
│   │   │   ├── PageHero.tsx
│   │   │   └── SectionHeader.tsx
│   │   └── support/
│   │       └── FaqAccordion.tsx      # 단일 모드 FAQ 아코디언
│   ├── content/
│   │   └── sfood-content.ts          # Brand, Article, FAQ 등 정적 콘텐츠
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── SustainabilityPage.tsx
│   │   ├── BrandsPage.tsx
│   │   ├── TalentPage.tsx
│   │   ├── NoticePage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── FaqPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── routing/
│   │   ├── routes.ts                 # route definitions + nav hierarchy
│   │   └── useCurrentRoute.ts        # History API 기반 현재 경로 상태
│   ├── App.tsx                       # 전역 레이아웃 + 현재 페이지 렌더링
│   ├── index.css                     # Tailwind v4 + SFood semantic CSS variables
│   └── main.tsx
├── tests/
│   ├── components/
│   │   ├── FaqAccordion.test.tsx
│   │   └── SiteHeader.test.tsx
│   ├── content/
│   │   └── sfood-content.test.ts
│   ├── pages/
│   │   ├── HomePage.test.tsx
│   │   ├── AboutPage.test.tsx
│   │   ├── BrandsPage.test.tsx
│   │   ├── SustainabilityPage.test.tsx
│   │   ├── TalentPage.test.tsx
│   │   └── SupportPages.test.tsx
│   ├── routing/
│   │   └── routes.test.ts
│   └── setup.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

**Structure Decision**: 신규 독립 SPA 패키지 `packages/sfood`를 사용한다. 기존 `packages/web`은 유지하고, 같은 설정 패턴을 복제하되 alias는 `@sfood/*`로 분리한다. 서버/클라이언트 분리, CMS, DB, 상세 페이지는 요구 범위 밖이므로 추가하지 않는다.

## Complexity Tracking

> **Constitution V 위반 없음** — 신규 의존성이나 추가 서비스 없이 정적 SPA 구조를 유지한다.

| 항목 | 판단 | 근거 |
|------|------|------|
| 신규 `packages/sfood` 패키지 | JUSTIFIED | spec.md가 `packages/sfood` 독립 구현을 요구한다. 기존 `packages/web`과 목적/콘텐츠/라우팅이 달라 별도 패키지가 더 단순하다. |
| typed route table + History API | JUSTIFIED | 8개 정적 경로만 필요하므로 React Router 추가보다 작은 구현이다. 테스트로 경로 매핑과 404 동작을 고정한다. |
| SFood semantic token override | JUSTIFIED | FR-014의 브랜드 팔레트를 충족하면서 `DESIGN.md`의 semantic token 규칙을 지키기 위해 `index.css`에서 CSS 변수만 재정의한다. |

## Phase 0 산출물

→ [research.md](./research.md)

## Phase 1 산출물

→ [data-model.md](./data-model.md)
→ [quickstart.md](./quickstart.md)
→ [contracts/route-content-contract.md](./contracts/route-content-contract.md)
