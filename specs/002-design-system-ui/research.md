# 리서치: 디자인 시스템 UI 구현

**Phase 0 출력** | **날짜**: 2026-03-27 (v2: 버전 업데이트 2026-03-27) | **Branch**: `002-design-system-ui`

---

## 1. shadcn/ui monorepo 설치 패턴

**결정**: `packages/ui` 디렉터리에 `components.json`을 위치시키고 `pnpm dlx shadcn@latest add` 명령으로 컴포넌트를 개별 추가

**근거**:
- shadcn/ui는 컴포넌트 코드를 소유(own)하는 방식. 설치 경로는 `components.json`의 `aliases.components`로 제어
- monorepo 루트가 아닌 패키지 내부에 설치하면 독립적인 빌드 단위 유지 가능
- shadcn/ui 최신은 Tailwind v4를 기본 지원. `components.json`에서 `tailwind.css` 키가 `tailwind.config.ts` 대신 CSS 파일 경로를 가리킴

**검토한 대안**:
- 루트에 설치 후 패키지로 re-export: 빌드 복잡도 증가, 경로 관리 어려움 → 기각
- 직접 구현 (shadcn/ui 미사용): Radix UI 바인딩, 접근성, 스타일 중복 작업 → 기각

---

## 2. Storybook v10 + Vite 설정

**결정**: Storybook 10.3.3 (Vite builder 내장), `packages/ui`에 `.storybook/` 포함

**근거**:
- Storybook v10.3.3은 Vite builder가 기본 통합되어 별도 `@storybook/react-vite` 패키지 불필요
- `@storybook/test` 10.3.3에 내장 — play functions, `userEvent`, `expect` 모두 포함
- `@storybook/test-runner 0.24.3`으로 Playwright 기반 실제 브라우저 테스트
- Tailwind v4와의 통합: CSS `@import "tailwindcss"` 방식으로 preview.ts에서 로드
- HMR 속도, TypeScript 네이티브 지원, React 18 호환성 우수

**`packages/ui/.storybook/preview.ts` 핵심 설정**:
```ts
// @myorg/tokens CSS 변수 로드 (토큰 CSS custom properties 포함)
import '@myorg/tokens/src/css/base.css'
// Tailwind v4 CSS 로드 (tailwind.config.ts 없이 CSS-first 방식)
import '../src/index.css'
```

**`packages/ui/.storybook/main.ts` 핵심 설정**:
```ts
import type { StorybookConfig } from 'storybook/react-vite'  // v10.3.3 통합 패키지

const config: StorybookConfig = {
  framework: 'storybook/react-vite',  // v10.3.3: 단일 패키지
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
}
```

**검토한 대안**:
- Webpack builder: 느린 빌드, Tailwind v4 JIT 설정 복잡 → 기각
- Chromatic: 시각적 회귀 테스트 외부 서비스, v1 범위 초과 → 보류

---

## 3. Tailwind CSS v4 설정

**결정**: Tailwind CSS v4 (CSS-first 설정 방식)

**근거**:
- Tailwind v4는 `tailwind.config.ts` 대신 CSS 파일 내 `@theme` 블록으로 테마 커스터마이징
- shadcn/ui 최신이 Tailwind v4를 기본 지원
- `@myorg/tokens`의 CSS custom properties와 직접 연결 가능 (`:root` 변수 → `@theme` 참조)
- v3 대비 빌드 속도 개선 (Rust 기반 엔진)

**`packages/ui/src/index.css` 핵심 구조**:
```css
@import "tailwindcss";

/* @myorg/tokens CSS 변수를 Tailwind v4 테마에 연결 */
@theme {
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-destructive: var(--color-destructive);
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-border: var(--color-border);
  --color-input: var(--color-input);
  --color-ring: var(--color-ring);
  --radius: var(--radius);
  /* ... 전체 토큰 목록은 @myorg/tokens 참고 */
}
```

**검토한 대안**:
- Tailwind v3 유지: shadcn/ui 최신 버전과 호환성 불확실, v4가 장기 지원 방향 → 기각
- CSS-in-JS: shadcn/ui 아키텍처와 불일치 → 기각

---

## 4. 자동화 UI 테스트 전략

**결정**: Storybook 10.3.3 `play` 함수 + `@storybook/test-runner 0.24.3` + `@storybook/addon-a11y`

**근거**:
- `play` 함수는 스토리 내부에 인터랙션 시나리오를 직접 정의 → 별도 테스트 파일 불필요
- `@storybook/test-runner`는 Playwright 기반으로 실제 브라우저에서 play 함수 실행 (v10 호환)
- `@storybook/addon-a11y`는 axe-core를 통해 WCAG 2.1 AA 자동 검사

