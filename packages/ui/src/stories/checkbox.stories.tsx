import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from '../components/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: {
      control: 'boolean',
      description: 'Initial checked state in uncontrolled mode.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables checkbox interaction.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
  render: (args) => <Checkbox aria-label="Accept" {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox');
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};
