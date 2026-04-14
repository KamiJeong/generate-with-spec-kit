# Tasks: 서비스 소개 웹사이트

**Input**: Design documents from `/specs/017-intro-website/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: 사용자 스토리별로 그룹화되어 각 스토리를 독립적으로 구현·테스트·배포할 수 있다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 상호 의존 없음)
- **[Story]**: 태스크가 속한 사용자 스토리 (US1, US2, US3)
- 각 태스크에 정확한 파일 경로 포함

---

## Phase 1: Setup (패키지 초기화)

**목적**: `packages/web` Vite+React SPA 패키지 생성 및 기본 구조 설정

- [X] T001 `packages/web/package.json` 생성 — `@myorg/web` 패키지명, `@myorg/ui` workspace 의존성, `@myorg/tokens` workspace 의존성, vite, @vitejs/plugin-react, react, react-dom, react-hook-form, lucide-react 추가
- [X] T002 `packages/web/vite.config.ts` 생성 — @vitejs/plugin-react, `@myorg/ui` alias 설정, base path 설정
- [X] T003 `packages/web/tsconfig.json` 생성 — React JSX, strict 모드, path alias 설정
- [X] T004 `packages/web/index.html` 생성 — 기본 HTML 진입점, `<div id="root">`, 한국어 `lang="ko"` 설정 (FR-007 접근성 기반)
- [X] T005 [P] `packages/web/src/index.css` 생성 — Tailwind CSS v4 `@import` 설정 (`@myorg/tokens` CSS 변수 포함)
- [X] T006 [P] `packages/web/src/main.tsx` 생성 — React 18 `createRoot`, App 컴포넌트 마운트
- [X] T007 pnpm workspace에 `packages/web` 등록 — `pnpm-workspace.yaml` 확인 및 `turbo.json` pipeline에 web 패키지 추가
- [X] T008 `pnpm --filter @myorg/web install` 실행하여 의존성 설치 확인

**Checkpoint**: `pnpm --filter @myorg/web dev` 실행 시 빈 React 앱이 http://localhost:5173에서 동작해야 한다

---

## Phase 2: Foundational (공통 기반)

**목적**: 모든 사용자 스토리가 공유하는 콘텐츠 데이터, 타입, 레이아웃 기반 구축

**⚠️ CRITICAL**: 이 Phase 완료 전까지 사용자 스토리 작업을 시작할 수 없다

- [X] T009 `packages/web/src/content/site.ts` 생성 — `SiteConfig`, `NavItem`, `Feature`, `Stat`, `Testimonial` 인터페이스 정의 및 플레이스홀더 데이터 내보내기 (`data-model.md` 기준)
- [X] T010 [P] `packages/web/tests/content/site.test.ts` 생성 — Feature 배열 길이 3~6 제약 검증, 필수 필드 존재 여부 검증 (`@req FR-003`)
- [X] T011 `packages/web/src/components/layout/SiteFooter.tsx` 생성 — 서비스명, 간단한 저작권 텍스트, `<footer>` 시맨틱 태그 사용
- [X] T012 [P] `packages/web/src/App.tsx` 생성 — SiteHeader, 각 섹션 컴포넌트 (플레이스홀더), SiteFooter를 조합하는 최상위 컴포넌트. 각 섹션에 `id` 앵커 속성 부여 (`#hero`, `#about`, `#features`, `#trust`, `#contact`)

**Checkpoint**: 앱 기본 뼈대가 동작하고 콘텐츠 데이터 타입이 검증된다

---

## Phase 3: User Story 1 — 첫 방문자의 서비스 가치 파악 (Priority: P1) 🎯 MVP

**Goal**: 첫 방문자가 스크롤 없이 서비스 이름, 헤드라인, 설명, CTA 버튼을 확인하고, 5초 이내에 서비스가 무엇인지 파악할 수 있다

**Independent Test**: HeroSection만 렌더링하여 헤드라인 텍스트와 CTA 버튼이 존재하는지 확인. 모바일(375px) viewport에서 버튼이 잘리지 않는지 확인.

### 테스트 — User Story 1

- [X] T013 [P] [US1] `packages/web/tests/components/HeroSection.test.tsx` 생성 — 헤드라인 렌더링, CTA 버튼 텍스트, `aria-label` 존재 여부, 시맨틱 `<section>` + `<h1>` 태그 검증 (`@req FR-001`, `@req SC-001`)

