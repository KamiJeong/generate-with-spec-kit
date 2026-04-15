# Tasks: AI Wiki Portal Platform Screen

**Input**: Design documents from `/specs/022-ai-wiki-portal/`  
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contract.md](./contracts/ui-contract.md), [quickstart.md](./quickstart.md)

**Tests**: TDD is required by the project constitution and quickstart. Write the test tasks in each user story first and confirm they fail before implementing that story.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and demonstrated independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the new workspace app and baseline build/test shell.

- [X] T001 Create the app directory structure under apps/ai-wiki-portal-platform-by-codex with src, src/components, src/lib, src/mock, src/pages, src/types, and tests folders
- [X] T002 Create workspace package manifest with scripts and dependencies in apps/ai-wiki-portal-platform-by-codex/package.json
- [X] T003 [P] Configure TypeScript compiler options and @wiki path alias in apps/ai-wiki-portal-platform-by-codex/tsconfig.json
- [X] T004 [P] Configure Vite React, Tailwind, base path, and @wiki alias in apps/ai-wiki-portal-platform-by-codex/vite.config.ts
- [X] T005 [P] Configure Vitest jsdom, coverage, setup file, and @wiki alias in apps/ai-wiki-portal-platform-by-codex/vitest.config.ts
- [X] T006 [P] Add Testing Library jest-dom setup in apps/ai-wiki-portal-platform-by-codex/tests/setup.ts
- [X] T007 Create Vite entry files in apps/ai-wiki-portal-platform-by-codex/index.html, apps/ai-wiki-portal-platform-by-codex/src/main.tsx, and apps/ai-wiki-portal-platform-by-codex/src/index.css
- [X] T008 Create initial router shell with lazy route placeholders in apps/ai-wiki-portal-platform-by-codex/src/App.tsx and apps/ai-wiki-portal-platform-by-codex/src/routes.tsx

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types, mock data, layout, and reusable primitives required before any user story can be implemented.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T009 Define all data-model entity types and state unions in apps/ai-wiki-portal-platform-by-codex/src/types/index.ts
- [X] T010 [P] Create role perspective mock data for non-developer, stakeholder, and support roles in apps/ai-wiki-portal-platform-by-codex/src/mock/roles.ts
- [X] T011 [P] Create at least 8 categorized wiki document mocks with markdown, related links, status, and next actions in apps/ai-wiki-portal-platform-by-codex/src/mock/documents.ts
- [X] T012 [P] Create execution step mocks with status, linked documents, help types, and feedback flags in apps/ai-wiki-portal-platform-by-codex/src/mock/steps.ts
- [X] T013 [P] Create project, simulated monitoring, and GitHub status mocks in apps/ai-wiki-portal-platform-by-codex/src/mock/projects.ts and apps/ai-wiki-portal-platform-by-codex/src/mock/github.ts
- [X] T014 [P] Create mock Blueprint output and validation sample data in apps/ai-wiki-portal-platform-by-codex/src/mock/blueprints.ts
- [X] T015 Implement typed selectors for documents, roles, projects, steps, and integration summaries in apps/ai-wiki-portal-platform-by-codex/src/mock/selectors.ts
- [X] T016 Implement status label and variant mapping helpers for document, execution, project, risk, and integration states in apps/ai-wiki-portal-platform-by-codex/src/lib/status.ts
- [X] T017 Implement shared loading, empty, unavailable, and error state components using @myorg/ui in apps/ai-wiki-portal-platform-by-codex/src/components/shared/StateFeedback.tsx
- [X] T018 Implement shared status badge and progress summary components using semantic tokens in apps/ai-wiki-portal-platform-by-codex/src/components/shared/StatusIndicators.tsx
- [X] T019 Implement role perspective selector component with accessible labels in apps/ai-wiki-portal-platform-by-codex/src/components/shared/RolePerspectiveSelector.tsx
- [X] T020 Implement app sidebar, header, breadcrumbs, and layout shell using @myorg/ui Sidebar patterns in apps/ai-wiki-portal-platform-by-codex/src/components/layout/AppLayout.tsx
- [X] T021 Wire AppLayout and concrete route placeholders for dashboard, wiki, wiki doc, blueprint, get started, and project detail in apps/ai-wiki-portal-platform-by-codex/src/App.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Explore the AI Development Wiki (Priority: P1) MVP

