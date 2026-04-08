import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Separator } from '@/components/separator';

function renderSeparatorStory(
  orientation: 'horizontal' | 'vertical',
  decorative = false
) {
  if (orientation === 'vertical') {
    return (
      <div className="flex h-12 items-center gap-3">
        <span>Left</span>
        <Separator decorative={decorative} orientation="vertical" />
        <span>Right</span>
      </div>
    );
  }

  return (
    <div className="w-64 space-y-2">
      <div>Top</div>
      <Separator decorative={decorative} orientation="horizontal" />
      <div>Bottom</div>
    </div>
  );
}

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the separator line.',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Marks the separator as decorative only.',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
  render: (args) => renderSeparatorStory(args.orientation, args.decorative),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Top')).toBeInTheDocument();
    await expect(canvas.getAllByRole('separator').length).toBeGreaterThan(0);
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    decorative: false,
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    decorative: false,
  },
};
