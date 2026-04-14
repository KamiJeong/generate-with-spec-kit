---
feature: "018-sfood-brand-site"
branch: "018-sfood-brand-site"
date: "2026-04-14"
completion_rate: "94.7%"
spec_adherence: "90.5%"
requirements:
  total: 21
  implemented: 17
  partial: 4
  not_implemented: 0
tasks:
  total: 57
  completed: 54
  incomplete: 3
critical_findings: 1
significant_findings: 2
---

# Retrospective: SFood 브랜드 사이트 구축

## Executive Summary

`packages/sfood` 신규 SPA 패키지는 spec.md의 핵심 제품 범위인 8개 정적 라우트, 전역 헤더/푸터, 정적 콘텐츠 모델, 브랜드 테마, 페이지별 콘텐츠 섹션, 단일 모드 FAQ 아코디언을 구현했다. 구현 산출물은 `packages/sfood/src/routing/routes.ts`, `packages/sfood/src/content/sfood-content.ts`, `packages/sfood/src/App.tsx`, `packages/sfood/src/pages/*`, `packages/sfood/src/components/*`에 분산되어 있으며 계획된 구조와 대체로 일치한다.

주요 미완료 영역은 기능 구현이 아니라 검증이다. `pnpm --filter @myorg/sfood lint`는 통과했지만, `test`와 `build`는 새 패키지의 dependency links가 생성되지 않아 실행/완료되지 못했다. quickstart.md에는 320px, 768px, 1280px 수동 검증도 `Not run`으로 기록되어 있다.

## Proposed Spec Changes

없음. 현재 발견 사항은 spec.md 요구사항 변경이 아니라 구현 검증 환경 및 품질 게이트 미완료 문제다. spec.md를 수정할 필요는 확인되지 않았다.

## Requirement Coverage Matrix

