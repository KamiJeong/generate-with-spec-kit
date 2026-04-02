# 빠른 시작 가이드: @myorg/ui

**Phase 1 출력** | **날짜**: 2026-03-27 | **Branch**: `002-design-system-ui`

---

## 패키지 설치 및 사용

### 1. 워크스페이스 의존성 추가

```bash
# 호스트 패키지에서 추가
pnpm add @myorg/ui --filter your-app
```

### 2. CSS 변수 설정 (최초 1회)

```ts
// app의 진입점 (예: app/layout.tsx 또는 main.tsx)
import '@myorg/ui/styles.css'  // Tailwind utilities + theme mapping
```

### 3. Tailwind v4 설정 (해당 시)

```css
/* 호스트 앱의 CSS 진입점 (예: app/globals.css) */
@import "@myorg/ui/styles.css";
```

> **참고**: `@myorg/ui/styles.css`는 `@myorg/tokens/css`와 Tailwind v4 theme mapping을 함께 포함합니다. Tailwind v4는 `tailwind.config.ts` 없이 CSS import만으로 설정합니다.

---

## 컴포넌트 사용 예시

### 기본 컴포넌트

```tsx
import { Button } from '@myorg/ui'

export function Example() {
  return (
    <div>
      <Button>기본 버튼</Button>
      <Button variant="destructive">삭제</Button>
      <Button variant="outline" size="sm">작은 버튼</Button>
    </div>
  )
}
```

### 다이얼로그 조합

```tsx
import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@myorg/ui'

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>확인</DialogTitle>
        </DialogHeader>
        <p>계속 진행하시겠습니까?</p>
      </DialogContent>
    </Dialog>
  )
}
```

### 데이터 테이블

```tsx
import { DataTable } from '@myorg/ui'
import type { ColumnDef } from '@tanstack/react-table'

type User = { id: string; name: string; email: string }

const columns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
]

export function UserTable({ users }: { users: User[] }) {
  return <DataTable columns={columns} data={users} searchKey="name" />
}
```

---

## Storybook v10 실행

```bash
# 개발 서버 시작
pnpm --filter @myorg/ui storybook

# 정적 번들 생성
pnpm --filter @myorg/ui build-storybook
```

---

## 패키지 빌드

```bash
# 단일 패키지 빌드
pnpm --filter @myorg/ui build

# 전체 워크스페이스 빌드 (tokens → ui 순서 자동 처리)
pnpm build
```

---

## 신규 컴포넌트 추가 (shadcn/ui)

```bash
# packages/ui 디렉터리에서 실행
cd packages/ui
pnpm dlx shadcn@latest add [component-name]

# 예시
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
```

shadcn/ui가 컴포넌트 파일을 `src/components/[name]/index.tsx`에 생성한다.
이후 스토리 파일(`[name].stories.tsx`)을 같은 디렉터리에 추가한다.

---

## 다크 모드 지원

```tsx
// 루트 요소에 dark 클래스 또는 data-theme 속성 적용
<html className="dark">  {/* 다크 모드 */}
  <body>...</body>
</html>

// 또는
<div data-theme="dark">
  {/* 이 컨텍스트 내 모든 @myorg/ui 컴포넌트가 다크 모드 */}
</div>
```
