# Tasks: 페이지 템플릿 Storybook 스토리

**Input**: `/specs/005-page-template-stories/` 설계 문서 전체
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, quickstart.md ✅

**조직**: 사용자 스토리 별로 태스크를 구성하여 각 스토리를 독립적으로 구현·검증 가능하게 함

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 다른 파일에서 병렬 실행 가능 (의존성 없음)
- **[Story]**: 해당 태스크가 속한 사용자 스토리 (US1, US2, US3, US4)
- 설명에 정확한 파일 경로 포함

### 핵심 규칙 (research.md 결정사항)
- 4개 신규 파일 모두 `packages/ui/src/stories/`에 배치
- `title: 'Pages/...'` prefix 사용 (FR-007)
- `parameters: { layout: 'fullscreen' }` — DashboardPage, AuthPage
- play 테스트를 새 스토리에 추가하지 않는다
- `composition.stories.tsx`는 절대 변경하지 않는다
- 더미 데이터는 의미 있는 실제 텍스트 사용 (Lorem ipsum 금지)

---

## Phase 1: Setup (확인)

**목적**: 수정 전 현재 Storybook 빌드 상태 확인

- [X] T001 `pnpm --filter @myorg/ui build-storybook` 실행하여 현재 빌드가 오류 없이 완료되는지 확인 — 기준선 수립

---

## Phase 2: Foundational (공통 import 확인)

**목적**: 4개 스토리 파일에서 공통으로 사용할 컴포넌트 import 가용성 확인

**⚠️ CRITICAL**: T001 완료 후 진행

- [X] T002 `packages/ui/src/components/sidebar.tsx`에서 export되는 서브컴포넌트 목록 확인 — `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarInset`, `SidebarTrigger` 존재 여부 검증
- [X] T003 `packages/ui/src/components/index.ts`에서 `DataTable`, `Field`, `Input`, `Textarea`, `Switch`, `Tabs`, `Card`, `Button`, `Label`, `Separator` 모두 export 가능한지 확인

**Checkpoint**: Setup 완료 — 4개 스토리 병렬 구현 시작 가능

---

## Phase 3: User Story 1 — DashboardPage 스토리 (Priority: P1) 🎯 MVP

**Goal**: AI 에이전트가 `DashboardPage.stories.tsx`를 읽어 사이드바 + 헤더 + 데이터 테이블 레이아웃에 사용된 컴포넌트 조합을 즉시 파악할 수 있다.

**Independent Test**: Storybook Pages > DashboardPage > Default 스토리를 열어 사이드바·헤더·데이터 테이블이 오류 없이 렌더링되면 통과

### Implementation for User Story 1

- [X] T004 [US1] `packages/ui/src/stories/DashboardPage.stories.tsx` 신규 생성:
  ```typescript
  // meta: title: 'Pages/DashboardPage', parameters: { layout: 'fullscreen' }
  // render: SidebarProvider > Sidebar(네비게이션 메뉴: Dashboard, Users, Settings) +
  //         SidebarInset > header(SidebarTrigger + Separator + "Dashboard" 타이틀) +
  //         main(Card > CardHeader(CardTitle "사용자 목록") + CardContent(DataTable))
  // 더미 데이터:
  //   users = [
  //     { id: '1', name: 'Alice Kim', email: 'alice@example.com', role: 'Admin' },
  //     { id: '2', name: 'Bob Lee', email: 'bob@example.com', role: 'Editor' },
  //     { id: '3', name: 'Carol Park', email: 'carol@example.com', role: 'Viewer' },
  //   ]
  //   columns: name(header: '이름'), email(header: '이메일'), role(header: '역할')
  export const Default: Story = {}
  ```
  - Import 경로: `'../components/sidebar'`, `'../components/data-table'`, `'../components/card'`, `'../components/button'`, `'../components/separator'`
  - 아이콘: `lucide-react`의 `LayoutDashboard`, `Users`, `Settings` 사용

**Checkpoint**: T004 완료 시 US1 독립 테스트 가능

---

## Phase 4: User Story 2 — AuthPage 스토리 (Priority: P2)

**Goal**: AI 에이전트가 `AuthPage.stories.tsx`를 읽어 중앙 정렬 카드 + 폼 레이아웃 패턴을 파악할 수 있다.

**Independent Test**: Storybook Pages > AuthPage > Default 스토리를 열어 화면 중앙에 카드 + 입력 폼이 렌더링되면 통과

### Implementation for User Story 2

- [X] T005 [P] [US2] `packages/ui/src/stories/AuthPage.stories.tsx` 신규 생성:
  ```typescript
  // meta: title: 'Pages/AuthPage', parameters: { layout: 'fullscreen' }
  // render: <div className="min-h-svh flex items-center justify-center bg-muted/40">
  //   <Card className="w-full max-w-sm">
  //     <CardHeader>
  //       <CardTitle>로그인</CardTitle>
  //       <CardDescription>계정에 로그인하세요</CardDescription>
  //     </CardHeader>
  //     <CardContent className="grid gap-4">
  //       <Field label="이메일"><Input type="email" placeholder="name@example.com" /></Field>
  //       <Field label="비밀번호"><Input type="password" placeholder="••••••••" /></Field>
  //     </CardContent>
  //     <CardFooter><Button className="w-full">로그인</Button></CardFooter>
  //   </Card>
  // </div>
  export const Default: Story = {}
  ```
  - Import 경로: `'../components/card'`, `'../components/field'`, `'../components/input'`, `'../components/button'`

