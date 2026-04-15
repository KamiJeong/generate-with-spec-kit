---
feature: "020-sfood-brand-site"
branch: "020-sfood-brand-site"
date: "2026-04-15"
completion_rate: 100
verified_completion_rate: 96
spec_adherence: 86
requirements:
  total: 22
  implemented: 16
  partial: 6
  modified: 0
  not_implemented: 0
  unspecified_implementations: 3
findings:
  critical: 1
  significant: 3
  minor: 1
  positive: 4
---

# Retrospective: SFood 브랜드 사이트

## Executive Summary

SFood 브랜드 사이트는 `apps/sfood`에 정적 React/Vite 앱으로 구현되었고, 요청된 8개 공개 URL, 공통 내비게이션, 페이지별 한국어 콘텐츠, 지원 영역, 테스트 파일, spec-kit 산출물을 갖춘 상태다.

현재 `tasks.md` 체크박스 기준 작업 완료율은 53/53으로 100%다. 다만 T050/T053은 검증 명령 결과와 충돌한다. 재실행 결과 `lint`는 통과했지만 `test`와 `build`는 Vite/Vitest 설정 로딩 중 `esbuild` 프로세스 `spawn EPERM`으로 실패했으므로, 검증 근거 기준 완료율은 51/53, 96%로 유지한다.

Spec adherence는 86%로 산정했다. 15개 기능 요구사항은 구현되었고, SC-002는 구현으로 확인 가능하다. 나머지 6개 성공 기준은 사용자 테스트, 콘텐츠 리뷰, 접근성 리뷰 같은 외부 검증이 필요하므로 Partial로 분류했다.

## Proposed Spec Changes

아래 항목은 사용자 승인 후 2026-04-15에 `spec.md`에 반영했다.

| ID | 대상 | 제안 변경 | 근거 |
| --- | --- | --- | --- |
| PSC-001 | SC-001, SC-003, SC-004, SC-005 | 사용자 테스트 기반 성공 기준은 "구현 완료 후 별도 사용자 검증으로 측정"한다고 명시 | Applied |
| PSC-002 | Constraints 또는 Assumptions | Vite/Vitest 검증 환경은 `esbuild` 바이너리 실행 권한을 필요로 한다는 전제를 추가 | Applied |
| PSC-003 | Assumptions | 첫 버전에서 원격 이미지 사용을 허용할지, 로컬 에셋만 허용할지 명시 | Applied |

## Requirement Coverage Matrix

