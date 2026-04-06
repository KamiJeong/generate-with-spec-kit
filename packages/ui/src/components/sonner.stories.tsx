import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import { toast } from 'sonner';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from './button';
import { Toaster } from './sonner';

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  render: () => (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Toaster />
      <Button
        variant="secondary"
        onClick={() => toast.success('Settings saved')}
      >
        Show toast
      </Button>
    </ThemeProvider>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Show toast' }));
    await expect(await canvas.findByText('Settings saved')).toBeInTheDocument();
  },
};
