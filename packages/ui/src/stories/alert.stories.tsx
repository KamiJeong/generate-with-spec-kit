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
      description: 'Semantic alert style variant.',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
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

export const Playground: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Descriptive alert copy.</AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
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

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-4">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>Default alert.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Destructive alert.</AlertDescription>
      </Alert>
    </div>
  ),
};
