import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Calendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  render: () => {
    const [selected, setSelected] = useState<Date | undefined>(
      new Date(2026, 2, 27)
    );

    return (
      <Calendar mode="single" selected={selected} onSelect={setSelected} />
    );
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextDay = canvas.getByRole('button', { name: /28/ });
    await expect(canvas.getByRole('grid')).toBeInTheDocument();
    await userEvent.click(nextDay);
    await expect(canvas.getByRole('button', { name: /28/ })).toHaveAttribute(
      'data-selected-single',
      'true'
    );
  },
};

export const Range: Story = {
  args: {
    mode: 'range',
    selected: { from: new Date(2026, 2, 24), to: new Date(2026, 2, 29) },
    numberOfMonths: 2,
  },
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getAllByRole('grid').length
    ).toBeGreaterThan(0);
  },
};
