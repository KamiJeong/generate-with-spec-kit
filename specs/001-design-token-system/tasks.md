# Tasks: B2C 디자인 토큰 시스템

**Input**: Design documents from `/specs/001-design-token-system/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: Constitution(테스트 표준 II)에서 TDD MUST 적용을 명시. 각 User Story에 테스트 태스크 포함.

**Organization**: User Story 우선순위(P1→P2→P3) 순서로 페이즈 구성. 각 스토리는 독립 구현·테스트 가능.

**Changes from v1**: T035(CI 파이프라인) 추가 — retrospective.md SIGNIFICANT 발견 반영. FR-005 spec 수정 반영(타이포그래피 태스크 변경 없음).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 선행 태스크 불필요)
- **[Story]**: 해당 태스크가 속한 User Story (US1, US2, US3)
- 각 태스크에 정확한 파일 경로 포함

---

## Phase 1: Setup (모노레포 초기화)

**Purpose**: pnpm monorepo 골격 및 packages/tokens 패키지 기반 구조 생성

- [X] T001 Initialize pnpm monorepo root — create `pnpm-workspace.yaml` listing `packages/*` and `apps/*`
- [X] T002 Create root `package.json` with `"private": true` and Turborepo devDependency (`turbo@^2`)
- [X] T003 Create `turbo.json` defining `build`, `test`, `lint` pipeline with correct `dependsOn` and `outputs`
- [X] T004 Create `packages/tokens/` directory tree: `src/primitives/`, `src/semantic/`, `src/motion/`, `src/tailwind/`, `src/css/`, `tests/`, `scripts/`
- [X] T005 [P] Create `packages/tokens/package.json` — name `@myorg/tokens`, define 3 export entries: `.` (index), `./tailwind` (preset), `./css` (base.css), include `types`/`import`/`require` per each
- [X] T006 [P] Create `packages/tokens/tsconfig.json` — extend root tsconfig if present, target ES2020, `moduleResolution: bundler`, `strict: true`
- [X] T007 [P] Create `packages/tokens/tsup.config.ts` — entry: `{ index: 'src/index.ts', 'tailwind/preset': 'src/tailwind/preset.ts' }`, format: `['cjs', 'esm']`, `dts: true`
- [X] T008 [P] Create `packages/tokens/vitest.config.ts` — include `tests/**/*.test.ts`, coverage provider `v8`, threshold 80%
- [X] T009 [P] Configure ESLint + Prettier at monorepo root — `eslint.config.js` (flat config, TypeScript parser), `.prettierrc`

**Checkpoint**: `pnpm install` 성공, `turbo run build` 구조 인식

---

## Phase 2: Foundational (전체 User Story 공통 기반)

**Purpose**: 모든 User Story가 의존하는 원시 컬러 스케일 — 이 phase 완료 전 US 작업 시작 불가

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T010 Implement primitive gray color scale (11단계: 50~950, Zinc 기반 hex 값) in `packages/tokens/src/primitives/colors.ts` — export `gray` object per data-model.md §1.1
- [X] T011 [P] Implement primitive primary (brand red) color scale (11단계: 50~950, base #d92b33) in `packages/tokens/src/primitives/colors.ts` — export `primary` object alongside `gray`, export `brandColor = '#d92b33'`

**Checkpoint**: `packages/tokens/src/primitives/colors.ts` 완성 — 모든 US 태스크 병렬 시작 가능

---

## Phase 3: User Story 1 — 컬러 토큰 적용 (Priority: P1) 🎯 MVP

**Goal**: 개발자가 Tailwind 설정 + CSS 변수 2개 파일 수정만으로 전체 브랜드 컬러 시스템을 shadcn/ui에 적용

**Independent Test**: shadcn/ui Button의 기본 variant가 `#d92b33` 계열로, Card 배경이 white로, 경계선이 gray-200으로 렌더링되면 독립 검증 완료

