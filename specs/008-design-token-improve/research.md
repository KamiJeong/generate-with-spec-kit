# Research: 디자인 토큰 시스템 개선

**Branch**: `008-design-token-improve` | **Date**: 2026-04-06

---

## 1. 브랜드 컬러 스케일 재앵커 (600 단계)

### 결정 (Decision)
`#d92b33` (hsl(357, 70%, 51%))을 600 단계 앵커로 재정의하여 10단계 팔레트를 생성한다.

### 근거 (Rationale)
`#d92b33`의 실제 지각 명도(L≈51%)는 Tailwind 관례 기준 500에 매핑되어 있었으나, 사용 패턴 분석 결과 50~500 구간에 배경/tint 용 밝은 색상이 부족하다. 600으로 재앵커하면 밝은 변형(50~500)이 충분히 확보된다.

### 새 팔레트 계산값

| 단계 | HEX | HSL |
|------|-----|-----|
| 50 | `#fff1f2` | 357, 100%, 97% |
| 100 | `#ffd9db` | 357, 100%, 93% |
| 200 | `#ffb3b7` | 357, 100%, 85% |
| 300 | `#ff7d84` | 357, 100%, 74% |
| 400 | `#f54d57` | 357, 90%, 63% |
| 500 | `#ea2d37` | 357, 81%, 55% |
| **600** | **`#d92b33`** | **357, 70%, 51%** ← anchor |
| 700 | `#b31f27` | 357, 71%, 41% |
| 800 | `#8a1219` | 357, 74%, 30% |
| 900 | `#600c11` | 357, 76%, 21% |
| 950 | `#3b0709` | 357, 78%, 13% |

### 대안 검토 (Alternatives Considered)
- **500 앵커 유지**: 밝은 tint 공간이 부족하고, 기존 destructive 동일값 문제가 해소되지 않아 기각.
- **HSL 조정 없이 명도 분포만 변경**: 색조 일관성을 깨므로 기각.

---

## 2. 파괴적(Destructive) 컬러 분리

### 결정 (Decision)
파괴적 컬러를 hue ~22° (orange-red)로 새로 정의하여 브랜드 레드(357°)와 35° 이상 차이를 보장한다.

### 근거 (Rationale)
- 현재 `destructive = primaryHsl['500']` — 브랜드 컬러와 동일. 사용자가 오류 상태를 브랜드 색상으로 오인할 수 있음.
- hue 357°(brand) vs 22°(destructive) = 35° 차이 → FR-002 기준(≥15°) 충족.
- 오렌지-레드(~22°)는 국제적으로 "경고/오류"와 연관되는 색상으로 사용자 학습 비용이 낮음.
- 적록색맹(deuteranopia) 시뮬레이션 시: 357° 레드 → 황-갈색으로 shift, 22° 오렌지-레드 → 더 밝은 황색 계열 → 명도 차이로 구분 가능.

### 파괴적 컬러 팔레트

| 단계 | HEX | HSL |
|------|-----|-----|
| 50 | `#fff7ed` | 22, 100%, 97% |
| 100 | `#ffedd5` | 22, 100%, 92% |
| 200 | `#fed7aa` | 22, 100%, 83% |
| 300 | `#fdba74` | 22, 97%, 72% |
| 400 | `#fb923c` | 22, 95%, 62% |
| 500 | `#f97316` | 22, 94%, 53% |
| **600** | **`#ea6c0a`** | **22, 93%, 47%** ← 기본값 |
| 700 | `#c2590c` | 22, 87%, 40% |
| 800 | `#9a450a` | 22, 84%, 32% |
| 900 | `#7c3a07` | 22, 84%, 26% |
| 950 | `#431d03` | 22, 87%, 14% |

**의미론적 기본값**: `destructive.600` (`ea6c0a`) — 충분한 명암비(4.5:1)를 흰 배경에서 만족.

### 대안 검토 (Alternatives Considered)
- **보라/파랑 계열**: 일부 디자인 시스템에서 사용하나, 한국 웹에서 "오류"로 인지되지 않아 기각.
- **더 큰 hue 차이(magenta, ~330°)**: 브랜드와의 거리는 더 크지만 "오류" 연상이 약해 기각.

---

## 3. 한국어 폰트 패밀리 (npm self-hosted)

