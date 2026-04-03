import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Label } from '@/components/label';
import { Switch } from '@/components/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Switch id="notifications" aria-label="Notifications" />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled" aria-label="Disabled notifications" disabled />
        <Label htmlFor="disabled">Disabled</Label>
      </div>
    </div>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchElement = canvas.getByRole('switch', {
      name: 'Notifications',
    });
    await userEvent.click(switchElement);
    await expect(switchElement).toHaveAttribute('data-state', 'checked');
  },
};

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="small" size="sm" aria-label="Small switch" />
      <Label htmlFor="small">Small</Label>
    </div>
  ),
};
