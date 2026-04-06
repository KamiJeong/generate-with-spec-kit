import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon } from 'lucide-react';
import { expect, within } from 'storybook/test';

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="Taylor" />
          <AvatarFallback>TA</AvatarFallback>
          <AvatarBadge>
            <CheckIcon />
          </AvatarBadge>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>BO</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('TA')).toBeInTheDocument();
    await expect(canvas.getByText('JD')).toBeInTheDocument();
  },
};

export const Small: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    size: 'sm',
    children: <AvatarFallback>SM</AvatarFallback>,
  },
};

export const Large: Story = {
  render: (args) => <Avatar {...args} />,
  args: {
    size: 'lg',
    children: <AvatarFallback>LG</AvatarFallback>,
  },
};

export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Alex" />
      <AvatarFallback>AX</AvatarFallback>
      <AvatarBadge>
        <CheckIcon />
      </AvatarBadge>
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar size="sm">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>BO</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>CY</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  ),
};
