# 리서치: 페이지 템플릿 Storybook 스토리

**Feature**: 005-page-template-stories | **Date**: 2026-04-03

## 결정 사항 (Decisions)

### 1. 스토리 파일 위치

**결정**: `packages/ui/src/stories/` 디렉토리에 배치.

**근거**: 기존 `composition.stories.tsx`와 동일 위치. 페이지 레이아웃 스토리는 단일 컴포넌트 스토리가 아니므로 `components/` 디렉토리보다 `stories/` 디렉토리가 적합.

**검토한 대안**: `packages/ui/src/stories/pages/` 하위 디렉토리 — 기각, 4개 파일에 불과하여 별도 디렉토리가 불필요한 복잡성 추가.

---

### 2. Storybook title 패턴 (카테고리)

**결정**: `title: 'Pages/DashboardPage'` 형식 사용 — 모든 4개 파일에 "Pages" prefix 적용.

**근거**: FR-007에서 "Pages" 카테고리 요구. 기존 composition.stories.tsx는 `'Components/Composition'`을 사용하므로 Pages를 별도 카테고리로 분리하면 Storybook 내비게이션에서 명확히 구분됨.

**검토한 대안**: `'Examples/...'` — 기각, "Pages"가 페이지 레이아웃 템플릿 목적을 더 명확히 표현.

---

### 3. DashboardPage 컴포넌트 구성

**결정**: `SidebarProvider` + `Sidebar` 관련 컴포넌트 + `Card` + `DataTable` + `Button` + `Avatar` 조합.

**근거**:
- `@myorg/ui`에 `sidebar` 컴포넌트가 이미 존재하며 `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarTrigger` 등 서브컴포넌트를 포함.
- `composition.stories.tsx`에서 `DataTable` 사용 패턴이 이미 검증됨.

**컴포넌트 선택**:
- 사이드바: `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarInset`
- 헤더: `SidebarTrigger` + `Separator` + 타이틀 텍스트
- 콘텐츠: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `DataTable`

---

### 4. AuthPage 컴포넌트 구성

**결정**: 전체 화면 중앙 정렬은 `className="min-h-svh flex items-center justify-center"` wrapper div로 구현. 카드 내부에 `Field`, `Input`, `Button` 조합.

**근거**:
- `SidebarProvider`와 같은 복잡한 레이아웃 컴포넌트 불필요 — Tailwind 클래스로 충분.
- `Field` 컴포넌트가 label + input + error 패턴을 이미 추상화함.

**컴포넌트 선택**: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Field`, `Input`, `Button`

---

### 5. FormPage 컴포넌트 구성 및 WithErrors 패턴

**결정**: `Field`의 `error` prop을 사용하여 WithErrors 상태 표현. Default와 WithErrors 두 스토리 모두 같은 레이아웃, 다른 error 값.

**근거**:
- `Field` 컴포넌트가 `error?: string` prop을 이미 지원하며, `aria-invalid`와 에러 메시지 `<p>` 자동 렌더링.
- 별도 상태 관리(useState) 없이 순수 render 함수로 두 상태 표현 가능.

**컴포넌트 선택**: `Card`, `CardContent`, `CardHeader`, `CardTitle`, `CardFooter`, `Field`, `Input`, `Textarea`, `Button`, `Select` (select field 예시용)

---

### 6. SettingsPage 컴포넌트 구성

**결정**: `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent` 패턴, 각 탭 내 `Card` + `Switch` + `Label` 조합.

**근거**: Tabs 컴포넌트는 기본적으로 클릭 인터랙션이 동작하므로 play 테스트 없이도 Storybook에서 탭 전환 가능. Switch는 이미 feature 004에서 스토리가 작성된 컴포넌트.

**컴포넌트 선택**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Switch`, `Label`, `Separator`, `Button`

---

### 7. 더미 데이터 전략

**결정**: 도메인별 의미 있는 더미 데이터 사용 (FR-008).

| 스토리 | 더미 데이터 예시 |
|--------|----------------|
| DashboardPage | 사용자 목록: Alice Kim, Bob Lee, Carol Park / 네비게이션: Dashboard, Users, Settings |
| AuthPage | 레이블: "이메일", "비밀번호" / 버튼: "로그인" |
| FormPage | 이름, 이메일, 소개 필드 / 에러: "이메일 형식이 올바르지 않습니다" |
| SettingsPage | 탭: "일반", "알림", "보안" / 스위치: "이메일 알림", "마케팅 수신" |

---

### 8. play 테스트 여부

**결정**: 새 스토리에 play 테스트를 추가하지 않는다.

**근거**: feature 004와 동일한 원칙. 페이지 템플릿 스토리는 시각적 레이아웃 참조용이므로 인터랙션 테스트가 불필요. 기존 `composition.stories.tsx`의 play 테스트도 건드리지 않는다.

---

### 9. Storybook decorator (height 설정)

**결정**: DashboardPage는 `decorators: [Story => <div className="h-screen">{Story()}</div>]` 또는 `parameters: { layout: 'fullscreen' }` 사용.

**근거**: 사이드바 레이아웃은 전체 화면 높이가 필요. Storybook `parameters.layout: 'fullscreen'`이 가장 간결한 방법. AuthPage도 `fullscreen` 사용하여 중앙 정렬 효과를 명확히 표현.
