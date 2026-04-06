# Feature Specification: Storybook 품질 고도화

**Feature Branch**: `007-storybook-setup`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "we need to setting storybook. Fix Components (control by props type, show code/copy), Development (responsiveness with viewports), Testing (vitest addon, a11y, visual tests, coverage report)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Props 타입 기반 Controls 자동 매핑 (Priority: P1)

개발자가 Storybook Controls 패널에서 컴포넌트 prop을 조작할 때, 각 prop의 타입에 맞는 컨트롤 위젯이 자동으로 표시된다. 예를 들어 union 타입(`'default' | 'destructive' | 'outline'`)은 select 또는 radio 버튼으로, boolean은 토글로, 숫자는 숫자 입력으로 표시된다. 현재는 union 타입도 텍스트 입력으로 표시되어 유효하지 않은 값 입력이 가능하다.

**Why this priority**: Controls 패널의 잘못된 위젯 타입은 개발자 경험과 AI 에이전트의 컴포넌트 탐색을 모두 저해한다. 정확한 컨트롤 타입은 허용 값의 범위를 명확히 전달한다.

**Independent Test**: Button 스토리 Controls 패널에서 `variant` prop이 드롭다운(select) 또는 라디오 버튼으로 표시되고, 허용된 값만 선택 가능하면 통과.

**Acceptance Scenarios**:

1. **Given** Button 스토리가 열려 있을 때, **When** Controls 패널을 확인하면, **Then** `variant` prop이 `select` 또는 `radio` 위젯으로 표시되고 유효한 옵션 목록만 나타난다.
2. **Given** 임의의 컴포넌트 스토리가 열려 있을 때, **When** Controls 패널을 확인하면, **Then** boolean prop은 토글로, 숫자 prop은 숫자 입력으로, 문자열 enum은 select/radio로 표시된다.
3. **Given** Controls 패널에서 union 타입 prop을 조작할 때, **When** 값을 변경하면, **Then** 허용된 옵션만 선택 가능하고 유효하지 않은 값 입력이 불가능하다.

---

### User Story 2 - 스토리 코드 확인 및 복사 (Priority: P2)

개발자가 컴포넌트 스토리를 볼 때, 해당 스토리의 렌더링 코드(사용 예시 코드)를 즉시 확인하고 클립보드에 복사할 수 있다. 이 기능은 play 함수 실행이나 추가 인터랙션 없이 스토리 자체에서 제공되어야 한다.

**Why this priority**: 개발자와 AI 에이전트가 컴포넌트 사용 방법을 빠르게 파악하고 코드를 재사용하는 데 핵심적이다. play 함수 의존 없이 정적으로 코드를 제공함으로써 모든 스토리에서 일관되게 동작한다.

**Independent Test**: Button Destructive 스토리에서 코드 표시 기능을 활성화 시 JSX 코드가 표시되고, 복사 버튼 클릭 시 클립보드에 저장되면 통과.

**Acceptance Scenarios**:

1. **Given** 임의의 컴포넌트 스토리의 canvas 탭이 열려 있을 때, **When** "Show code" 토글을 활성화하면, **Then** 해당 스토리를 렌더링하는 코드가 canvas 탭 하단에 표시된다.
2. **Given** 코드가 표시된 상태에서, **When** 복사 버튼을 클릭하면, **Then** 코드가 클립보드에 복사되고 시각적 피드백이 표시된다.
3. **Given** canvas 탭에서 Controls 패널의 prop 값을 변경할 때, **When** "Show code" 영역을 확인하면, **Then** 변경된 prop 값이 반영된 코드가 실시간으로 업데이트된다.

---

### User Story 3 - 반응형 뷰포트 확인 (Priority: P3)

개발자가 컴포넌트를 다양한 디바이스 크기(모바일, 태블릿, 데스크탑)에서 빠르게 전환하며 미리볼 수 있다. 뷰포트 변경이 즉각적으로 캔버스에 반영되어 반응형 레이아웃 검증이 가능하다.

