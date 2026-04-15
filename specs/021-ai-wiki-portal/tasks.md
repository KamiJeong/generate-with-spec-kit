# Tasks: AI Wiki Portal Platform 화면 개발

**Input**: Design documents from `/specs/021-ai-wiki-portal/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ui-contracts.md ✅

**Organization**: 5개 사용자 스토리(P1 × 1, P2 × 2, P3 × 2) 기반으로 독립 구현/검증 가능하게 구성

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 미완료 태스크 의존 없음)
- **[Story]**: 해당 사용자 스토리 레이블 (US1–US5)
- 모든 경로는 `apps/ai-wiki-portal-platform-by-claude/` 기준

---

## Phase 1: Setup (앱 패키지 초기화)

**Purpose**: monorepo에 신규 앱 패키지 생성 및 기본 환경 구성

- [X] T001 `apps/ai-wiki-portal-platform-by-claude/` 디렉토리 생성 후 `package.json` 작성 (name: `@myorg/ai-wiki-portal`, `@myorg/ui` + `@myorg/tokens` workspace 참조, `react-router-dom` 추가)
- [X] T002 `apps/ai-wiki-portal-platform-by-claude/tsconfig.json` 생성 (React JSX, strict 모드)
- [X] T003 [P] `apps/ai-wiki-portal-platform-by-claude/vite.config.ts` 생성 (Tailwind CSS v4 플러그인, `@myorg/ui` 경로 별칭)
- [X] T004 [P] `apps/ai-wiki-portal-platform-by-claude/vitest.config.ts` 생성 (jsdom 환경, `@testing-library/jest-dom` 셋업)
- [X] T005 `apps/ai-wiki-portal-platform-by-claude/index.html` 생성 (Pretendard 폰트 포함)
- [X] T006 `apps/ai-wiki-portal-platform-by-claude/src/main.tsx` 생성 (RouterProvider 마운트)

**Checkpoint**: `pnpm install && pnpm --filter @myorg/ai-wiki-portal dev` 실행 시 빈 앱이 뜨면 완료

---

## Phase 2: Foundational (공통 기반 — 모든 스토리 블로킹)

**Purpose**: 공통 타입, Mock 데이터, 레이아웃, 공유 컴포넌트 — 모든 사용자 스토리의 전제 조건

**⚠️ CRITICAL**: 이 Phase 완료 전까지 어떤 사용자 스토리도 시작 불가

- [X] T007 `apps/ai-wiki-portal-platform-by-claude/src/types/index.ts` 생성 (data-model.md 기반 전체 타입: `Project`, `ProjectStatus`, `Document`, `Blueprint`, `Step`, `User`, `ActivityFeedItem`, `GithubStatus` 등)
- [X] T008 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/projects.ts` 생성 (Mock `Project[]` 5개: 다양한 status/progress 포함)
- [X] T009 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/users.ts` 생성 (`mockCurrentUser`, `mockUsers[]`, `mockActivityFeed[]` 10개 항목)
- [X] T010 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/documents.ts` 생성 (`mockDocumentTree` 트리 구조 + `mockDocuments[]` 10개 문서, 각 문서 `contentHtml` + `headings` 포함)
- [X] T011 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/blueprints.ts` 생성 (완성된 `mockBlueprint` 1개, 4개 섹션 포함)
- [X] T012 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/steps.ts` 생성 (`mockSteps[]` 7개 단계)
- [X] T013 [P] `apps/ai-wiki-portal-platform-by-claude/src/mock/github.ts` 생성 (`mockGithubStatus` Record 객체)
- [X] T014 `apps/ai-wiki-portal-platform-by-claude/src/components/shared/StatusBadge.tsx` 구현 (in_progress=파랑, completed=초록, blocked=빨강)
- [X] T015 [P] `apps/ai-wiki-portal-platform-by-claude/src/components/shared/EmptyState.tsx` 구현 (title, description, action props)
- [X] T016 [P] `apps/ai-wiki-portal-platform-by-claude/src/components/shared/LoadingSpinner.tsx` 구현 (size, label props)
- [X] T017 `apps/ai-wiki-portal-platform-by-claude/src/components/layout/AppSidebar.tsx` 구현 (`SidebarProvider` + `Sidebar variant="inset" collapsible="icon"`, 4개 메뉴, useLocation 활성 상태)
- [X] T018 `apps/ai-wiki-portal-platform-by-claude/src/components/layout/AppHeader.tsx` 구현 (title, breadcrumbs props, 검색창, 알림 아이콘, 사용자 프로필 Mock)
- [X] T019 `apps/ai-wiki-portal-platform-by-claude/src/routes.tsx` 생성 (라우트 경로 상수 정의, 7개 경로)
- [X] T020 `apps/ai-wiki-portal-platform-by-claude/src/App.tsx` 구현 (`createBrowserRouter` + `RouterProvider`, AppSidebar + SidebarInset 레이아웃 래퍼, `/` → `/dashboard` 리다이렉트, 모든 페이지 `React.lazy` 임포트)

