import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DatePicker, DateRangePicker } from './date-picker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  render: () => {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="grid w-full max-w-md gap-4">
        <DatePicker value={date} onChange={setDate} />
        <DateRangePicker
          value={{ from: new Date(2026, 2, 24), to: new Date(2026, 2, 29) }}
        />
      </div>
    );
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: 'Pick a date' });
    await userEvent.click(trigger);
    const calendar = await body.findByRole('grid');
    await expect(calendar).toBeInTheDocument();

    const dayButton = calendar.querySelector<HTMLButtonElement>(
      'button[data-day]:not([disabled])'
    );

    if (!dayButton) {
      throw new Error('No selectable day button found in date picker calendar');
    }

    await userEvent.click(dayButton);
    await expect(
      canvas.queryByRole('button', { name: 'Pick a date' })
    ).not.toBeInTheDocument();
  },
};
