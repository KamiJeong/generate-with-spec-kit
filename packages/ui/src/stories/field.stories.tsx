import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Field } from '../components/field';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  render: () => (
    <Field label="Email" error="Required field">
      <Input aria-label="Email" />
    </Field>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await expect(canvas.getByText('Required field')).toBeInTheDocument();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
