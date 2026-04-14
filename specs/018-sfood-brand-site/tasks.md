# Tasks: SFood 브랜드 사이트 구축

**Input**: Design documents from `/specs/018-sfood-brand-site/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/route-content-contract.md](./contracts/route-content-contract.md), [quickstart.md](./quickstart.md)
**Tests**: Constitution II and quickstart.md require TDD, so each user-story phase includes tests before implementation.
**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and does not depend on incomplete tasks.
- **[Story]**: Maps a task to a user story from spec.md.
- Every task includes exact file paths.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new SFood package and baseline build/test scaffolding.

- [X] T001 Create `@myorg/sfood` package manifest with Vite, React, Tailwind v4, `@myorg/ui`, and `@myorg/tokens` scripts/dependencies in `packages/sfood/package.json`
- [X] T002 [P] Configure strict TypeScript and `@sfood/*` path alias in `packages/sfood/tsconfig.json`
- [X] T003 [P] Configure Vite React/Tailwind setup and `@sfood/*` alias in `packages/sfood/vite.config.ts`
- [X] T004 [P] Configure Vitest jsdom, coverage, and `@sfood/*` alias in `packages/sfood/vitest.config.ts`
- [X] T005 [P] Create the HTML entry and React root entry in `packages/sfood/index.html` and `packages/sfood/src/main.tsx`
- [X] T006 [P] Configure Testing Library setup and DOM shims in `packages/sfood/tests/setup.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared routing, content, theme, layout, and shell that all user stories depend on.

**Critical**: No user story implementation should start until this phase is complete.

- [X] T007 [P] Write route contract tests for all 8 paths, support nav grouping, and 404 fallback in `packages/sfood/tests/routing/routes.test.ts`
- [X] T008 [P] Write static content validation tests for mission text, B2B/B2C brands, article sorting, certifications, FAQ fields, and image alt text in `packages/sfood/tests/content/sfood-content.test.ts`
- [X] T009 [P] Write App shell tests for global header/footer and unknown-path fallback behavior in `packages/sfood/tests/App.test.tsx`
- [X] T010 Implement typed route definitions, nav hierarchy, support submenu metadata, and route lookup helpers in `packages/sfood/src/routing/routes.ts`
- [X] T011 Implement History API route state and navigation helper hook in `packages/sfood/src/routing/useCurrentRoute.ts`
- [X] T012 Implement shared typed SFood content constants for SiteConfig, Brand, ProductCategory, Article, FaqItem, HiringStep, SustainabilityMetric, Certification, and ImageAsset in `packages/sfood/src/content/sfood-content.ts`
- [X] T013 Configure Tailwind v4 imports, `@source` paths, base styles, and SFood semantic CSS variables in `packages/sfood/src/index.css`
- [X] T014 [P] Document image source, placeholder, loading, and alt-text policy in `packages/sfood/src/assets/README.md`
- [X] T015 [P] Implement shared section heading composition in `packages/sfood/src/components/shared/SectionHeader.tsx`
- [X] T016 [P] Implement shared page hero composition with responsive image support in `packages/sfood/src/components/shared/PageHero.tsx`
- [X] T017 [P] Implement reusable certification badge display in `packages/sfood/src/components/shared/CertificationBadge.tsx`
- [X] T018 Implement global header with active route state, desktop `NavigationMenu`, support submenu, and mobile `Sheet` navigation in `packages/sfood/src/components/layout/SiteHeader.tsx`
- [X] T019 [P] Implement global footer with internal links and brand summary in `packages/sfood/src/components/layout/SiteFooter.tsx`
- [X] T020 Implement App shell with global layout, route rendering placeholders, and 404 fallback in `packages/sfood/src/App.tsx` and `packages/sfood/src/pages/NotFoundPage.tsx`

**Checkpoint**: Foundation ready. User story implementation can now begin.

---

## Phase 3: User Story 1 - 브랜드 첫인상 및 메인 페이지 탐색 (Priority: P1) MVP

**Goal**: `/`에서 히어로, 브랜드 미션, 제품 카테고리, 품질 인증, 최신 뉴스/공지 2건, 전역 내비게이션을 통해 SFood의 첫인상을 전달한다.

**Independent Test**: `/`만 렌더링해도 히어로 슬로건과 배경 이미지, 전체 내비게이션, 브랜드 미션, 제품 카테고리 하이라이트, 인증 배지, 최신 뉴스/공지 2건이 확인된다.

### Tests for User Story 1

- [X] T021 [P] [US1] Write home page rendering test for hero, mission, product category highlights, certifications, and latest two articles in `packages/sfood/tests/pages/HomePage.test.tsx`
- [X] T022 [P] [US1] Write global navigation interaction test for route links, active page state, and mobile Sheet menu in `packages/sfood/tests/components/SiteHeader.test.tsx`

### Implementation for User Story 1

- [X] T023 [P] [US1] Implement product category highlight grid using `Card` and semantic tokens in `packages/sfood/src/components/home/ProductCategoryGrid.tsx`
- [X] T024 [P] [US1] Implement latest news/notice summary list using date-sorted Article data in `packages/sfood/src/components/home/LatestArticles.tsx`
- [X] T025 [US1] Implement HomePage hero, mission, category, certification, and latest article sections in `packages/sfood/src/pages/HomePage.tsx`
- [X] T026 [US1] Wire HomePage into the route renderer and header logo/home navigation in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 1 is independently functional and testable as the MVP.

---

## Phase 4: User Story 2 - 회사소개 및 브랜드 스토리 확인 (Priority: P2)

**Goal**: `/about`에서 미션, 비전, 핵심 가치, 연혁 타임라인, FSSC 22000/HACCP/DLG 인증을 전달한다.

**Independent Test**: `/about`만 렌더링해도 회사 미션 문구, 비전/핵심 가치, 연혁 타임라인, 품질 인증 3종이 확인된다.

### Tests for User Story 2

- [X] T027 [P] [US2] Write about page rendering test for mission, vision, values, timeline, and certifications in `packages/sfood/tests/pages/AboutPage.test.tsx`

### Implementation for User Story 2

- [X] T028 [P] [US2] Implement reusable company timeline section in `packages/sfood/src/components/about/TimelineSection.tsx`
- [X] T029 [P] [US2] Implement certification panel using shared CertificationBadge data in `packages/sfood/src/components/about/CertificationPanel.tsx`
- [X] T030 [US2] Implement AboutPage with mission, vision, values, timeline, and certification sections in `packages/sfood/src/pages/AboutPage.tsx`
- [X] T031 [US2] Wire AboutPage into route rendering and active navigation for `/about` in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 2 works independently after the foundational shell.

---

## Phase 5: User Story 3 - 브랜드 라인업 탐색 (Priority: P3)

**Goal**: `/brands`에서 B2B/B2C 브랜드를 구분하고 각 브랜드의 이름, 슬로건, 대표 제품군, 이미지를 카드로 표시한다.

**Independent Test**: `/brands`만 렌더링해도 B2B와 B2C 구분, 브랜드 카드, 슬로건, 대표 제품 카테고리가 확인된다.

### Tests for User Story 3

- [X] T032 [P] [US3] Write brands page rendering test for B2B/B2C separation and brand card content in `packages/sfood/tests/pages/BrandsPage.test.tsx`

### Implementation for User Story 3

- [X] T033 [P] [US3] Implement brand tabs/sections using `Tabs`, `Card`, image alt text, and product category badges in `packages/sfood/src/components/brands/BrandLineup.tsx`
- [X] T034 [US3] Implement BrandsPage with B2B/B2C brand lineup content in `packages/sfood/src/pages/BrandsPage.tsx`
- [X] T035 [US3] Wire BrandsPage into route rendering and active navigation for `/brands` in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 3 works independently after the foundational shell.

---

## Phase 6: User Story 4 - 지속 가능성 스토리 열람 (Priority: P4)

**Goal**: `/sustainability`에서 지속 가능한 식품 생태계 비전, 환경 실천, 사회 공헌, 거버넌스, 정량 지표 인포그래픽을 전달한다.

**Independent Test**: `/sustainability`만 렌더링해도 ESG 섹션별 콘텐츠와 탄소 저감/재활용 포장 등 정량 지표가 확인된다.

### Tests for User Story 4

- [X] T036 [P] [US4] Write sustainability page rendering test for ESG sections and metric values in `packages/sfood/tests/pages/SustainabilityPage.test.tsx`

### Implementation for User Story 4

- [X] T037 [P] [US4] Implement sustainability metric cards/progress visuals using semantic chart tokens in `packages/sfood/src/components/sustainability/SustainabilityMetrics.tsx`
- [X] T038 [US4] Implement SustainabilityPage with environmental, social, governance, and metric sections in `packages/sfood/src/pages/SustainabilityPage.tsx`
- [X] T039 [US4] Wire SustainabilityPage into route rendering and active navigation for `/sustainability` in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 4 works independently after the foundational shell.

---

## Phase 7: User Story 5 - 인재 채용 정보 확인 및 프로세스 파악 (Priority: P5)

**Goal**: `/talent`에서 채용 철학, 조직 문화, 복리후생, 서류 -> 1차 면접 -> 2차 면접 -> 최종 합격 프로세스를 전달한다.

**Independent Test**: `/talent`만 렌더링해도 채용 철학, 조직 문화, 복리후생, 4단계 채용 프로세스가 확인된다.

### Tests for User Story 5

- [X] T040 [P] [US5] Write talent page rendering test for culture, benefits, and four hiring steps in `packages/sfood/tests/pages/TalentPage.test.tsx`

### Implementation for User Story 5

- [X] T041 [P] [US5] Implement hiring process stepper/diagram with stable responsive layout in `packages/sfood/src/components/talent/HiringProcess.tsx`
- [X] T042 [US5] Implement TalentPage with recruitment philosophy, culture, benefits, and hiring process sections in `packages/sfood/src/pages/TalentPage.tsx`
- [X] T043 [US5] Wire TalentPage into route rendering and active navigation for `/talent` in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 5 works independently after the foundational shell.

---

## Phase 8: User Story 6 - 고객 지원 콘텐츠 이용 (Priority: P6)

**Goal**: `/support/notice`, `/support/news`, `/support/faq`에서 공지사항, 회사소식, FAQ를 제공하고 FAQ는 단일 모드 아코디언으로 동작한다.

**Independent Test**: `/support/faq`만 렌더링해도 질문-답변 아코디언을 사용할 수 있고, `/support/notice`와 `/support/news`에서 날짜 역순 목록과 뉴스 카드가 확인된다.

### Tests for User Story 6

- [X] T044 [P] [US6] Write support pages rendering test for notice date order, news cards, and support route headings in `packages/sfood/tests/pages/SupportPages.test.tsx`
- [X] T045 [P] [US6] Write FAQ accordion interaction test proving single open item behavior in `packages/sfood/tests/components/FaqAccordion.test.tsx`

### Implementation for User Story 6

- [X] T046 [P] [US6] Implement NoticePage with date-descending notice list and category labels in `packages/sfood/src/pages/NoticePage.tsx`
- [X] T047 [P] [US6] Implement NewsPage with responsive news card grid, images, titles, dates, and summaries in `packages/sfood/src/pages/NewsPage.tsx`
- [X] T048 [P] [US6] Implement single-mode FAQ accordion with `Accordion type="single"` in `packages/sfood/src/components/support/FaqAccordion.tsx`
- [X] T049 [US6] Implement FaqPage with category grouping and FaqAccordion integration in `packages/sfood/src/pages/FaqPage.tsx`
- [X] T050 [US6] Wire support pages into route rendering, support submenu, and active navigation in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx`

**Checkpoint**: User Story 6 works independently after the foundational shell.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, documentation, and cross-story validation.

- [X] T051 [P] Add package usage notes and route list in `packages/sfood/README.md`
- [X] T052 [P] Audit SFood source for raw color usage and replace with semantic tokens in `packages/sfood/src/index.css` and `packages/sfood/src`
- [X] T053 [P] Verify keyboard labels, image alt text, and `aria-current` coverage across layout/pages in `packages/sfood/src/components/layout/SiteHeader.tsx` and `packages/sfood/src/pages`
- [ ] T054 Run and fix `pnpm --filter @myorg/sfood test` failures for the test plan documented in `specs/018-sfood-brand-site/quickstart.md`
- [X] T055 Run and fix `pnpm --filter @myorg/sfood lint` issues for scripts defined in `packages/sfood/package.json`
- [ ] T056 Run and fix `pnpm --filter @myorg/sfood build` issues for scripts defined in `packages/sfood/package.json`
- [ ] T057 Document manual 320px, 768px, and 1280px responsive verification results in `specs/018-sfood-brand-site/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies.
- **Phase 2 Foundational**: Depends on Phase 1 completion and blocks all user stories.
- **Phase 3 US1**: Depends on Phase 2 and is the MVP.
- **Phase 4 US2**: Depends on Phase 2; can run after or alongside US1 if route wiring conflicts in `App.tsx` and `SiteHeader.tsx` are coordinated.
- **Phase 5 US3**: Depends on Phase 2; can run after or alongside other stories if route wiring conflicts are coordinated.
- **Phase 6 US4**: Depends on Phase 2; can run after or alongside other stories if route wiring conflicts are coordinated.
- **Phase 7 US5**: Depends on Phase 2; can run after or alongside other stories if route wiring conflicts are coordinated.
- **Phase 8 US6**: Depends on Phase 2; can run after or alongside other stories if route wiring conflicts are coordinated.
- **Phase 9 Polish**: Depends on all selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories; recommended MVP.
- **US2 (P2)**: No content dependency on US1; shares foundational layout and certifications.
- **US3 (P3)**: No content dependency on US1/US2; shares foundational content model.
- **US4 (P4)**: No content dependency on other stories; shares foundational content model.
- **US5 (P5)**: No content dependency on other stories; shares foundational content model.
- **US6 (P6)**: No content dependency on other stories; shares foundational article/FAQ content.

### Within Each User Story

- Tests must be written first and fail before implementation.
- Component/page implementation follows the test task in the same story.
- Route wiring in `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx` should happen after the page/component exists.
- Story checkpoint validation should pass before moving to the next priority story.

---

## Parallel Opportunities

- Setup tasks T002-T006 can run in parallel after T001 if file ownership is coordinated.
- Foundational test tasks T007-T009 can run in parallel.
- Foundational shared components T014-T017 and footer T019 can run in parallel after content/routes are shaped.
- Each story's test task can be written in parallel with other stories after Phase 2 if multiple developers coordinate route wiring.
- Within US6, NoticePage, NewsPage, and FaqAccordion implementation can run in parallel because they touch different files.
- Polish tasks T051-T053 can run in parallel after selected story implementation is complete.

## Parallel Example: User Story 1

```bash
Task: "Write home page rendering test for hero, mission, product category highlights, certifications, and latest two articles in packages/sfood/tests/pages/HomePage.test.tsx"
Task: "Write global navigation interaction test for route links, active page state, and mobile Sheet menu in packages/sfood/tests/components/SiteHeader.test.tsx"
Task: "Implement product category highlight grid using Card and semantic tokens in packages/sfood/src/components/home/ProductCategoryGrid.tsx"
Task: "Implement latest news/notice summary list using date-sorted Article data in packages/sfood/src/components/home/LatestArticles.tsx"
```

## Parallel Example: User Story 6

```bash
Task: "Implement NoticePage with date-descending notice list and category labels in packages/sfood/src/pages/NoticePage.tsx"
Task: "Implement NewsPage with responsive news card grid, images, titles, dates, and summaries in packages/sfood/src/pages/NewsPage.tsx"
Task: "Implement single-mode FAQ accordion with Accordion type=\"single\" in packages/sfood/src/components/support/FaqAccordion.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US1.
4. Run `pnpm --filter @myorg/sfood test`, `lint`, and `build` using `packages/sfood/package.json`.
5. Validate `/` independently against the US1 acceptance scenarios.

### Incremental Delivery

1. Deliver US1 as the first usable site surface.
2. Add US2, then US3, then US4, then US5, then US6 in priority order.
3. After each story, run the story's tests and verify the corresponding route manually.
4. Keep all previously delivered story tests passing before moving on.

### Parallel Team Strategy

1. One developer owns `packages/sfood/src/App.tsx` and `packages/sfood/src/components/layout/SiteHeader.tsx` route wiring to avoid conflicts.
2. Other developers can own story-local page/component/test files after Phase 2.
3. Merge each story only after its independent checkpoint passes.

## Format Validation

- All executable tasks use `- [ ] T###` checklist format.
- User-story tasks include `[US1]` through `[US6]` labels.
- Setup, foundational, and polish tasks omit story labels.
- `[P]` appears only on tasks that can be parallelized with different file ownership.
- Every executable task includes at least one exact file path.