### 구현 — User Story 1

- [X] T014 [US1] `packages/web/src/components/sections/HeroSection.tsx` 구현 — `BrandSiteLayout` 스토리 패턴 참고. `<section id="hero">`, `<h1>` 헤드라인, 보조 설명 `<p>`, `@myorg/ui` `Button` (size="lg") CTA 버튼, `Badge` 컴포넌트 포함. `site.ts`의 `SiteConfig` 데이터 사용 (`@req FR-001`)
- [X] T015 [US1] `packages/web/src/components/sections/HeroSection.tsx`에 히어로 하단 숫자 지표 카드 그리드 추가 — `@myorg/ui` `Card`, `CardContent` 3개 배치 (`ProductLandingLayout` 패턴 참고, `site.ts`의 `Stat[]` 데이터 사용)
- [X] T016 [US1] HeroSection 반응형 검증 — 모바일(320px) ~ 데스크톱(1440px)에서 레이아웃 확인. `flex-col sm:flex-row` CTA 버튼 그룹 적용 (`@req FR-006`)

**Checkpoint**: HeroSection을 독립 렌더링했을 때 헤드라인, 설명, CTA 버튼, 지표 카드가 모두 표시되고 T013 테스트가 통과한다

---

## Phase 4: User Story 2 — 잠재 클라이언트의 신뢰 형성 (Priority: P2)

**Goal**: 잠재 클라이언트가 강점 카드, 숫자 지표, 후기를 확인하고 신뢰를 형성한 뒤 문의 폼으로 이어진다

**Independent Test**: FeaturesSection, TrustSection, ContactSection을 순서대로 렌더링하여 각 섹션 콘텐츠 존재 확인. ContactSection 폼 유효성 검사(필수 필드 미입력 시 에러 메시지) 확인.

### 테스트 — User Story 2

- [X] T017 [P] [US2] `packages/web/tests/components/FeaturesSection.test.tsx` 생성 — 카드 개수 3~6 범위 검증, 각 카드의 제목·설명 렌더링, `<section>` 시맨틱 태그 검증 (`@req FR-003`)
- [X] T018 [P] [US2] `packages/web/tests/components/TrustSection.test.tsx` 생성 — 숫자 지표 렌더링, 후기 인용구·이름 렌더링, `<blockquote>` 또는 적절한 시맨틱 태그 검증 (`@req FR-004`)
- [X] T019 [P] [US2] `packages/web/tests/components/ContactSection.test.tsx` 생성 — 이름/이메일/메시지 필드 존재, 빈 제출 시 각 에러 메시지 표시, 이메일 형식 오류 메시지 검증 (`@req FR-005`, `@req SC-002`)

### 구현 — User Story 2

- [X] T020 [US2] `packages/web/src/components/sections/AboutSection.tsx` 구현 — `<section id="about">`, `<h2>` 섹션 제목, 서비스 설명 텍스트 블록. `@myorg/ui` `Separator` 또는 단순 레이아웃 사용 (`@req FR-002`)
- [X] T021 [US2] `packages/web/src/components/sections/FeaturesSection.tsx` 구현 — `<section id="features">`, `<h2>`, `@myorg/ui` `Card`+`CardHeader`+`CardTitle`+`CardDescription` 그리드 (3열 데스크톱/1열 모바일). `site.ts`의 `Feature[]` 데이터 사용. `BrandSiteLayout` 강점 섹션 패턴 참고 (`@req FR-003`)
- [X] T022 [US2] `packages/web/src/components/sections/TrustSection.tsx` 구현 — `<section id="trust">`, `<h2>`, 숫자 지표 그리드 (`Stat[]`), 후기 인용구 카드 (`Testimonial[]`). `@myorg/ui` `Card`, `Avatar`, `AvatarFallback` 사용. `ProductLandingLayout` 후기 섹션 패턴 참고 (`@req FR-004`)
- [X] T023 [US2] `packages/web/src/components/sections/ContactSection.tsx` 구현 — `<section id="contact">`, `<h2>`, `react-hook-form` 기반 인라인 문의 폼. `@myorg/ui` `Field`+`Input`+`Textarea`+`Button` 사용. 유효성 검사: 이름 필수, 이메일 형식, 메시지 10자 이상. 성공 시 인라인 성공 메시지 표시 (`@req FR-005`)
- [X] T024 [US2] ContactSection 접근성 보강 — `aria-required`, `aria-invalid`, `aria-describedby` 오류 메시지 연결, 폼 `<legend>` 또는 `aria-labelledby` 적용 (`@req FR-007`, `@req SC-004`)