**Why this priority**: 반응형 UI 검증은 개발 주기 초기에 이루어져야 비용이 낮다. 빠른 뷰포트 전환으로 디바이스별 렌더링을 즉시 확인할 수 있다.

**Independent Test**: Storybook 툴바에서 Mobile(375px), Tablet(768px), Desktop(1280px)으로 전환 시 캔버스 크기가 즉시 변경되면 통과.

**Acceptance Scenarios**:

1. **Given** 임의의 스토리가 열려 있을 때, **When** 툴바에서 뷰포트를 Mobile로 전환하면, **Then** 캔버스가 375px 너비로 즉시 조정된다.
2. **Given** 뷰포트 전환 후, **When** 컴포넌트를 확인하면, **Then** 해당 너비에서의 실제 렌더링 상태를 볼 수 있다.
3. **Given** Storybook이 처음 열릴 때, **When** 기본 뷰포트 설정을 확인하면, **Then** Desktop(1280px)이 기본값으로 설정되어 있다.

---

### User Story 4 - 컴포넌트 단위 테스트 실행 (Priority: P4)

개발자가 컴포넌트의 단위 테스트를 Storybook 환경에서 직접 실행하고 결과를 확인할 수 있다. 각 컴포넌트는 렌더링, props 동작, 이벤트 핸들링 등을 검증하는 테스트를 가진다.

**Why this priority**: 컴포넌트 단위 테스트는 회귀를 방지하고 코드 변경의 안전성을 보장한다. Storybook 내 통합은 개발 워크플로우를 단순화한다.

**Independent Test**: Button 컴포넌트 단위 테스트를 실행하여 결과(통과/실패)가 확인되면 통과.

**Acceptance Scenarios**:

1. **Given** 컴포넌트 테스트가 작성된 상태에서, **When** 테스트 실행 명령을 사용하면, **Then** 모든 테스트가 실행되고 결과가 표시된다.
2. **Given** 테스트가 실행될 때, **When** 특정 테스트가 실패하면, **Then** 어떤 테스트가 실패했는지와 실패 원인이 명확히 표시된다.
3. **Given** 모든 테스트가 통과할 때, **When** 결과를 확인하면, **Then** 전체 통과 상태와 테스트 수가 표시된다.

---

### User Story 5 - 접근성 테스트 실행 (Priority: P5)

개발자가 컴포넌트 스토리에서 접근성 위반 사항을 자동으로 검사하고, 구체적인 위반 내용과 개선 방법을 확인할 수 있다.

**Why this priority**: 접근성은 규정 준수와 포용적 디자인의 기본이다. 자동화된 검사는 개발 초기에 문제를 발견하여 수정 비용을 줄인다.

**Independent Test**: 임의의 컴포넌트 스토리에서 Accessibility 패널을 열어 위반 항목(또는 "No violations" 메시지)이 표시되면 통과.

**Acceptance Scenarios**:

1. **Given** 컴포넌트 스토리가 열려 있을 때, **When** Accessibility 패널을 확인하면, **Then** WCAG 기준 위반 항목 목록이 표시된다.
2. **Given** 접근성 위반이 발견될 때, **When** 위반 항목을 클릭하면, **Then** 어떤 요소가 위반했는지와 수정 가이드가 표시된다.
3. **Given** 접근성 위반이 없는 컴포넌트를 확인할 때, **When** Accessibility 패널을 보면, **Then** "No violations" 상태가 표시된다.

---

### User Story 6 - 시각적 회귀 테스트 (Priority: P6)

개발자가 컴포넌트의 시각적 스냅샷을 기준선(baseline)과 비교하여 의도하지 않은 시각적 변경 사항을 감지할 수 있다.

**Why this priority**: 시각적 회귀는 코드 리뷰만으로 발견하기 어렵다. 스냅샷 비교는 스타일 변경이 컴포넌트에 미친 영향을 자동으로 검출한다.