**Checkpoint**: T005 완료 시 US2 독립 테스트 가능

---

## Phase 5: User Story 3 — FormPage 스토리 (Priority: P3)

**Goal**: AI 에이전트가 `FormPage.stories.tsx`를 읽어 레이블 + 입력 + 에러 메시지 컴포넌트 조합 패턴을 파악할 수 있다.

**Independent Test**: Storybook Pages > FormPage > Default(정상 상태), WithErrors(에러 상태) 두 스토리가 오류 없이 렌더링되면 통과

### Implementation for User Story 3

- [X] T006 [P] [US3] `packages/ui/src/stories/FormPage.stories.tsx` 신규 생성 (Default + WithErrors):
  ```typescript
  // meta: title: 'Pages/FormPage', parameters: { layout: 'padded' }
  // meta render (Default 기준):
  //   <div className="p-8 max-w-2xl mx-auto">
  //     <Card>
  //       <CardHeader><CardTitle>프로필 편집</CardTitle></CardHeader>
  //       <CardContent className="grid gap-4">
  //         <Field label="이름" required><Input placeholder="홍길동" /></Field>
  //         <Field label="이메일" required><Input type="email" placeholder="name@example.com" /></Field>
  //         <Field label="소개"><Textarea placeholder="자기소개를 입력하세요" rows={4} /></Field>
  //       </CardContent>
  //       <CardFooter className="gap-2">
  //         <Button>저장</Button>
  //         <Button variant="outline">취소</Button>
  //       </CardFooter>
  //     </Card>
  //   </div>
  export const Default: Story = {}
  
  // WithErrors: Field의 error prop으로 검증 에러 상태 표현
  export const WithErrors: Story = {
    render: () => (
      <div className="p-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader><CardTitle>프로필 편집</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <Field label="이름" required error="이름을 입력해주세요.">
              <Input placeholder="홍길동" />
            </Field>
            <Field label="이메일" required error="이메일 형식이 올바르지 않습니다.">
              <Input type="email" placeholder="name@example.com" defaultValue="invalid-email" />
            </Field>
            <Field label="소개"><Textarea placeholder="자기소개를 입력하세요" rows={4} /></Field>
          </CardContent>
          <CardFooter className="gap-2">
            <Button>저장</Button>
            <Button variant="outline">취소</Button>
          </CardFooter>
        </Card>
      </div>
    ),
  }
  ```
  - Import 경로: `'../components/card'`, `'../components/field'`, `'../components/input'`, `'../components/textarea'`, `'../components/button'`

**Checkpoint**: T006 완료 시 US3 독립 테스트 가능

---

## Phase 6: User Story 4 — SettingsPage 스토리 (Priority: P4)

**Goal**: AI 에이전트가 `SettingsPage.stories.tsx`를 읽어 탭 + 카드 + 스위치 조합 패턴을 파악할 수 있다.

**Independent Test**: Storybook Pages > SettingsPage > Default 스토리를 열어 탭 네비게이션과 카드 내 스위치가 렌더링되면 통과

### Implementation for User Story 4

- [X] T007 [P] [US4] `packages/ui/src/stories/SettingsPage.stories.tsx` 신규 생성:
  ```typescript
  // meta: title: 'Pages/SettingsPage'
  // render:
  //   <div className="p-8 max-w-3xl mx-auto">
  //     <h1 className="text-2xl font-semibold mb-6">설정</h1>
  //     <Tabs defaultValue="general">
  //       <TabsList>
  //         <TabsTrigger value="general">일반</TabsTrigger>
  //         <TabsTrigger value="notifications">알림</TabsTrigger>
  //         <TabsTrigger value="security">보안</TabsTrigger>
  //       </TabsList>
  //       <TabsContent value="general">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>일반 설정</CardTitle>
  //             <CardDescription>기본 계정 설정을 관리합니다.</CardDescription>
  //           </CardHeader>
  //           <CardContent className="grid gap-4">
  //             <div className="flex items-center justify-between">
  //               <div><Label>다크 모드</Label><p className="text-sm text-muted-foreground">어두운 테마를 사용합니다.</p></div>
  //               <Switch />
  //             </div>
  //             <Separator />
  //             <div className="flex items-center justify-between">
  //               <div><Label>자동 저장</Label><p className="text-sm text-muted-foreground">변경사항을 자동으로 저장합니다.</p></div>
  //               <Switch defaultChecked />
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="notifications">
  //         <Card>
  //           <CardHeader><CardTitle>알림 설정</CardTitle></CardHeader>
  //           <CardContent className="grid gap-4">
  //             <div className="flex items-center justify-between">
  //               <div><Label>이메일 알림</Label><p className="text-sm text-muted-foreground">중요 업데이트를 이메일로 받습니다.</p></div>
  //               <Switch defaultChecked />
  //             </div>
  //             <Separator />
  //             <div className="flex items-center justify-between">
  //               <div><Label>마케팅 수신</Label><p className="text-sm text-muted-foreground">프로모션 및 뉴스레터를 받습니다.</p></div>
  //               <Switch />
  //             </div>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //       <TabsContent value="security">
  //         <Card>
  //           <CardHeader><CardTitle>보안 설정</CardTitle></CardHeader>
  //           <CardContent className="grid gap-4">
  //             <div className="flex items-center justify-between">
  //               <div><Label>2단계 인증</Label><p className="text-sm text-muted-foreground">로그인 시 추가 인증을 요구합니다.</p></div>
  //               <Switch />
  //             </div>
  //           </CardContent>
  //           <CardFooter><Button variant="destructive">계정 삭제</Button></CardFooter>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  export const Default: Story = {}
  ```
  - Import 경로: `'../components/tabs'`, `'../components/card'`, `'../components/switch'`, `'../components/label'`, `'../components/separator'`, `'../components/button'`

