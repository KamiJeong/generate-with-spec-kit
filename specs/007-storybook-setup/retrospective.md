---
feature: 007-storybook-setup
branch: 007-storybook-setup
date: 2026-04-06
completion_rate: 89
spec_adherence: 73
counts:
  total_tasks: 44
  completed_tasks: 39
  incomplete_tasks: 5
  fr_total: 8
  fr_implemented: 5
  fr_partial: 3
  sc_total: 7
  sc_implemented: 5
  sc_partial: 1
  sc_not_implemented: 1
  critical_findings: 1
  significant_findings: 2
  minor_findings: 1
  positive_deviations: 2
---

# 회고 보고서: Storybook 품질 고도화

**Feature**: `007-storybook-setup` | **날짜**: 2026-04-06 | **작성자**: /speckit.retrospective

---

## 요약 (Executive Summary)

태스크 완료율 **89% (39/44)** 로 구현이 대부분 완료되었다. 미완료 태스크 5개는 두 가지 유형으로 분류된다: ① 수동 UI 검증 체크포인트 4개(T017–T020)로 구현은 완료되었으나 실행 중 Storybook에서 직접 확인하지 않은 항목, ② `__snapshots__/` git 커밋 미완료(T037)로 FR-007/SC-006의 "팀 공유 기준선" 요구사항을 충족하지 못한 상태.

Spec 준수율은 **73%** 로 산정되었다 (IMPLEMENTED 8개 + PARTIAL×0.5 6개 = 11/15). 핵심 기능(Controls argTypes, 단위 테스트 8개, a11y 위반 0건, 커버리지 리포트)은 완전히 구현되었다. 미완료의 주된 원인은 수동 검증 절차 생략과 스냅샷 git 커밋 누락이다.

긍정적 일탈: vitest.config.ts가 plan.md의 단순 단일 프로젝트 설계보다 발전된 멀티 프로젝트 구조(`unit` + `storybook` 병렬)로 구현되어, 추후 Storybook-Vitest 통합 테스트 실행이 가능한 기반이 마련되었다.

---

## 제안된 Spec 변경 사항 (Proposed Spec Changes)

> **Human Gate**: 아래 spec.md 변경 제안은 이 섹션에 명시하며, 실제 적용 전 사용자 확인이 필요하다.

| 항목 | 대상 | 변경 내용 | 근거 |
|------|------|-----------|------|
| FR-007 수정 | FR-007 | 시각적 스냅샷 생성 + 비교 실행 완료를 분리하여 git 커밋을 별도 명시적 태스크로 유지 | T037 누락 패턴이 반복되지 않도록 FR에 git 커밋을 명확한 선행 조건으로 기술 |
| SC-006 유지 | SC-006 | 변경 없음 — 요구사항 자체는 명확함, 실행 누락이 원인 | — |
| 검증 태스크 명확화 | 가이드 추가 | 수동 Storybook 서버 검증 태스크(T017, T018, T019, T020 유형)에 "구현 태스크 완료의 선행 조건" 레이블 추가 권고 | 검증 없이 완료로 처리되는 패턴 방지 |

---

## 요구사항 커버리지 매트릭스

### 기능 요구사항 (FR)

