import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  render: () => (
    <Carousel className="w-full max-w-xs" opts={{ loop: true }}>
      <CarouselContent>
        {['One', 'Two', 'Three'].map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-40 items-center justify-center rounded-lg border bg-muted text-lg font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('One')).toBeInTheDocument();
    const nextButton = canvas.getByRole('button', { name: 'Next slide' });
    await expect(nextButton).toBeInTheDocument();
    nextButton.click();
  },
};
