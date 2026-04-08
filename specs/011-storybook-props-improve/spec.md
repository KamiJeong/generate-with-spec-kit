# Feature Specification: Storybook Stories Props 정의 보강

**Feature Branch**: `011-storybook-props-improve`  
**Created**: 2026-04-08  
**Status**: Draft  
**Input**: User description: "improve stories on storybook - /packages/ui/components 의 대부분의 stories 에 사용되는 component의 props 정의가 미약 - props 정의 보강 및 controls 에서 사용 가능하도록 improve 필요"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Controls 패널에서 props 조작 (Priority: P1)

Storybook을 사용하는 개발자 또는 디자이너가 Controls 패널에서 컴포넌트의 모든 주요 props를 직접 수정하여 다양한 상태를 실시간으로 확인할 수 있다.

**Why this priority**: Controls 패널을 통한 인터랙티브 props 조작은 컴포넌트 문서화의 핵심 가치로, 사용자가 코드를 수정하지 않고도 컴포넌트의 다양한 상태를 탐색할 수 있게 한다.

**Independent Test**: Storybook을 열고 아무 컴포넌트 스토리에서 Controls 탭을 클릭했을 때, variant/size/disabled 등 주요 props가 드롭다운·토글·텍스트 입력으로 표시되며 변경 시 컴포넌트가 실시간 업데이트되면 충족된다.

**Acceptance Scenarios**:

1. **Given** 개발자가 Storybook에서 Button 컴포넌트의 Default 스토리를 열었을 때, **When** Controls 탭을 클릭하면, **Then** variant, size, disabled, children 등 주요 props가 적절한 컨트롤(select, boolean, text)로 표시된다.
2. **Given** Controls 패널에 props가 표시된 상태에서, **When** 사용자가 variant를 'destructive'로 변경하면, **Then** 캔버스의 컴포넌트가 즉시 해당 variant로 업데이트된다.
3. **Given** 사용자가 disabled 토글을 켜면, **Then** 컴포넌트가 비활성화 상태로 렌더링된다.

---

### User Story 2 - ArgTypes를 통한 자동 문서화 (Priority: P2)

Storybook의 Docs 탭에서 각 컴포넌트의 props 테이블이 완전하게 표시되며, 각 prop의 타입·기본값·설명을 확인할 수 있다.

**Why this priority**: 컴포넌트 라이브러리 사용자(개발자)가 코드를 읽지 않고도 props를 파악할 수 있어야 한다. autodocs 태그가 있는 스토리에서 props 테이블이 빈 상태면 문서화 가치가 없다.

**Independent Test**: Docs 탭에서 Props 테이블에 각 prop의 이름, 타입, 기본값이 표시되면 충족된다.

**Acceptance Scenarios**:

1. **Given** autodocs가 활성화된 컴포넌트 스토리에서, **When** Docs 탭을 열면, **Then** 모든 주요 props가 테이블에 표시되고 각 prop에 타입과 기본값이 있다.
2. **Given** argTypes에 description이 정의된 prop에서, **When** Docs 탭을 열면, **Then** 해당 설명이 props 테이블에 표시된다.

---

### User Story 3 - 스토리별 args를 통한 초기 상태 표현 (Priority: P3)

각 named story(예: Destructive, Outline, Ghost)에서 `args`를 통해 초기 props가 설정되어 있어, Controls 패널에서 해당 값이 시작 상태로 표시되고 사용자가 추가 조작할 수 있다.

**Why this priority**: 스토리별 args가 없으면 Controls에 값이 없는 상태로 표시되어 조작의 출발점이 없다. named stories에서 args-based rendering이 되어야 Controls가 의미 있게 동작한다.

**Independent Test**: Destructive 스토리를 열었을 때 Controls에 variant: 'destructive'가 이미 설정되어 있고, 다른 값으로 변경 가능하면 충족된다.

**Acceptance Scenarios**:

1. **Given** 개발자가 Badge의 Destructive 스토리를 열면, **When** Controls 탭을 확인하면, **Then** variant 필드에 'destructive'가 초기값으로 표시된다.
2. **Given** Checkbox 스토리에서 args로 `checked: true`가 설정되면, **When** Controls에서 값을 변경하면, **Then** 캔버스의 체크박스 상태가 반영된다.

---

### Edge Cases

