import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-sm font-medium underline underline-offset-4">
          Hover profile
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        Detailed collaborator summary.
      </HoverCardContent>
    </HoverCard>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.hover(
      canvas.getByRole('button', { name: 'Hover profile' })
    );
    await expect(
      await body.findByText('Detailed collaborator summary.')
    ).toBeInTheDocument();
  },
};
