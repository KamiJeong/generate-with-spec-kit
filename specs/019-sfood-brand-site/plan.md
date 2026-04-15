# Implementation Plan: SFood 브랜드 사이트

**Branch**: `019-sfood-brand-site` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/019-sfood-brand-site/spec.md`

## Summary

SFood(에쓰푸드) 프리미엄 육가공 식품 전문 기업의 브랜드 사이트를 `app/sfood-brand` 패키지로 구축한다. 기존 `packages/web`과 동일한 Vite + React 19 + Tailwind CSS v4 + TypeScript 스택을 사용하며, React Router v7(클라이언트 사이드 SPA 라우팅)을 추가해 8개 페이지(`/`, `/about`, `/sustainability`, `/brands`, `/talent`, `/support/notice`, `/support/news`, `/support/faq`)를 제공한다. 모든 콘텐츠는 가상의 소시지 브랜드를 전제로 한 정적 데이터이며, SFood 고유 딥레드(`#B01020` 계열) 컬러 팔레트를 적용한다. sticky 헤더(스크롤 시 불투명 전환), 모바일 햄버거 드로어, 고객지원 드롭다운 서브메뉴를 포함한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.x
**Primary Dependencies**: Vite 6.x, React Router v7, Tailwind CSS v4, `@myorg/ui`, `@myorg/tokens`, lucide-react
**Storage**: N/A (정적 콘텐츠, 외부 API 없음)
**Testing**: Vitest 3.x + Testing Library (jsdom), 커버리지 80% 이상
**Target Platform**: 브라우저 (모바일/태블릿/데스크톱 반응형, WCAG 2.1 AA)
**Project Type**: SPA 브랜드 웹사이트
**Performance Goals**: First Contentful Paint ≤ 1.5초 (데스크톱), ≤ 3초 (모바일 3G)
**Constraints**: 외부 API 없음, 라우터 클라이언트 사이드, `app/sfood-brand` 경로 고정
**Scale/Scope**: 8개 라우트, 4개 브랜드(B2C 2 + B2B 2), 정적 콘텐츠

## Constitution Check

*GATE: 플랜 진행 전 통과 필요. Phase 1 설계 후 재검증.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 — SRP, DRY | PASS | 페이지/섹션/레이아웃 분리, 콘텐츠는 `content/` 파일로 격리 |
| II. 테스트 표준 — TDD, 80% 커버리지 | PASS | 각 페이지 컴포넌트 및 라우팅에 Vitest 단위 테스트 계획 |
| III. UX 일관성 — 디자인 시스템 | PASS | `@myorg/ui` 컴포넌트 우선 사용, 스타일 임의 오버라이드 금지 |
| IV. 성능 — FCP ≤ 1.5s | PASS | 정적 콘텐츠, 이미지 없음(플레이스홀더), Vite 번들 최적화 |
| V. 단순성 — YAGNI | PASS | 추가 레이어 없음, 콘텐츠 파일 + 페이지 컴포넌트 플랫 구조 |
| 문서 언어 정책 | PASS | 본 문서 한국어 작성, 기술 용어·파일명은 영어 유지 |

**복잡도 정당화**: React Router 추가 — `packages/web`은 단일 페이지 스크롤 구조라 라우터가 없으나, SFood 사이트는 8개 독립 URL 경로가 필요해 클라이언트 라우팅 불가피. 외부 의존성 최소화 원칙 하에 React 공식 권장 라이브러리 선택.

## Project Structure

### Documentation (this feature)

```text
specs/019-sfood-brand-site/
├── plan.md              # 이 파일
├── research.md          # Phase 0 산출물
├── data-model.md        # Phase 1 산출물
├── quickstart.md        # Phase 1 산출물
├── contracts/           # Phase 1 산출물
│   └── routes.md        # 라우트 계약
└── tasks.md             # Phase 2 산출물 (/speckit.tasks)
```

### Source Code (repository root)

