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

export const Secondary: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: 'ghost',
    children: 'Ghost',
    asChild: false,
  },
};

export const Link: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
    </div>
  ),
};
