# Tasks: 폼 유효성 검사 스토리

**Input**: Design documents from `/specs/015-form-validation-stories/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Organization**: 사용자 스토리별로 태스크를 그룹화하여 각 스토리를 독립적으로 구현/테스트 가능하게 한다.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[Story]**: 해당 사용자 스토리 (US1, US2, US3)
- 각 태스크에 정확한 파일 경로 포함

---

## Phase 1: Setup (의존성 설치)

**Purpose**: 신규 라이브러리 설치 및 기본 환경 준비

- [X] T001 `packages/ui/package.json`에 `zod@^4`, `react-hook-form`, `@hookform/resolvers` 추가 후 `pnpm --filter @myorg/ui install` 실행
- [X] T002 `pnpm --filter @myorg/ui build`로 빌드 통과 확인 (타입 에러 없음)

**Checkpoint**: 의존성 설치 완료 — 스토리 구현 시작 가능

---

## Phase 2: Foundational (공통 기반)

**Purpose**: 모든 스토리가 공유하는 Zod 스키마 정의

**⚠️ 주의**: 이 단계 완료 후 각 스토리 구현 시작

- [X] T003 `packages/ui/src/stories/form-schemas.ts` 파일 생성 — `signUpSchema`, `loginSchema`, `productSchema` 및 각 `FormData` 타입 export (data-model.md 스키마 정의 기반)

**Checkpoint**: 스키마 파일 준비 완료 — 각 스토리 병렬 구현 가능

---

## Phase 3: User Story 1 - 이메일 기반 회원가입 폼 (Priority: P1) 🎯 MVP

**Goal**: Zod v4 + React Hook Form으로 이메일/비밀번호/비밀번호 확인 유효성 검사가 동작하는 회원가입 폼 스토리 구현

**Independent Test**: Storybook에서 `Forms/SignUp` 스토리를 열고 빈 폼 제출 시 3개 필드 모두 오류 메시지 표시, `WithErrors` 스토리의 play 함수가 통과됨을 확인

### 구현 — User Story 1

- [X] T004 [US1] `packages/ui/src/stories/sign-up-form.stories.tsx` 생성 — meta 설정 (`title: 'Forms/SignUp'`, `tags: ['autodocs']`), `SignUpForm` 로컬 컴포넌트 정의 (`useForm` + `zodResolver(signUpSchema)` 사용, `Field`/`Input`/`Button`/`Card` 재사용)
- [X] T005 [US1] `sign-up-form.stories.tsx`에 `Default` 스토리 export — 빈 폼 초기 상태
- [X] T006 [US1] `sign-up-form.stories.tsx`에 `WithErrors` 스토리 export — `play` 함수 포함: `userEvent.click(submitButton)` 후 3개 오류 메시지(`이메일을 입력해주세요`, `비밀번호를 입력해주세요`, `비밀번호 확인을 입력해주세요`) `expect(...).toBeInTheDocument()` 검증
- [X] T007 [US1] `sign-up-form.stories.tsx`에 `PasswordMismatch` 스토리 export — `play` 함수 포함: 이메일/비밀번호 입력 후 다른 비밀번호 확인 입력 시 `비밀번호가 일치하지 않습니다` 오류 메시지 검증
- [X] T008 [US1] `sign-up-form.stories.tsx`에 `Success` 스토리 export — `play` 함수 포함: 유효한 전체 데이터 입력 후 제출 시 성공 메시지 표시 검증
- [X] T009 [US1] `pnpm --filter @myorg/ui lint` 실행하여 Biome 린트 통과 확인

**Checkpoint**: `Forms/SignUp` 스토리 전체 동작 — Storybook에서 독립 검증 가능

---

## Phase 4: User Story 2 - 로그인 폼 (Priority: P2)

**Goal**: 이메일 형식 및 필수 입력 유효성 검사가 동작하는 로그인 폼 스토리 구현

**Independent Test**: Storybook에서 `Forms/Login` 스토리를 열고 `WithErrors` play 함수가 통과됨을 확인

### 구현 — User Story 2

- [X] T010 [US2] `packages/ui/src/stories/login-form.stories.tsx` 생성 — meta 설정 (`title: 'Forms/Login'`, `tags: ['autodocs']`), `LoginForm` 로컬 컴포넌트 정의 (`useForm` + `zodResolver(loginSchema)` 사용, `Field`/`Input`/`Button`/`Card` 재사용)
- [X] T011 [US2] `login-form.stories.tsx`에 `Default` 스토리 export — 빈 폼 초기 상태
- [X] T012 [US2] `login-form.stories.tsx`에 `WithErrors` 스토리 export — `play` 함수 포함: 빈 폼 제출 시 이메일/비밀번호 필드 오류 메시지 검증
- [X] T013 [US2] `login-form.stories.tsx`에 `InvalidEmail` 스토리 export — `play` 함수 포함: 잘못된 이메일 형식 입력 후 `올바른 이메일 형식을 입력해주세요` 오류 메시지 검증
- [X] T014 [US2] `login-form.stories.tsx`에 `Success` 스토리 export — `play` 함수 포함: 유효한 이메일/비밀번호 입력 후 제출 시 성공 상태 검증
- [X] T015 [US2] `pnpm --filter @myorg/ui lint` 실행하여 Biome 린트 통과 확인

**Checkpoint**: `Forms/Login` 스토리 전체 동작 — Storybook에서 독립 검증 가능

---

## Phase 5: User Story 3 - 상품 등록 폼 (Priority: P3)

**Goal**: 상품명 필수/최대 길이, 가격 숫자/최솟값 패턴 유효성 검사가 동작하는 상품 등록 폼 스토리 구현

**Independent Test**: Storybook에서 `Forms/ProductRegister` 스토리를 열고 `WithErrors` play 함수가 통과됨을 확인 (특히 가격 패턴 오류 메시지)

### 구현 — User Story 3

- [X] T016 [US3] `packages/ui/src/stories/product-register-form.stories.tsx` 생성 — meta 설정 (`title: 'Forms/ProductRegister'`, `tags: ['autodocs']`), `ProductRegisterForm` 로컬 컴포넌트 정의 (`useForm` + `zodResolver(productSchema)` 사용, `Field`/`Input`/`Textarea`/`Button`/`Card` 재사용)
- [X] T017 [US3] `product-register-form.stories.tsx`에 `Default` 스토리 export — 빈 폼 초기 상태
- [X] T018 [US3] `product-register-form.stories.tsx`에 `WithErrors` 스토리 export — `play` 함수 포함: 빈 폼 제출 시 상품명 오류 메시지 검증, 음수 가격 입력 시 `가격은 0 이상의 숫자여야 합니다` 오류 메시지 검증
- [X] T019 [US3] `product-register-form.stories.tsx`에 `NameTooLong` 스토리 export — `play` 함수 포함: 101자 상품명 입력 후 `상품명은 최대 100자까지 입력 가능합니다` 오류 메시지 검증
- [X] T020 [US3] `product-register-form.stories.tsx`에 `Success` 스토리 export — `play` 함수 포함: 유효한 전체 데이터 입력 후 제출 시 성공 상태 및 입력 데이터 표시 검증
- [X] T021 [US3] `pnpm --filter @myorg/ui lint` 실행하여 Biome 린트 통과 확인

**Checkpoint**: `Forms/ProductRegister` 스토리 전체 동작 — 3개 폼 모두 Storybook에서 독립 검증 가능

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 전체 스토리 통합 검증 및 마무리

- [X] T022 [P] `pnpm --filter @myorg/ui storybook` 실행하여 3개 폼 스토리 모두 Storybook에서 렌더링 확인
- [x] T023 Storybook MCP `run-story-tests` 도구로 `Forms/SignUp`, `Forms/Login`, `Forms/ProductRegister` 전체 인터랙션 테스트 실행 및 통과 확인
- [X] T024 [P] `packages/ui/src/stories/form-schemas.ts`의 스키마 정의가 data-model.md와 일치하는지 검토

---

## Dependencies & Execution Order

### Phase 의존성

- **Setup (Phase 1)**: 즉시 시작 가능
- **Foundational (Phase 2)**: Phase 1 완료 필요 — 모든 스토리 구현을 블록
- **User Stories (Phase 3~5)**: Phase 2 완료 후 병렬 시작 가능 (단일 개발자는 P1 → P2 → P3 순서)
- **Polish (Phase 6)**: 원하는 스토리 구현 완료 후 시작

### User Story 의존성

- **US1 (P1)**: Phase 2 완료 후 시작 — 다른 스토리 의존 없음
- **US2 (P2)**: Phase 2 완료 후 시작 — 다른 스토리 의존 없음 (`loginSchema`는 독립)
- **US3 (P3)**: Phase 2 완료 후 시작 — 다른 스토리 의존 없음 (`productSchema`는 독립)

### 스토리 내 순서

- 스키마 파일(T003) → 스토리 파일 생성(T004/T010/T016) → Default 스토리 → WithErrors(play 함수) → 추가 케이스 스토리 → Success 스토리 → 린트

### Parallel Opportunities

- T003 완료 후 T004, T010, T016을 병렬 실행 가능 (서로 다른 파일)
- 각 스토리 내 play 함수 없는 스토리 export들은 병렬 작성 가능
- T009, T015, T021 린트 확인은 각 스토리 완료 후 독립 실행

---

## Parallel Example: 3개 스토리 병렬 구현 (T003 완료 후)

```bash
# 개발자 A
Task T004~T009: sign-up-form.stories.tsx 구현

