# 구현 계획서: 디자인 시스템 UI

**Branch**: `002-design-system-ui` | **날짜**: 2026-03-27 | **Spec**: [spec.md](./spec.md)
**입력**: Feature specification from `/specs/002-design-system-ui/spec.md`

**참고**: 이 문서는 `/speckit.plan` 명령으로 생성됩니다.

---

## 요약 (Summary)

shadcn/ui 최신 버전 기반으로 53개 이상의 UI 컴포넌트를 `@myorg/tokens` 디자인 토큰과 통합하여 구현하고, 각 컴포넌트에 Storybook 스토리와 자동화 UI 테스트를 추가하는 `@myorg/ui` 패키지를 생성한다.

---

## 기술 컨텍스트 (Technical Context)

**언어/버전**: TypeScript 5.x
**주요 의존성**: shadcn/ui (latest), Tailwind CSS v4+, Radix UI, tsup v8+, Storybook v10.3.3, @storybook/test-runner 0.24.3, axe-core, Biome v2.4.9
**스토리지**: 해당 없음 (N/A) — 컴포넌트 라이브러리
**테스트**: Storybook v10.3.3 내장 테스트 (play functions + `@storybook/test`), `@storybook/test-runner 0.24.3`, axe-core (접근성)
**린팅/포맷**: Biome v2.4.9 (ESLint 대체 — lint + format 통합)
**대상 플랫폼**: 브라우저 (React 18+ 애플리케이션)
**프로젝트 타입**: UI 컴포넌트 라이브러리 (monorepo 패키지)
**성능 목표**: Storybook 전체 테스트 스위트 CI 환경에서 5분 이내 완료 (SC-006)
**제약사항**: 하드코딩된 색상/간격/타이포그래피 값 금지, `@myorg/tokens` 의존 필수
**규모/범위**: 53개 이상 컴포넌트, `packages/ui` 신규 패키지

---

## 헌법 게이트 확인 (Constitution Check)

*GATE: Phase 0 리서치 시작 전 통과 필수. Phase 1 설계 후 재확인.*

| 원칙 | 평가 | 상태 |
|------|------|------|
| **I. 코드 품질** — 단일 책임 원칙, DRY, PR 리뷰 | 각 컴포넌트는 단일 UI 관심사만 담당. 공통 훅/유틸리티는 추상화. | ✅ PASS |
| **II. 테스트 표준** — 모든 컴포넌트 story에 최소 1개 자동화 테스트 | FR-004: 모든 스토리에 render + accessibility 테스트 필수 | ✅ PASS |
| **III. UX 일관성** — 디자인 시스템 기반 구축, 임의 스타일 오버라이드 금지 | FR-002: 모든 스타일 값은 `@myorg/tokens` 토큰 참조 | ✅ PASS |
| **III. UX 일관성** — WCAG 2.1 AA 접근성 | FR-009: 키보드 내비게이션, ARIA 역할, 색상 대비 | ✅ PASS |
| **IV. 성능** — 성능 회귀 없음 | SC-006: CI에서 테스트 스위트 5분 이내 | ✅ PASS |
| **V. 단순성** — YAGNI, 외부 의존성 최소화 | shadcn/ui + Radix UI는 기존 검증된 라이브러리. 추가 의존성 없음 | ✅ PASS |

**결론**: 모든 게이트 통과. Phase 0 진행 가능.

---

## 프로젝트 구조 (Project Structure)

### 문서 (이 기능)

```text
specs/002-design-system-ui/
├── plan.md              # 이 파일 (/speckit.plan 출력)
├── research.md          # Phase 0 출력
├── data-model.md        # Phase 1 출력
├── quickstart.md        # Phase 1 출력
├── contracts/           # Phase 1 출력
│   └── component-api.md
└── tasks.md             # Phase 2 출력 (/speckit.tasks - 이 명령으로 생성 안 됨)
```

### 소스 코드 (저장소 루트)

```text
packages/
├── tokens/              # 기존 — @myorg/tokens (001-design-token-system)
│   └── dist/            # CSS 변수, Tailwind preset, TypeScript API
└── ui/                  # 신규 — @myorg/ui (이 기능)
    ├── src/
    │   ├── components/  # 55개 컴포넌트 (Accordion, Alert, ...)
    │   │   ├── accordion/
    │   │   │   ├── index.tsx
    │   │   │   └── accordion.stories.tsx
    │   │   └── ...
    │   ├── lib/         # 공통 유틸리티 (cn, variants, ...)
    │   └── index.ts     # public API export
    ├── .storybook/
    │   ├── main.ts
    │   └── preview.ts
    ├── package.json
    ├── tsconfig.json
    ├── tsup.config.ts
    └── tailwind.config.ts
```

**구조 결정**: monorepo의 별도 패키지(`packages/ui`)로 분리. `@myorg/tokens`를 workspace 의존성으로 사용. Storybook은 패키지 내부에 포함.

---

## 복잡도 추적 (Complexity Tracking)

| 위반 | 필요 이유 | 단순 대안이 불충분한 이유 |
|------|----------|------------------------|
| 신규 패키지 추가 (`packages/ui`) | 컴포넌트 라이브러리는 독립적 빌드/배포 단위 필요 | `packages/tokens`에 통합 시 관심사 분리 위반 (토큰 ≠ UI) |
| Storybook 포함 | 55개 컴포넌트의 시각적 테스트 환경 필수 (SC-002, SC-005) | 단위 테스트만으로는 시각적 렌더링과 인터랙션 검증 불가 |

