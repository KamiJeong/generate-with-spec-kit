import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Button } from './button';
import { Direction } from './direction';

const meta = {
  title: 'Components/Direction',
  component: Direction,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-4">
      <Direction dir="ltr">
        <div className="flex items-center justify-between rounded-md border p-4">
          <span>Left to right</span>
          <Button size="sm">Action</Button>
        </div>
      </Direction>
      <Direction dir="rtl">
        <div className="flex items-center justify-between rounded-md border p-4">
          <span>Right to left</span>
          <Button size="sm">Action</Button>
        </div>
      </Direction>
    </div>
  ),
} satisfies Meta<typeof Direction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByText('Right to left').closest('[dir="rtl"]')
    ).not.toBeNull();
  },
};
