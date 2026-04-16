import { fontFamily, fontWeight } from '@kamijeong/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { FontFamilySection, FontWeightSection } from './_helpers';

const fontSizes = [
  { name: 'xs', value: '0.75rem' },
  { name: 'sm', value: '0.875rem' },
  { name: 'base', value: '1rem' },
  { name: 'lg', value: '1.125rem' },
  { name: 'xl', value: '1.25rem' },
  { name: '2xl', value: '1.5rem' },
  { name: '3xl', value: '1.875rem' },
  { name: '4xl', value: '2.25rem' },
  { name: '5xl', value: '3rem' },
  { name: '6xl', value: '3.75rem' },
  { name: '7xl', value: '4.5rem' },
  { name: '8xl', value: '6rem' },
  { name: '9xl', value: '8rem' },
] as const;

const meta = {
  title: 'Typography/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamilies: Story = {
  render: () => <FontFamilySection families={fontFamily} />,
};

export const FontWeights: Story = {
  render: () => <FontWeightSection weights={fontWeight} />,
};

export const FontSizes: Story = {
  render: () => (
    <div className="grid gap-4">
      {fontSizes.map(({ name, value }) => (
        <section key={name} className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold">{name}</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {value}
            </span>
          </div>
          <p style={{ fontSize: value }} className="leading-tight">
            가나다라마바사 ABC 123
          </p>
        </section>
      ))}
    </div>
  ),
};
