# 리서치: 스토리북 Variant 커버리지

**Feature**: 004-story-variant-coverage | **Date**: 2026-04-03

## 결정 사항 (Decisions)

### 1. 스토리 패턴: args vs render

**결정**: 단순 단일 컴포넌트 variant는 `args` 패턴, 복합 조합이나 레이아웃이 필요한 경우 `render` 패턴 사용.

**근거**:
- `args` 패턴은 Storybook Controls와 자동으로 연동되어 AI 에이전트가 prop 인터페이스를 더 명확히 인식
- `render` 패턴은 여러 컴포넌트가 조합되어야 하는 경우(Sheet, Tabs, Avatar+Badge 등)에 필수

**컴포넌트별 패턴 결정**:
| 컴포넌트 | 패턴 | 이유 |
|---------|------|------|
| Button (개별 variant) | `args` | 단일 컴포넌트, variant/children props만 필요 |
| Button (Sizes, IconSizes, Variants) | `render` | 여러 인스턴스를 나란히 렌더링 필요 |
| Badge (개별 variant) | `args` | 단일 컴포넌트 |
| Badge (Variants) | `render` | 여러 인스턴스 나란히 |
| Alert (Destructive) | `render` | AlertTitle, AlertDescription 서브컴포넌트 필요 |
| Spinner (Small, Large) | `args` | size prop만 필요 |
| Tabs (Line, Vertical) | `render` | TabsList, TabsTrigger, TabsContent 조합 필요 |
| Switch (Small) | `render` | Label 조합 필요 |
| Avatar (Small, Large) | `args` | size prop만 필요 |
| Avatar (WithBadge, Group) | `render` | 서브컴포넌트 조합 필요 |
| Sheet (Left, Top, Bottom) | `render` | Button trigger + SheetContent 조합 필요 |

**검토한 대안**: 모든 스토리를 `render`로 통일 — 기각, 단순한 variant는 `args`가 더 Storybook 관용적

---

### 2. 기존 Default 스토리 play 테스트 보호 전략

**결정**: `Default` export를 그대로 유지하고, 새 stories를 그 아래에 추가한다. meta `render` 함수는 변경하지 않는다.

**근거**: 8개 파일 모두 `Default`에 play 테스트가 있으며, 일부(button, badge, switch, sheet)는 DOM 인터랙션을 테스트한다. meta `render`를 변경하면 play 테스트의 `getByRole` 쿼리가 깨질 수 있다.

**검토한 대안**: meta `render`를 모든 variant 비교 뷰로 교체 — 기각, play 테스트 regression 위험

---

### 3. Button Icon 스토리의 아이콘 선택

**결정**: `lucide-react`의 `Plus` 아이콘 사용 (이미 프로젝트에 존재).

**근거**: `icon` size들은 텍스트 없이 아이콘만 렌더링해야 의미가 있다. `Plus`는 가장 범용적인 아이콘이며 `lucide-react`에서 이미 사용 중.

---

### 4. Badge: meta render와 개별 named export 중복 처리

**결정**: meta `render`는 유지하되 (`Default` play 테스트가 의존), 개별 named export를 `args` 패턴으로 추가한다.

**근거**: `badge.stories.tsx`의 `Default` play 테스트는 meta `render`의 결과(여러 variant가 동시에 있음)를 기반으로 `getByText('Default')`와 `getByText('Secondary')`를 검사한다. meta `render`를 변경하면 play 테스트가 깨진다.

---

### 5. Sheet 방향별 스토리의 play 테스트 여부

**결정**: Left, Top, Bottom 방향 스토리에는 play 테스트를 추가하지 않는다.

**근거**: 각 방향 스토리는 시각적 확인용이므로 play 테스트가 없어도 된다. play 테스트는 DOM overlay 접근이 필요해 복잡하며, Default 스토리가 이미 open/close 인터랙션을 검증하고 있다.