# 개발자 B
Task T010~T015: login-form.stories.tsx 구현

# 개발자 C
Task T016~T021: product-register-form.stories.tsx 구현
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 완료: 의존성 설치
2. Phase 2 완료: `form-schemas.ts` 생성 (CRITICAL)
3. Phase 3 완료: 회원가입 폼 스토리
4. **STOP and VALIDATE**: Storybook에서 `Forms/SignUp` 검증
5. 필요 시 데모/리뷰

### Incremental Delivery

1. Setup + Foundational → 기반 준비
2. US1 (회원가입) → Storybook 검증 → MVP!
3. US2 (로그인) → Storybook 검증
4. US3 (상품 등록) → Storybook 검증
5. Phase 6 Polish → 전체 테스트 통과

---

## Notes

- [P] 태스크 = 다른 파일, 의존성 없음 → 병렬 실행 가능
- [Story] 레이블은 해당 태스크를 spec.md 사용자 스토리에 추적 연결
- 각 스토리 파일은 독립적으로 완성되고 테스트 가능
- `play` 함수는 `userEvent` + `expect` + `within` 패턴 사용 (field.stories.tsx 참고)
- 비밀번호 확인 cross-field 검증: Zod `.refine()` + `path: ['confirmPassword']`
- 가격 필드: `z.coerce.number()` 사용하여 문자열 → 숫자 변환 후 검증
- 린트는 `pnpm --filter @myorg/ui lint` (Biome v2.4.9)
