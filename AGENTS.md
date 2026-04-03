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