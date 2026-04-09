# Research: 폼 유효성 검사 스토리

**Branch**: `015-form-validation-stories`  
**Date**: 2026-04-09

## 결정 사항 (Decisions)

### 1. 폼 라이브러리: React Hook Form v7

- **결정**: `react-hook-form` v7 사용
- **근거**: 사용자가 명시적으로 요청. 비제어 컴포넌트 기반으로 리렌더링 최소화, Zod 통합 용이(`@hookform/resolvers` 사용)
- **검토한 대안**: Formik — 더 무겁고 제어 컴포넌트 기반이라 성능 불리

### 2. 스키마 유효성 검사: Zod v4

- **결정**: `zod` v4 사용 (`zod@^4.0.0`)
- **근거**: 사용자가 명시적으로 요청. v4는 v3 대비 번들 크기 감소, 성능 향상. `@hookform/resolvers` v5+에서 Zod v4 지원.
- **주의사항**: `@hookform/resolvers` v5+에서 `zodResolver`를 `@hookform/resolvers/zod`에서 import.
- **검토한 대안**: Yup — 더 오래됐고 TypeScript 추론이 Zod보다 약함

### 3. 기존 컴포넌트 활용

- **결정**: 기존 `Field`, `Input`, `Button`, `Card` 컴포넌트 활용. 별도 래퍼 컴포넌트 없이 React Hook Form의 `register`/`Controller` 직접 사용
- **근거**: `Field` 컴포넌트가 이미 `error` prop과 `aria-invalid` 처리를 포함하여 React Hook Form과 자연스럽게 통합됨. DRY 원칙 준수.
- **`Field` + `register` 통합 패턴**:
  ```tsx
  const { register, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
  
  <Field label="이메일" required error={errors.email?.message}>
    <Input type="email" {...register('email')} />
  </Field>
  ```

### 4. 스토리 배치 위치

- **결정**: `packages/ui/src/stories/` 디렉토리에 신규 파일 3개 생성
  - `stories/sign-up-form.stories.tsx`
  - `stories/login-form.stories.tsx`
  - `stories/product-register-form.stories.tsx`
- **근거**: 기존 `FormPage.stories.tsx`, `dialog.stories.tsx` 등이 `stories/` 디렉토리에 위치. 단순 스토리(컴포넌트 export 없음)는 `stories/`에, 재사용 컴포넌트는 `components/`에 위치하는 기존 규칙 준수.

### 5. 폼 컴포넌트 구조

- **결정**: 각 폼을 독립적인 React 컴포넌트로 작성 후 스토리 파일 내에 정의 (별도 컴포넌트 파일 없음)
- **근거**: 스토리 전용 구현이므로 `packages/ui/src/components/`에 export하지 않음. 스토리 파일 내 로컬 컴포넌트로 정의하여 캡슐화.

### 6. 인터랙션 테스트 전략

- **결정**: `@storybook/test`의 `userEvent`, `expect`, `within`을 사용하여 `play` 함수 작성
- **근거**: 프로젝트의 기존 스토리(`field.stories.tsx`)에서 동일 패턴 사용 확인. `@storybook/addon-vitest` 통합으로 실행.
- **테스트 시나리오**: 각 폼당 최소 2개 play 함수
  - `WithErrors`: 빈 폼 제출 시 오류 메시지 검증
  - `ValidSubmit`: 유효한 데이터 입력 및 제출 성공 검증

### 7. 신규 의존성

- `zod@^4.0.0` — MIT 라이선스, 활발한 유지보수
- `react-hook-form@^7.0.0` — MIT 라이선스, 활발한 유지보수
- `@hookform/resolvers@^5.0.0` — MIT 라이선스, Zod v4 지원
- **헌법 검토**: 외부 의존성 추가 시 라이선스/유지보수 검토 필요 → 모두 MIT, 활발히 유지보수됨. 승인.

## 해결된 불명확 사항

- **비밀번호 확인 유효성 검사**: Zod `.refine()` 또는 `superRefine()`으로 cross-field 검증
- **가격 필드 타입**: `z.coerce.number()` 사용하여 문자열 입력을 숫자로 변환 후 검증
- **제출 핸들러**: `onSubmit`에서 `console.log` 또는 `action()` (Storybook actions addon) 사용
