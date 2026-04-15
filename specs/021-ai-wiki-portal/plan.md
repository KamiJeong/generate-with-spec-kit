# Implementation Plan: AI Wiki Portal Platform 화면 개발

**Branch**: `021-ai-wiki-portal` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/021-ai-wiki-portal/spec.md`

## Summary

비개발자도 AI를 활용한 서비스 개발이 가능한 LLM Wiki 기반 플랫폼 화면을 구현한다. `DocsHubLayout` 기반의 업무용 Admin UI를 채용하고, `@myorg/ui` 컴포넌트 라이브러리를 활용한 5개 주요 화면(대시보드, Wiki 문서 조회, Blueprint 생성, Get Started 가이드, 프로젝트 상세)을 Mock 데이터 기반으로 구현한다. monorepo 내 `apps/ai-wiki-portal-platform-by-claude`에 독립 패키지로 추가하며, URL 기반 클라이언트 사이드 라우팅을 사용한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+  
**Primary Dependencies**: `@myorg/ui` (workspace), `@myorg/tokens` (workspace), `react-router-dom` v6, `lucide-react`, Tailwind CSS v4, Vite 6.x  
**Storage**: 없음 (Mock 데이터, 런타임 메모리만 사용)  
**Testing**: Vitest 2.x + @testing-library/react (컴포넌트 렌더링 검증)  
**Target Platform**: 데스크탑 브라우저 (1280px 이상 기준), Chrome/Edge/Firefox 최신 버전  
**Project Type**: web-application (SPA, monorepo 신규 앱 패키지)  
**Performance Goals**: FCP 1.5초 이하 (Vite 번들 최적화, 코드 스플리팅 활용)  
**Constraints**: 실제 API 없음, Mock 전용, 데스크탑 우선, `@myorg/ui` 컴포넌트만 사용  
**Scale/Scope**: 5개 화면, 24개 FR, 1개 앱 패키지

## Constitution Check

*GATE: spec.md → plan.md → tasks.md 순서의 설계 문서 완성 후 구현 진행*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 (SRP, DRY, 명확한 네이밍) | PASS | 화면별 페이지 컴포넌트 분리, Mock 데이터 별도 파일 관리 |
| II. 테스트 표준 (TDD, 80% 커버리지) | PARTIAL | Mock UI 앱 특성상 단위 테스트는 주요 상호작용 중심으로 작성. 비즈니스 로직 없으므로 핵심 커버리지 80% 준수 |
| III. UX 일관성 (디자인 시스템, 200ms 피드백) | PASS | `@myorg/ui` 컴포넌트 전용 사용, 로딩/에러/Empty State 공통 패턴 적용 |
| IV. 성능 요구사항 (FCP 1.5초, 코드 스플리팅) | PASS | React.lazy + Suspense로 라우트별 코드 스플리팅 적용 |
| V. 단순성 (YAGNI, 외부 의존성 최소화) | PASS | Mock 데이터로 API 불필요. 추가 라이브러리는 `react-router-dom` 1개 |
| 언어 정책 (한국어 문서) | PASS | plan.md 한국어 작성 |

**게이트 결과**: PASS — 구현 진행 가능

**Complexity Tracking 필요 항목**: 없음 (`react-router-dom` 추가는 URL 기반 라우팅 요구사항(FR-024)에 의한 필수 의존성)

## Project Structure

### Documentation (this feature)

```text
specs/021-ai-wiki-portal/
├── plan.md              # 이 파일
├── research.md          # Phase 0 결과
├── data-model.md        # Phase 1 결과
├── quickstart.md        # Phase 1 결과
├── contracts/
│   └── ui-contracts.md  # 화면별 컴포넌트 인터페이스 계약
└── tasks.md             # /speckit.tasks 명령어로 생성
```

### Source Code (repository root)

```text
apps/ai-wiki-portal-platform-by-claude/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── index.html
├── src/
│   ├── main.tsx                    # 앱 진입점, Router 설정
│   ├── App.tsx                     # 루트 컴포넌트, 레이아웃 + 라우트 정의
│   ├── routes.tsx                  # 라우트 상수 및 lazy import 정의
│   ├── mock/
│   │   ├── projects.ts             # 프로젝트 Mock 데이터
│   │   ├── documents.ts            # Wiki 문서 Mock 데이터
│   │   ├── blueprints.ts           # Blueprint Mock 데이터
│   │   ├── steps.ts                # Get Started 단계 Mock 데이터
│   │   └── users.ts                # 사용자 Mock 데이터
│   ├── pages/
│   │   ├── DashboardPage.tsx       # P1: 프로젝트 대시보드
│   │   ├── WikiPage.tsx            # P2: Wiki 문서 탐색 목록
│   │   ├── WikiDocPage.tsx         # P2: 문서 상세 조회 (/wiki/:docId)
│   │   ├── BlueprintPage.tsx       # P2: Blueprint 생성
│   │   ├── GetStartedPage.tsx      # P3: 단계별 가이드
│   │   └── ProjectDetailPage.tsx   # P3: 프로젝트 상세 (/projects/:id)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx      # 좌측 네비게이션 사이드바
│   │   │   └── AppHeader.tsx       # 상단 헤더 (검색, 알림, 프로필)
│   │   ├── dashboard/
│   │   │   ├── ProjectCard.tsx     # 프로젝트 카드 컴포넌트
│   │   │   ├── StatsSummary.tsx    # 통계 요약 카드
│   │   │   └── ActivityFeed.tsx    # 최근 활동 피드
│   │   ├── wiki/
│   │   │   ├── DocTree.tsx         # 문서 트리 사이드바
│   │   │   ├── DocContent.tsx      # 문서 내용 렌더러
│   │   │   └── TableOfContents.tsx # 우측 목차 패널
│   │   ├── blueprint/
│   │   │   ├── BlueprintForm.tsx   # 요구사항 입력 폼
│   │   │   └── BlueprintResult.tsx # 결과 탭/아코디언
│   │   ├── get-started/
│   │   │   ├── StepList.tsx        # 단계 목록
│   │   │   └── AiHelpPanel.tsx     # AI 도움말 슬라이드 패널
│   │   ├── project/
│   │   │   ├── ProjectTimeline.tsx # 진행 단계 타임라인
│   │   │   ├── ParticipantList.tsx # 참여자 목록
│   │   │   ├── GithubStatus.tsx    # GitHub 연동 현황
│   │   │   └── AiQueryPanel.tsx    # AI 질의 패널
│   │   └── shared/
│   │       ├── EmptyState.tsx      # 공통 Empty State
│   │       ├── LoadingSpinner.tsx  # 공통 로딩 인디케이터
│   │       └── StatusBadge.tsx     # 상태 배지 (진행중/완료/블로킹)
│   └── types/
│       └── index.ts                # 공통 타입 정의 (Project, Document, Blueprint 등)
└── tests/
    ├── pages/
    │   ├── DashboardPage.test.tsx
    │   ├── WikiPage.test.tsx
    │   └── BlueprintPage.test.tsx
    └── components/
        ├── ProjectCard.test.tsx
        ├── StepList.test.tsx
        └── EmptyState.test.tsx
```

**Structure Decision**: `apps/sfood` 패키지를 참조 구조로 사용. pages/(화면) + components/(도메인별) + mock/(Mock 데이터) 분리 구조 채택. 라우팅은 `src/App.tsx`에서 중앙 관리.

## Complexity Tracking

> 헌법 위반 항목 없음 — 이 섹션은 해당 없음
