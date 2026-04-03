# DESIGN.md

## 1. Identity & Brand

### Project
- Name: `generate-with-spec-kit`
- Product type: developer tooling monorepo (`packages/tokens`, `packages/ui`)
- UI direction: functional, accessible, predictable interfaces for engineering workflows

### Design philosophy
- Prefer semantic tokens over raw values.
- Prefer composition over custom one-off UI patterns.
- Keep interaction behavior obvious and keyboard friendly.
- Keep visual hierarchy minimal and readable.
- Make accessibility the default path, not an optional add-on.

### Core design principles
1. Semantic-first styling: use token roles (`primary`, `muted-foreground`, `border`) instead of hard-coded palette values.
2. System components first: select from existing UI primitives before creating new UI.
3. State clarity: default, hover, focus, disabled, error, and active states must be explicit.
4. Accessibility baseline: all interactive and form UI must satisfy WCAG 2.1 AA patterns.
5. Predictable composition: use shared helpers (`Field`, `cn`) to keep output consistent across agents.

### Brand color
- Primary brand color: `#d92b33` (`--primary`, `primary-500`)

## 2. Typography

### Font family
| Token | Value | Usage |
|---|---|---|
| `fontFamily.sans` | `"NanumBarunGothic", AppleGothic, Tahoma, Arial, sans-serif` | Default app UI and body text |

### Font weights
| Token | Value | Usage |
|---|---|---|
| `fontWeight.normal` | `400` | Body copy, helper text |
| `fontWeight.medium` | `500` | Labels, controls |
| `fontWeight.semibold` | `600` | Section titles, emphasized labels |
| `fontWeight.bold` | `700` | Key headings and strong emphasis |

### Line-height guidance
- `leading-tight`: compact headings and dense labels.
- `leading-snug`: short UI blocks needing tighter grouping.
- `leading-normal`: default body copy and most forms.
- `leading-relaxed`: helper/long-form text when extra readability is needed.

## 3. Color System

### Semantic tokens (source: `packages/tokens/src/semantic/index.ts`)

| CSS Variable | Purpose | Light Hex | Usage |
|---|---|---|---|
| `--background` | Page background | `#ffffff` | App/page surfaces |
| `--foreground` | Primary text | `#09090b` | Body copy and default text |
| `--card` | Card surface | `#ffffff` | Cards and panels |
| `--card-foreground` | Text on card | `#09090b` | Text inside cards |
| `--popover` | Popover surface | `#ffffff` | Dropdown/popover/sheet content |
| `--popover-foreground` | Text on popover | `#09090b` | Popover content text |
| `--primary` | Brand accent | `#d92b33` | Primary CTA and emphasis |
| `--primary-foreground` | Text on primary | `#ffffff` | Text/icons on primary backgrounds |
| `--secondary` | Secondary surface | `#f4f4f5` | Secondary actions, soft fills |
| `--secondary-foreground` | Text on secondary | `#18181b` | Text/icons on secondary surfaces |
| `--muted` | Muted surface | `#f4f4f5` | Quiet backgrounds |
| `--muted-foreground` | Muted text | `#71717a` | Descriptions and low-emphasis text |
| `--accent` | Interactive accent surface | `#e4e4e7` | Hover/selected neutral emphasis |
| `--accent-foreground` | Text on accent | `#18181b` | Text/icons on accent surfaces |
| `--destructive` | Destructive action color | `#d92b33` | Delete/error actions |
| `--destructive-foreground` | Text on destructive | `#ffffff` | Text/icons on destructive backgrounds |
| `--border` | Border color | `#e4e4e7` | Dividers and outlines |
| `--input` | Input border/fill base | `#e4e4e7` | Input/select boundary styles |
| `--ring` | Focus ring | `#d92b33` | Focus-visible indicators |
| `--chart-1` | Chart series 1 | `#d92b33` | Primary series |
| `--chart-2` | Chart series 2 | `#3f3f46` | Secondary series |
| `--chart-3` | Chart series 3 | `#ff8e92` | Supporting series |
| `--chart-4` | Chart series 4 | `#a1a1aa` | Supporting series |
| `--chart-5` | Chart series 5 | `#96161c` | Supporting series |
| `--chart-grid` | Chart grid lines | `#d4d4d8` | Axes and grid |
| `--chart-surface` | Chart stroke surface | `#ffffff` | Stroke contrast surface |

### Palette scales (source: `packages/tokens/src/primitives/colors.ts`)

#### Gray (`gray-50` to `gray-950`)
`50 #fafafa`, `100 #f4f4f5`, `200 #e4e4e7`, `300 #d4d4d8`, `400 #a1a1aa`, `500 #71717a`, `600 #52525b`, `700 #3f3f46`, `800 #27272a`, `900 #18181b`, `950 #09090b`

