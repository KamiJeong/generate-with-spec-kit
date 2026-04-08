import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { Progress } from './progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current progress value between 0 and max.',
      table: {
        defaultValue: {
          summary: '50',
        },
      },
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value used to calculate progress.',
      table: {
        defaultValue: {
          summary: '100',
        },
      },
    },
  },
  args: {
    'aria-label': 'File upload progress',
    value: 50,
    max: 100,
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbar = canvas.getByRole('progressbar');
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar.firstElementChild).not.toBeNull();
  },
};

export const Loading: Story = {
  args: {
    value: 35,
    max: 100,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    max: 100,
  },
};
