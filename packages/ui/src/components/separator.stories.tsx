import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Separator } from '@/components/separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-4">
      <div className="w-64 space-y-2">
        <div>Top</div>
        <Separator decorative={false} />
        <div>Bottom</div>
      </div>
      <div className="flex h-12 items-center gap-3">
        <span>Left</span>
        <Separator decorative={false} orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Top')).toBeInTheDocument();
    await expect(canvas.getByText('Right')).toBeInTheDocument();
    await expect(canvas.getAllByRole('separator').length).toBeGreaterThan(0);
  },
};
