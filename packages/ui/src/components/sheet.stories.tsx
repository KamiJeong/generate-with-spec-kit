import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from './button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: 'right',
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side={args.side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Open sheet' }));
    await expect(await body.findByText('Edit profile')).toBeInTheDocument();
  },
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your personal details.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
