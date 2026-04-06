import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Label } from '@/components/label';
import { Switch } from '@/components/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
    disabled: {
      control: 'boolean',
    },
  },
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
  args: {
    disabled: false,
    size: 'sm',
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="small" aria-label="Small switch" {...args} />
      <Label htmlFor="small">Small</Label>
    </div>
  ),
};

export const AllSizesAndStates: Story = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Switch aria-label="Default on" defaultChecked />
        <Label>Default (on)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch size="sm" aria-label="Small on" defaultChecked />
        <Label>Small (on)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled aria-label="Disabled" />
        <Label>Disabled</Label>
      </div>
    </div>
  ),
};
