# AGENTS.md

## 1. Project Overview

- Repository: `generate-with-spec-kit`
- Monorepo packages:
  - `packages/tokens`: design tokens (`colors`, `semantic`, `motion`, `typography`)
  - `packages/ui`: reusable React UI components built on Tailwind and Radix
- Current documentation feature adds root-level design guidance for AI coding agents.

## 2. Design System Reference

- Canonical design-system guide: `/DESIGN.md`
- Read `/DESIGN.md` before starting any UI work.
- Treat `/DESIGN.md` as the source of truth for:
  - semantic token usage
  - component/variant selection
  - accessibility and dark-mode rules

## 3. Speckit Workflow

Follow the required flow for feature work:

1. `/speckit.specify`
2. `/speckit.plan`
3. `/speckit.tasks`
4. Implement tasks in order and keep task checkboxes updated

Do not skip directly to implementation without spec and plan artifacts.

## 4. Key Constraints

- Enforce semantic tokens over raw color values.
- Prefer existing UI components in `packages/ui/src/components` before building new ones.
- Wrap labeled form controls with `Field` for consistent aria wiring.
- Keep quality bar high: type safety, deterministic behavior, and explicit states.
- Prefer TDD where practical: tests before implementation changes.

## 5. Command Reference

- `pnpm --filter @myorg/tokens build`
- `pnpm --filter @myorg/tokens test`
- `pnpm --filter @myorg/tokens lint`
- `pnpm --filter @myorg/ui build`
- `pnpm --filter @myorg/ui lint`
- `pnpm --filter @myorg/ui build-storybook`

## 6. 사용 가능한 MCP 도구

| 도구 | 기능 |
|------|------|
| `list-all-documentation` | 전체 컴포넌트 및 문서 목록 조회 |
| `get-documentation` | 특정 컴포넌트의 props, 스토리, 사용 예시 조회 |
| `get-documentation-for-story` | 특정 스토리의 소스 코드 및 관련 문서 조회 |
| `get-storybook-story-instructions` | 스토리 작성 가이드 및 인터랙션 테스트 지침 |
| `preview-stories` | 스토리 렌더링 미리보기 (이미지 또는 링크) |
| `run-story-tests` | 스토리 테스트 실행 및 결과 반환 (접근성 이슈 포함) |
