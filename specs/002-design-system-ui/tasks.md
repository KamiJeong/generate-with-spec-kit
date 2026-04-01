# 태스크: 디자인 시스템 UI 구현

**입력**: `/specs/002-design-system-ui/` 설계 문서
**선행 조건**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

## 포맷: `[ID] [P?] [Story] 설명`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 사용자 스토리 귀속 (US1~US4)
- 각 태스크에 정확한 파일 경로 포함

---

## Phase 1: Setup — 패키지 초기화

**목적**: `packages/ui` 신규 패키지 구조 생성 및 기본 설정

- [X] T001 `packages/ui` 디렉터리 생성 및 `package.json` 작성 (`@myorg/ui`, workspace 의존성 `@myorg/tokens` 포함) — `packages/ui/package.json`
- [X] T002 `packages/ui/tsconfig.json` 설정 (React JSX, strict mode, path aliases `@/*` → `./src/*`) — `packages/ui/tsconfig.json`
- [X] T003 [P] `packages/ui/tsup.config.ts` 설정 (ESM+CJS dual output, dts 생성) — `packages/ui/tsup.config.ts`
- [X] T004 [P] Tailwind v4 CSS-first 설정 (`tailwind.config.ts` 미생성, `@myorg/tokens` CSS 변수를 `@theme` 블록으로 참조하는 방법 문서화) — `packages/ui/src/index.css`
- [X] T005 [P] `packages/ui/src/index.css` 생성 (`@import "tailwindcss"` + `@theme` 블록에 `@myorg/tokens` CSS 변수 매핑) — `packages/ui/src/index.css`
- [X] T006 turbo.json에 `@myorg/ui` 빌드/테스트/lint 파이프라인 추가 — `turbo.json`
- [X] T007 shadcn/ui `components.json` 초기화 (`pnpm dlx shadcn@latest init`, aliases `@/components`, `@/lib` 설정) — `packages/ui/components.json`

**체크포인트**: `packages/ui` 패키지 구조 완성, shadcn/ui 설치 준비 완료

---

## Phase 2: 기초 구성 (Foundational)

**목적**: 모든 컴포넌트가 의존하는 공통 유틸리티 및 Storybook 기반 구성

**⚠️ 중요**: 이 Phase 완료 전 컴포넌트 구현 불가

- [X] T008 공통 유틸리티 `cn()` (tailwind-merge + clsx) 구현 — `packages/ui/src/lib/utils.ts`
- [X] T009 [P] `class-variance-authority(cva)` 타입 헬퍼 및 공통 variant 타입 정의 — `packages/ui/src/lib/variants.ts`
- [X] T010 [P] Storybook 10.3.3 설치 및 `.storybook/main.ts` 설정 (`storybook/react-vite` framework, `@storybook/addon-a11y`), `viteFinal()`에 **`@tailwindcss/vite` 플러그인 등록** (`config.plugins = [...(config.plugins ?? []), tailwindcss()]`) 및 `@` 경로 alias 설정 — `packages/ui/.storybook/main.ts`
- [X] T011 Storybook 10.3.3 `preview.ts` 설정 (`@myorg/tokens` CSS 변수 import, `index.css` Tailwind v4 import, 다크모드 툴바 토글) — `packages/ui/.storybook/preview.ts`
- [X] T012 [P] `@storybook/test-runner 0.24.3` 설정 (axe-core 접근성 자동 검사, `preVisit` 훅으로 a11y 강제 실행) — `packages/ui/.storybook/test-runner.ts`
- [X] T013 [P] Storybook 10.3.3 관련 package.json 스크립트 추가 (`storybook`, `build-storybook`, `test-storybook`), `storybook 10.3.3` + `@storybook/test-runner 0.24.3` + **`@tailwindcss/vite`** devDependencies 추가, ESLint 제거 후 `@biomejs/biome ^2.4.9` 추가, `biome.json` 설정 — `packages/ui/package.json`, `packages/ui/biome.json`
- [X] T014 [P] `packages/ui/src/index.ts` 빈 진입점 생성 (Phase 3~6에서 점진적으로 export 추가) — `packages/ui/src/index.ts`

**체크포인트**: `pnpm --filter @myorg/ui storybook` 실행 시 빈 Storybook이 정상 실행됨

---

## Phase 3: 사용자 스토리 1 — Storybook에서 컴포넌트 탐색 (우선순위: P1) 🎯 MVP

**목표**: 53개 이상 컴포넌트를 Storybook에서 탐색 가능한 상태로 구현. 개발자가 사이드바에서 컴포넌트를 찾아 인터랙티브 컨트롤로 조작할 수 있음.

**독립 테스트**: `pnpm --filter @myorg/ui storybook` 실행 후 모든 컴포넌트가 사이드바에 나타나고, 각 스토리가 오류 없이 렌더링되며 컨트롤 패널에서 props를 변경하면 실시간 반영됨을 확인