**Checkpoint**: 앱 실행 시 `DocsHubLayout` 스타일의 사이드바+헤더 레이아웃이 보이고 메뉴 클릭이 URL을 변경하면 완료

---

## Phase 3: User Story 1 - 플랫폼 홈 & 프로젝트 대시보드 조회 (Priority: P1) 🎯 MVP

**Goal**: Mock 데이터 기반 프로젝트 대시보드 — 프로젝트 카드 목록, 통계 요약, 활동 피드 표시

**Independent Test**: `/dashboard` 접속 시 Mock 프로젝트 카드 5개, 통계 요약 3개 수치, 활동 피드가 렌더링되어야 하며, 카드 클릭 시 `/projects/:id`로 이동해야 한다

### Implementation for User Story 1

- [X] T021 [US1] `apps/ai-wiki-portal-platform-by-claude/src/components/dashboard/StatsSummary.tsx` 구현 (총 프로젝트 수, 완료율, 활성 사용자 수 3개 카드)
- [X] T022 [P] [US1] `apps/ai-wiki-portal-platform-by-claude/src/components/dashboard/ProjectCard.tsx` 구현 (이름, 설명, Progress 바, StatusBadge, 참여자 아바타, 클릭 핸들러)
- [X] T023 [P] [US1] `apps/ai-wiki-portal-platform-by-claude/src/components/dashboard/ActivityFeed.tsx` 구현 (최근 5개 활동 이벤트, 이벤트 유형별 아이콘)
- [X] T024 [US1] `apps/ai-wiki-portal-platform-by-claude/src/pages/DashboardPage.tsx` 구현 (StatsSummary + 프로젝트 카드 그리드 + ActivityFeed, 프로젝트 없으면 EmptyState)
- [X] T025 [US1] `apps/ai-wiki-portal-platform-by-claude/tests/pages/DashboardPage.test.tsx` 작성 (Mock 프로젝트 5개 렌더링 확인, EmptyState 렌더링 확인, 카드 클릭 시 navigate 호출 확인) `// @req FR-005 FR-006 FR-007`

**Checkpoint**: `/dashboard` 화면이 독립적으로 완전히 동작. 프로젝트 카드 클릭 → URL 변경 확인

---

## Phase 4: User Story 2 - Wiki 문서 탐색 및 조회 (Priority: P2)

**Goal**: 트리 사이드바 탐색 + 문서 상세 조회 + TOC + 검색 결과 필터링

**Independent Test**: `/wiki` 접속 시 문서 트리가 렌더링되고, 트리 항목 클릭 → `/wiki/:docId`로 이동, 해당 문서 내용 + TOC가 표시되어야 한다. `?q=` 검색 시 결과 필터링 확인

### Implementation for User Story 2

