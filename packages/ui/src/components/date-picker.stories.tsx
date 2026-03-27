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
    await expect(await body.findByRole('grid')).toBeInTheDocument();
    await userEvent.click(body.getAllByRole('button', { name: /27/ })[0]);
    await expect(
      canvas.getByRole('button', { name: /March 27.*2026/i })
    ).toBeInTheDocument();
  },
};
