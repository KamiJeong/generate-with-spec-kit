# Feature Specification: Storybook 디자인 토큰 스토리 개선

**Feature Branch**: `009-storybook-token-stories`  
**Created**: 2026-04-06  
**Status**: Draft  
**Input**: User description: "improve storybook stories about design token - typography (with font-family) - color - spacing - any guide stories - components are missing stories about their all props - need more layout options - need folder by category (ex: Components, Page, Typography)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 디자인 토큰 가이드 스토리 탐색 (Priority: P1)

디자이너 또는 개발자가 Storybook을 열고 Typography, Color, Spacing, Motion 카테고리의 가이드 스토리를 통해 시스템에서 사용 가능한 모든 디자인 토큰을 한눈에 확인할 수 있다.

**Why this priority**: 디자인 토큰 가이드 스토리는 디자인 시스템의 핵심 기반이며, 팀 전체가 토큰을 일관되게 참조하기 위한 단일 진실의 원천(single source of truth) 역할을 한다. 이 스토리가 없으면 컴포넌트 스토리의 개선도 의미가 줄어든다.

**Independent Test**: Storybook에서 "Typography", "Color", "Spacing", "Motion" 카테고리를 열고 각 가이드 스토리가 모든 토큰 값을 시각적으로 표시하는지 확인함으로써 독립 검증 가능.

**Acceptance Scenarios**:

1. **Given** Storybook이 실행된 상태에서, **When** 사용자가 사이드바에서 "Typography" 카테고리를 펼치면, **Then** Font Family, Font Size, Font Weight 토큰을 보여주는 가이드 스토리가 나타난다.
2. **Given** Storybook이 실행된 상태에서, **When** 사용자가 "Color" 카테고리의 가이드 스토리를 열면, **Then** primitive 색상 팔레트(brand, gray, destructive 등) 전체가 색상 견본과 토큰 이름과 함께 표시된다.
3. **Given** Storybook이 실행된 상태에서, **When** 사용자가 "Spacing" 카테고리의 가이드 스토리를 열면, **Then** 주요 spacing 스케일 값(0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32)이 시각적 막대와 수치로 함께 표시된다.

---

### User Story 2 - 컴포넌트 props 전체 커버리지 스토리 탐색 (Priority: P2)

개발자가 대상 컴포넌트(Alert, Avatar, Switch, Spinner, Tabs)의 주요 variant, size, orientation, state props를 Storybook에서 스토리별로 확인하고, Controls 패널을 통해 각 prop을 인터랙티브하게 테스트할 수 있다.

**Why this priority**: 현재 컴포넌트 스토리에 props 커버리지가 누락되어 있어, AI 에이전트와 개발자 모두 컴포넌트의 전체 사용 방법을 Storybook만으로 파악하기 어렵다.

**Independent Test**: Alert, Avatar, Switch, Spinner, Tabs 스토리 파일을 열어 각 파일에 주요 props를 보여주는 named story와 `AllVariants`, `AllSizes`, `AllSizesAndStates`, `AllOrientations` 같은 gallery story가 존재하는지 확인.

**Acceptance Scenarios**:

1. **Given** 대상 컴포넌트 스토리 파일(Alert, Avatar, Switch, Spinner, Tabs)이 있을 때, **When** 사용자가 해당 컴포넌트의 스토리 목록을 보면, **Then** 각 파일에 주요 variant, size, orientation, state 값을 보여주는 named story와 gallery story가 함께 존재한다.
2. **Given** 특정 대상 컴포넌트 스토리를 열었을 때, **When** Controls 패널을 확인하면, **Then** 해당 컴포넌트의 주요 props가 Controls에 노출되어 인터랙티브하게 변경 가능하다.
3. **Given** disabled, orientation, size 등 상태 차이를 가진 대상 컴포넌트의 경우, **When** 스토리 목록을 보면, **Then** 각 주요 상태를 빠르게 비교할 수 있는 story가 별도로 존재한다.

---

### User Story 3 - 카테고리 폴더 구조로 스토리 탐색 (Priority: P3)

Storybook 사이드바가 "Components", "Page", "Typography", "Color", "Spacing" 등 의미있는 카테고리 폴더로 정리되어 있어, 원하는 스토리를 빠르게 찾을 수 있다.