**Checkpoint**: FeaturesSection(3-6 카드), TrustSection(지표+후기), ContactSection(폼+유효성)이 모두 독립 렌더링되고 T017~T019 테스트가 통과한다

---

## Phase 5: User Story 3 — 내부 이해관계자의 외부 공유 (Priority: P3)

**Goal**: Sticky 헤더(로고 + 앵커 링크 + CTA, 모바일 햄버거 메뉴)가 완성되어 외부 공유 시 전문적인 첫인상을 제공한다

**Independent Test**: SiteHeader를 렌더링하여 로고, 앵커 링크, CTA 버튼 표시 확인. 모바일 viewport에서 햄버거 메뉴 토글 시 드로어가 열리는지 확인.

### 테스트 — User Story 3

- [X] T025 [P] [US3] `packages/web/tests/components/SiteHeader.test.tsx` 생성 — 로고 렌더링, 데스크톱 nav 링크 표시, CTA 버튼 존재, 모바일에서 햄버거 버튼 표시 및 클릭 시 Sheet 열림, `<header>` + `role="navigation"` 시맨틱 태그 검증 (`@req FR-000`, `@req SC-004`)

### 구현 — User Story 3

- [X] T026 [US3] `packages/web/src/components/layout/SiteHeader.tsx` 구현 — `<header>` + `sticky top-0 z-50` CSS, 로고 영역, `@myorg/ui` `NavigationMenu` (데스크톱, `hidden md:flex`), CTA `Button`, `@myorg/ui` `Sheet`+`SheetContent` (모바일 햄버거 드로어, `md:hidden`). `BrandSiteLayout` 헤더 패턴 참고 (`@req FR-000`)
- [X] T027 [US3] SiteHeader 앵커 링크 연결 — `NavItem[]` 데이터 기반으로 `#hero`, `#about`, `#features`, `#trust`, `#contact` 앵커 링크 생성. 클릭 시 해당 섹션으로 부드러운 스크롤 (`scroll-behavior: smooth` CSS 또는 `scrollIntoView`)
- [X] T028 [US3] `packages/web/src/App.tsx` 최종 조합 — SiteHeader를 실제 구현체로 교체, 전체 페이지 섹션 순서 확정: Header → Hero → About → Features → Trust → Contact → Footer

**Checkpoint**: 전체 페이지가 렌더링되고 헤더 앵커 클릭으로 각 섹션 이동이 동작한다. T025 테스트가 통과한다.

---

## Phase 6: Polish & 공통 관심사

**목적**: WCAG 2.1 AA 최종 검증, 성능, 반응형 마무리, 빌드 확인

- [X] T029 [P] 전체 페이지 WCAG 2.1 AA 수동 체크리스트 실행 — 색상 대비(4.5:1 이상), 포커스 링 가시성, `alt` 텍스트, 랜드마크 순서(`header > main > footer`), 키보드 탭 이동 순서 검증 (`@req FR-007`, `@req SC-004`)
- [X] T030 [P] `packages/web/src/index.css`에 `html { scroll-behavior: smooth; }` 추가 및 `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` 모션 민감성 대응
- [X] T031 `pnpm --filter @myorg/web build` 실행 — 빌드 성공 및 `dist/` 출력 확인. 번들 크기 확인 (이상 징후 없을 것으로 예상)
- [X] T032 [P] 모바일(375px), 태블릿(768px), 데스크톱(1280px) 3개 뷰포트에서 브라우저 수동 확인 — 레이아웃 깨짐 없음, CTA 버튼 도달 용이성, 헤더 sticky 동작 검증 (`@req FR-006`, `@req SC-003`)
- [X] T033 `packages/web/README.md` 또는 `specs/017-intro-website/quickstart.md` 콘텐츠 교체 가이드 업데이트 — 실제 마케팅 카피 교체 방법 설명 (`@req FR-010`)

---

## Dependencies & Execution Order

### Phase 의존 관계

