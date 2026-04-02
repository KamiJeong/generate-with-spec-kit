import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Input } from '@/components/input';
import { Label } from '@/components/label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" aria-label="Email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="required-field">
          Required <span className="text-destructive">*</span>
        </Label>
        <Input id="required-field" aria-label="Required" />
      </div>
    </div>
  ),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Email')).toBeInTheDocument();
    await expect(canvas.getByText('Required')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Email')).toBeInTheDocument();
  },
};
