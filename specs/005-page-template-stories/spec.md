# Feature Specification: 페이지 템플릿 Storybook 스토리

**Feature Branch**: `005-page-template-stories`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "3–5 page template stories — AI agents learn from examples, need DashboardPage, FormPage, SettingsPage, AuthPage stories"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI 에이전트가 대시보드 레이아웃 패턴을 스토리에서 학습 (Priority: P1)

AI 코딩 에이전트(Claude Code, Codex)가 사이드바 + 헤더 + 데이터 테이블로 구성된 대시보드 레이아웃을 구현해야 할 때, `DashboardPage.stories.tsx`를 참조하여 `@myorg/ui` 컴포넌트들을 어떻게 조합하는지 즉시 이해할 수 있다.

**Why this priority**: 대시보드 레이아웃은 앱 셸(sidebar + header + main content)의 가장 복잡한 조합 패턴이다. AI 에이전트가 이 패턴을 예시 없이 올바르게 구현하기 어렵고, 가장 자주 요청받는 레이아웃이기도 하다.

**Independent Test**: `DashboardPage.stories.tsx`의 Default 스토리를 Storybook에서 열면 사이드바 네비게이션, 헤더, 데이터 테이블이 한 화면에 나타나면 통과.

**Acceptance Scenarios**:

1. **Given** `DashboardPage.stories.tsx`가 있을 때, **When** AI 에이전트가 파일을 읽으면, **Then** 사이드바·헤더·데이터 테이블 각 영역에 어떤 `@myorg/ui` 컴포넌트가 쓰였는지 코드에서 확인할 수 있다.
2. **Given** Storybook이 실행 중일 때, **When** DashboardPage > Default 스토리를 열면, **Then** 실제 앱처럼 보이는 대시보드 레이아웃이 오류 없이 렌더링된다.

---

### User Story 2 - AI 에이전트가 인증 페이지 레이아웃 패턴을 학습 (Priority: P2)

AI 에이전트 및 개발자가 로그인처럼 화면 중앙에 카드 형태로 배치된 인증 페이지 레이아웃을 `AuthPage.stories.tsx`에서 참조할 수 있다.

**Why this priority**: 인증 페이지는 독립적으로 단순하면서도 중앙 정렬·카드 컨테이너 레이아웃 패턴을 명확히 보여준다. 대시보드 다음으로 보편적인 페이지 유형.

**Independent Test**: `AuthPage.stories.tsx` Default 스토리를 열면 화면 중앙에 폼이 담긴 카드가 렌더링되면 통과.

**Acceptance Scenarios**:

1. **Given** `AuthPage.stories.tsx`가 있을 때, **When** Default 스토리를 열면, **Then** 화면 중앙에 이메일·비밀번호 입력 필드와 제출 버튼이 담긴 카드가 렌더링된다.
2. **Given** AI 에이전트가 파일을 읽을 때, **When** 중앙 정렬 레이아웃 구현 방법을 찾으면, **Then** 코드에서 해당 패턴을 확인할 수 있다.

---

### User Story 3 - AI 에이전트가 폼 페이지 패턴(입력·검증·제출)을 학습 (Priority: P3)

AI 에이전트 및 개발자가 여러 입력 필드, 검증 에러 상태, 제출 버튼으로 구성된 폼 페이지 레이아웃을 `FormPage.stories.tsx`에서 참조할 수 있다.

**Why this priority**: 폼 패턴(유효성 검사 메시지 포함)은 구현 시 가장 많은 컴포넌트 조합이 필요하다. validation error 상태를 보여주는 예시가 없으면 AI 에이전트가 에러 표시 방식을 추측하게 된다.

**Independent Test**: `FormPage.stories.tsx`에 Default(정상 상태)와 WithErrors(에러 상태) 두 named export가 존재하면 통과.

**Acceptance Scenarios**:

1. **Given** `FormPage.stories.tsx`가 있을 때, **When** Default 스토리를 열면, **Then** 레이블이 있는 입력 필드들과 제출 버튼이 렌더링된다.
2. **Given** `FormPage.stories.tsx`가 있을 때, **When** WithErrors 스토리를 열면, **Then** 필드 아래 검증 에러 메시지가 표시된 상태가 렌더링된다.
3. **Given** AI 에이전트가 파일을 읽으면, **Then** 어떤 컴포넌트로 필드·레이블·에러 메시지를 조합하는지 코드에서 확인할 수 있다.

---

### User Story 4 - AI 에이전트가 설정 페이지 패턴(탭·카드·토글)을 학습 (Priority: P4)

AI 에이전트 및 개발자가 탭으로 섹션이 나뉘고 각 섹션에 카드와 토글/스위치가 배치된 설정 페이지 레이아웃을 `SettingsPage.stories.tsx`에서 참조할 수 있다.

