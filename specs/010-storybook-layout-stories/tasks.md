# Tasks: Storybook 현대적 레이아웃 스토리 확장

**Input**: Design documents from `/specs/010-storybook-layout-stories/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Organization**: 사용자 스토리별로 그룹화하여 각 레이아웃 스토리를 독립적으로 구현·검증 가능하게 구성

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 미완료 의존성 없음)
- **[Story]**: 해당 사용자 스토리 레이블 (`US1`~`US4`)
- 모든 태스크 설명에 정확한 파일 경로 포함

### 핵심 구현 규칙

- 신규 스토리는 모두 `packages/ui/src/stories/layouts/` 아래에 생성한다.
- Storybook title은 모두 `Page/Layouts/*` 패턴을 사용한다.
- 각 파일은 `Default` story 1개를 기본으로 두고 `parameters.layout: 'fullscreen'`을 사용한다.
- 기존 `packages/ui` 컴포넌트와 현재 semantic token만 사용한다.
- 별도 dark-mode 전용 story, mobile 전용 story variant는 만들지 않는다.
- 카피는 모두 개발자 도구 및 생산성 제품 맥락으로 통일한다.

---

## Phase 1: Setup (공유 준비)

**Purpose**: 현재 Storybook 기준선 확인과 신규 스토리 디렉터리 준비

- [X] T001 `packages/ui/package.json` 기준으로 `pnpm --filter @myorg/ui build-storybook`를 실행해 현재 Storybook 빌드 기준선을 확인한다.
- [X] T002 `packages/ui/src/stories/layouts/` 디렉터리를 생성해 신규 레이아웃 스토리 파일 배치 위치를 준비한다.

---

## Phase 2: Foundational (차단 전제조건)

**Purpose**: 신규 레이아웃 스토리 4개가 공통으로 의존하는 Storybook 탐색/테마/컴포넌트 계약을 확인한다.

**⚠️ CRITICAL**: 이 페이즈가 끝나야 각 사용자 스토리 구현을 병렬로 진행할 수 있다.

- [X] T003 `packages/ui/.storybook/main.ts`와 `packages/ui/.storybook/preview.tsx`를 확인해 `Page/Layouts/*` 스토리 discovery, `Theme` toolbar, `Desktop 1280 / Tablet 768 / Mobile 375` viewport 계약을 기준선으로 고정한다.
- [X] T004 `packages/ui/src/components/navigation-menu.tsx`, `packages/ui/src/components/sidebar.tsx`, `packages/ui/src/components/breadcrumb.tsx`, `packages/ui/src/components/pagination.tsx`, `packages/ui/src/components/card.tsx`, `packages/ui/src/components/button.tsx`, `packages/ui/src/components/badge.tsx`, `packages/ui/src/components/accordion.tsx`, `packages/ui/src/components/avatar.tsx`, `packages/ui/src/components/separator.tsx`를 확인해 신규 레이아웃 스토리에서 재사용할 컴포넌트 조합을 확정한다.

**Checkpoint**: Setup + Foundational 완료 후 US1~US4 스토리 파일 작업을 병렬로 시작할 수 있다.

---

## Phase 3: User Story 1 - 메인 브랜드 사이트 레이아웃 참조 확보 (Priority: P1) 🎯 MVP

**Goal**: 메인 브랜드 사이트 레이아웃을 Storybook에서 완성형 흐름으로 보여준다.

**Independent Test**: Storybook에서 `Page/Layouts/BrandSite`를 열었을 때 헤더, 히어로, 가치 제안, 신뢰 요소, CTA, 푸터가 하나의 완성된 흐름으로 렌더링되면 통과.

### Implementation for User Story 1

- [X] T005 [US1] `packages/ui/src/stories/layouts/BrandSiteLayout.stories.tsx`를 생성해 `title: 'Page/Layouts/BrandSite'`, `parameters: { layout: 'fullscreen' }`, `Default` export, 개발자 도구 브랜드 홈용 header/hero/value/trust/CTA/footer 섹션을 구현한다.
- [X] T006 [US1] `packages/ui/src/stories/layouts/BrandSiteLayout.stories.tsx`에서 light/dark theme 대비와 mobile/tablet/desktop 반응형 재배치를 조정해 단일 기본 스토리만으로 모든 viewport에서 읽기 가능한 흐름을 완성한다.

**Checkpoint**: US1 완료 시 브랜드 홈 레이아웃 참조가 Storybook에서 독립적으로 검증 가능하다.

---

## Phase 4: User Story 2 - 전환 중심 제품 랜딩 페이지 패턴 학습 (Priority: P2)

**Goal**: 기능 출시 및 캠페인용 제품 랜딩 페이지 패턴을 Storybook에서 참조 가능하게 만든다.

**Independent Test**: Storybook에서 `Page/Layouts/ProductLanding`을 열었을 때 가치 제안, 기능 하이라이트, 보조 증거, 전환 CTA 흐름이 상단부터 하단까지 명확히 이어지면 통과.

### Implementation for User Story 2

- [X] T007 [P] [US2] `packages/ui/src/stories/layouts/ProductLandingLayout.stories.tsx`를 생성해 `title: 'Page/Layouts/ProductLanding'`, `Default` export, 기능 출시/캠페인용 hero, feature highlight, proof/testimonial, CTA 섹션을 구현한다.
- [X] T008 [US2] `packages/ui/src/stories/layouts/ProductLandingLayout.stories.tsx`에서 conversion-focused 섹션 밀도, CTA hierarchy, dark-mode 대비, mobile/tablet/desktop 재배치를 조정한다.

**Checkpoint**: US2 완료 시 제품 랜딩 레이아웃 참조가 독립적으로 검증 가능하다.

---

## Phase 5: User Story 3 - 문서/리소스 허브 레이아웃 참조 확보 (Priority: P3)

**Goal**: 문서 사이트와 리소스 허브에 적합한 탐색 중심 레이아웃을 Storybook에 추가한다.

**Independent Test**: Storybook에서 `Page/Layouts/DocsHub`를 열었을 때 전역 탐색, 콘텐츠 탐색, 본문/리소스 카드 영역이 동시에 이해 가능한 구조로 렌더링되면 통과.

### Implementation for User Story 3

- [X] T009 [P] [US3] `packages/ui/src/stories/layouts/DocsHubLayout.stories.tsx`를 생성해 `title: 'Page/Layouts/DocsHub'`, `Default` export, global nav, content nav, main content cards or article list, supporting CTA/footer 섹션을 구현한다.
- [X] T010 [US3] `packages/ui/src/stories/layouts/DocsHubLayout.stories.tsx`에서 Sidebar/Breadcrumb/Pagination 기반 탐색 패턴을 mobile/tablet/desktop에 맞게 재배치하고 dark-mode 가독성을 조정한다.

**Checkpoint**: US3 완료 시 정보 중심 문서/리소스 허브 레이아웃이 독립적으로 검증 가능하다.

---

## Phase 6: User Story 4 - 요금제/비교형 의사결정 페이지 패턴 학습 (Priority: P4)

**Goal**: 플랜 비교와 선택 유도를 위한 비교 중심 레이아웃을 Storybook에 추가한다.

**Independent Test**: Storybook에서 `Page/Layouts/PricingComparison`을 열었을 때 플랜 카드/비교 정보/FAQ 또는 reassurance/최종 CTA가 한 화면 흐름으로 명확히 이해되면 통과.

### Implementation for User Story 4

- [X] T011 [P] [US4] `packages/ui/src/stories/layouts/PricingComparisonLayout.stories.tsx`를 생성해 `title: 'Page/Layouts/PricingComparison'`, `Default` export, pricing hero, comparison cards, FAQ or reassurance block, CTA/footer 섹션을 구현한다.
- [X] T012 [US4] `packages/ui/src/stories/layouts/PricingComparisonLayout.stories.tsx`에서 plan emphasis, responsive card stacking, dark-mode contrast, CTA priority를 조정한다.

**Checkpoint**: US4 완료 시 비교/의사결정 레이아웃이 독립적으로 검증 가능하다.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 전체 스토리 세트를 계약/검증 기준에 맞춰 마무리한다.

- [X] T013 [P] `packages/ui/src/stories/layouts/BrandSiteLayout.stories.tsx`, `packages/ui/src/stories/layouts/ProductLandingLayout.stories.tsx`, `packages/ui/src/stories/layouts/DocsHubLayout.stories.tsx`, `packages/ui/src/stories/layouts/PricingComparisonLayout.stories.tsx`를 `specs/010-storybook-layout-stories/contracts/storybook-layout-stories.md` 기준으로 재검토해 title/layout/export/content 계약 충족 여부를 정리한다.
- [X] T014 `packages/ui/package.json` 기준으로 `pnpm --filter @myorg/ui lint`와 `pnpm --filter @myorg/ui build-storybook`를 실행해 신규 레이아웃 스토리 4개가 lint/build를 통과하는지 확인한다.
- [ ] T015 [P] `packages/ui/.storybook/preview.tsx`의 theme/viewport 도구와 `specs/010-storybook-layout-stories/quickstart.md`를 기준으로 4개 신규 스토리를 light/dark, Desktop 1280, Tablet 768, Mobile 375에서 수동 검증한다.
- [ ] T016 [P] `packages/ui/vitest.config.ts` 기준으로 필요 시 `pnpm --filter @myorg/ui test`를 실행해 기존 unit/storybook 테스트 프로젝트에 회귀가 없는지 확인한다.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 진행, 모든 사용자 스토리를 차단
- **Phase 3~6 (User Stories)**: Phase 2 완료 후 시작 가능
- **Phase 7 (Polish)**: 원하는 사용자 스토리 완료 후 진행

### User Story Dependencies

- **US1 (P1)**: Phase 2 이후 즉시 시작 가능, MVP
- **US2 (P2)**: Phase 2 이후 US1과 병렬 시작 가능
- **US3 (P3)**: Phase 2 이후 US1/US2와 병렬 시작 가능
- **US4 (P4)**: Phase 2 이후 US1~US3와 병렬 시작 가능

### Within Each User Story

- 스토리 파일 생성 후 해당 파일 안에서 responsive/dark-mode 품질 보정 수행
- 각 사용자 스토리는 단일 파일로 독립 구현되므로 상호 파일 의존성이 없다
- 검증은 Storybook에서 해당 title 하나만 열어도 가능해야 한다

---

## Parallel Opportunities

- T007, T009, T011은 서로 다른 신규 스토리 파일이므로 병렬 실행 가능
- T013과 T015는 구현 완료 후 병렬 검토 가능
- T014와 T016은 최종 검증 단계에서 독립 실행 가능

---

## Parallel Example: User Story 2~4

```bash
# Foundational 완료 후 서로 다른 레이아웃 스토리를 동시에 작업:
Task: "T007 [US2] Create ProductLandingLayout story in packages/ui/src/stories/layouts/ProductLandingLayout.stories.tsx"
Task: "T009 [US3] Create DocsHubLayout story in packages/ui/src/stories/layouts/DocsHubLayout.stories.tsx"
Task: "T011 [US4] Create PricingComparisonLayout story in packages/ui/src/stories/layouts/PricingComparisonLayout.stories.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 완료
2. Phase 2 완료
3. Phase 3(US1) 완료
4. `Page/Layouts/BrandSite`만 먼저 Storybook에서 검증
5. 품질이 만족되면 나머지 사용자 스토리 확장

### Incremental Delivery

1. Setup + Foundational 완료
2. US1 추가 후 독립 검증
3. US2 추가 후 독립 검증
4. US3 추가 후 독립 검증
5. US4 추가 후 독립 검증
6. 마지막으로 lint/build/manual viewport 검증 실행

### Parallel Team Strategy

1. 한 명이 Phase 1~2를 완료
2. 이후 각 담당자가 레이아웃 스토리 1개씩 맡아 병렬 구현
3. 마지막에 검증 담당이 T013~T016 실행

---

## Notes

- 테스트 태스크는 별도 생성하지 않았다. 이 기능의 명시적 요구는 Storybook 레이아웃 참조 추가이며, spec에서 TDD/신규 테스트 작성을 직접 요구하지 않았다.
- 신규 스토리는 기존 utilitarian page stories를 대체하지 않고 보완한다.
- `packages/ui/src/stories/layouts/`는 새 디렉터리이므로 import 경로는 기존 `stories/` 루트 파일과 다르게 `../..` 상대 경로가 필요할 수 있다.
- 최종 수동 검증 시 dark-mode 전용 스토리를 찾지 말고 Storybook toolbar의 `Theme` 전환으로 확인한다.
