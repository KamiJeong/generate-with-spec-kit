# Contract: CSS Variables (`@tokens/css`)

**Entry point**: `@tokens/css` (`packages/tokens/src/css/base.css`)
**Consumers**: 소비 앱의 `globals.css` (또는 `app/layout.tsx` 임포트)

---

## CSS 변수 전체 정의

```css
/* @layer base 내에 선언. shadcn/ui 규약 준수. */
@layer base {
  :root {
    /* ── Layout ─────────────────────────────── */
    --radius: 0.5rem;

    /* ── Background / Foreground ────────────── */
    --background:           0 0% 100%;
    --foreground:           240 6% 4%;

    /* ── Card ───────────────────────────────── */
    --card:                 0 0% 100%;
    --card-foreground:      240 6% 4%;

    /* ── Popover ────────────────────────────── */
    --popover:              0 0% 100%;
    --popover-foreground:   240 6% 4%;

    /* ── Primary (Brand Red #d92b33) ────────── */
    --primary:              357 70% 51%;
    --primary-foreground:   0 0% 100%;

    /* ── Secondary ──────────────────────────── */
    --secondary:            240 5% 96%;
    --secondary-foreground: 240 4% 10%;

    /* ── Muted ───────────────────────────────── */
    --muted:                240 5% 96%;
    --muted-foreground:     240 4% 46%;

    /* ── Accent ──────────────────────────────── */
    --accent:               240 6% 90%;
    --accent-foreground:    240 4% 10%;

    /* ── Destructive (v1 = primary) ──────────── */
    --destructive:          357 70% 51%;
    --destructive-foreground: 0 0% 100%;

    /* ── Border / Input / Ring ───────────────── */
    --border:               240 6% 90%;
    --input:                240 6% 90%;
    --ring:                 357 70% 51%;
  }
}
```

---

## 소비 앱 통합 방법

**방법 A — CSS @import (권장)**

```css
/* apps/web/src/styles/globals.css */
@import '@tokens/css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**방법 B — Next.js app/layout.tsx**

```typescript
// apps/web/app/layout.tsx
import '@tokens/css';
```

---

## 변수 값 형식

- 모든 컬러 변수는 **bare HSL 숫자** (예: `357 70% 51%`) 형식.
- `hsl()` 래퍼 없이 정의해야 Tailwind의 `<alpha-value>` 불투명도 유틸리티가 동작한다.
  ```css
  /* ❌ 잘못된 형식 */
  --primary: hsl(357, 70%, 51%);

  /* ✅ 올바른 형식 */
  --primary: 357 70% 51%;
  ```

---

## 커스터마이즈 방법

소비 앱에서 특정 변수만 오버라이드 가능:

```css
/* apps/web/src/styles/globals.css */
@import '@tokens/css';

/* 특정 앱 전용 오버라이드 */
:root {
  --radius: 0.75rem; /* 더 둥근 모서리 */
}
```
