const fs = require("fs")
const path = require("path")

const base = path.join(__dirname, "..", "src", "stories")
fs.mkdirSync(base, { recursive: true })

const stories = [
  [
    "accordion.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section</AccordionTrigger>
        <AccordionContent>Accordion content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('Section'))
    await expect(canvas.getByText('Accordion content')).toBeInTheDocument()
  },
}
`,
  ],
  [
    "alert.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Alert, AlertDescription, AlertTitle } from '../components/alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  render: () => (
    <Alert className="w-96">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Descriptive alert copy.</AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { await expect(within(canvasElement).getByText('Heads up')).toBeInTheDocument() } }
`,
  ],
  [
    "button.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from '../components/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); const button = canvas.getByRole('button', { name: 'Button' }); await userEvent.click(button); await expect(button).toBeInTheDocument() } }
`,
  ],
  [
    "card.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Button } from '../components/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter><Button size="sm">Action</Button></CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { await expect(within(canvasElement).getByText('Card title')).toBeInTheDocument() } }
`,
  ],
  [
    "checkbox.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Checkbox } from '../components/checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  render: () => <Checkbox aria-label="Accept" />,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const checkbox = within(canvasElement).getByRole('checkbox'); await userEvent.click(checkbox); await expect(checkbox).toBeChecked() } }
`,
  ],
  [
    "combobox.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Combobox } from '../components/combobox'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  render: () => <Combobox options={[{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }]} placeholder="Select fruit" />,
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('combobox')); await expect(await canvas.findByText('Apple')).toBeInTheDocument() } }
`,
  ],
  [
    "data-table.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { DataTable, type ColumnDef } from '../components/data-table'

const data = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
]

const columns: ColumnDef<(typeof data)[number]>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
]

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  render: () => <DataTable columns={columns} data={data} searchKey="name" pageSize={1} />,
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { await expect(within(canvasElement).getByText('Alice')).toBeInTheDocument() } }
`,
  ],
  [
    "dialog.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Button } from '../components/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog content</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' })); await expect(await canvas.findByText('Dialog title')).toBeInTheDocument() } }
`,
  ],
  [
    "field.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Field } from '../components/field'
import { Input } from '../components/input'

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  render: () => <Field label="Email" error="Required field"><Input /></Field>,
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { await expect(within(canvasElement).getByText('Required field')).toBeInTheDocument() } }
`,
  ],
  [
    "input.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Input } from '../components/input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  render: () => <Input aria-label="Email" placeholder="Email" />,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const input = within(canvasElement).getByRole('textbox'); await userEvent.type(input, 'hello'); await expect(input).toHaveValue('hello') } }
`,
  ],
  [
    "input-group.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Input } from '../components/input'
import { InputGroup } from '../components/input-group'

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  render: () => <InputGroup prefix="https://" suffix=".com"><Input defaultValue="acme" /></InputGroup>,
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { await expect(within(canvasElement).getByDisplayValue('acme')).toBeInTheDocument() } }
`,
  ],
  [
    "native-select.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { NativeSelect } from '../components/native-select'

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  render: () => (
    <NativeSelect defaultValue="one" aria-label="Plan">
      <option value="one">One</option>
      <option value="two">Two</option>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const select = within(canvasElement).getByRole('combobox'); await userEvent.selectOptions(select, 'two'); await expect(select).toHaveValue('two') } }
`,
  ],
  [
    "radio-group.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Label } from '../components/label'
import { RadioGroup, RadioGroupItem } from '../components/radio-group'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2"><RadioGroupItem value="a" id="a" /><Label htmlFor="a">A</Label></div>
      <div className="flex items-center gap-2"><RadioGroupItem value="b" id="b" /><Label htmlFor="b">B</Label></div>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); const item = canvas.getByLabelText('B'); await userEvent.click(item); await expect(item).toBeChecked() } }
`,
  ],
  [
    "switch.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Switch } from '../components/switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  render: () => <Switch aria-label="Notifications" />,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const item = within(canvasElement).getByRole('switch'); await userEvent.click(item); await expect(item).toHaveAttribute('data-state', 'checked') } }
`,
  ],
  [
    "tabs.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('tab', { name: 'Password' })); await expect(canvas.getByText('Password content')).toBeInTheDocument() } }
`,
  ],
  [
    "spinner.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Spinner } from '../components/spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { render: () => <Spinner />, play: async ({ canvasElement }) => { await expect(within(canvasElement).getByLabelText('Loading')).toBeInTheDocument() } }
`,
  ],
  [
    "composition.stories.tsx",
    `import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import { Button } from '../components/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/card'
import { DataTable, type ColumnDef } from '../components/data-table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/dialog'
import { Field } from '../components/field'
import { Input } from '../components/input'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '../components/pagination'

const users = [{ id: '1', name: 'Alice', email: 'alice@example.com' }]
const columns: ColumnDef<(typeof users)[number]>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
]

const meta = {
  title: 'Components/Composition',
  tags: ['autodocs'],
  render: () => <div className="grid gap-8"><Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Create user</DialogTitle></DialogHeader><Field label="Email"><Input placeholder="name@example.com" /></Field></DialogContent></Dialog><Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent><DataTable columns={columns} data={users} searchKey="name" pageSize={1} /><Pagination><PaginationContent><PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem></PaginationContent></Pagination></CardContent></Card></div>,
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await expect(canvas.getByText('Users')).toBeInTheDocument(); await expect(canvas.getByText('Alice')).toBeInTheDocument() } }
`,
  ],
]

for (const [file, code] of stories) {
  fs.writeFileSync(path.join(base, file), code)
}
