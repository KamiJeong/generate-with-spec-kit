import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../components/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story:
          'Default and destructive variants resolve through token-backed theme variables such as `--color-primary` and `--color-destructive`.',
      },
    },
  },
  render: () => (
    <div className="flex gap-3">
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Button' });
    const disabledButton = canvas.getByRole('button', { name: 'Disabled' });
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
    await expect(disabledButton).toBeDisabled();
  },
};
