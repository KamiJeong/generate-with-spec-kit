# Tasks: 디자인 토큰 시스템 개선

**Input**: Design documents from `/specs/008-design-token-improve/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: 유저 스토리(US1~US3) 기준 독립 구현/검증 가능하도록 구성  
**TDD**: Constitution 원칙 II에 따라 각 스토리의 테스트를 구현 전 먼저 작성(실패 확인 후 구현)

## Format: `[ID] [P?] [Story?] 설명 — 파일 경로`

- **[P]**: 병렬 실행 가능 (다른 파일, 미완성 태스크 의존 없음)
- **[Story]**: 해당 유저 스토리 라벨 (US1~US3)
- 각 파일 경로는 레포 루트 기준 절대 경로

---

## Phase 1: Setup (환경 준비)

**Purpose**: 폰트 패키지 설치 및 빌드 환경 확인

- [X] T001 `pretendard`와 `@fontsource/noto-sans-kr`를 devDependencies가 아닌 의존성으로 추가 — `packages/tokens/package.json` (`pnpm --filter @myorg/tokens add pretendard @fontsource/noto-sans-kr`)
- [X] T002 [P] 기존 테스트 전체 실행하여 현재 베이스라인 통과 확인 — `pnpm --filter @myorg/tokens test`

---

## Phase 2: Foundational (공통 전제)

**Purpose**: 모든 유저 스토리가 공유하는 export 구조 준비. US1·US2 구현 전 완료 필수.

**⚠️ CRITICAL**: Phase 2 완료 전 US1~US3 작업 시작 불가

- [X] T003 `packages/tokens/src/index.ts`에서 `brandColor`가 `brand['600']`를 참조하도록 export 계획 수립 — 기존 `primary['500']` 참조를 제거하고 `brand` export로 전환할 위치 주석으로 표시 (`packages/tokens/src/index.ts`)
- [X] T004 `packages/tokens/tests/colors.test.ts`의 기존 `primary` 팔레트 스냅샷 테스트를 확인하여, 이후 `brand` 팔레트로 교체 시 업데이트해야 할 단언(assertion) 목록을 파악

**Checkpoint**: 공통 구조 준비 완료 — US1·US2 병렬 진행 가능

---

## Phase 3: User Story 1 — 브랜드 컬러 스케일 분리 (Priority: P1) 🎯 MVP

**Goal**: `#d92b33`을 600 앵커로 재정의하고 파괴적 컬러를 hue 22°(오렌지-레드)로 완전 분리하여 `--primary ≠ --destructive` 계약을 달성한다.

**Independent Test**: `pnpm --filter @myorg/tokens test` 실행 시 모든 컬러 테스트가 통과하고, Storybook에서 브랜드 컬러(빨강)와 파괴적 컬러(오렌지-레드)가 시각적으로 구분되어야 한다.

### TDD: US1 테스트 먼저 작성 (실패 확인 후 구현)

> **NOTE: 아래 테스트를 먼저 작성하고 실패를 확인한 뒤 구현으로 진행**

- [X] T005 [P] [US1] `brand['600'] === '#d92b33'` 단언과 600 앵커 계약 테스트 추가 — `packages/tokens/tests/colors.test.ts`
- [X] T006 [P] [US1] `destructivePalette` 존재 및 hue ≈ 22° 검증 테스트 추가 (hsl 파싱 후 hue값 범위 검사: 15° < hue < 30°) — `packages/tokens/tests/colors.test.ts`
- [X] T007 [P] [US1] `semanticHsl.destructive !== semanticHsl.primary` 불변 계약 테스트 추가 — `packages/tokens/tests/contrast.test.ts`
- [X] T008 [P] [US1] `destructiveForeground` on `destructive` WCAG AA(≥4.5:1) 명암비 테스트 케이스 추가 — `packages/tokens/tests/contrast.test.ts`

### 구현: US1

- [X] T009 [US1] `primitives/colors.ts`에 `brand` / `brandHsl` 팔레트 추가 (600 앵커 = `#d92b33`, 50~950 재계산 값은 research.md 참조) — `packages/tokens/src/primitives/colors.ts`
- [X] T010 [US1] `primitives/colors.ts`에 `destructivePalette` / `destructiveHsl` 팔레트 추가 (hue ≈ 22°, 600 기본값 = `#ea6c0a`, 값은 research.md 참조) — `packages/tokens/src/primitives/colors.ts`
- [X] T011 [US1] `semantic/index.ts`의 `semanticHsl.destructive`를 `primaryHsl['500']`에서 `destructiveHsl['600']`으로 교체, `ring`을 `brandHsl['600']`으로 업데이트 — `packages/tokens/src/semantic/index.ts`
- [X] T012 [US1] `css/base.css`의 `:root`에서 `--destructive`를 `22 93% 47%`로 교체, `--primary`는 `357 70% 51%`(600 앵커 = 기존값 동일) 유지 확인 — `packages/tokens/src/css/base.css`
- [X] T013 [US1] `index.ts`의 `colors` export에 `brand`와 `destructivePalette` 추가, `brandColor`를 `brand['600']`으로 업데이트, 기존 `primary` export는 하위 호환을 위해 `brand`의 별칭으로 유지 — `packages/tokens/src/index.ts`
- [X] T014 [US1] 기존 `colors.test.ts`의 `primary` 팔레트 스냅샷 테스트를 `brand` 팔레트 새 값으로 업데이트 — `packages/tokens/tests/colors.test.ts`
- [X] T015 [US1] `pnpm --filter @myorg/tokens test` 실행하여 T005~T008에서 작성한 테스트 포함 전체 통과 확인

