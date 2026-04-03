# generate-with-spec-kit Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-03

## Active Technologies

- TypeScript 5.x + Tailwind CSS v3+, shadcn/ui (latest), framer-motion v11+, tsup v8+ (001-design-token-system)
- TypeScript 5.x + Tailwind CSS v4, Storybook 10.3.3, Biome v2.4.9, shadcn/ui, Radix UI, tsup v8 (002-design-system-ui)
- Markdown documentation artifact — DESIGN.md + AGENTS.md for AI agent design system guidance (003-design-md)
- Storybook full variant coverage — named story exports per variant/size for AI agent discoverability (004-story-variant-coverage)

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

## Design System

- Canonical guide: `/DESIGN.md`
- For any UI task, read `/DESIGN.md` first before proposing or editing components.
- Use semantic tokens and existing `@myorg/ui` component variants from that file.

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

- 004-story-variant-coverage: Added full variant named exports to Button, Badge, Alert, Spinner, Tabs, Switch, Avatar, Sheet stories
- 003-design-md: Added DESIGN.md + AGENTS.md — design system documentation for Claude Code and Codex AI agents
- 001-design-token-system: Added TypeScript 5.x + Tailwind CSS v3+, shadcn/ui (latest), framer-motion v11+, tsup v8+

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
