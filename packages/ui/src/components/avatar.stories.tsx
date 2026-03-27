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