- [X] T026 [P] [US2] `apps/ai-wiki-portal-platform-by-claude/src/components/wiki/DocTree.tsx` 구현 (`mockDocumentTree` 기반 아코디언/트리 메뉴, 카테고리별 그룹화, 클릭 핸들러)
- [X] T027 [P] [US2] `apps/ai-wiki-portal-platform-by-claude/src/components/wiki/DocContent.tsx` 구현 (`contentHtml`을 `dangerouslySetInnerHTML`로 렌더링, prose 스타일 적용)
- [X] T028 [P] [US2] `apps/ai-wiki-portal-platform-by-claude/src/components/wiki/TableOfContents.tsx` 구현 (`headings` 배열 기반 목차, 현재 섹션 하이라이트)
- [X] T029 [US2] `apps/ai-wiki-portal-platform-by-claude/src/pages/WikiPage.tsx` 구현 (DocTree + 검색 결과 목록, `?q=` 쿼리로 `mockDocuments` 필터링, 검색 없으면 카테고리별 문서 목록, 결과 없으면 EmptyState)
- [X] T030 [US2] `apps/ai-wiki-portal-platform-by-claude/src/pages/WikiDocPage.tsx` 구현 (`useParams`로 `docId` 읽기, `mockDocuments`에서 조회, DocContent + TableOfContents 렌더링, 없으면 EmptyState)
- [X] T031 [US2] `apps/ai-wiki-portal-platform-by-claude/tests/pages/WikiPage.test.tsx` 작성 (문서 목록 렌더링, 검색 필터링, EmptyState 확인) `// @req FR-008 FR-009 FR-010 FR-011`

**Checkpoint**: `/wiki` → 문서 선택 → `/wiki/:docId` 전체 흐름 독립 동작, 검색 `?q=키워드` 필터링 동작

---

## Phase 5: User Story 3 - Blueprint 생성 화면 (Priority: P2)

**Goal**: 요구사항 입력 → Mock 딜레이 후 Blueprint 결과(4개 섹션 탭) 표시 → 프로젝트 시작

**Independent Test**: `/blueprint` 접속 후 텍스트 입력, 생성 버튼 클릭 → 1.5초 로딩 → Mock Blueprint 결과 4개 탭(PRD/아키텍처/환경 가이드/API 설계) 표시 확인. "프로젝트 시작" → `/dashboard` 이동 확인

### Implementation for User Story 3

- [X] T032 [P] [US3] `apps/ai-wiki-portal-platform-by-claude/src/components/blueprint/BlueprintForm.tsx` 구현 (텍스트에어리어, 생성 버튼(입력 없으면 비활성), 로딩 상태 표시)
- [X] T033 [P] [US3] `apps/ai-wiki-portal-platform-by-claude/src/components/blueprint/BlueprintResult.tsx` 구현 (`Tabs` 컴포넌트 기반 4개 섹션(PRD/아키텍처/환경 가이드/API 설계), 각 탭 내 `contentHtml` 렌더링, "프로젝트 시작" 버튼)
- [X] T034 [US3] `apps/ai-wiki-portal-platform-by-claude/src/pages/BlueprintPage.tsx` 구현 (BlueprintForm + 조건부 BlueprintResult, `setTimeout` 1.5초 딜레이 시뮬레이션, 결과 생성 후 `mockProjects`에 새 항목 추가, "프로젝트 시작" → `/dashboard` 이동)
- [X] T035 [US3] `apps/ai-wiki-portal-platform-by-claude/tests/pages/BlueprintPage.test.tsx` 작성 (빈 입력 시 버튼 비활성 확인, 로딩 상태 확인, 결과 렌더링 확인) `// @req FR-012 FR-013 FR-014 FR-015`

**Checkpoint**: `/blueprint` 화면 독립 동작. 입력 → 생성 → 결과 탭 전체 흐름 확인

---

## Phase 6: User Story 4 - Get Started 가이드 단계별 진행 (Priority: P3)

**Goal**: 7단계 진행 가이드 — 체크박스 완료 처리, 진행률 업데이트, AI 도움말 패널 슬라이드 인

**Independent Test**: `/get-started` 접속 시 7개 단계 렌더링, 체크박스 클릭 → 완료 상태 + 진행률(%) 갱신, "AI 도움말" 클릭 → 패널 표시, 100% 완료 시 배너 표시

