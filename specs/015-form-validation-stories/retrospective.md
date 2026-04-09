---
feature: 폼 유효성 검사 스토리
branch: 015-form-validation-stories
date: 2026-04-09
completion_rate: 100
spec_adherence: 100
total_requirements: 13
implemented: 13
partial: 0
modified: 0
not_implemented: 0
unspecified: 0
critical_findings: 0
significant_findings: 2
minor_findings: 0
positive_findings: 3
---

# Retrospective: 폼 유효성 검사 스토리

**Branch**: `015-form-validation-stories` | **Date**: 2026-04-09  
**Completion**: 24/24 tasks (100%) | **Spec Adherence**: 100%

---

## Executive Summary

Zod v4 + React Hook Form v7 기반 폼 유효성 검사 Storybook 스토리 3종이 spec.md의 모든 요구사항을 충족하여 구현 완료됐다. 24/24 태스크가 모두 완료됐으며, MCP `run-story-tests` 실행 결과 12개 스토리의 인터랙션 테스트가 전부 통과됐다.

구현 품질 측면에서 세 가지 주목할 만한 개선이 확인됐다:
1. `productSchema`에서 `z.coerce.number()` 대신 string → refine → transform 패턴 채택으로 더 명확한 오류 메시지 분기
2. 성공 상태에서 `args.onSubmit` 호출 검증(`toHaveBeenCalledWith`) 추가로 계약 수준 테스트 달성
3. `ProductFormInput`/`ProductFormData` 이중 타입 export로 transform 사용 시 타입 안전성 확보

**접근성 이슈 발견**: `--destructive` 토큰 색상(`#e75a08`, 명암비 3.58:1)이 WCAG 2 AA 기준(4.5:1) 미달. 이 피처 코드 문제가 아닌 기존 디자인 토큰 레벨 문제이며, `Field` 컴포넌트 등 전체 UI에 영향. 별도 피처에서 수정 필요.

스펙 변경 권고 없음.

---

## Proposed Spec Changes

없음 — 모든 요구사항이 구현에 충실히 반영됐으며, 스펙 업데이트가 필요한 드리프트가 없다.

---

## Requirement Coverage Matrix

| ID | 요구사항 | 상태 | 구현 위치 |
|----|---------|------|----------|
| FR-001 | 각 폼은 Storybook 스토리로 독립 렌더링/테스트 가능 | ✅ IMPLEMENTED | `sign-up-form.stories.tsx`, `login-form.stories.tsx`, `product-register-form.stories.tsx` |
| FR-002 | 회원가입: 이메일 형식, 비밀번호 최소 8자, 비밀번호 확인 일치 검사 | ✅ IMPLEMENTED | `form-schemas.ts:signUpSchema`, `sign-up-form.stories.tsx:PasswordMismatch` |
| FR-003 | 로그인: 이메일 형식, 비밀번호 필수 입력 검사 | ✅ IMPLEMENTED | `form-schemas.ts:loginSchema`, `login-form.stories.tsx:WithErrors,InvalidEmail` |
| FR-004 | 상품 등록: 상품명 필수/100자, 가격 숫자/최솟값0, 설명 선택 | ✅ IMPLEMENTED | `form-schemas.ts:productSchema`, `product-register-form.stories.tsx:WithErrors,NameTooLong` |
| FR-005 | 유효성 검사 실패 시 해당 필드 아래에 구체적 오류 메시지 표시 | ✅ IMPLEMENTED | `Field` 컴포넌트 `error` prop 활용, 모든 스토리 |
| FR-006 | 오류 메시지는 어떤 규칙이 위반됐는지 명확히 설명 | ✅ IMPLEMENTED | 한국어 메시지: "이메일 형식", "최소 8자", "100자까지" 등 구체적 규칙 명시 |
| FR-007 | 각 폼은 Default, WithErrors, Success 등 다양한 상태 스토리 제공 | ✅ IMPLEMENTED | 회원가입 4개, 로그인 4개, 상품 등록 4개 (각 Default/WithErrors/케이스별/Success) |
| FR-008 | 모든 폼 스토리는 인터랙션 테스트 포함 | ✅ IMPLEMENTED | `play` 함수: Default 제외 각 스토리별 `userEvent` + `expect` 검증 |
| SC-001 | 3개 폼 스토리 모두 오류 없이 Storybook에서 렌더링 | ✅ IMPLEMENTED | 12/12 스토리 통과 (run-story-tests) |
| SC-002 | 잘못된 입력 시 100% 오류 메시지 즉시 표시 | ✅ IMPLEMENTED | `mode: 'onSubmit'` + `reValidateMode: 'onChange'` — 제출 즉시 표시, play 함수 검증 |
| SC-003 | 모든 인터랙션 테스트 통과 | ✅ IMPLEMENTED | 12/12 스토리 인터랙션 테스트 통과 (MCP run-story-tests) |
| SC-004 | 각 폼 최소 3가지 상태(기본, 오류, 성공) 스토리 변형 | ✅ IMPLEMENTED | 각 폼 4개 스토리 변형 (spec 최소 기준 초과) |
| SC-005 | 오류 메시지가 규칙 위반 내용을 명확히 설명 | ✅ IMPLEMENTED | "이메일 형식", "최소 8자", "0 이상의 숫자" 등 |

