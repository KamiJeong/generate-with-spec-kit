import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { type ColumnDef, DataTable } from '../components/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/dialog';
import { Field } from '../components/field';
import { Input } from '../components/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../components/pagination';

const users = [{ id: '1', name: 'Alice', email: 'alice@example.com' }];
const columns: ColumnDef<(typeof users)[number]>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const meta = {
  title: 'Components/Composition',
  tags: ['autodocs'],
  render: () => (
    <div className="grid gap-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create user</DialogTitle>
          </DialogHeader>
          <Field label="Email">
            <Input placeholder="name@example.com" />
          </Field>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
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
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Users')).toBeInTheDocument();
    await expect(canvas.getByText('Alice')).toBeInTheDocument();
  },
};
