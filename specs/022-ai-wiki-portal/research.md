# Research: AI Wiki Portal Platform Screen

## Decision: 새 앱 위치와 패키지 경계

**Decision**: `apps/ai-wiki-portal-platform-by-codex`에 독립 Vite React app을 생성하고, package name은 기존 sibling app과 충돌하지 않도록 `@myorg/ai-wiki-portal-by-codex`로 둔다.

**Rationale**: 사용자 입력에서 대상 경로가 명시되었고, `pnpm-workspace.yaml`은 `apps/*`를 workspace로 포함한다. 기존 `apps/ai-wiki-portal-platform-by-claude`는 동일 도메인의 참고 구현이므로 구조와 테스트 패턴을 참고하되, Codex 결과물은 독립적으로 검증되어야 한다.

**Alternatives considered**:

- 기존 `by-claude` 앱 수정: 사용자 지정 경로와 다르며 구현 출처가 섞인다.
- `packages/web`에 추가: feature app의 route와 mock data가 독립 앱 성격이므로 부적합하다.

## Decision: UI architecture and layout

**Decision**: DocsHubLayout 계열의 navigation-first 업무용 layout을 기준으로 `SidebarProvider`, `Sidebar`, `SidebarInset`, `Breadcrumb`, `Card`, `Button`, `Badge`, `Progress`, `Tabs`, `Empty`, `Alert`, `Field` 등 기존 `@myorg/ui` 컴포넌트를 우선 사용한다.

**Rationale**: 기능은 Wiki 문서 탐색과 업무 상태 조회가 중심이므로 좌측 탐색, 상단 context, 본문 content panel, 보조 상태 panel의 정보 구조가 적합하다. `/DESIGN.md`는 semantic token과 기존 UI primitive 우선을 요구한다.

**Alternatives considered**:

- 마케팅 landing layout: 실행형 업무 포털 목적과 맞지 않는다.
- 완전 custom layout: 디자인 시스템 일관성과 접근성 검증 비용이 증가한다.

## Decision: Markdown viewer strategy

**Decision**: 초기 구현은 신뢰된 mock Wiki content를 대상으로 제한된 markdown subset을 안전한 React node로 렌더링하는 `MarkdownViewer` 컴포넌트를 계획한다. 지원 범위는 heading, paragraph, ordered/unordered list, link, inline code, fenced code block, emphasis이다.

**Rationale**: 현재 API와 외부 content ingestion이 없고 mock data 기반 화면 검증이 목표다. 새 외부 markdown dependency는 constitution상 검토가 필요하며, 현재 단계에서는 제한된 문서 표현만 요구된다. Confluence 연동 또는 임의 markdown 입력이 들어오는 시점에는 검증된 markdown parser 도입을 별도 결정으로 다룬다.

**Alternatives considered**:

- `dangerouslySetInnerHTML`: XSS 방어와 접근성 구조를 보장하기 어렵다.
- 새 markdown library 즉시 추가: 기능 대비 의존성 검토와 번들 영향이 커지고 현재 mock 화면 검증 범위를 초과한다.

## Decision: Blueprint generation scope

**Decision**: Blueprint는 요구사항 입력 후 mock 결과와 다음 단계 안내를 보여주는 interactive demo flow로 구현한다. 실제 생성 API, 저장, 프로젝트 생성은 제외한다.

**Rationale**: clarification에서 API가 없는 화면 개발 범위를 확정했다. 사용자는 Blueprint의 가치를 체험해야 하지만, 영속화나 backend orchestration은 후속 feature가 다룰 영역이다.

**Alternatives considered**:

- 읽기 중심 샘플만 제공: 핵심 사용자 행동을 검증하기 부족하다.
- 완전한 프로젝트 생성: scope가 backend/auth/storage로 확대된다.

## Decision: Simulated monitoring behavior

**Decision**: 프로젝트 대시보드는 mock data 기반으로 상태, 최근 갱신 시각, 수동 새로고침, sample state change를 보여주는 simulated monitoring으로 구현한다.

**Rationale**: spec clarification에서 live monitoring이 아니라 화면 검증용 simulated monitoring으로 확정했다. 사용자는 진행 상태와 병목을 이해할 수 있고, 구현은 API 없이 deterministic하게 테스트 가능하다.

**Alternatives considered**:

- 정적 상태만 표시: “진행 상태 모니터링” 가치가 약하다.
- live polling/websocket 전제: 현재 API 부재와 scope boundary를 위반한다.

## Decision: Role perspective handling

**Decision**: 비개발자, 프로젝트 이해관계자, 지원 담당자 3개 role perspective를 screen-level state로 제공하고, 추천 문서, 프로젝트 강조 정보, 지원 경로를 mock data로 다르게 표시한다.

**Rationale**: clarification에서 실제 권한 제어 없이 mock 관점 차이를 표현하기로 확정했다. 이는 UX와 테스트에 중요한 차이를 만들지만 authN/Z 구현은 요구하지 않는다.

**Alternatives considered**:

- 단일 공통 화면: stakeholder/support 흐름의 차이를 검증하기 어렵다.
- 실제 권한 제어: 인증, 권한, 보안 요구사항이 생겨 화면 개발 범위를 초과한다.

## Decision: Testing approach

**Decision**: Vitest + Testing Library + user-event로 user-story tests를 먼저 작성한다. 테스트는 문서 탐색/검색, role perspective 변경, Blueprint 입력/결과, simulated monitoring refresh, empty/error state, keyboard-visible labels를 검증한다.

**Rationale**: constitution은 TDD와 80% coverage를 요구한다. 화면 feature이므로 DOM role, label, text, state transition 중심의 테스트가 가장 직접적으로 사용자 가치를 검증한다.

**Alternatives considered**:

- Snapshot 중심 테스트: 사용자 행동과 접근성을 충분히 검증하지 못한다.
- E2E만 사용: 초기 앱 구현 전 feedback loop가 느려지고 단위/통합 경계가 흐려진다.
