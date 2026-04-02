import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { AspectRatio } from '@/components/aspect-ratio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  render: () => (
    <div className="grid w-80 gap-4">
      <div className="overflow-hidden rounded-lg border">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full items-center justify-center bg-muted">
            16 / 9
          </div>
        </AspectRatio>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <AspectRatio ratio={1}>
          <div className="flex h-full items-center justify-center bg-muted">
            1 / 1
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('16 / 9')).toBeInTheDocument();
    await expect(canvas.getByText('1 / 1')).toBeInTheDocument();
    await expect(canvas.getAllByText(/ \/ /).length).toBe(2);
  },
};