**Why this priority**: 폴더 구조는 탐색성을 높이며 AI 에이전트가 컴포넌트를 카테고리별로 발견하는 데 도움을 준다. 기능적 가치보다는 탐색성 개선이므로 P3.

**Independent Test**: Storybook 사이드바에서 루트 레벨에 "Components", "Page", "Typography" 폴더가 보이고, 각 폴더 내에 관련 스토리가 있는지 확인.

**Acceptance Scenarios**:

1. **Given** Storybook 사이드바가 표시된 상태에서, **When** 루트 레벨을 확인하면, **Then** Components, Page, Typography, Color, Spacing 카테고리가 폴더로 그룹화되어 있다.
2. **Given** 카테고리 폴더가 있을 때, **When** "Components" 폴더를 열면, **Then** Button, Badge, Card, Input 등 UI 컴포넌트 스토리가 그 안에 있다.
3. **Given** 카테고리 폴더가 있을 때, **When** "Page" 폴더를 열면, **Then** Auth, Dashboard, Form, Settings 등 페이지 레벨 스토리가 그 안에 있다.

---

### User Story 4 - 레이아웃 옵션 확장 (Priority: P4)

개발자가 스토리의 레이아웃 옵션(centered, fullscreen, padded 등)을 컴포넌트 성격에 맞게 선택할 수 있으며, 페이지 스토리는 fullscreen으로, 컴포넌트 스토리는 centered 또는 padded로 표시된다.

**Why this priority**: 레이아웃 옵션은 스토리의 시각적 프레젠테이션 품질을 높이며, 특히 페이지 레벨 스토리에서 실제 사용 환경을 정확히 반영하기 위해 필요하다.

**Independent Test**: Dashboard 페이지 스토리를 열어 viewport 전체를 사용하는지 확인하고, Button 스토리를 열어 중앙 정렬 레이아웃으로 표시되는지 확인.

**Acceptance Scenarios**:

1. **Given** 페이지 레벨 스토리(AuthPage, DashboardPage 등)가 있을 때, **When** 스토리를 열면, **Then** 스토리가 fullscreen 레이아웃으로 렌더링되어 실제 페이지 비율을 보여준다.
2. **Given** 개별 컴포넌트 스토리가 있을 때, **When** 스토리를 열면, **Then** centered 또는 padded 레이아웃으로 렌더링되어 컴포넌트에 집중할 수 있다.

---

### Edge Cases

- 다크 모드 색상 토큰이 있을 경우, 컬러 가이드 스토리는 동일 화면 내 라이트/다크 섹션을 나란히(side-by-side) 배치하여 두 모드를 동시에 비교할 수 있어야 한다.
- 컴포넌트에 선택적(optional) props가 많을 경우, Controls에서 기본값이 명확히 표시되어야 한다.
- 폰트가 로드되지 않은 환경에서도 Typography 스토리가 fallback 폰트로 정상 렌더링되어야 한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Storybook은 사이드바에 Components, Page, Typography, Color, Spacing, Motion 최소 6개의 최상위 카테고리 폴더를 제공해야 한다.
- **FR-002**: Typography 가이드 스토리는 font-family(Pretendard, Noto Sans KR, JetBrains Mono), font-weight, font-size 토큰을 시각적으로 표시해야 한다.
- **FR-003**: Color 가이드 스토리는 brand, gray, destructive 등 모든 primitive 색상 팔레트를 색상 견본, 토큰 이름, hex 값과 함께 표시해야 한다.
- **FR-004**: Spacing 가이드 스토리는 Tailwind preset에 정의된 spacing 스케일의 주요 단계(0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32)를 시각적 크기 표현(막대 또는 박스)과 수치 값으로 함께 표시해야 한다. 별도 spacing 토큰 파일은 추가하지 않는다.
- **FR-004b**: Motion 가이드 스토리는 `motion/index.ts`에 정의된 duration, easing 등 모든 애니메이션 토큰을 시각적 애니메이션 예시와 함께 표시해야 한다.
- **FR-005**: 이번 iteration의 대상 컴포넌트(Alert, Avatar, Switch, Spinner, Tabs) 스토리 파일은 각 컴포넌트의 주요 variant, size, orientation, state 값에 대한 named story export와 함께, 모든 값을 한 화면에 보여주는 gallery story(`AllVariants`, `AllSizes`, `AllSizesAndStates`, `AllOrientations`)를 추가로 포함해야 한다.
- **FR-006**: 페이지 레벨 스토리(Page 카테고리)는 `layout: 'fullscreen'` 옵션으로 설정되어야 한다.
- **FR-007**: 대상 컴포넌트 스토리의 Controls 패널에는 해당 컴포넌트의 모든 주요 props(variant, size, orientation, disabled 등)가 노출되어야 한다.
- **FR-008**: 다크 모드 semantic 토큰이 존재하는 경우, Color 가이드 스토리는 동일 화면 내에 라이트/다크 두 섹션을 나란히(side-by-side) 배치하여 두 모드의 색상 값을 동시에 비교할 수 있어야 한다.

