# Feature Specification: AI Wiki Portal Platform Screen

**Feature Branch**: `022-ai-wiki-portal`  
**Created**: 2026-04-15  
**Status**: Draft  
**Input**: User description: "LLM Wiki 기반 AI 개발 가이드 플랫폼 화면 개발. 비개발자가 Blueprint를 기반으로 프로젝트 설계를 생성하고, 개발 환경 구성 가이드를 따라가며, AI Agent와 GitHub 연동을 통해 개발 및 배포 과정을 진행하고, 플랫폼에서 진행 상태를 모니터링할 수 있는 실행 중심 Wiki 포털 화면을 만든다."

## Clarifications

### Session 2026-04-15

- Q: What is the intended scope of Blueprint creation in this screen feature? → A: Interactive demo flow with requirement input, mock Blueprint result, and next-step guidance.
- Q: What is the intended scope of project progress monitoring in this screen feature? → A: Simulated monitoring with mock data, recent update cues, manual refresh, and sample state changes.
- Q: How should user roles and visibility be represented in this screen feature? → A: Show mock role perspectives and state differences for non-developer users, project stakeholders, and support collaborators.
- Retrospective update: The portal entry experience may be implemented as a dashboard-first app shell with persistent navigation and primary actions, rather than a separate landing page, as long as the purpose, work areas, and next actions are immediately visible.
- Retrospective update: Automated UI tests can provide evidence for route behavior, state visibility, and recovery paths, but success criteria that include user comprehension percentages require a separate usability or guided review record.
- Retrospective update: Lint, test coverage, and production build tasks are complete only when their package scripts pass in a restored dependency environment or equivalent CI evidence is linked.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore the AI Development Wiki (Priority: P1)

비개발자는 포털에 진입해 자신의 관점에서 AI 개발 가이드의 전체 구조를 이해하고, 필요한 문서를 빠르게 찾아 현재 단계에서 해야 할 일을 확인한다.

**Why this priority**: 플랫폼의 핵심 가치는 문서가 실행 흐름을 안내하는 것이다. 사용자가 문서를 찾고 읽을 수 없으면 Blueprint 생성, 환경 구성, AI Agent 활용, 프로젝트 진행 확인이 모두 막힌다.

**Independent Test**: 사용자가 포털 화면에서 가이드 카테고리를 탐색하고 특정 문서를 열어 단계별 실행 내용을 확인할 수 있으면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** 포털에 진입한 사용자가 있다, **When** 주요 가이드 영역을 확인한다, **Then** Get Started, Blueprint, 개발 환경 구성, AI Agent, GitHub/배포, 문제 해결 문서 영역을 구분해 볼 수 있다.
2. **Given** 사용자가 특정 문서를 선택했다, **When** 문서 상세 영역이 열린다, **Then** 제목, 요약, 단계별 본문, 관련 문서, 다음 행동이 읽기 쉬운 형태로 표시된다.
3. **Given** 사용자가 키워드나 카테고리로 문서를 찾고 있다, **When** 검색 또는 필터를 적용한다, **Then** 관련 문서 목록만 남고 결과가 없을 때는 대체 탐색 방법을 안내한다.
4. **Given** 사용자가 역할 관점을 변경한다, **When** 비개발자, 프로젝트 이해관계자, 지원 담당자 중 하나를 선택한다, **Then** 문서 추천과 주요 다음 행동이 해당 관점에 맞게 조정되어 보인다.

---

### User Story 2 - Start a Project from a Blueprint (Priority: P2)

비개발자는 요구사항을 Blueprint 흐름에 맞게 입력하고, mock Blueprint 결과와 이후 개발 단계의 기준이 되는 다음 행동을 확인한다.

**Why this priority**: Blueprint는 기능 요구사항, 아키텍처 방향, 개발 환경, API/데이터 구조 정의의 출발점이며 플랫폼의 자동화된 개발 프로세스를 대표한다.

**Independent Test**: 사용자가 Blueprint 시작 화면에서 요구사항을 입력하고 mock 결과, 산출물 요약, 다음 단계 연결을 검토할 수 있으면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** 신규 프로젝트를 시작하려는 사용자가 있다, **When** Blueprint 시작 영역을 확인한다, **Then** 요구사항 입력, mock 설계 결과 확인, 가이드 연결, 진행 추적까지의 흐름이 순서대로 제시된다.
2. **Given** 사용자가 요구사항을 입력했다, **When** mock Blueprint 결과를 확인한다, **Then** PRD, 시스템 설계, 환경 구성 가이드, API/데이터 구조 정의가 각각 어떤 역할을 하는지 알 수 있다.
3. **Given** Blueprint가 아직 준비되지 않은 프로젝트가 있다, **When** 사용자가 프로젝트 상태를 확인한다, **Then** 다음에 작성해야 할 입력과 누락된 설계 영역이 명확히 표시된다.

---

### User Story 3 - Monitor Project Progress and Collaboration (Priority: P3)