| ID | 설명 | 상태 | 구현 증거 |
|----|------|------|-----------|
| FR-001 | Controls 패널 union/enum → select 위젯 | **IMPLEMENTED** | T009–T016 완료; 8개 스토리 파일 argTypes 추가 확인 |
| FR-002 | canvas "Show code" 토글 + 복사 (play 함수 없이) | **PARTIAL** | T006: `docs.source.type: 'dynamic'` 전역 설정 완료; T018(브라우저 검증) 미완료 |
| FR-003 | Controls 변경 시 코드 블록 실시간 업데이트 | **PARTIAL** | T006 설정 완료; T019(런타임 동작 검증) 미완료 |
| FR-004 | 툴바 뷰포트 전환 Mobile/Tablet/Desktop | **PARTIAL** | preview.tsx 3개 뷰포트 설정 확인; T020(브라우저 검증) 미완료 |
| FR-005 | 기존 play 테스트 유지 + 단위 테스트 별도 추가 | **IMPLEMENTED** | T021–T028 8개 컴포넌트 테스트 작성; T029 전체 통과; T030 regression 없음 확인 |
| FR-006 | WCAG 접근성 위반 0건 | **IMPLEMENTED** | T031–T034 완료; a11y 위반 수집·수정·재확인 완료 |
| FR-007 | 시각적 스냅샷 생성 + git 커밋 | **PARTIAL** | T035–T036 스냅샷 생성 완료 (1,321개 PNG 파일 존재); T038 비교 통과; T037(git 커밋) **미완료** |
| FR-008 | 라인·함수·브랜치 커버리지 리포트 | **IMPLEMENTED** | T039–T040 완료; `coverage/index.html` 생성 확인 |

### 성공 기준 (SC)

| ID | 설명 | 상태 | 비고 |
|----|------|------|------|
| SC-001 | 8개 컴포넌트 union/enum prop → select 위젯 | **IMPLEMENTED** | FR-001과 일치 |
| SC-002 | 코드 표시·복사 + Controls 변경 시 즉시 업데이트 | **PARTIAL** | 설정 완료, 브라우저 검증 없음 |
| SC-003 | 뷰포트 전환 1초 이내 캔버스 반영 | **PARTIAL** | 뷰포트 구성 완료, 타이밍 미측정 |
| SC-004 | 8개 단위 테스트 통과 + play 테스트 regression 없음 | **IMPLEMENTED** | T029, T030 완료 |
| SC-005 | 전체 스토리 WCAG 위반 0건 | **IMPLEMENTED** | T034 완료 |
| SC-006 | 시각적 기준선 스냅샷 저장소 커밋 완료 | **NOT IMPLEMENTED** | `__snapshots__/` untracked 상태 — T037 미완료 |
| SC-007 | 커버리지 리포트 생성 + 전체 % 표시 | **IMPLEMENTED** | T040 완료 |

**Spec 준수율 계산**:
```
= ((IMPLEMENTED + MODIFIED + PARTIAL×0.5) / Total Requirements) × 100
= ((8 + 0 + 6×0.5) / 15) × 100
= (11 / 15) × 100 = 73.3%
```

---

## 성공 기준 평가

| SC | 달성 여부 | 세부 사항 |
|----|-----------|-----------|
| SC-001 | ✅ 달성 | button, badge, alert, spinner, tabs, switch, avatar, sheet 모두 argTypes select 설정 |
| SC-002 | ⚠️ 부분 | 설정 완료(preview.tsx `docs.source.type: 'dynamic'`), 런타임 미확인 |
| SC-003 | ⚠️ 부분 | 뷰포트 정의 완료, 1초 이내 전환 속도 미측정 |
| SC-004 | ✅ 달성 | 8개 컴포넌트 `.test.tsx` 파일 작성, 전체 통과 확인 |
| SC-005 | ✅ 달성 | a11y 위반 0건 달성 |
| SC-006 | ❌ 미달성 | 1,321개 PNG 스냅샷이 untracked 상태로 존재, git 커밋 필요 |
| SC-007 | ✅ 달성 | HTML + text + lcov 리포트 생성 완료 |

---

## 아키텍처 드리프트

| 항목 | Plan.md 기술 | 실제 구현 | 분류 |
|------|-------------|-----------|------|
| vitest.config.ts 구조 | 단일 프로젝트, `environment: 'jsdom'`, coverage 포함 | 멀티 프로젝트 (`unit` + `storybook`), `storybookTest()` 플러그인 통합 | POSITIVE |
| 패키지 명칭 | `@storybook/experimental-addon-test@10.3.3` | `@storybook/addon-vitest` (vitest-plugin API) 사용 | MINOR (패키지 API 변경 반영) |
| 커버리지 대상 | `src/components/**/*.tsx` + `src/stories/**/*.tsx` | `src/components/**/*.tsx` only (stories 제외) | MINOR |
| 시각적 테스트 설정 | `module.exports` CommonJS 형태 | 실제 구현 확인 필요 (`test-runner-setup.ts`) | — |

