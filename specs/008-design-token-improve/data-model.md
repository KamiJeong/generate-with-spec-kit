# Data Model: 디자인 토큰 시스템 개선

**Branch**: `008-design-token-improve` | **Date**: 2026-04-06

---

## 토큰 레이어 구조

```
Layer 1: Primitive Palettes (원시 팔레트)
  └── 불변의 원시 색상 값 (hex/HSL). 의미 없음, 참조 전용.

Layer 2: Semantic Tokens (의미론적 토큰)
  └── Primitive를 참조하는 역할 기반 별칭.
      라이트/다크 모드별 값 매핑.

Layer 3: CSS Custom Properties (CSS 변수)
  └── Semantic 값을 :root 및 .dark 선택자에 출력.
      Tailwind preset에서 var(--token) 형태로 소비.
```

---

## 엔티티 1: 브랜드 컬러 팔레트 (Brand Primitive)

**위치**: `packages/tokens/src/primitives/colors.ts`  
**수정 유형**: 기존 `primary` 팔레트 재계산 (앵커: 500 → 600)

| 필드 | 타입 | 설명 |
|------|------|------|
| `brand[50..950]` | `string` (hex) | 11단계 원시 브랜드 색상 |
| `brandHsl[50..950]` | `string` (hsl) | CSS var에 사용되는 HSL 문자열 |

**앵커 규칙**: `brand[600] = '#d92b33'` (불변). 나머지 단계는 명도 보간으로 생성.

**기존 `primary` / `primaryHsl` 이름 변경**: 하위 호환을 위해 `primary` 이름은 semantic 레이어에서 유지. 원시 팔레트 변수명은 `brand` / `brandHsl`로 변경.

---

## 엔티티 2: 파괴적 컬러 팔레트 (Destructive Primitive)

**위치**: `packages/tokens/src/primitives/colors.ts`  
**수정 유형**: 신규 추가

| 필드 | 타입 | 설명 |
|------|------|------|
| `destructivePalette[50..950]` | `string` (hex) | 11단계 오렌지-레드 팔레트 |
| `destructiveHsl[50..950]` | `string` (hsl) | CSS var에 사용되는 HSL 문자열 |

**색조 규칙**: hue ≈ 22°. `brand` 팔레트(357°)와의 색조 차이 ≥ 15° 보장.  
**기본 사용 단계**: `destructivePalette[600]` (라이트), `destructivePalette[400]` (다크).

---

## 엔티티 3: 의미론적 색상 토큰 — 라이트 모드 (Semantic Light)

**위치**: `packages/tokens/src/semantic/index.ts`  
**수정 유형**: 기존 `semanticHsl` 업데이트

| 필드 | 변경 전 | 변경 후 |
|------|---------|---------|
| `primary` | `brandHsl['500']` | `brandHsl['600']` |
| `primaryForeground` | `'0 0% 100%'` | `'0 0% 100%'` (유지) |
| `destructive` | `primaryHsl['500']` ← **버그** | `destructiveHsl['600']` |
| `destructiveForeground` | `'0 0% 100%'` | `'0 0% 100%'` (유지) |
| `ring` | `primaryHsl['500']` | `brandHsl['600']` |

---

## 엔티티 4: 의미론적 색상 토큰 — 다크 모드 (Semantic Dark)

**위치**: `packages/tokens/src/semantic/dark.ts` (신규)  
**수정 유형**: 신규 추가

| 토큰 | 다크 모드 값 | 근거 |
|------|-------------|------|
| `background` | `grayHsl['950']` | 최어두운 배경 |
| `foreground` | `grayHsl['50']` | 고대비 텍스트 |
| `card` | `grayHsl['900']` | 카드 배경 |
| `cardForeground` | `grayHsl['50']` | |
| `popover` | `grayHsl['900']` | |
| `popoverForeground` | `grayHsl['50']` | |
| `primary` | `brandHsl['400']` | 다크에서 밝은 브랜드 |
| `primaryForeground` | `grayHsl['950']` | 어두운 배경에 대비 |
| `secondary` | `grayHsl['800']` | |
| `secondaryForeground` | `grayHsl['100']` | |
| `muted` | `grayHsl['800']` | |
| `mutedForeground` | `grayHsl['400']` | |
| `accent` | `grayHsl['700']` | |
| `accentForeground` | `grayHsl['100']` | |
| `destructive` | `destructiveHsl['400']` | 다크에서 밝은 파괴적 |
| `destructiveForeground` | `grayHsl['950']` | |
| `border` | `grayHsl['700']` | |
| `input` | `grayHsl['700']` | |
| `ring` | `brandHsl['400']` | |

