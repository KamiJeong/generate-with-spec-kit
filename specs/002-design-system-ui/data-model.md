# 데이터 모델: 디자인 시스템 UI

**Phase 1 출력** | **날짜**: 2026-03-27 | **Branch**: `002-design-system-ui`

---

## 핵심 엔티티

### 1. Component (컴포넌트)

UI 시스템의 기본 구성 단위. 각 컴포넌트는 독립적으로 임포트 가능한 React 컴포넌트다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `name` | `string` | 컴포넌트 고유 이름 (예: `Button`, `Dialog`) |
| `category` | `Category` | 컴포넌트 분류 (아래 참고) |
| `variants` | `VariantConfig` | cva로 정의된 변형 구성 |
| `slots` | `string[]` | compound component의 하위 요소 (예: `DialogTrigger`, `DialogContent`) |
| `tokens` | `TokenReference[]` | 참조하는 디자인 토큰 목록 |
| `a11yRole` | `ARIARole` | 컴포넌트의 ARIA 역할 |

**카테고리 분류**:
```ts
type Category =
  | 'layout'        // Aspect Ratio, Card, Resizable, Separator
  | 'input'         // Button, Checkbox, Input, Label, Radio Group, Switch 등
  | 'display'       // Alert, Badge, Empty, Field, Item, Kbd, Spinner
  | 'navigation'    // Breadcrumb, Menubar, Navigation Menu, Pagination, Sidebar, Tabs
  | 'overlay'       // Alert Dialog, Dialog, Drawer, Dropdown Menu, Popover, Sheet, Sonner 등
  | 'complex-input' // Calendar, Combobox, Command, Date Picker
  | 'data'          // Avatar, Carousel, Chart, Data Table, Progress, Table
```

---

### 2. Story (스토리)

컴포넌트의 특정 상태나 설정을 문서화하고 테스트하는 단위.

| 필드 | 타입 | 설명 |
|------|------|------|
| `name` | `string` | 스토리 이름 (예: `Default`, `Primary`, `Disabled`) |
| `component` | `Component` | 연결된 컴포넌트 |
| `args` | `Record<string, unknown>` | 스토리에 전달되는 props |
| `play` | `PlayFunction` | 인터랙션 테스트 함수 (필수) |
| `tags` | `string[]` | 분류 태그 (예: `['autodocs']`) |

**최소 스토리 요구사항**:
- `Default`: 기본 상태 렌더링 + play 함수 포함
- `[Variant]`: 각 주요 변형별 1개 이상 (예: `Primary`, `Secondary`, `Destructive`)

---

### 3. VariantConfig (변형 구성)

`class-variance-authority(cva)`를 사용한 컴포넌트 변형 정의.

```ts
// 예시: Button variants
const buttonVariants = cva(
  // base classes (토큰 참조)
  'inline-flex items-center justify-center rounded-md text-sm font-medium ...',
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground ...',
        outline:     'border border-input bg-background ...',
        secondary:   'bg-secondary text-secondary-foreground ...',
        ghost:       'hover:bg-accent hover:text-accent-foreground',
        link:        'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm:      'h-9 rounded-md px-3',
        lg:      'h-11 rounded-md px-8',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

---

### 4. TokenReference (토큰 참조)

컴포넌트가 참조하는 `@myorg/tokens`의 CSS custom property.

| 필드 | 타입 | 설명 |
|------|------|------|
| `property` | `string` | CSS 변수명 (예: `--color-primary`) |
| `usage` | `'color' \| 'spacing' \| 'radius' \| 'typography' \| 'shadow'` | 사용 맥락 |
| `tailwindClass` | `string` | 대응하는 Tailwind 클래스 (예: `bg-primary`) |

**토큰 매핑 예시**:

| `@myorg/tokens` 변수 | Tailwind 클래스 | 사용 컴포넌트 |
|---------------------|-----------------|--------------|
| `--color-primary` | `bg-primary`, `text-primary` | Button, Badge, Link |
| `--color-destructive` | `bg-destructive`, `text-destructive` | Button, Alert, Toast |
| `--color-muted` | `bg-muted`, `text-muted-foreground` | Card, Input, Label |
| `--radius` | `rounded-md`, `rounded-lg` | 모든 컴포넌트 |
| `--color-border` | `border-border` | Input, Card, Table |

---

### 5. PlayFunction (인터랙션 테스트 함수)

Storybook `play` 함수의 표준 구조.

```ts
// 최소 패턴: 모든 스토리에 적용
type PlayFunction = (context: { canvasElement: HTMLElement }) => Promise<void>