### Implementation for User Story 4

- [X] T036 [P] [US4] `apps/ai-wiki-portal-platform-by-claude/src/components/get-started/AiHelpPanel.tsx` 구현 (슬라이드 인 애니메이션 패널, `aiHelpHtml` 내용, 닫기 버튼)
- [X] T037 [US4] `apps/ai-wiki-portal-platform-by-claude/src/components/get-started/StepList.tsx` 구현 (단계 번호, 제목, 설명, 예상 소요 시간, 완료 체크박스, "AI 도움말" 버튼, 완료 시 취소선 스타일)
- [X] T038 [US4] `apps/ai-wiki-portal-platform-by-claude/src/pages/GetStartedPage.tsx` 구현 (진행률 Progress 바, StepList, AiHelpPanel, 100% 완료 시 완료 배너, 체크박스 상태를 `useState`로 관리)
- [X] T039 [US4] `apps/ai-wiki-portal-platform-by-claude/tests/components/StepList.test.tsx` 작성 (체크박스 클릭 → isCompleted 상태 변경, 진행률 계산 확인) `// @req FR-016 FR-017 FR-018`

**Checkpoint**: `/get-started` 화면 독립 동작. 체크박스 → 진행률 → AI 도움말 패널 전체 흐름 확인

---

## Phase 7: User Story 5 - 프로젝트 상세 및 GitHub 연동 현황 (Priority: P3)

**Goal**: 프로젝트 메타 정보 + 진행 단계 타임라인 + 참여자 목록 + Mock GitHub 현황 + AI 질의 패널

**Independent Test**: `/projects/:id` 접속 시 프로젝트 정보, 타임라인, 참여자, GitHub Mock 데이터(커밋/이슈/브랜치) 렌더링. "AI에게 질문" 클릭 → 패널 열림 + 입력창 포커스

### Implementation for User Story 5

- [X] T040 [P] [US5] `apps/ai-wiki-portal-platform-by-claude/src/components/project/ProjectTimeline.tsx` 구현 (진행 단계 타임라인, 현재 단계 강조)
- [X] T041 [P] [US5] `apps/ai-wiki-portal-platform-by-claude/src/components/project/ParticipantList.tsx` 구현 (아바타 + 이름 + 역할 배지 목록)
- [X] T042 [P] [US5] `apps/ai-wiki-portal-platform-by-claude/src/components/project/GithubStatus.tsx` 구현 (최근 커밋 목록, 오픈 이슈 수, 브랜치명 표시)
- [X] T043 [P] [US5] `apps/ai-wiki-portal-platform-by-claude/src/components/project/AiQueryPanel.tsx` 구현 (슬라이드 인 패널, 텍스트 입력창 자동 포커스, Mock 응답 표시, 닫기 버튼)
- [X] T044 [US5] `apps/ai-wiki-portal-platform-by-claude/src/pages/ProjectDetailPage.tsx` 구현 (`useParams`로 `id` 읽기, `mockProjects` + `mockGithubStatus` 조회, 없으면 EmptyState, 4개 섹션 렌더링, "AI에게 질문" 버튼)
- [X] T045 [US5] `apps/ai-wiki-portal-platform-by-claude/tests/pages/ProjectDetailPage.test.tsx` 작성 (프로젝트 정보 렌더링, 없는 ID → EmptyState, AI 패널 열기 확인) `// @req FR-019 FR-020`

**Checkpoint**: `/projects/:id` 화면 독립 동작. 모든 섹션 + AI 패널 전체 흐름 확인

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 접근성, UX 일관성, 빌드 검증

