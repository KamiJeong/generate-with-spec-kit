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
import { Textarea } from '../components/textarea';
import {
  type ProductFormData,
  type ProductFormInput,
  productSchema,
} from './form-schemas';

type ProductRegisterFormProps = {
  onSubmit?: (data: ProductFormData) => void;
};

function ProductRegisterForm({ onSubmit }: ProductRegisterFormProps) {
  const [submittedData, setSubmittedData] = useState<ProductFormData | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, undefined, ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
  });

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <Card>
        <CardHeader>
          <CardTitle>상품 등록</CardTitle>
          <CardDescription>
            상품명, 가격, 설명을 입력해 상품 정보를 등록합니다.
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
            <Field label="상품명" required error={errors.name?.message}>
              <Input
                placeholder="스펙 키트 머그"
                aria-label="상품명"
                {...register('name')}
              />
            </Field>
            <Field label="가격" required error={errors.price?.message}>
              <Input
                inputMode="decimal"
                placeholder="12500"
                aria-label="가격"
                {...register('price')}
              />
            </Field>
            <Field label="설명" error={errors.description?.message}>
              <Textarea
                rows={4}
                placeholder="상품 설명을 입력하세요"
                aria-label="설명"
                {...register('description')}
              />
            </Field>
            {submittedData ? (
              <Alert aria-live="polite">
                <AlertTitle>상품이 등록되었습니다.</AlertTitle>
                <AlertDescription>
                  <p>상품명: {submittedData.name}</p>
                  <p>가격: {submittedData.price}</p>
                  <p>설명: {submittedData.description || '설명 없음'}</p>
                </AlertDescription>
              </Alert>
            ) : null}
            <CardFooter className="px-0">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                상품 등록
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const meta = {
  title: 'Forms/ProductRegister',
  component: ProductRegisterForm,
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof ProductRegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('가격'), '-100');
    await userEvent.click(canvas.getByRole('button', { name: '상품 등록' }));

    await expect(canvas.getByText('상품명을 입력해주세요')).toBeInTheDocument();
    await expect(
      canvas.getByText('가격은 0 이상의 숫자여야 합니다')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const NameTooLong: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('상품명'), 'a'.repeat(101));
    await userEvent.type(canvas.getByLabelText('가격'), '12500');
    await userEvent.click(canvas.getByRole('button', { name: '상품 등록' }));

    await expect(
      canvas.getByText('상품명은 최대 100자까지 입력 가능합니다')
    ).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const Success: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByLabelText('상품명'), '스펙 키트 머그');
    await userEvent.type(canvas.getByLabelText('가격'), '12500');
    await userEvent.type(
      canvas.getByLabelText('설명'),
      '문서 작업에 적합한 머그컵입니다.'
    );
    await userEvent.click(canvas.getByRole('button', { name: '상품 등록' }));

    await expect(
      canvas.getByText('상품이 등록되었습니다.')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('상품명: 스펙 키트 머그')
    ).toBeInTheDocument();
    await expect(canvas.getByText('가격: 12500')).toBeInTheDocument();
    await expect(
      canvas.getByText('설명: 문서 작업에 적합한 머그컵입니다.')
    ).toBeInTheDocument();
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith({
      description: '문서 작업에 적합한 머그컵입니다.',
      name: '스펙 키트 머그',
      price: 12500,
    });
  },
};
