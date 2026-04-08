# 퀵스타트: Storybook Stories Props 정의 보강

**생성일**: 2026-04-08

## 구현 목표

Storybook Controls 패널에서 컴포넌트의 주요 props를 인터랙티브하게 조작할 수 있도록 스토리 파일을 개선한다.

## 적용 패턴

### 패턴 A: argTypes 추가 + Default render를 args 연동으로 변경

play 함수가 없는 단순 스토리에 적용한다.

```typescript
// 변경 전
const meta = {
  component: MyComponent,
  tags: ['autodocs'],
  render: () => <MyComponent />,
} satisfies Meta<typeof MyComponent>;

// 변경 후
const meta = {
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: '컴포넌트 크기',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    size: 'default',
    disabled: false,
  },
} satisfies Meta<typeof MyComponent>;

export const Default: Story = {
  render: (args) => <MyComponent {...args} />,
};
```

### 패턴 B: argTypes 추가 + Playground 스토리 추가 (play 함수 있는 경우)

Default 스토리에 play 함수가 있어 render 변경이 불가한 경우 적용한다. Default 스토리는 건드리지 않고 Playground 스토리를 추가한다.

```typescript
const meta = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline'] },
    disabled: { control: 'boolean' },
  },
  render: () => (
    // 기존 하드코딩 render 유지
    <div className="flex gap-3">
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
} satisfies Meta<typeof Button>;

// Default 스토리 유지 (play 함수 포함)
export const Default: Story = {
  play: async ({ canvasElement }) => { /* 기존 play 함수 */ },
};

// Playground 스토리 추가
export const Playground: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'default',
    children: 'Button',
    disabled: false,
  },
};
```

### 패턴 C: argTypes만 추가 (named stories가 이미 args 기반인 경우)

badge.stories.tsx, switch.stories.tsx처럼 이미 named stories가 args 기반인 경우. argTypes 설명(description)과 defaultValue만 보강한다.

## 주요 규칙

1. **스토리 파일만 수정** — 컴포넌트 구현 파일(`.tsx`) 변경 금지
2. **기존 play 함수 유지** — FR-008 준수
3. **layouts/, guide/, 페이지 스토리 제외** — 수정 범위 외
4. **compound 컴포넌트(Card, dialog 등) 제외** — Controls 연동 의미 없음
5. **children이 복잡한 JSX인 경우** — description만 추가하고 control 생략

## Storybook 빌드 확인

```bash
pnpm --filter @myorg/ui build-storybook
```

## Storybook 테스트 실행

```bash
# Storybook interaction tests (play 함수)
pnpm --filter @myorg/ui test
```