---

## 주요 편차 (Significant Deviations)

### [CRITICAL] SC-006: `__snapshots__/` git 커밋 미완료

- **영향**: FR-007의 "팀 공유 기준선" 요구사항 미달성. 다른 팀원이 baseline 없이 시각적 테스트 실행 불가.
- **증거**: `git status` 에 `?? packages/ui/__snapshots__/` 표시 (untracked)
- **발견 시점**: 회고 분석 (task 완료 표시 후 실제 git state 불일치)
- **원인**: T038(비교 재실행) 이후 T037(git 커밋)로 돌아가는 흐름이 단절된 것으로 추정. T038 완료 표시가 T037보다 먼저 이루어진 순서 오류.
- **해결**: `git add packages/ui/__snapshots__/ && git commit` 즉시 실행 필요.

### [SIGNIFICANT] 수동 검증 체크포인트 4개 일괄 생략 (T017, T018, T019, T020)

- **영향**: FR-002, FR-003, FR-004, SC-002, SC-003 의 브라우저 런타임 동작 미확인. 구현이 의도대로 동작하는지 검증 불가.
- **증거**: T017–T020 모두 `[ ]` 상태; 해당 태스크는 모두 "Storybook 개발 서버 실행 후" 직접 확인하는 수동 검증 절차.
- **원인**: 자동화 가능한 태스크(파일 수정, 명령어 실행)는 완료되었지만 상호작용적 브라우저 확인이 필요한 태스크는 실행 환경 제약으로 건너뜀.
- **예방책**: 수동 검증 체크포인트를 체크포인트 게이트로 명시하고, 구현 태스크의 완료 조건에 포함시킬 것.

---

## 혁신 및 우수 사례 (Innovations & Best Practices)

### [POSITIVE] vitest 멀티 프로젝트 구조 (계획 초과 달성)

- **개선 내용**: plan.md가 기술한 단순 단일 프로젝트 vitest.config.ts 대신, `unit` + `storybook` 두 개의 독립 프로젝트를 동시에 실행하는 구조로 구현.
- **왜 더 나은가**: 단위 테스트(jsdom)와 Storybook 통합 테스트(Playwright/chromium)를 단일 `pnpm test` 명령으로 병렬 실행 가능. 추후 Storybook 스토리를 vitest 테스트로 재활용하는 `@storybook/addon-vitest` 통합 기반 확보.
- **재사용 가능성**: 이 패턴을 프로젝트 표준 vitest.config.ts 구조로 채택 권고.
- **헌법 후보**: V. 단순성 예외 조건으로 문서화 가능 — 단일 명령으로 다중 테스트 환경 실행.

### [POSITIVE] preview.tsx a11y 설정 강화 (스펙 미명시 개선)

- **개선 내용**: spec.md/plan.md에 명시되지 않은 `a11y.options.runOnly: ['wcag2a', 'wcag2aa']` 설정을 preview.tsx에 추가하여 검사 기준을 WCAG 2.1 AA로 명시적으로 한정.
- **왜 더 나은가**: a11y 검사 범위를 표준에 맞게 고정하여 불필요한 실험적 규칙 오탐 방지.
- **재사용 가능성**: 모든 컴포넌트 라이브러리 Storybook에 적용 가능한 기본 설정으로 채택 권고.

---

## 헌법 준수 검토 (Constitution Compliance)