**v10 play 함수 최소 테스트 패턴**:
```ts
import { expect, within, userEvent } from '@storybook/test'  // v10.3.3 내장

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // 1. 렌더링 확인
    expect(canvas.getByRole('...')).toBeInTheDocument()
    // 2. 기본 인터랙션
    await userEvent.click(canvas.getByRole('button'))
  }
}
```

**검토한 대안**:
- Vitest + @testing-library/react: 단위 테스트에 적합하나 시각적 검증 불가 → v1 범위 초과
- Playwright 독립 테스트: Storybook과 이중 관리 필요 → 기각

---

## 5. 디자인 토큰 연결 방식

**결정**: `@myorg/tokens`의 CSS custom properties를 Tailwind v4 `@theme` 블록에서 참조

**근거**:
- `packages/tokens/src/css/base.css`가 CSS 변수를 `:root`에 정의
- Tailwind v4의 `@theme` 블록에서 `var(--color-*)` 참조 → 토큰 변경 시 자동 반영
- shadcn/ui의 CSS variable 기반 테마 시스템과 자연스럽게 호환
- `tailwind.config.ts` 불필요 → 설정 파일 수 감소 (단순성 원칙 준수)

**검토한 대안**:
- Tailwind v3 preset 방식 (`presets: [preset]`): Tailwind v4에서 미지원 → 기각
- 토큰 값 하드코딩: FR-002 직접 위반 → 기각

---

## 6. 컴포넌트별 특이사항 및 의존성 버전

### 주요 라이브러리 버전

| 라이브러리 | 버전 | 비고 |
|-----------|------|------|
| Storybook | 10.3.3 | `storybook/react-vite` framework, `@storybook/test` 내장 |
| @storybook/test-runner | 0.24.3 | Playwright 기반, Storybook 10.3.3 호환 |
| Biome | v2.4.9 | ESLint 대체 — lint + format 통합 도구 |
| Tailwind CSS | v4+ | CSS-first 설정, `tailwind.config.ts` 미사용 |
| react-day-picker | 9.14.0 | v8 → v9 API 변경: `mode` prop 필수, `selected` → `defaultSelected` 등 |
| @tanstack/react-table | 8.21.3 | Data Table 기반 |
| cmdk | 1.1.1 | Command 컴포넌트 기반 |
| recharts | 3.8.x | Chart 컴포넌트 기반 (v3 사용 — v2 대비 호환) |
| embla-carousel-react | 8.6.0 | Carousel 기반 |
| sonner | 2.0.7 | Sonner toast 기반 |

### Chart
- `recharts` v3.8.x 사용 (shadcn/ui Chart는 recharts 래퍼, v2 호환 API 유지)
- 색상은 `@myorg/tokens`의 chart 토큰 CSS 변수 참조

### Calendar / Date Picker
- `react-day-picker v9` 필요 (v8과 API 다름: `mode` 필수 prop, `fromDate`/`toDate` → `disabled` 함수로 변경)
- Date Picker = Calendar + Popover 조합

### Combobox / Command
- Command는 `cmdk` v1 기반
- Combobox = Command + Popover 조합

### Data Table
- `@tanstack/react-table v8` 필요
- 정렬, 필터, 페이지네이션은 테이블 설정으로 구성

### Sidebar
- shadcn/ui Sidebar는 Context + Compound component 패턴
- `use-sidebar` 훅 포함

### Sonner
- `sonner` 라이브러리 직접 래핑 (toast 알림)

---

## 7. 패키지 의존성 목록

### `packages/ui/package.json` 핵심 의존성

```json
{
  "dependencies": {
    "@myorg/tokens": "workspace:*",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.0",
    "cmdk": "^1.1.1",
    "react-day-picker": "^9.14.0",
    "recharts": "^3.8.0",
    "@tanstack/react-table": "^8.21.3",
    "sonner": "^2.0.7",
    "embla-carousel-react": "^8.6.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^2.4.9",
    "storybook": "10.3.3",
    "@storybook/test": "10.3.3",
    "@storybook/test-runner": "0.24.3",
    "@storybook/addon-a11y": "10.3.3",
    "@storybook/addon-essentials": "10.3.3",
    "tailwindcss": "^4.1.4"
  }
}
```

> **참고**: Storybook v10에서는 `@storybook/react-vite` 대신 `storybook` 단일 패키지가 `storybook/react-vite` 경로로 framework를 내보냄. ESLint는 Biome v2.4.9로 대체. `framer-motion`은 실제 미사용으로 의존성 목록에서 제거.
