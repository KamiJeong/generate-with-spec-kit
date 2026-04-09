# Feature Specification: Storybook MCP 서버 적용

**Feature Branch**: `013-mcp-storybook-short`  
**Created**: 2026-04-09  
**Status**: Draft

## Clarifications

### Session 2026-04-09

- Q: MCP 도구셋 활성화 범위? → A: 3개 도구셋 모두 활성화 (Development + Documentation + Testing)
- Q: AI 에이전트 설정 문서 적용 대상? → A: CLAUDE.md에만 MCP 사용 지침 추가

**Input**: User description: "add mcp to storybook - refer 'https://storybook.js.org/docs/ai/mcp/overview' - storybook has mcp server - apply mcp server to storybook - i will test manually after implement"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI 에이전트가 컴포넌트 문서를 조회한다 (Priority: P1)

개발자가 AI 에이전트(Claude, Copilot 등)를 통해 디자인 시스템의 컴포넌트 목록과 상세 문서(props, 사용 예시, 스토리)를 조회할 수 있다. 에이전트는 MCP 프로토콜을 통해 Storybook에 연결되어 컴포넌트 정보를 정확하게 가져온다.

**Why this priority**: MCP 서버의 핵심 가치는 AI 에이전트가 컴포넌트를 정확히 이해하는 것이다. 문서 조회 없이는 스토리 생성이나 테스트 실행도 불가능하므로 최우선 기능이다.

**Independent Test**: Storybook이 실행된 상태에서 AI 에이전트가 MCP 도구를 사용해 컴포넌트 목록과 특정 컴포넌트의 상세 문서를 조회할 수 있으면 성공

**Acceptance Scenarios**:

1. **Given** Storybook 개발 서버가 실행 중일 때, **When** AI 에이전트가 전체 컴포넌트 목록을 요청하면, **Then** 프로젝트에 등록된 모든 컴포넌트와 문서 항목이 반환된다
2. **Given** Storybook 개발 서버가 실행 중일 때, **When** AI 에이전트가 특정 컴포넌트의 문서를 요청하면, **Then** 해당 컴포넌트의 props, 스토리 목록, 사용 예시가 반환된다
3. **Given** Storybook 개발 서버가 실행 중일 때, **When** AI 에이전트가 특정 스토리의 코드를 요청하면, **Then** 해당 스토리의 전체 소스 코드와 관련 문서가 반환된다

---

### User Story 2 - AI 에이전트가 스토리를 작성하고 테스트한다 (Priority: P2)

개발자가 AI 에이전트에게 새 컴포넌트 스토리 작성을 요청하면, 에이전트가 MCP 도구를 활용해 스토리 작성 가이드를 참조하고, 작성한 스토리의 테스트를 실행하여 결과를 확인할 수 있다.

**Why this priority**: 문서 조회(P1)를 기반으로 에이전트가 실제 스토리를 생성하고 검증까지 수행하는 자가 치유(self-healing) 개발 루프의 핵심 기능이다.

**Independent Test**: AI 에이전트가 스토리 작성 가이드를 조회하고, 스토리 테스트를 실행하여 통과/실패 결과를 받을 수 있으면 성공

**Acceptance Scenarios**:

1. **Given** Storybook 개발 서버가 실행 중일 때, **When** AI 에이전트가 스토리 작성 가이드를 요청하면, **Then** 효과적인 스토리 및 인터랙션 테스트 작성 지침이 반환된다
2. **Given** 작성된 스토리가 존재할 때, **When** AI 에이전트가 해당 스토리의 테스트 실행을 요청하면, **Then** 테스트 통과/실패 결과와 접근성 이슈가 포함된 결과가 반환된다

---

### User Story 3 - AI 에이전트가 스토리 미리보기를 확인한다 (Priority: P3)

개발자가 AI 에이전트를 통해 렌더링된 스토리의 미리보기를 확인할 수 있다. 에이전트가 스토리의 시각적 결과물을 채팅 내에서 보여주거나 Storybook 링크를 제공한다.

**Why this priority**: 스토리 미리보기는 시각적 확인을 위한 보조 기능으로, 핵심 문서 조회와 테스트 기능 이후에 구현해도 충분하다.

**Independent Test**: AI 에이전트가 특정 스토리의 미리보기를 요청하여 렌더링 결과 또는 Storybook 링크를 받을 수 있으면 성공

**Acceptance Scenarios**:

1. **Given** Storybook 개발 서버가 실행 중일 때, **When** AI 에이전트가 특정 스토리의 미리보기를 요청하면, **Then** 렌더링된 스토리 이미지 또는 Storybook 내 해당 스토리 링크가 반환된다

---

### Edge Cases

- Storybook 개발 서버가 실행되지 않은 상태에서 MCP 도구를 호출하면 어떻게 되는가?
- 스토리가 없는 컴포넌트의 문서를 요청하면 어떻게 되는가?
- MCP 서버 엔드포인트에 접근할 수 없는 경우(포트 충돌 등) 에이전트에게 적절한 오류 메시지가 전달되는가?
- 여러 AI 에이전트가 동시에 MCP 서버에 접근하면 어떻게 되는가?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Storybook 개발 서버 실행 시 MCP 서버 엔드포인트가 자동으로 함께 활성화되어야 한다
- **FR-002**: MCP 서버는 프로젝트의 모든 컴포넌트 목록과 문서 항목을 제공해야 한다
- **FR-003**: MCP 서버는 개별 컴포넌트의 상세 문서(props, 스토리, 사용 예시)를 제공해야 한다
- **FR-004**: MCP 서버는 특정 스토리의 소스 코드와 관련 문서를 제공해야 한다
- **FR-005**: MCP 서버는 스토리 작성에 필요한 가이드라인을 제공해야 한다
- **FR-006**: MCP 서버는 지정된 스토리의 테스트를 실행하고 결과(통과/실패, 접근성 이슈)를 반환해야 한다
- **FR-007**: MCP 서버는 스토리의 렌더링 미리보기를 제공해야 한다
- **FR-008**: MCP 프로토콜을 지원하는 모든 AI 에이전트(Claude, Copilot, Gemini 등)가 서버에 연결 가능해야 한다
- **FR-009**: 프로젝트의 CLAUDE.md에 MCP 서버 사용 지침이 포함되어야 한다
- **FR-010**: MCP addon은 Development, Documentation, Testing 3개 도구셋을 모두 활성화해야 한다

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Storybook 개발 서버 시작 후 MCP 엔드포인트가 응답 가능 상태가 된다
- **SC-002**: AI 에이전트가 프로젝트 내 등록된 컴포넌트의 100%를 MCP 도구를 통해 조회할 수 있다
- **SC-003**: AI 에이전트가 컴포넌트 문서 조회부터 스토리 테스트 실행까지의 전체 흐름을 5분 이내에 완료할 수 있다
- **SC-004**: AI 에이전트가 MCP 도구를 통해 조회한 props 정보가 실제 컴포넌트 인터페이스와 100% 일치한다

## Assumptions

- Storybook 개발 서버가 로컬에서 정상적으로 실행 가능한 상태이다
- 프로젝트의 기존 Storybook 설정과 스토리가 유지된다
- MCP 서버는 로컬 개발 환경에서만 사용되며 프로덕션 배포는 범위 밖이다
- 수동 테스트를 통해 검증하며, 자동화된 MCP 통합 테스트는 이번 범위에 포함하지 않는다
- MCP 프로토콜의 프리뷰(preview) 단계 제약사항을 수용한다