- [X] T046 [P] `apps/ai-wiki-portal-platform-by-claude/src/components/shared/EmptyState.tsx` 접근성 개선 (role, aria-label 추가)
- [X] T047 [P] 모든 페이지 `<title>` 메타 태그 추가 (react-router-dom loader 또는 `document.title` 동적 설정)
- [X] T048 [P] `apps/ai-wiki-portal-platform-by-claude/src/pages/` 전체 키보드 내비게이션 검증 (Tab 순서, Enter/Space 버튼 동작)
- [X] T049 `apps/ai-wiki-portal-platform-by-claude/tests/components/EmptyState.test.tsx` 작성 (렌더링, CTA 버튼 클릭 콜백 확인) `// @req FR-021 FR-022 FR-023 FR-024`
- [X] T050 `pnpm --filter @myorg/ai-wiki-portal build` 실행 후 빌드 오류 없음 확인
- [X] T051 `pnpm --filter @myorg/ai-wiki-portal test` 전체 테스트 통과 + 커버리지 80% 이상 확인

---

## Dependencies & Execution Order

### Phase 의존 관계

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 시작. **모든 사용자 스토리를 블로킹**
- **Phase 3–7 (User Stories)**: Phase 2 완료 후 각 스토리 독립 시작 가능
- **Phase 8 (Polish)**: 모든 원하는 사용자 스토리 완료 후

### User Story 의존 관계

- **US1 (P1, 대시보드)**: Phase 2 완료 후 독립 시작
- **US2 (P2, Wiki)**: Phase 2 완료 후 독립 시작 — US1과 병렬 가능
- **US3 (P2, Blueprint)**: Phase 2 완료 후 독립 시작 — US1/US2와 병렬 가능
- **US4 (P3, Get Started)**: Phase 2 완료 후 독립 시작
- **US5 (P3, 프로젝트 상세)**: US1과 연계 (`mockProjects` 공유)이나 독립 테스트 가능

### Phase 내 순서

- Mock 데이터(T008–T013) → 공유 컴포넌트(T014–T016) → 레이아웃(T017–T020)
- 각 스토리 내: 서브 컴포넌트 → 페이지 컴포넌트 → 테스트

### Parallel Opportunities

```bash
# Phase 2: Mock 데이터 파일 전체 병렬 생성 가능
T008 mockProjects.ts  &  T009 users.ts  &  T010 documents.ts  &  T011 blueprints.ts  &  T012 steps.ts  &  T013 github.ts

# Phase 3: 대시보드 서브 컴포넌트 병렬
T022 ProjectCard.tsx  &  T023 ActivityFeed.tsx

# Phase 4: Wiki 서브 컴포넌트 병렬
T026 DocTree.tsx  &  T027 DocContent.tsx  &  T028 TableOfContents.tsx

# Phase 7: 프로젝트 서브 컴포넌트 병렬
T040 ProjectTimeline.tsx  &  T041 ParticipantList.tsx  &  T042 GithubStatus.tsx  &  T043 AiQueryPanel.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (CRITICAL)
3. Phase 3: US1 대시보드 완료
4. **STOP & VALIDATE**: `/dashboard` 독립 테스트, 빌드 확인
5. 데모 가능 상태

### Incremental Delivery

1. Setup + Foundational → 레이아웃 셸 완성
2. US1 대시보드 추가 → MVP 데모 가능
3. US2 Wiki 추가 → 문서 탐색 가능
4. US3 Blueprint 추가 → Blueprint 생성 가능
5. US4+US5 추가 → 전체 플랫폼 완성

### Parallel Team Strategy

Phase 2 완료 후:
- Developer A: US1 (대시보드) + US5 (프로젝트 상세)
- Developer B: US2 (Wiki 탐색) + US3 (Blueprint)
- Developer C: US4 (Get Started) + Phase 8 (Polish)

---

## Notes

- [P] 태스크 = 다른 파일, 의존 관계 없음 → 병렬 실행 가능
- [Story] 레이블은 사용자 스토리와 태스크의 추적성 제공
- 각 사용자 스토리는 독립적으로 완성·테스트 가능
- `@myorg/ui` 컴포넌트 외 임의 스타일 오버라이드 금지 (Constitution III)
- 테스트 파일의 `// @req FR-XXX` 주석으로 DocGuard 추적성 연결
- 각 Phase Checkpoint 도달 시 `pnpm --filter @myorg/ai-wiki-portal test` 실행 권장