**Goal**: 비개발자가 역할 관점에 맞는 AI 개발 Wiki 구조를 탐색하고, 문서를 검색/필터링하고, 상세 문서를 읽을 수 있다.

**Independent Test**: `/wiki`와 `/wiki/:docId`에서 category 탐색, keyword/stage filter, no results, missing document, role-specific recommendations, markdown rendering을 검증한다.

### Tests for User Story 1

- [X] T022 [P] [US1] Write failing Wiki browsing, category filter, and no-results tests in apps/ai-wiki-portal-platform-by-codex/tests/WikiPage.test.tsx
- [X] T023 [P] [US1] Write failing Wiki document, missing document, related documents, next action, and markdown rendering tests in apps/ai-wiki-portal-platform-by-codex/tests/WikiDocPage.test.tsx
- [X] T024 [P] [US1] Write failing role perspective recommendation tests for Wiki entry points in apps/ai-wiki-portal-platform-by-codex/tests/RolePerspective.test.tsx

### Implementation for User Story 1

- [X] T025 [P] [US1] Implement search and category/stage filter controls using Field and @myorg/ui inputs in apps/ai-wiki-portal-platform-by-codex/src/components/wiki/WikiFilters.tsx
- [X] T026 [P] [US1] Implement document tree/list with status, summary, category, and empty state in apps/ai-wiki-portal-platform-by-codex/src/components/wiki/DocTree.tsx
- [X] T027 [P] [US1] Implement safe limited MarkdownViewer for headings, paragraphs, lists, links, inline code, fenced code, and emphasis in apps/ai-wiki-portal-platform-by-codex/src/components/wiki/MarkdownViewer.tsx
- [X] T028 [P] [US1] Implement document table of contents and related documents blocks in apps/ai-wiki-portal-platform-by-codex/src/components/wiki/DocNavigation.tsx
- [X] T029 [US1] Implement WikiPage with role recommendations, filters, document list, and no-results recovery in apps/ai-wiki-portal-platform-by-codex/src/pages/WikiPage.tsx
- [X] T030 [US1] Implement WikiDocPage with markdown content, related documents, next action, and missing-doc recovery in apps/ai-wiki-portal-platform-by-codex/src/pages/WikiDocPage.tsx
- [X] T031 [US1] Wire /wiki and /wiki/:docId routes to WikiPage and WikiDocPage in apps/ai-wiki-portal-platform-by-codex/src/App.tsx

**Checkpoint**: User Story 1 is independently functional and can be demonstrated as the MVP.

---

## Phase 4: User Story 2 - Start a Project from a Blueprint (Priority: P2)

**Goal**: 사용자가 요구사항을 입력하고 mock Blueprint 결과, 산출물 요약, 누락 입력, 다음 실행 가이드를 확인한다.

**Independent Test**: `/blueprint`에서 empty input, valid input, disabled/generating/generated states, mock output sections, missing-input guidance, linked execution guide를 검증한다.

### Tests for User Story 2

- [X] T032 [P] [US2] Write failing Blueprint form validation, disabled state, and generating state tests in apps/ai-wiki-portal-platform-by-codex/tests/BlueprintPage.test.tsx
- [X] T033 [P] [US2] Write failing mock Blueprint result, output section, missing input, and next-guide tests in apps/ai-wiki-portal-platform-by-codex/tests/BlueprintResult.test.tsx

### Implementation for User Story 2

- [X] T034 [P] [US2] Implement Blueprint requirement form with Field-wrapped textarea and validation copy in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintForm.tsx
- [X] T035 [P] [US2] Implement Blueprint result panels for PRD, system design, environment guide, API/data definition, and next guide in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintResult.tsx
- [X] T036 [P] [US2] Implement Blueprint readiness and missing-input guidance component in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintReadiness.tsx
- [X] T037 [US2] Implement BlueprintPage state machine for empty, draft-input, generating, generated, and missing-input states in apps/ai-wiki-portal-platform-by-codex/src/pages/BlueprintPage.tsx
- [X] T038 [US2] Wire /blueprint route and Blueprint next-guide links to Wiki documents in apps/ai-wiki-portal-platform-by-codex/src/App.tsx and apps/ai-wiki-portal-platform-by-codex/src/pages/BlueprintPage.tsx

