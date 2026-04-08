import type { Meta, StoryObj } from '@storybook/react';
import { InboxIcon } from 'lucide-react';
import { expect, within } from 'storybook/test';

import { Empty } from '@/components/empty';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary empty-state title.',
      table: {
        defaultValue: {
          summary: 'No data',
        },
      },
    },
    description: {
      control: 'text',
      description: 'Optional supporting empty-state description.',
      table: {
        defaultValue: {
          summary: "''",
        },
      },
    },
  },
  render: () => (
    <div className="grid gap-4">
      <Empty title="No data" />
      <Empty
        icon={<InboxIcon className="size-5" />}
        title="No messages"
        description="Incoming items will appear here."
      />
    </div>
  ),
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('status')[0]).toBeInTheDocument();
    await expect(canvas.getByText('No data')).toBeInTheDocument();
    await expect(canvas.getByText('No messages')).toBeInTheDocument();
  },
};

export const Playground: Story = {
  render: (args) => <Empty {...args} />,
  args: {
    title: 'No data',
    description: '',
  },
};
