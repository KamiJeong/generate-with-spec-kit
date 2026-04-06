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

function createAvatarDataUrl(
  initials: string,
  background: string,
  foreground: string
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="${initials}">
      <rect width="80" height="80" rx="40" fill="${background}" />
      <text x="40" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="${foreground}">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const taylorAvatar = createAvatarDataUrl('TA', '#f4f4f5', '#18181b');
const alexAvatar = createAvatarDataUrl('AX', '#e4e4e7', '#18181b');

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
  render: () => (
    <div className="grid gap-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={taylorAvatar} alt="Taylor" />
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
      <AvatarImage src={alexAvatar} alt="Alex" />
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