| ID | Status | Evidence | Notes |
| --- | --- | --- | --- |
| FR-001 | Implemented | `apps/sfood/src/routes/route-map.ts`, `apps/sfood/src/App.tsx` | 8개 공개 URL이 typed route map과 render switch에 등록됨 |
| FR-002 | Implemented | `SiteHeader.tsx`, `SiteFooter.tsx`, `PageHero.tsx` | 모든 페이지가 공통 정체성, 기본 내비게이션, 페이지별 제목을 사용 |
| FR-003 | Implemented | `site.ts`, `HomePage.tsx`, `HeroSection.tsx` | 미션, 육가공 전문성, Meal Solution, B2B/B2C, 품질 신뢰 메시지 포함 |
| FR-004 | Implemented | `site.ts`, `AboutPage.tsx`, `about.test.tsx` | 정확한 인증/수상 명칭 없이 품질 접근과 회사 성격 표현 |
| FR-005 | Implemented | `sustainabilityThemes`, `SustainabilityPage.tsx` | 책임 원료, 생산 개선, 식문화, 미래 식탁 연구 4개 주제 포함 |
| FR-006 | Implemented | `brandLines`, `BrandsPage.tsx` | business/consumer 라인과 햄, 소시지, 베이컨, 바비큐, 치즈, 빵, 소스, HMR 포함 |
| FR-007 | Implemented | `talentValues`, `hiringSteps`, `TalentPage.tsx` | 인재상과 4단계 채용 프로세스 제공 |
| FR-008 | Implemented | `contentEntries`, `NoticePage.tsx`, `support.test.tsx` | 공지 3개, 날짜 라벨, 요약 제공. 상세 링크 없음 |
| FR-009 | Implemented | `contentEntries`, `NewsPage.tsx`, `support.test.tsx` | 회사소식 3개, 날짜 라벨, 주제, 요약 제공. 상세 링크 없음 |
| FR-010 | Implemented | `faqItems`, `FaqPage.tsx`, `faq.test.tsx` | 브랜드, 제품, 품질, 제휴, 채용 FAQ 포함 |
| FR-011 | Implemented | `site.ts` | 모든 핵심 카피가 밝고 자신감 있는 한국어 톤으로 작성됨 |
| FR-012 | Implemented | `App.tsx`, route map, pages | API, 계정, 구매, 검색, 상세, CMS 없음 |
| FR-013 | Implemented | `SupportNav.tsx`, support pages | 공지사항, 회사소식, FAQ 간 지원 메뉴 제공 |
| FR-014 | Implemented | `content.test.ts`, source audit | `FSSC 22000`, `HACCP`, `DLG` 금지어가 앱 소스에 없음 |
| FR-015 | Implemented | `index.css`, page layout classes, accessibility tests | 반응형 grid/flex, semantic labels, `aria-current`, landmark 구조 작성 |
| SC-001 | Partial | `HomePage.tsx`, `HeroSection.tsx` | 핵심 사업과 미션은 구현됨. 90%/60초 사용자 테스트는 미수행 |
| SC-002 | Implemented | `route-map.ts`, `SiteHeader.tsx`, `SiteFooter.tsx`, `SupportNav.tsx` | 요청 URL 100%가 기본 또는 지원 내비게이션에서 접근 가능 |
| SC-003 | Partial | `BrandsPage.tsx`, `brands.test.tsx` | consumer/business 구분은 구현됨. 90% 사용자 검증은 미수행 |
| SC-004 | Partial | `TalentPage.tsx`, `talent.test.tsx` | 채용 프로세스는 구현됨. 85%/30초 사용자 검증은 미수행 |
| SC-005 | Partial | `NoticePage.tsx`, `NewsPage.tsx`, `FaqPage.tsx` | 지원 콘텐츠는 구현됨. 2분 내 탐색 사용자 검증은 미수행 |
| SC-006 | Partial | `site.ts`, `content.test.ts`, source audit | 플레이스홀더와 금지어는 확인됨. 공식 콘텐츠 리뷰는 미수행 |
| SC-007 | Partial | `accessibility-structure.test.tsx`, `SiteHeader.tsx`, `SupportNav.tsx` | 구조와 라벨은 작성됨. 최종 접근성 테스트 실행은 `spawn EPERM`으로 차단됨 |

## Success Criteria Assessment

| Criterion | Assessment |
| --- | --- |
| SC-001 | 구현 지원 완료, 사용자 테스트 필요 |
| SC-002 | 충족. route map과 header/footer/support nav로 접근 가능 |
| SC-003 | 구현 지원 완료, 사용자 테스트 필요 |
| SC-004 | 구현 지원 완료, 사용자 테스트 필요 |
| SC-005 | 구현 지원 완료, 사용자 테스트 필요 |
| SC-006 | 소스 기준 충족, 공식 리뷰 필요 |
| SC-007 | 구조 기준 구현, 자동/수동 접근성 검증 필요 |

## Architecture Drift Table

| Plan Item | Actual | Drift | Severity |
| --- | --- | --- | --- |
| `apps/sfood` 신규 앱 | `apps/sfood`에 Vite/React 앱 추가 | None | Positive |
| API 없는 정적 콘텐츠 | `src/content/site.ts` typed constants 사용 | None | Positive |
| 8개 정적 URL | `resolveRoute`와 `App.tsx` render switch 사용 | None | Positive |
| 새 라우팅 런타임 의존성 없음 | React `useSyncExternalStore` 기반 간단 라우팅 | None | Positive |
| `@myorg/ui`, semantic token 우선 | Card, Button, Badge, Accordion, Separator 사용. raw hex/arbitrary color 없음 | None | Positive |
| 최종 test/lint/build 통과 | `lint` 통과, `test`/`build`는 `spawn EPERM` 실패 | Validation drift | Critical |
| 이미지 정책 | 원격 Unsplash 이미지 사용, spec 가정에 허용 및 최종 검토 조건 반영 | None | Positive |

## Significant Deviations

### CRITICAL - 최종 품질 게이트 미충족

