# Data Model: B2C 디자인 토큰 시스템

**Branch**: `001-design-token-system` | **Phase**: 1 | **Date**: 2026-03-27

## 토큰 레이어 구조

```
Layer 1: Primitive Tokens  →  원시 색상/타이포그래피 스케일 (불변 값)
Layer 2: Semantic Tokens   →  목적 기반 매핑 (Layer 1 값 참조)
Layer 3: Component Tokens  →  shadcn/ui CSS 변수 (Layer 2 매핑)
```

---

## 1. 원시 컬러 토큰 (Primitive Color Tokens)

### 1.1 Gray Scale (`gray`)

| Token | Hex | HSL (bare) | 용도 |
|-------|-----|-----------|------|
| `gray-50`  | `#fafafa` | `0 0% 98%`   | 최밝은 배경 |
| `gray-100` | `#f4f4f5` | `240 5% 96%` | 서피스, 입력 배경 |
| `gray-200` | `#e4e4e7` | `240 6% 90%` | 경계선, 구분선 |
| `gray-300` | `#d4d4d8` | `240 5% 84%` | 비활성 경계 |
| `gray-400` | `#a1a1aa` | `240 5% 65%` | 플레이스홀더 텍스트 |
| `gray-500` | `#71717a` | `240 4% 46%` | 보조 텍스트 (muted) |
| `gray-600` | `#52525b` | `240 5% 34%` | 보조 텍스트 강조 |
| `gray-700` | `#3f3f46` | `240 4% 27%` | 본문 텍스트 |
| `gray-800` | `#27272a` | `240 4% 16%` | 제목 텍스트 |
| `gray-900` | `#18181b` | `240 4% 10%` | 주요 전경 |
| `gray-950` | `#09090b` | `240 6% 4%`  | 최어두운 전경 |

### 1.2 Primary (Brand Red) Scale (`primary`)

기준값: `#d92b33` = HSL(357, 70%, 51%)

| Token | Hex (근사치) | HSL (bare) | 용도 |
|-------|------------|-----------|------|
| `primary-50`  | `#fff1f1` | `357 100% 97%` | 최밝은 포인트 배경 |
| `primary-100` | `#ffe0e1` | `357 92% 93%`  | 연한 강조 배경 |
| `primary-200` | `#ffc0c2` | `357 85% 85%`  | hover 배경 |
| `primary-300` | `#ff8e92` | `357 78% 74%`  | 밝은 포인트 |
| `primary-400` | `#f45b62` | `357 72% 62%`  | 미디엄 포인트 |
| `primary-500` | `#d92b33` | `357 70% 51%`  | **브랜드 기준값 (로고)** |
| `primary-600` | `#b71e25` | `357 72% 42%`  | hover/active CTA |
| `primary-700` | `#96161c` | `357 74% 34%`  | 강한 강조 |
| `primary-800` | `#741015` | `357 75% 26%`  | 어두운 강조 |
| `primary-900` | `#520a0e` | `357 74% 18%`  | 매우 어두운 |
| `primary-950` | `#2e0405` | `357 76% 10%`  | 최어두운 |

---

## 2. 시맨틱 토큰 (Semantic Tokens)

shadcn/ui `:root` CSS 변수와 1:1 매핑. 값은 bare HSL 형식.

### 2.1 라이트 테마 (`:root`)