### 낮은 복잡도 컴포넌트 (Low Complexity)

- [X] T015 [P] [US1] `pnpm dlx shadcn@latest add accordion` 후 스토리 작성 (Single/Multiple 변형, 기본 autodocs) — `packages/ui/src/components/accordion.tsx`, `packages/ui/src/stories/accordion.stories.tsx`
- [X] T016 [P] [US1] `pnpm dlx shadcn@latest add alert` 후 스토리 작성 (Default/Destructive 변형) — `packages/ui/src/components/alert.tsx`, `packages/ui/src/stories/alert.stories.tsx`
- [X] T017 [P] [US1] `pnpm dlx shadcn@latest add aspect-ratio` 후 스토리 작성 (16/9, 1/1 비율) — `packages/ui/src/components/aspect-ratio.tsx`, `packages/ui/src/components/aspect-ratio.stories.tsx`
- [X] T018 [P] [US1] `pnpm dlx shadcn@latest add badge` 후 스토리 작성 (Default/Secondary/Destructive/Outline 변형) — `packages/ui/src/components/badge.tsx`, `packages/ui/src/components/badge.stories.tsx`
- [X] T019 [P] [US1] `pnpm dlx shadcn@latest add button` 후 스토리 작성 (모든 variant × size 조합) — `packages/ui/src/components/button.tsx`, `packages/ui/src/stories/button.stories.tsx`
- [X] T020 [P] [US1] Button Group 컴포넌트 구현 (shadcn/ui 미제공, 직접 구현: `orientation: 'horizontal'|'vertical'` prop, Button 자식을 묶는 flex 컨테이너, 토큰 gap/border 적용) 및 스토리 작성 (수평/수직 방향, Disabled 포함) — `packages/ui/src/components/button-group.tsx`, `packages/ui/src/components/button-group.stories.tsx`
- [X] T021 [P] [US1] `pnpm dlx shadcn@latest add card` 후 스토리 작성 (Header/Content/Footer 슬롯 조합) — `packages/ui/src/components/card.tsx`, `packages/ui/src/stories/card.stories.tsx`
- [X] T022 [P] [US1] `pnpm dlx shadcn@latest add checkbox` 후 스토리 작성 (Default/Checked/Disabled 상태) — `packages/ui/src/components/checkbox.tsx`, `packages/ui/src/stories/checkbox.stories.tsx`
- [X] T023 [P] [US1] Empty 컴포넌트 구현 (shadcn/ui 미제공, `icon?: ReactNode`, `title: string`, `description?: string` props, 토큰 색상 적용, ARIA `role="status"`) 및 스토리 작성 (기본/아이콘 있음/설명 있음) — `packages/ui/src/components/empty.tsx`, `packages/ui/src/components/empty.stories.tsx`
- [X] T024 [P] [US1] Field 컴포넌트 구현 (shadcn/ui 미제공, `label: string`, `error?: string`, `required?: boolean` props, Label + 자식 + 오류 메시지 래퍼, `aria-describedby` 연결) 및 스토리 작성 (기본/오류/필수 상태) — `packages/ui/src/components/field.tsx`, `packages/ui/src/stories/field.stories.tsx`
- [X] T025 [P] [US1] `pnpm dlx shadcn@latest add input` 후 스토리 작성 (기본/비활성/오류 상태) — `packages/ui/src/components/input.tsx`, `packages/ui/src/stories/input.stories.tsx`
- [X] T026 [P] [US1] Item 컴포넌트 구현 (shadcn/ui 미제공, `icon?: ReactNode`, `label: string`, `shortcut?: string` props, flex 레이아웃, 토큰 색상, `role="menuitem"`) 및 스토리 작성 (아이콘 있음/없음, 단축키 표시) — `packages/ui/src/components/item.tsx`, `packages/ui/src/components/item.stories.tsx`
- [X] T027 [P] [US1] Kbd 컴포넌트 구현 (shadcn/ui 미제공, `<kbd>` HTML 요소 래퍼, 토큰 border/background/font 적용) 및 스토리 작성 (단일 키, 조합 키) — `packages/ui/src/components/kbd.tsx`, `packages/ui/src/components/kbd.stories.tsx`
- [X] T028 [P] [US1] `pnpm dlx shadcn@latest add label` 후 스토리 작성 (기본/필수 표시) — `packages/ui/src/components/label.tsx`, `packages/ui/src/components/label.stories.tsx`
- [X] T029 [P] [US1] `pnpm dlx shadcn@latest add radio-group` 후 스토리 작성 (기본/비활성 상태) — `packages/ui/src/components/radio-group.tsx`, `packages/ui/src/stories/radio-group.stories.tsx`
- [X] T030 [P] [US1] `pnpm dlx shadcn@latest add separator` 후 스토리 작성 (수평/수직 방향) — `packages/ui/src/components/separator.tsx`, `packages/ui/src/components/separator.stories.tsx`
- [X] T031 [P] [US1] Spinner 컴포넌트 구현 (sm/default/lg 사이즈, `role="status"` ARIA) 및 스토리 작성 — `packages/ui/src/components/spinner.tsx`, `packages/ui/src/stories/spinner.stories.tsx`
- [X] T032 [P] [US1] `pnpm dlx shadcn@latest add switch` 후 스토리 작성 (기본/비활성 상태) — `packages/ui/src/components/switch.tsx`, `packages/ui/src/components/switch.stories.tsx`
- [X] T033 [P] [US1] Native Select 컴포넌트 구현 (기본 HTML select 래퍼, 토큰 스타일링) 및 스토리 작성 — `packages/ui/src/components/native-select.tsx`, `packages/ui/src/stories/native-select.stories.tsx`