**Checkpoint**: US1 완료 — 브랜드/파괴적 컬러가 독립적으로 식별 가능. Storybook 시각 확인 가능.

---

## Phase 4: User Story 2 — 한국어 폰트 패밀리 (Priority: P2)

**Goal**: `fontFamily.sans` 1순위로 Pretendard Variable, 2순위로 Noto Sans KR, 최종 fallback으로 시스템 한국어 폰트를 포함하는 폰트 토큰을 제공한다. `heading` 및 `mono` 용도별 폰트도 정의한다.

**Independent Test**: `pnpm --filter @myorg/tokens test` 에서 폰트 테스트 통과, 브라우저에서 `@myorg/tokens/css`를 import했을 때 Pretendard가 실제 로드되어야 한다.

> US1과 병렬 진행 가능 (다른 파일 수정)

### TDD: US2 테스트 먼저 작성

> **NOTE: 아래 테스트를 먼저 작성하고 실패를 확인한 뒤 구현으로 진행**

- [X] T016 [P] [US2] `fontFamily.sans[0]`이 `'Pretendard Variable'`임을 검증하는 테스트 추가 — `packages/tokens/tests/typography.test.ts`
- [X] T017 [P] [US2] `fontFamily.sans`에 `'Noto Sans KR'`이 포함됨을 검증하는 테스트 추가 — `packages/tokens/tests/typography.test.ts`
- [X] T018 [P] [US2] `fontFamily.heading`과 `fontFamily.mono`가 각각 정의되어 있음을 검증하는 테스트 추가 — `packages/tokens/tests/typography.test.ts`

### 구현: US2

- [X] T019 [US2] `primitives/typography.ts`의 `fontFamily.sans`를 Pretendard Variable 우선 한국어 최적화 스택으로 교체, `heading`(sans와 동일)과 `mono`(JetBrains Mono 등) 추가 — `packages/tokens/src/primitives/typography.ts`
- [X] T020 [US2] `css/base.css`의 `:root`에 `--font-sans`, `--font-heading`, `--font-mono` CSS 변수 추가 (폰트 패밀리 스택은 tokens 값과 동일) — `packages/tokens/src/css/base.css`
- [X] T021 [US2] `pnpm --filter @myorg/tokens test` 실행하여 T016~T018 포함 전체 통과 확인

**Checkpoint**: US2 완료 — 한국어 폰트 토큰 독립적으로 사용 가능.

---

## Phase 5: User Story 3 — 다크 모드 지원 (Priority: P3)

**Goal**: 모든 의미론적 색상 토큰에 라이트/다크 값을 분리 정의하고, CSS에서 `.dark` / `[data-theme='dark']` 선택자로 전환되며, localStorage에 사용자 설정을 유지하는 테마 유틸리티를 제공한다.

**Independent Test**: `[data-theme='dark']` 속성을 `<html>`에 적용 시 모든 semantic 색상 변수가 다크 값으로 변경되고, `semanticHslDark.destructive !== semanticHslDark.primary` 계약을 유지해야 한다.

> US1 완료 후 시작 (brand/destructive 팔레트 의존)

### TDD: US3 테스트 먼저 작성

> **NOTE: 아래 테스트를 먼저 작성하고 실패를 확인한 뒤 구현으로 진행**

- [X] T022 [P] [US3] `semanticHslDark` export가 존재하고 `semanticHsl`과 동일한 키 구조를 가짐을 검증, `semanticHslDark.background !== semanticHsl.background` 단언 추가 — `packages/tokens/tests/semantic-dark.test.ts` (신규)
- [X] T023 [P] [US3] 다크 모드에서도 `destructive !== primary` 계약 검증 테스트 추가 — `packages/tokens/tests/semantic-dark.test.ts`
- [X] T024 [P] [US3] 다크 모드 주요 조합(foreground on background, destructiveForeground on destructive) WCAG AA 명암비 검증 테스트 추가 — `packages/tokens/tests/semantic-dark.test.ts`
- [X] T025 [P] [US3] `getTheme()` 초기값 반환, `setTheme('dark')` 후 `getTheme() === 'dark'` 반환, `initTheme()` 함수 존재 여부 테스트 — `packages/tokens/tests/theme-utils.test.ts` (신규, jsdom 환경 필요 시 vitest.config.ts 환경 설정 확인)

### 구현: US3

