# Quickstart: B2C 디자인 토큰 시스템

**Branch**: `001-design-token-system` | **Date**: 2026-03-27

## 전제 조건

- pnpm 8.x 이상
- Node.js 18.x 이상
- 소비 앱에 Tailwind CSS v3+, shadcn/ui, React 18+ 설치됨

---

## 1. 모노레포 초기 설정

```bash
# 루트 package.json (pnpm workspaces)
pnpm init

# pnpm-workspace.yaml 생성
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'packages/*'
  - 'apps/*'
EOF

# Turborepo 설치
pnpm add -Dw turbo
```

---

## 2. 토큰 패키지 생성

```bash
mkdir -p packages/tokens/src/{primitives,semantic,tailwind,css}
cd packages/tokens
pnpm init
```

`packages/tokens/package.json`:

```json
{
  "name": "@myorg/tokens",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./tailwind": {
      "types": "./dist/tailwind/preset.d.ts",
      "import": "./dist/tailwind/preset.js",
      "require": "./dist/tailwind/preset.cjs"
    },
    "./css": "./src/css/base.css"
  },
  "devDependencies": {
    "tsup": "^8.x",
    "typescript": "^5.x"
  }
}
```

---

## 3. 소비 앱에서 설치

```bash
# apps/web의 package.json dependencies에 추가
pnpm --filter web add @myorg/tokens@workspace:*
```

---

## 4. Tailwind 설정 적용

```typescript
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';
import tokensPreset from '@myorg/tokens/tailwind';

export default {
  presets: [tokensPreset],
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
} satisfies Config;
```

---

## 5. CSS 변수 적용

```css
/* apps/web/src/styles/globals.css */
@import '@myorg/tokens/css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 6. shadcn/ui 컴포넌트 추가 (예시)

CSS 변수가 이미 설정되어 있으므로 shadcn/ui 컴포넌트를 그대로 추가한다:

```bash
pnpm dlx shadcn@latest add button card input
```

별도 스타일 수정 없이 브랜드 토큰이 자동 적용된다.

---

## 7. framer-motion에서 토큰 사용

```tsx
// apps/web/src/components/AnimatedCard.tsx
import { motion as m } from 'framer-motion';
import { motion as tokens } from '@myorg/tokens';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: tokens.duration.normal,
        ease: tokens.easing.easeOut,
      }}
      className="bg-card border border-border rounded-lg p-6"
    >
      {children}
    </m.div>
  );
}
```

---

## 8. 기본 사용 패턴 요약

| 목적 | 방법 |
|------|------|
| 배경색 | `bg-background`, `bg-card`, `bg-secondary` |
| 텍스트 | `text-foreground`, `text-muted-foreground` |
| 브랜드 액션 (CTA) | `bg-primary text-primary-foreground` |
| 경계선 | `border-border` |
| 포커스 링 | `ring-ring` (shadcn/ui 자동 적용) |
| 불투명도 변형 | `bg-primary/10`, `text-foreground/80` |
| framer-motion 타이밍 | `tokens.duration.normal`, `tokens.easing.easeOut` |

---

## 검증

설정 완료 후 아래를 확인한다:

1. **색상 렌더링**: shadcn/ui Button의 기본 variant가 `#d92b33` 계열로 표시된다.
2. **폰트**: 텍스트에 NanumBarunGothic(로드된 경우) 또는 폴백 폰트가 적용된다.
3. **불투명도 유틸리티**: `bg-primary/20` 클래스가 올바르게 동작한다.
4. **접근성**: Browser DevTools → Accessibility → Color Contrast에서 주요 색상 조합이 4.5:1 이상임을 확인한다.
