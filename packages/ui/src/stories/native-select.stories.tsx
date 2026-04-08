import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { NativeSelect } from '../components/native-select';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the select input.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the select as required.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    disabled: false,
    required: false,
  },
  render: (args) => (
    <NativeSelect defaultValue="one" aria-label="Plan" {...args}>
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