### Tests for User Story 1 (TDD — 구현 전 작성 후 실패 확인) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T012 [P] [US1] Write primitive color value tests (gray 11개 + primary 11개 hex 정확성, brandColor = '#d92b33') in `packages/tokens/tests/colors.test.ts`
- [X] T013 [P] [US1] Write WCAG AA contrast ratio tests for all semantic token pairs (5쌍 이상, 4.5:1 최소) in `packages/tokens/tests/contrast.test.ts`
- [X] T014 [P] [US1] Write CSS variable format tests (bare HSL 형식 검증, 19개 shadcn/ui 변수 존재 + --radius 확인) in `packages/tokens/tests/css-variables.test.ts`

### Implementation for User Story 1

- [X] T015 [US1] Implement semantic token CSS-var reference strings in `packages/tokens/src/semantic/index.ts` — export `semantic` object mapping all 19 shadcn/ui tokens to `hsl(var(--token) / <alpha-value>)` format per contracts/typescript-api.md
- [X] T016 [US1] Implement motion tokens (duration + easing) in `packages/tokens/src/motion/index.ts` — export `motion` object with `duration.fast/normal/slow` and `easing.ease/easeIn/easeOut/spring` per data-model.md §4
- [X] T017 [US1] Implement Tailwind preset in `packages/tokens/src/tailwind/preset.ts` — `theme.extend.colors` covering gray (11단계), primary (11단계), and all 19 CSS-var semantic colors with `<alpha-value>`; `theme.extend.borderRadius` with `--radius`; `satisfies Config` type per contracts/tailwind-preset.md
- [X] T018 [US1] Create CSS variables file `packages/tokens/src/css/base.css` — `@layer base { :root { ... } }` with all 19 shadcn/ui variables + `--radius: 0.5rem` in bare HSL format per contracts/css-variables.md
- [X] T019 [US1] Implement main TypeScript entry point `packages/tokens/src/index.ts` — re-export `colors`, `brandColor`, `fontFamily`, `motion`, `semantic` and `ColorScale`/`SemanticColor` types per contracts/typescript-api.md
- [X] T020 [US1] Run `tsup` build and verify `dist/` contains: `index.js`, `index.cjs`, `index.d.ts`, `tailwind/preset.js`, `tailwind/preset.cjs`, `tailwind/preset.d.ts`
- [X] T021 [US1] Verify all T012–T014 tests now pass after implementation; fix any failures before proceeding

**Checkpoint**: User Story 1 완전 동작 — `bg-primary`, `text-muted-foreground` 등 Tailwind 클래스가 토큰 값으로 해석되며, 모든 US1 테스트 통과

---

## Phase 4: User Story 2 — 타이포그래피 토큰 적용 (Priority: P2)

**Goal**: 개발자가 모든 텍스트 요소에 NanumBarunGothic 폰트 패밀리 스택을 Tailwind 유틸리티로 적용 (폰트 굵기 명시적 정의, 사이즈·행간은 Tailwind 기본값)

**Independent Test**: `font-sans` 클래스 적용 시 computed font-family가 `"NanumBarunGothic", AppleGothic, Tahoma, Arial, sans-serif` 순서로 설정되면 독립 검증 완료

### Tests for User Story 2 (TDD — 구현 전 작성 후 실패 확인) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T022 [P] [US2] Write typography token tests (fontFamily 배열 길이 5, 순서, 각 항목 문자열 정확성; fontWeight 4개 값 검증) in `packages/tokens/tests/typography.test.ts`

### Implementation for User Story 2

- [X] T023 [US2] Implement typography primitive tokens in `packages/tokens/src/primitives/typography.ts` — export `fontFamily.sans` array `['"NanumBarunGothic"', 'AppleGothic', 'Tahoma', 'Arial', 'sans-serif']`, export `fontWeight` object `{ normal: '400', medium: '500', semibold: '600', bold: '700' }`
- [X] T024 [US2] Add `theme.extend.fontFamily` (sans stack) and `theme.extend.fontWeight` to Tailwind preset in `packages/tokens/src/tailwind/preset.ts` (update existing file from T017)
- [X] T025 [US2] Export `fontFamily` and `fontWeight` from `packages/tokens/src/index.ts` (update existing file from T019)
- [X] T026 [US2] Verify T022 tests pass after implementation; fix any failures