#### Primary (`primary-50` to `primary-950`)
`50 #fff1f1`, `100 #ffe0e1`, `200 #ffc0c2`, `300 #ff8e92`, `400 #f45b62`, `500 #d92b33`, `600 #b71e25`, `700 #96161c`, `800 #741015`, `900 #520a0e`, `950 #2e0405`

## 4. Spacing & Layout

### Radius tokens
| Token | Value | Notes |
|---|---|---|
| `--radius` | `0.5rem` | Base radius |
| `--radius-lg` | `var(--radius)` | Large corners |
| `--radius-md` | `calc(var(--radius) - 2px)` | Medium corners |
| `--radius-sm` | `calc(var(--radius) - 4px)` | Small corners |
| `--radius-xl` | `calc(var(--radius) + 4px)` | Extra-large corners |

### Responsive breakpoints
| Prefix | Min Width |
|---|---|
| `sm:` | `640px` |
| `md:` | `768px` |
| `lg:` | `1024px` |

### Mobile detection
- Hook: `useIsMobile()` from `packages/ui/src/hooks/use-mobile.ts`
- Breakpoint constant: `MOBILE_BREAKPOINT = 768`
- Runtime rule: mobile when `window.innerWidth < 768`

## 5. Components

### 5.1 Layout & Interaction

