# 구현 계획: 페이지 템플릿 Storybook 스토리

**Branch**: `005-page-template-stories` | **Date**: 2026-04-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-page-template-stories/spec.md`

## 요약 (Summary)

`packages/ui/src/stories/`에 4개의 페이지 템플릿 스토리 파일을 추가한다: DashboardPage, AuthPage, FormPage, SettingsPage. 각 파일은 `@myorg/ui` 기존 컴포넌트만 조합하여 AI 에이전트가 참조할 수 있는 현실적인 페이지 레이아웃 예시를 제공한다. 기존 `composition.stories.tsx`는 수정하지 않는다.

## 기술 컨텍스트 (Technical Context)

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Storybook 10.3.3, React, `@storybook/react`, `@myorg/ui` (내부 패키지), `lucide-react` (아이콘)  
**Storage**: N/A  
**Testing**: 없음 (시각적 참조용 스토리 — play 테스트 불포함)  
**Target Platform**: `packages/ui/src/stories/`  
**Project Type**: UI 컴포넌트 라이브러리 (Storybook 문서화)  
**Performance Goals**: N/A  
**Constraints**: `@myorg/ui` 기존 컴포넌트만 사용; 라우팅/API 의존성 없음; 기존 play 테스트 0 regression 유지  
**Scale/Scope**: 4개 신규 파일, 총 5개 named export (Default×4 + WithErrors×1)

## 헌법 검토 (Constitution Check)

| 원칙 | 상태 | 설명 |
|------|------|------|
| I. 코드 품질 | ✅ 통과 | 기존 패턴(render 함수) 일관 사용; 중복 없음 |
| II. 테스트 표준 | ✅ 해당 없음 | 시각적 레이아웃 참조 스토리 — play 테스트 불필요 |
| III. UX 일관성 | ✅ 직접 지원 | AI 에이전트가 컴포넌트 조합 패턴을 스토리에서 학습 |
| IV. 성능 요구사항 | ✅ 해당 없음 | 정적 스토리 파일 |
| V. 단순성 | ✅ 통과 | 새 추상화 없음; render 함수 패턴만 사용 |

**결론**: 모든 게이트 통과. Complexity Tracking 불필요.

## 프로젝트 구조 (Project Structure)

### 문서화 (이 기능)

```text
specs/005-page-template-stories/
├── plan.md              # 이 파일
├── research.md          # Phase 0 출력
├── quickstart.md        # Phase 1 출력
└── tasks.md             # /speckit.tasks에서 생성
```

### 소스 코드 (수정 대상 파일)

```text
packages/ui/src/stories/
├── DashboardPage.stories.tsx   # 신규 — SidebarProvider + DataTable 페이지 템플릿
├── AuthPage.stories.tsx        # 신규 — 중앙 정렬 카드 + 폼 템플릿
├── FormPage.stories.tsx        # 신규 — Field/Input/Button + WithErrors 변형
├── SettingsPage.stories.tsx    # 신규 — Tabs + Card + Switch 템플릿
└── composition.stories.tsx     # 기존 — 변경하지 않음 (play 테스트 보호)
```

**구조 결정**: 기존 `stories/` 디렉토리에 배치. 별도 하위 폴더 없음 (4개 파일).

## 컴포넌트 조합 계획 (Component Composition Plan)

### DashboardPage

| 영역 | 컴포넌트 |
|------|---------|
| 레이아웃 | `SidebarProvider`, `SidebarInset` |
| 사이드바 | `Sidebar`, `SidebarContent`, `SidebarHeader`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` |
| 헤더 | `SidebarTrigger`, `Separator` |
| 콘텐츠 | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `DataTable` |
| 아이콘 | `LayoutDashboardIcon`, `UsersIcon`, `SettingsIcon` (lucide-react) |

### AuthPage

| 영역 | 컴포넌트 |
|------|---------|
| 레이아웃 | div (className: `min-h-svh flex items-center justify-center`) |
| 카드 | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| 폼 | `Field`, `Input`, `Button` |

### FormPage

| 영역 | 컴포넌트 |
|------|---------|
| 레이아웃 | div (className: `p-8 max-w-2xl mx-auto`) |
| 카드 | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| 폼 필드 | `Field` (with error prop), `Input`, `Textarea`, `Button` |

**두 스토리**:
- `Default` — 에러 없는 정상 상태
- `WithErrors` — `Field` `error` prop에 에러 메시지 전달

### SettingsPage

| 영역 | 컴포넌트 |
|------|---------|
| 레이아웃 | div (className: `p-8 max-w-3xl mx-auto`) |
| 탭 | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| 카드 | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| 토글 | `Switch`, `Label`, `Separator` |

## 현재 상태 vs 목표 상태

| 파일 | 현재 | 목표 |
|------|------|------|
| DashboardPage.stories.tsx | 없음 | 신규 생성 (Default) |
| AuthPage.stories.tsx | 없음 | 신규 생성 (Default) |
| FormPage.stories.tsx | 없음 | 신규 생성 (Default, WithErrors) |
| SettingsPage.stories.tsx | 없음 | 신규 생성 (Default) |
| composition.stories.tsx | Default (play 테스트) | 변경 없음 |