프로젝트 이해관계자와 지원 담당자는 mock 데이터로 표현된 진행 중인 프로젝트, 담당자, 단계별 상태, 문제 발생 영역, 최근 갱신 정보를 각자의 관점에서 확인하고 필요한 지원 요청으로 이동한다.

**Why this priority**: 조직 내 공유와 병목 파악은 플랫폼의 확장 가치를 만든다. 다만 문서 탐색과 Blueprint 흐름이 먼저 제공되어야 진행 상태 정보가 의미를 가진다.

**Independent Test**: 사용자가 프로젝트 대시보드에서 프로젝트별 단계, 담당자, 상태, 이슈, 최근 활동, 갱신 시각, 수동 새로고침 흐름을 확인하고 도움 요청 흐름으로 이동할 수 있으면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** 여러 프로젝트가 진행 중인 mock 상태가 있다, **When** 사용자가 대시보드를 연다, **Then** 프로젝트명, 진행 단계, 완료율, 담당자, 최근 활동, 갱신 시각, 위험 상태가 한눈에 보인다.
2. **Given** 특정 프로젝트에 문제가 발생했다, **When** 사용자가 해당 프로젝트의 문제 상태를 선택한다, **Then** 관련 문서, AI Agent 질의, 담당자 문의로 이어지는 선택지가 제공된다.
3. **Given** 사용자가 GitHub 연동 상태를 확인한다, **When** 프로젝트 상세를 본다, **Then** 저장소 등록 여부, 배포 단계, 최근 변경 상태가 업무용 용어로 요약된다.
4. **Given** 지원 담당자 관점이 선택되어 있다, **When** 사용자가 막힘 상태의 프로젝트를 확인한다, **Then** 문의 맥락, 관련 문서, 최근 활동이 우선 표시된다.

---

### User Story 4 - Close the Document-Execution-Feedback Loop (Priority: P4)

사용자는 문서를 따라 실행한 결과를 기록하고, 실패 또는 개선 의견을 남겨 다음 문서 개선과 AI 대응 흐름으로 연결한다.

**Why this priority**: 플랫폼은 단순 문서 뷰어가 아니라 문서, 실행, 피드백, 개선의 순환 구조를 지향한다. 이 흐름은 초기 화면에서도 방향성이 보일 필요가 있다.

**Independent Test**: 사용자가 문서 단계별 완료 상태와 피드백 상태를 확인하고, 실패 상황에서 도움 요청 또는 개선 제안으로 이동할 수 있으면 독립적으로 검증된다.

**Acceptance Scenarios**:

1. **Given** 사용자가 가이드를 따라 작업 중이다, **When** 단계별 체크 상태를 확인한다, **Then** 완료, 진행 중, 막힘, 대기 상태가 구분되어 표시된다.
2. **Given** 사용자가 단계 수행 중 오류를 만났다, **When** 문제 해결 영역을 연다, **Then** 관련 오류 문서, AI Agent 질의, 사람에게 문의하는 경로가 제공된다.
3. **Given** 사용자가 문서 개선 의견을 남기려 한다, **When** 피드백 진입점을 선택한다, **Then** 어떤 문서와 어떤 단계에 대한 의견인지 유지된 상태로 의견 작성 흐름이 시작된다.

### Edge Cases

- 문서 목록이 비어 있거나 동기화되지 않은 경우 사용자는 빈 화면 대신 현재 사용할 수 있는 시작 가이드와 관리자 문의 안내를 본다.
- 검색어와 일치하는 문서가 없을 경우 사용자는 검색어 수정, 카테고리 탐색, 문제 해결 문서로 이동하는 대안을 본다.
- 프로젝트 상태 데이터가 일부 누락된 경우 누락 영역은 "확인 필요"로 표시되고 나머지 확인 가능한 정보와 마지막 갱신 시각은 계속 제공된다.
- GitHub 또는 지식 저장소 연동 상태를 확인할 수 없는 경우 사용자는 연동 실패를 업무용 메시지로 이해하고 다음 행동을 선택할 수 있다.
- 긴 문서, 긴 프로젝트명, 여러 담당자가 있는 프로젝트도 주요 정보가 잘리지 않고 탐색 가능한 형태로 표시된다.
- 사용자가 작은 화면에서 접근해도 핵심 문서 탐색, 프로젝트 상태 확인, 도움 요청 흐름을 완료할 수 있다.
- 역할별 mock 관점 데이터가 없는 경우 공통 추천과 공통 프로젝트 상태를 표시하고, 역할별 상세 정보가 준비되지 않았음을 안내한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present an AI Wiki Portal entry experience that may be a dashboard-first app shell or a dedicated landing screen, and it MUST explain the platform purpose, current work areas, and primary next actions for non-developer users.
- **FR-016**: System MUST represent mock role perspectives for non-developer users, project stakeholders, and support collaborators without requiring real access-control enforcement.
- **FR-002**: System MUST organize wiki content into clear business categories including getting started, Blueprint creation, development environment setup, AI Agent usage, GitHub/project management, deployment, and troubleshooting.
- **FR-003**: Users MUST be able to search and filter wiki documents by keyword, category, and work stage.
- **FR-004**: System MUST display selected wiki content with readable headings, summaries, step-by-step instructions, links to related documents, and next-action guidance.
- **FR-005**: System MUST show markdown-formatted wiki content in a readable document view that preserves headings, lists, links, code-like command examples, and emphasis used by the source content.
- **FR-006**: System MUST provide an interactive Blueprint demo flow where users enter requirements and review mock outputs for PRD, system design, environment guidance, API/data definition, and project execution steps.
- **FR-007**: System MUST provide representative project dashboard data for screen validation when live integrations are not yet available.
- **FR-008**: System MUST show simulated project monitoring by project, stage, owner, completion status, recent activity, last updated cue, manual refresh action, risk or blocked state, and next recommended action.
- **FR-009**: System MUST show GitHub-related project management and deployment status in business-readable terms, including repository registration, latest activity, and deployment readiness.
- **FR-010**: System MUST provide help paths from guide steps and project issues to relevant documents, AI Agent question flow, and human support request flow.
- **FR-011**: System MUST provide a feedback entry point from wiki content so users can report unclear instructions, failed steps, or improvement suggestions.
- **FR-012**: System MUST distinguish document lifecycle and execution states such as draft, available, updated, in progress, blocked, completed, and needs review.
- **FR-013**: System MUST communicate empty, loading, unavailable, and error states in plain language with a clear recovery or next action.
- **FR-014**: System MUST support keyboard-friendly navigation and readable focus order across document navigation, search/filter controls, project lists, and action entries.
- **FR-015**: System MUST keep screen copy understandable for non-developers while preserving necessary domain terms such as Blueprint, AI Agent, GitHub, deployment, and PRD.

