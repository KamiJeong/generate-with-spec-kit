import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { expect, fn, userEvent } from 'storybook/test';

import { Alert, AlertDescription, AlertTitle } from '../components/alert';
import { Button } from '../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/card';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { type SignUpFormData, signUpSchema } from './form-schemas';

type SignUpFormProps = {
  onSubmit?: (data: SignUpFormData) => void;
};

function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [submittedData, setSubmittedData] = useState<SignUpFormData | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <Card>
        <CardHeader>
          <CardTitle>이메일 회원가입</CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력해 계정을 생성합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            noValidate
            onSubmit={handleSubmit(
              (data) => {
                setSubmittedData(data);
                onSubmit?.(data);
              },
              () => {
                setSubmittedData(null);
              }
            )}
          >
            <Field label="이메일" required error={errors.email?.message}>
              <Input
                type="email"
                placeholder="name@example.com"
                aria-label="이메일"
                {...register('email')}
              />
            </Field>
            <Field label="비밀번호" required error={errors.password?.message}>
              <Input
                type="password"
                placeholder="8자 이상 입력"
                aria-label="비밀번호"
                {...register('password')}
              />
            </Field>
            <Field
              label="비밀번호 확인"
              required
              error={errors.confirmPassword?.message}
            >
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력"
                aria-label="비밀번호 확인"
                {...register('confirmPassword')}
              />
            </Field>
            {submittedData ? (
              <Alert aria-live="polite">
                <AlertTitle>회원가입 요청이 접수되었습니다.</AlertTitle>
                <AlertDescription>
                  <p>{submittedData.email}</p>
                </AlertDescription>
              </Alert>
            ) : null}
            <CardFooter className="px-0">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                회원가입
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: 'Forms/SignUp',
  component: SignUpForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '회원가입' }));

    await expect(canvas.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    await expect(
      canvas.getByText('비밀번호를 입력해주세요')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('비밀번호 확인을 입력해주세요')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const PasswordMismatch: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('이메일'), 'tester@example.com');
    await userEvent.type(canvas.getByLabelText('비밀번호'), 'password123');
    await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'password999');
    await userEvent.click(canvas.getByRole('button', { name: '회원가입' }));

    await expect(
      canvas.getByText('비밀번호가 일치하지 않습니다')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const Success: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('이메일'), 'tester@example.com');
    await userEvent.type(canvas.getByLabelText('비밀번호'), 'password123');
    await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'password123');
    await userEvent.click(canvas.getByRole('button', { name: '회원가입' }));

    await expect(
      canvas.getByText('회원가입 요청이 접수되었습니다.')
    ).toBeInTheDocument();
    await expect(canvas.getByText('tester@example.com')).toBeInTheDocument();
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith({
      confirmPassword: 'password123',
      email: 'tester@example.com',
      password: 'password123',
    });
  },
};
