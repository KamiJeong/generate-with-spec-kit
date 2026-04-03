import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from 'lucide-react';
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

export const Destructive: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Secondary: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Ghost: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  render: (args) => <Button {...args} />,
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon" aria-label="Icon default">
        <Plus />
      </Button>
      <Button size="icon-xs" aria-label="Icon extra small">
        <Plus />
      </Button>
      <Button size="icon-sm" aria-label="Icon small">
        <Plus />
      </Button>
      <Button size="icon-lg" aria-label="Icon large">
        <Plus />
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
