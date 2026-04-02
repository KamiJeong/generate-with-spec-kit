import type { Meta, StoryObj } from '@storybook/react';
import { UserIcon } from 'lucide-react';
import { expect, within } from 'storybook/test';

import { Item } from '@/components/item';

const meta = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  render: () => (
    <div className="grid w-80 gap-3">
      <Item label="Profile" shortcut="P" />
      <Item
        icon={<UserIcon className="size-4" />}
        label="Account"
        shortcut="A"
      />
    </div>
  ),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Profile')).toBeInTheDocument();
    await expect(canvas.getByText('Account')).toBeInTheDocument();
    await expect(canvas.getByText('P')).toBeInTheDocument();
  },
};