**Checkpoint**: User Stories 1 AND 2 독립 동작 — `font-sans`, `font-medium` 등 타이포그래피 유틸리티가 토큰 값으로 해석되며, 모든 US2 테스트 통과

---

## Phase 5: User Story 3 — 토큰 구조 검토 지원 (Priority: P3)

**Goal**: 디자이너/기술 리뷰어가 팔레트 완성도 및 접근성 기준 충족 여부를 한눈에 검토

**Independent Test**: `TOKENS.md` 문서에 gray 5단계+, primary 5단계+, 19개 시맨틱 토큰 정의가 모두 포함되어 있고, contrast-check 스크립트가 모든 주요 쌍의 대비비를 stdout으로 출력하면 독립 검증 완료

### Tests for User Story 3 (TDD — 구현 전 작성 후 실패 확인) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T027 [P] [US3] Write palette completeness tests (gray object has ≥7 keys, primary object has ≥5 keys, semantic object has exactly 19 keys) in `packages/tokens/tests/palette.test.ts`

### Implementation for User Story 3

- [X] T028 [US3] Create contrast-check script `packages/tokens/scripts/check-contrast.ts` — imports color values from `../src/primitives/colors`, computes WCAG relative luminance + contrast ratio for all 5 semantic pairs from data-model.md §5, prints formatted pass/fail table to stdout
- [X] T029 [US3] Generate `packages/tokens/TOKENS.md` — section 1: gray scale table (step | hex | HSL | description), section 2: primary scale table (step | hex | HSL | description), section 3: semantic token mapping table (CSS var | value | mapped token | description), section 4: typography stack; content must satisfy T027 test assertions
- [X] T030 [US3] Verify T027 tests pass after implementation; fix any failures

**Checkpoint**: 모든 User Story(1, 2, 3) 독립 동작 — 팔레트 완성도 자동 검증 + 설계자용 토큰 카탈로그 완비

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 다중 User Story에 걸친 품질·문서 마무리 및 CI 인프라

- [X] T031 [P] Update `CLAUDE.md` Active Technologies section with correct `packages/tokens` build/test commands (`pnpm --filter @myorg/tokens build`, `pnpm --filter @myorg/tokens test`)
- [X] T032 [P] Validate `specs/001-design-token-system/quickstart.md` integration steps against actual `packages/tokens/package.json` exports — update any path/entry mismatches
- [X] T033 Run full test suite via `turbo run test` — verify overall coverage ≥ 80%, fix gaps per constitution §II
- [X] T034 [P] Add `LICENSE` (MIT) and `packages/tokens/README.md` documenting the 3 entry points, basic usage, and dependency license confirmation (pnpm/Turborepo/tsup/Vitest/framer-motion — all MIT)
- [X] T035 [P] Create `.github/workflows/ci.yml` — trigger on PR to main; steps: `pnpm install`, `turbo run lint test build`; block merge on failure; enforces constitution §PR 병합 기준

**Checkpoint**: CI 파이프라인 활성화 — PR 시 lint/test/build 자동 검증

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 즉시 시작 가능 — 선행 의존 없음
- **Foundational (Phase 2)**: Phase 1 완료 후 시작 — 전체 User Story BLOCK
- **User Stories (Phase 3, 4, 5)**: Phase 2 완료 후 시작 — 각 Story는 상호 독립, 병렬 가능
- **Polish (Phase 6)**: 원하는 User Story 완료 후 시작

### User Story Dependencies

