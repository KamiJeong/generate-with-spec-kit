# generate-with-spec-kit Development Guidelines

## Stack
TypeScript 5.x, React 18+, Storybook 10.3.3 (`@storybook/react-vite`), Tailwind CSS v4, shadcn/ui, Radix UI, Biome v2.4.9, Vitest 2.x, tsup v8, `@storybook/experimental-addon-test`, `pretendard`, `@fontsource/noto-sans-kr`

## Project Structure

```text
packages/
  tokens/
    src/
    tests/
  ui/
    src/
    .storybook/
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


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
