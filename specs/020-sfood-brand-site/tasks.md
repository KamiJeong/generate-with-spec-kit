# Tasks: SFood 브랜드 사이트

**Input**: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\specs\020-sfood-brand-site\`의 설계 문서  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-routes.md`, `quickstart.md`

**Tests**: 프로젝트 헌법의 TDD 원칙에 따라 각 사용자 스토리별 테스트 작업을 구현 작업보다 먼저 포함한다.

**Organization**: 사용자 스토리별로 작업을 묶어 각 스토리를 독립적으로 구현, 테스트, 검증할 수 있게 한다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 서로 다른 파일을 수정하며 선행 미완료 작업에 의존하지 않아 병렬 실행 가능
- **[Story]**: 사용자 스토리 단계 작업에만 붙이며 `US1`, `US2`, `US3` 형식 사용
- 모든 작업 설명은 실행 대상 파일 경로를 포함한다.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: `apps/sfood` 신규 앱의 패키지, 빌드, 테스트 기반을 만든다.

- [X] T001 Create SFood app package metadata and scripts in `apps/sfood/package.json`
- [X] T002 [P] Create Vite HTML entry in `apps/sfood/index.html`
- [X] T003 [P] Configure TypeScript paths and strict options in `apps/sfood/tsconfig.json`
- [X] T004 [P] Configure Vite aliases and Tailwind plugin in `apps/sfood/vite.config.ts`
- [X] T005 [P] Configure Vitest jsdom environment and coverage settings in `apps/sfood/vitest.config.ts`
- [X] T006 [P] Create Testing Library setup in `apps/sfood/tests/setup.ts`
- [X] T007 [P] Create React root entry in `apps/sfood/src/main.tsx`
- [X] T008 [P] Create token-driven global stylesheet in `apps/sfood/src/index.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리가 공유하는 라우트, 콘텐츠 모델, 공통 레이아웃, 접근성 기반을 만든다.

**⚠️ CRITICAL**: 이 단계가 완료되기 전에는 사용자 스토리 구현을 시작하지 않는다.

- [X] T009 [P] Add failing route contract tests for all 8 public URLs and navigation hrefs in `apps/sfood/tests/routes.test.tsx`
- [X] T010 [P] Add failing content invariant tests for required fields, support list rules, and forbidden quality terms in `apps/sfood/tests/content.test.ts`
- [X] T011 [P] Add failing accessibility structure tests for headings, current navigation, and shared layout landmarks in `apps/sfood/tests/accessibility-structure.test.tsx`
- [X] T012 Implement typed page and navigation route map in `apps/sfood/src/routes/route-map.ts`
- [X] T013 Implement shared content entity types and base navigation data in `apps/sfood/src/content/site.ts`
- [X] T014 Implement path resolution and client-side navigation shell in `apps/sfood/src/App.tsx`
- [X] T015 [P] Implement shared header with SFood identity and primary navigation in `apps/sfood/src/components/layout/SiteHeader.tsx`
- [X] T016 [P] Implement shared footer with brand summary and support links in `apps/sfood/src/components/layout/SiteFooter.tsx`
- [X] T017 [P] Implement reusable page hero component in `apps/sfood/src/components/sections/PageHero.tsx`
- [X] T018 [P] Implement reusable section heading component in `apps/sfood/src/components/sections/SectionHeader.tsx`
- [X] T019 [P] Implement support-area navigation component in `apps/sfood/src/components/sections/SupportNav.tsx`
- [X] T020 Implement not-found fallback page with home navigation in `apps/sfood/src/pages/NotFoundPage.tsx`

**Checkpoint**: Foundation ready. All user story pages can now be implemented against the same route map, layout, and content model.

---

## Phase 3: User Story 1 - SFood 브랜드를 빠르게 이해한다 (Priority: P1) 🎯 MVP

**Goal**: `/`에서 SFood의 미션, 육가공 전문성, Meal Solution 확장, B2B/B2C 구조, 품질 신뢰 요소, 주요 탐색 경로를 즉시 이해하게 한다.

**Independent Test**: `/`를 렌더링했을 때 메인 제목, 미션, 대표 제품 전문성, B2B/B2C 메시지, 품질 신뢰 표현, 주요 메뉴 링크가 모두 보인다.

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T021 [P] [US1] Add failing homepage journey tests for mission, expertise, meal solution, and navigation in `apps/sfood/tests/user-stories/home.test.tsx`

### Implementation for User Story 1

- [X] T022 [US1] Add homepage copy, stats, product expertise, and CTA content in `apps/sfood/src/content/site.ts`
- [X] T023 [P] [US1] Implement brand hero section using Storybook BrandSite patterns in `apps/sfood/src/components/sections/HeroSection.tsx`
- [X] T024 [US1] Implement homepage sections and wire `HeroSection` in `apps/sfood/src/pages/HomePage.tsx`
- [X] T025 [US1] Register `HomePage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: MVP 완료. `/`만으로 SFood 브랜드의 핵심 포지셔닝과 탐색 경로를 독립 검증할 수 있다.

