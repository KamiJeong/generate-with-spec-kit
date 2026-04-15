# Quickstart: AI Wiki Portal Platform 화면 개발

**Branch**: `021-ai-wiki-portal` | **Date**: 2026-04-15

## 개발 환경 준비

```bash
# 1. monorepo 루트에서 의존성 설치
pnpm install

# 2. @myorg/tokens 빌드 (앱이 의존)
pnpm --filter @myorg/tokens build

# 3. 앱 개발 서버 실행
pnpm --filter @myorg/ai-wiki-portal dev
```

## 앱 패키지 생성 (최초 1회)

```bash
# apps/ai-wiki-portal-platform-by-claude 디렉토리 생성 후
# apps/sfood/package.json 구조를 참조하여 package.json 생성
# pnpm-workspace.yaml에 apps/* 이미 포함됨
pnpm install
```

## 주요 개발 흐름

### 1. Mock 데이터 먼저 정의
`src/types/index.ts` → `src/mock/*.ts` 순서로 작업. 타입 먼저, 데이터 나중.

### 2. 레이아웃 구축
`App.tsx`에서 `SidebarProvider` + `AppSidebar` + `RouterProvider` 구성.  
`DocsHubLayout.stories.tsx`를 참고 기준으로 사용.

### 3. 페이지 구현 순서 (우선순위)
1. `DashboardPage` (P1 — Mock 데이터 표시 검증)
2. `WikiPage` + `WikiDocPage` (P2)
3. `BlueprintPage` (P2)
4. `GetStartedPage` (P3)
5. `ProjectDetailPage` (P3)

### 4. 테스트 실행

```bash
pnpm --filter @myorg/ai-wiki-portal test
```

### 5. 빌드 검증

```bash
pnpm --filter @myorg/ai-wiki-portal build
```

## 컴포넌트 임포트 참조

```typescript
// @myorg/ui 컴포넌트 임포트 예시
import { Button } from '@myorg/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui/components/card';
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@myorg/ui/components/sidebar';
import { Badge } from '@myorg/ui/components/badge';
import { Progress } from '@myorg/ui/components/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@myorg/ui/components/tabs';
```

## 주의사항

- `@myorg/ui` 컴포넌트 외 임의 스타일(인라인 hex 색상, 사용자 정의 CSS) 사용 금지
- 모든 화면은 `1280px` 기준으로 레이아웃 검증
- Mock 딜레이(Blueprint 생성 시뮬레이션)는 `setTimeout` 1.5초로 구현
- `react-router-dom` 라우터는 `createBrowserRouter` + `RouterProvider` 패턴 사용
