# Research: Storybook 디자인 토큰 스토리 개선

**Branch**: `009-storybook-token-stories` | **Date**: 2026-04-06

## 조사 결과 요약

### 1. Spacing 토큰 출처

- **Decision**: Tailwind 기본 spacing 스케일 사용. `packages/tokens/src/tailwind/preset.ts`는 spacing을 오버라이드하지 않으므로 Tailwind 기본값(0~96 범위의 표준 스케일)이 그대로 적용된다.
- **Rationale**: 별도 spacing 파일이 없고, 사용자가 명시적으로 Tailwind preset 기반으로 확인. 새로운 토큰 파일 추가는 범위 밖.
- **Alternatives considered**: `@myorg/tokens`에 spacing 전용 파일 추가 → 스펙 Q5에서 기각.
- **Tailwind 기본 spacing 스케일 (주요 값)**: px, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96

### 2. Motion 토큰 구조 (packages/tokens/src/motion/index.ts)

- **Decision**: `motion` 객체의 `duration`과 `easing` 키를 직접 임포트하여 시각화.
- **Verified structure**:
  ```
  duration: { fast: 0.15s, normal: 0.25s, slow: 0.4s }
  easing: {
    ease: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 }
  }
  ```
- **Motion 가이드 스토리 접근법**: 각 easing을 박스 슬라이드 애니메이션으로 표시하되, CSS transition을 사용해 Storybook 의존성 없이 구현.

### 3. Color 토큰 구조 (semantic light + dark)

- **Decision**: Primitive 색상 팔레트(brand, gray, destructivePalette)와 semantic 라이트(`semanticHsl`) + 다크(`semanticHslDark`) 토큰을 모두 시각화.
- **Verified sources**:
  - Primitive: `packages/tokens/src/primitives/colors.ts` — gray(11단계), brand(11단계), destructivePalette, primary 등
  - Semantic light: `packages/tokens/src/semantic/index.ts` — `semanticHsl` (배경, 전경, primary, secondary 등 23개 키)
  - Semantic dark: `packages/tokens/src/semantic/dark.ts` — `semanticHslDark` (동일 23개 키, 다크 값)
- **Side-by-side 구현**: 단일 스토리 내 두 열로 배치, `hsl()` 값을 CSS background-color로 직접 렌더링.

### 4. Typography 토큰 구조

- **Decision**: `fontFamily`, `fontWeight`를 임포트하여 샘플 텍스트와 함께 표시.
- **Verified sources**: `packages/tokens/src/primitives/typography.ts`
  - `fontFamily.sans`: Pretendard Variable 우선 폴백 체인
  - `fontFamily.heading`: 동일
  - `fontFamily.mono`: JetBrains Mono 우선
  - `fontWeight`: normal(400), medium(500), semibold(600), bold(700)
- **Font size**: Tailwind 기본 폰트 스케일(xs, sm, base, lg, xl, 2xl~9xl) 사용.

### 5. 기존 스토리 현황 분석

**이미 AllVariants 갤러리 보유 (작업 불필요)**:
- `button.stories.tsx` — `Variants`, `Sizes`, `IconSizes` 갤러리 존재
- `badge.stories.tsx` — `Variants` 갤러리 존재

**AllVariants/AllSizes 갤러리 미보유 (추가 필요)**:
- `alert.stories.tsx` — Default + Destructive named story 있음, 갤러리 없음
- `avatar.stories.tsx` — Default + Small + Large named story 있음, `AllSizes` 없음
- `switch.stories.tsx` — Default + Small named story 있음, `AllSizes`/`AllStates` 없음
- 추가 조사 필요: `spinner`, `tabs`, `accordion`, `card`, `input`, `checkbox`, `progress`, `navigation-menu`

**카테고리 폴더 현황**:
- 대부분의 컴포넌트 스토리가 이미 `title: 'Components/X'` 패턴을 따름 ✅
- 페이지 스토리 (`DashboardPage`, `AuthPage`, `FormPage`, `SettingsPage`)의 layout 옵션 확인 필요

### 6. Storybook 10.3.3 가이드 스토리 구성 모범 사례

- **Decision**: 가이드 스토리는 `title: 'Typography/Overview'` 형식으로 최상위 카테고리 직속으로 배치.
- **Rationale**: Storybook 10.x는 `title`의 슬래시(`/`) 구분자로 자동 폴더 계층을 생성. 별도 설정 불필요.
- **헬퍼 패턴**: 가이드 스토리에서 반복되는 색상 견본, 스페이싱 바 등은 `_helpers.tsx`의 순수 React 컴포넌트로 추출하여 DRY 원칙 준수.
