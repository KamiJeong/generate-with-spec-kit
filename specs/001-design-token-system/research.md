# Research: B2C 디자인 토큰 시스템

**Branch**: `001-design-token-system` | **Phase**: 0 | **Date**: 2026-03-27

## Decision 1: 모노레포 도구 선택

**Decision**: pnpm workspaces + Turborepo

**Rationale**: pnpm은 심볼릭 링크 기반 node_modules로 디스크 효율이 높고 workspace 프로토콜(`workspace:*`)로 내부 패키지 참조가 명확하다. Turborepo는 task 캐싱과 파이프라인 정의를 통해 build/lint/test를 증분 실행한다. shadcn/ui 공식 예제와 대부분의 최신 React 모노레포가 이 조합을 사용한다.

**Alternatives considered**:
- npm workspaces: 기능은 동일하나 pnpm 대비 성능·디스크 효율 열세
- Nx: 기능은 강력하나 소규모 토큰 패키지에 과도한 설정 부담
- Lerna: 현재는 Turborepo/Nx에 비해 생태계 모멘텀이 낮음

---

## Decision 2: 패키지 빌드 도구

**Decision**: tsup (esbuild 기반)

**Rationale**: tsup은 TypeScript → CJS + ESM 동시 빌드, `.d.ts` 생성, CSS 처리를 최소 설정으로 지원한다. 디자인 토큰처럼 단순한 패키지에 Rollup/Webpack의 복잡도는 과도하다.

**Alternatives considered**:
- Rollup: 세밀한 제어 가능하나 설정 비용 높음
- tsc only: CJS/ESM 동시 지원이 번거로움

---

## Decision 3: 색상 스케일 표현 형식

**Decision**: shadcn/ui CSS 변수는 **bare HSL** (예: `357 70% 51%`), Tailwind 설정은 `hsl(var(--token) / <alpha-value>)` 패턴

**Rationale**:
- shadcn/ui가 `:root` CSS 변수를 bare HSL로 정의하고 Tailwind가 `<alpha-value>` 플레이스홀더로 불투명도 유틸리티(`bg-primary/50`)를 지원한다.
- 이 두 레이어 분리 덕분에 Tailwind 클래스와 CSS 변수가 자동으로 동기화된다.

**Alternatives considered**:
- OKLCH: shadcn/ui 최신 CLI 기본값이지만 브라우저 지원이 아직 100%가 아니며, NanumBarunGothic 위주 한국 서비스 타깃에서 구형 브라우저 호환성을 고려해 HSL을 선택.
- Hex 전용: 불투명도 유틸리티 미지원

---

## Decision 4: 토큰 패키지 진입점 구조

**Decision**: 3개 진입점 (`@tokens`, `@tokens/tailwind`, `@tokens/css`)

**Rationale**:
- `@tokens` (default): TypeScript 상수/타입 — framer-motion 등 JS 소비용
- `@tokens/tailwind`: Tailwind preset 객체 — tailwind.config.ts에서 import
- `@tokens/css`: CSS 파일 — globals.css에서 `@import`

각 진입점이 독립적이므로 필요한 것만 tree-shake하여 번들에 포함된다.

---

## Decision 5: framer-motion 토큰 소비 방식

**Decision**: 타이밍/이징은 JS 상수 직접 참조, 색상은 CSS 변수

**Rationale**:
- 색상 애니메이션은 `var(--primary)` 같은 CSS 변수를 framer-motion이 직접 보간할 수 있으며 디자인 시스템과 자동 동기화된다.
- duration/easing은 JS 값을 직접 사용하는 것이 paint 트리거를 피해 성능상 유리하다.
- 이 방식을 위해 `motion` 토큰 네임스페이스를 TypeScript 익스포트에 추가한다.

---

## Decision 6: 회색 팔레트 베이스

**Decision**: Zinc 계열 쿨-뉴트럴 회색 (Tailwind `zinc` 팔레트와 동일 값 채택)

**Rationale**: Zinc는 차갑고 구조적인 B2B/B2C 인터페이스에 적합하다. Warm 톤의 Stone/Sand 계열은 편안하지만 브랜드 레드(#d92b33)와 색온도가 충돌한다. Zinc는 브랜드 레드를 포인트로 더 선명하게 부각시킨다.

**Alternatives considered**:
- Slate: 약간 더 파란 톤, 차이가 미미하여 Zinc 선택
- Neutral: 무채색에 가까워 레드 포인트와 충돌 없으나 개성 부족
- Stone: 웜 톤, 레드와 색온도 충돌

---

## Decision 7: 타이포그래피 스케일

**Decision**: Tailwind 기본 fontSize 스케일 유지 + 폰트 패밀리/굵기만 오버라이드

**Rationale**: Tailwind 기본 `text-xs` ~ `text-5xl` 스케일이 B2C 앱에 충분하다. 사이즈 스케일 커스터마이즈는 YAGNI(불필요한 추가 금지) 원칙에 반한다. 대신 폰트 패밀리와 굵기만 정의하여 최소 변경으로 최대 효과를 달성한다.

---

## Decision 8: destructive 토큰 처리

**Decision**: v1에서 `--destructive` = `--primary` 동일 값 (357 70% 51%)

**Rationale**: 브랜드 컬러가 레드이므로 primary와 destructive가 같은 계열이 자연스럽다. 시각적으로 구분이 필요하다면 v2에서 `--destructive`를 더 어두운 red-700(357 74% 34%)으로 분리한다.

---

## Resolved NEEDS CLARIFICATION

없음. 모든 설계 결정이 연구를 통해 해소되었다.
