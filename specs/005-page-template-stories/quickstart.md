# 빠른 시작: 페이지 템플릿 스토리 작성 가이드

**Feature**: 005-page-template-stories | **Date**: 2026-04-03

## 페이지 스토리 패턴

### 기본 구조

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentA, ComponentB } from '../components/component-a';

const meta = {
  title: 'Pages/PageName',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-svh">
      {/* 페이지 레이아웃 */}
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

### 핵심 규칙

- `title`은 `'Pages/...'` prefix 사용 — FR-007 (Pages 카테고리)
- `parameters: { layout: 'fullscreen' }` — 전체 화면 레이아웃 페이지에 적용
- play 테스트는 추가하지 않는다 (시각적 참조용)
- 더미 데이터는 의미 있는 실제 텍스트 사용 (Lorem ipsum 금지)
- 기존 `composition.stories.tsx`는 수정하지 않는다

---

## DashboardPage 패턴

```typescript
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset,
  SidebarTrigger } from '../components/sidebar';
import { DataTable, type ColumnDef } from '../components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { Separator } from '../components/separator';

// 더미 데이터
const users = [
  { id: '1', name: 'Alice Kim', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Lee', email: 'bob@example.com', role: 'Editor' },
];

// 사이드바 + SidebarInset(main content) 구조
render: () => (
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>...</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header className="flex h-14 items-center gap-2 px-4 border-b">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <span className="font-semibold">Dashboard</span>
      </header>
      <main className="p-4">
        <Card>
          <CardHeader><CardTitle>Users</CardTitle></CardHeader>
          <CardContent>
            <DataTable columns={columns} data={users} searchKey="name" pageSize={5} />
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  </SidebarProvider>
)
```

---

## AuthPage 패턴

```typescript
// 화면 중앙 카드 레이아웃
render: () => (
  <div className="min-h-svh flex items-center justify-center bg-muted/40">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Field label="이메일">
          <Input type="email" placeholder="name@example.com" />
        </Field>
        <Field label="비밀번호">
          <Input type="password" placeholder="••••••••" />
        </Field>
      </CardContent>
      <CardFooter>
        <Button className="w-full">로그인</Button>
      </CardFooter>
    </Card>
  </div>
)
```

---

## FormPage 패턴 (Default vs WithErrors)

```typescript
// Default: error prop 없음
export const Default: Story = {};

// WithErrors: Field의 error prop으로 에러 상태 표현
export const WithErrors: Story = {
  render: () => (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-6 grid gap-4">
          <Field label="이름" required error="이름을 입력해주세요.">
            <Input placeholder="홍길동" />
          </Field>
          <Field label="이메일" required error="이메일 형식이 올바르지 않습니다.">
            <Input type="email" placeholder="name@example.com" defaultValue="invalid-email" />
          </Field>
        </CardContent>
        <CardFooter>
          <Button type="submit">저장</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
```

---

## SettingsPage 패턴

```typescript
// Tabs + Card + Switch 조합
render: () => (
  <div className="p-8 max-w-3xl mx-auto">
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">일반</TabsTrigger>
        <TabsTrigger value="notifications">알림</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader><CardTitle>일반 설정</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label>다크 모드</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
)
```

---

## 검증 방법

```bash
# Storybook 빌드 확인
pnpm --filter @myorg/ui build-storybook

# 개발 서버에서 시각 확인
pnpm --filter @myorg/ui storybook
```

Storybook 사이드바에서 **Pages** 카테고리 아래 4개 스토리 확인.
