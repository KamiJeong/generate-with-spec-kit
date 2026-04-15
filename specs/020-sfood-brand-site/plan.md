# 구현 계획: SFood 브랜드 사이트

**브랜치**: `020-sfood-brand-site` | **일자**: 2026-04-15 | **명세**: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\spec.md`  
**입력**: `/specs/020-sfood-brand-site/spec.md` 기능 명세

## 요약

`apps/sfood`에 SFood(에쓰푸드) 정적 브랜드 사이트를 추가한다. 사이트는 API와 관리 기능 없이 8개 공개 URL을 제공하며, 한국어 중심의 밝고 힘찬 브랜드 카피와 디자인 시스템 컴포넌트를 사용해 메인, 회사소개, 지속 가능성, 브랜드, 인재 채용, 공지사항, 회사소식, FAQ를 탐색 가능하게 구성한다.

## 기술 컨텍스트

**Language/Version**: TypeScript 5.9, React 19, CSS/Tailwind CSS 4  
**Primary Dependencies**: Vite 6, `@vitejs/plugin-react`, `@tailwindcss/vite`, `@myorg/ui`, `@myorg/tokens`, `lucide-react`, Vitest, Testing Library  
**Storage**: 정적 콘텐츠를 `src/content`의 TypeScript 데이터로 보관한다. 서버 저장소와 API는 사용하지 않는다.  
**Testing**: Vitest, Testing Library, `@testing-library/jest-dom`, 라우트/콘텐츠/접근성 구조 중심 테스트  
**Target Platform**: 최신 데스크톱 및 모바일 브라우저에서 동작하는 정적 웹 앱  
**Project Type**: 프런트엔드 단일 페이지 브랜드 사이트  
**Performance Goals**: 주요 페이지 첫 콘텐츠 표시 1.5초 이하, 모바일 저속 네트워크 기준 3초 이하, 사용자 인터랙션 피드백 200ms 이하  
**Constraints**: `/apps/sfood` 경로 사용, API 없음, 지원 상세 페이지 없음, 실제 인증/수상 명칭 사용 금지, 디자인 토큰 및 기존 UI 컴포넌트 우선 사용, WCAG 2.1 AA 기준 준수  
**Scale/Scope**: 8개 공개 URL, 공통 레이아웃 1개, 정적 콘텐츠 컬렉션 5종(Page, Brand Line, Content Entry, FAQ Item, Hiring Step)

## 헌법 체크

*GATE: Phase 0 연구 전 통과해야 하며 Phase 1 설계 후 재검토한다.*

- **코드 품질**: 통과. 공통 레이아웃, 라우트 데이터, 콘텐츠 데이터, 페이지 섹션을 분리해 단일 책임을 유지한다. 반복되는 카드/목록 렌더링은 데이터 기반으로 처리한다.
- **테스트 표준**: 통과. 구현 전 라우트, 내비게이션, 콘텐츠 금지어, 지원 목록형 동작, FAQ 렌더링 테스트를 먼저 작성한다. 정적 UI 기능이므로 실제 DB 통합 테스트는 해당 없음.
- **UX 일관성**: 통과. `DESIGN.md`와 Storybook의 `BrandSite`, `NavigationMenu`, `Card`, `Accordion`, `Button` 레퍼런스를 기준으로 `@myorg/ui` 컴포넌트와 semantic token을 우선 사용한다.
- **성능 요구사항**: 통과. API 호출과 런타임 데이터 페칭 없이 정적 콘텐츠를 번들링하고, 불필요한 라우팅 의존성을 추가하지 않는다. 페이지 초기 로드 목표는 헌법 기준을 따른다.
- **단순성**: 통과. 요청된 8개 URL과 목록형 지원 콘텐츠만 구현하며, 검색/폼/상세 페이지/관리 기능/새 런타임 의존성은 추가하지 않는다.
- **문서 언어 정책**: 통과. 명세, 계획, 연구, 데이터 모델, 계약, quickstart 문서를 한국어로 작성한다.

## 프로젝트 구조

### 문서 (이 기능)

```text
C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts\
│   └── ui-routes.md
└── tasks.md
```

### 소스 코드 (저장소 루트)

```text
C:\Users\USER\Documents\GitHub\generate-with-spec-kit\
├── apps\
│   └── sfood\
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       ├── src\
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   ├── index.css
│       │   ├── content\
│       │   │   └── site.ts
│       │   ├── routes\
│       │   │   └── route-map.ts
│       │   ├── components\
│       │   │   ├── layout\
│       │   │   │   ├── SiteFooter.tsx
│       │   │   │   └── SiteHeader.tsx
│       │   │   └── sections\
│       │   │       ├── HeroSection.tsx
│       │   │       ├── PageHero.tsx
│       │   │       ├── SectionHeader.tsx
│       │   │       └── SupportNav.tsx
│       │   └── pages\
│       │       ├── HomePage.tsx
│       │       ├── AboutPage.tsx
│       │       ├── SustainabilityPage.tsx
│       │       ├── BrandsPage.tsx
│       │       ├── TalentPage.tsx
│       │       ├── NoticePage.tsx
│       │       ├── NewsPage.tsx
│       │       ├── FaqPage.tsx
│       │       └── NotFoundPage.tsx
│       └── tests\
│           ├── setup.ts
│           ├── routes.test.tsx
│           ├── content.test.ts
│           └── accessibility-structure.test.tsx
├── packages\
│   ├── ui\
│   └── tokens\
└── pnpm-workspace.yaml
```

**구조 결정**: 기존 workspace가 `apps/*`를 이미 포함하므로 사용자 요청대로 `apps/sfood`를 신규 앱 경로로 사용한다. 기존 `packages/web`는 참고 가능한 Vite/React 구성 패턴으로만 사용하고, `app/sfood-brand`는 workspace에 포함되지 않은 생성 산출물 잔여 경로로 간주해 새 기능의 소스 위치로 사용하지 않는다.

## Phase 0: 연구 결과

연구 결과는 `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\research.md`에 기록했다. 주요 결정은 다음과 같다.

- `apps/sfood`에 Vite 기반 정적 React 앱을 추가한다.
- 라우팅은 8개 정적 URL을 데이터 기반 route map으로 처리하고 새 라우팅 런타임 의존성은 추가하지 않는다.
- 콘텐츠는 `src/content/site.ts`의 typed constant로 관리해 API 요구사항을 만들지 않는다.
- Storybook 레퍼런스는 `BrandSite`, `NavigationMenu`, `Card`, `Accordion`, `Button`을 우선 적용한다.
- 실제 인증/수상 명칭은 금지어 테스트로 보호한다.

## Phase 1: 설계 및 계약

설계 산출물은 다음 위치에 생성했다.

- 데이터 모델: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\data-model.md`
- UI 라우트 계약: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\contracts\ui-routes.md`
- Quickstart: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\quickstart.md`

## 헌법 체크 재검토

*GATE: Phase 1 설계 후 재검토*

- **코드 품질**: 통과. 데이터 모델과 UI 계약이 라우트, 콘텐츠, 표시 책임을 분리한다.
- **테스트 표준**: 통과. quickstart와 계약이 구현 전 테스트 작성 대상을 명확히 한다.
- **UX 일관성**: 통과. Storybook 및 `DESIGN.md` 기준 컴포넌트 선택이 설계에 반영되었다.
- **성능 요구사항**: 통과. 정적 콘텐츠, 무 API, 새 라우팅 의존성 없음으로 초기 로드 목표를 만족할 수 있다.
- **단순성**: 통과. 요청 범위를 넘는 검색, 상세 페이지, CMS, 폼을 제외했다.
- **문서 언어 정책**: 통과. 산출물은 한국어로 작성했다.

## 복잡도 추적

헌법 위반이 없어 별도 복잡도 정당화가 필요하지 않다.
