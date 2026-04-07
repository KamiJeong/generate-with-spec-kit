import type { Meta, StoryObj } from '@storybook/react';
import {
  BookOpen,
  Bot,
  Compass,
  FileCode2,
  LifeBuoy,
  Search,
  Sparkles,
  Stars,
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/breadcrumb';
import { Button } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../components/pagination';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '../../components/sidebar';

const collections = [
  {
    icon: BookOpen,
    title: 'Layout reference library',
    description:
      'Browse full-page patterns for brand, docs, launch, and pricing surfaces.',
  },
  {
    icon: FileCode2,
    title: 'Implementation playbooks',
    description:
      'Map each section back to reusable UI primitives and semantic token usage.',
  },
  {
    icon: Bot,
    title: 'Agent workflow guides',
    description:
      'Document how clarify, plan, tasks, and implementation fit into day-to-day delivery.',
  },
];

const readingPath = [
  'Start with the layout contract before opening any story file.',
  'Verify story group naming and fullscreen rendering rules.',
  'Review responsive behavior at 1280, 768, and 375 widths.',
];

const meta = {
  title: 'Page/Layouts/DocsHub',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/60 px-3 py-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Docs Hub</p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                Navigation-first resource layout
              </p>
            </div>
          </div>
          <SidebarInput placeholder="Search docs, patterns, guides" />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Explore</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  ['Overview', '/resources/overview', true],
                  ['Layout stories', '/resources/layout-stories', false],
                  ['Design guidance', '/resources/design-guidance', false],
                  [
                    'Storybook workflow',
                    '/resources/storybook-workflow',
                    false,
                  ],
                ].map(([label, href, active]) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton isActive={active as boolean} asChild>
                      <a href={href as string}>
                        <Compass className="size-4" />
                        <span>{label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Popular collections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  ['Brand site', '/resources/layout-stories/brand-site'],
                  [
                    'Product landing',
                    '/resources/layout-stories/product-landing',
                  ],
                  ['Docs hub', '/resources/layout-stories/docs-hub'],
                  [
                    'Pricing comparison',
                    '/resources/layout-stories/pricing-comparison',
                  ],
                ].map(([label, href]) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <a href={href as string}>
                        <BookOpen className="size-4" />
                        <span>{label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Support</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  ['Migration notes', '/support/migration-notes'],
                  ['Release checklist', '/support/release-checklist'],
                  ['Ask for review', '/support/review-request'],
                ].map(([label, href]) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <a href={href as string}>
                        <LifeBuoy className="size-4" />
                        <span>{label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="min-h-svh bg-background text-foreground">
          <header className="border-b">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="md:hidden" />
                <div className="space-y-1">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/resources">
                          Resources
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/resources/storybook">
                          Storybook
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Layout stories</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Browse implementation patterns by information architecture.
                  </h1>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="gap-2">
                  <Search className="size-4" />
                  Search guides
                </Button>
                <Button>Open quickstart</Button>
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <Card className="border-border/70 bg-gradient-to-br from-muted/60 via-background to-background">
                <CardContent className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                      <Stars className="size-3.5" />
                      Recommended collection
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Docs and resource hub pattern
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-semibold tracking-tight text-balance">
                      A docs homepage that balances navigation, discovery, and
                      operator confidence.
                    </h2>
                    <p className="max-w-2xl text-muted-foreground">
                      Use this layout when teams need a clear top-level entry
                      point into references, tutorials, and implementation
                      details without building a separate site shell.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ['24', 'guided resources'],
                      ['4', 'layout families'],
                      ['3', 'default viewports reviewed'],
                    ].map(([value, label]) => (
                      <div
                        key={label}
                        className="rounded-lg border bg-card px-4 py-3"
                      >
                        <p className="text-2xl font-semibold">{value}</p>
                        <p className="text-sm text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle>Recommended reading path</CardTitle>
                  <CardDescription>
                    A support block that helps new contributors move through the
                    resource hub in a predictable order.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {readingPath.map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-3 rounded-lg border bg-muted/20 px-4 py-3"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              {collections.map(({ icon: Icon, title, description }) => (
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

            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle>Featured resources</CardTitle>
                  <CardDescription>
                    Content cards should remain easy to scan across desktop and
                    mobile widths.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {[
                    'How to structure a modern Storybook layout story',
                    'Responsive checks for 1280, 768, and 375 viewports',
                    'Dark theme contrast review using semantic tokens',
                    'Choosing between brand, landing, docs, and pricing layouts',
                  ].map((title) => (
                    <Card key={title} className="border-border/70 bg-muted/20">
                      <CardContent className="space-y-2 p-4">
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">
                          Short reference content that keeps readers moving
                          through the hub.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-muted/30">
                <CardHeader>
                  <CardTitle>Need implementation help?</CardTitle>
                  <CardDescription>
                    Support blocks can point contributors toward quickstart,
                    task lists, and review steps.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-background px-4 py-3">
                    <p className="font-medium">Open the quickstart guide</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Follow the recommended order for the four layout stories.
                    </p>
                  </div>
                  <div className="rounded-lg border bg-background px-4 py-3">
                    <p className="font-medium">Compare against the contract</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Confirm titles, exports, fullscreen rendering, and section
                      requirements.
                    </p>
                  </div>
                  <Button className="w-full">
                    Start implementation review
                  </Button>
                </CardContent>
              </Card>
            </section>

            <Pagination className="justify-start">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="?page=1" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="?page=1" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="?page=2">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="?page=3">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="?page=2" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
