# 컴포넌트 API 계약서

**Phase 1 출력** | **날짜**: 2026-03-27 | **Branch**: `002-design-system-ui`

이 문서는 `@myorg/ui` 패키지가 소비자(consumer)에게 노출하는 공개 API 계약을 정의한다.

---

## 1. 패키지 임포트 계약

### 진입점 (Entry Point)

```ts
// 모든 컴포넌트는 패키지 루트에서 named export
import { Button, Dialog, Input } from '@myorg/ui'
import type { ButtonProps, DialogProps } from '@myorg/ui'
```

### 금지 사항

```ts
// 내부 경로 직접 임포트 금지
import { Button } from '@myorg/ui/src/components/button'  // ❌
import { buttonVariants } from '@myorg/ui/dist/...'        // ❌
```

---

## 2. 컴포넌트 Props 계약

### 공통 규칙

모든 컴포넌트는 다음 규칙을 준수한다:

1. **`className` prop 허용**: 소비자가 추가 클래스를 병합 가능 (`cn()` 내부 처리)
2. **`asChild` prop** (해당 시): Radix UI `Slot`으로 렌더링 변경 가능
3. **`ref` 전달**: `React.forwardRef` 사용으로 DOM ref 접근 가능
4. **HTML 속성 상속**: 기본 HTML 요소 속성 모두 허용 (`data-*`, `aria-*` 포함)

### Button API

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'
```

### Dialog API

```ts
// Compound Component 패턴
interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

// 사용 예시
;<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>열기</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>제목</DialogTitle>
      <DialogDescription>설명</DialogDescription>
    </DialogHeader>
    {/* 내용 */}
    <DialogFooter>
      <Button variant="outline">취소</Button>
      <Button>확인</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Data Table API

```ts
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // 선택적 기능
  searchKey?: string          // 검색 가능 컬럼 키
  pageSize?: number           // 페이지당 행 수 (기본값: 10)
}
```

### Chart API

```ts
interface ChartConfig {
  [key: string]: {
    label: string
    color?: string  // CSS custom property 또는 hsl() 값
    icon?: React.ComponentType
  }
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode  // recharts 컴포넌트
  className?: string
}
```

---

## 3. 디자인 토큰 계약

### 토큰 사용 규칙

컴포넌트는 다음 Tailwind utility classes만을 사용하여 스타일을 정의한다. 이 클래스들은 `@myorg/tokens`의 CSS 변수에 매핑된다.

| 사용 목적 | 허용된 Tailwind 클래스 | 매핑되는 CSS 변수 |
|----------|----------------------|-----------------|
| 배경색 | `bg-background`, `bg-primary`, `bg-secondary`, `bg-muted`, `bg-accent`, `bg-destructive` | `--background`, `--primary`, ... |
| 전경색 | `text-foreground`, `text-primary-foreground`, `text-muted-foreground` | `--foreground`, ... |
| 테두리 | `border-border`, `border-input` | `--border`, `--input` |
| 반지름 | `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full` | `--radius` |
| 링 | `ring-ring` | `--ring` |
| 그림자 | `shadow-sm`, `shadow-md`, `shadow-lg` | tokens에서 정의 |

**금지**: `bg-[#3b82f6]`, `text-[rgb(59,130,246)]` 등 하드코딩된 색상값

---

## 4. Storybook 스토리 계약

### 파일 위치 규칙

```text
packages/ui/src/components/
└── [component-name]/
    ├── index.tsx                         # 컴포넌트 구현
    └── [component-name].stories.tsx     # 스토리 파일
```

### 스토리 파일 표준 구조

```ts
// packages/ui/src/components/button/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, within, userEvent } from '@storybook/test'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',    // 카테고리/이름 형식
  component: Button,
  tags: ['autodocs'],            // 자동 문서화 활성화
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 필수: Default 스토리 (play 함수 포함)
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: '버튼' })
    // 렌더링 확인
    await expect(button).toBeInTheDocument()
    // 인터랙션 확인
    await userEvent.click(button)
  },
}

// 권장: 각 변형별 스토리
export const Destructive: Story = {
  args: { children: '삭제', variant: 'destructive' },
  play: async ({ canvasElement }) => { /* ... */ },
}
```

### 스토리 제목(title) 네이밍 규칙

| 카테고리 | title 패턴 | 예시 |
|----------|-----------|------|
| 기본 입력 | `Components/[Name]` | `Components/Button` |
| 오버레이 | `Components/[Name]` | `Components/Dialog` |
| 내비게이션 | `Components/[Name]` | `Components/Sidebar` |
| 복합 컴포넌트 | `Components/[Name]` | `Components/DataTable` |

---

## 5. 접근성 계약

모든 컴포넌트는 다음 접근성 기준을 충족해야 하며, `@storybook/addon-a11y`로 자동 검증된다:

| 기준 | 요구사항 |
|------|---------|
| 키보드 내비게이션 | 모든 인터랙티브 요소는 Tab 키로 접근 가능 |
| ARIA 역할 | 시맨틱 HTML 또는 적절한 `role` 속성 |
| 포커스 관리 | Dialog/Sheet/Drawer 열릴 때 포커스 이동, 닫힐 때 트리거로 복귀 |
| 색상 대비 | 최소 4.5:1 (일반 텍스트), 3:1 (큰 텍스트) |
| 스크린 리더 | `aria-label`, `aria-describedby` 적절히 사용 |
