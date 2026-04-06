import { colors, semanticHsl, semanticHslDark } from '@myorg/tokens';
import type { Meta, StoryObj } from '@storybook/react';

import { PrimitiveColorGroup, SemanticColorTable } from './_helpers';

const meta = {
  title: 'Color/Overview',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimitiveColors: Story = {
  render: () => (
    <div className="grid gap-8">
      <PrimitiveColorGroup name="gray" palette={colors.gray} />
      <PrimitiveColorGroup name="brand" palette={colors.brand} />
      <PrimitiveColorGroup
        name="destructive"
        palette={colors.destructivePalette}
      />
    </div>
  ),
};

export const SemanticTokens: Story = {
  render: () => (
    <SemanticColorTable light={semanticHsl} dark={semanticHslDark} />
  ),
};
