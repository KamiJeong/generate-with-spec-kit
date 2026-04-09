# 데이터 모델: 폼 유효성 검사 스토리

**Branch**: `015-form-validation-stories`  
**Date**: 2026-04-09

## Zod 스키마 정의

### SignUpSchema (회원가입)

```ts
import { z } from 'zod';

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요')
      .email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;
// { email: string; password: string; confirmPassword: string }
```

### LoginSchema (로그인)

```ts
const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;
// { email: string; password: string }
```

### ProductSchema (상품 등록)

```ts
const productSchema = z.object({
  name: z
    .string()
    .min(1, '상품명을 입력해주세요')
    .max(100, '상품명은 최대 100자까지 입력 가능합니다'),
  price: z.coerce
    .number({ invalid_type_error: '올바른 가격 형식을 입력해주세요' })
    .min(0, '가격은 0 이상의 숫자여야 합니다'),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;
// { name: string; price: number; description?: string }
```

## 상태 전이

각 폼은 세 가지 상태를 가진다:

| 상태 | 설명 | 트리거 |
|------|------|--------|
| `idle` | 초기 상태, 오류 없음 | 폼 마운트 시 |
| `error` | 유효성 검사 실패 | 제출 시 / 필드 blur 후 |
| `success` | 제출 성공 | 유효한 데이터로 제출 |

## 스토리 변형 목록

| 스토리 파일 | Export | 설명 |
|-------------|--------|------|
| `sign-up-form.stories.tsx` | `Default` | 빈 폼 초기 상태 |
| | `WithErrors` | 모든 필드 오류 표시 (play 함수 포함) |
| | `Success` | 성공 메시지 표시 |
| `login-form.stories.tsx` | `Default` | 빈 폼 초기 상태 |
| | `WithErrors` | 오류 메시지 표시 (play 함수 포함) |
| | `Success` | 성공 메시지 표시 |
| `product-register-form.stories.tsx` | `Default` | 빈 폼 초기 상태 |
| | `WithErrors` | 패턴 오류 메시지 표시 (play 함수 포함) |
| | `Success` | 등록 성공 상태 |