**Independent Test**: Button 스토리의 시각적 스냅샷을 생성하고, 의도적인 스타일 변경 후 재실행 시 변경 사항이 감지되면 통과.

**Acceptance Scenarios**:

1. **Given** 컴포넌트 스토리가 있을 때, **When** 시각적 테스트를 처음 실행하면, **Then** 각 스토리의 기준선 스냅샷이 생성된다.
2. **Given** 기준선이 존재하는 상태에서 스타일이 변경될 때, **When** 시각적 테스트를 재실행하면, **Then** 변경된 스토리가 식별되고 차이가 시각적으로 표시된다.
3. **Given** 의도된 스타일 변경일 때, **When** 기준선을 업데이트하면, **Then** 새 스냅샷이 새 기준선으로 저장된다.

---

### User Story 7 - 테스트 커버리지 리포트 (Priority: P7)

개발자가 컴포넌트 테스트의 커버리지 리포트를 생성하여 어떤 코드 경로가 테스트되었는지 파악할 수 있다.

**Why this priority**: 커버리지 리포트는 테스트 공백을 시각화하여 추가 테스트 작성의 우선순위를 결정하는 데 도움을 준다.

**Independent Test**: 테스트 실행 후 각 컴포넌트 파일의 커버리지 비율이 표시된 리포트가 생성되면 통과.

**Acceptance Scenarios**:

1. **Given** 컴포넌트 테스트가 실행된 후, **When** 커버리지 리포트 생성 명령을 실행하면, **Then** 각 컴포넌트 파일의 라인·함수·브랜치 커버리지가 리포트에 표시된다.
2. **Given** 커버리지 리포트가 생성되었을 때, **When** 전체 요약을 확인하면, **Then** 전체 커버리지 비율과 커버되지 않은 코드 위치가 명시된다.

---

### Edge Cases

- Controls 타입 추론이 불가능한 복잡한 prop 타입(중첩 객체, 제네릭 등)은 수동 argType 정의로 보완한다.
- 시각적 테스트 기준선이 없는 상태에서 비교 실행 시 첫 실행을 기준선 생성으로 처리한다.
- 커버리지 측정 대상은 컴포넌트 소스 파일로 한정하며, 스토리 파일 자체는 측정 대상에서 제외할 수 있다.
- 접근성 테스트와 시각적 테스트는 별도 명령으로 실행이 허용된다.
- CI 자동화는 이 기능의 요구사항에서 제외한다 — 로컬 환경에서의 실행만 보장한다.
- 기존 a11y 애드온이 이미 설치되어 있으므로 접근성 테스트 설정은 최소화된다.
- 접근성 위반이 컴포넌트 자체 구현 문제에서 기인하는 경우 컴포넌트 소스 수정도 이 기능 범위에 포함된다.

## Clarifications

### Session 2026-04-06