### 중간 복잡도 컴포넌트 (Medium Complexity)

- [X] T034 [P] [US1] `pnpm dlx shadcn@latest add alert-dialog` 후 스토리 작성 (기본, Trigger+Content+Action 조합) — `packages/ui/src/components/alert-dialog.tsx`, `packages/ui/src/components/alert-dialog.stories.tsx`
- [X] T035 [P] [US1] `pnpm dlx shadcn@latest add breadcrumb` 후 스토리 작성 (2단계/3단계/말줄임 변형) — `packages/ui/src/components/breadcrumb.tsx`, `packages/ui/src/components/breadcrumb.stories.tsx`
- [X] T036 [P] [US1] `pnpm dlx shadcn@latest add collapsible` 후 스토리 작성 (열림/닫힘 상태) — `packages/ui/src/components/collapsible.tsx`, `packages/ui/src/components/collapsible.stories.tsx`
- [X] T037 [P] [US1] `pnpm dlx shadcn@latest add context-menu` 후 스토리 작성 (기본 항목, 서브메뉴 포함) — `packages/ui/src/components/context-menu.tsx`, `packages/ui/src/components/context-menu.stories.tsx`
- [X] T038 [P] [US1] `pnpm dlx shadcn@latest add dialog` 후 스토리 작성 (기본/폼 포함/스크롤 변형) — `packages/ui/src/components/dialog.tsx`, `packages/ui/src/stories/dialog.stories.tsx`
- [X] T039 [P] [US1] `pnpm dlx shadcn@latest add drawer` 후 스토리 작성 (방향: top/right/bottom/left) — `packages/ui/src/components/drawer.tsx`, `packages/ui/src/components/drawer.stories.tsx`
- [X] T040 [P] [US1] `pnpm dlx shadcn@latest add dropdown-menu` 후 스토리 작성 (기본/체크박스/라디오 그룹 항목) — `packages/ui/src/components/dropdown-menu.tsx`, `packages/ui/src/components/dropdown-menu.stories.tsx`
- [X] T041 [P] [US1] `pnpm dlx shadcn@latest add hover-card` 후 스토리 작성 (기본 hover 트리거) — `packages/ui/src/components/hover-card.tsx`, `packages/ui/src/components/hover-card.stories.tsx`
- [X] T042 [P] [US1] Input Group 컴포넌트 구현 (shadcn/ui 미제공, `prefix?: ReactNode`, `suffix?: ReactNode` 슬롯이 있는 Input 래퍼, 토큰 border/background 통합) 및 스토리 작성 (prefix만/suffix만/양쪽 모두) — `packages/ui/src/components/input-group.tsx`, `packages/ui/src/stories/input-group.stories.tsx`
- [X] T043 [P] [US1] `pnpm dlx shadcn@latest add input-otp` 후 스토리 작성 (4자리/6자리 변형) — `packages/ui/src/components/input-otp.tsx`, `packages/ui/src/components/input-otp.stories.tsx`
- [X] T044 [P] [US1] `pnpm dlx shadcn@latest add menubar` 후 스토리 작성 (기본 메뉴바, 서브메뉴 포함) — `packages/ui/src/components/menubar.tsx`, `packages/ui/src/components/menubar.stories.tsx`
- [X] T045 [P] [US1] `pnpm dlx shadcn@latest add navigation-menu` 후 스토리 작성 (수평 내비게이션, 드롭다운 포함) — `packages/ui/src/components/navigation-menu.tsx`, `packages/ui/src/components/navigation-menu.stories.tsx`
- [X] T046 [P] [US1] `pnpm dlx shadcn@latest add pagination` 후 스토리 작성 (기본/이전·다음 버튼/생략부호 변형) — `packages/ui/src/components/pagination.tsx`, `packages/ui/src/components/pagination.stories.tsx`
- [X] T047 [P] [US1] `pnpm dlx shadcn@latest add popover` 후 스토리 작성 (기본 트리거+콘텐츠) — `packages/ui/src/components/popover.tsx`, `packages/ui/src/components/popover.stories.tsx`
- [X] T048 [P] [US1] `pnpm dlx shadcn@latest add progress` 후 스토리 작성 (0%/50%/100% 상태) — `packages/ui/src/components/progress.tsx`, `packages/ui/src/components/progress.stories.tsx`
- [X] T049 [P] [US1] `pnpm dlx shadcn@latest add sheet` 후 스토리 작성 (4방향 변형) — `packages/ui/src/components/sheet.tsx`, `packages/ui/src/components/sheet.stories.tsx`
- [X] T050 [P] [US1] `pnpm dlx shadcn@latest add sonner` 후 스토리 작성 (success/error/info/warning toast) — `packages/ui/src/components/sonner.tsx`, `packages/ui/src/components/sonner.stories.tsx`
- [X] T051 [P] [US1] `pnpm dlx shadcn@latest add tabs` 후 스토리 작성 (2탭/3탭, 비활성 탭 포함) — `packages/ui/src/components/tabs.tsx`, `packages/ui/src/stories/tabs.stories.tsx`

