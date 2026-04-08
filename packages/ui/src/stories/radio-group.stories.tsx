import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Label } from '../components/label';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';

function renderRadioGroupStory(
  orientation: 'horizontal' | 'vertical',
  disabled = false
) {
  return (
    <RadioGroup
      defaultValue="a"
      orientation={orientation}
      disabled={disabled}
      className={orientation === 'horizontal' ? 'flex gap-4' : undefined}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="a" />
        <Label htmlFor="a">A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="b" />
        <Label htmlFor="b">B</Label>
      </div>
    </RadioGroup>
  );
}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction for the radio group.',
      table: {
        defaultValue: {
          summary: 'vertical',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio options.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    orientation: 'vertical',
    disabled: false,
  },
  render: (args) => renderRadioGroupStory(args.orientation, args.disabled),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const item = canvas.getByLabelText('B');
    await userEvent.click(item);
    await expect(item).toBeChecked();
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    disabled: false,
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    disabled: false,
  },
};
