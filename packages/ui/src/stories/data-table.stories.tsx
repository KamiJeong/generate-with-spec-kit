import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { type ColumnDef, DataTable } from '../components/data-table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../components/pagination';

const data = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

const columns: ColumnDef<(typeof data)[number]>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
      </Button>
    ),
  },
  { accessorKey: 'email', header: 'Email' },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  render: () => (
    <DataTable columns={columns} data={data} searchKey="name" pageSize={1} />
  ),
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alice')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Name' }));
    await expect(canvas.getByText('Alice')).toBeInTheDocument();
  },
};

export const CardTablePaginationComposition: Story = {
  name: 'Card + DataTable + Pagination',
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <DataTable
          columns={columns}
          data={data}
          searchKey="name"
          pageSize={1}
        />
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Users')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  },
};