### 높은 복잡도 컴포넌트 (High Complexity)

- [X] T052 [P] [US1] `pnpm dlx shadcn@latest add avatar` 후 스토리 작성 (이미지/fallback 이니셜/이미지 오류 상태) — `packages/ui/src/components/avatar.tsx`, `packages/ui/src/components/avatar.stories.tsx`
- [X] T053 [US1] `pnpm dlx shadcn@latest add calendar` 후 react-day-picker v9 API 적용 (`mode` 필수 prop, `selected`/`onSelect` 패턴, `disabled` 함수로 날짜 비활성화) 및 스토리 작성 (single/range 선택 모드, 비활성 날짜) — `packages/ui/src/components/calendar.tsx`, `packages/ui/src/components/calendar.stories.tsx`
- [X] T054 [P] [US1] `pnpm dlx shadcn@latest add carousel` 후 스토리 작성 (수평/수직 방향, 자동재생) — `packages/ui/src/components/carousel.tsx`, `packages/ui/src/components/carousel.stories.tsx`
- [X] T055 [US1] `pnpm dlx shadcn@latest add chart` 후 스토리 작성 (Bar/Line/Pie/Area 차트 변형, recharts v3.8.x 기반) — `packages/ui/src/components/chart.tsx`, `packages/ui/src/components/chart.stories.tsx`
- [X] T056 [US1] `pnpm dlx shadcn@latest add command` 후 스토리 작성 (검색, 그룹, 빈 상태) — `packages/ui/src/components/command.tsx`, `packages/ui/src/components/command.stories.tsx`
- [X] T057 [US1] Combobox 컴포넌트 구현 (Command + Popover 조합) 및 스토리 작성 (기본/검색가능/다중선택) — `packages/ui/src/components/combobox.tsx`, `packages/ui/src/stories/combobox.stories.tsx`
- [X] T058 [US1] Data Table 컴포넌트 구현 (`@tanstack/react-table v8` 기반, 정렬/필터/페이지네이션) 및 스토리 작성 — `packages/ui/src/components/data-table.tsx`, `packages/ui/src/stories/data-table.stories.tsx`
- [X] T059 [US1] Date Picker 컴포넌트 구현 (Calendar v9 + Popover 조합, react-day-picker v9 API 기준) 및 스토리 작성 (단일/범위 선택) — `packages/ui/src/components/date-picker.tsx`, `packages/ui/src/components/date-picker.stories.tsx`
- [X] T060 [P] [US1] Direction 컴포넌트 구현 (RTL/LTR 컨텍스트 제공자) 및 스토리 작성 — `packages/ui/src/components/direction.tsx`, `packages/ui/src/components/direction.stories.tsx`
- [X] T061 [P] [US1] `pnpm dlx shadcn@latest add resizable` 후 스토리 작성 (수평/수직 패널 분할) — `packages/ui/src/components/resizable.tsx`, `packages/ui/src/components/resizable.stories.tsx`
- [X] T062 [US1] `pnpm dlx shadcn@latest add sidebar` 후 스토리 작성 (기본/접힌 상태/모바일 오버레이) — `packages/ui/src/components/sidebar.tsx`, `packages/ui/src/components/sidebar.stories.tsx`
- [X] T063 [P] [US1] `pnpm dlx shadcn@latest add table` 후 스토리 작성 (기본 테이블, 헤더+바디+푸터) — `packages/ui/src/components/table.tsx`, `packages/ui/src/components/table.stories.tsx`
- [X] T064 [US1] `packages/ui/src/index.ts`에 Phase 3에서 구현된 모든 컴포넌트 named export 추가 (Phase 3 컴포넌트 한정, Phase 4~6 추가분은 T102에서 최종 확인) — `packages/ui/src/index.ts`