**Checkpoint**: T007 완료 시 US4 독립 테스트 가능

---

## Polish Phase: 빌드 검증

**목적**: 모든 신규 파일 추가 후 Storybook 빌드 오류 없는지 확인

- [X] T008 `pnpm --filter @myorg/ui build-storybook` 실행 — 빌드 성공 및 0 TypeScript 오류 확인
- [X] T009 [P] Storybook 사이드바에서 "Pages" 카테고리 아래 4개 스토리(DashboardPage, AuthPage, FormPage, SettingsPage) 모두 나타나는지 확인 — FR-007 충족 여부
- [X] T010 [P] `composition.stories.tsx`의 play 테스트가 여전히 통과하는지 확인 (`pnpm --filter @myorg/ui test-storybook` 또는 빌드에서 오류 없음으로 대리 확인) — SC-003 충족 여부

---

## 의존성 및 실행 순서

### Phase 의존성

- **Phase 1 (Setup)**: 즉시 시작
- **Phase 2 (Foundational)**: Phase 1 완료 후
- **Phase 3 (US1 — Dashboard)**: Phase 2 완료 후
- **Phase 4 (US2 — Auth)**: Phase 2 완료 후 (US1과 독립적으로 병렬 시작 가능)
- **Phase 5 (US3 — Form)**: Phase 2 완료 후 (US1, US2와 독립적으로 병렬 시작 가능)
- **Phase 6 (US4 — Settings)**: Phase 2 완료 후 (모든 US와 독립적으로 병렬 시작 가능)
- **Polish**: 모든 Phase 완료 후

### 사용자 스토리 의존성

- **US1~US4**: 모두 다른 파일, 서로 독립적 — Phase 2 완료 후 4개 동시 병렬 실행 가능

### 병렬 실행 예시: Phase 2 완료 후 US1~US4 동시 진행

```
# Phase 2 완료 후 US1~US4를 동시에 시작:

T004 — DashboardPage.stories.tsx (sidebar + header + data table)
T005 — AuthPage.stories.tsx (중앙 카드 + 폼)
T006 — FormPage.stories.tsx (Default + WithErrors)
T007 — SettingsPage.stories.tsx (tabs + cards + switches)
```

---

## 구현 전략

### MVP First (US1만 구현)

1. Phase 1: Setup (T001)
2. Phase 2: Foundational (T002~T003)
3. Phase 3: US1 (T004) — DashboardPage 완료
4. **STOP & VALIDATE**: Storybook에서 Pages > DashboardPage 확인
5. 유효하면 Phase 4~6 진행

### 점진적 제공

1. T001~T003 → 기준선 확인
2. T004 완료 → AI 에이전트가 Dashboard 레이아웃 패턴 인식 (MVP!)
3. T005 완료 → Auth 페이지 패턴 추가
4. T006 완료 → Form + WithErrors 패턴 추가
5. T007 완료 → Settings 탭+카드 패턴 추가
6. T008~T010 완료 → 빌드 검증 및 카테고리 확인

---

## Notes

- **[P]** 태스크 = 서로 다른 파일을 수정하므로 동시 실행 가능 (T005, T006, T007은 모두 병렬 가능)
- T004(DashboardPage)는 SidebarProvider 설정이 복잡하여 [P] 생략 — 다른 스토리와 파일이 달라 사실상 병렬 가능하나 확인 시간이 필요
- `composition.stories.tsx`는 절대 변경하지 않는다
- T008 빌드 실패 시 TypeScript 오류 메시지로 문제 파일 즉시 특정하여 수정
- 각 스토리는 `satisfies Meta` 패턴 사용 (기존 스토리 파일 패턴 일관성 유지)

