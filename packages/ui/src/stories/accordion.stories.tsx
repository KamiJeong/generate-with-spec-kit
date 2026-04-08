import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';

function renderAccordionStory(type: 'single' | 'multiple', collapsible = true) {
  if (type === 'multiple') {
    return (
      <Accordion type="multiple" defaultValue={['item-1']} className="w-80">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Accordion content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>More content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible={collapsible} className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section</AccordionTrigger>
        <AccordionContent>Accordion content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether one or many items can be open at once.',
      table: {
        defaultValue: {
          summary: 'single',
        },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Allows closing the open item in single mode.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => renderAccordionStory(args.type, args.collapsible),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Section'));
    await expect(canvas.getByText('Accordion content')).toBeInTheDocument();
  },
};

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
};

export const Multiple: Story = {
  args: {
    type: 'multiple',
    collapsible: false,
  },
};