// 표준 테스트 항목
// 1. 렌더링 확인: expect(element).toBeInTheDocument()
// 2. 기본 인터랙션: userEvent.click(), userEvent.type()
// 3. 상태 변경 확인: expect(element).toHaveAttribute(...)
// 4. 접근성 (addon-a11y가 자동 처리, 명시적 추가 가능)
```

---

## 컴포넌트 전체 목록 및 Props 요약

### 낮은 복잡도 (Low Complexity)

| 컴포넌트 | 핵심 Props | 변형(Variants) |
|----------|-----------|----------------|
| Accordion | `type: 'single' \| 'multiple'`, `collapsible` | — |
| Alert | `variant` | `default`, `destructive` |
| Aspect Ratio | `ratio: number` | — |
| Badge | `variant` | `default`, `secondary`, `destructive`, `outline` |
| Button | `variant`, `size`, `asChild` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` |
| Button Group | `orientation` | — |
| Card | — | — (슬롯: Header, Content, Footer) |
| Checkbox | `checked`, `onCheckedChange`, `disabled` | — |
| Empty | `title`, `description`, `icon` | — |
| Field | `label`, `error`, `required` | — |
| Input | `type`, `placeholder`, `disabled` | — |
| Item | `icon`, `label`, `shortcut` | — |
| Kbd | — | — |
| Label | `htmlFor`, `required` | — |
| Radio Group | `value`, `onValueChange` | — |
| Separator | `orientation` | — |
| Spinner | `size` | `sm`, `default`, `lg` |
| Switch | `checked`, `onCheckedChange` | — |
| Native Select | `value`, `onValueChange`, `placeholder` | — |

### 중간 복잡도 (Medium Complexity)

| 컴포넌트 | 핵심 Props | 비고 |
|----------|-----------|------|
| Alert Dialog | `open`, `onOpenChange` | 슬롯: Trigger, Content, Action, Cancel |
| Breadcrumb | `items: BreadcrumbItem[]` | — |
| Collapsible | `open`, `onOpenChange` | — |
| Context Menu | `trigger` | 슬롯: Content, Item, Sub |
| Dialog | `open`, `onOpenChange` | 슬롯: Trigger, Content, Header, Footer |
| Drawer | `open`, `direction` | — |
| Dropdown Menu | `trigger` | 슬롯: Content, Item, Sub |
| Hover Card | `trigger` | — |
| Input Group | `prefix`, `suffix` | — |
| Input OTP | `maxLength`, `value` | — |
| Menubar | `items: MenubarItem[]` | — |
| Navigation Menu | `items: NavItem[]` | — |
| Pagination | `page`, `totalPages`, `onPageChange` | — |
| Popover | `trigger`, `open` | — |
| Progress | `value: number` (0-100) | — |
| Sheet | `open`, `side` | `left`, `right`, `top`, `bottom` |
| Sonner | `position`, `richColors` | Toast provider |
| Tabs | `defaultValue`, `value` | 슬롯: List, Trigger, Content |

### 높은 복잡도 (High Complexity)

| 컴포넌트 | 핵심 Props | 비고 |
|----------|-----------|------|
| Avatar | `src`, `alt`, `fallback` | — |
| Calendar | `mode`, `selected`, `onSelect` | react-day-picker 기반 |
| Carousel | `opts`, `orientation` | embla-carousel 기반 |
| Chart | `config: ChartConfig`, `data` | recharts 기반 |
| Combobox | `options`, `value`, `onValueChange`, `placeholder` | Command + Popover |
| Command | `value`, `onValueChange` | cmdk 기반 |
| Data Table | `columns: ColumnDef[]`, `data` | @tanstack/react-table |
| Date Picker | `value`, `onChange`, `placeholder` | Calendar + Popover |
| Direction | `dir: 'ltr' \| 'rtl'` | 방향 컨텍스트 제공자 |
| Resizable | `direction` | 슬롯: Panel, Handle |
| Sidebar | `defaultOpen`, `collapsible` | Context 기반 |
| Table | — | 슬롯: Header, Body, Row, Cell, Caption |
