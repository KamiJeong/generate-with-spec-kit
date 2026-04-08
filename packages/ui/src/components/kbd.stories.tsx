import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Kbd } from '@/components/kbd';

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Keyboard shortcut text content.',
      table: {
        defaultValue: {
          summary: 'K',
        },
      },
    },
  },
  render: () => (
    <div className="flex gap-3">
      <Kbd>K</Kbd>
      <Kbd>Shift + K</Kbd>
    </div>
  ),
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText(/K/)[0].tagName).toBe('KBD');
    await expect(canvas.getByText('K')).toBeInTheDocument();
    await expect(canvas.getByText('Shift + K')).toBeInTheDocument();
  },
};

export const Playground: Story = {
  render: (args) => <Kbd>{args.children}</Kbd>,
  args: {
    children: 'K',
  },
};
