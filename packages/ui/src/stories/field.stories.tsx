import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Field } from '../components/field';
import { Input } from '../components/input';

function renderFieldStory(args: {
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <Field
      label={args.label}
      error={args.error || undefined}
      required={args.required}
    >
      <Input aria-label={args.label} />
    </Field>
  );
}

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text.',
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the field.',
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    label: 'Email',
    error: '',
    required: false,
  },
  render: (args) =>
    renderFieldStory({
      label: args.label,
      error: args.error,
      required: args.required,
    }),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    label: 'Email',
    error: 'Required field',
    required: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await expect(canvas.getByText('Required field')).toBeInTheDocument();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