---

## Phase 4: User Story 2 - 회사 정체성과 신뢰 요소를 확인한다 (Priority: P2)

**Goal**: `/about`에서 회사 미션, 사업 영역, 제품 전문성, 품질 접근, 일반화된 신뢰 표현을 확인하게 한다.

**Independent Test**: `/about`을 렌더링했을 때 회사소개 핵심 콘텐츠와 품질 신뢰 문구가 보이고, 정확한 인증/수상 명칭은 보이지 않는다.

### Tests for User Story 2 ⚠️

- [X] T026 [P] [US2] Add failing about page tests for mission, business domains, quality wording, and forbidden exact names in `apps/sfood/tests/user-stories/about.test.tsx`

### Implementation for User Story 2

- [X] T027 [US2] Add about page mission, business area, and generic quality content in `apps/sfood/src/content/site.ts`
- [X] T028 [US2] Implement company introduction layout in `apps/sfood/src/pages/AboutPage.tsx`
- [X] T029 [US2] Register `AboutPage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: `/about`은 다른 스토리 없이 회사 정체성과 신뢰 요소를 독립 검증할 수 있다.

---

## Phase 5: User Story 3 - 지속 가능성 방향을 이해한다 (Priority: P2)

**Goal**: `/sustainability`에서 책임 있는 원료, 생산 개선, 식품 생태계, 미래 식문화 등 지속 가능성 이야기를 이해하게 한다.

**Independent Test**: `/sustainability`를 렌더링했을 때 최소 세 가지 지속 가능성 주제와 "더 좋은 식품으로 더 좋은 세상" 방향성이 보인다.

### Tests for User Story 3 ⚠️

- [X] T030 [P] [US3] Add failing sustainability page tests for at least three sustainability themes and mission continuity in `apps/sfood/tests/user-stories/sustainability.test.tsx`

### Implementation for User Story 3

- [X] T031 [US3] Add sustainability story themes and proof copy in `apps/sfood/src/content/site.ts`
- [X] T032 [US3] Implement sustainability story page in `apps/sfood/src/pages/SustainabilityPage.tsx`
- [X] T033 [US3] Register `SustainabilityPage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: `/sustainability`는 지속 가능성 메시지를 독립 검증할 수 있다.

---

## Phase 6: User Story 4 - 브랜드와 제품 포트폴리오를 탐색한다 (Priority: P3)

**Goal**: `/brands`에서 소비자 브랜드 라인과 비즈니스 솔루션 라인, 대표 제품군을 구분하게 한다.

**Independent Test**: `/brands`를 렌더링했을 때 consumer 라인과 business 라인이 각각 존재하고 햄, 소시지, 베이컨, 바비큐, 치즈, 빵, 소스, HMR 관련 제품군을 확인할 수 있다.

### Tests for User Story 4 ⚠️

- [X] T034 [P] [US4] Add failing brand portfolio tests for consumer/business lines and product categories in `apps/sfood/tests/user-stories/brands.test.tsx`

### Implementation for User Story 4