**Spec Adherence**: (13 IMPLEMENTED + 0 MODIFIED + 0 PARTIAL × 0.5) / (13 - 0 UNSPECIFIED) = **100%**

---

## Success Criteria Assessment

| SC | 기준 | 결과 | 비고 |
|----|------|------|------|
| SC-001 | 3개 폼 모두 Storybook 렌더링 | ✅ PASS | 12/12 스토리 통과 |
| SC-002 | 잘못된 입력 시 즉시 오류 표시 | ✅ PASS | play 함수에서 `toBeInTheDocument` 검증 |
| SC-003 | run-story-tests 통과 | ✅ PASS | 12/12 인터랙션 테스트 통과 |
| SC-004 | 폼당 최소 3가지 스토리 변형 | ✅ PASS | 각 폼 4개 변형 (기준 초과) |
| SC-005 | 오류 메시지 규칙 명확성 | ✅ PASS | 한국어 구체 메시지 확인 |

---

## Architecture Drift

| 계획 항목 | 계획 | 구현 | 드리프트 |
|----------|------|------|---------|
| 스키마 파일 위치 | `packages/ui/src/stories/form-schemas.ts` | 동일 | 없음 |
| 스토리 파일 위치 | `packages/ui/src/stories/*.stories.tsx` | 동일 | 없음 |
| 가격 필드 타입 | `z.coerce.number()` | `string + refine + transform` | **SIGNIFICANT** (개선) |
| 의존성 | zod, react-hook-form, @hookform/resolvers | 동일 | 없음 |
| 컴포넌트 재사용 | Field/Input/Button/Card | Field/Input/Button/Card/Alert/Textarea | MINOR (추가, 긍정적) |
| 스토리 export 구조 | Default/WithErrors/케이스/Success | 동일 | 없음 |

---

## Significant Deviations

### DEV-001 — `productSchema` 가격 검증 방식 변경 [SIGNIFICANT / POSITIVE]

**계획**: `z.coerce.number()` 사용 (`data-model.md` 기술)  
**구현**: `z.string().min(1).refine(isNumber).transform(Number).refine(>=0)` 패턴 사용  
**근거**: `z.coerce.number()`는 빈 문자열을 `0`으로 변환하여 "가격을 입력해주세요" 오류가 발생하지 않는 엣지 케이스 발생. string 검증 → 숫자 변환 → 최솟값 검증 순서로 더 명확한 오류 메시지 분기 가능.  
**발견 시점**: 구현 단계  
**원인**: spec 설계 시 Zod 4 `coerce` 동작의 엣지 케이스 미고려  
**예방**: data-model.md에 빈 입력 처리 정책 명시 권고  
**타입 영향**: `ProductFormInput` (string price) / `ProductFormData` (number price) 이중 타입 export 필요 → 해결됨

### DEV-002 — `--destructive` 토큰 색상 WCAG AA 미달 [SIGNIFICANT]