- Q: 접근성 위반 처리 방침 — 수정 vs 문서화 vs 환경 구축만? → A: 발견된 모든 위반 수정, 이 기능 완료 시 위반 0건 달성 (Option A)
- Q: 기존 play 테스트와 신규 단위 테스트 관계 → A: play 테스트 유지 + 단위 테스트 별도 추가 (Option A)
- Q: Controls union/enum 위젯 선택 기준 — select vs radio vs 옵션 수 기반? → A: 모두 select (일관성 우선) (Option B)
- Q: 코드 표시 위치 — canvas 탭 vs docs 탭 vs 둘 다? → A: canvas 탭 "Show code" 토글 (Option A)
- Q: 시각적 테스트 기준선 저장 방식 — git tracked vs 로컬 전용? → A: 저장소에 커밋, 팀 공유 기준선 (Option A)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 모든 컴포넌트 스토리의 Controls 패널에서 각 prop이 그 타입에 맞는 컨트롤 위젯으로 표시되어야 한다 (union/enum → select, boolean → toggle, number → number input). 일관성을 위해 union/enum 타입은 옵션 수와 무관하게 모두 select 위젯을 사용한다.
- **FR-002**: canvas 탭에서 "Show code" 토글을 통해 해당 스토리의 렌더링 코드를 표시하고 클립보드에 복사하는 기능이 play 함수 없이 제공되어야 한다.
- **FR-003**: canvas 탭에서 Controls 패널의 prop 값을 변경할 때 "Show code" 영역의 코드가 변경된 값을 반영하여 실시간으로 업데이트되어야 한다.
- **FR-004**: Storybook 툴바에서 모바일(375px), 태블릿(768px), 데스크탑(1280px) 뷰포트로 즉시 전환할 수 있어야 한다.
- **FR-005**: 기존 play 테스트를 유지하면서, 컴포넌트 로직(렌더링, props, 이벤트)을 검증하는 단위 테스트를 별도로 추가 작성하고 실행할 수 있어야 한다.
- **FR-006**: 각 컴포넌트 스토리에서 WCAG 기준 접근성 위반 항목을 자동으로 검사하고, 발견된 모든 위반을 이 기능 구현 완료 시점에 수정하여 위반 0건을 달성해야 한다.
- **FR-007**: 컴포넌트 시각적 스냅샷을 생성하고, 기준선 대비 변경 사항을 감지할 수 있어야 한다. 기준선 스냅샷은 저장소에 커밋되어 팀 공유 기준선으로 관리된다.
- **FR-008**: 컴포넌트 테스트 실행 후 라인·함수·브랜치 커버리지 리포트를 생성할 수 있어야 한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 주요 컴포넌트(Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet)의 모든 union/enum prop이 Controls 패널에서 select 위젯으로 표시된다.
- **SC-002**: 모든 컴포넌트 스토리에서 코드 표시 및 복사 기능이 동작하며, Controls 변경 시 코드가 즉시 업데이트된다.
- **SC-003**: 뷰포트 전환(모바일/태블릿/데스크탑)이 1초 이내에 캔버스에 반영된다.
- **SC-004**: 주요 8개 컴포넌트에 대한 단위 테스트가 추가 작성되어 있으며 실행 시 모두 통과한다. 기존 play 테스트도 regression 없이 유지된다.
- **SC-005**: 모든 컴포넌트 스토리에서 접근성 검사가 실행되며, 이 기능 완료 시점에 WCAG 위반 항목 0건을 달성한다.
- **SC-006**: 모든 컴포넌트 스토리의 시각적 기준선 스냅샷이 저장소에 커밋되고, 변경 감지 실행 시 변경된 스토리가 식별된다.
- **SC-007**: 테스트 실행 후 컴포넌트 파일 기준 커버리지 리포트가 생성되며 전체 커버리지 비율이 표시된다.

## Assumptions

- Controls 타입 매핑은 TypeScript 타입 정보를 기반으로 자동 추론하는 것을 기본으로 하며, 추론이 어려운 경우 수동 argType 정의를 추가한다.
- 코드 표시 기능은 Storybook의 기존 docs/canvas 인프라를 활용하며, 별도 커스텀 컴포넌트 없이 구현한다.
- 뷰포트 설정은 feature 006에서 이미 설정된 값(desktop1280, tablet768, mobile375)을 유지·활용한다.
- 접근성 테스트 도구(`@storybook/addon-a11y`)는 feature 006에서 이미 설치되어 있으므로 추가 설치 없이 활용한다.
- 시각적 테스트는 로컬 스냅샷 비교 방식으로 구현하며, 외부 유료 서비스(Chromatic 등)는 사용하지 않는다. 기준선 스냅샷은 저장소에 커밋하여 팀 공유 기준선으로 관리한다.
- CI 자동화는 이 기능의 범위에서 제외한다.
- 테스트 대상 컴포넌트는 `packages/ui/src/` 내 기존 컴포넌트 전체로 한다.
