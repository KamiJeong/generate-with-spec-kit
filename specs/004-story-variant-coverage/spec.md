# Feature Specification: 스토리북 전체 Variant 커버리지

**Feature Branch**: `004-story-variant-coverage`  
**Created**: 2026-04-03  
**Status**: Draft  
**Input**: User description: "variant coverage in stories — stories need all variants as named exports for AI agent component discovery"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI 에이전트가 스토리만 보고 모든 Variant를 발견 (Priority: P1)

AI 코딩 에이전트(Claude Code, Codex)가 UI 작업을 받았을 때, 컴포넌트 소스 코드를 직접 읽지 않고 Storybook 스토리 파일의 named export 목록만 봐도 해당 컴포넌트가 지원하는 모든 variant와 size를 알 수 있다.

**Why this priority**: 현재 `button.stories.tsx`는 `Default` 하나만 export한다. AI 에이전트가 `variant="destructive"`나 `size="sm"`의 존재를 모르면 항상 default만 사용하게 되어 디자인 시스템이 유명무실해진다. 가장 자주 쓰이는 Button, Badge, Alert부터 해결해야 즉시 가치를 낸다.

**Independent Test**: Button, Badge, Alert 스토리 파일의 named export 목록만 보고 모든 variant를 열거할 수 있으면 통과.

**Acceptance Scenarios**:

1. **Given** `button.stories.tsx`가 있을 때, **When** AI 에이전트가 named export 목록을 조회하면, **Then** `Default`, `Destructive`, `Outline`, `Secondary`, `Ghost`, `Link` 및 size 변형 스토리가 모두 나타난다.
2. **Given** `badge.stories.tsx`가 있을 때, **When** AI 에이전트가 named export 목록을 조회하면, **Then** 6개 variant(`default`, `secondary`, `destructive`, `outline`, `ghost`, `link`) 각각에 대한 스토리가 존재한다.
3. **Given** `alert.stories.tsx`가 있을 때, **When** AI 에이전트가 named export 목록을 조회하면, **Then** `Default`와 `Destructive` 두 variant 스토리가 모두 존재한다.

---

### User Story 2 - Medium-Priority 컴포넌트 Variant 발견 (Priority: P2)

AI 에이전트 및 개발자가 Spinner, Tabs, Switch, Avatar, Sheet 컴포넌트의 모든 size/variant/방향 옵션을 스토리 파일 named export 목록에서 즉시 확인할 수 있다.

**Why this priority**: P1 컴포넌트들만큼 빈번하지는 않지만, 이 컴포넌트들도 variant 시스템을 가지고 있어 default만 사용되면 디자인 의도가 전달되지 않는다.

**Independent Test**: Spinner, Tabs, Switch, Avatar, Sheet 스토리 파일 각각의 named export 목록만으로 지원 size/variant/방향을 모두 열거할 수 있으면 통과.

**Acceptance Scenarios**:

1. **Given** `spinner.stories.tsx`가 있을 때, **When** named export 목록을 보면, **Then** `Small`, `Default`, `Large` 3개의 size 스토리가 모두 존재한다.
2. **Given** `tabs.stories.tsx`가 있을 때, **When** named export 목록을 보면, **Then** `Default`(default variant), `Line`(line variant), `Vertical`(vertical orientation) 스토리가 존재한다.
3. **Given** `sheet.stories.tsx`가 있을 때, **When** named export 목록을 보면, **Then** `Default`(right), `Left`, `Top`, `Bottom` 4개 방향 스토리가 모두 존재한다.

---

### User Story 3 - 개발자가 Storybook에서 전체 Variant를 시각적으로 비교 (Priority: P3)

개발자가 Storybook UI에서 각 컴포넌트의 variant들을 한눈에 비교할 수 있는 "All Variants" 통합 스토리를 볼 수 있다.

**Why this priority**: 각 variant를 개별 스토리로 분리하면 AI 에이전트 발견성은 해결되지만, 개발자가 시각적으로 비교하려면 추가 클릭이 필요하다. 통합 뷰는 편의 기능이므로 P1/P2 이후에 추가한다.

**Independent Test**: Button, Badge 컴포넌트에 `Variants` named export가 존재하고 Storybook에서 모든 variant를 한 화면에 렌더링하면 통과.

**Acceptance Scenarios**:

