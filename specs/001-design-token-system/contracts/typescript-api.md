# Contract: TypeScript API (`@tokens`)

**Entry point**: `@tokens` (default export, `packages/tokens/src/index.ts`)
**Consumers**: framer-motion 애니메이션, 런타임 색상 참조, 토큰 타입 사용

---

## 익스포트 인터페이스

```typescript
// 원시 컬러 팔레트
export const colors: {
  gray: Record<'50'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'|'950', string>;
  primary: Record<'50'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'|'950', string>;
};

// 브랜드 기준값 단축 접근
export const brandColor: string; // '#d92b33'

// 폰트 패밀리
export const fontFamily: {
  sans: string[]; // ["NanumBarunGothic", "AppleGothic", "Tahoma", "Arial", "sans-serif"]
};

// 모션 토큰 (framer-motion 직접 사용)
export const motion: {
  duration: {
    fast: number;    // 0.15
    normal: number;  // 0.25
    slow: number;    // 0.4
  };
  easing: {
    ease: [number, number, number, number];
    easeIn: [number, number, number, number];
    easeOut: [number, number, number, number];
    spring: { type: 'spring'; stiffness: number; damping: number };
  };
};

// 시맨틱 토큰 (CSS 변수 참조 문자열)
export const semantic: {
  background: string;       // 'hsl(var(--background))'
  foreground: string;       // 'hsl(var(--foreground))'
  primary: string;          // 'hsl(var(--primary))'
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
};

// TypeScript 타입
export type ColorScale = keyof typeof colors.gray;
export type SemanticColor = keyof typeof semantic;
```

---

## 사용 예시

```typescript
import { colors, motion, semantic, brandColor } from '@tokens';
import { motion as m } from 'framer-motion';

// framer-motion 타이밍 토큰 사용
<m.div
  animate={{ opacity: 1 }}
  transition={{ duration: motion.duration.normal, ease: motion.easing.easeOut }}
/>

// framer-motion 색상 애니메이션 (CSS variable 경유)
<m.button
  whileHover={{ backgroundColor: 'var(--accent)' }}
  style={{ backgroundColor: 'var(--primary)' }}
/>

// 런타임 색상 참조
const style = { color: colors.primary['500'] }; // '#d92b33'
```

---

## 버전 안정성

- `colors`, `fontFamily`, `motion`, `brandColor`: **stable** (v1.0.0~)
- `semantic`: **stable** (shadcn/ui CSS 변수 변경 시 함께 버전업)
