# 빠른 시작: Variant 스토리 작성 가이드

**Feature**: 004-story-variant-coverage | **Date**: 2026-04-03

## 스토리 추가 패턴

### args 패턴 (단순 variant)

```typescript
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};
```

### render 패턴 (복합 컴포넌트)

```typescript
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong.</AlertDescription>
    </Alert>
  ),
};
```

### 비교 뷰 패턴 (Variants 스토리)

```typescript
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
```

## 규칙

- `Default` 스토리와 meta `render` 함수는 변경하지 않는다.
- 새 스토리는 `Default` export 아래에 추가한다.
- play 테스트는 새 스토리에 추가하지 않는다 (시각 검증용이므로 불필요).
- 스토리 이름은 variant 값과 동일하게 PascalCase로 작성한다 (`variant="destructive"` → `export const Destructive`).

## 검증 방법

```bash
# Storybook 빌드 후 확인
pnpm --filter @myorg/ui build-storybook

# 또는 개발 서버에서 확인
pnpm --filter @myorg/ui storybook
```

기존 play 테스트 회귀 여부는 Storybook test runner로 확인:
```bash
pnpm --filter @myorg/ui test-storybook
```

## 향후 신규 컴포넌트 추가 시

1. 컴포넌트 소스에서 `variant`, `size` prop의 가능한 값 목록 확인
2. 각 값에 대한 named export 추가 (위 패턴 참조)
3. 비교 뷰(`Variants` 또는 `Sizes`) 스토리 추가
4. `pnpm --filter @myorg/ui build-storybook`으로 빌드 오류 없는지 확인
