import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Crown,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/accordion';
import { Badge } from '../../components/badge';
import { Button } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';
import { Item } from '../../components/item';
import { Kbd } from '../../components/kbd';
import { Separator } from '../../components/separator';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For solo builders validating a layout system.',
    cta: 'Start free',
    variant: 'outline' as const,
    features: [
      '1 workspace for story experiments',
      '4 core page layout references',
      'Community design guidance',
    ],
  },
  {
    name: 'Team',
    price: '$39',
    description: 'For product squads shipping shared Storybook references.',
    cta: 'Choose Team',
    variant: 'default' as const,
    highlight: true,
    features: [
      'Unlimited collaborators',
      'Spec-first rollout workflow',
      'Theme and viewport review support',
    ],
  },
  {
    name: 'Scale',
    price: '$99',
    description: 'For orgs standardizing release surfaces across products.',
    cta: 'Talk to sales',
    variant: 'outline' as const,
    features: [
      'Cross-team review templates',
      'Adoption playbooks and governance',
      'Priority launch architecture support',
    ],
  },
];

const meta = {
  title: 'Page/Layouts/PricingComparison',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      <main>
        <section className="border-b bg-gradient-to-b from-muted/50 via-background to-background">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-3xl space-y-5 text-center">
              <Badge variant="secondary" className="gap-2 px-3 py-1">
                <Sparkles className="size-3.5" />
                Pricing and comparison reference
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Compare rollout plans for teams adopting modern layout stories.
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                A decision-focused page pattern that makes plan differences,
                reassurance, and next actions clear without building a custom
                pricing UI.
              </p>
            </div>

            <div className="mt-10 grid gap-4 xl:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.highlight
                      ? 'border-primary shadow-sm'
                      : 'border-border/70'
                  }
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle>{plan.name}</CardTitle>
                          {plan.highlight ? (
                            <Badge className="gap-1">
                              <Crown className="size-3.5" />
                              Most adopted
                            </Badge>
                          ) : null}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        Monthly
                      </Badge>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        per workspace
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      {plan.features.map((feature) => (
                        <Item
                          key={feature}
                          icon={<Check className="size-4" />}
                          label={feature}
                          className="border-border/70 bg-muted/20"
                        />
                      ))}
                    </div>
                    <Button
                      variant={plan.variant}
                      className="w-full gap-2"
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Why these plan cards work</CardTitle>
              <CardDescription>
                Comparison pages should reduce decision friction instead of
                turning into dense spreadsheets.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                'Plan emphasis is visible through hierarchy, not custom color systems.',
                'Feature rows remain legible when cards stack on tablet and mobile.',
                'Primary CTA stays obvious even when all plans are shown at once.',
              ].map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-3 rounded-lg border bg-muted/20 px-4 py-3"
                >
                  <BadgeCheck className="mt-0.5 size-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{line}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-muted/30">
            <CardHeader>
              <CardTitle>Reassurance for engineering buyers</CardTitle>
              <CardDescription>
                Modern pricing pages usually need a quieter support block near
                the comparison grid.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-background px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <p className="font-medium">No layout lock-in</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every reference page is composed from existing primitives, so
                  teams can adapt sections without replacing their design
                  system.
                </p>
              </div>
              <div className="rounded-lg border bg-background px-4 py-3">
                <div className="flex items-center gap-2">
                  <CircleHelp className="size-4 text-primary" />
                  <p className="font-medium">Fast review loop</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Validate dark mode and viewport behavior from the Storybook
                  toolbar instead of maintaining separate variants.
                </p>
              </div>
              <div className="rounded-lg border bg-background px-4 py-3">
                <p className="text-sm font-medium">Helpful shortcut</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep the contract nearby while reviewing story details.
                </p>
                <div className="mt-3 flex gap-2">
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle>Frequently asked questions</CardTitle>
              <CardDescription>
                Keep the FAQ concise and directly tied to adoption decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="dark-mode">
                  <AccordionTrigger>
                    Do these pricing stories need dedicated dark-mode variants?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    No. The contract requires dark-mode support in the default
                    story, verified through the existing Storybook theme
                    toolbar.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="mobile">
                  <AccordionTrigger>
                    How should plan cards behave on smaller screens?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Cards should stack naturally with preserved CTA hierarchy
                    and readable feature rows at 768px and 375px widths.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="components">
                  <AccordionTrigger>
                    Can we add a new pricing component while implementing this?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Not in this scope. The feature is constrained to existing
                    `packages/ui` components and current semantic tokens.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <Separator />
          <Card className="mt-6 border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-primary-foreground/80">
                  Final call to action
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Pick the plan that matches your review depth and team size.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Start with Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Review full comparison
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