**Why this priority**: 설정 페이지는 Tabs + Card + Switch 조합 패턴을 보여주는 대표적 사례다. 독립적으로 가치가 있으며 P1~P3 완료 후 추가해도 전체 가치를 제공할 수 있다.

**Independent Test**: `SettingsPage.stories.tsx` Default 스토리를 열면 탭 UI 안에 카드와 토글이 렌더링되면 통과.

**Acceptance Scenarios**:

1. **Given** `SettingsPage.stories.tsx`가 있을 때, **When** Default 스토리를 열면, **Then** 탭 네비게이션, 각 탭 내 카드, 카드 안 스위치/토글이 렌더링된다.
2. **Given** AI 에이전트가 파일을 읽으면, **Then** Tabs + Card + Switch 조합 방법을 코드에서 확인할 수 있다.

---

### Edge Cases

- 스토리 내에서 실제 라우팅이나 API 호출은 없다 — 모든 데이터는 하드코딩된 더미 데이터로 표현한다.
- 기존 `composition.stories.tsx`는 삭제하지 않고 유지한다.
- 각 스토리는 독립적으로 렌더링 가능해야 한다 — 다른 스토리 파일에 의존하지 않는다.
- 더미 텍스트(Lorem ipsum)를 사용하지 않는다 — 실제 사용 사례처럼 보이는 의미 있는 텍스트를 사용한다.
- 새 스토리에 play 테스트를 추가하지 않는다 — 시각적 레이아웃 참조용이므로 불필요.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `DashboardPage.stories.tsx`는 사이드바 네비게이션 영역, 상단 헤더 영역, 데이터 테이블 영역을 모두 포함하는 Default named story export를 MUST 포함해야 한다.
- **FR-002**: `AuthPage.stories.tsx`는 이메일·비밀번호 입력 필드와 제출 버튼이 담긴 카드를 화면 중앙에 배치한 Default named story export를 MUST 포함해야 한다.
- **FR-003**: `FormPage.stories.tsx`는 레이블이 있는 입력 필드들과 제출 버튼을 보여주는 Default named story export를 MUST 포함해야 한다.
- **FR-004**: `FormPage.stories.tsx`는 필드 검증 에러 메시지가 표시된 상태를 보여주는 WithErrors named story export를 MUST 포함해야 한다.
- **FR-005**: `SettingsPage.stories.tsx`는 탭 네비게이션, 카드, 스위치/토글 조합을 보여주는 Default named story export를 MUST 포함해야 한다.
- **FR-006**: 4개 스토리 파일 모두 `@myorg/ui`의 기존 컴포넌트만 사용해야 하며, 외부 데이터 소스나 라우팅 라이브러리에 의존하지 않아야 한다.
- **FR-007**: 4개 스토리 파일 모두 Storybook 내에서 "Pages" 카테고리(title prefix) 아래에 표시되어야 한다.
- **FR-008**: 모든 스토리의 더미 데이터는 실제 사용 사례처럼 보이는 의미 있는 텍스트를 사용해야 한다 (Lorem ipsum 금지).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: AI 에이전트가 4개 페이지 스토리 파일을 읽는 것만으로 각 페이지 레이아웃에서 사용된 `@myorg/ui` 컴포넌트 조합 패턴을 소스 파일 탐색 없이 파악할 수 있다.
- **SC-002**: 4개 신규 스토리 파일이 모두 Storybook에서 오류 없이 렌더링된다 (빌드 및 런타임 에러 0건).
- **SC-003**: 기존 `composition.stories.tsx` 및 다른 스토리의 play 테스트가 단 하나도 깨지지 않는다 (0 regressions).
- **SC-004**: 각 스토리 파일은 해당 페이지 유형의 핵심 컴포넌트 조합 패턴을 1개 파일 내에서 완전히 보여준다 — 다른 파일을 추가로 읽지 않아도 됨.

## Assumptions

- 4개 스토리 파일은 `packages/ui/src/stories/` 디렉토리에 배치한다 (기존 composition.stories.tsx와 동일 위치).
- `@myorg/ui`에서 이미 export되는 컴포넌트만 사용한다 — 새 컴포넌트 개발은 이 기능 범위 밖.
- 스토리는 시각적 레이아웃 참조용이므로 play 테스트를 포함하지 않는다.
- DashboardPage의 데이터 테이블은 `@myorg/ui`의 DataTable 컴포넌트를 사용한다 (이미 존재).
- 반응형(모바일) 레이아웃은 이 기능 범위 밖 — 데스크탑 레이아웃만 구현한다.
- 스토리 내 인터랙션(탭 전환 등)은 Storybook의 기본 동작에 의존하며 추가 설정 없이 동작한다.