**Checkpoint**: User Story 2 works independently and does not require live generation, storage, or project creation.

---

## Phase 5: User Story 3 - Monitor Project Progress and Collaboration (Priority: P3)

**Goal**: 프로젝트 이해관계자와 지원 담당자가 role perspective별 프로젝트 상태, blocked state, 최근 갱신, 수동 새로고침, GitHub/배포 요약을 확인한다.

**Independent Test**: `/dashboard`와 `/projects/:projectId`에서 role-specific dashboard, simulated refresh, blocked project help paths, GitHub unavailable state, missing project를 검증한다.

### Tests for User Story 3

- [X] T039 [P] [US3] Write failing dashboard project summary, role emphasis, refresh, and blocked state tests in apps/ai-wiki-portal-platform-by-codex/tests/DashboardPage.test.tsx
- [X] T040 [P] [US3] Write failing project detail, timeline, GitHub status, unavailable integration, and missing project tests in apps/ai-wiki-portal-platform-by-codex/tests/ProjectDetailPage.test.tsx

### Implementation for User Story 3

- [X] T041 [P] [US3] Implement dashboard stats and role-specific project summary components in apps/ai-wiki-portal-platform-by-codex/src/components/dashboard/StatsSummary.tsx
- [X] T042 [P] [US3] Implement project card with progress, risk, owner, last updated cue, and next action in apps/ai-wiki-portal-platform-by-codex/src/components/dashboard/ProjectCard.tsx
- [X] T043 [P] [US3] Implement activity feed and simulated refresh feedback component in apps/ai-wiki-portal-platform-by-codex/src/components/dashboard/ActivityFeed.tsx
- [X] T044 [P] [US3] Implement GitHub/deployment business status card with unavailable recovery action in apps/ai-wiki-portal-platform-by-codex/src/components/project/GithubStatusCard.tsx
- [X] T045 [P] [US3] Implement project timeline and participant/support context panels in apps/ai-wiki-portal-platform-by-codex/src/components/project/ProjectTimeline.tsx and apps/ai-wiki-portal-platform-by-codex/src/components/project/SupportContextPanel.tsx
- [X] T046 [US3] Implement DashboardPage with role-specific monitoring, manual refresh, blocked project help paths, and empty fallback in apps/ai-wiki-portal-platform-by-codex/src/pages/DashboardPage.tsx
- [X] T047 [US3] Implement ProjectDetailPage with simulated monitoring, GitHub status, support context, and missing-project recovery in apps/ai-wiki-portal-platform-by-codex/src/pages/ProjectDetailPage.tsx
- [X] T048 [US3] Wire /dashboard and /projects/:projectId routes to DashboardPage and ProjectDetailPage in apps/ai-wiki-portal-platform-by-codex/src/App.tsx

**Checkpoint**: User Story 3 works independently with deterministic mock monitoring and no live integrations.

---

## Phase 6: User Story 4 - Close the Document-Execution-Feedback Loop (Priority: P4)

**Goal**: 사용자가 문서 단계별 진행 상태를 확인하고, 오류/막힘 상황에서 AI Agent 질의, 사람 문의, 문서 피드백 흐름으로 이동한다.

**Independent Test**: `/get-started`, 문서 상세, 프로젝트 상세에서 execution step status, help path, AI question context, feedback context, empty description validation을 검증한다.

### Tests for User Story 4

- [X] T049 [P] [US4] Write failing get-started step status, blocked step, and help path tests in apps/ai-wiki-portal-platform-by-codex/tests/GetStartedPage.test.tsx
- [X] T050 [P] [US4] Write failing AI assistance context and feedback source context tests in apps/ai-wiki-portal-platform-by-codex/tests/FeedbackAndHelp.test.tsx

### Implementation for User Story 4

