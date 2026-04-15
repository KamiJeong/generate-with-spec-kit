# Implementation Plan: AI Wiki Portal Platform Screen

**Branch**: `022-ai-wiki-portal` | **Date**: 2026-04-15 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/022-ai-wiki-portal/spec.md`

## Summary

비개발자가 AI 개발 Wiki 문서를 탐색하고, 요구사항 입력 기반 mock Blueprint 결과를 확인하며, mock 프로젝트 진행 상태를 역할 관점별로 모니터링할 수 있는 화면 중심 포털을 새 앱 `apps/ai-wiki-portal-platform-by-codex`에 구현한다. 기술 접근은 기존 monorepo의 React/Vite/Tailwind 4 구성과 `@myorg/ui`, `@myorg/tokens`를 재사용하고, API 없이 타입 안전한 mock data와 UI 계약 테스트로 사용자 흐름을 검증한다.

## Technical Context

**Language/Version**: TypeScript 5.9, React 19  
**Primary Dependencies**: Vite 6, React Router 6, Tailwind CSS 4, `@myorg/ui`, `@myorg/tokens`, `lucide-react`, Vitest, Testing Library  
**Storage**: N/A - 화면 검증용 in-memory mock data만 사용하며 영속 저장은 범위 밖  
**Testing**: Vitest + Testing Library + user-event, TDD 순서로 user-story tests 작성 후 구현  
**Target Platform**: Desktop 및 small-screen browser SPA  
**Project Type**: Frontend web application  
**Performance Goals**: 주요 사용자 상호작용 피드백 200ms 이내, 초기 콘텐츠 표시 1.5초 이내 목표, 검색/필터 결과 즉시 표시  
**Constraints**: `/DESIGN.md`와 `@myorg/ui` 컴포넌트 우선, semantic token만 사용, labeled form controls는 `Field`로 감싸기, WCAG 2.1 AA 키보드/포커스 기준 준수, API/실시간 연동 없음  
**Scale/Scope**: 새 앱 1개, 핵심 route 5개 내외, mock 문서 8개 이상, mock 프로젝트 4개 이상, 역할 관점 3개

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Evidence |
|-----------|------|--------|----------|
| I. 코드 품질 | 타입 안전한 모듈 경계, 명확한 이름, 중복 최소화 | PASS | mock data, route, page, shared component를 분리하고 불필요한 추상화는 도입하지 않는다. |
| II. 테스트 표준 | 테스트 먼저 작성, 핵심 사용자 흐름 검증 | PASS | Blueprint 입력, Wiki 검색/문서 보기, role perspective, simulated monitoring, empty/error states를 Testing Library로 검증한다. |
| III. 사용자 경험 일관성 | 디자인 시스템, 명시적 상태, 접근성 | PASS | `@myorg/ui` Sidebar, Card, Button, Field, Input/Textarea, Badge, Progress, Empty, Alert를 우선 사용한다. |
| IV. 성능 요구사항 | 초기 로드와 상호작용 응답 목표 명시 | PASS | lazy route, 작은 mock dataset, 파생 상태 memoization으로 FCP와 200ms feedback 목표를 유지한다. |
| V. 단순성 | API/권한/저장소 구현 제외, 현재 화면 범위만 구현 | PASS | mock 역할 관점과 simulated monitoring만 제공하고 실제 auth, Confluence, GitHub live integration은 제외한다. |
| 문서 언어 정책 | Speckit 산출물 한국어 작성 | PASS | plan, research, data-model, quickstart는 한국어로 작성한다. |

## Project Structure

### Documentation (this feature)

```text
specs/022-ai-wiki-portal/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
apps/ai-wiki-portal-platform-by-codex/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── routes.tsx
│   ├── types/
│   │   └── index.ts
│   ├── mock/
│   │   ├── blueprints.ts
│   │   ├── documents.ts
│   │   ├── github.ts
│   │   ├── projects.ts
│   │   ├── roles.ts
│   │   └── steps.ts
│   ├── components/
│   │   ├── blueprint/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── project/
│   │   ├── shared/
│   │   └── wiki/
│   └── pages/
│       ├── BlueprintPage.tsx
│       ├── DashboardPage.tsx
│       ├── GetStartedPage.tsx
│       ├── ProjectDetailPage.tsx
│       ├── WikiDocPage.tsx
│       └── WikiPage.tsx
└── tests/
    ├── setup.ts
    ├── BlueprintPage.test.tsx
    ├── DashboardPage.test.tsx
    ├── ProjectDetailPage.test.tsx
    ├── RolePerspective.test.tsx
    └── WikiPage.test.tsx
```

**Structure Decision**: 새 앱은 사용자가 지정한 `apps/ai-wiki-portal-platform-by-codex`에 생성한다. 기존 `apps/ai-wiki-portal-platform-by-claude`는 참고용 sibling app으로만 활용하고, Codex 앱은 별도 package name과 테스트를 가진 독립 workspace package로 계획한다.

## Phase 0: Research

Research decisions are captured in [research.md](./research.md). No `NEEDS CLARIFICATION` items remain.

## Phase 1: Design & Contracts

Design artifacts are captured in:

- [data-model.md](./data-model.md)
- [contracts/ui-contract.md](./contracts/ui-contract.md)
- [quickstart.md](./quickstart.md)

## Constitution Check - Post-Design

| Principle | Status | Post-design evidence |
|-----------|--------|----------------------|
| I. 코드 품질 | PASS | Data model defines bounded entities and state enums; UI contract avoids hidden behavior. |
| II. 테스트 표준 | PASS | Quickstart requires failing user-story tests before implementation and package-level coverage check. |
| III. 사용자 경험 일관성 | PASS | UI contract requires design-system components, Field-wrapped forms, semantic tokens, keyboard flow, and explicit empty/loading/error states. |
| IV. 성능 요구사항 | PASS | Contract includes 200ms feedback and 1.5s initial content targets for mocked SPA interactions. |
| V. 단순성 | PASS | Contracts explicitly exclude production auth, live GitHub, live Confluence, and persistent Blueprint creation. |
| 문서 언어 정책 | PASS | Generated planning artifacts are Korean with English only for package names, commands, and common technical terms. |

## Complexity Tracking

No constitution violations. No complexity exceptions required.
