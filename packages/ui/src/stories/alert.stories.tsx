import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Alert, AlertDescription, AlertTitle } from '../components/alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Alert variants inherit semantic token values through the shared theme variables, including the destructive state via `--color-destructive`.',
      },
    },
  },
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Descriptive alert copy.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('alert')).toBeInTheDocument();
    await expect(canvas.getByText('Heads up')).toBeInTheDocument();
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};