| Component | Subcomponents | Key Props / Variants | Minimal usage |
|---|---|---|---|
| `Card` | `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` | Container composition | `<Card><CardHeader /><CardContent /></Card>` |
| `Sidebar` | `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarContent`, `SidebarHeader`, `SidebarFooter`, `SidebarGroup*`, `SidebarMenu*`, `SidebarInset`, `SidebarRail`, `useSidebar` | `side`: `left|right`, `variant`: `sidebar|floating|inset`, `collapsible`: `offcanvas|icon|none` | `<SidebarProvider><Sidebar /><SidebarInset /></SidebarProvider>` |
| `Breadcrumb` | `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | `aria-current="page"` on current item | `<Breadcrumb><BreadcrumbList>...</BreadcrumbList></Breadcrumb>` |
| `NavigationMenu` | `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport` | `viewport` toggle, trigger style helper | `<NavigationMenu><NavigationMenuList>...</NavigationMenuList></NavigationMenu>` |
| `Tabs` | `TabsList`, `TabsTrigger`, `TabsContent` | list `variant`: `default|line`; root `orientation`: `horizontal|vertical` | `<Tabs defaultValue="a"><TabsList><TabsTrigger value="a" /></TabsList></Tabs>` |
| `Pagination` | `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | `isActive` state sets `aria-current` | `<Pagination><PaginationContent>...</PaginationContent></Pagination>` |
| `Button` | `buttonVariants` | `variant`: `default|destructive|outline|secondary|ghost|link`; `size`: `xs|sm|default|lg|icon|icon-xs|icon-sm|icon-lg`; `asChild` | `<Button variant="default" size="default">Save</Button>` |
| `Badge` | `badgeVariants` | `variant`: `default|secondary|destructive|outline|ghost|link`; `asChild` | `<Badge variant="secondary">Beta</Badge>` |
| `ButtonGroup` | `ButtonGroup` | `orientation`: `horizontal|vertical` | `<ButtonGroup><Button />...</ButtonGroup>` |
| `Input` | `Input` | standard input props, `aria-invalid` support | `<Input placeholder="Email" />` |
| `InputGroup` | `InputGroup` | `prefix`, `suffix` slots | `<InputGroup prefix="@"><Input /></InputGroup>` |
| `InputOTP` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` | `maxLength`, slot-based OTP composition | `<InputOTP maxLength={6}><InputOTPGroup>...</InputOTPGroup></InputOTP>` |
| `NativeSelect` | `NativeSelect` | native `<select>` API | `<NativeSelect><option>One</option></NativeSelect>` |
| `Select` | `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`, `SelectValue`, `SelectScrollUpButton`, `SelectScrollDownButton`, `SelectGroup` | trigger `size`: `sm|default`; controlled/uncontrolled Radix props | `<Select><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>...</SelectContent></Select>` |
| `Combobox` | `Combobox` | `options`, `value`, `onValueChange`, `placeholder`, `aria-label` | `<Combobox options={opts} value={v} onValueChange={setV} />` |
| `Checkbox` | `Checkbox` | checked state, disabled, `aria-invalid` | `<Checkbox aria-label="Accept terms" />` |
| `RadioGroup` | `RadioGroup`, `RadioGroupItem` | single-choice groups, `aria-invalid` | `<RadioGroup><RadioGroupItem value="a" /></RadioGroup>` |
| `Switch` | `Switch` | `size`: `sm|default`; checked state | `<Switch size="default" aria-label="Notifications" />` |
| `Label` | `Label` | text label for controls | `<Label htmlFor="email">Email</Label>` |
| `Field` | `Field` | `label`, `error`, `required`; auto sets child `aria-describedby` + `aria-invalid` | `<Field label="Email" required><Input /></Field>` |

### 5.2 Dialog & Overlay

| Component | Subcomponents | Key Props / Variants | Minimal usage |
|---|---|---|---|
| `Dialog` | `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`, `DialogOverlay`, `DialogPortal` | Radix dialog open state pattern | `<Dialog><DialogTrigger /><DialogContent>...</DialogContent></Dialog>` |
| `AlertDialog` | `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal` | confirm/cancel destructive flow | `<AlertDialog><AlertDialogTrigger />...</AlertDialog>` |
| `Drawer` | `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerFooter`, `DrawerClose`, `DrawerOverlay`, `DrawerPortal` | edge panel interaction | `<Drawer><DrawerTrigger /><DrawerContent>...</DrawerContent></Drawer>` |
| `Sheet` | `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetFooter`, `SheetClose` | side panel pattern | `<Sheet><SheetTrigger /><SheetContent side="right" /></Sheet>` |
| `Popover` | `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription` | anchored floating UI | `<Popover><PopoverTrigger /><PopoverContent>...</PopoverContent></Popover>` |
| `HoverCard` | `HoverCardTrigger`, `HoverCardContent` | hover-preview content | `<HoverCard><HoverCardTrigger /><HoverCardContent /></HoverCard>` |
| `Tooltip` | `TooltipProvider`, `TooltipTrigger`, `TooltipContent` | global delay via provider | `<TooltipProvider><Tooltip>...</Tooltip></TooltipProvider>` |
| `ContextMenu` | `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuRadioGroup`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal` | right-click contextual actions | `<ContextMenu><ContextMenuTrigger />...</ContextMenu>` |
| `DropdownMenu` | `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuRadioGroup`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal` | trigger-based action list | `<DropdownMenu><DropdownMenuTrigger />...</DropdownMenu>` |
| `Menubar` | `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`, `MenubarLabel`, `MenubarSeparator`, `MenubarShortcut`, `MenubarGroup`, `MenubarPortal` | desktop-like app menu bar | `<Menubar><MenubarMenu>...</MenubarMenu></Menubar>` |

### 5.3 Data, Feedback, and Special

| Component | Subcomponents | Key Props / Variants | Minimal usage |
|---|---|---|---|
| `Table` | `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `TableFooter` | semantic table composition | `<Table><TableHeader />...</Table>` |
| `DataTable` | `DataTable` (`ColumnDef` type export) | required `columns`, `data`; optional `searchKey`, `pageSize` | `<DataTable columns={columns} data={rows} searchKey="name" pageSize={10} />` |
| `Chart` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle` | `ChartContainer` requires `config`; config entry supports `label`, `icon`, and either `color` or per-theme `theme` colors | `<ChartContainer config={{ visitors: { label: 'Visitors', color: 'hsl(var(--chart-1))' } }}>{/* recharts */}</ChartContainer>` |
| `Progress` | `Progress` | numeric `value` | `<Progress value={60} />` |
| `Skeleton` | `Skeleton` | loading placeholder block | `<Skeleton className="h-4 w-40" />` |
| `Spinner` | `Spinner` | `size`: `sm|default|lg` | `<Spinner size="default" />` |
| `Alert` | `Alert`, `AlertTitle`, `AlertDescription` | `variant`: `default|destructive` | `<Alert variant="destructive"><AlertTitle>Error</AlertTitle></Alert>` |
| `Sonner` | `Toaster` | app-level toaster with theme support; use `toast.success()`, `toast.error()`, `toast.loading()` | `<Toaster richColors />` |
| `Accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | collapsible multi/one modes | `<Accordion type="single" collapsible>...</Accordion>` |
| `Collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | controlled disclosure | `<Collapsible><CollapsibleTrigger />...</Collapsible>` |
| `Separator` | `Separator` | `orientation`: `horizontal|vertical` | `<Separator orientation="horizontal" />` |
| `Textarea` | `Textarea` | multiline input with `aria-invalid` support | `<Textarea placeholder="Notes" />` |
| `Kbd` | `Kbd` | keyboard key label display | `<Kbd>Cmd</Kbd>` |
| `Empty` | `Empty` | `icon`, `title`, `description` | `<Empty title="No results" description="Try a different filter." />` |
| `Item` | `Item` | `icon`, `label`, `shortcut`, `children` | `<Item label="Copy" shortcut="Cmd+C" />` |
| `Avatar` | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount` | avatar `size`: `sm|default|lg`; grouped stacks via `AvatarGroup` | `<Avatar size="lg"><AvatarImage src="/u.png" /></Avatar>` |
| `Carousel` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` (`CarouselApi` type) | `orientation`, embla options/plugins, `setApi` | `<Carousel><CarouselContent><CarouselItem /></CarouselContent></Carousel>` |
| `Command` | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandEmpty`, `CommandSeparator`, `CommandShortcut` | command palette/search list pattern | `<Command><CommandInput /><CommandList>...</CommandList></Command>` |
| `Direction` | `Direction` | `dir` wrapper for LTR/RTL | `<Direction dir="ltr">...</Direction>` |
| `Resizable` | `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` | panel split layouts | `<ResizablePanelGroup direction="horizontal">...</ResizablePanelGroup>` |
| `AspectRatio` | `AspectRatio` | ratio-constrained media container | `<AspectRatio ratio={16/9}>...</AspectRatio>` |
| `Calendar` | `Calendar`, `CalendarDayButton` | date selection and range-ready surface | `<Calendar mode="single" selected={date} onSelect={setDate} />` |
| `DatePicker` | `DatePicker`, `DateRangePicker` | single date and range picker wrappers | `<DatePicker value={date} onChange={setDate} />` |

