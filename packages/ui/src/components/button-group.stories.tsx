import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '@/components/button';
import { ButtonGroup } from '@/components/button-group';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-4">
      <ButtonGroup>
        <Button>Primary</Button>
        <Button variant="outline">Secondary</Button>
        <Button disabled>Disabled</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" className="w-48">
        <Button>Top</Button>
        <Button variant="outline">Middle</Button>
        <Button disabled>Bottom</Button>
      </ButtonGroup>
    </div>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Primary')).toBeInTheDocument();
    await expect(canvas.getByText('Top')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Primary' }));
  },
};