- [X] T035 [US4] Add brand line data with consumer and business audiences in `apps/sfood/src/content/site.ts`
- [X] T036 [US4] Implement brand portfolio page with card-based sections in `apps/sfood/src/pages/BrandsPage.tsx`
- [X] T037 [US4] Register `BrandsPage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: `/brands`는 브랜드 구조와 제품 포트폴리오를 독립 검증할 수 있다.

---

## Phase 7: User Story 5 - 인재상과 채용 절차를 확인한다 (Priority: P3)

**Goal**: `/talent`에서 인재상, 일하는 가치, 지원부터 최종 결정까지의 채용 프로세스를 확인하게 한다.

**Independent Test**: `/talent`를 렌더링했을 때 인재상과 순서 있는 채용 단계가 보이고 개인정보 입력 또는 실제 지원 폼이 없다.

### Tests for User Story 5 ⚠️

- [X] T038 [P] [US5] Add failing talent page tests for talent values, ordered hiring steps, and no application form in `apps/sfood/tests/user-stories/talent.test.tsx`

### Implementation for User Story 5

- [X] T039 [US5] Add talent values and hiring step data in `apps/sfood/src/content/site.ts`
- [X] T040 [US5] Implement talent and hiring process page in `apps/sfood/src/pages/TalentPage.tsx`
- [X] T041 [US5] Register `TalentPage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: `/talent`는 채용 소개와 채용 프로세스를 독립 검증할 수 있다.

---

## Phase 8: User Story 6 - 지원 정보를 찾는다 (Priority: P4)

**Goal**: `/support/notice`, `/support/news`, `/support/faq`에서 목록형 공지사항, 목록형 회사소식, FAQ를 찾게 한다.

**Independent Test**: 세 지원 URL을 각각 렌더링했을 때 공지 3개 이상, 소식 3개 이상, 필수 FAQ 카테고리 답변이 보이고 상세 페이지 링크는 없다.

### Tests for User Story 6 ⚠️

- [X] T042 [P] [US6] Add failing support pages tests for notice/news list counts, no detail links, and support nav in `apps/sfood/tests/user-stories/support.test.tsx`
- [X] T043 [P] [US6] Add failing FAQ interaction tests for required categories and keyboard-operable accordion in `apps/sfood/tests/user-stories/faq.test.tsx`

### Implementation for User Story 6

- [X] T044 [US6] Add notice entries, news entries, and FAQ items in `apps/sfood/src/content/site.ts`
- [X] T045 [P] [US6] Implement list-style notice page without detail links in `apps/sfood/src/pages/NoticePage.tsx`
- [X] T046 [P] [US6] Implement list-style news page without detail links in `apps/sfood/src/pages/NewsPage.tsx`
- [X] T047 [P] [US6] Implement FAQ page using `Accordion` in `apps/sfood/src/pages/FaqPage.tsx`
- [X] T048 [US6] Register `NoticePage`, `NewsPage`, and `FaqPage` in route rendering switch in `apps/sfood/src/App.tsx`

**Checkpoint**: 지원 영역은 세 페이지 모두 독립적으로 검증 가능하며 상세 페이지 없이 완결된 요약 정보를 제공한다.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: 전체 품질, 접근성, 성능, 문서 검증을 완료한다.

- [X] T049 [P] Update SFood app README with routes, scripts, and static-scope notes in `apps/sfood/README.md`
- [ ] T050 Run quickstart validation commands and fix failures in `apps/sfood/package.json`, `apps/sfood/src`, and `apps/sfood/tests`
- [X] T051 Audit rendered copy for Korean tone, missing placeholders, and forbidden exact quality names in `apps/sfood/src/content/site.ts`
- [X] T052 Audit responsive layout and semantic token usage in `apps/sfood/src/index.css` and `apps/sfood/src/pages`
- [ ] T053 Run final `pnpm --filter @myorg/sfood test`, `pnpm --filter @myorg/sfood lint`, and `pnpm --filter @myorg/sfood build` from repository root

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 즉시 시작 가능
- **Foundational (Phase 2)**: Setup 완료 후 시작하며 모든 사용자 스토리를 차단
- **User Stories (Phase 3+)**: Foundational 완료 후 시작 가능
- **Polish (Phase 9)**: 구현하기로 한 사용자 스토리 완료 후 시작

### User Story Dependencies