- [X] T051 [P] [US4] Implement step list with execution status, expected result, and linked document actions in apps/ai-wiki-portal-platform-by-codex/src/components/get-started/StepList.tsx
- [X] T052 [P] [US4] Implement AI question panel that preserves source document, project, or step context in apps/ai-wiki-portal-platform-by-codex/src/components/project/AiQueryPanel.tsx
- [X] T053 [P] [US4] Implement feedback entry form with source context and empty-description validation in apps/ai-wiki-portal-platform-by-codex/src/components/shared/FeedbackEntry.tsx
- [X] T054 [US4] Implement GetStartedPage with role-aware execution path, blocked state recovery, and support actions in apps/ai-wiki-portal-platform-by-codex/src/pages/GetStartedPage.tsx
- [X] T055 [US4] Integrate FeedbackEntry and AiQueryPanel entry points into apps/ai-wiki-portal-platform-by-codex/src/pages/WikiDocPage.tsx and apps/ai-wiki-portal-platform-by-codex/src/pages/ProjectDetailPage.tsx
- [X] T056 [US4] Wire /get-started route and support navigation entries in apps/ai-wiki-portal-platform-by-codex/src/App.tsx and apps/ai-wiki-portal-platform-by-codex/src/components/layout/AppLayout.tsx

**Checkpoint**: User Story 4 completes the document-execution-feedback loop independently.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, performance/accessibility review, and final verification across all stories.

- [X] T057 [P] Audit semantic token usage and remove raw color values in apps/ai-wiki-portal-platform-by-codex/src/index.css, apps/ai-wiki-portal-platform-by-codex/src/components/layout/AppLayout.tsx, apps/ai-wiki-portal-platform-by-codex/src/components/shared/StateFeedback.tsx, and apps/ai-wiki-portal-platform-by-codex/src/components/shared/StatusIndicators.tsx
- [X] T058 [P] Add responsive layout coverage for dashboard, wiki, blueprint, get-started, and project detail pages in apps/ai-wiki-portal-platform-by-codex/src/pages/DashboardPage.tsx, apps/ai-wiki-portal-platform-by-codex/src/pages/WikiPage.tsx, apps/ai-wiki-portal-platform-by-codex/src/pages/BlueprintPage.tsx, apps/ai-wiki-portal-platform-by-codex/src/pages/GetStartedPage.tsx, and apps/ai-wiki-portal-platform-by-codex/src/pages/ProjectDetailPage.tsx
- [X] T059 [P] Add keyboard and accessible-name assertions for icon buttons, role selector, filters, refresh, help actions, and feedback form in apps/ai-wiki-portal-platform-by-codex/tests/Accessibility.test.tsx
- [X] T060 [P] Add performance smoke tests for search/filter, role switching, and simulated refresh feedback in apps/ai-wiki-portal-platform-by-codex/tests/Performance.test.tsx
- [X] T061 Run and fix lint issues for the Codex app package using apps/ai-wiki-portal-platform-by-codex/package.json scripts
- [X] T062 Run and fix test coverage issues for the Codex app package using apps/ai-wiki-portal-platform-by-codex/package.json scripts
- [X] T063 Run and fix production build issues for the Codex app package using apps/ai-wiki-portal-platform-by-codex/package.json scripts
- [X] T064 Validate quickstart route checklist and update any stale commands or route notes in specs/022-ai-wiki-portal/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): no dependencies.
- Foundational (Phase 2): depends on Phase 1 and blocks all user stories.
- User Story phases: depend on Phase 2, then can be implemented independently.
- Polish (Phase 7): depends on the user stories selected for delivery.

### User Story Dependencies

- User Story 1 (P1): starts after Phase 2; MVP scope.
- User Story 2 (P2): starts after Phase 2; uses shared layout and mock selectors, and only links to Wiki documents when US1 route is available.
- User Story 3 (P3): starts after Phase 2; independent dashboard/project route increment.
- User Story 4 (P4): starts after Phase 2; can be implemented after US1 and US3 for full integration, but its Get Started page is independently testable.

### Within Each User Story

- Tests must be written and observed failing before implementation.
- Mock data and types before components.
- Components before page assembly.
- Page assembly before route wiring.
- Story checkpoint before moving to the next priority.