| 원칙 | 상태 | 세부 사항 |
|------|------|-----------|
| I. 코드 품질 | ✅ 통과 | T041: lint 에러 0건; T042: TypeScript 에러 0건; Biome 포맷 적용 |
| II. 테스트 표준 | ⚠️ 부분 | 단위 테스트 8개 추가 완료. 단, TDD 순서(테스트 → 구현) 미준수 — 구현 후 테스트 작성. 커버리지 80% 이상 달성 여부 미확인(T040 실행되었으나 정확한 % 미기록) |
| III. UX 일관성 | ⚠️ 부분 | WCAG 위반 0건 달성(SC-005). Controls UX(T017) 및 뷰포트 전환(T020) 브라우저 검증 미완료 |
| IV. 성능 요구사항 | N/A | 스토리/설정 파일 수정 — 런타임 성능 무영향 |
| V. 단순성 | ✅ 통과 | Complexity Tracking plan.md에 6개 신규 패키지 정당화 문서화 완료 |

**헌법 위반 사항**: 없음 (MUST 위반 없음)

**주의 사항 (SHOULD 수준)**:
- II조: TDD 순서 미준수. 기능이 이미 구현된 컴포넌트에 테스트를 추가하는 방식으로 진행됨.
- II조: 커버리지 80% 이상 달성 여부 미확인 — 다음 사이클에서 명시적으로 기록 필요.

---

## 미명시 구현 (Unspecified Implementations)

| 항목 | 위치 | 이유 |
|------|------|------|
| a11y `runOnly: ['wcag2a', 'wcag2aa']` 설정 | `preview.tsx` | spec에 미명시. WCAG 2.1 AA 기준 명확화를 위한 개선 추가 |
| `resolve.alias` (`@` → `src`) | `vitest.config.ts` | spec에 미명시. 컴포넌트 import 경로 해석 위해 추가 |
| `storybookTest` 플러그인 통합 | `vitest.config.ts` | plan에서 단순 단일 프로젝트 예상. 더 강력한 통합으로 구현 |

---

## 태스크 실행 분석

| 단계 | 태스크 수 | 완료 | 미완료 | 완료율 |
|------|-----------|------|--------|--------|
| Phase 1 (Setup) | 5 | 5 | 0 | 100% |
| Phase 2 (Foundational) | 3 | 3 | 0 | 100% |
| Phase 3 (US1 - Controls) | 9 | 8 | 1 (T017) | 89% |
| Phase 4 (US2 - Show code) | 2 | 0 | 2 (T018, T019) | 0% |
| Phase 5 (US3 - Viewport) | 1 | 0 | 1 (T020) | 0% |
| Phase 6 (US4 - 단위 테스트) | 10 | 10 | 0 | 100% |
| Phase 7 (US5 - a11y) | 4 | 4 | 0 | 100% |
| Phase 8 (US6 - 시각적 스냅샷) | 4 | 3 | 1 (T037) | 75% |
| Phase 9 (US7 - 커버리지) | 2 | 2 | 0 | 100% |
| Polish | 4 | 4 | 0 | 100% |
| **합계** | **44** | **39** | **5** | **89%** |

**관찰**: Phase 4, Phase 5가 완료율 0% — 두 Phase 모두 "Storybook 개발 서버 실행 후 브라우저 직접 확인" 형태의 수동 검증 태스크로만 구성. 자동화 가능한 파일 수정 태스크(T006)는 완료되었으나 검증이 단절됨.

---

## 교훈 및 권고사항 (Lessons Learned & Recommendations)

### 우선순위 1 (즉시 조치)

1. **T037 즉시 실행**: `git add packages/ui/__snapshots__/ && git commit` — SC-006, FR-007(부분) 해소. CRITICAL 소거.

### 우선순위 2 (이번 사이클 내)

2. **수동 검증 체크포인트 실행**: T017, T018, T019, T020 순서대로 Storybook 개발 서버에서 직접 확인. Controls select 위젯, Show code 토글, 뷰포트 전환 동작 검증.