- argTypes만 정의하고 args가 없는 스토리에서 Controls 패널에 빈 값이 표시되는 경우 어떻게 처리하는가?
- `render` 함수가 args를 무시하고 하드코딩된 경우 Controls 변경이 반영되지 않는 문제는 어떻게 처리하는가?
- Radix UI 등 외부 컴포넌트에서 오는 props가 올바르게 타입 추론되지 않는 경우?
- `children` prop이 복잡한 JSX인 경우(여러 자식 컴포넌트) Controls에서 어떻게 처리하는가?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `packages/ui/src/components` 및 `packages/ui/src/stories` 내 모든 컴포넌트 스토리 파일은 meta 객체의 `argTypes`에 해당 컴포넌트의 주요 props를 선언해야 한다.
- **FR-002**: `argTypes`의 각 항목은 컨트롤 타입(`control`)을 명시해야 하며, enum/union 타입은 `select`, boolean은 `boolean`, string은 `text`, number는 `number`로 설정해야 한다.
- **FR-003**: enum/union 타입 props는 `options` 배열에 가능한 모든 값을 나열해야 한다.
- **FR-004**: Controls 연동 목적의 named story(Playground, Destructive, Outline 등 상태 표현 스토리)는 args를 컴포넌트에 전달하는 방식으로 작성되어야 하며, 해당 스토리의 초기 상태를 나타내는 `args`를 포함해야 한다. 단, 여러 variant를 나란히 보여주는 showcase 스토리(Sizes, Variants, IconSizes 등)는 고정 render를 허용한다.
- **FR-005**: `children` prop이 있는 컴포넌트는 단순 컴포넌트의 경우 meta `argTypes`에 `children: { control: 'text' }`를 정의해야 한다. 단, compound 구조(children이 복잡한 JSX이거나 여러 하위 컴포넌트로 구성된 경우) 또는 play 함수 보호가 필요한 스토리에서는 story-level `args`에 `children` 값을 제공하는 것으로 대체할 수 있다.
- **FR-006**: `disabled`, `checked`, `readOnly`, `required` 등 boolean props는 `control: 'boolean'`으로 명시해야 한다.
- **FR-007**: Default 스토리가 고정된 render 함수를 사용하는 경우, Controls와 연동되는 Playground 스토리를 추가하거나 Default 스토리가 args를 받도록 수정해야 한다.
- **FR-008**: 수정 후 기존 play 함수(interaction tests)는 동작이 유지되어야 한다.

### Key Entities

- **Story Meta (argTypes)**: 컴포넌트의 props를 Controls에 노출하기 위한 메타데이터 정의. 각 prop의 컨트롤 타입, 옵션 목록, 기본값, 설명을 포함한다.
- **Story Args**: 개별 스토리의 초기 prop 값 집합. Controls 패널의 시작 상태를 결정한다.
- **Render Function**: 스토리가 캔버스에 렌더링되는 방식. args를 받아 컴포넌트에 전달해야 Controls와 연동된다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `packages/ui/src/components`와 `packages/ui/src/stories`의 모든 컴포넌트 스토리에서 Controls 패널에 최소 1개 이상의 조작 가능한 prop이 표시된다.
- **SC-002**: variant, size, disabled 등 공통 props를 가진 컴포넌트(Button, Badge, Alert 등)의 Controls에서 해당 값을 변경하면 캔버스가 즉시 업데이트된다.
- **SC-003**: autodocs가 활성화된 모든 스토리의 Docs 탭 Props 테이블에 주요 props가 표시된다.
- **SC-004**: 기존에 작성된 모든 play 함수(interaction tests)가 변경 후에도 동일하게 통과한다.
- **SC-005**: 개발자가 새 컴포넌트 상태를 확인하기 위해 Controls 패널만으로 상태 탐색이 가능하다.

## Assumptions

- 대상 컴포넌트는 `packages/ui/src/components` 및 `packages/ui/src/stories`에 있는 모든 스토리 파일이다.
- 레이아웃 스토리(`stories/layouts/`) 및 가이드 스토리(`stories/guide/`)는 이번 범위에서 제외한다. 이들은 페이지 단위 데모이므로 Controls 연동이 주 목적이 아니다.
- 컴포넌트 구현 파일(`.tsx`) 자체는 수정하지 않으며, 스토리 파일만 수정한다.
- 외부 라이브러리(Radix UI) props는 TypeScript 타입 추론에 의존하며, 주요 사용자-facing props만 argTypes에 명시한다.
- Storybook 버전(10.3.3)의 argTypes/controls API를 사용하며, 별도 애드온 추가는 불필요하다.
- `children` prop이 복잡한 JSX인 경우(예: 여러 자식 컴포넌트), Controls에서 text 컨트롤 제공이 어려울 수 있어 해당 경우 description만 추가한다.
