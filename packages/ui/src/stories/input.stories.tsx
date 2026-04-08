import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
      description: 'HTML input type attribute.',
      table: {
        defaultValue: {
          summary: 'text',
        },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Hint text shown when the input is empty.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables text entry.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    type: 'text',
    placeholder: 'Email',
    disabled: false,
  },
  render: (args) => <Input aria-label="Email" {...args} />,
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