```text
app/sfood-brand/
├── package.json              # @myorg/sfood-brand, 의존성 선언
├── tsconfig.json             # TypeScript 설정 (packages/web 기반)
├── vite.config.ts            # Vite + React + Tailwind CSS v4
├── vitest.config.ts          # Vitest 테스트 설정
├── index.html                # SPA 진입점
├── src/
│   ├── main.tsx              # React 앱 마운트, BrowserRouter 래핑
│   ├── App.tsx               # 라우트 정의 (React Router)
│   ├── index.css             # Tailwind CSS v4, SFood 커스텀 토큰
│   ├── content/              # 정적 가상 콘텐츠 데이터
│   │   ├── site.ts           # 사이트 메타, 내비게이션 정의
│   │   ├── brands.ts         # 브랜드 4개 데이터 (B2C 2 + B2B 2)
│   │   ├── sustainability.ts # 지속 가능성 활동 데이터
│   │   ├── talent.ts         # 채용 프로세스·인재상·복리후생 데이터
│   │   └── support.ts        # 공지사항·회사소식·FAQ 데이터
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx    # Sticky 헤더, 드롭다운 서브메뉴, 햄버거 드로어
│   │   │   └── SiteFooter.tsx    # 공통 푸터
│   │   ├── ui/               # SFood 전용 재사용 컴포넌트
│   │   │   ├── BrandCard.tsx     # 브랜드 카드
│   │   │   ├── SectionHero.tsx   # 서브 페이지 히어로 배너
│   │   │   └── AccordionFaq.tsx  # FAQ 아코디언
│   │   └── sections/         # 페이지별 섹션 컴포넌트
│   │       ├── home/
│   │       │   ├── HeroSection.tsx
│   │       │   ├── StatsSection.tsx
│   │       │   ├── BrandsPreviewSection.tsx
│   │       │   ├── SustainabilityTeaser.tsx
│   │       │   └── CtaSection.tsx
│   │       ├── about/
│   │       │   ├── MissionSection.tsx
│   │       │   ├── TimelineSection.tsx
│   │       │   └── CertificationSection.tsx
│   │       ├── sustainability/
│   │       │   ├── SustainabilityHero.tsx
│   │       │   └── PillarSection.tsx
│   │       ├── brands/
│   │       │   └── BrandsGrid.tsx
│   │       ├── talent/
│   │       │   ├── TalentHero.tsx
│   │       │   ├── PersonaSection.tsx
│   │       │   ├── ProcessSection.tsx
│   │       │   └── BenefitsSection.tsx
│   │       └── support/
│   │           ├── NoticeList.tsx
│   │           ├── NewsList.tsx
│   │           └── FaqList.tsx
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── SustainabilityPage.tsx
│       ├── BrandsPage.tsx
│       ├── TalentPage.tsx
│       ├── support/
│       │   ├── NoticePage.tsx
│       │   ├── NewsPage.tsx
│       │   └── FaqPage.tsx
│       └── NotFoundPage.tsx
└── tests/
    ├── setup.ts
    ├── pages/                # 페이지 단위 렌더링 테스트
    ├── components/           # 레이아웃·UI 컴포넌트 단위 테스트
    └── content/              # 콘텐츠 데이터 타입 유효성 테스트
```

**Structure Decision**: `packages/web`의 단일 SPA 패턴을 참고하되, 다중 라우트를 지원하기 위해 `pages/` 디렉토리를 추가하고 React Router를 도입한다. 콘텐츠는 `content/` 디렉토리에 도메인별로 분리해 컴포넌트와 데이터를 명확히 분리한다.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| React Router 추가 | 8개 독립 URL 경로 필요 (FR-001) | 단일 페이지 스크롤: URL 공유 불가, 브라우저 뒤로가기 동작 불가 |
| `app/` 최상위 디렉토리 신설 | `packages/web` 외 독립 앱 필요 | `packages/web` 직접 수정: 기존 앱과 충돌, 역할 혼용 우려 |