---

## Phase 0: 리서치 결과 (Research)

> 상세 내용: [research.md](./research.md)

### 핵심 결정사항

| 결정 | 선택 | 근거 |
|------|------|------|
| shadcn/ui 설치 방식 | `pnpm dlx shadcn@latest add [component]` (개별) | monorepo에서 components.json을 `packages/ui`에 위치시켜 독립 관리 |
| Storybook 버전 | v10.3.3 (`storybook/react-vite` framework) | 최신 버전. v10에서 테스트 기능 통합, `@storybook/test` 내장, HMR 개선 |
| 테스트 방식 | `@storybook/test` (play functions) + `@storybook/test-runner 0.24.3` | story 자체가 테스트. 별도 테스트 파일 불필요 |
| 접근성 테스트 | `@storybook/addon-a11y` + axe-core | Storybook 내에서 자동 접근성 검사 통합 |
| 린팅/포맷 | Biome v2.4.9 (ESLint 대체) | lint + format 단일 도구 통합. `biome check` 명령으로 실행 |
| 빌드 도구 | tsup (기존 패키지와 동일) | 프로젝트 일관성 유지 |
| Tailwind 버전 | v4 (CSS-first 설정) | `tailwind.config.ts` 불필요. `@import "tailwindcss"` + `@theme` CSS 블록으로 설정. shadcn/ui 최신과 호환 |
| 토큰 연결 방식 | CSS custom properties via Tailwind v4 `@theme` 블록 (`--color-primary` 등) | `@myorg/tokens`의 CSS 변수를 Tailwind v4 `@theme` 블록에서 참조 |

---

## Phase 1: 설계 아티팩트 (Design Artifacts)

> 상세 내용: [data-model.md](./data-model.md), [contracts/component-api.md](./contracts/component-api.md), [quickstart.md](./quickstart.md)

### 컴포넌트 카테고리 구조

| 카테고리 | 컴포넌트 | 복잡도 |
|----------|----------|--------|
| **레이아웃/컨테이너** | Aspect Ratio, Card, Resizable, Separator | 낮음 |
| **기본 입력** | Button, Button Group, Checkbox, Input, Input Group, Input OTP, Label, Native Select, Radio Group, Switch | 낮음 |
| **텍스트/표시** | Alert, Badge, Empty, Field, Item, Kbd, Spinner | 낮음 |
| **내비게이션** | Breadcrumb, Menubar, Navigation Menu, Pagination, Sidebar, Tabs | 중간 |
| **오버레이** | Alert Dialog, Context Menu, Dialog, Drawer, Dropdown Menu, Hover Card, Popover, Sheet, Sonner | 중간 |
| **복합 입력** | Calendar, Combobox, Command, Date Picker, Direction | 높음 |
| **데이터 표시** | Avatar, Carousel, Chart, Collapsible, Data Table, Progress, Table | 높음 |
| **기타** | Accordion | 낮음 |

### 공통 패턴

- 모든 컴포넌트: `cn()` 유틸리티로 className 병합, `cva()` (class-variance-authority)로 variants 관리
- 모든 컴포넌트: `data-slot` 속성으로 컴포넌트 내부 요소 식별 (shadcn/ui 최신 패턴)
- 복합 컴포넌트: compound component 패턴 (예: `<Dialog>`, `<DialogTrigger>`, `<DialogContent>`)

---

## 구현 단계 개요 (Implementation Phases)

### Phase A: 패키지 셋업
- `packages/ui` 패키지 초기화
- `components.json` 설정 (shadcn/ui latest)
- Storybook v10.3.3 설치 및 설정 (`storybook/react-vite` framework, `biome.json` 설정)
- `@myorg/tokens` 의존성 연결
- Tailwind v4 CSS-first 설정 (`@theme` 블록으로 토큰 참조, `tailwind.config.ts` 미사용)

### Phase B: 낮은 복잡도 컴포넌트 (19개)
Accordion, Alert, Aspect Ratio, Badge, Button, Button Group, Card, Checkbox, Empty, Field, Input, Item, Kbd, Label, Radio Group, Separator, Spinner, Switch, Native Select

### Phase C: 중간 복잡도 컴포넌트 (14개)
Alert Dialog, Breadcrumb, Collapsible, Context Menu, Dialog, Drawer, Dropdown Menu, Hover Card, Input Group, Input OTP, Menubar, Navigation Menu, Pagination, Popover, Progress, Sheet, Sonner, Tabs

### Phase D: 높은 복잡도 컴포넌트 (11개)
Avatar, Calendar, Carousel, Chart, Combobox, Command, Data Table, Date Picker, Direction, Resizable, Sidebar, Table

### Phase E: Storybook v10.3.3 테스트 완성
- 각 스토리에 `play` 함수 추가 (인터랙션 테스트, `@storybook/test` v10.3.3 API)
- `@storybook/addon-a11y` 접근성 검사 (axe-core)
- CI 파이프라인 설정 (SC-006: 5분 이내 완료 게이트 포함)
- Biome 린트 검사 통합

### Phase F: 공개 API 및 빌드
- `packages/ui/src/index.ts` 전체 export
- tsup 빌드 설정
- Turbo 파이프라인 통합
