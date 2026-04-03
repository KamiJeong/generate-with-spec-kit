# Feature Specification: Storybook 품질 개선

**Feature Branch**: `006-fix-storybook-ux`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "storybook improvements — console errors, narrow preview, broken props controls, Biome lint compliance"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 개발자가 스토리 열었을 때 콘솔 에러 없음 (Priority: P1)

개발자나 AI 에이전트가 Storybook에서 컴포넌트 스토리를 열 때, 브라우저 콘솔에 에러가 표시되지 않는다. 현재 일부 스토리가 콘솔 에러를 발생시켜 정상 동작 여부에 대한 신뢰를 낮추고 있다.

**Why this priority**: 콘솔 에러는 구현 신뢰도를 직접적으로 저해한다. AI 에이전트가 스토리를 참조할 때 에러가 있는 스토리는 잘못된 패턴 학습으로 이어진다.

**Independent Test**: 모든 스토리 파일을 Storybook에서 열었을 때 브라우저 콘솔에 에러 메시지 0건이면 통과.

**Acceptance Scenarios**:

1. **Given** Storybook이 실행 중일 때, **When** 임의의 스토리를 열면, **Then** 브라우저 콘솔에 에러(빨간 메시지)가 표시되지 않는다.
2. **Given** 빌드된 Storybook 정적 사이트를 열 때, **When** 스토리 목록을 탐색하면, **Then** 어떤 스토리도 에러 상태로 표시되지 않는다.

---

### User Story 2 - 컴포넌트 미리보기 너비가 충분히 넓음 (Priority: P2)

개발자와 AI 에이전트가 Storybook에서 컴포넌트를 미리볼 때, 캔버스 영역이 컴포넌트를 자연스럽게 표시할 만큼 충분히 넓다. 현재 미리보기 너비가 너무 좁아 컴포넌트가 찌그러지거나 줄바꿈이 발생한다.

**Why this priority**: 좁은 미리보기는 컴포넌트의 실제 외관을 왜곡하여, 개발자가 의도한 디자인과 다르게 인식되게 한다. AI 에이전트도 스크린샷 기반 시각 검증 시 잘못된 레이아웃을 학습할 수 있다.

**Independent Test**: 모든 스토리의 기본 캔버스 너비가 최소 1280px 이상으로 표시되면 통과.

**Acceptance Scenarios**:

1. **Given** Storybook이 실행 중일 때, **When** 스토리를 열면, **Then** 컴포넌트가 찌그러지거나 의도하지 않은 줄바꿈 없이 렌더링된다.
2. **Given** DashboardPage나 SettingsPage 같은 복합 레이아웃 스토리를 열 때, **When** 기본 뷰포트 설정으로 보면, **Then** 레이아웃이 데스크탑 크기에 맞게 표시된다.

---

### User Story 3 - 스토리 Props 컨트롤이 정상 동작 (Priority: P3)

개발자가 Storybook Controls 패널에서 컴포넌트의 주요 props(variant, size 등)를 조작하면, 캔버스의 컴포넌트가 즉시 반응하여 변경된 상태를 보여준다. 현재 두 가지 문제가 모두 존재한다: (A) Controls 패널에 props 항목 자체가 표시되지 않거나, (B) 항목은 보이지만 값을 바꿔도 컴포넌트에 반영되지 않는다.

**Why this priority**: Controls 패널은 개발자가 다양한 상태를 빠르게 탐색하는 핵심 기능이다. 동작하지 않는 컨트롤은 feature 004에서 추가한 variant 스토리들의 가치를 반감시킨다.

**Independent Test**: Button, Badge, Avatar 등 주요 컴포넌트 스토리에서 Controls 패널을 통해 variant 또는 size 값을 변경하면 캔버스가 즉시 업데이트되면 통과.

**Acceptance Scenarios**:

1. **Given** Button 스토리가 열려 있을 때, **When** Controls 패널에서 `variant`를 `destructive`로 변경하면, **Then** 캔버스의 버튼이 빨간색으로 즉시 변경된다.
2. **Given** 임의의 컴포넌트 스토리가 열려 있을 때, **When** Controls 패널을 확인하면, **Then** 해당 컴포넌트의 주요 props(variant, size, disabled 등)가 목록에 표시된다.

---

### User Story 4 - 모든 스토리 파일이 린트 검사를 통과 (Priority: P4)

모든 스토리 파일이 프로젝트에 설정된 린트 규칙을 위반 없이 통과한다. 현재 일부 스토리 파일에 린트 경고나 에러가 존재할 수 있다.

**Why this priority**: 린트 위반은 CI 실패로 이어지고 코드 품질을 저하시킨다. 일관된 코드 스타일은 AI 에이전트가 패턴을 학습하는 데도 중요하다.

**Independent Test**: `pnpm --filter @myorg/ui lint` 명령 실행 시 스토리 파일 관련 에러 0건이면 통과.

**Acceptance Scenarios**:

1. **Given** 모든 스토리 파일이 수정된 후, **When** 린트 명령을 실행하면, **Then** 에러가 0건이다.
2. **Given** 새로 추가된 스토리 파일에서, **When** 린트 검사를 실행하면, **Then** 프로젝트의 코드 스타일 규칙을 모두 준수한다.

---

### Edge Cases

- 일부 스토리 콘솔 에러가 컴포넌트 자체 버그에서 기인하는 경우, 스토리 수정이 아닌 컴포넌트 수정이 필요할 수 있다 — 컴포넌트 소스 변경은 이 기능 범위로 포함한다.
- 뷰포트 너비 설정 변경이 모바일 전용 스토리의 레이아웃을 망가뜨리지 않도록 주의한다.
- 린트 자동 수정(`--fix`)으로 해결되지 않는 규칙 위반은 수동으로 수정한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 모든 스토리 파일을 Storybook에서 열 때 브라우저 콘솔 에러가 0건이어야 한다.
- **FR-002**: Storybook 기본 뷰포트를 최소 1280px 너비로 설정하여 컴포넌트가 데스크탑 크기에 맞게 기본 표시되어야 한다.
- **FR-003**: 주요 컴포넌트(Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet) 스토리의 핵심 props(variant, size 등)가 Controls 패널에 표시되고 변경 시 컴포넌트에 반영되어야 한다.
- **FR-004**: 모든 스토리 파일이 프로젝트 린트 규칙(Biome 기반)을 위반 없이 통과해야 한다.
- **FR-005**: 기존에 정상 동작하던 play 테스트가 이 기능 적용 후에도 깨지지 않아야 한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 모든 스토리 파일 열람 시 브라우저 콘솔 에러 0건 (수정 전 대비 100% 감소).
- **SC-002**: Storybook 기본 캔버스 너비가 최소 1280px — 모든 데스크탑 레이아웃 스토리가 찌그러짐 없이 표시된다.
- **SC-003**: 주요 8개 컴포넌트의 핵심 props가 Controls 패널에서 100% 조작 가능.
- **SC-004**: `pnpm --filter @myorg/ui lint` 실행 시 스토리 파일 관련 에러 0건.
- **SC-005**: 기존 play 테스트 0 regressions.

## Assumptions

- 콘솔 에러의 원인은 스토리 파일의 잘못된 props 전달 또는 필수 provider 누락으로 가정한다. 심각한 컴포넌트 버그가 원인인 경우 컴포넌트 수정도 이 기능 범위에 포함한다.
- "component preview is so tight" 문제는 Storybook 전역 뷰포트 기본값 설정으로 해결 가능하다고 가정한다.
- props 컨트롤 문제는 ArgTypes 설정 또는 args 전달 방식의 문제로 가정한다.
- 린트 도구는 프로젝트에 이미 설정된 Biome를 사용한다 (추가 도구 설치 없음).
- 시각적 검토 피드백은 이 기능의 planning 단계에서 Storybook을 직접 실행하여 수행하며, spec 범위 밖의 추가 개선사항은 별도 기능으로 분리한다.