- Evidence: T050/T053은 체크박스상 완료로 표시되어 있으나, `pnpm --filter @myorg/sfood test`와 `pnpm --filter @myorg/sfood build`가 Vite/Vitest 설정 로딩 중 `Error: spawn EPERM`으로 실패한다.
- Impact: 헌법의 PR 병합 기준인 test/build 품질 게이트를 만족하지 못한다.
- Root cause: 구현 결함으로 확인되기 전 단계인 로컬 실행 환경의 프로세스 spawn 권한 문제.
- Recommendation: `esbuild` 바이너리 실행 권한 또는 보안 정책을 해결한 뒤 `test`, `build`를 재실행하고 T050/T053의 완료 상태를 검증 결과와 일치시킨다.

### SIGNIFICANT - 사용자 테스트 기반 성공 기준 미검증

- Evidence: SC-001, SC-003, SC-004, SC-005는 테스트 참여자 비율과 시간 기준을 요구하지만 실제 사용자 테스트 기록이 없다.
- Impact: 구현은 성공 기준을 지원하지만 결과 지표 달성은 아직 증명되지 않았다.
- Root cause: 명세가 구현 검증과 사용자 검증을 한 성공 기준 안에 함께 둠.
- Recommendation: 구현 완료 검증과 사용자 테스트 검증을 분리해 후속 체크리스트 또는 spec 변경으로 관리한다.

### SIGNIFICANT - 접근성 자동 검증 미완료

- Evidence: `accessibility-structure.test.tsx`는 작성되었지만 전체 test 실행이 `spawn EPERM`으로 실패했다.
- Impact: 구조상 접근성 장치는 있으나 자동 검증 결과를 증거로 사용할 수 없다.
- Root cause: 테스트 러너가 Vite config 로딩 단계에서 중단됨.
- Recommendation: 실행 환경 복구 후 테스트를 재실행하고, 필요하면 Storybook a11y 또는 Playwright 기반 검증을 추가한다.

### SIGNIFICANT - Task 상태와 검증 근거 불일치

- Evidence: 현재 `tasks.md`는 T050/T053을 완료로 표시하지만, `pnpm --filter @myorg/sfood test`와 `pnpm --filter @myorg/sfood build`는 여전히 `spawn EPERM`으로 실패한다.
- Impact: 작업 목록만 보면 품질 게이트가 완료된 것처럼 보이며, 실제 release readiness 판단을 흐릴 수 있다.
- Root cause: 체크박스 완료 기준이 "명령 실행 시도"인지 "명령 통과"인지 모호하고, 환경 blocker가 발생한 뒤 task 상태가 검증 결과와 분리됨.
- Recommendation: T050/T053은 환경 blocker가 해소되어 test/build가 통과할 때 완료 처리하거나, tasks.md에 실패 근거를 명시하는 별도 후속 작업으로 분리한다.

## Innovations and Best Practices

| Item | Value | Reuse Potential | Constitution Candidate |
| --- | --- | --- | --- |
| Typed route map | URL, label, title, nav group, page key를 단일 소스로 관리 | 다른 정적 브랜드 앱에 재사용 가능 | No |
| Content entity model | Page, BrandLine, ContentEntry, FAQItem, HiringStep를 타입으로 고정 | 템플릿형 사이트 제작에 재사용 가능 | No |
| Forbidden quality term tests | 정확한 인증/수상 명칭 사용 금지를 테스트로 보호 | 법무 검토 전 카피 안전장치로 유용 | Possible |
| SupportNav shared component | 지원 영역 페이지 간 탐색 일관성 확보 | FAQ/공지/뉴스 묶음에 재사용 가능 | No |

## Constitution Compliance

| Article | Status | Evidence |
| --- | --- | --- |
| I. 코드 품질 | Pass | 라우트, 콘텐츠, 레이아웃, 페이지 컴포넌트가 분리됨 |
| II. 테스트 표준 | Critical Gap | 테스트는 작성되었으나 `test` 실행이 `spawn EPERM`으로 실패. 최종 통과 증거 없음 |
| III. 사용자 경험 일관성 | Pass with Risk | `@myorg/ui`와 semantic token 사용. 최종 접근성 실행 검증은 미완료 |
| IV. 성능 요구사항 | Partial | API 없음, 정적 콘텐츠 구조. 실제 FCP/번들 성능 측정은 미수행 |
| V. 단순성 | Pass | React Router, CMS, API, 검색, 상세 페이지를 추가하지 않음 |
| 문서 언어 정책 | Pass | spec-kit 산출물과 회고 문서는 한국어로 작성됨 |

Constitution violations: test/build 품질 게이트 미통과. `spawn EPERM` 환경 문제가 해소되기 전 main 병합 준비 상태로 보지 않아야 한다.

## Unspecified Implementations

