# 토큰 패키지 공개 API 계약 (Token Package Contract)

**패키지**: `@myorg/tokens`  
**Branch**: `008-design-token-improve` | **Date**: 2026-04-06

---

## TypeScript Export 계약

### 원시 팔레트 (Primitive Palettes)

```typescript
// packages/tokens/src/primitives/colors.ts

export const brand: Record<'50'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'|'950', string>
// brand['600'] === '#d92b33' (불변 계약)

export const brandHsl: Record<'50'|...|'950', string>
// brandHsl['600'] === '357 70% 51%' (불변 계약)

export const destructivePalette: Record<'50'|...|'950', string>
// hue(destructivePalette['600']) 와 hue(brand['600']) 차이 ≥ 15° (계약)

export const destructiveHsl: Record<'50'|...|'950', string>

export const gray: Record<'50'|...|'950', string>
export const grayHsl: Record<'50'|...|'950', string>
```

### 의미론적 토큰 (Semantic Tokens)

```typescript
// packages/tokens/src/semantic/index.ts

export const semanticHsl: {
  background: string;
  foreground: string;
  card: string; cardForeground: string;
  popover: string; popoverForeground: string;
  primary: string; primaryForeground: string;
  secondary: string; secondaryForeground: string;
  muted: string; mutedForeground: string;
  accent: string; accentForeground: string;
  destructive: string; destructiveForeground: string;
  // destructive !== primary (불변 계약)
  border: string; input: string; ring: string;
  chart1..chart5: string; chartGrid: string; chartSurface: string;
}

export const semanticHslDark: typeof semanticHsl
// 위와 동일 구조, 다크 모드 값

export const semantic: typeof semanticHsl
// CSS var(--token) 참조 형태 (기존 동일)
```

### 폰트 토큰 (Font Tokens)

```typescript
// packages/tokens/src/primitives/typography.ts

export const fontFamily: {
  sans: string[];   // ['Pretendard Variable', 'Pretendard', 'Noto Sans KR', ...]
  heading: string[]; // sans와 동일
  mono: string[];   // ['JetBrains Mono', 'Fira Code', ...]
}

export const fontWeight: {
  normal: '400';
  medium: '500';
  semibold: '600';
  bold: '700';
}
```

### 테마 유틸리티 (Theme Utils)

```typescript
// packages/tokens/src/theme-utils.ts

export type Theme = 'light' | 'dark' | 'system'

export function getTheme(): Theme
// localStorage['theme'] 반환. 미설정 시 'system'.

export function setTheme(theme: Theme): void
// document.documentElement.setAttribute('data-theme', resolved)
// localStorage.setItem('theme', theme)

export function initTheme(): void
// 페이지 최초 로드 시 호출. localStorage 우선, 없으면 prefers-color-scheme.
// <script>에서 인라인 호출로 FOUC 방지.
```

---

## CSS Custom Properties 계약

### `:root` 변수 (라이트 모드 기본값)

| CSS 변수 | 계약 값 |
|----------|---------|
| `--primary` | `brandHsl['600']` (357 70% 51%) |
| `--destructive` | `destructiveHsl['600']` (22 93% 47%) |
| `--font-sans` | Pretendard 폰트 스택 |
| `--font-heading` | Pretendard 폰트 스택 |
| `--font-mono` | JetBrains Mono 폰트 스택 |

**불변 계약**: `--primary` ≠ `--destructive` (이 두 변수는 절대 동일한 색상값을 가져서는 안 됨).

### `.dark` / `[data-theme='dark']` 오버라이드

모든 semantic 변수가 다크 모드 값으로 재정의됨. 기존 사이드바 변수 유지.

---

## 파괴적 변경 (Breaking Changes)

| 항목 | 변경 전 | 변경 후 | 영향 |
|------|---------|---------|------|
| `primaryHsl` export 이름 | `primaryHsl` | `brandHsl` (별칭: `primaryHsl` deprecated) | semantic/index.ts 내부 참조 업데이트 필요 |
| `--primary` HSL 값 | `357 70% 51%` | `357 70% 51%` (600 앵커이므로 동일 값 유지) | **변경 없음** |
| `--destructive` HSL 값 | `357 70% 51%` (brand와 동일) | `22 93% 47%` (오렌지-레드) | **시각적 변경** — 기존 red destructive를 orange-red로 교체 |

> `--primary` 값은 동일하게 유지된다. 600 앵커 전략은 스케일 내 다른 단계의 밝기를 조정하지만 `brand['600']` 자체는 `#d92b33`으로 변하지 않는다.
