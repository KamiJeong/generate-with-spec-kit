import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Input } from '../components/input';
import { InputGroup } from '../components/input-group';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  render: () => (
    <InputGroup prefix="https://" suffix=".com">
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
