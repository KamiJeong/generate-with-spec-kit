# UI Contracts: AI Wiki Portal Platform

**Branch**: `021-ai-wiki-portal` | **Date**: 2026-04-15

> UI 계약: 각 페이지 및 핵심 컴포넌트의 props 인터페이스, 동작 계약, 허용/불가 사항 정의

---

## 레이아웃 컴포넌트

### AppSidebar

**위치**: `src/components/layout/AppSidebar.tsx`

```typescript
// Props 없음 — 내부에서 useLocation()으로 활성 메뉴 결정
export function AppSidebar(): JSX.Element
```

**계약**:
- `SidebarProvider` + `Sidebar variant="inset" collapsible="icon"` 사용
- 메뉴 항목: 대시보드, Wiki, Blueprint, Get Started
- 현재 경로와 일치하는 메뉴 항목은 `isActive` 상태로 표시
- 사이드바 접기 시 아이콘만 표시 (텍스트 숨김)

### AppHeader

**위치**: `src/components/layout/AppHeader.tsx`

```typescript
interface AppHeaderProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}
export function AppHeader({ title, breadcrumbs }: AppHeaderProps): JSX.Element
```

**계약**:
- 검색창 클릭 시 Wiki 검색 페이지로 이동 (`/wiki?q=`)
- 알림 아이콘: 클릭 시 Mock 알림 드롭다운 표시
- 사용자 프로필: Mock 사용자 정보 표시

---

## 페이지 컴포넌트

### DashboardPage

**경로**: `/dashboard`

**계약**:
- `mockProjects`에서 프로젝트 목록 읽어 `ProjectCard` 렌더링
- `mockActivityFeed` 최근 5개 항목 표시
- 프로젝트 없으면 `EmptyState` 표시 (CTA: "Blueprint 생성하기" → `/blueprint`)
- 프로젝트 카드 클릭 → `/projects/:id` 이동

### WikiPage

**경로**: `/wiki`

**계약**:
- `mockDocumentTree`로 좌측 트리 렌더링
- URL query param `?q=`가 있으면 검색 결과 필터링
- 문서 항목 클릭 → `/wiki/:docId` 이동
- 검색 결과 없으면 "검색 결과가 없습니다" + 초기화 버튼

### WikiDocPage

**경로**: `/wiki/:docId`

**계약**:
- `docId`로 `mockDocuments`에서 문서 조회
- `DocContent`에 `contentHtml` 전달 렌더링
- `TableOfContents`에 `headings` 전달 (우측 패널)
- 존재하지 않는 `docId`면 "문서를 찾을 수 없습니다" EmptyState

### BlueprintPage

**경로**: `/blueprint`

**계약**:
- 초기 상태: 빈 텍스트에어리어 + "Blueprint 생성" 버튼 비활성화
- 텍스트 입력 시 버튼 활성화
- 버튼 클릭 → `isLoading: true` → 1.5초 후 `mockBlueprint` 결과 렌더링 (딜레이 시뮬레이션)
- "프로젝트 시작" 버튼 클릭 → 새 프로젝트 Mock 추가 → `/dashboard` 이동

### GetStartedPage

**경로**: `/get-started`

**계약**:
- `mockSteps` 전체 렌더링
- 체크박스 토글 → 해당 step `isCompleted` 상태 업데이트 + 진행률(%) 재계산
- "AI 도움말" 버튼 클릭 → `AiHelpPanel` 슬라이드 인 표시
- 100% 완료 시 상단 완료 배너 표시

### ProjectDetailPage

**경로**: `/projects/:id`

**계약**:
- `id`로 `mockProjects` 조회
- `mockGithubStatus[id]`로 GitHub 현황 렌더링
- "AI에게 질문" 버튼 → `AiQueryPanel` 열기 (입력창 자동 포커스)
- 존재하지 않는 `id`면 EmptyState + "대시보드로 돌아가기" 버튼

---

## 공유 컴포넌트

### EmptyState

```typescript
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}
export function EmptyState({ title, description, action }: EmptyStateProps): JSX.Element
```

### StatusBadge

```typescript
interface StatusBadgeProps {
  status: ProjectStatus;
}
export function StatusBadge({ status }: StatusBadgeProps): JSX.Element
```

**계약**: `in_progress` → 파란색 배지, `completed` → 초록색, `blocked` → 빨간색

### LoadingSpinner

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;  // 스크린 리더용 aria-label
}
export function LoadingSpinner({ size, label }: LoadingSpinnerProps): JSX.Element
```

---

## 라우트 계약

| 경로 | 컴포넌트 | 비고 |
|------|---------|------|
| `/` | Redirect | → `/dashboard` |
| `/dashboard` | DashboardPage | |
| `/wiki` | WikiPage | `?q=` 검색 쿼리 지원 |
| `/wiki/:docId` | WikiDocPage | |
| `/blueprint` | BlueprintPage | |
| `/get-started` | GetStartedPage | |
| `/projects/:id` | ProjectDetailPage | |
| `*` (catch-all) | NotFoundPage | "페이지를 찾을 수 없습니다" |
