import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { Textarea } from '../components/textarea';

const meta = {
  title: 'Pages/FormPage',
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <div className="mx-auto max-w-2xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>프로필 편집</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="이름" required>
            <Input placeholder="홍길동" />
          </Field>
          <Field label="이메일" required>
            <Input type="email" placeholder="name@example.com" />
          </Field>
          <Field label="소개">
            <Textarea placeholder="자기소개를 입력하세요" rows={4} />
          </Field>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>저장</Button>
          <Button variant="outline">취소</Button>
        </CardFooter>
      </Card>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithErrors: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl p-8">
      <Card>
        <CardHeader>
          <CardTitle>프로필 편집</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="이름" required error="이름을 입력해주세요.">
            <Input placeholder="홍길동" />
          </Field>
          <Field
            label="이메일"
            required
            error="이메일 형식이 올바르지 않습니다."
          >
            <Input
              type="email"
              placeholder="name@example.com"
              defaultValue="invalid-email"
            />
          </Field>
          <Field label="소개">
            <Textarea placeholder="자기소개를 입력하세요" rows={4} />
          </Field>
        </CardContent>
        <CardFooter className="gap-2">
          <Button>저장</Button>
          <Button variant="outline">취소</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

