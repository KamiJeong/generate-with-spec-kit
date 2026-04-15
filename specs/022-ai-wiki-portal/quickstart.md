# Quickstart: AI Wiki Portal Platform Screen

## Prerequisites

- Node.js와 pnpm은 repo 기준 설정을 따른다.
- 작업 브랜치: `022-ai-wiki-portal`
- 대상 앱 경로: `apps/ai-wiki-portal-platform-by-codex`

## 1. Install Workspace Dependencies

```powershell
pnpm install
```

## 2. Create/Verify the App Package

구현 단계에서 `apps/ai-wiki-portal-platform-by-codex` package를 생성한다. Package scripts는 다음 이름을 제공해야 한다:

```json
{
  "dev": "vite --host 127.0.0.1",
  "build": "tsc --noEmit && vite build",
  "test": "vitest run",
  "test:coverage": "vitest run --coverage",
  "lint": "eslint src tests --max-warnings=0"
}
```

## 3. TDD Order

구현 전에 실패하는 테스트를 먼저 작성한다.

```powershell
pnpm --filter @myorg/ai-wiki-portal-by-codex test
```

우선 작성할 테스트:

- Wiki 문서 category 탐색, 검색, no results, missing document
- role perspective 선택에 따른 추천 문서와 project emphasis 변경
- Blueprint 요구사항 입력, disabled state, mock generating state, mock result
- Dashboard simulated monitoring, manual refresh, blocked project help path
- Project detail GitHub status unavailable state와 recovery action
- Feedback entry가 source context를 유지하는지 검증

## 4. Implement the Screen

구현 기준:

- `@myorg/ui`와 `@myorg/tokens`를 우선 사용한다.
- `/DESIGN.md`의 semantic token, dark mode, accessibility rule을 따른다.
- labeled form control은 `Field`로 감싼다.
- raw color value와 one-off component duplication을 피한다.
- mock data는 `src/mock/*`에 두고 page/component는 typed selector로 소비한다.

## 5. Validate Locally

```powershell
pnpm --filter @myorg/ai-wiki-portal-by-codex lint
pnpm --filter @myorg/ai-wiki-portal-by-codex test:coverage
pnpm --filter @myorg/ai-wiki-portal-by-codex build
```

Acceptance 기준:

- 핵심 사용자 흐름 테스트가 통과한다.
- coverage는 80% 이상을 유지한다.
- build가 TypeScript 오류 없이 완료된다.
- keyboard navigation과 accessible labels가 테스트 또는 수동 검토로 확인된다.

## 6. Run the App

```powershell
pnpm --filter @myorg/ai-wiki-portal-by-codex dev
```

확인할 route:

- `/dashboard`
- `/wiki`
- `/wiki/:docId`
- `/blueprint`
- `/get-started`
- `/projects/:projectId`
