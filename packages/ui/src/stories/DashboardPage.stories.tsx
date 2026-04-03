import type { Meta, StoryObj } from '@storybook/react';
import { LayoutDashboard, Settings, Users } from 'lucide-react';

import { Button } from '../components/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/card';
import { type ColumnDef, DataTable } from '../components/data-table';
import { Separator } from '../components/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../components/sidebar';

const users = [
  { id: '1', name: 'Alice Kim', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Lee', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Carol Park', email: 'carol@example.com', role: 'Viewer' },
];

const columns: ColumnDef<(typeof users)[number]>[] = [
  { accessorKey: 'name', header: '이름' },
  { accessorKey: 'email', header: '이메일' },
  { accessorKey: 'role', header: '역할' },
];

const meta = {
  title: 'Pages/DashboardPage',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <SidebarProvider defaultOpen>
      <Sidebar>
        <SidebarHeader className="p-3">
          <Button variant="outline" size="sm" className="justify-start">
            Admin Console
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Users />
                <span>Users</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <h1 className="font-semibold">Dashboard</h1>
        </header>
        <main className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>사용자 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={users}
                searchKey="name"
                pageSize={5}
              />
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

