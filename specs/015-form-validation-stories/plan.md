# Implementation Plan: 폼 유효성 검사 스토리

**Branch**: `015-form-validation-stories` | **Date**: 2026-04-09 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/015-form-validation-stories/spec.md`

## Summary

Zod v4 + React Hook Form v7 기반의 폼 유효성 검사 Storybook 스토리 3종(회원가입, 로그인, 상품 등록)을 구현한다. 기존 `Field`, `Input`, `Button`, `Card` 컴포넌트를 재사용하며, 각 폼은 Default / WithErrors / Success 3가지 스토리 변형과 인터랙션 테스트(`play` 함수)를 포함한다.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+  
**Primary Dependencies**: `zod@^4.0.0`, `react-hook-form@^7.0.0`, `@hookform/resolvers@^5.0.0` (신규 설치 필요)  
**Storage**: N/A (클라이언트 전용 폼 스토리)  
**Testing**: `@storybook/addon-vitest`, `@storybook/test` (userEvent, expect, within)  
**Target Platform**: Storybook 10.3.4 (`@storybook/react-vite`)  
**Project Type**: UI 컴포넌트 라이브러리 (`packages/ui`)  
**Performance Goals**: N/A (스토리 구현, 런타임 성능 기준 해당 없음)  
**Constraints**: 기존 디자인 시스템 컴포넌트(`Field`, `Input`, `Button`, `Card`) 재사용 필수. 별도 컴포넌트 export 없음.  
**Scale/Scope**: 스토리 파일 3개, 스토리 변형 9개, play 함수 6개 이상

## Constitution Check

*GATE: Phase 0 리서치 전 통과 필수. Phase 1 설계 후 재검토.*

| 원칙 | 상태 | 근거 |
|------|------|------|
| I. 코드 품질 — SRP | ✅ PASS | 각 폼 컴포넌트는 스토리 파일 내에 독립적으로 정의 |
| I. 코드 품질 — DRY | ✅ PASS | 기존 `Field`/`Input` 재사용. 스키마 정의 공유하지 않음(각 폼 독립) |
| II. 테스트 표준 — TDD | ✅ PASS | 스토리 + play 함수로 인터랙션 테스트 정의 후 구현 |
| II. 테스트 표준 — No Mock DB | ✅ PASS | 데이터베이스 없음, mock 핸들러는 허용 범위 |
| III. UX 일관성 — 디자인 시스템 | ✅ PASS | shadcn/ui 기반 기존 컴포넌트 사용, 임의 스타일 오버라이드 없음 |
| III. UX 일관성 — WCAG 2.1 AA | ✅ PASS | `Field` 컴포넌트가 `aria-invalid`, `aria-describedby` 처리 |
| IV. 성능 요구사항 | ✅ N/A | 순수 UI 스토리, API/DB 없음 |
| V. 단순성 — YAGNI | ✅ PASS | 스토리 전용 구현, 불필요한 추상화 없음 |
| V. 단순성 — 외부 의존성 | ✅ PASS | zod, react-hook-form, @hookform/resolvers — 사용자 명시 요청, MIT 라이선스, 활발히 유지보수 |

**게이트 결과**: 모두 통과 → Phase 1 진행 가능

## Project Structure

### Documentation (this feature)

```text
specs/015-form-validation-stories/
├── plan.md              # 이 파일
├── research.md          # Phase 0 완료
├── data-model.md        # Phase 1 완료
└── tasks.md             # Phase 2 (/speckit.tasks 명령)
```

### Source Code

```text
packages/ui/
├── package.json                        # zod, react-hook-form, @hookform/resolvers 추가
└── src/
    └── stories/
        ├── sign-up-form.stories.tsx    # 신규: 회원가입 폼 스토리
        ├── login-form.stories.tsx      # 신규: 로그인 폼 스토리
        └── product-register-form.stories.tsx  # 신규: 상품 등록 폼 스토리
```

**Structure Decision**: `packages/ui/src/stories/` 디렉토리에 신규 스토리 파일 3개 추가. 재사용 컴포넌트가 아닌 스토리 전용 구현이므로 `components/`에는 추가하지 않음.

## Complexity Tracking

> 헌법 위반 없음 — 이 섹션은 해당 없음

## Phase 0: 리서치 결과

→ [research.md](./research.md) 참조

**핵심 결정**:
- Zod v4 + React Hook Form v7 + `@hookform/resolvers` v5
- `Field` + `register` 직접 통합 (별도 래퍼 없음)
- 스토리 파일 내 로컬 컴포넌트 정의 (export 없음)
- `play` 함수로 인터랙션 테스트 작성

## Phase 1: 설계 산출물

→ [data-model.md](./data-model.md) 참조

### 스키마 요약

| 스키마 | 필드 | 주요 유효성 규칙 |
|--------|------|-----------------|
| `signUpSchema` | email, password, confirmPassword | 이메일 형식, 최소 8자, 비밀번호 일치 확인 |
| `loginSchema` | email, password | 이메일 형식, 필수 입력 |
| `productSchema` | name, price, description? | 필수/최대100자, 숫자/최솟값0, 선택 |

### 인터페이스 계약

이 기능은 Storybook 스토리(UI 데모)이므로 외부 API 계약 없음. 스토리 계약:
- 각 폼 파일은 `Default`, `WithErrors`, `Success` 3개의 named export를 가진다.
- `WithErrors` 스토리는 반드시 `play` 함수를 포함한다.
- 폼 제출 핸들러는 Storybook `fn()`(mock)을 사용한다.

### 의존성 설치 계획

```bash
pnpm --filter @myorg/ui add zod@^4 react-hook-form @hookform/resolvers
```
