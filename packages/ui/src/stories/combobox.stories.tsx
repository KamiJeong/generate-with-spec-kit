import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Combobox } from '../components/combobox';
import { Field } from '../components/field';

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  render: () => {
    const [value, setValue] = useState<string>();

    return (
      <Combobox
        aria-label="Select fruit"
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ]}
        placeholder="Select fruit"
        value={value}
        onValueChange={setValue}
      />
    );
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(await body.findByText('Apple')).toBeInTheDocument();
    await userEvent.click(body.getByText('Banana'));
    await expect(canvas.getByRole('combobox')).toHaveTextContent(/Banana/);
  },
};

export const ComboboxFieldComposition: Story = {
  name: 'Combobox + Field',
  render: () => (
    <Field label="Fruit" error="Choose an option">
      <Combobox
        aria-label="Fruit selector"
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ]}
        value="apple"
      />
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Choose an option')).toBeInTheDocument();
    await expect(canvas.getByRole('combobox')).toHaveTextContent('Apple');
  },
};