| Item | Evidence | Risk | Recommendation |
| --- | --- | --- | --- |
| 커스텀 클라이언트 라우팅 | `App.tsx`의 `pushState`, `popstate`, `useSyncExternalStore` | 범위 내에서는 적절하지만 확장 시 복잡도 증가 가능 | URL 수가 늘면 라우팅 전략 재검토 |
| NotFound 페이지 | `NotFoundPage.tsx` | 긍정적 방어 구현이나 명세의 공개 페이지 목록 밖 | 유지 가능. 필요 시 edge case로 명세화 |
| Storybook MCP 설정 변경 | `.codex/config.toml` | 앱 동작과 직접 관련 없는 도구 설정 변경 | 별도 작업이면 분리 커밋 고려 |

## Task Execution Analysis

- Total tasks: 53
- Completed by checkbox state: 53
- Completion rate by checkbox state: 100%
- Verified completion rate: 96%
- Status conflict:
  - T050 is marked complete, but quickstart validation still has unresolved `test`/`build` failures.
  - T053 is marked complete, but final `test`/`build` do not pass.
- Re-run evidence:
  - `pnpm --filter @myorg/sfood lint`: Passed
  - `pnpm --filter @myorg/sfood test`: Failed with `Error: spawn EPERM` while loading `vitest.config.ts`
  - `pnpm --filter @myorg/sfood build`: Failed with `Error: spawn EPERM` while loading `vite.config.ts`
- Process note: TDD intent is represented by test tasks before implementation tasks, but failing-first and passing-final evidence is incomplete because the test runner could not complete.

## Lessons Learned and Recommendations

1. Resolve the local `esbuild` spawn permission issue before further frontend validation. This is the only critical blocker.
2. Split user-study success criteria from implementation acceptance criteria in future specs. Automated tests can verify content presence and navigation, not participant percentages.
3. Add an explicit image sourcing policy for brand-site specs. Remote images are fast for prototypes but create runtime and licensing review considerations.
4. Keep the typed content and route-map pattern. It made route coverage, support navigation, and content invariants straightforward to test.
5. Preserve the forbidden quality-term test pattern for any food, medical, finance, or regulated-copy prototype.

## File Traceability Appendix

| Area | Files |
| --- | --- |
| App shell and routing | `apps/sfood/src/App.tsx`, `apps/sfood/src/routes/route-map.ts`, `apps/sfood/src/main.tsx` |
| Content model | `apps/sfood/src/content/site.ts` |
| Shared layout | `apps/sfood/src/components/layout/SiteHeader.tsx`, `apps/sfood/src/components/layout/SiteFooter.tsx` |
| Shared sections | `HeroSection.tsx`, `PageHero.tsx`, `SectionHeader.tsx`, `SupportNav.tsx` |
| Pages | `HomePage.tsx`, `AboutPage.tsx`, `SustainabilityPage.tsx`, `BrandsPage.tsx`, `TalentPage.tsx`, `NoticePage.tsx`, `NewsPage.tsx`, `FaqPage.tsx`, `NotFoundPage.tsx` |
| Tests | `apps/sfood/tests/routes.test.tsx`, `apps/sfood/tests/content.test.ts`, `apps/sfood/tests/accessibility-structure.test.tsx`, `apps/sfood/tests/user-stories/*.test.tsx` |
| Build/config | `apps/sfood/package.json`, `apps/sfood/tsconfig.json`, `apps/sfood/vite.config.ts`, `apps/sfood/vitest.config.ts`, `apps/sfood/src/index.css` |
| Spec artifacts | `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/ui-routes.md`, `quickstart.md`, `tasks.md` |

## Self-Assessment Checklist

- PASS - Evidence completeness: major deviations include file, task, or command evidence.
- PASS - Coverage integrity: FR-001 through FR-015 and SC-001 through SC-007 are all represented.
- PASS - Metrics sanity: checkbox completion rate is 53/53 = 100%; verified completion rate is 51/53 = 96%; adherence is `(16 + 6 * 0.5) / 22 = 86%`.
- PASS - Severity consistency: quality gate failure is Critical due constitution merge gate; user metric and task-evidence gaps are Significant; remaining tool/config scope gap is Minor.
- PASS - Constitution review: violations are explicitly listed.
- PASS - Human Gate readiness: proposed `spec.md` changes were listed first and applied only after explicit user approval.
- PASS - Actionability: recommendations are tied to the observed blockers and drift.
