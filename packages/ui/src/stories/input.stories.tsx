import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  render: () => <Input aria-label="Email" placeholder="Email" />,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};