## 6. Motion & Animation

### Motion tokens (source: `packages/tokens/src/motion/index.ts`)
| Token | Value | Use case |
|---|---|---|
| `motion.duration.fast` | `0.15s` | Hover and immediate micro-feedback |
| `motion.duration.normal` | `0.25s` | Standard UI transitions |
| `motion.duration.slow` | `0.4s` | Larger panel/page movement |

| Token | Value | Use case |
|---|---|---|
| `motion.easing.ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default transitions |
| `motion.easing.easeIn` | `cubic-bezier(0.4, 0, 1, 1)` | Exit emphasis |
| `motion.easing.easeOut` | `cubic-bezier(0, 0, 0.2, 1)` | Enter emphasis |
| `motion.easing.spring` | `{ type: 'spring', stiffness: 300, damping: 30 }` | Framer Motion spring behavior |

## 7. Dark Mode

- Semantic CSS variables are the primary dark-mode mechanism.
- Theme activation patterns supported in UI package:
  - `.dark`
  - `[data-theme="dark"]`
- Use `dark:` utility classes only for structural/layout differences that cannot be expressed by semantic tokens.
- Sidebar has dedicated token family (`--sidebar-*`) and separate dark-mode overrides; preserve those variables instead of hard-coding sidebar colors.

## 8. Accessibility

- Target: WCAG 2.1 AA baseline.
- Required ARIA patterns:
  - `aria-invalid="true"` for invalid form controls.
  - `aria-label` (or `aria-labelledby`) for icon-only controls.
  - `aria-current="page"` for active breadcrumb/pagination items.
  - `aria-disabled` for non-interactive menu/button-like items where needed.
- Required focus pattern for interactive controls:
  - `focus-visible:ring-2` or project equivalent ring class sequence (`focus-visible:ring-[3px] focus-visible:ring-ring/50`).
- Form rule:
  - Wrap labeled inputs with `Field` to auto-wire `aria-describedby` and `aria-invalid`.
- Keyboard:
  - Radix-based components should remain keyboard operable by default; do not remove built-in keyboard handlers.

## 9. Usage Rules & Don'ts

| Do | Do not |
|---|---|
| Use semantic color tokens (`bg-primary`, `text-muted-foreground`) | Do not hard-code hex values in UI code |
| Wrap labeled form controls with `Field` | Do not hand-wire label/error plumbing repeatedly |
| Merge classes with `cn()` | Do not concatenate class strings manually when conditional logic is needed |
| Set explicit component variants and sizes in generated code | Do not rely on implicit defaults when intent matters |
| Reuse existing components in `packages/ui/src/components` | Do not rebuild components that already exist in the system |
| Keep overrides token-driven and minimal | Do not directly override core styles with arbitrary CSS unless unavoidable |
| Use semantic roles in chart config (`--chart-*`) | Do not introduce unrelated ad-hoc chart colors |
| Recognize `data-slot` attributes when reading existing component code | Do not use `data-slot` as a styling hook — use variant props and `cn()` instead |