**체크포인트**: `pnpm --filter @myorg/ui storybook` 실행 시 53개 이상 컴포넌트가 사이드바에 표시되고, 각 스토리가 오류 없이 렌더링됨. US1 독립 검증 완료.

---

## Phase 4: 사용자 스토리 2 — 디자인 토큰 통합 (우선순위: P2)

**목표**: 모든 컴포넌트가 `@myorg/tokens`의 CSS custom property만 사용하며, 하드코딩된 색상/간격/타이포그래피 값이 없음을 검증하고 수정.

**독립 테스트**: 임의 컴포넌트를 import하여 렌더링 시 수동 theme prop 없이 토큰 정의 색상이 적용됨. `data-theme="dark"` 클래스 토글 시 모든 컴포넌트 색상이 다크 토큰 값으로 전환됨.

- [X] T065 [US2] `packages/ui/src/components/` 전체에서 하드코딩 색상 값(`#`, `rgb(`, `hsl(` 등) 검색 및 토큰 클래스로 교체 — `packages/ui/src/components/*.tsx`
- [X] T108 [US2] `packages/ui/src/index.css`의 Sidebar CSS 변수(`--sidebar`, `--sidebar-foreground` 등 8개) 처리: `@myorg/tokens/src/css/base.css`에 sidebar 토큰 추가 후 `index.css`에서 참조하도록 교체 (FR-002 준수 — 하드코딩 색상값 제거) — `packages/tokens/src/css/base.css`, `packages/ui/src/index.css`
- [X] T066 [P] [US2] `packages/ui/.storybook/preview.ts`에 라이트/다크 모드 전환 툴바 추가 (Storybook UI 전용 — 개발 중 다크모드 시각 확인용) — `packages/ui/.storybook/preview.ts`
- [X] T067 [P] [US2] `packages/ui/src/index.css`의 `@theme` 블록에서 `@myorg/tokens` CSS 변수 매핑 전체 확인 (color, spacing, radius, typography — Tailwind v4 기준, `tailwind.config.ts` 없음) — `packages/ui/src/index.css`
- [X] T068 [US2] Chart 컴포넌트의 색상을 `@myorg/tokens` chart 토큰 CSS 변수로 교체 — `packages/ui/src/components/chart.tsx`
- [X] T069 [P] [US2] Button/Badge/Alert 등 variant 색상이 토큰 변수(`--color-primary`, `--color-destructive` 등)를 통해 적용됨을 각 스토리에서 시각 확인 및 문서화 — `packages/ui/src/components/`
- [X] T070 [P] [US2] `packages/ui/src/index.css` 다크모드 지원: `[data-theme="dark"]` 및 `.dark` 선택자에서 `@myorg/tokens` 다크 CSS 변수 오버라이드 적용 (프로덕션 CSS 전용 — T066의 Storybook 툴바와 구분) — `packages/ui/src/index.css`

**체크포인트**: 모든 컴포넌트 소스에 하드코딩 색상 값 없음. 다크모드 토글 시 시각적으로 올바르게 전환됨. US2 독립 검증 완료.

---

## Phase 5: 사용자 스토리 3 — 자동화 UI 테스트 (우선순위: P2)

**목표**: 모든 Storybook 스토리에 `play` 함수 추가 및 `@storybook/test-runner 0.24.3`으로 CI에서 실행 가능한 자동화 테스트 스위트 구성.

**독립 테스트**: `pnpm --filter @myorg/ui test-storybook` 실행 시 전체 스토리에 대해 통과/실패 보고서가 출력되고, 렌더링 오류 및 접근성 위반이 감지됨.

> **v10.3.3 play 함수 import 패턴**: 모든 스토리에서 `import { expect, within, userEvent } from '@storybook/test'` 사용 (Storybook 10.3.3 내장)

### 낮은 복잡도 컴포넌트 play 함수