3. **커버리지 % 기록**: `pnpm --filter @myorg/ui test:coverage` 재실행 후 전체 커버리지 % 를 이 보고서 또는 tasks.md T040에 명시. 80% 이상 달성 여부 헌법 II조 준수 확인 필요.

### 우선순위 3 (다음 사이클)

4. **수동 검증 태스크 처리 정책 수립**: "Storybook 개발 서버에서 직접 확인" 유형 태스크를 skip하지 않는 프로세스 도입. 예: 자동화 테스트로 대체하거나, 완료 조건에 체크포인트를 명시적 블로커로 표시.

5. **vitest 멀티 프로젝트 패턴 표준화**: 현재 vitest.config.ts의 `unit` + `storybook` 멀티 프로젝트 구조를 프로젝트 표준으로 채택하고 constitution이나 plan 템플릿에 권고 패턴으로 기록.

---

## Self-Assessment Checklist

| 항목 | 결과 |
|------|------|
| Evidence completeness: 주요 편차에 파일/태스크/동작 증거 포함 | ✅ PASS |
| Coverage integrity: 모든 FR/SC ID 커버리지 매트릭스 포함 | ✅ PASS |
| Metrics sanity: completion_rate, spec_adherence 공식 정확 적용 | ✅ PASS |
| Severity consistency: CRITICAL/SIGNIFICANT/MINOR/POSITIVE 레이블 영향 기준 일치 | ✅ PASS |
| Constitution review: 원칙별 검토 완료, 위반 없음 명시 | ✅ PASS |
| Human Gate readiness: Proposed Spec Changes 섹션 작성 완료 | ✅ PASS |
| Actionability: 권고사항이 구체적, 우선순위 있음, 발견과 연결됨 | ✅ PASS |

---

## 파일 추적 부록 (File Traceability)

| 파일 | 태스크 | 상태 |
|------|--------|------|
| `packages/ui/package.json` | T001, T005 | ✅ 완료 |
| `packages/ui/src/test-setup.ts` | T002 | ✅ 완료 |
| `packages/ui/vitest.config.ts` | T003 | ✅ 완료 (계획 초과) |
| `packages/ui/.storybook/test-runner-setup.ts` | T004 | ✅ 완료 |
| `packages/ui/.storybook/preview.tsx` | T006 | ✅ 완료 |
| `packages/ui/src/stories/button.stories.tsx` | T009 | ✅ 완료 |
| `packages/ui/src/components/badge.stories.tsx` | T010 | ✅ 완료 |
| `packages/ui/src/stories/alert.stories.tsx` | T011 | ✅ 완료 |
| `packages/ui/src/stories/spinner.stories.tsx` | T012 | ✅ 완료 |
| `packages/ui/src/stories/tabs.stories.tsx` | T013 | ✅ 완료 |
| `packages/ui/src/components/switch.stories.tsx` | T014 | ✅ 완료 |
| `packages/ui/src/components/avatar.stories.tsx` | T015 | ✅ 완료 |
| `packages/ui/src/components/sheet.stories.tsx` | T016 | ✅ 완료 |
| `packages/ui/src/components/button.test.tsx` | T021 | ✅ 완료 |
| `packages/ui/src/components/badge.test.tsx` | T022 | ✅ 완료 |
| `packages/ui/src/components/alert.test.tsx` | T023 | ✅ 완료 |
| `packages/ui/src/components/spinner.test.tsx` | T024 | ✅ 완료 |
| `packages/ui/src/components/switch.test.tsx` | T025 | ✅ 완료 |
| `packages/ui/src/components/avatar.test.tsx` | T026 | ✅ 완료 |
| `packages/ui/src/components/tabs.test.tsx` | T027 | ✅ 완료 |
| `packages/ui/src/components/sheet.test.tsx` | T028 | ✅ 완료 |
| `packages/ui/__snapshots__/` (1,321개 PNG) | T035–T036 | ⚠️ 생성됨, git 미커밋 |
