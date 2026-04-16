# @kamijeong/tokens

Design token package for the B2C color, typography, and motion system.

## Entry Points

- `@kamijeong/tokens`: TypeScript constants and types.
- `@kamijeong/tokens/tailwind`: Tailwind preset for colors, typography, and radii.
- `@kamijeong/tokens/css`: shadcn/ui-compatible CSS variables.

## Usage

```ts
import tokensPreset from '@kamijeong/tokens/tailwind';
import { colors, motion } from '@kamijeong/tokens';
```

```css
@import '@kamijeong/tokens/css';
```

## Commands

- `pnpm --filter @kamijeong/tokens build`
- `pnpm --filter @kamijeong/tokens test`
- `pnpm --filter @kamijeong/tokens check-contrast`

## Dependency Licenses

- `pnpm`: MIT
- `turbo`: MIT
- `tsup`: MIT
- `vitest`: MIT
- `framer-motion`: MIT
