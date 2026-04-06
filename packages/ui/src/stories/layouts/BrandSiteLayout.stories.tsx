import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  Blocks,
  Bot,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { AspectRatio } from '../../components/aspect-ratio';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from '../../components/avatar';
import { Badge } from '../../components/badge';
import { Button } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../../components/navigation-menu';
import { Separator } from '../../components/separator';

const pillars = [
  {
    icon: Bot,
    title: 'Spec-backed generation',
    description:
      'Start every UI flow from clarified requirements instead of loose prompts.',
  },
  {
    icon: GitBranch,
    title: 'Reviewable delivery',
    description:
      'Keep planning, implementation, and verification artifacts visible for every change.',
  },
  {
    icon: ShieldCheck,
    title: 'Design-safe defaults',
    description:
      'Reuse tokens and system components so new work stays predictable across teams.',
  },
];

const signals = [
  '48 design-system contributors onboarded',
  '92% fewer one-off page mocks in feature planning',
  '14 day rollout from first spec to shipped Storybook examples',
];

const meta = {
  title: 'Page/Layouts/BrandSite',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Spec Kit Studio</p>
              <p className="text-sm text-muted-foreground">
                Layout references for product teams
              </p>
            </div>
          </div>
          <NavigationMenu viewport={false} className="hidden md:flex">
            <NavigationMenuList>
              {[
                ['Layouts', '/layouts'],
                ['Tokens', '/tokens'],
                ['Guides', '/guides'],
                ['Pricing', '/pricing'],
              ].map(([item, href]) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink href={href}>{item}</NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex">
              View changelog
            </Button>
            <Button>Open Storybook</Button>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-muted/60 via-background to-background">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="gap-2 px-3 py-1">
                  <Sparkles className="size-3.5" />
                  Main brand site reference
                </Badge>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                    Ship design-safe product surfaces from clarified specs.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    A brand homepage layout for developer tooling teams that
                    need strong hierarchy, proof, and conversion paths without
                    inventing new UI primitives.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start from a story pack
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Review layout anatomy
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['120+', 'teams aligning design and specs'],
                  ['4', 'modern layout references included'],
                  ['1', 'single story adapting across breakpoints'],
                ].map(([value, label]) => (
                  <Card key={label} className="border-border/70 bg-card/80">
                    <CardContent className="space-y-1 p-4">
                      <p className="text-2xl font-semibold">{value}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden border-border/70 bg-card/90 shadow-sm">
              <CardHeader className="border-b bg-muted/40">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Release command center</CardTitle>
                    <CardDescription>
                      A preview surface that combines planning, proof, and
                      launch readiness.
                    </CardDescription>
                  </div>
                  <AvatarGroup>
                    <Avatar size="sm">
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <Avatar size="sm">
                      <AvatarFallback>DL</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount>+5</AvatarGroupCount>
                  </AvatarGroup>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <AspectRatio ratio={16 / 10}>
                  <div className="flex h-full flex-col justify-between rounded-xl border bg-muted/40 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          This sprint
                        </p>
                        <p className="text-2xl font-semibold">
                          Storybook layout rollout
                        </p>
                      </div>
                      <Badge>On track</Badge>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ['Clarify', '5 decisions captured'],
                        ['Plan', '4 layout contracts fixed'],
                        ['Ship', 'Dark + mobile ready'],
                      ].map(([title, detail]) => (
                        <div
                          key={title}
                          className="rounded-lg border bg-background p-3"
                        >
                          <p className="text-sm font-medium">{title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AspectRatio>

                <div className="grid gap-3">
                  {signals.map((signal) => (
                    <div
                      key={signal}
                      className="flex items-start gap-3 rounded-lg border bg-background px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {signal}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/70">
              <CardHeader className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
          <Card className="border-border/70 bg-muted/30">
            <CardContent className="grid gap-8 p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:p-8">
              <div className="space-y-3">
                <Badge variant="outline" className="w-fit">
                  Why teams switch
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Layout stories that teach composition, not just screenshots.
                </h2>
                <p className="text-muted-foreground">
                  Each page is intentionally built from the same UI primitives
                  product teams already ship, which makes the layouts reusable
                  as implementation references.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  'Header and hero sections keep CTA priority obvious.',
                  'Proof blocks stay readable in light and dark themes.',
                  'Cards collapse cleanly from desktop to 375px mobile width.',
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-start gap-3 rounded-lg border bg-background px-4 py-3"
                  >
                    <Blocks className="mt-0.5 size-4 text-primary" />
                    <p className="text-sm text-muted-foreground">{line}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <Card className="border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-primary-foreground/80">
                  Ready for the next layout set
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Start with the brand site, then adapt the rest of the story
                  pack.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Open implementation guide
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Compare layout variants
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-medium text-foreground">Spec Kit Studio</p>
            <p>Spec-first layout references for developer product teams.</p>
          </div>
          <Separator className="lg:hidden" />
          <div className="flex flex-wrap gap-4">
            <a
              href="/layouts"
              className="transition-colors hover:text-foreground"
            >
              Layout library
            </a>
            <a
              href="/guides/design"
              className="transition-colors hover:text-foreground"
            >
              Design rules
            </a>
            <a
              href="/storybook"
              className="transition-colors hover:text-foreground"
            >
              Storybook docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
