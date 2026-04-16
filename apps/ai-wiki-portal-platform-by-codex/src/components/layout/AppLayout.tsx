import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Button,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@kamijeong/ui';
import { BookOpen, Bot, ClipboardList, LayoutDashboard, LifeBuoy, Sparkles } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { RolePerspectiveProvider, useRolePerspective } from '@wiki/lib/role-context';
import { getRolePerspective } from '@wiki/mock/selectors';
import { ROUTES } from '@wiki/routes';
import { RolePerspectiveSelector } from '@wiki/components/shared/RolePerspectiveSelector';

const navItems = [
  { label: '대시보드', href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Wiki 문서', href: ROUTES.WIKI, icon: BookOpen },
  { label: 'Blueprint', href: ROUTES.BLUEPRINT, icon: Sparkles },
  { label: 'Get Started', href: ROUTES.GET_STARTED, icon: ClipboardList },
];

const supportItems = [
  { label: 'AI Agent 질문', href: ROUTES.GET_STARTED, icon: Bot },
  { label: '문제 해결', href: '/wiki/doc-troubleshooting', icon: LifeBuoy },
];

function AppChrome() {
  const { roleId, setRoleId } = useRolePerspective();
  const role = getRolePerspective(roleId);
  const location = useLocation();
  const activeLabel =
    navItems.find((item) => location.pathname === item.href || location.pathname.startsWith(item.href + '/'))
      ?.label ?? '상세';

  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/60 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">AI Wiki Portal</p>
                <p className="truncate text-xs text-sidebar-foreground/70">실행 중심 개발 가이드</p>
              </div>
            </div>
          </div>
          <RolePerspectiveSelector value={roleId} onChange={setRoleId} />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>작업 흐름</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ label, href, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={location.pathname === href}>
                      <NavLink to={href}>
                        <Icon className="size-4" aria-hidden="true" />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>지원</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportItems.map(({ label, href, icon: Icon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton asChild>
                      <NavLink to={href}>
                        <Icon className="size-4" aria-hidden="true" />
                        <span>{label}</span>
                      </NavLink>
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
          <header className="border-b bg-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <SidebarTrigger className="mt-1 md:hidden" />
                <div className="space-y-1">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{activeLabel}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <h1 className="text-2xl font-semibold tracking-tight">문서에서 실행으로 이어지는 AI 개발 포털</h1>
                  <p className="max-w-3xl text-sm text-muted-foreground">{role.description}</p>
                  <p className="max-w-3xl text-sm text-muted-foreground">지원 경로: {role.preferredSupportPath}</p>
                </div>
              </div>
              <Button asChild variant="outline">
                <NavLink to={ROUTES.BLUEPRINT}>Blueprint 시작</NavLink>
              </Button>
            </div>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function AppLayout() {
  return (
    <RolePerspectiveProvider>
      <AppChrome />
    </RolePerspectiveProvider>
  );
}
