import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Spinner } from '../components/spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Spinner size preset.',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
  args: {
    size: 'default',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => <Spinner {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Loading')).toBeInTheDocument();
  },
};

export const Small: Story = {
  render: (args) => <Spinner {...args} />,
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  render: (args) => <Spinner {...args} />,
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  ),
};