```
Phase 1 (Setup)
    └─→ Phase 2 (Foundational) ← BLOCKS all user stories
            ├─→ Phase 3 (US1 - P1) 🎯 MVP
            ├─→ Phase 4 (US2 - P2) ← 독립 시작 가능 (Phase 2 완료 후)
            └─→ Phase 5 (US3 - P3) ← 독립 시작 가능 (Phase 2 완료 후)
                                          ↓
                                    Phase 6 (Polish) ← 원하는 스토리 완료 후
```

### User Story 의존 관계

- **US1 (P1)**: Phase 2 완료 후 독립 시작 가능. 다른 스토리 의존 없음.
- **US2 (P2)**: Phase 2 완료 후 독립 시작 가능. US1과 병렬 진행 가능. `App.tsx`에 섹션 통합 시 US1 완료 권장.
- **US3 (P3)**: Phase 2 완료 후 독립 시작 가능. 헤더는 모든 섹션에 독립적이므로 US1/US2와 병렬 진행 가능.

### 스토리 내 순서

- 테스트 먼저 작성 → 실패 확인 → 구현 → 통과 확인 (Constitution II TDD)
- 콘텐츠 데이터(`site.ts`) → 컴포넌트 구현 → 반응형 검증

### 병렬 실행 기회

- T005, T006 (Phase 1): 서로 다른 파일, 동시 실행 가능
- T010, T011, T012 (Phase 2): 동시 실행 가능
- T013 (테스트) + T014 (구현): TDD 원칙상 T013 먼저
- T017, T018, T019 (US2 테스트): 동시 실행 가능
- T020, T021, T022, T023 (US2 구현): T020~T022는 병렬, T023는 독립
- T025 (US3 테스트): T026 구현 전 먼저
- T029, T030, T031, T032 (Polish): 동시 실행 가능

---

## Parallel Example: User Story 2

```bash
# US2 테스트 동시 시작:
Task T017: packages/web/tests/components/FeaturesSection.test.tsx 생성
Task T018: packages/web/tests/components/TrustSection.test.tsx 생성
Task T019: packages/web/tests/components/ContactSection.test.tsx 생성

# 테스트 실패 확인 후 구현 병렬 시작:
Task T020: AboutSection.tsx 구현
Task T021: FeaturesSection.tsx 구현
Task T022: TrustSection.tsx 구현
Task T023: ContactSection.tsx 구현 (react-hook-form 폼)
```

---

## Implementation Strategy

### MVP First (User Story 1만)

1. Phase 1 완료 — 패키지 초기화
2. Phase 2 완료 — 콘텐츠 데이터, App 뼈대 (CRITICAL)
3. Phase 3 완료 — HeroSection 구현
4. **STOP & VALIDATE**: T013 테스트 통과, 브라우저에서 히어로 확인
5. 히어로만으로도 서비스 가치를 파악할 수 있는 MVP 완성

### 순차적 증분 배포

1. Setup + Foundational → 기반 완성
2. US1 추가 → 히어로 단독 검증 → 배포/데모 (MVP!)
3. US2 추가 → 신뢰 형성 섹션 + 문의 폼 검증 → 배포/데모
4. US3 추가 → 헤더 + 전체 페이지 검증 → 배포/데모
5. Polish → 접근성·성능 최종 확인

### 병렬 팀 전략 (2인 이상)

1. Phase 1+2는 함께 완료
2. Phase 2 완료 후:
   - 개발자 A: US1 (HeroSection)
   - 개발자 B: US2 (AboutSection, FeaturesSection, TrustSection, ContactSection)
   - 개발자 C (있다면): US3 (SiteHeader)
3. 각 스토리 독립 완료 후 `App.tsx`에서 통합

---

## Notes

- `[P]` 태스크 = 다른 파일, 의존 관계 없음 — 동시 실행 가능
- `[Story]` 레이블은 spec.md 사용자 스토리와 직접 대응
- `@req FR-XXX` 주석을 테스트 파일에 추가하여 DocGuard 추적성 확보
- 각 태스크 또는 논리적 그룹 완료 후 커밋
- 각 Checkpoint에서 해당 스토리를 독립적으로 검증할 것
- 새 UI 패턴 필요 시 Storybook MCP로 기존 컴포넌트 먼저 조회 (`FR-008`)
