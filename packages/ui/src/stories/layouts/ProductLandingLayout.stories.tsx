import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  LayoutTemplate,
  MessageSquareQuote,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { AspectRatio } from '../../components/aspect-ratio';
import { Avatar, AvatarFallback } from '../../components/avatar';
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/tabs';

const features = [
  {
    icon: Rocket,
    title: 'Campaign-ready hero',
    description:
      'Present a release story with clear launch messaging, proof, and primary conversion actions.',
  },
  {
    icon: LayoutTemplate,
    title: 'Feature-led sections',
    description:
      'Guide users from a core promise into product details without losing pacing on smaller screens.',
  },
  {
    icon: Bot,
    title: 'Agent-assisted workflows',
    description:
      'Show how clarify, plan, and implement steps stay visible in the same product narrative.',
  },
];

const meta = {
  title: 'Page/Layouts/ProductLanding',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-svh bg-background text-foreground">
      <main>
        <section className="border-b bg-gradient-to-b from-background via-muted/50 to-background">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="gap-2 px-3 py-1">
                  <Rocket className="size-3.5" />
                  Product landing reference
                </Badge>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                    Launch spec-backed UI features with a sharper conversion
                    path.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    A modern landing page layout for release notes, launch
                    campaigns, and feature promotion in developer tooling
                    products.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Launch the feature
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Read the rollout brief
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['3x', 'faster asset review cycles'],
                  ['68%', 'higher story reuse across teams'],
                  ['0', 'custom primitives introduced'],
                ].map(([value, label]) => (
                  <Card key={label} className="border-border/70">
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

            <Card className="overflow-hidden border-border/70 shadow-sm">
              <CardHeader className="border-b bg-muted/40">
                <CardTitle>Feature spotlight</CardTitle>
                <CardDescription>
                  One panel that explains what shipped, why it matters, and how
                  teams can adopt it safely.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="launch">
                  <TabsList>
                    <TabsTrigger value="launch">Launch</TabsTrigger>
                    <TabsTrigger value="proof">Proof</TabsTrigger>
                    <TabsTrigger value="adoption">Adoption</TabsTrigger>
                  </TabsList>
                  <TabsContent value="launch" className="pt-4">
                    <AspectRatio ratio={16 / 10}>
                      <div className="flex h-full flex-col justify-between rounded-xl border bg-muted/30 p-5">
                        <div className="space-y-2">
                          <Badge className="w-fit">Shipping now</Badge>
                          <h2 className="text-2xl font-semibold">
                            Modern layout stories for product teams
                          </h2>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Publish brand, docs, landing, and pricing page
                            references in one consistent Storybook group.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            'Clarify scope',
                            'Compose sections',
                            'Review across themes',
                          ].map((step) => (
                            <div
                              key={step}
                              className="rounded-lg border bg-background p-3 text-sm"
                            >
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </AspectRatio>
                  </TabsContent>
                  <TabsContent value="proof" className="pt-4">
                    <div className="grid gap-3">
                      {[
                        'Single-story layouts stay readable at 375px mobile width.',
                        'Dark mode uses existing semantic tokens with no extra variants.',
                        'Storybook navigation remains aligned with current Page stories.',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-lg border bg-muted/20 px-4 py-3"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                          <p className="text-sm text-muted-foreground">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="adoption" className="pt-4">
                    <Card className="border-border/70 bg-muted/20">
                      <CardContent className="space-y-3 p-4">
                        <p className="text-sm font-medium">
                          Recommended rollout sequence
                        </p>
                        <ol className="grid gap-3 text-sm text-muted-foreground">
                          <li>
                            1. Validate the brand site story as the reference
                            bar.
                          </li>
                          <li>2. Extend the campaign-style landing layout.</li>
                          <li>
                            3. Finish docs and pricing pages with the same
                            system parts.
                          </li>
                        </ol>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
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
            <CardContent className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
              <div className="space-y-3">
                <Badge variant="outline" className="w-fit">
                  Social proof
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Show the release story alongside the operator voice.
                </h2>
                <p className="text-muted-foreground">
                  Modern launch pages work better when proof appears near the
                  value proposition instead of buried in docs.
                </p>
              </div>
              <Card className="border-border/70 bg-background">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Jina Park</p>
                      <p className="text-sm text-muted-foreground">
                        Staff Design Engineer, Team Canvas
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MessageSquareQuote className="mt-0.5 size-4 text-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      We used this layout pattern to launch a story pack update
                      without inventing a new marketing site. It reads like a
                      product release, not a generic landing page.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <Card className="border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              <div className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-primary-foreground/80">
                  Conversion-ready call to action
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Turn layout references into launch-ready pages faster.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Explore layout stories
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Download launch brief
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="border-t px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
          Campaign-style product pages should stay as composable and predictable
          as the UI system they promote.
        </footer>
      </main>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
