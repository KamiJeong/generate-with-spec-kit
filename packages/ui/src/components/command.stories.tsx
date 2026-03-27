import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[420px]">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            Calendar
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>
          <CommandItem value="search">
            Search
            <CommandShortcut>G S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">Profile</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Search commands...');
    await userEvent.type(input, 'cal');
    await expect(canvas.getByText('Calendar')).toBeInTheDocument();
  },
};
