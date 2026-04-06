# Data Model: Storybook 디자인 토큰 스토리 개선

**Branch**: `009-storybook-token-stories` | **Date**: 2026-04-06

## 개요

이 기능은 데이터베이스나 영속 저장소를 사용하지 않는다. "데이터 모델"은 각 가이드 스토리가 렌더링할 토큰 데이터의 구조를 의미한다.

---

## 1. Typography 토큰 데이터

### FontFamilyEntry

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | 폰트 패밀리 식별자 | `"sans"` |
| `stack` | `string[]` | 폰트 폴백 체인 | `["Pretendard Variable", "Pretendard", ...]` |
| `sampleText` | `string` | 미리보기 텍스트 | `"가나다 ABC 123"` |

**출처**: `packages/tokens/src/primitives/typography.ts` → `fontFamily`

### FontWeightEntry

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | weight 식별자 | `"semibold"` |
| `value` | `string` | CSS font-weight 값 | `"600"` |

**출처**: `packages/tokens/src/primitives/typography.ts` → `fontWeight`

### FontSizeEntry (Tailwind 기본 스케일)

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | 크기 식별자 | `"xl"` |
| `value` | `string` | CSS 값 | `"1.25rem"` |

**출처**: Tailwind CSS 기본 fontSize 스케일

---

## 2. Color 토큰 데이터

### ColorSwatch

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | 색상 이름 | `"brand-500"` |
| `value` | `string` | hex 또는 hsl 값 | `"#ea2d37"` |
| `group` | `string` | 팔레트 그룹 | `"brand"` |

### PrimitiveColorGroup

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | 팔레트 이름 | `"gray"` |
| `swatches` | `ColorSwatch[]` | 색상 견본 배열 | `[{name:"50", value:"#fafafa"}, ...]` |

**출처**: `packages/tokens/src/primitives/colors.ts` — gray, brand, destructivePalette, primary

### SemanticColorPair

| 필드 | 타입 | 설명 |
|------|------|------|
| `name` | `string` | semantic 토큰 이름 |
| `light` | `string` | 라이트 모드 HSL 값 |
| `dark` | `string` | 다크 모드 HSL 값 |

**출처**: 
- `packages/tokens/src/semantic/index.ts` → `semanticHsl` (라이트)
- `packages/tokens/src/semantic/dark.ts` → `semanticHslDark` (다크)

---

## 3. Spacing 토큰 데이터

### SpacingEntry

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | spacing 키 | `"4"` |
| `value` | `string` | CSS 값 | `"1rem"` |
| `px` | `number` | 픽셀 환산 값 | `16` |

**출처**: Tailwind CSS 기본 spacing 스케일 (preset.ts에서 오버라이드 없음)

**주요 스케일**: `0.5(2px)`, `1(4px)`, `2(8px)`, `3(12px)`, `4(16px)`, `5(20px)`, `6(24px)`, `8(32px)`, `10(40px)`, `12(48px)`, `16(64px)`, `20(80px)`, `24(96px)`, `32(128px)`

---

## 4. Motion 토큰 데이터

### DurationEntry

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | 속도 식별자 | `"normal"` |
| `value` | `number` | 초 단위 | `0.25` |
| `ms` | `number` | 밀리초 환산 | `250` |

**출처**: `packages/tokens/src/motion/index.ts` → `motion.duration`

### EasingEntry

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `name` | `string` | easing 식별자 | `"ease"` |
| `value` | `number[] \| object` | cubic-bezier 배열 또는 spring 객체 | `[0.4, 0, 0.2, 1]` |
| `cssValue` | `string` | CSS transition 값 | `"cubic-bezier(0.4, 0, 0.2, 1)"` |

**출처**: `packages/tokens/src/motion/index.ts` → `motion.easing`

---

## 5. 스토리 메타데이터 구조

### 가이드 스토리 Meta 공통 패턴

```
title: '{Category}/Overview'  예: 'Typography/Overview'
component: undefined (또는 래퍼 컴포넌트)
tags: ['autodocs']
parameters:
  layout: 'padded'
```

### 컴포넌트 스토리 AllVariants 추가 패턴

```
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {/* 모든 variant 값을 하나의 캔버스에 렌더링 */}
    </div>
  )
}
```

### 페이지 스토리 레이아웃 패턴

```
parameters:
  layout: 'fullscreen'
```