**발견**: MCP `run-story-tests` a11y 검사에서 오류 메시지 텍스트의 명암비 3.58:1 (기준 4.5:1) 미달  
**영향 범위**: `Field` 컴포넌트 `error` prop을 사용하는 모든 UI (이 피처뿐 아니라 전체 앱)  
**원인**: `packages/tokens/src/css/base.css`의 `--destructive: 22 93% 47%` 값이 흰 배경(#ffffff) 대비 기준 미달  
**이 피처 책임**: 없음 — 스토리 코드가 아닌 기존 디자인 토큰 문제. `Field` 컴포넌트 `text-destructive` 클래스를 그대로 사용.  
**수정 방향**: `destructiveHsl['700']` (`22 87% 40%`, 약 5.2:1) 또는 더 어두운 값으로 `--destructive` 토큰 변경 필요  
**후속 조치**: 별도 피처(`@myorg/tokens` a11y 토큰 수정)로 추적 권고

---

## Innovations and Best Practices

### INN-001 — Storybook `fn()` + `toHaveBeenCalledWith` 계약 검증

**내용**: `Success` 스토리의 `args.onSubmit` mock에 `toHaveBeenCalledWith` 어설션 추가. 단순 렌더링 확인을 넘어 폼 제출 페이로드의 타입/값 정확성까지 검증.  
**개선점**: 스키마 transform 결과(price: number)가 올바르게 전달되는지 계약 수준에서 확인 가능.  
**재사용성**: 높음 — 다른 폼 스토리 패턴으로 채택 권장.  
**헌법 후보**: II. 테스트 표준 — "테스트는 품질의 증거" 원칙에 부합.

### INN-002 — `Alert` 컴포넌트로 접근성 있는 성공 피드백

**내용**: 성공 상태에 `<Alert aria-live="polite">` 사용. 스크린 리더가 제출 성공을 자동 고지.  
**개선점**: spec의 WCAG 2.1 AA 요구사항(헌법 III)을 능동적으로 충족.  
**재사용성**: 높음 — 다른 폼 스토리 기본 패턴으로 채택 권장.

### INN-003 — `ProductFormInput` / `ProductFormData` 이중 타입 패턴

**내용**: Zod transform 사용 시 input 타입(string price)과 output 타입(number price)을 모두 export.  
**개선점**: TypeScript 타입 안전성 유지, useForm 제네릭 파라미터 명시로 IDE 자동완성 정확도 향상.  
**재사용성**: 중간 — transform이 있는 스키마에만 적용.

---

## Constitution Compliance

| 원칙 | 상태 | 근거 |
|------|------|------|
| I. 코드 품질 — SRP | ✅ PASS | 각 폼 컴포넌트 독립, 스키마 파일 분리 |
| I. 코드 품질 — DRY | ✅ PASS | 기존 `Field`/`Input`/`Card` 재사용, 스키마 `form-schemas.ts` 공유 |
| I. 코드 품질 — 주석 | ✅ PASS | 불필요한 주석 없음 |
| II. 테스트 표준 — TDD | ✅ PASS | play 함수 정의 후 구현 순서 준수 |
| II. 테스트 표준 — No Mock DB | ✅ N/A | DB 없음 |
| III. UX 일관성 — 디자인 시스템 | ✅ PASS | shadcn/ui 기반 컴포넌트만 사용, 임의 스타일 오버라이드 없음 |
| III. UX 일관성 — WCAG 2.1 AA | ⚠️ PARTIAL | `aria-live`, `aria-label`, `aria-invalid` 적용됨. 단, `--destructive` 토큰 명암비 부족(3.58:1 < 4.5:1) — **토큰 레벨 기존 이슈, 이 피처 코드 범위 밖** |
| III. UX 일관성 — 200ms 피드백 | ✅ PASS | 제출 즉시 오류 메시지 표시 (서버 요청 없음) |
| IV. 성능 요구사항 | ✅ N/A | 순수 클라이언트 UI, API/DB 없음 |
| V. 단순성 — YAGNI | ✅ PASS | 스토리 전용 구현, 불필요한 추상화 없음 |
| V. 단순성 — 외부 의존성 | ✅ PASS | 사용자 명시 요청 의존성, MIT 라이선스 |

**헌법 위반**: 없음 (WCAG 명암비 이슈는 `@myorg/tokens` 레벨 기존 문제 — 이 피처 구현에서 새로 도입한 위반 아님)

---

## Unspecified Implementations

| 항목 | 설명 | 평가 |
|------|------|------|
| `noValidate` 속성 | `<form noValidate>` 추가로 브라우저 기본 유효성 UI 억제 | POSITIVE — Zod 오류 메시지 일관성 보장 |
| `reValidateMode: 'onChange'` | 오류 발생 후 실시간 재검증 | POSITIVE — spec의 "즉각적 피드백" 요구사항 자연 충족 |
| `isSubmitting` 버튼 비활성화 | 중복 제출 방지 | POSITIVE — edge case 명시적 처리 |
| `CardDescription` | 폼별 안내 문구 추가 | MINOR / POSITIVE — UX 개선 |
| `inputMode="decimal"` | 가격 필드 모바일 키패드 최적화 | MINOR / POSITIVE |

---

## Task Execution Analysis

| 태스크 | 상태 | 비고 |
|--------|------|------|
| T001 (의존성 설치) | ✅ | zod, react-hook-form, @hookform/resolvers 설치 |
| T002 (빌드 확인) | ✅ | |
| T003 (form-schemas.ts) | ✅ | data-model.md 기반, productSchema 패턴 변경 포함 |
| T004~T009 (회원가입 폼) | ✅ | Default/WithErrors/PasswordMismatch/Success + 린트 |
| T010~T015 (로그인 폼) | ✅ | Default/WithErrors/InvalidEmail/Success + 린트 |
| T016~T021 (상품 등록 폼) | ✅ | Default/WithErrors/NameTooLong/Success + 린트 |
| T022 (Storybook 렌더링) | ✅ | |
| T023 (run-story-tests) | ✅ | 12/12 통과, 접근성 위반(color-contrast) 별도 추적 |
| T024 (스키마 검토) | ✅ | productSchema 패턴 차이 확인 및 문서화 |

**추가된 태스크**: 없음  
**드롭된 태스크**: 없음  
**수정된 태스크**: T003 (productSchema 구현 방식 차이)

---

## Lessons Learned & Recommendations

### HIGH

1. **Zod transform 엣지 케이스 사전 검토**: `coerce` 사용 시 빈 문자열 처리 동작을 data-model.md에 명시. 특히 숫자 필드에서 "필수 입력" vs "형식 오류" 메시지 분기 정책 사전 결정 권장.
2. **`--destructive` 토큰 명암비 수정**: `packages/tokens/src/css/base.css`의 `--destructive` 값을 `22 87% 40%`(700) 이상 어두운 값으로 조정. 전체 앱 오류 메시지 WCAG 2 AA 준수에 필요. 별도 피처로 추적 권고.

### MEDIUM

3. **`fn()` + `toHaveBeenCalledWith` 패턴 표준화**: Success 스토리에서 제출 페이로드를 어설션하는 패턴을 팀 표준으로 채택. 다른 폼 스토리 작성 시 참조 권장.
4. **`aria-live="polite"` 성공 피드백 패턴**: Alert 컴포넌트를 성공/오류 상태 피드백에 일관되게 사용. 스타일 가이드에 문서화 권장.

### LOW

5. **CI에서 Storybook a11y 자동 검사**: `run-story-tests` a11y 결과를 CI 파이프라인에 포함하면 접근성 회귀를 조기에 발견 가능.

---

## File Traceability Appendix

| 파일 | 태스크 | spec.md 요구사항 |
|------|--------|----------------|
| `packages/ui/src/stories/form-schemas.ts` | T003 | FR-002, FR-003, FR-004 |
| `packages/ui/src/stories/sign-up-form.stories.tsx` | T004~T009 | FR-001, FR-002, FR-005, FR-006, FR-007, FR-008, SC-001~005 |
| `packages/ui/src/stories/login-form.stories.tsx` | T010~T015 | FR-001, FR-003, FR-005, FR-006, FR-007, FR-008, SC-001~005 |
| `packages/ui/src/stories/product-register-form.stories.tsx` | T016~T021 | FR-001, FR-004, FR-005, FR-006, FR-007, FR-008, SC-001~005 |
| `packages/ui/package.json` | T001 | 의존성 제약사항 (헌법 V) |

---

## Self-Assessment Checklist

| 항목 | 결과 |
|------|------|
| Evidence completeness | ✅ PASS — 모든 편차에 파일/태스크 증거 포함 (DEV-002: base.css 토큰 확인) |
| Coverage integrity | ✅ PASS — FR-001~008, SC-001~005 전체 커버 |
| Metrics sanity | ✅ PASS — 24/24 = 100%, 13/13 = 100%, 공식 적용 완료 |
| Severity consistency | ✅ PASS — DEV-001 SIGNIFICANT/POSITIVE, DEV-002 SIGNIFICANT 영향 수준에 일치 |
| Constitution review | ✅ PASS — WCAG 명암비 기존 토큰 이슈 명시, 이 피처 신규 위반 없음 |
| Human Gate readiness | ✅ PASS — 스펙 변경 권고 없음, 게이트 해당 없음 |
| Actionability | ✅ PASS — 권고사항 우선순위 및 구체적 조치(토큰 값, CI 설정) 포함 |