| ID | Status | Evidence | Notes |
|----|--------|----------|-------|
| FR-001 | Implemented | `src/routing/routes.ts`, `src/App.tsx` | 8개 경로와 페이지 렌더링 switch가 구현됨. |
| FR-002 | Implemented | `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/App.tsx` | 공통 레이아웃과 `aria-current` 기반 활성 상태가 구현됨. |
| FR-003 | Implemented | `src/routing/routes.ts`, `src/components/layout/SiteHeader.tsx` | 상위 메뉴와 고객지원 하위 메뉴가 route table 기반으로 구성됨. |
| FR-004 | Implemented | `src/pages/HomePage.tsx` | 히어로, 미션, 카테고리, 인증, 최신 2건 섹션이 구현됨. |
| FR-005 | Implemented | `src/pages/AboutPage.tsx`, `src/components/about/*` | 미션, 비전, 가치, 타임라인, 인증 패널이 구현됨. |
| FR-006 | Implemented | `src/pages/SustainabilityPage.tsx`, `src/components/sustainability/SustainabilityMetrics.tsx` | ESG 카드와 정량 지표가 구현됨. |
| FR-007 | Implemented | `src/pages/BrandsPage.tsx`, `src/components/brands/BrandLineup.tsx` | B2B/B2C 탭과 브랜드 카드가 구현됨. |
| FR-008 | Implemented | `src/pages/TalentPage.tsx`, `src/components/talent/HiringProcess.tsx` | 채용 철학, 문화, 복리후생, 4단계 프로세스가 구현됨. |
| FR-009 | Implemented | `src/pages/NoticePage.tsx`, `src/content/sfood-content.ts` | 공지 목록은 `getNoticeArticles()`로 날짜 역순 정렬됨. |
| FR-010 | Implemented | `src/pages/NewsPage.tsx`, `src/content/sfood-content.ts` | 뉴스 카드가 이미지, 제목, 날짜, 요약을 표시함. |
| FR-011 | Implemented | `src/components/support/FaqAccordion.tsx`, `src/pages/FaqPage.tsx` | `Accordion type="single" collapsible` 사용. |
| FR-012 | Implemented | `src/content/sfood-content.ts` | 모든 콘텐츠가 typed constant로 제공되며 source scan에서 `fetch(` 사용 없음. |
| FR-013 | Partial | `src/pages/*`, `src/components/*`, `quickstart.md` | 반응형 grid/flex 클래스는 있으나 320px/768px/1280px 수동 검증은 미실행. |
| FR-014 | Implemented | `src/index.css` | SFood 팔레트가 semantic CSS variable로 매핑됨. |
| SC-001 | Implemented | `src/components/layout/SiteHeader.tsx`, `src/pages/HomePage.tsx` | 주요 페이지는 헤더/CTA에서 1클릭 접근 가능. |
| SC-002 | Partial | `tasks.md`, `quickstart.md` | 8개 페이지 코드와 테스트 파일은 있으나 `test`/`build`가 dependency link 문제로 미완료. |
| SC-003 | Partial | `quickstart.md` | 기준 viewport 3종이 `Not run`으로 기록됨. |
| SC-004 | Implemented | `src/pages/FaqPage.tsx`, `src/components/support/FaqAccordion.tsx` | FAQ 항목 수와 단일 아코디언 UX가 단순해 1분 내 확인 목표를 충족할 구조. |
| SC-005 | Partial | `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `quickstart.md` | 내부 링크는 정의되어 있으나 전체 링크/404 검증이 실행되지 않음. |
| SC-006 | Implemented | `src/index.css` | 전역 semantic theme가 적용됨. |
| SC-007 | Implemented | `src/pages/HomePage.tsx`, `src/components/shared/PageHero.tsx` | 각 페이지가 초기 영역에 제목과 핵심 메시지를 포함함. |

## Success Criteria Assessment

| Criterion | Assessment | Evidence |
|-----------|------------|----------|
| SC-001 | Pass by implementation | 헤더 및 Home CTA로 `/brands`, `/talent` 등 주요 경로 접근 가능. |
| SC-002 | Partial | build/test 미완료로 런타임 오류 없음이 입증되지 않음. |
| SC-003 | Partial | quickstart.md에 320px/768px/1280px 모두 `Not run`으로 기록됨. |
| SC-004 | Pass by implementation | FAQ는 3개 질문과 single accordion으로 구성됨. |
| SC-005 | Partial | 경로 정의와 링크는 있으나 전체 링크 클릭 검증은 미실행. |
| SC-006 | Pass by implementation | `index.css`에서 semantic token 기반 브랜드 테마를 정의함. |
| SC-007 | Pass by implementation | Home hero 및 각 하위 페이지의 `PageHero`가 핵심 메시지를 제공함. |

## Architecture Drift Table

| Planned Decision | Actual Implementation | Drift | Severity |
|------------------|-----------------------|-------|----------|
| 신규 `packages/sfood` SPA 패키지 | `packages/sfood` package, Vite, React entry 추가 | None | POSITIVE |
| typed route table + History API | `routes.ts`, `useCurrentRoute.ts`, `App.tsx` switch 구현 | None | POSITIVE |
| `@myorg/ui` 우선 재사용 | Card, Button, Badge, NavigationMenu, Sheet, Tabs, Accordion, Progress 사용 | None | POSITIVE |
| 신규 외부 의존성 없음 | `lucide-react`, React, Vite, Vitest 등 기존 workspace 패턴 내 의존성 사용 | None | POSITIVE |
| Tailwind v4 + semantic token theme | `src/index.css`에서 `@source`와 CSS variable 매핑 구현 | None | POSITIVE |
| 구현 후 test/lint/build 실행 | lint 통과, test/build는 dependency link 문제로 미완료 | Verification drift | CRITICAL |

## Significant Deviations

| Severity | Finding | Evidence | Impact | Recommendation |
|----------|---------|----------|--------|----------------|
| CRITICAL | Constitution II 및 PR merge gate가 요구하는 test/build 품질 증거가 완성되지 않았다. | `tasks.md` T054/T056 미완료, `quickstart.md` 구현 세션 상태 | 기능이 구현되어도 회귀/런타임 안정성을 병합 기준으로 입증하지 못함. | 온라인 또는 완전한 pnpm store 환경에서 `pnpm install` 후 `pnpm --filter @myorg/sfood test`와 `build`를 완료한다. |
| SIGNIFICANT | responsive 기준 viewport 검증이 미완료다. | `quickstart.md` 320px/768px/1280px `Not run` | FR-013/SC-003은 코드상 의도만 있고 실제 표시 품질이 검증되지 않음. | dev server 실행 후 세 viewport를 확인하고 결과를 quickstart.md에 갱신한다. |
| SIGNIFICANT | lockfile-only offline install이 완주하지 못했다. | `quickstart.md`에 `@vitest/coverage-v8` tarball 누락 기록 | 새 importer는 추가되었지만 dependency linking이 완료되지 않아 test/build가 막힘. | 네트워크 가능한 환경에서 `pnpm install`을 재실행해 lockfile과 node_modules를 정상 동기화한다. |

## Innovations And Best Practices

| Type | Observation | Reusability |
|------|-------------|-------------|
| POSITIVE | `routes.ts`가 경로, nav grouping, page metadata의 single source of truth 역할을 한다. | 향후 정적 SPA 패키지의 라우팅 템플릿으로 재사용 가능. |
| POSITIVE | 콘텐츠를 `sfood-content.ts` typed constant와 helper 함수로 분리했다. | 외부 API 없는 브랜드/마케팅 사이트에서 테스트 가능한 콘텐츠 구조로 재사용 가능. |
| POSITIVE | 브랜드 색상을 JSX raw color가 아니라 `index.css` semantic variable override로 제한했다. | 디자인 시스템 준수 패턴으로 유지 가능. |
| POSITIVE | tests가 route/content/component/page로 나뉘어 acceptance surface를 직접 검증하도록 설계됐다. | 실행 환경만 정상화되면 TDD 증거로 활용 가능. |

## Constitution Compliance

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. 코드 품질 | PASS | routes/content/layout/pages/components로 책임이 분리됨. `pnpm --filter @myorg/sfood lint` 통과. |
| II. 테스트 표준 | CRITICAL GAP | 테스트 파일은 작성됐으나 `pnpm --filter @myorg/sfood test`가 `vitest` link 누락으로 실행되지 않음. |
| III. UX 일관성 | PASS with residual risk | `@myorg/ui` 재사용, semantic tokens 사용. viewport와 접근성 자동 검증은 미완료. |
| IV. 성능 요구사항 | PARTIAL | 정적 SPA와 lazy image 정책은 부합하나 build/runtime 검증 및 FCP 측정 없음. |
| V. 단순성 | PASS | React Router/CMS/API/DB를 도입하지 않고 typed table + History API로 해결. |
| 기술 스택 및 의존성 제약사항 | PASS | 기존 workspace 패턴 의존성만 사용. |
| 개발 워크플로우 및 품질 게이트 | CRITICAL GAP | test/build 미완료라 merge gate를 충족하지 못함. |
| 문서 언어 정책 | PASS | speckit 문서는 한국어로 유지됨. |

## Unspecified Implementations

- `pnpm-lock.yaml`에 `packages/sfood` importer가 추가됨. 이는 새 workspace package를 정상 인식시키기 위한 필수 패키지 관리 변경이며 spec drift로 보지 않는다.
- `packages/sfood/README.md`가 추가됨. tasks.md T051의 사용 메모와 경로 목록 문서화이며 spec drift로 보지 않는다.
- Unsplash URL 기반 placeholder image 사용. spec.md의 placeholder image 가정과 일치한다.

## Task Execution Analysis

| Phase | Completed | Total | Notes |
|-------|-----------|-------|-------|
| Phase 1 Setup | 6 | 6 | 패키지, Vite, Vitest, TS, entry, test setup 완료. |
| Phase 2 Foundational | 14 | 14 | route/content/theme/shared layout 기반 완료. |
| Phase 3 US1 | 6 | 6 | Home MVP 및 nav wiring 완료. |
| Phase 4 US2 | 5 | 5 | About page 및 certification/timeline 완료. |
| Phase 5 US3 | 4 | 4 | Brand tabs/cards 완료. |
| Phase 6 US4 | 4 | 4 | ESG cards/metrics 완료. |
| Phase 7 US5 | 4 | 4 | Talent page/process 완료. |
| Phase 8 US6 | 7 | 7 | Notice/news/FAQ 완료. |
| Phase 9 Polish | 4 | 7 | README, token audit, a11y surface scan, lint 완료. test/build/manual viewport 미완료. |

Incomplete tasks:

- T054: `pnpm --filter @myorg/sfood test` 실행 및 실패 수정.
- T056: `pnpm --filter @myorg/sfood build` 실행 및 실패 수정.
- T057: 320px, 768px, 1280px 수동 반응형 검증 기록.

## Root Cause Analysis

| Deviation | Discovery Point | Cause | Prevention |
|-----------|-----------------|-------|------------|
| test/build 미완료 | Polish validation | 새 workspace package가 lockfile/node_modules에 완전히 링크되지 않았고 offline store에 `@vitest/coverage-v8` tarball이 없음. | 신규 package 추가 직후 네트워크 가능한 환경에서 `pnpm install`을 먼저 실행하거나, CI에서 package importer 누락을 조기에 감지한다. |
| responsive 수동 검증 미완료 | Quickstart validation | dev server/build가 dependency link 문제로 막혀 브라우저 검증을 시작하지 못함. | build 전에도 dev server 실행 가능 여부를 early checkpoint로 분리한다. |
| TDD 통과 확인 미완료 | Test execution | 테스트 작성은 완료됐지만 실패→통과 루프를 실행할 수 없음. | tasks.md에 "dependency link/install checkpoint"를 Setup phase 끝에 추가하는 것을 검토한다. |

## Lessons Learned And Recommendations

1. **CRITICAL**: 새 workspace package가 추가되는 feature는 Phase 1 직후 `pnpm install` 또는 lockfile validation checkpoint를 별도 task로 둔다.
2. **HIGH**: dependency links가 없을 때에도 `eslint`처럼 root binary로 가능한 검증과 package-filter script 검증을 구분해 기록한다.
3. **HIGH**: responsive 검증은 build 완료 후가 아니라 dev server 시작 가능 시점부터 별도 evidence로 축적한다.
4. **MEDIUM**: static brand site는 typed content + route table 패턴이 요구사항 추적성에 유리했다. 다음 유사 feature에서도 유지할 가치가 있다.
5. **MEDIUM**: tests were authored across route/content/page/component boundaries; after dependency repair, this suite should be the first regression gate to run.

## File Traceability Appendix

| Area | Files |
|------|-------|
| Package setup | `packages/sfood/package.json`, `packages/sfood/tsconfig.json`, `packages/sfood/vite.config.ts`, `packages/sfood/vitest.config.ts`, `packages/sfood/index.html`, `packages/sfood/src/main.tsx` |
| Routing | `packages/sfood/src/routing/routes.ts`, `packages/sfood/src/routing/useCurrentRoute.ts`, `packages/sfood/src/App.tsx` |
| Content | `packages/sfood/src/content/sfood-content.ts` |
| Theme | `packages/sfood/src/index.css` |
| Layout | `packages/sfood/src/components/layout/SiteHeader.tsx`, `packages/sfood/src/components/layout/SiteFooter.tsx` |
| Shared components | `packages/sfood/src/components/shared/SectionHeader.tsx`, `packages/sfood/src/components/shared/PageHero.tsx`, `packages/sfood/src/components/shared/CertificationBadge.tsx` |
| Pages | `packages/sfood/src/pages/HomePage.tsx`, `packages/sfood/src/pages/AboutPage.tsx`, `packages/sfood/src/pages/BrandsPage.tsx`, `packages/sfood/src/pages/SustainabilityPage.tsx`, `packages/sfood/src/pages/TalentPage.tsx`, `packages/sfood/src/pages/NoticePage.tsx`, `packages/sfood/src/pages/NewsPage.tsx`, `packages/sfood/src/pages/FaqPage.tsx`, `packages/sfood/src/pages/NotFoundPage.tsx` |
| Tests | `packages/sfood/tests/routing/routes.test.ts`, `packages/sfood/tests/content/sfood-content.test.ts`, `packages/sfood/tests/App.test.tsx`, `packages/sfood/tests/components/SiteHeader.test.tsx`, `packages/sfood/tests/components/FaqAccordion.test.tsx`, `packages/sfood/tests/pages/*.test.tsx`, `packages/sfood/tests/setup.ts` |
| Documentation | `packages/sfood/README.md`, `packages/sfood/src/assets/README.md`, `specs/018-sfood-brand-site/quickstart.md`, `specs/018-sfood-brand-site/tasks.md` |

## Self-Assessment Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Evidence completeness | PASS | Major deviations cite tasks.md, quickstart.md, and package command behavior. |
| Coverage integrity | PASS | FR-001 through FR-014 and SC-001 through SC-007 are all covered. |
| Metrics sanity | PASS | Completion rate = 54 / 57 = 94.7%; adherence = (17 implemented + 4 partial * 0.5) / 21 = 90.5%. |
| Severity consistency | PASS | Unmet constitution quality gates are CRITICAL; unverified responsive/runtime outcomes are SIGNIFICANT. |
| Constitution review | PASS | Violations/gaps are explicitly listed. |
| Human Gate readiness | PASS | No spec.md changes are proposed. |
| Actionability | PASS | Recommendations directly target dependency linking, test/build, and viewport verification. |
