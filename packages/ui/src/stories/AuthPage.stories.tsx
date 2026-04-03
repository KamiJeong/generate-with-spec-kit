import type { Meta, StoryObj } from '@storybook/react';

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

const meta = {
  title: 'Pages/AuthPage',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>계정에 로그인하세요</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="이메일">
            <Input type="email" placeholder="name@example.com" />
          </Field>
          <Field label="비밀번호">
            <Input type="password" placeholder="••••••••" />
          </Field>
        </CardContent>
        <CardFooter>
          <Button className="w-full">로그인</Button>
        </CardFooter>
      </Card>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

