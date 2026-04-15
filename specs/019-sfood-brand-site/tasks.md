# Tasks: SFood 브랜드 사이트

**Input**: Design documents from `/specs/019-sfood-brand-site/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/routes.md ✅, quickstart.md ✅

**Organization**: 유저 스토리별 독립 구현·테스트 가능하도록 페이지별 페이즈로 구성.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 다른 파일, 의존성 없음 — 병렬 실행 가능
- **[Story]**: 해당 유저 스토리 레이블 (US1~US6)
- 모든 경로는 `app/sfood-brand/` 기준

---

## Phase 1: 프로젝트 초기화 (Setup)

**Purpose**: 모노레포 패키지 등록 및 기본 프로젝트 구조 생성

- [ ] T001 `pnpm-workspace.yaml`에 `app/*` 패턴 추가 (없는 경우)
- [ ] T002 `app/sfood-brand/` 디렉토리 생성 및 `package.json` 작성 — 패키지명 `@myorg/sfood-brand`, React 19 + React Router v7 + Tailwind CSS v4 + `@myorg/ui` + `@myorg/tokens` 의존성
- [ ] T003 [P] `app/sfood-brand/tsconfig.json` 작성 — `packages/web/tsconfig.json` 기반, path alias `@sfood` → `./src`
- [ ] T004 [P] `app/sfood-brand/vite.config.ts` 작성 — `@vitejs/plugin-react`, `@tailwindcss/vite`, `historyApiFallback: true`, alias `@sfood` 설정
- [ ] T005 [P] `app/sfood-brand/vitest.config.ts` 작성 — jsdom 환경, `@sfood` alias, coverage v8 설정
- [ ] T006 `app/sfood-brand/index.html` 작성 — SPA 진입점, `<title>SFood</title>`, `src/main.tsx` 로드
- [ ] T007 `app/sfood-brand/src/main.tsx` 작성 — `BrowserRouter`로 `<App />` 래핑 후 `#root`에 마운트
- [ ] T008 `app/sfood-brand/tests/setup.ts` 작성 — `@testing-library/jest-dom` import

---

## Phase 2: 기반 요소 (Foundational)

**Purpose**: 모든 유저 스토리가 공유하는 컬러 토큰, 내비게이션, 레이아웃 완성

**⚠️ CRITICAL**: 이 페이즈 완료 전까지 유저 스토리 페이즈 진행 불가

- [ ] T009 `app/sfood-brand/src/index.css` 작성 — `@myorg/tokens` import, Tailwind v4 `@theme` 블록에 SFood 컬러 변수 정의: `--sfood-red: 350 72% 38%`, `--sfood-red-light: 350 72% 95%`, `--sfood-cream: 40 30% 97%`, `--sfood-dark: 210 15% 15%`, `--sfood-gold: 38 80% 52%`, Pretendard 폰트 설정
- [ ] T010 `app/sfood-brand/src/content/site.ts` 작성 — `SiteConfig`, `NavItem`, `SubNavItem` 인터페이스 정의 및 내비게이션 데이터 (`/`, `/about`, `/sustainability`, `/brands`, `/talent`, 고객지원 드롭다운 `/support/notice`, `/support/news`, `/support/faq`) 내보내기
- [ ] T011 `app/sfood-brand/src/components/layout/SiteFooter.tsx` 작성 — 공통 푸터: SFood 로고(텍스트), 간단한 링크 그룹, 저작권 문구
- [ ] T012 `app/sfood-brand/src/components/layout/SiteHeader.tsx` 작성 — sticky 헤더: `scrollY > 10` 시 `bg-sfood-red` 불투명 전환, 데스크톱 인라인 내비게이션 + "고객지원" hover 드롭다운 서브메뉴, 모바일 햄버거 버튼(`@myorg/ui` Sheet 컴포넌트), `NavLink` active 상태 표시, `/support/*` 경로에서 "고객지원" active 처리
- [ ] T013 `app/sfood-brand/src/components/ui/SectionHero.tsx` 작성 — 서브 페이지 공통 히어로 배너 컴포넌트: `title`, `subtitle`, `bgColor` props
- [ ] T014 `app/sfood-brand/src/pages/NotFoundPage.tsx` 작성 — 404 안내 페이지: "페이지를 찾을 수 없습니다" 메시지, 홈으로 돌아가기 링크
- [ ] T015 `app/sfood-brand/src/App.tsx` 작성 — `<Routes>` 정의: 9개 경로 (`/`, `/about`, `/sustainability`, `/brands`, `/talent`, `/support/notice`, `/support/news`, `/support/faq`, `*`), `SiteHeader` + `<Outlet>` + `SiteFooter` 레이아웃 래퍼
- [ ] T016 `app/sfood-brand/tests/components/SiteHeader.test.tsx` 작성 — 헤더 렌더링, 내비게이션 링크 존재, 모바일 햄버거 버튼 표시 검증
- [ ] T017 `app/sfood-brand/tests/content/site.test.ts` 작성 — navItems 배열 구조 및 타입 유효성 검증

**Checkpoint**: 헤더·푸터·라우팅 동작 확인 — `pnpm --filter @myorg/sfood-brand dev` 후 각 경로 접속 가능 여부 체크

---

## Phase 3: US1 - 메인 페이지 (Priority: P1) 🎯 MVP

**Goal**: 히어로 섹션, 핵심 수치·수상 강조, 브랜드 미리보기, 지속 가능성 티저, CTA를 포함한 메인 랜딩 페이지 완성

**Independent Test**: `http://localhost:5173/` 접속 → "더 좋은 식품으로 더 좋은 세상을" 슬로건, DLG 수상 배지, 브랜드 카드 미리보기, CTA 버튼이 모두 표시되는지 확인

- [ ] T018 [P] [US1] `app/sfood-brand/src/components/sections/home/HeroSection.tsx` 작성 — 풀스크린 히어로: SFood 브랜드명, 미션 슬로건("더 좋은 식품으로 더 좋은 세상을"), 서브 카피, CTA 버튼, `bg-sfood-red` 그라데이션 배경
- [ ] T019 [P] [US1] `app/sfood-brand/src/components/sections/home/StatsSection.tsx` 작성 — 핵심 수치 강조 섹션: 설립 연도, DLG 국제 품평회 연속 수상, 제품 라인업 수 등 3개 stat 카드
- [ ] T020 [P] [US1] `app/sfood-brand/src/components/sections/home/BrandsPreviewSection.tsx` 작성 — 브랜드 미리보기 섹션: `content/brands.ts` 데이터에서 브랜드 4개 썸네일 카드 나열, "/brands" 링크
- [ ] T021 [P] [US1] `app/sfood-brand/src/components/sections/home/SustainabilityTeaser.tsx` 작성 — 지속 가능성 한줄 소개 섹션: 배경 이미지 대신 `bg-sfood-cream`, 짧은 문구 + "/sustainability" 링크
- [ ] T022 [P] [US1] `app/sfood-brand/src/components/sections/home/CtaSection.tsx` 작성 — 하단 CTA 섹션: "지금 SFood와 함께하세요" 문구, 브랜드·채용 페이지 링크 버튼
- [ ] T023 [P] [US1] `app/sfood-brand/src/content/brands.ts` 작성 — `Brand` 인터페이스 및 4개 브랜드 데이터: B2C 2개(존쿡 델리미트, SFood 홈그릴), B2B 2개(SFood 프로, SFood 캐터링)
- [ ] T024 [US1] `app/sfood-brand/src/pages/HomePage.tsx` 작성 — 섹션 조합: `HeroSection`, `StatsSection`, `BrandsPreviewSection`, `SustainabilityTeaser`, `CtaSection`
- [ ] T025 [US1] `app/sfood-brand/tests/pages/HomePage.test.tsx` 작성 — 미션 슬로건·수상 문구·CTA 버튼 렌더링 검증, MemoryRouter 사용

**Checkpoint**: 메인 페이지 독립 동작 확인 — `pnpm --filter @myorg/sfood-brand test`

---

## Phase 4: US2 - 회사소개 페이지 (Priority: P2)

**Goal**: 미션·비전, 연혁, FSSC 22000·HACCP·DLG 품질 인증 배지가 있는 `/about` 페이지 완성

**Independent Test**: `/about` 접속 → 미션 문구, 연혁 항목 3개 이상, 품질 인증 배지 3개가 모두 표시되는지 확인

- [ ] T026 [P] [US2] `app/sfood-brand/src/components/sections/about/MissionSection.tsx` 작성 — 미션("더 좋은 식품으로 더 좋은 세상을"), 비전, 핵심 가치 3개 카드
- [ ] T027 [P] [US2] `app/sfood-brand/src/components/sections/about/TimelineSection.tsx` 작성 — 연혁 타임라인: 창립·주요 인증·해외 수상·제품 확장 등 가상 이벤트 5개
- [ ] T028 [P] [US2] `app/sfood-brand/src/components/sections/about/CertificationSection.tsx` 작성 — 품질 인증 배지 섹션: FSSC 22000, HACCP, DLG 국제 품평회 수상(`text-sfood-gold` 배지), 각 인증 설명
- [ ] T029 [US2] `app/sfood-brand/src/pages/AboutPage.tsx` 작성 — 섹션 조합: `SectionHero`(제목 "SFood 소개"), `MissionSection`, `TimelineSection`, `CertificationSection`
- [ ] T030 [US2] `app/sfood-brand/tests/pages/AboutPage.test.tsx` 작성 — 미션 문구·인증 배지(FSSC 22000, HACCP, DLG) 텍스트 렌더링 검증

**Checkpoint**: `/about` 독립 동작 확인

---

## Phase 5: US3 - 브랜드 소개 페이지 (Priority: P2)

**Goal**: B2C 2개 + B2B 2개 총 4개 브랜드를 카드 그리드로 구분 표시하는 `/brands` 페이지 완성

**Independent Test**: `/brands` 접속 → "B2C 브랜드" 섹션에 2개 카드, "B2B 브랜드" 섹션에 2개 카드, 각 카드에 브랜드명·슬로건·카테고리가 표시되는지 확인

- [ ] T031 [P] [US3] `app/sfood-brand/src/components/ui/BrandCard.tsx` 작성 — 브랜드 카드 컴포넌트: `Brand` 타입 props, 브랜드명, 유형 배지(`B2C`/`B2B`), 슬로건, 카테고리 태그, 소개 문구, `accentColor` 상단 컬러 바
- [ ] T032 [P] [US3] `app/sfood-brand/src/components/sections/brands/BrandsGrid.tsx` 작성 — B2C·B2B 섹션 구분 헤더 + 2열 그리드 카드 레이아웃, `content/brands.ts` 데이터 사용
- [ ] T033 [US3] `app/sfood-brand/src/pages/BrandsPage.tsx` 작성 — 섹션 조합: `SectionHero`(제목 "브랜드"), `BrandsGrid`
- [ ] T034 [US3] `app/sfood-brand/tests/pages/BrandsPage.test.tsx` 작성 — 4개 브랜드명 모두 렌더링, B2C·B2B 섹션 구분 헤더 표시 검증

**Checkpoint**: `/brands` 독립 동작 확인

---

## Phase 6: US4 - 지속 가능성 페이지 (Priority: P3)

**Goal**: 환경·사회·식품 안전 영역 활동 및 2030 목표를 담은 `/sustainability` 페이지 완성

**Independent Test**: `/sustainability` 접속 → 3개 영역(환경·사회·식품 안전) 섹션, 2030 목표 문구가 표시되는지 확인

- [ ] T035 [P] [US4] `app/sfood-brand/src/content/sustainability.ts` 작성 — `SustainabilityPillar` 인터페이스 및 3개 영역 × 2개 활동 데이터 (총 6개 항목), 2030 목표 문구
- [ ] T036 [P] [US4] `app/sfood-brand/src/components/sections/sustainability/PillarSection.tsx` 작성 — 영역별(환경·사회·식품 안전) 아이콘 + 제목 + 활동 목록 카드, 수치 목표 강조 표시
- [ ] T037 [US4] `app/sfood-brand/src/pages/SustainabilityPage.tsx` 작성 — 섹션 조합: `SectionHero`(제목 "지속가능성"), 비전 문구 블록, `PillarSection` × 3, 2030 목표 CTA 섹션
- [ ] T038 [US4] `app/sfood-brand/tests/pages/SustainabilityPage.test.tsx` 작성 — 3개 영역 제목, 2030 목표 문구 렌더링 검증

**Checkpoint**: `/sustainability` 독립 동작 확인

---

## Phase 7: US5 - 인재채용 페이지 (Priority: P3)

**Goal**: 인재상·채용 프로세스(4단계)·복리후생을 시각화한 `/talent` 페이지 완성

**Independent Test**: `/talent` 접속 → 인재상 키워드 3개 이상, 4단계 채용 프로세스(서류 접수→서류 심사→면접→최종 합격), 복리후생 항목 4개 이상이 표시되는지 확인

- [ ] T039 [P] [US5] `app/sfood-brand/src/content/talent.ts` 작성 — `TalentPersona` 3개(도전·협업·전문성), `HiringStep` 4개, `Benefit` 6개 데이터
- [ ] T040 [P] [US5] `app/sfood-brand/src/components/sections/talent/PersonaSection.tsx` 작성 — 인재상 키워드 카드 3개: 아이콘 + 키워드 + 설명
- [ ] T041 [P] [US5] `app/sfood-brand/src/components/sections/talent/ProcessSection.tsx` 작성 — 채용 4단계 수평 스텝 시각화: 번호 원형 + 단계명 + 설명, 화살표 연결
- [ ] T042 [P] [US5] `app/sfood-brand/src/components/sections/talent/BenefitsSection.tsx` 작성 — 복리후생 카테고리별(복지·성장·보상) 아이콘 카드 그리드
- [ ] T043 [US5] `app/sfood-brand/src/pages/TalentPage.tsx` 작성 — 섹션 조합: `SectionHero`(제목 "인재채용"), `PersonaSection`, `ProcessSection`, `BenefitsSection`, 채용 문의 CTA
- [ ] T044 [US5] `app/sfood-brand/tests/pages/TalentPage.test.tsx` 작성 — 인재상 키워드 3개·4단계 프로세스 레이블 렌더링 검증

**Checkpoint**: `/talent` 독립 동작 확인

---

## Phase 8: US6 - 고객지원 페이지 (Priority: P3)

**Goal**: 공지사항 목록, 회사소식 카드, FAQ 아코디언을 각각 독립 URL로 제공하는 3개 서브 페이지 완성

**Independent Test**: `/support/notice` → 공지 목록(제목·날짜), `/support/news` → 뉴스 카드(제목·날짜·요약), `/support/faq` → 아코디언 클릭 시 답변 펼침 확인

- [ ] T045 [P] [US6] `app/sfood-brand/src/content/support.ts` 작성 — `Notice` 5개, `NewsItem` 4개, `FaqItem` 10개(카테고리별 2~3개) 가상 데이터
- [ ] T046 [P] [US6] `app/sfood-brand/src/components/sections/support/NoticeList.tsx` 작성 — 공지사항 목록: 카테고리 배지 + 제목 + 날짜, 구분선 스타일
- [ ] T047 [P] [US6] `app/sfood-brand/src/components/sections/support/NewsList.tsx` 작성 — 회사소식 카드 그리드: `imagePlaceholderColor` 컬러 블록 + 제목 + 날짜 + 요약
- [ ] T048 [P] [US6] `app/sfood-brand/src/components/ui/AccordionFaq.tsx` 작성 — FAQ 아코디언 컴포넌트: `@myorg/ui` Accordion 컴포넌트 사용, 카테고리 필터 탭, 단일/다중 열림 지원
- [ ] T049 [P] [US6] `app/sfood-brand/src/pages/support/NoticePage.tsx` 작성 — `SectionHero`(제목 "공지사항") + `NoticeList`
- [ ] T050 [P] [US6] `app/sfood-brand/src/pages/support/NewsPage.tsx` 작성 — `SectionHero`(제목 "회사소식") + `NewsList`
- [ ] T051 [US6] `app/sfood-brand/src/pages/support/FaqPage.tsx` 작성 — `SectionHero`(제목 "자주 묻는 질문") + `AccordionFaq`, `support.ts` FAQ 데이터 연결
- [ ] T052 [US6] `app/sfood-brand/tests/pages/support/NoticePage.test.tsx` 작성 — 공지사항 제목 목록 렌더링 검증
- [ ] T053 [US6] `app/sfood-brand/tests/pages/support/FaqPage.test.tsx` 작성 — FAQ 질문 목록 렌더링 + `userEvent.click()`으로 답변 펼침 인터랙션 검증

**Checkpoint**: 3개 서브 페이지 독립 동작 확인, 고객지원 드롭다운 메뉴 링크 연결 확인

---

## Phase 9: 마무리 및 공통 품질 (Polish)

**Purpose**: 반응형 레이아웃 검증, 접근성 점검, 빌드 최종 확인

- [ ] T054 [P] 모든 페이지 모바일(375px)·태블릿(768px)·데스크톱(1280px) 반응형 레이아웃 수동 검증 및 미디어쿼리 수정 (`app/sfood-brand/src/` 전체)
- [ ] T055 [P] `SiteHeader` 모바일 드로어 내 고객지원 아코디언 서브메뉴 구현 (`app/sfood-brand/src/components/layout/SiteHeader.tsx`)
- [ ] T056 [P] 각 페이지 `<title>` 동적 업데이트 구현 — `document.title` 또는 React 19 `<title>` 태그 사용 (`app/sfood-brand/src/pages/` 전체)
- [ ] T057 `pnpm --filter @myorg/sfood-brand build` 빌드 성공 확인 및 TypeScript 타입 오류 0건 달성
- [ ] T058 `pnpm --filter @myorg/sfood-brand test -- --coverage` 실행 — 전체 커버리지 80% 이상 확인, 미달 시 테스트 추가

---

## Dependencies & Execution Order

### 페이즈 의존 관계

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 — **모든 유저 스토리 페이즈 블로킹**
- **Phase 3~8 (User Stories)**: Phase 2 완료 후 시작 가능 — 서로 독립, 병렬 실행 가능
- **Phase 9 (Polish)**: 원하는 유저 스토리 페이즈 완료 후

### 유저 스토리 의존 관계

- **US1 (P1) 메인 페이지**: Phase 2 완료 후 즉시 시작 — 의존 없음
- **US2 (P2) 회사소개**: Phase 2 완료 후 시작 — US1과 독립
- **US3 (P2) 브랜드**: Phase 2 완료 후 시작 — `content/brands.ts` 공유 (T023에서 생성)
- **US4 (P3) 지속가능성**: Phase 2 완료 후 시작 — 독립
- **US5 (P3) 인재채용**: Phase 2 완료 후 시작 — 독립
- **US6 (P3) 고객지원**: Phase 2 완료 후 시작 — 독립

### 스토리 내 실행 순서

- 콘텐츠 데이터(`content/`) → 섹션 컴포넌트(`components/sections/`) → 페이지 컴포넌트(`pages/`) → 테스트

### 병렬 실행 기회

- Phase 2: T009~T015는 파일이 다르므로 T010~T013·T014·T015 그룹으로 병렬 가능
- Phase 3: T018~T023 (각 섹션 컴포넌트 + 콘텐츠 데이터) 병렬 가능
- Phase 4~8: 각 페이즈 내 `[P]` 태스크들은 병렬 가능
- Phase 3~8: 충분한 인력이 있다면 모든 유저 스토리 페이즈를 동시에 진행 가능

---

## 병렬 실행 예시: Phase 2

```bash
# 동시에 실행 가능한 태스크들:
T009: src/index.css — SFood 컬러 토큰 정의
T010: src/content/site.ts — 내비게이션 데이터
T011: src/components/layout/SiteFooter.tsx
T013: src/components/ui/SectionHero.tsx
T014: src/pages/NotFoundPage.tsx

# T012 (SiteHeader)는 T010, T011 완료 후 시작
# T015 (App.tsx)는 T014 및 모든 페이지 컴포넌트 완료 후 시작
```

## 병렬 실행 예시: Phase 3 (US1)

```bash
# 동시에 실행 가능한 태스크들:
T018: HeroSection.tsx
T019: StatsSection.tsx
T020: BrandsPreviewSection.tsx
T021: SustainabilityTeaser.tsx
T022: CtaSection.tsx
T023: content/brands.ts

# T024 (HomePage.tsx)는 T018~T023 완료 후 시작
```

---

## Implementation Strategy

### MVP (User Story 1만 구현)

1. Phase 1: Setup 완료
2. Phase 2: Foundational 완료 (헤더·푸터·라우팅)
3. Phase 3: US1 메인 페이지 완료
4. **검증**: `http://localhost:5173/` 접속, 모든 섹션 표시 확인
5. 데모/공유 가능 상태

### 점진적 전달

1. Phase 1 + 2 → 기반 완성
2. Phase 3 (US1) → MVP 데모
3. Phase 4 + 5 (US2 + US3) → P2 페이지 추가
4. Phase 6 + 7 + 8 (US4~US6) → P3 페이지 추가
5. Phase 9 → 품질 마무리

### 팀 병렬 전략

Phase 2 완료 후:
- 개발자 A: Phase 3 (US1 메인 페이지)
- 개발자 B: Phase 4 + 5 (US2 회사소개 + US3 브랜드)
- 개발자 C: Phase 6 + 7 + 8 (US4~US6 P3 페이지)

---

## Notes

- `[P]` 태스크 = 다른 파일, 의존 없음 → 병렬 실행 가능
- `[Story]` 레이블 = 유저 스토리 추적 가능성 확보
- 각 페이즈 Checkpoint에서 독립 동작 검증 후 다음 진행
- 커밋은 각 태스크 또는 논리적 그룹 단위로
- `@myorg/ui` 컴포넌트 사용 전 Storybook MCP로 문서 조회 필수 (CLAUDE.md 참조)
- 이미지 없음 — 색상 블록·Tailwind 그라데이션·lucide-react 아이콘으로 시각 보완