- [X] T071 [P] [US3] Accordion 스토리에 `play` 함수 추가 (아이템 클릭 → 패널 열림 확인) — `packages/ui/src/stories/accordion.stories.tsx`
- [X] T072 [P] [US3] Alert 스토리에 `play` 함수 추가 (렌더링 + role="alert" 확인) — `packages/ui/src/stories/alert.stories.tsx`
- [X] T073 [P] [US3] Badge 스토리에 `play` 함수 추가 (렌더링 + 텍스트 확인) — `packages/ui/src/components/badge.stories.tsx`
- [X] T074 [P] [US3] Button 스토리에 `play` 함수 추가 (클릭 이벤트 + role="button" + 비활성 상태 확인) — `packages/ui/src/stories/button.stories.tsx`
- [X] T075 [P] [US3] Checkbox 스토리에 `play` 함수 추가 (클릭 → checked 상태 토글 확인) — `packages/ui/src/stories/checkbox.stories.tsx`
- [X] T076 [P] [US3] Input 스토리에 `play` 함수 추가 (텍스트 입력 → value 변경 확인) — `packages/ui/src/stories/input.stories.tsx`
- [X] T077 [P] [US3] Radio Group 스토리에 `play` 함수 추가 (옵션 클릭 → 선택 상태 확인) — `packages/ui/src/stories/radio-group.stories.tsx`
- [X] T078 [P] [US3] Switch 스토리에 `play` 함수 추가 (클릭 → on/off 토글 확인) — `packages/ui/src/components/switch.stories.tsx`
- [X] T079 [P] [US3] Spinner 스토리에 `play` 함수 추가 (렌더링 + role="status" 확인) — `packages/ui/src/stories/spinner.stories.tsx`
- [X] T080 [P] [US3] Empty/Field/Item/Kbd/Label/Separator/Aspect Ratio 스토리에 `play` 함수 추가 (렌더링 + ARIA 역할 확인) — `packages/ui/src/components/empty.stories.tsx`, `packages/ui/src/stories/field.stories.tsx`, `packages/ui/src/components/item.stories.tsx`, `packages/ui/src/components/kbd.stories.tsx`, `packages/ui/src/components/label.stories.tsx`, `packages/ui/src/components/separator.stories.tsx`, `packages/ui/src/components/aspect-ratio.stories.tsx`

### 중간 복잡도 컴포넌트 play 함수

- [X] T081 [P] [US3] Alert Dialog 스토리에 `play` 함수 추가 (트리거 클릭 → 다이얼로그 열림 → 취소/확인 버튼 확인) — `packages/ui/src/components/alert-dialog.stories.tsx`
- [X] T082 [P] [US3] Dialog 스토리에 `play` 함수 추가 (열기 → 포커스 이동 → ESC 닫기 확인) — `packages/ui/src/stories/dialog.stories.tsx`
- [X] T083 [P] [US3] Drawer/Sheet 스토리에 `play` 함수 추가 (트리거 클릭 → 패널 표시 확인) — `packages/ui/src/components/drawer.stories.tsx`, `packages/ui/src/components/sheet.stories.tsx`
- [X] T084 [P] [US3] Dropdown Menu 스토리에 `play` 함수 추가 (트리거 클릭 → 메뉴 표시 → 항목 클릭 확인) — `packages/ui/src/components/dropdown-menu.stories.tsx`
- [X] T085 [P] [US3] Tabs 스토리에 `play` 함수 추가 (탭 클릭 → 패널 전환 확인) — `packages/ui/src/stories/tabs.stories.tsx`
- [X] T086 [P] [US3] Collapsible/Popover/Hover Card/Pagination/Progress/Breadcrumb 스토리에 `play` 함수 추가 (렌더링 + 기본 인터랙션 확인) — `packages/ui/src/components/collapsible.stories.tsx`, `packages/ui/src/components/popover.stories.tsx`, `packages/ui/src/components/hover-card.stories.tsx`, `packages/ui/src/components/pagination.stories.tsx`, `packages/ui/src/components/progress.stories.tsx`, `packages/ui/src/components/breadcrumb.stories.tsx`
- [X] T087 [P] [US3] Sonner 스토리에 `play` 함수 추가 (toast 표시 → 메시지 텍스트 확인) — `packages/ui/src/components/sonner.stories.tsx`
- [X] T088 [P] [US3] Input OTP/Input Group/Native Select/Menubar/Navigation Menu/Context Menu 스토리에 `play` 함수 추가 — `packages/ui/src/components/input-otp.stories.tsx`, `packages/ui/src/stories/input-group.stories.tsx`, `packages/ui/src/stories/native-select.stories.tsx`, `packages/ui/src/components/menubar.stories.tsx`, `packages/ui/src/components/navigation-menu.stories.tsx`, `packages/ui/src/components/context-menu.stories.tsx`

### 높은 복잡도 컴포넌트 play 함수

- [X] T089 [US3] Command 스토리에 `play` 함수 추가 (검색 입력 → 결과 필터링 확인) — `packages/ui/src/components/command.stories.tsx`
- [X] T090 [US3] Combobox 스토리에 `play` 함수 추가 (팝오버 열기 → 옵션 선택 → 값 표시 확인) — `packages/ui/src/stories/combobox.stories.tsx`
- [X] T091 [US3] Data Table 스토리에 `play` 함수 추가 (컬럼 헤더 클릭 → 정렬 확인) — `packages/ui/src/stories/data-table.stories.tsx`
- [X] T092 [US3] Calendar/Date Picker 스토리에 `play` 함수 추가 (날짜 클릭 → 선택 상태 확인) — `packages/ui/src/components/calendar.stories.tsx`, `packages/ui/src/components/date-picker.stories.tsx`
- [X] T093 [P] [US3] Avatar/Carousel/Sidebar/Resizable/Table/Chart/Button Group 스토리에 `play` 함수 추가 (렌더링 + 기본 인터랙션 확인) — `packages/ui/src/components/avatar.stories.tsx`, `packages/ui/src/components/carousel.stories.tsx`, `packages/ui/src/components/sidebar.stories.tsx`, `packages/ui/src/components/resizable.stories.tsx`, `packages/ui/src/components/table.stories.tsx`, `packages/ui/src/components/chart.stories.tsx`, `packages/ui/src/components/button-group.stories.tsx`

