import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Input } from '../components/input';
import { InputGroup } from '../components/input-group';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    prefix: {
      control: 'text',
      description: 'Text shown before the input value. String values only.',
      table: {
        defaultValue: {
          summary: 'https://',
        },
      },
    },
    suffix: {
      control: 'text',
      description: 'Text shown after the input value. String values only.',
      table: {
        defaultValue: {
          summary: '.com',
        },
      },
    },
  },
  args: {
    prefix: 'https://',
    suffix: '.com',
  },
  render: (args) => (
    <InputGroup {...args}>
      <Input aria-label="Website" defaultValue="acme" />
    </InputGroup>
  ),
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByDisplayValue('acme')
    ).toBeInTheDocument();
  },
};
