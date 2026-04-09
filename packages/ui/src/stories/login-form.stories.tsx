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
import { type LoginFormData, loginSchema } from './form-schemas';

type LoginFormProps = {
  onSubmit?: (data: LoginFormData) => void;
};

function LoginForm({ onSubmit }: LoginFormProps) {
  const [submittedData, setSubmittedData] = useState<LoginFormData | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>
            등록된 이메일과 비밀번호로 로그인합니다.
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
                placeholder="비밀번호를 입력하세요"
                aria-label="비밀번호"
                {...register('password')}
              />
            </Field>
            {submittedData ? (
              <Alert aria-live="polite">
                <AlertTitle>로그인 요청이 확인되었습니다.</AlertTitle>
                <AlertDescription>
                  <p>{submittedData.email}</p>
                </AlertDescription>
              </Alert>
            ) : null}
            <CardFooter className="px-0">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                로그인
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: 'Forms/Login',
  component: LoginForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));

    await expect(canvas.getByText('이메일을 입력해주세요')).toBeInTheDocument();
    await expect(
      canvas.getByText('비밀번호를 입력해주세요')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const InvalidEmail: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('이메일'), 'invalid-email');
    await userEvent.type(canvas.getByLabelText('비밀번호'), 'password123');
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));

    await expect(
      canvas.getByText('올바른 이메일 형식을 입력해주세요')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const Success: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('이메일'), 'tester@example.com');
    await userEvent.type(canvas.getByLabelText('비밀번호'), 'password123');
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));

    await expect(
      canvas.getByText('로그인 요청이 확인되었습니다.')
    ).toBeInTheDocument();
    await expect(canvas.getByText('tester@example.com')).toBeInTheDocument();
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'tester@example.com',
      password: 'password123',
    });
  },
};
