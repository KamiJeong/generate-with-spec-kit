# generate-with-spec-kit Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-27

## Active Technologies

- TypeScript 5.x + Tailwind CSS v3+, shadcn/ui (latest), framer-motion v11+, tsup v8+ (001-design-token-system)
- TypeScript 5.x + Tailwind CSS v4, Storybook 10.3.3, Biome v2.4.9, shadcn/ui, Radix UI, tsup v8 (002-design-system-ui)

## Project Structure

```text
packages/
  tokens/
    src/
    tests/
  ui/
    src/
    .storybook/
    storybook-static/
```

## Commands

pnpm --filter @myorg/tokens build
pnpm --filter @myorg/tokens test
pnpm --filter @myorg/tokens lint
pnpm --filter @myorg/ui build
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui build-storybook

## Code Style

TypeScript 5.x: Follow standard conventions

## Recent Changes

- 001-design-token-system: Added TypeScript 5.x + Tailwind CSS v3+, shadcn/ui (latest), framer-motion v11+, tsup v8+
- 002-design-system-ui: Added `@myorg/ui` package scaffold, Storybook configuration, and initial component/stories baseline

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