## Parallel Opportunities

- Setup config tasks T003-T006 can run in parallel.
- Foundational mock data tasks T010-T014 can run in parallel after T009.
- US1 tests T022-T024 and components T025-T028 can be split by file.
- US2 tests T032-T033 and components T034-T036 can be split by file.
- US3 tests T039-T040 and components T041-T045 can be split by file.
- US4 tests T049-T050 and components T051-T053 can be split by file.
- Polish checks T057-T060 can run in parallel once story implementation is complete.

## Parallel Example: User Story 1

```text
Task: "T022 [P] [US1] Write failing Wiki browsing, category filter, and no-results tests in apps/ai-wiki-portal-platform-by-codex/tests/WikiPage.test.tsx"
Task: "T023 [P] [US1] Write failing Wiki document, missing document, related documents, next action, and markdown rendering tests in apps/ai-wiki-portal-platform-by-codex/tests/WikiDocPage.test.tsx"
Task: "T024 [P] [US1] Write failing role perspective recommendation tests for Wiki entry points in apps/ai-wiki-portal-platform-by-codex/tests/RolePerspective.test.tsx"
```

## Parallel Example: User Story 2

```text
Task: "T034 [P] [US2] Implement Blueprint requirement form with Field-wrapped textarea and validation copy in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintForm.tsx"
Task: "T035 [P] [US2] Implement Blueprint result panels for PRD, system design, environment guide, API/data definition, and next guide in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintResult.tsx"
Task: "T036 [P] [US2] Implement Blueprint readiness and missing-input guidance component in apps/ai-wiki-portal-platform-by-codex/src/components/blueprint/BlueprintReadiness.tsx"
```

## Parallel Example: User Story 3

```text
Task: "T041 [P] [US3] Implement dashboard stats and role-specific project summary components in apps/ai-wiki-portal-platform-by-codex/src/components/dashboard/StatsSummary.tsx"
Task: "T042 [P] [US3] Implement project card with progress, risk, owner, last updated cue, and next action in apps/ai-wiki-portal-platform-by-codex/src/components/dashboard/ProjectCard.tsx"
Task: "T044 [P] [US3] Implement GitHub/deployment business status card with unavailable recovery action in apps/ai-wiki-portal-platform-by-codex/src/components/project/GithubStatusCard.tsx"
```

## Parallel Example: User Story 4

```text
Task: "T051 [P] [US4] Implement step list with execution status, expected result, and linked document actions in apps/ai-wiki-portal-platform-by-codex/src/components/get-started/StepList.tsx"
Task: "T052 [P] [US4] Implement AI question panel that preserves source document, project, or step context in apps/ai-wiki-portal-platform-by-codex/src/components/project/AiQueryPanel.tsx"
Task: "T053 [P] [US4] Implement feedback entry form with source context and empty-description validation in apps/ai-wiki-portal-platform-by-codex/src/components/shared/FeedbackEntry.tsx"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Write failing US1 tests T022-T024.
4. Implement US1 tasks T025-T031.
5. Validate `/wiki` and `/wiki/:docId` independently before starting P2.

### Incremental Delivery

1. Deliver US1 Wiki exploration MVP.
2. Add US2 interactive mock Blueprint flow.
3. Add US3 simulated monitoring dashboard and project detail.
4. Add US4 execution feedback/help loop.
5. Run Phase 7 quality gates after each selected release slice.

### Quality Gates

1. `pnpm --filter @myorg/ai-wiki-portal-by-codex lint`
2. `pnpm --filter @myorg/ai-wiki-portal-by-codex test:coverage`
3. `pnpm --filter @myorg/ai-wiki-portal-by-codex build`
4. Manual keyboard review for navigation, filters, role selector, Blueprint form, refresh, help paths, and feedback entry.

## Notes

- `[P]` tasks use different files and can be parallelized after their dependencies are satisfied.
- `[US#]` labels map directly to the prioritized user stories in spec.md.
- Keep API, production auth, persistent Blueprint save, live Confluence sync, and live GitHub integration out of this feature.
- Commit after each story checkpoint or logical task group.