- **US1 (P1)**: Phase 2 완료 후 즉시 시작 — 다른 Story 불필요
- **US2 (P2)**: Phase 2 완료 후 시작 — US1과 독립; Tailwind preset(T017) + index.ts(T019) 파일 업데이트(T024, T025)
- **US3 (P3)**: Phase 2 완료 후 시작 — US1 색상 토큰이 있으면 contrast 스크립트 자연스럽게 연동; 독립 실행 가능

### Within Each User Story

1. 테스트 작성 (TDD — 반드시 실패 확인 후 구현 진행)
2. Primitive/Model 구현
3. Service/Mapping 구현 (semantic, tailwind, css)
4. 진입점 업데이트 (index.ts, preset.ts)
5. 빌드 검증
6. 테스트 통과 확인

### Parallel Opportunities

- T005~T009 (Phase 1 설정 파일들) — 모두 병렬 가능
- T010, T011 (Phase 2) — 같은 파일 작성이므로 순차 또는 동시 병합 커밋
- T012, T013, T014 (US1 TDD) — 병렬 가능
- T015, T016 (semantic + motion) — 병렬 가능
- T031, T032, T034, T035 (Phase 6 독립 파일들) — 병렬 가능
- US2(T022~T026)와 US3(T027~T030)는 US1 완료 후 병렬 진행 가능

---

## Parallel Example: User Story 1

```bash
# Step 1 — TDD 테스트 동시 작성 (모두 실패 상태 확인 후 진행):
Task: T012 "Write color primitive tests in packages/tokens/tests/colors.test.ts"
Task: T013 "Write WCAG contrast tests in packages/tokens/tests/contrast.test.ts"
Task: T014 "Write CSS variable format tests in packages/tokens/tests/css-variables.test.ts"

# Step 2 — 독립 모듈 동시 구현:
Task: T015 "Implement semantic tokens in packages/tokens/src/semantic/index.ts"
Task: T016 "Implement motion tokens in packages/tokens/src/motion/index.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup 완료 (T001–T009)
2. Phase 2: Foundational 완료 (T010–T011) — **필수, 건너뛰기 불가**
3. Phase 3: User Story 1 완료 (T012–T021)
4. **STOP and VALIDATE**: `bg-primary`, `text-foreground`, shadcn/ui Button 렌더링 확인
5. 소비 앱에 적용하여 컬러 토큰 동작 검증

### Incremental Delivery

1. Setup + Foundational → 패키지 골격 완성
2. **US1 완료 → MVP 배포**: 컬러 토큰 적용 (CTA, 배경, 텍스트, 경계)
3. **US2 추가 → 타이포그래피**: 폰트 패밀리 + 굵기 적용
4. **US3 추가 → 검토 도구**: 팔레트 카탈로그 + 접근성 자동 검증
5. **Polish → CI**: 자동 품질 게이트 활성화

### Parallel Team Strategy

With multiple developers:

1. Phase 1 + 2 팀 전체 완료
2. Phase 2 완료 후:
   - Developer A: User Story 1 (T012–T021)
   - Developer B: User Story 2 (T022–T026)
   - Developer C: User Story 3 (T027–T030)
3. 각 Story 독립 완료 후 Phase 6 Polish 합류

---

## Notes

- [P] 태스크 = 다른 파일, 미완료 선행 태스크 없음
- [Story] 레이블로 각 태스크를 User Story에 추적 연결
- TDD 순서 엄수: 테스트 작성 → 실패 확인 → 구현 → 통과 확인
- 각 Phase Checkpoint에서 독립 검증 후 다음 Phase 진행
- `packages/tokens/src/tailwind/preset.ts`는 T017(US1) 생성 → T024(US2) 업데이트 — 같은 파일이므로 순차 처리
- `packages/tokens/src/index.ts`는 T019(US1) 생성 → T025(US2) 업데이트 — 같은 파일이므로 순차 처리
- T035 (CI)는 retrospective.md SIGNIFICANT 발견에 의해 추가됨 — constitution §PR 병합 기준 충족
