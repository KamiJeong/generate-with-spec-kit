# Tasks: 10가지 웹사이트 레이아웃 스토리북 추가

**Input**: Design documents from `/specs/016-website-layout-stories/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: 태스크는 User Story 단위로 구성되어 각 스토리를 독립적으로 구현·검증할 수 있다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 User Story 레이블 (US1, US2, US3)
- 모든 태스크에 정확한 파일 경로 포함

---

## Phase 1: Setup (공유 인프라)

**Purpose**: 10개 스토리 파일 작성 전 공통 기반 확인 및 준비

- [X] T001 기존 `packages/ui/src/stories/layouts/` 폴더 구조 확인 및 기존 스토리 패턴 파악 (`BrandSiteLayout.stories.tsx` 참조)
- [X] T002 `packages/ui/src/stories/layouts/` 폴더에 10개 신규 스토리 파일 목록 확인 (파일 충돌 여부 점검)
- [X] T003 [P] Storybook 실행 확인: `pnpm --filter @myorg/ui storybook` 실행 후 `Page/Layouts` 카테고리 접근 가능 여부 확인

**Checkpoint**: 기존 레이아웃 스토리 패턴 파악 완료, 신규 파일 생성 준비 완료

---

## Phase 2: Foundational (공통 블로킹 선행 작업)

**Purpose**: 10개 레이아웃 스토리 파일 모두에서 재사용되는 공통 패턴 정의

**⚠️ CRITICAL**: 이 Phase 완료 후 US1~US3 작업 시작 가능

- [X] T004 `packages/ui/src/stories/layouts/` 내 공통 이미지 플레이스홀더 패턴 확정 — CSS 색상 블록 div (`bg-muted`, `bg-primary/10`, `bg-secondary` 토큰 활용), `aria-label` 포함
- [X] T005 Storybook `parameters.docs.description` 포맷 확정 — 레이아웃 설명, 품질 특성 체크리스트(`✅`), 사용 사례 구조 확정 (research.md 섹션 5 참조)
- [X] T006 Tailwind breakpoint 전략 확정 — 모바일(기본), 태블릿(`md:`), 데스크탑(`lg:`) 3단계 적용 기준 (quickstart.md 참조)

**Checkpoint**: 공통 패턴 확정 완료 — 10개 스토리 파일 독립 구현 시작 가능

---

## Phase 3: User Story 1 - 레이아웃 패턴 탐색 (Priority: P1) 🎯 MVP

**Goal**: 10가지 레이아웃 패턴 스토리를 Storybook `Page/Layouts/` 카테고리에 모두 등록하여 시각적으로 탐색 가능한 상태로 만든다.

**Independent Test**: Storybook에서 `Page/Layouts` 카테고리를 열어 10개 스토리가 목록에 나타나고, 각각 오류 없이 렌더링되는지 확인.

### 구현 — User Story 1

- [X] T007 [P] [US1] Z-pattern 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/ZPatternLayout.stories.tsx` — title `Page/Layouts/ZPattern`, 헤더 + 히어로(좌텍스트/우이미지) + 하단 CTA 구조, `Default` + `WithHeroImage` variant
- [X] T008 [P] [US1] F-pattern 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/FPatternLayout.stories.tsx` — title `Page/Layouts/FPattern`, 전체폭 상단 배너 + 좌집중 콘텐츠 행 반복 구조, `Default` + `ContentHeavy` variant
- [X] T009 [P] [US1] Fullscreen image 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/FullscreenImageLayout.stories.tsx` — title `Page/Layouts/FullscreenImage`, `min-h-svh relative` + 전체 배경 색상 블록 + `absolute` 중앙 텍스트/CTA, `Default` + `DarkOverlay` variant
- [X] T010 [P] [US1] Split screen 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/SplitScreenLayout.stories.tsx` — title `Page/Layouts/SplitScreen`, `grid grid-cols-1 lg:grid-cols-2 min-h-svh` 좌우 50:50 분할, `Default` + `Reversed` variant
- [X] T011 [P] [US1] Asymmetrical 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/AsymmetricalLayout.stories.tsx` — title `Page/Layouts/Asymmetrical`, `grid grid-cols-3` 또는 `grid-cols-5` 비균등 컬럼(예: 2:1), `Default` + `ImageLeft` variant
- [X] T012 [P] [US1] Single column 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/SingleColumnLayout.stories.tsx` — title `Page/Layouts/SingleColumn`, `max-w-2xl mx-auto` 단일 컬럼 세로 스크롤, `Default` + `WithSidebar` variant
- [X] T013 [P] [US1] Box-based 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/BoxBasedLayout.stories.tsx` — title `Page/Layouts/BoxBased`, `grid grid-cols-2 lg:grid-cols-4` 균등 박스 그리드, `Default` + `DenseGrid` variant
- [X] T014 [P] [US1] Cards 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/CardsLayout.stories.tsx` — title `Page/Layouts/Cards`, shadcn/ui `Card` 컴포넌트 활용 + `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `Default` + `MasonryStyle` variant
- [X] T015 [P] [US1] Magazine 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/MagazineLayout.stories.tsx` — title `Page/Layouts/Magazine`, `grid grid-cols-12` 피처드 아티클 `col-span-8` + 사이드 `col-span-4`, `Default` + `FeaturedPost` variant
- [X] T016 [P] [US1] Horizontal strips 레이아웃 스토리 생성: `packages/ui/src/stories/layouts/HorizontalStripsLayout.stories.tsx` — title `Page/Layouts/HorizontalStrips`, `flex flex-col` + 섹션마다 교대 배경색 수평 스트립, `Default` + `AlternatingStrips` variant

**Checkpoint**: 10개 스토리 파일 생성 완료 — `Page/Layouts` 카테고리에서 모두 탐색 가능, 각각 오류 없이 렌더링 확인

---

## Phase 4: User Story 2 - 레이아웃 품질 기준 이해 (Priority: P2)

**Goal**: 각 스토리의 `parameters.docs.description`에 7가지 품질 특성 중 해당 레이아웃에 적용되는 항목과 사용 사례를 명시한다.

**Independent Test**: 임의의 레이아웃 스토리를 열어 Docs 탭에서 품질 특성 목록(`✅` 체크 형식)과 사용 사례가 표시되는지 확인.

### 구현 — User Story 2

- [X] T017 [P] [US2] `ZPatternLayout.stories.tsx` — `parameters.docs.description` 추가: Clear visual hierarchy ✅, Purposeful CTA placement ✅, 사용 사례(랜딩 페이지, 마케팅 홈)
- [X] T018 [P] [US2] `FPatternLayout.stories.tsx` — `parameters.docs.description` 추가: Clear visual hierarchy ✅, Consistent alignment ✅, 사용 사례(뉴스 사이트, 블로그, 문서 페이지)
- [X] T019 [P] [US2] `FullscreenImageLayout.stories.tsx` — `parameters.docs.description` 추가: Balanced use of space ✅, Purposeful CTA placement ✅, 사용 사례(브랜드 캠페인, 포트폴리오 히어로)
- [X] T020 [P] [US2] `SplitScreenLayout.stories.tsx` — `parameters.docs.description` 추가: Balanced use of space ✅, Consistent alignment ✅, 사용 사례(로그인/회원가입, 제품 비교)
- [X] T021 [P] [US2] `AsymmetricalLayout.stories.tsx` — `parameters.docs.description` 추가: Clear visual hierarchy ✅, Adaptive layout styles ✅, 사용 사례(크리에이티브 에이전시, 패션 브랜드)
- [X] T022 [P] [US2] `SingleColumnLayout.stories.tsx` — `parameters.docs.description` 추가: Intuitive navigation ✅, Mobile-friendly structure ✅, 사용 사례(모바일 앱, 롱폼 아티클, 이메일 뉴스레터)
- [X] T023 [P] [US2] `BoxBasedLayout.stories.tsx` — `parameters.docs.description` 추가: Consistent alignment ✅, Balanced use of space ✅, 사용 사례(대시보드, 포트폴리오 갤러리)
- [X] T024 [P] [US2] `CardsLayout.stories.tsx` — `parameters.docs.description` 추가: Consistent alignment ✅, Balanced use of space ✅, 사용 사례(상품 목록, 블로그 피드, 팀 소개)
- [X] T025 [P] [US2] `MagazineLayout.stories.tsx` — `parameters.docs.description` 추가: Clear visual hierarchy ✅, Adaptive layout styles ✅, 사용 사례(온라인 매거진, 뉴스 포털)
- [X] T026 [P] [US2] `HorizontalStripsLayout.stories.tsx` — `parameters.docs.description` 추가: Consistent alignment ✅, Intuitive navigation ✅, 사용 사례(SaaS 랜딩 페이지, 기능 소개 페이지)

**Checkpoint**: 10개 스토리 모두 Docs 탭에서 품질 특성 정보 표시 확인

---

## Phase 5: User Story 3 - 레이아웃 변형 비교 (Priority: P3)

**Goal**: 각 스토리에 2번째 named export variant가 올바르게 구현되어 Controls 또는 variant 전환으로 콘텐츠 변형을 탐색할 수 있다.

**Independent Test**: Z-pattern 스토리에서 `Default`와 `WithHeroImage` variant를 각각 선택하여 레이아웃 구조가 유지되면서 콘텐츠가 다르게 표시되는지 확인.

### 구현 — User Story 3

- [X] T027 [P] [US3] `ZPatternLayout.stories.tsx` — `WithHeroImage` variant 구현: 히어로 이미지 블록 크기 확대(`aspect-video` → `aspect-[16/9]`), 콘텐츠 배치 조정
- [X] T028 [P] [US3] `FPatternLayout.stories.tsx` — `ContentHeavy` variant 구현: 텍스트 행 3개로 증가, 이미지 블록 비율 축소
- [X] T029 [P] [US3] `FullscreenImageLayout.stories.tsx` — `DarkOverlay` variant 구현: 배경 블록을 `bg-foreground/80`으로 변경, 텍스트 색상 대비 조정
- [X] T030 [P] [US3] `SplitScreenLayout.stories.tsx` — `Reversed` variant 구현: 이미지 블록과 텍스트 블록 좌우 위치 교환
- [X] T031 [P] [US3] `AsymmetricalLayout.stories.tsx` — `ImageLeft` variant 구현: 이미지 블록을 좌측 큰 컬럼으로 이동
- [X] T032 [P] [US3] `SingleColumnLayout.stories.tsx` — `WithSidebar` variant 구현: `lg:grid-cols-[1fr_280px]` 사이드바 추가
- [X] T033 [P] [US3] `BoxBasedLayout.stories.tsx` — `DenseGrid` variant 구현: `grid-cols-3 lg:grid-cols-6` 밀도 높은 그리드
- [X] T034 [P] [US3] `CardsLayout.stories.tsx` — `MasonryStyle` variant 구현: `columns-1 sm:columns-2 lg:columns-3` CSS columns 활용
- [X] T035 [P] [US3] `MagazineLayout.stories.tsx` — `FeaturedPost` variant 구현: 피처드 아티클 영역 확대(`col-span-8` → `col-span-12`), 그리드 재배치
- [X] T036 [P] [US3] `HorizontalStripsLayout.stories.tsx` — `AlternatingStrips` variant 구현: 홀수/짝수 스트립 배경색 교대(`bg-background` ↔ `bg-muted`)

**Checkpoint**: 10개 스토리 모두 2개 이상 variant 확인 — variant 전환 시 레이아웃 구조 유지 확인

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 반응형, 접근성, 전체 품질 검증

- [X] T037 [P] 10개 스토리 모바일 뷰포트(320px) 렌더링 검증 — Storybook 뷰포트 툴바에서 확인
- [X] T038 [P] 10개 스토리 태블릿 뷰포트(768px) 렌더링 검증 — 레이아웃 구조 변화 확인
- [X] T039 [P] 10개 스토리 데스크탑 뷰포트(1024px+) 렌더링 검증
- [X] T040 [P] `@storybook/addon-a11y` 접근성 검사 실행 — 10개 스토리 전체 WCAG 2.1 AA 위반 항목 수정
- [X] T041 모든 이미지 플레이스홀더 div에 `aria-label` 속성 확인 및 누락 시 추가
- [X] T042 Storybook `Page/Layouts` 카테고리에서 10개 스토리 전체 탐색 순서 및 그룹핑 최종 확인
- [X] T043 quickstart.md 완료 기준 체크리스트 전 항목 통과 확인

---

## Dependencies & Execution Order

### Phase 의존성

- **Setup (Phase 1)**: 의존성 없음 — 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 후 시작 — US1~US3 모두 블로킹
- **US1 (Phase 3)**: Phase 2 완료 후 시작 — 10개 파일 모두 병렬 구현 가능 [P]
- **US2 (Phase 4)**: Phase 3 완료 후 시작 (파일이 존재해야 description 추가 가능)
- **US3 (Phase 5)**: Phase 3 완료 후 시작 (기본 variant 파일이 존재해야 추가 variant 작성 가능)
- **US2와 US3**: Phase 3 완료 후 서로 독립적으로 병렬 진행 가능
- **Polish (Phase 6)**: Phase 3~5 완료 후 시작

### User Story 의존성

- **US1 (P1)**: Phase 2 완료 후 독립 시작 — 다른 스토리 의존 없음
- **US2 (P2)**: US1 파일 생성 완료 후 시작 (동일 파일 수정이므로 US1 완료 필요)
- **US3 (P3)**: US1 파일 생성 완료 후 시작 (동일 파일 수정이므로 US1 완료 필요)

### 파일 내 의존성

- T017~T026 (US2)는 T007~T016 (US1)이 생성한 파일에 `parameters.docs.description` 추가
- T027~T036 (US3)는 T007~T016 (US1)이 생성한 파일에 두 번째 variant export 추가
- US2와 US3는 서로 다른 섹션(parameters vs. export)을 수정하므로 병렬 가능

### 병렬 실행 기회

- Phase 3 내 T007~T016: 10개 파일이 독립적이므로 모두 병렬 실행 가능
- Phase 4 내 T017~T026: 10개 파일 독립, 병렬 실행 가능
- Phase 5 내 T027~T036: 10개 파일 독립, 병렬 실행 가능
- Phase 4와 Phase 5: Phase 3 완료 후 동시 진행 가능
- Phase 6 내 T037~T041: 병렬 실행 가능

---

## Parallel Example: User Story 1

```bash
# Phase 3 — 10개 스토리 파일 동시 생성 가능:
Task T007: "ZPatternLayout.stories.tsx 생성"
Task T008: "FPatternLayout.stories.tsx 생성"
Task T009: "FullscreenImageLayout.stories.tsx 생성"
Task T010: "SplitScreenLayout.stories.tsx 생성"
Task T011: "AsymmetricalLayout.stories.tsx 생성"
Task T012: "SingleColumnLayout.stories.tsx 생성"
Task T013: "BoxBasedLayout.stories.tsx 생성"
Task T014: "CardsLayout.stories.tsx 생성"
Task T015: "MagazineLayout.stories.tsx 생성"
Task T016: "HorizontalStripsLayout.stories.tsx 생성"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (공통 패턴 확정)
3. Phase 3: US1 — 10개 스토리 파일 생성 (병렬 구현)
4. **STOP and VALIDATE**: `Page/Layouts`에서 10개 스토리 탐색 및 렌더링 확인
5. MVP 완료 — 팀 데모 가능

### Incremental Delivery

1. Setup + Foundational → 기반 준비
2. US1 → 10개 스토리 탐색 가능 (MVP!)
3. US2 → 품질 특성 문서화 추가
4. US3 → variant 비교 기능 추가
5. Polish → 접근성·반응형 최종 검증

### Parallel Team Strategy

2인 이상 작업 시:

1. Phase 1~2 함께 완료
2. Phase 3 완료 후:
   - Developer A: T017~T026 (US2 — description 추가)
   - Developer B: T027~T036 (US3 — variant 추가)
3. 독립적으로 완료 후 Polish 단계 합류

---

## Notes

- [P] 태스크 = 다른 파일, 의존성 없음 — 병렬 실행 가능
- [Story] 레이블은 User Story 추적성을 위해 사용
- 각 스토리 파일은 독립적으로 완성·테스트·배포 가능
- 기존 `BrandSiteLayout.stories.tsx` 패턴을 참조하여 일관성 유지
- 커밋은 레이아웃 파일별 또는 Phase 단위로 진행
- 각 Checkpoint에서 Storybook 브라우저로 직접 확인 후 다음 Phase 진행
