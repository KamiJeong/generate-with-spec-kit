import { motion } from '@myorg/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { MotionDemo } from './_helpers';

const durationEntries = [
  { name: 'fast', durationMs: motion.duration.fast * 1000, cssEasing: 'ease' },
  {
    name: 'normal',
    durationMs: motion.duration.normal * 1000,
    cssEasing: 'ease',
  },
  { name: 'slow', durationMs: motion.duration.slow * 1000, cssEasing: 'ease' },
] as const;

const easingEntries = [
  {
    name: 'ease',
    durationMs: 250,
    cssEasing: `cubic-bezier(${motion.easing.ease.join(', ')})`,
  },
  {
    name: 'easeIn',
    durationMs: 250,
    cssEasing: `cubic-bezier(${motion.easing.easeIn.join(', ')})`,
  },
  {
    name: 'easeOut',
    durationMs: 250,
    cssEasing: `cubic-bezier(${motion.easing.easeOut.join(', ')})`,
  },
  {
    name: 'spring',
    durationMs: 400,
    cssEasing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
] as const;

const meta = {
  title: 'Motion/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Duration: Story = {
  render: () => (
    <div className="grid gap-4">
      {durationEntries.map((entry) => (
        <MotionDemo key={entry.name} {...entry} />
      ))}
    </div>
  ),
};

export const Easing: Story = {
  render: () => (
    <div className="grid gap-4">
      {easingEntries.map((entry) => (
        <MotionDemo key={entry.name} {...entry} />
      ))}
    </div>
  ),
};
