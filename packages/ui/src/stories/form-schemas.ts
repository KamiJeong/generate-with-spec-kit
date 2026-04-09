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

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

const productSchema = z.object({
  name: z
    .string()
    .min(1, '상품명을 입력해주세요')
    .max(100, '상품명은 최대 100자까지 입력 가능합니다'),
  price: z
    .string()
    .min(1, '가격을 입력해주세요')
    .refine(
      (value) => {
        return !Number.isNaN(Number(value));
      },
      {
        message: '올바른 가격 형식을 입력해주세요',
      }
    )
    .transform((value) => Number(value))
    .refine((value) => value >= 0, {
      message: '가격은 0 이상의 숫자여야 합니다',
    }),
  description: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type LoginFormData = z.infer<typeof loginSchema>;
type ProductFormInput = z.input<typeof productSchema>;
type ProductFormData = z.infer<typeof productSchema>;

export {
  type LoginFormData,
  loginSchema,
  type ProductFormData,
  type ProductFormInput,
  productSchema,
  type SignUpFormData,
  signUpSchema,
};