1. **Given** `button.stories.tsx`가 있을 때, **When** `Variants` 스토리를 열면, **Then** 6개 variant가 동일한 화면에 나란히 렌더링된다.
2. **Given** `badge.stories.tsx`가 있을 때, **When** `Variants` 스토리를 열면, **Then** 6개 variant가 동일한 화면에 나란히 렌더링된다.

---

### Edge Cases

- 기존에 이미 variant 스토리가 있는 경우 중복 추가하지 않는다.
- `Default` 스토리는 삭제하지 않고 유지한다 — 기존 Storybook play 테스트가 `Default`를 참조할 수 있다.
- Icon 전용 size(`icon`, `icon-xs`, `icon-sm`, `icon-lg`)는 텍스트 없이 아이콘 슬롯으로 렌더링해야 한다 — 빈 버튼으로 표시되면 안 된다.
- Storybook play 테스트가 있는 컴포넌트(Carousel, DatePicker 등)는 새 스토리 추가 시 기존 테스트가 깨지지 않도록 주의한다.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `button.stories.tsx`는 6개 variant 각각(`Default`, `Destructive`, `Outline`, `Secondary`, `Ghost`, `Link`)에 대한 named story export를 MUST 포함해야 한다.
- **FR-002**: `button.stories.tsx`는 주요 size 변형을 보여주는 `Sizes` named story export를 MUST 포함해야 한다 (xs, sm, default, lg 시각 비교).
- **FR-003**: `button.stories.tsx`는 icon size 전용 스토리(`IconSizes`)를 MUST 포함해야 하며, 각 icon size에 실제 아이콘이 렌더링되어야 한다.
- **FR-004**: `badge.stories.tsx`는 6개 variant 각각에 대한 named story export를 MUST 포함해야 한다.
- **FR-005**: `alert.stories.tsx`는 `Default`와 `Destructive` variant 각각에 대한 named story export를 MUST 포함해야 한다.
- **FR-006**: `spinner.stories.tsx`는 `Small`, `Default`, `Large` size 각각에 대한 named story export를 MUST 포함해야 한다.
- **FR-007**: `tabs.stories.tsx`는 `Default`(default variant), `Line`(line variant), `Vertical`(vertical orientation) named story export를 MUST 포함해야 한다.
- **FR-008**: `switch.stories.tsx`는 default size와 small size 각각에 대한 named story export를 MUST 포함해야 한다.
- **FR-009**: `avatar.stories.tsx`는 `Small`, `Default`, `Large` size 각각에 대한 named story export와 `Group` 스토리를 MUST 포함해야 한다.
- **FR-010**: `sheet.stories.tsx`는 `Left`, `Top`, `Bottom` 3개 방향 각각에 대한 named story export를 MUST 포함해야 하며, 기존 `Default` 스토리가 right side를 커버하는 것으로 간주한다.
- **FR-011**: 모든 새 named story export는 기존 `Default` 스토리를 삭제하거나 이름을 변경하지 않고 추가되어야 한다.
- **FR-012**: Button, Badge에는 모든 variant를 한 화면에 보여주는 `Variants` named story export를 MUST 추가해야 한다.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: AI 에이전트가 Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet 스토리 파일의 named export 목록만으로, 각 컴포넌트가 지원하는 모든 variant/size를 컴포넌트 소스 없이 100% 열거할 수 있다.
- **SC-002**: 이 기능 적용 후 8개 대상 컴포넌트의 named story export 수가 기존 대비 최소 2배 이상 증가한다.
- **SC-003**: 기존에 존재하던 Storybook play 테스트가 단 하나도 깨지지 않는다 (0 regressions).
- **SC-004**: 새로 추가된 모든 스토리는 Storybook에서 오류 없이 렌더링된다.

## Assumptions

- 스코프는 variant/size 시스템이 있는 컴포넌트로 제한한다: Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet (8개).
- Input, Card, Progress, Label 등 variant 시스템이 없는 컴포넌트는 이 기능의 범위 밖이다.
- 각 variant 스토리는 `args` 패턴 또는 `render` 함수 중 해당 컴포넌트에서 이미 사용 중인 방식을 따른다.
- `Default` 스토리는 현재 상태를 유지하며 삭제하지 않는다.
- Storybook play 테스트는 `button.stories.tsx`에 현재 없으므로 Button variant 추가 시 회귀 위험이 없다.
- Icon size 스토리(`icon`, `icon-xs`, `icon-sm`, `icon-lg`)에는 `lucide-react`의 `Plus` 아이콘을 사용한다.
