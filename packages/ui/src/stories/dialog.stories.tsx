import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/dialog';
import { Field } from '../components/field';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog content</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await expect(await body.findByRole('dialog')).toBeInTheDocument();
    await expect(await body.findByText('Dialog title')).toBeInTheDocument();
    await expect(body.getByRole('button', { name: 'Close' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByText('Dialog title')).not.toBeInTheDocument();
  },
};

export const DialogFormComposition: Story = {
  name: 'Dialog + Form',
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>Provide the required details.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Email" error="Email is required">
            <Input aria-label="Email address" placeholder="name@example.com" />
          </Field>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: 'Create user' }));
    await expect(
      await body.findByText('Email is required')
    ).toBeInTheDocument();
    await expect(
      body.getByRole('button', { name: 'Save' })
    ).toBeInTheDocument();
  },
};
