import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Badge } from '@/components/badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story:
          'Badge variants are rendered from semantic token variables including `--color-primary`, `--color-secondary`, and `--color-destructive`.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Default')).toBeInTheDocument();
    await expect(canvas.getByText('Secondary')).toBeInTheDocument();
  },
};
