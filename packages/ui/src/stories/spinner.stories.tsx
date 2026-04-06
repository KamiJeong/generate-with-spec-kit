import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Spinner } from '../components/spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => <Spinner />,
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