### Key Entities

- **가이드 스토리(Guide Story)**: 특정 디자인 토큰 카테고리(Typography, Color, Spacing, Motion) 전체를 시각적으로 문서화하는 전용 스토리 파일
- **컴포넌트 스토리(Component Story)**: 단일 UI 컴포넌트의 모든 props 조합을 커버하는 스토리 파일
- **페이지 스토리(Page Story)**: 실제 페이지 레이아웃을 전체 화면으로 표현하는 스토리 파일
- **카테고리 폴더(Category Folder)**: Storybook 사이드바에서 스토리를 그룹화하는 논리적 폴더 구조

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Storybook 사이드바에 최소 6개의 최상위 카테고리 폴더(Components, Page, Typography, Color, Spacing, Motion)가 존재한다.
- **SC-002**: Typography, Color, Spacing, Motion 각각에 대한 전용 가이드 스토리가 존재하며, Typography/Color/Motion은 관련 토큰 값을, Spacing은 정의된 주요 scale 값을 시각적으로 표시한다.
- **SC-003**: 대상 컴포넌트(Alert, Avatar, Switch, Spinner, Tabs) 100%가 주요 props 비교용 named story와 gallery story를 보유한다.
- **SC-004**: 페이지 레벨 스토리 100%가 fullscreen 레이아웃으로 설정된다.
- **SC-005**: 개발자 또는 디자이너가 원하는 토큰이나 컴포넌트 스토리를 Storybook 사이드바에서 30초 이내에 찾을 수 있다.

## Clarifications

### Session 2026-04-06

- Q: 컴포넌트 props 커버리지 업데이트 대상 범위는? → A: 이번 iteration 대상은 Alert, Avatar, Switch, Spinner, Tabs 5개 스토리 파일
- Q: 가이드 스토리 카테고리 범위는? → A: Typography, Color, Spacing, Motion 4개 (motion/index.ts 토큰 포함)
- Q: 컴포넌트 props 커버리지 스토리 패턴은? → A: 값별 named story + AllVariants 갤러리 story 1개 병행
- Q: Color 가이드에서 다크 모드 색상 표현 방식은? → A: 동일 스토리 내 라이트/다크 섹션 나란히(side-by-side) 표시
- Q: Spacing 가이드 스토리의 토큰 출처는? → A: Tailwind preset의 spacing 스케일 시각화 (토큰 패키지에 spacing 전용 파일 추가 없음)

## Assumptions

- 기존 디자인 토큰 패키지(`@myorg/tokens`)의 색상, 타이포그래피, motion 토큰 구조는 이미 완성된 상태이며 이 기능에서 변경하지 않는다.
- Spacing 토큰은 별도 파일로 관리하지 않으며, Tailwind preset의 spacing 스케일을 가이드 스토리의 출처로 사용한다.
- Storybook 카테고리 폴더는 각 스토리 파일의 `title` 메타데이터 필드(예: `title: 'Components/Button'`)를 통해 구현한다.
- 모바일 반응형 레이아웃 스토리는 이 기능의 범위 밖이다.
- 스토리 자동화 테스트(play function 기반 interaction test)는 이 기능에 포함하지 않으며, 시각적 문서화에 집중한다.
- 새 가이드 스토리는 `packages/ui/src/stories/` 디렉터리 아래 `guide/` 서브폴더에 생성한다.