### Key Entities *(include if feature involves data)*

- **Wiki Document**: A guide or reference page used by the portal. Key attributes include title, category, summary, body content, related documents, last updated status, and next recommended action.
- **User Role Perspective**: A screen-level view mode for tailoring mock content and actions. Key attributes include role name, primary goals, recommended documents, visible project emphasis, and preferred support path.
- **Blueprint**: A structured project planning artifact represented in the screen demo from user requirements. Key attributes include project goal, target users, entered requirement summary, mock generated outputs, readiness status, missing inputs, and linked execution guide.
- **Project**: A user or team initiative being developed through the platform. Key attributes include name, owner, current stage, completion status, risk state, recent activity, last updated cue, sample state change, and linked repository/deployment summary.
- **Execution Step**: A unit of work in a guide or project flow. Key attributes include title, required action, status, expected result, linked help content, and feedback availability.
- **AI Assistance Request**: A support flow initiated from a document or issue. Key attributes include source document or project, question context, issue type, status, and recommended next action.
- **Feedback Item**: A user comment or report about guide quality or execution outcome. Key attributes include source content, affected step, feedback type, description, and review status.
- **Integration Status**: A business-readable summary of external system readiness. Key attributes include connected service name, availability, last checked state, and user-facing recovery guidance.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Automated screen review MUST show the portal entry shell exposes the starting guide and primary next action; during usability review, 90% of first-time non-developer users can identify the correct starting guide and next action within 2 minutes.
- **SC-002**: Automated UI tests MUST verify browsing, keyword search, category filter, and no-results recovery; in guided review, users can locate a target wiki document in under 3 actions for at least 8 of 10 common guide lookup tasks.
- **SC-003**: Automated UI tests MUST verify the Blueprint demo input, disabled/generating/generated states, output sections, and linked next guide; in guided review, users can understand the next required project execution step with at least 85% accuracy.
- **SC-004**: Automated UI tests MUST verify blocked project visibility, owner, last update context, and next recommended action; in stakeholder review, users can identify those details within 60 seconds from the dashboard view.
- **SC-005**: Automated state inventory review MUST confirm at least 95% of displayed document and project states provide an explicit next action or recovery path.
- **SC-006**: Automated copy review MUST verify that essential technical terms are preserved consistently; in non-developer review, 90% of reviewed screen text is rated understandable without requiring developer explanation.
- **SC-007**: Automated or manual responsive review MUST cover desktop and small-screen layouts for core tasks, with no critical navigation or readability blockers recorded.
- **SC-008**: Automated UI tests MUST verify role perspective changes for recommended documents, project emphasis, and support paths; in guided review, users can correctly identify those changes in at least 80% of tasks.

## Assumptions

- The initial delivery is a screen experience for the AI Wiki Portal platform, not a fully connected production backend.
- Representative sample content and project data are acceptable for validating the screen flow until live integrations are available, including simulated monitoring states and refresh behavior.
- Confluence remains the intended central knowledge source, but this specification focuses on what users see and do in the portal.
- GitHub integration status is represented as user-facing project management and deployment information rather than low-level technical details.
- Target users include non-developer employees, project stakeholders, and support/developer collaborators.
- Role differences are represented as screen-level mock perspectives for validation and do not imply production authentication or authorization behavior in this feature.
- Existing product design guidance and accessible interaction patterns are the baseline for visual and interaction decisions in later phases.
- Korean business users are the primary audience, while essential technical terms may remain in English when they are common platform vocabulary.
