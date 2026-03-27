# @myorg/tokens

Design token package for the B2C color, typography, and motion system.

## Entry Points

- `@myorg/tokens`: TypeScript constants and types.
- `@myorg/tokens/tailwind`: Tailwind preset for colors, typography, and radii.
- `@myorg/tokens/css`: shadcn/ui-compatible CSS variables.

## Usage

```ts
import tokensPreset from '@myorg/tokens/tailwind';
import { colors, motion } from '@myorg/tokens';
```

```css
@import '@myorg/tokens/css';
```

## Commands

- `pnpm --filter @myorg/tokens build`
- `pnpm --filter @myorg/tokens test`
- `pnpm --filter @myorg/tokens check-contrast`

## Dependency Licenses

- `pnpm`: MIT
- `turbo`: MIT
- `tsup`: MIT
- `vitest`: MIT
- `framer-motion`: MIT