### 테스트 인프라

- [X] T094 [US3] `packages/ui/package.json`에 `test-storybook` 스크립트 추가 (`@storybook/test-runner 0.24.3` devDependency 포함, `--ci` 플래그로 CI 모드 실행) — `packages/ui/package.json`
- [X] T095 [US3] `@storybook/addon-a11y`가 모든 스토리에서 기본 활성화됨을 확인 (Storybook v10.3.3 `preview.ts`에서 `a11y` parameters 설정, `runOnly: ['wcag2a', 'wcag2aa']`) — `packages/ui/.storybook/preview.ts`
- [X] T096 [US3] CI 파이프라인 설정 파일 생성 (Storybook 빌드 → test-runner 실행 → 5분 타임아웃 게이트, SC-006 충족, 헌법 IV 성능 원칙 준수) — `.github/workflows/storybook-test.yml`

**체크포인트**: `pnpm --filter @myorg/ui test-storybook` 전체 스위트 통과, 5분 이내 완료. CI 파이프라인에서 자동 실행. US3 독립 검증 완료.

---

## Phase 6: 사용자 스토리 4 — 재사용 가능한 조합 패턴 (우선순위: P3)

**목표**: 개발자가 커스텀 스타일 없이 기본 요소를 조합하여 복잡한 UI를 구성할 수 있음을 검증하고 조합 예시 스토리를 제공.

**독립 테스트**: 디자인 시스템 exports만 사용해 Dialog + Form + Button, Card + DataTable + Pagination을 조합한 스토리가 올바르게 렌더링되고 인터랙션이 동작함.

- [X] T097 [US4] "Dialog + Form" 조합 스토리 작성 (Dialog + Input + Field + Button 조합, 유효성 검증 포함) — `packages/ui/src/stories/dialog.stories.tsx`
- [X] T098 [US4] "Card + DataTable + Pagination" 조합 스토리 작성 (Card 안에 DataTable과 Pagination 배치) — `packages/ui/src/stories/data-table.stories.tsx`
- [X] T099 [P] [US4] "Sidebar + Navigation Menu" 조합 스토리 작성 (Sidebar 안에 Navigation Menu 배치, 접힘/펼침) — `packages/ui/src/components/sidebar.stories.tsx`
- [X] T100 [P] [US4] "Combobox + Field" 조합 스토리 작성 (Field 래퍼 안에 Combobox 배치, 오류 상태 포함) — `packages/ui/src/stories/combobox.stories.tsx`
- [X] T101 [P] [US4] quickstart.md의 조합 예시가 실제 동작함을 확인하는 통합 스토리 작성 — `packages/ui/src/stories/composition.stories.tsx`

**체크포인트**: 조합 스토리들이 오류 없이 렌더링되고, 각 컴포넌트 경계에서 스타일 충돌 없음. US4 독립 검증 완료.

---

## Phase 7: 마무리 및 공통 관심사 (Polish)

**목적**: 공개 API 완성, 빌드 파이프라인 검증, 프로젝트 문서 업데이트

- [X] T102 `packages/ui/src/index.ts`에서 53개 이상 컴포넌트 전체 named export 최종 확인 및 타입 export 추가 (Phase 3~6 전체 컴포넌트 포함 확인) — `packages/ui/src/index.ts`
- [X] T103 [P] `pnpm --filter @myorg/ui build` 실행 및 빌드 오류 수정 (ESM+CJS+dts 모두 생성 확인) — `packages/ui/dist/`
- [X] T104 [P] `pnpm build` (전체 워크스페이스) 실행하여 `@myorg/tokens → @myorg/ui` 빌드 순서 확인 — 루트 `turbo.json`
- [X] T105 [P] CLAUDE.md에 `@myorg/ui` 패키지 정보 및 명령어 추가 — `CLAUDE.md`
- [X] T106 [P] `pnpm --filter @myorg/ui lint` 통과 확인 및 Biome lint/format 오류 수정 (`biome check src .storybook`) — `packages/ui/src/`
- [X] T107 quickstart.md의 설치 및 사용 예시가 Tailwind v4 + Storybook v10.3.3 환경에서 실제 동작함을 최종 확인 — `specs/002-design-system-ui/quickstart.md`

**체크포인트**: 빌드 성공, 린트 통과, 전체 테스트 스위트 통과, 공개 API 완성

---

