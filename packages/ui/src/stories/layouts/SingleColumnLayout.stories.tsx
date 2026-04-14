import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../components/button';

const sections = [
  'Open with one readable promise and avoid competing columns.',
  'Let supporting paragraphs stack in a predictable rhythm.',
  'Place the action after the reader has enough context to continue.',
];

const Article = () => (
  <article className="max-w-2xl space-y-8">
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase text-primary">
        Single column
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        Keep the reading path direct from the first line to the final action.
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        Single column layouts are dependable for long-form content, mobile
        experiences, and message-first flows where branching would slow the
        reader down.
      </p>
    </div>

    {sections.map((section, index) => (
      <section key={section} className="space-y-3 border-t pt-6">
        <p className="text-sm font-medium text-muted-foreground">
          Section {index + 1}
        </p>
        <h2 className="text-2xl font-semibold">
          {index === 0
            ? 'Begin with the main point.'
            : index === 1
              ? 'Keep each block compact.'
              : 'End with one clear next step.'}
        </h2>
        <p className="leading-relaxed text-muted-foreground">{section}</p>
      </section>
    ))}

    <Button size="lg">Continue reading</Button>
  </article>
);

const SingleColumnPage = ({
  withSidebar = false,
}: {
  withSidebar?: boolean;
}) => (
  <div className="min-h-svh bg-background text-foreground">
    <main
      className={`mx-auto w-full px-4 py-14 sm:px-6 lg:py-20 ${
        withSidebar
          ? 'grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px] lg:items-start'
          : 'max-w-2xl'
      }`}
    >
      <Article />
      {withSidebar ? (
        <aside className="rounded-lg border bg-muted/40 p-5">
          <p className="text-sm font-semibold uppercase text-primary">
            Reading guide
          </p>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li>Overview</li>
            <li>Content rhythm</li>
            <li>Final action</li>
          </ul>
        </aside>
      ) : null}
    </main>
  </div>
);

const meta = {
  title: 'Page/Layouts/SingleColumn',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Single Column Layout

Presents content in one vertical path so readers can move through the page without competing regions.

**Quality characteristics:**
- ✅ Intuitive navigation
- ✅ Mobile-friendly structure

**Use cases:** Mobile apps, long-form articles, email newsletters
        `,
      },
    },
  },
  render: () => <SingleColumnPage />,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSidebar: Story = {
  render: () => <SingleColumnPage withSidebar />,
};
