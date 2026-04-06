import type { Meta, StoryObj } from '@storybook/react';

import { SpacingBar } from './_helpers';

const spacingScale = [
  { name: '0.5', value: '0.125rem', px: 2 },
  { name: '1', value: '0.25rem', px: 4 },
  { name: '2', value: '0.5rem', px: 8 },
  { name: '3', value: '0.75rem', px: 12 },
  { name: '4', value: '1rem', px: 16 },
  { name: '5', value: '1.25rem', px: 20 },
  { name: '6', value: '1.5rem', px: 24 },
  { name: '8', value: '2rem', px: 32 },
  { name: '10', value: '2.5rem', px: 40 },
  { name: '12', value: '3rem', px: 48 },
  { name: '16', value: '4rem', px: 64 },
  { name: '20', value: '5rem', px: 80 },
  { name: '24', value: '6rem', px: 96 },
  { name: '32', value: '8rem', px: 128 },
] as const;

const meta = {
  title: 'Spacing/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="grid gap-3">
      {spacingScale.map((entry) => (
        <SpacingBar key={entry.name} {...entry} />
      ))}
    </div>
  ),
};
