import type { Meta, StoryObj } from '@storybook/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';

const cards = [
  ['Launch checklist', 'Track readiness across copy, visuals, and handoff.'],
  ['Product update', 'Summarize what changed and who should adopt it.'],
  ['Research note', 'Capture supporting evidence for the layout decision.'],
  ['Team profile', 'Introduce ownership and collaboration context.'],
  ['Feature card', 'Present a reusable unit for comparison-heavy pages.'],
  ['Case study', 'Show outcomes with enough detail to support a click.'],
];

const CardsPage = ({ masonry = false }: { masonry?: boolean }) => (
  <div className="min-h-svh bg-background text-foreground">
    <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <section className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase text-primary">Cards</p>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Group repeatable content into self-contained surfaces.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Card layouts are useful when each item needs a title, supporting
          detail, and a visual cue while staying easy to compare.
        </p>
      </section>

      <section
        className={
          masonry
            ? 'mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3'
            : 'mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {cards.map(([title, description], index) => (
          <Card
            key={title}
            className={
              masonry ? 'mb-4 break-inside-avoid border-border/70' : ''
            }
          >
            <CardHeader>
              <div
                role="img"
                aria-label={`${title} card thumbnail placeholder`}
                className={`rounded-lg bg-accent ${
                  masonry && index % 2 === 0 ? 'h-40' : 'h-28'
                }`}
              />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Use consistent spacing and aligned actions so the repeated
                structure remains predictable at every viewport.
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/Cards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Cards Layout

Uses reusable card components to present repeated content with consistent hierarchy and spacing.

**Quality characteristics:**
- ✅ Consistent alignment
- ✅ Balanced use of space

**Use cases:** Product lists, blog feeds, team introductions
        `,
      },
    },
  },
  render: () => <CardsPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MasonryStyle: Story = {
  render: () => <CardsPage masonry />,
};