- [X] T026 [US3] `semantic/dark.ts` 신규 생성 — data-model.md의 "엔티티 4" 표를 기준으로 `semanticHslDark` 객체 구현 (brandHsl['400'], destructiveHsl['400'] 등 다크 값 사용) — `packages/tokens/src/semantic/dark.ts`
- [X] T027 [US3] `css/base.css`의 `.dark, [data-theme='dark']` 선택자에 전체 semantic CSS 변수 추가 (background, foreground, card, primary, destructive, border 등 — data-model.md 엔티티 6 참조) — `packages/tokens/src/css/base.css`
- [X] T028 [US3] `theme-utils.ts` 신규 생성 — `getTheme()`, `setTheme(theme)`, `initTheme()` 구현 (localStorage `'theme'` 키 사용, `prefers-color-scheme` fallback, `data-theme` 속성 제어) — `packages/tokens/src/theme-utils.ts`
- [X] T029 [US3] `index.ts`에 `semanticHslDark`, `getTheme`, `setTheme`, `initTheme` export 추가 — `packages/tokens/src/index.ts`
- [X] T030 [US3] `pnpm --filter @myorg/tokens test` 실행하여 T022~T025 포함 전체 통과 확인

**Checkpoint**: US3 완료 — 다크 모드 CSS 변수 및 테마 유틸 독립적으로 검증 가능.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 빌드 검증, export 일관성, 린트/포맷 정리

- [X] T031 [P] `pnpm --filter @myorg/tokens lint` 실행하여 Biome 린트/포맷 에러 0건 확인, 필요 시 수정
- [X] T032 `pnpm --filter @myorg/tokens build` 실행하여 `dist/` 빌드 성공 확인 — `packages/tokens/tsup.config.ts`에 신규 파일(dark.ts, theme-utils.ts) 포함 여부 확인
- [X] T033 [P] 기존 `palette.test.ts`, `css-variables.test.ts`, `tailwind-preset.test.ts` 테스트가 변경된 팔레트/변수와 호환되는지 확인하고 필요한 스냅샷/값 업데이트 — `packages/tokens/tests/`
- [X] T034 전체 테스트 커버리지 80% 이상 확인 — `pnpm --filter @myorg/tokens test` 커버리지 리포트 확인
- [X] T035 [P] `contracts/token-api.md`의 불변 계약(`brand['600'] === '#d92b33'`, `destructive !== primary`) 이 실제 구현과 일치하는지 최종 검토

---

## Dependencies & Execution Order

### Phase 의존 관계

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 → US1~US3 전체 차단
- **Phase 3 (US1)**: Phase 2 완료 후 시작. **US3 시작 전 완료 필수**
- **Phase 4 (US2)**: Phase 2 완료 후 시작 — US1과 병렬 진행 가능 (다른 파일)
- **Phase 5 (US3)**: **US1 완료 후 시작** (brand/destructive 팔레트 의존)
- **Phase 6 (Polish)**: US1~US3 모두 완료 후 진행

### 유저 스토리 간 의존 관계

- **US1 (P1)**: Phase 2 후 독립 시작
- **US2 (P2)**: Phase 2 후 독립 시작, US1과 병렬 가능
- **US3 (P3)**: **US1 완료 필수**, US2와는 독립

### 스토리 내 실행 순서

1. 테스트 작성 (실패 확인)
2. 구현 (테스트 통과)
3. 체크포인트 검증

---

## Parallel Example: US1 + US2 병렬

```bash
# Phase 2 완료 후 두 Agent 동시 실행 가능:

Agent A (US1 담당):
  T005 → T006 → T007 → T008  # 테스트 먼저
  T009 → T010 → T011 → T012 → T013 → T014 → T015  # 구현

Agent B (US2 담당):
  T016 → T017 → T018  # 테스트 먼저
  T019 → T020 → T021  # 구현

# US1 완료 후 US3 시작:
Agent A or B (US3):
  T022 → T023 → T024 → T025  # 테스트 먼저
  T026 → T027 → T028 → T029 → T030  # 구현
```

---

## Implementation Strategy

### MVP (US1만 완성)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료
3. Phase 3: US1 완료
4. **STOP & VALIDATE**: `pnpm --filter @myorg/tokens test` 전체 통과, Storybook 시각 확인
5. MVP 달성 — 브랜드/파괴적 색상 분리 완료

### Incremental Delivery

1. Setup + Foundational → 환경 준비
2. US1 → 컬러 분리 완료 → 검증 (MVP)
3. US2 → 한국어 폰트 → 검증
4. US3 → 다크 모드 → 검증
5. Polish → 빌드/린트 최종 확인

---

## Notes

- `[P]` 태스크 = 다른 파일 수정, 미완료 태스크 의존 없음
- TDD 필수: 테스트 작성 → 실패 확인 → 구현 → 통과 확인
- `brand['600'] === '#d92b33'` 불변 계약 — 이 값은 절대 변경 금지
- `--primary` CSS 변수값은 600 앵커이므로 기존 값(`357 70% 51%`)과 동일하게 유지
- 다크 모드 테마 유틸(`theme-utils.ts`)은 브라우저 환경 전용 (SSR 시 `typeof window` 가드 필요)