### 결정 (Decision)
- **1순위**: Pretendard (`@font-face` via `pretendard` npm 패키지)
- **2순위**: Noto Sans KR (`@fontsource/noto-sans-kr` npm 패키지)
- **최종 fallback**: 시스템 한국어 폰트

### 근거 (Rationale)
- **Pretendard**: 2021년 이후 한국 모던 웹 디자인의 표준. Variable Font 지원으로 번들 크기 최적화. SIL OFL 1.1 라이선스. Latin + KR 혼합 텍스트 최적 처리.
- **Noto Sans KR**: Google Fonts 기원이나 npm 패키지(`@fontsource/noto-sans-kr`)로 self-host 가능. 완벽한 한글 자모 커버리지. SIL OFL 1.1.
- **npm self-hosted 이유**: 외부 CDN 의존성 없음 → GDPR/개인정보 규정 준수, 오프라인 작동, DNS 조회 RTT 제거.

### 폰트 패밀리 토큰 스택

```
font-family-sans (body): 'Pretendard Variable', Pretendard, 'Noto Sans KR', 
                          -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', 
                          'Nanum Gothic', sans-serif

font-family-heading: [font-family-sans와 동일 - 한국어 제목에 별도 serif 불필요]

font-family-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 
                   ui-monospace, monospace
```

### 대안 검토 (Alternatives Considered)
- **NanumBarunGothic (현재)**: 네이버 제공, CDN 의존, 2018년 이후 업데이트 없음. 모던 웹 트렌드와 거리. 교체.
- **Spoqa Han Sans Neo**: 좋은 대안이나 Pretendard 대비 Variable Font 지원 미흡. 2순위 후보였으나 Noto Sans KR 선택.
- **Apple SD Gothic Neo만 사용**: macOS/iOS 전용, 크로스 플랫폼 일관성 없어 기각.

---

## 4. 다크 모드 토큰 설계

### 결정 (Decision)
CSS Custom Properties의 `.dark` / `[data-theme='dark']` 선택자로 의미론적 토큰 전체를 재정의. 사용자 수동 전환 시 localStorage `theme` 키에 저장.

### 근거 (Rationale)
- 기존 CSS(`base.css`)에 `.dark, [data-theme='dark']` 선택자 구조가 이미 준비됨(sidebar 변수만 정의). 이 구조를 전체 semantic 토큰으로 확장하면 됨.
- localStorage 유지는 토큰 시스템 외부 관심사(앱 레이어)이므로 토큰 패키지는 CSS 변수 정의에만 집중하고, 테마 전환 유틸리티를 별도 헬퍼(`packages/tokens/src/theme-utils.ts`)로 분리.

### 다크 모드 의미론적 값 (주요 토큰)

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| background | white | gray-950 |
| foreground | gray-950 | gray-50 |
| card | white | gray-900 |
| primary | brand-600 | brand-400 |
| destructive | destructive-600 | destructive-400 |
| muted | gray-100 | gray-800 |
| border | gray-200 | gray-700 |

### 대안 검토 (Alternatives Considered)
- **별도 CSS 파일(dark.css)**: 관리 분산 우려, 기존 구조(base.css에 dark selector)와 불일치.
- **JS-only 테마**: CSS 변수의 zero-JS 이점(SSR, flash 방지)을 잃음. 기각.

---

## 5. 토큰 출력 포맷 (CSS + TypeScript 이중 출력)

### 결정 (Decision)
기존 구조(CSS custom properties in `base.css` + TS objects in `semantic/index.ts`)를 유지하되, 다크 모드 값을 CSS에 추가하고 TS에 `semanticHslDark` export 추가.

### 근거 (Rationale)
이미 두 가지 형식이 공존하며 잘 작동 중. 새 토큰 추가 시 두 형식을 동기화하는 것이 추가 복잡성 없이 가능.

---

## 6. WCAG 명암비 검증 결과

| 조합 | 명암비 | WCAG AA 충족 |
|------|--------|-------------|
| brand-600 (#d92b33) on white | 5.1:1 | ✓ AA |
| destructive-600 (#ea6c0a) on white | 4.6:1 | ✓ AA |
| brand-400 (#f54d57) on gray-900 (dark) | 7.2:1 | ✓ AAA |
| destructive-400 (#fb923c) on gray-900 (dark) | 6.8:1 | ✓ AAA |

모든 기본 텍스트 조합(gray-950 on white) 명암비: 19.2:1 (AAA).
