import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs';

function renderTabsStory(orientation: 'horizontal' | 'vertical') {
  return (
    <Tabs
      defaultValue="account"
      orientation={orientation}
      className={orientation === 'vertical' ? 'w-[32rem]' : 'w-80'}
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tabs list orientation.',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
  },
  render: () => renderTabsStory('horizontal'),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Password' }));
    await expect(canvas.getByText('Password content')).toBeInTheDocument();
  },
};

export const Playground: Story = {
  render: (args) => renderTabsStory(args.orientation ?? 'horizontal'),
  args: {
    orientation: 'horizontal',
  },
};

export const Line: Story = {
  render: (args) => (
    <Tabs
      defaultValue="account"
      orientation={args.orientation}
      className="w-80"
    >
      <TabsList variant="line">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  ),
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs
      defaultValue="account"
      orientation={args.orientation}
      className="w-[32rem]"
    >
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  ),
  args: {
    orientation: 'vertical',
  },
};

export const AllOrientations: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Tabs defaultValue="account" className="w-80">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Horizontal account content</TabsContent>
        <TabsContent value="password">Horizontal password content</TabsContent>
      </Tabs>
      <Tabs defaultValue="account" orientation="vertical" className="w-[32rem]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Vertical account content</TabsContent>
        <TabsContent value="password">Vertical password content</TabsContent>
      </Tabs>
    </div>
  ),
};
