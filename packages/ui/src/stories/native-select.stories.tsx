import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { NativeSelect } from '../components/native-select';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  render: () => (
    <NativeSelect defaultValue="one" aria-label="Plan">
      <option value="one">One</option>
      <option value="two">Two</option>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole('combobox');
    await userEvent.selectOptions(select, 'two');
    await expect(select).toHaveValue('two');
  },
};