| CSS Variable | 참조 토큰 | HSL 값 | 설명 |
|-------------|---------|--------|------|
| `--background` | white | `0 0% 100%` | 페이지 전체 배경 |
| `--foreground` | gray-950 | `240 6% 4%` | 기본 텍스트 |
| `--card` | white | `0 0% 100%` | 카드 배경 |
| `--card-foreground` | gray-950 | `240 6% 4%` | 카드 내 텍스트 |
| `--popover` | white | `0 0% 100%` | 팝오버 배경 |
| `--popover-foreground` | gray-950 | `240 6% 4%` | 팝오버 텍스트 |
| `--primary` | primary-500 | `357 70% 51%` | 주 액션 색상 (브랜드) |
| `--primary-foreground` | white | `0 0% 100%` | primary 위 텍스트 |
| `--secondary` | gray-100 | `240 5% 96%` | 보조 액션 배경 |
| `--secondary-foreground` | gray-900 | `240 4% 10%` | 보조 액션 텍스트 |
| `--muted` | gray-100 | `240 5% 96%` | 흐린 배경 |
| `--muted-foreground` | gray-500 | `240 4% 46%` | 흐린 텍스트 |
| `--accent` | gray-200 | `240 6% 90%` | 강조 배경 (hover 등) |
| `--accent-foreground` | gray-900 | `240 4% 10%` | 강조 위 텍스트 |
| `--destructive` | primary-500 | `357 70% 51%` | 삭제/오류 (v1: 브랜드 동일) |
| `--destructive-foreground` | white | `0 0% 100%` | destructive 위 텍스트 |
| `--border` | gray-200 | `240 6% 90%` | 기본 경계선 |
| `--input` | gray-200 | `240 6% 90%` | 입력 필드 경계 |
| `--ring` | primary-500 | `357 70% 51%` | 포커스 링 |
| `--radius` | — | `0.5rem` | 기본 border-radius |

---

## 3. 타이포그래피 토큰 (Typography Tokens)

### 3.1 폰트 패밀리

| Token | 값 |
|-------|---|
| `fontFamily.sans` | `"NanumBarunGothic", AppleGothic, Tahoma, Arial, sans-serif` |

### 3.2 폰트 굵기 (Tailwind 기본값 사용)

| Token | 값 | 용도 |
|-------|---|------|
| `fontWeight.normal` | `400` | 본문 |
| `fontWeight.medium` | `500` | 강조 텍스트 |
| `fontWeight.semibold` | `600` | 소제목 |
| `fontWeight.bold` | `700` | 제목 |

### 3.3 폰트 사이즈 (Tailwind 기본값 유지)

xs(12px) ~ 5xl(48px) Tailwind 기본 스케일 사용. 별도 오버라이드 없음.

---

## 4. 모션 토큰 (Motion Tokens)

framer-motion 직접 소비용 JS 상수.

### 4.1 Duration

| Token | 값 | 용도 |
|-------|---|------|
| `motion.duration.fast` | `0.15` | 마이크로 인터랙션 (hover) |
| `motion.duration.normal` | `0.25` | 일반 전환 |
| `motion.duration.slow` | `0.4` | 페이지/모달 전환 |

### 4.2 Easing

| Token | 값 | 용도 |
|-------|---|------|
| `motion.easing.ease` | `[0.4, 0, 0.2, 1]` | 기본 ease-in-out |
| `motion.easing.easeIn` | `[0.4, 0, 1, 1]` | 퇴장 애니메이션 |
| `motion.easing.easeOut` | `[0, 0, 0.2, 1]` | 등장 애니메이션 |
| `motion.easing.spring` | `{ type: "spring", stiffness: 300, damping: 30 }` | 탄성 전환 |

---

## 5. 토큰 접근성 검증

| 조합 | 배경 | 전경 | 대비비 | WCAG AA 기준 |
|------|------|------|--------|------------|
| 기본 텍스트 | white (`#ffffff`) | gray-950 (`#09090b`) | ~19.9:1 | ✅ PASS |
| 본문 텍스트 | white | gray-700 (`#3f3f46`) | ~8.0:1 | ✅ PASS |
| muted 텍스트 | white | gray-500 (`#71717a`) | ~4.6:1 | ✅ PASS (4.5:1 기준) |
| primary 버튼 | primary-500 (`#d92b33`) | white | ~4.7:1 | ✅ PASS |
| secondary 버튼 | gray-100 (`#f4f4f5`) | gray-900 (`#18181b`) | ~14.6:1 | ✅ PASS |

> 주의: muted-foreground(gray-500)는 4.6:1로 AA 최소 기준을 간신히 충족. 작은 텍스트에 단독 사용 시 gray-600 이상 사용 권장.