## 의존성 및 실행 순서

### Phase 의존성

- **Setup (Phase 1)**: 의존성 없음 — 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 후 시작 — 모든 컴포넌트 구현 단계를 블록
- **US1 (Phase 3)**: Phase 2 완료 후 시작 — [P] 표시 태스크는 병렬 실행 가능
- **US2 (Phase 4)**: Phase 3 완료 후 시작 — 컴포넌트가 모두 존재해야 토큰 감사 가능
- **US3 (Phase 5)**: Phase 3 완료 후 시작 — 스토리가 존재해야 play 함수 추가 가능 (US2와 병렬 가능)
- **US4 (Phase 6)**: Phase 3 완료 후 시작 — US2/US3과 병렬 가능
- **Polish (Phase 7)**: Phase 3~6 완료 후 시작

### 사용자 스토리 의존성

- **US1 (P1)**: Phase 2 완료 후 시작 가능 — 다른 스토리에 의존 없음
- **US2 (P2)**: US1 완료 후 시작 — 컴포넌트 존재 필요
- **US3 (P2)**: US1 완료 후 시작 가능 — US2와 병렬 실행 가능
- **US4 (P3)**: US1 완료 후 시작 가능 — US2/US3과 병렬 실행 가능

### Phase 3 내부 병렬 기회

```text
T015~T033 (낮은 복잡도 19개): 모두 [P] — 동시 실행 가능
T034~T051 (중간 복잡도 18개): 모두 [P] — T015~T033과 동시 실행 가능
T052~T063 (높은 복잡도): 일부 [P] — 의존 관계 없는 컴포넌트끼리 병렬 실행
```

---

## 병렬 실행 예시: US1 (Phase 3)

```text
# 낮은 + 중간 복잡도 동시 시작 (모두 [P]):
T015 Accordion     ← 병렬
T016 Alert         ← 병렬
T017 Aspect Ratio  ← 병렬
...
T034 Alert Dialog  ← 병렬 (낮은 복잡도와 동시)
T035 Breadcrumb    ← 병렬
...

# 높은 복잡도 (T053, T055, T056, T059, T062 — 직렬):
Calendar → 완료 후 Date Picker
Command → 완료 후 Combobox
Data Table 독립 실행
Sidebar 독립 실행
```

---

## 구현 전략

### MVP 우선 (US1만)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (필수 — 이후 단계 블록)
3. Phase 3: US1 (모든 컴포넌트 + 기본 스토리) 완료
4. **중단 및 검증**: Storybook에서 53개 이상 컴포넌트 탐색 가능 확인
5. 필요 시 데모/배포

### 점진적 인도 (Incremental Delivery)

1. Setup + Foundational → 기반 준비
2. US1 → Storybook 컴포넌트 탐색 가능 → MVP 데모
3. US2 + US3 병렬 → 토큰 통합 + 자동화 테스트
4. US4 → 조합 패턴
5. Polish → 빌드 + 배포 준비

### 팀 병렬 전략 (3명 기준)

```text
Phase 1~2 완료 후:
  개발자 A: T015~T033 (낮은 복잡도 19개 컴포넌트)
  개발자 B: T034~T051 (중간 복잡도 18개 컴포넌트)
  개발자 C: T052~T063 (높은 복잡도 컴포넌트)

Phase 4~6 (US1 완료 후):
  개발자 A: Phase 4 (토큰 감사)
  개발자 B: Phase 5 (play 함수)
  개발자 C: Phase 6 (조합 패턴)
```

---

## 참고사항

- [P] 태스크 = 다른 파일, 의존성 없음 → 병렬 실행 가능
- [Story] 레이블로 사용자 스토리와 태스크 추적 가능
- 각 사용자 스토리는 독립적으로 완성 및 테스트 가능
- 체크포인트마다 해당 스토리 독립 검증 후 진행
- shadcn/ui 컴포넌트 추가 후 항상 `packages/ui/src/index.ts` export 업데이트 필요
- 커밋: 태스크 또는 논리적 그룹 완료 후 커밋
- **Storybook v10.3.3**: `import { expect, within, userEvent } from '@storybook/test'` (v10 내장), framework: `storybook/react-vite`
- **Biome v2.4.9**: ESLint 대체. `biome check src .storybook`으로 lint + format 통합 실행. `biome.json` 설정 파일 사용
- **Tailwind v4**: `tailwind.config.ts` 생성 금지. `src/index.css`의 `@theme` 블록으로 토큰 연결
- **react-day-picker v9**: Calendar/Date Picker에서 `mode` 필수 prop, v8과 API 다름
- **컴포넌트 파일 구조**: Flat 방식 — `src/components/accordion.tsx` (서브디렉터리 아님)
- **스토리 파일 위치**: 복합 컴포넌트 → `src/stories/`, 단순 컴포넌트 → `src/components/*.stories.tsx`