---

## 엔티티 5: 폰트 패밀리 토큰 (Font Family)

**위치**: `packages/tokens/src/primitives/typography.ts`  
**수정 유형**: 기존 `fontFamily` 교체

| 필드 | 타입 | 값 |
|------|------|-----|
| `fontFamily.sans` | `string[]` | Pretendard Variable, Pretendard, Noto Sans KR, 시스템 폰트 fallback chain |
| `fontFamily.heading` | `string[]` | sans와 동일 (한국어 제목 serif 불필요) |
| `fontFamily.mono` | `string[]` | JetBrains Mono, Fira Code, ui-monospace, monospace |

**Fallback 체인 (sans)**:
```
'Pretendard Variable', Pretendard, 'Noto Sans KR',
-apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic',
'Nanum Gothic', sans-serif
```

---

## 엔티티 6: CSS Custom Properties 출력 (base.css)

**위치**: `packages/tokens/src/css/base.css`  
**수정 유형**: 기존 파일 업데이트

**`:root` 추가/변경 변수**:
- `--primary`: `brandHsl['600']` 값
- `--destructive`: `destructiveHsl['600']` 값 (기존 primary 동일값에서 분리)
- `--ring`: `brandHsl['600']` 값
- `--font-sans`: Pretendard 폰트 스택
- `--font-heading`: Pretendard 폰트 스택
- `--font-mono`: JetBrains Mono 폰트 스택

**`.dark, [data-theme='dark']` 추가 변수** (기존 sidebar 외 전체 semantic 추가):
- `--background`, `--foreground`, `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- `--destructive`, `--destructive-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`, `--input`, `--ring`

---

## 엔티티 7: 테마 전환 유틸리티 (Theme Utils)

**위치**: `packages/tokens/src/theme-utils.ts` (신규)  
**수정 유형**: 신규 추가

| 함수 | 설명 |
|------|------|
| `getTheme()` | localStorage `'theme'` 키에서 현재 테마 반환 (`'light'` \| `'dark'` \| `'system'`) |
| `setTheme(theme)` | 테마 적용: `document.documentElement`에 `data-theme` 속성 설정 + localStorage 저장 |
| `initTheme()` | 페이지 로드 시 실행. localStorage 값 또는 `prefers-color-scheme` 기준으로 초기 테마 적용 |

**상태 전이**:
```
system → (OS prefers-color-scheme) → light | dark
manual → setTheme('dark') → localStorage['theme'] = 'dark' → data-theme='dark'
재방문 → initTheme() → localStorage 값 우선, 없으면 system
```

---

## 파일 변경 요약

| 파일 | 변경 유형 | 설명 |
|------|-----------|------|
| `packages/tokens/src/primitives/colors.ts` | 수정 | brand 팔레트 재계산, destructive 팔레트 추가 |
| `packages/tokens/src/primitives/typography.ts` | 수정 | 폰트 패밀리 Pretendard로 교체 |
| `packages/tokens/src/semantic/index.ts` | 수정 | destructive 값 분리, ring 업데이트 |
| `packages/tokens/src/semantic/dark.ts` | 신규 | 다크 모드 semantic 토큰 |
| `packages/tokens/src/css/base.css` | 수정 | 전체 dark selector 추가, 변수값 업데이트 |
| `packages/tokens/src/theme-utils.ts` | 신규 | 테마 전환 유틸리티 |
| `packages/tokens/src/index.ts` | 수정 | 신규 export 추가 |
| `packages/tokens/tests/` | 신규 | 토큰 값 검증 테스트 |
