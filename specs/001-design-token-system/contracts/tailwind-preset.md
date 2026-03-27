# Contract: Tailwind Preset (`@tokens/tailwind`)

**Entry point**: `@tokens/tailwind` (`packages/tokens/src/tailwind/preset.ts`)
**Consumers**: `tailwind.config.ts` (소비 앱의 Tailwind 설정 파일)

---

## Preset 객체 구조

```typescript
// @tokens/tailwind 의 default export 형태
export default {
  theme: {
    extend: {
      colors: {
        // Primary (Brand Red)
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          50: '#fff1f1',
          100: '#ffe0e1',
          200: '#ffc0c2',
          300: '#ff8e92',
          400: '#f45b62',
          500: '#d92b33',  // brand base
          600: '#b71e25',
          700: '#96161c',
          800: '#741015',
          900: '#520a0e',
          950: '#2e0405',
        },
        // Gray (Zinc-based neutral)
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        // Semantic (CSS variable references for shadcn/ui compatibility)
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"NanumBarunGothic"', 'AppleGothic', 'Tahoma', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
} satisfies import('tailwindcss').Config;
```

---

## 소비 앱 통합 방법

```typescript
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';
import tokensPreset from '@tokens/tailwind';

const config: Config = {
  presets: [tokensPreset],
  content: ['./src/**/*.{ts,tsx}'],
  // 프로젝트별 추가 설정만 여기에
};

export default config;
```

---

## 주요 제약사항

- `theme.extend` 내에 정의되므로 소비 앱의 추가 설정과 병합된다 (덮어쓰기 아님).
- CSS 변수 기반 색상(`hsl(var(--token) / <alpha-value>)`)은 반드시 `@tokens/css`의 CSS 변수가 `:root`에 선언된 상태에서 동작한다.
- `gray` 컬러는 Tailwind 기본 `gray` 팔레트를 이 Zinc 기반 값으로 **대체**한다.
