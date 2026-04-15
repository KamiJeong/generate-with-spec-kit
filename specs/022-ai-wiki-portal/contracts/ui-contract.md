# UI Contract: AI Wiki Portal Platform Screen

## Scope

이 계약은 `apps/ai-wiki-portal-platform-by-codex`가 사용자에게 노출해야 하는 route, 상태, 상호작용을 정의한다. API contract가 아니라 화면 계약이며, 모든 데이터는 mock data에서 온다.

## Routes

| Route | Purpose | Required States |
|-------|---------|-----------------|
| `/` | dashboard로 redirect | redirect |
| `/dashboard` | 역할별 프로젝트 진행 상태와 최근 활동 | default, role filtered, refreshed, empty |
| `/wiki` | Wiki 문서 탐색과 검색 | default, filtered, no results |
| `/wiki/:docId` | 선택 문서 markdown viewer | valid document, missing document |
| `/blueprint` | 요구사항 입력과 mock Blueprint 결과 | empty input, valid input, generating, generated, missing inputs |
| `/get-started` | 단계별 시작 가이드와 도움 패널 | default, blocked step |
| `/projects/:projectId` | 프로젝트 상세, simulated monitoring, GitHub 상태 | valid project, missing project, unavailable integration |

## Global Layout Contract

- 좌측 navigation은 Wiki category, Blueprint, Dashboard, Get Started, 지원 흐름으로 이동할 수 있어야 한다.
- 현재 route는 navigation과 breadcrumb에서 식별 가능해야 한다.
- 작은 화면에서는 navigation을 열고 닫을 수 있어야 하며 핵심 task를 완료할 수 있어야 한다.
- 화면 copy는 한국어를 기본으로 하고 Blueprint, AI Agent, GitHub, PRD 등 domain term은 유지한다.

## Role Perspective Contract

- 사용자는 `비개발자`, `프로젝트 이해관계자`, `지원 담당자` 중 하나의 mock role perspective를 선택할 수 있어야 한다.
- 선택된 role perspective는 다음 영역에 영향을 준다:
  - 추천 Wiki 문서
  - dashboard project emphasis
  - blocked project에서 보여주는 support path
  - 문서 또는 단계의 next action
- 실제 인증, 권한 제한, 접근 차단은 포함하지 않는다.
- 역할별 데이터가 없으면 common fallback과 안내 메시지를 표시한다.

## Wiki Contract

- 문서 목록은 category, stage, status, summary를 보여야 한다.
- 검색/필터는 keyword, category, stage 기준으로 작동해야 한다.
- 검색 결과가 없으면 검색어 수정, category 탐색, troubleshooting 이동 대안을 제공해야 한다.
- 문서 상세는 heading, paragraph, ordered/unordered list, link, inline code, fenced code block, emphasis를 readable하게 표시해야 한다.
- 문서 상세는 related documents와 next action을 제공해야 한다.
- 존재하지 않는 `docId`는 "문서를 찾을 수 없습니다" empty state와 recovery action을 제공해야 한다.

## Blueprint Contract

- 요구사항 입력은 label, description, validation feedback을 가진 form control이어야 한다.
- 입력 trim 결과가 10자 미만이면 generate action은 비활성화되거나 보강 안내를 제공해야 한다.
- valid input 제출 시 mock generating state를 거쳐 mock Blueprint result를 보여야 한다.
- 결과는 PRD, system design, environment guide, API/data definition, linked execution guide를 구분해 보여야 한다.
- 결과는 저장되었다고 표현하지 않는다. "화면 검증용 mock 결과"임을 업무용 표현으로 명확히 한다.

## Simulated Monitoring Contract

- Dashboard는 project name, owner, current stage, completion percent, execution status, risk state, recent activity, last updated cue, next recommended action을 보여야 한다.
- 수동 새로고침 action은 sample state change 또는 last updated cue 변화를 보여야 한다.
- blocked project는 관련 문서, AI Agent 질의, 담당자 문의 경로를 제공해야 한다.
- GitHub status는 repository registration, latest activity, deployment readiness를 업무용 문장으로 요약해야 한다.
- live polling, websocket, 실제 GitHub API 호출은 포함하지 않는다.

## Feedback and Help Contract

- guide step과 project issue에서 관련 문서, AI Agent question flow, human support request flow로 이동할 수 있어야 한다.
- AI Agent question flow는 source document/project/step context를 잃지 않아야 한다.
- Feedback entry는 source document와 step을 유지해야 하며, empty description은 제출할 수 없어야 한다.

## Accessibility Contract

- 모든 icon-only action은 accessible name을 가져야 한다.
- form label과 helper/error text는 `Field` 등 디자인 시스템 패턴으로 연결되어야 한다.
- keyboard로 navigation, search/filter, role perspective, Blueprint form, refresh, help path에 접근 가능해야 한다.
- focus-visible indicator는 디자인 시스템 focus pattern을 유지해야 한다.
- 상태 badge만으로 의미를 전달하지 않고 텍스트 label을 함께 제공해야 한다.

## Performance Contract

- mock data 기반 검색/필터/role switching/refresh는 사용자 입력 후 200ms 이내에 시각 피드백을 제공해야 한다.
- 초기 route의 주요 content는 일반 desktop browser에서 1.5초 이내에 표시되는 것을 목표로 한다.
- route-level lazy loading을 사용하되 loading state는 명확한 label을 가져야 한다.

## Out of Scope

- Production authentication/authorization
- Persistent Blueprint save or project creation
- Live Confluence synchronization
- Live GitHub API integration
- Backend service, database, or deployment automation