- **US1 (P1)**: Foundational 완료 후 시작 가능, MVP 범위
- **US2 (P2)**: Foundational 완료 후 시작 가능, US1 없이 `/about` 독립 검증 가능
- **US3 (P2)**: Foundational 완료 후 시작 가능, US1 없이 `/sustainability` 독립 검증 가능
- **US4 (P3)**: Foundational 완료 후 시작 가능, `/brands` 독립 검증 가능
- **US5 (P3)**: Foundational 완료 후 시작 가능, `/talent` 독립 검증 가능
- **US6 (P4)**: Foundational 완료 후 시작 가능, 세 지원 URL 독립 검증 가능

### Within Each User Story

- 테스트 작업을 먼저 작성하고 실패를 확인한다.
- 콘텐츠 데이터 작업을 작성한다.
- 페이지 컴포넌트를 구현한다.
- `App.tsx` 라우트 등록을 마지막에 수행한다.
- 스토리 체크포인트에서 해당 URL만 독립 검증한다.

### Parallel Opportunities

- Setup의 `[P]` 작업 T002-T008은 T001과 충돌하지 않는 범위에서 병렬 가능하다.
- Foundational의 테스트 작업 T009-T011과 공통 컴포넌트 작업 T015-T019는 파일이 분리되어 병렬 가능하다.
- Foundational 완료 후 US2-US6의 테스트 파일 작성은 서로 다른 파일이므로 병렬 가능하다.
- US6의 Notice, News, FAQ 페이지 컴포넌트 작업 T045-T047은 `site.ts`와 `App.tsx` 등록 전후 의존성을 지키면 병렬 가능하다.

---

## Parallel Example: User Story 1

```text
Task: "T021 [US1] Add failing homepage journey tests in apps/sfood/tests/user-stories/home.test.tsx"
Task: "T023 [US1] Implement brand hero section in apps/sfood/src/components/sections/HeroSection.tsx"
```

## Parallel Example: User Stories 2 and 3

```text
Task: "T026 [US2] Add failing about page tests in apps/sfood/tests/user-stories/about.test.tsx"
Task: "T030 [US3] Add failing sustainability page tests in apps/sfood/tests/user-stories/sustainability.test.tsx"
```

## Parallel Example: User Story 6

```text
Task: "T045 [US6] Implement NoticePage in apps/sfood/src/pages/NoticePage.tsx"
Task: "T046 [US6] Implement NewsPage in apps/sfood/src/pages/NewsPage.tsx"
Task: "T047 [US6] Implement FaqPage in apps/sfood/src/pages/FaqPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 Setup 완료
2. Phase 2 Foundational 완료
3. Phase 3 US1 완료
4. `/`를 독립 검증하고 테스트를 통과시킨다.
5. 메인 페이지 데모가 가능하면 다음 스토리로 진행한다.

### Incremental Delivery

1. Setup + Foundational으로 공통 앱 기반을 만든다.
2. US1로 메인 브랜드 이해 경험을 완성한다.
3. US2와 US3로 회사 정체성 및 지속 가능성 신뢰 콘텐츠를 추가한다.
4. US4와 US5로 브랜드 포트폴리오 및 채용 콘텐츠를 추가한다.
5. US6로 지원 영역을 완성한다.
6. Polish 단계에서 quickstart, 접근성, 반응형, 최종 빌드를 검증한다.

### Parallel Team Strategy

1. 한 명은 Setup/Foundational을 마무리한다.
2. Foundational 후 각 담당자가 서로 다른 사용자 스토리의 테스트 파일과 페이지 파일을 맡는다.
3. `src/content/site.ts`와 `src/App.tsx`는 충돌 가능성이 있으므로 스토리 순서대로 통합한다.

## Notes

- `[P]` 작업은 다른 파일을 수정하거나 충돌 가능성이 낮은 작업이다.
- 모든 사용자 스토리 작업은 `[US#]` 라벨로 추적한다.
- `apps/sfood/src/content/site.ts`와 `apps/sfood/src/App.tsx`는 여러 스토리에서 순차적으로 통합한다.
- 공지사항과 회사소식에는 상세 페이지 링크, 상세 버튼, 상세 라우트를 만들지 않는다.
- 정확한 인증/수상 명칭은 콘텐츠와 렌더링 결과에 포함하지 않는다.
