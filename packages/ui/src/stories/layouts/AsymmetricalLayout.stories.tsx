import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const ImageBlock = ({
  className = '',
  label,
}: {
  className?: string;
  label: string;
}) => (
  <div
    role="img"
    aria-label={label}
    className={`rounded-lg border border-border bg-primary/10 ${className}`}
  />
);

const AsymmetricalPage = ({ imageLeft = false }: { imageLeft?: boolean }) => (
  <div className="min-h-svh bg-background text-foreground">
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
        {imageLeft ? (
          <ImageBlock
            label="Large image placeholder on the left side of the asymmetrical layout"
            className="aspect-[4/3] lg:col-span-3"
          />
        ) : null}

        <section className={imageLeft ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase text-primary">
              Asymmetrical
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Use uneven columns to create editorial tension.
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground">
                Asymmetrical layouts break strict symmetry while preserving
                alignment, making them useful for creative brands and curated
                feature stories.
              </p>
            </div>
            <Button size="lg">Explore the composition</Button>
          </div>
        </section>

        {imageLeft ? null : (
          <ImageBlock
            label="Tall image placeholder on the right side of the asymmetrical layout"
            className="aspect-[3/4] lg:col-span-2"
          />
        )}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {['Offset headline', 'Weighted image', 'Breathing room'].map((item) => (
          <div key={item} className="rounded-lg border bg-muted/40 p-5">
            <p className="text-lg font-semibold">{item}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The grid stays responsive while each block keeps a deliberate
              visual role.
            </p>
          </div>
        ))}
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/Asymmetrical',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Asymmetrical Layout

Uses uneven columns and offset content to create movement while preserving a readable grid.

**Quality characteristics:**
- ✅ Clear visual hierarchy
- ✅ Adaptive layout styles

**Use cases:** Creative agencies, fashion brands
        `,
      },
    },
  },
  render: () => <AsymmetricalPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ImageLeft: Story = {
  render: () => <AsymmetricalPage imageLeft />,
};
