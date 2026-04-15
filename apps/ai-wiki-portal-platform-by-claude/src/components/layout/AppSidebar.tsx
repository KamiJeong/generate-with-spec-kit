import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@myorg/ui';
import {
  BookOpenIcon,
  FolderOpenIcon,
  LayoutDashboardIcon,
  RocketIcon,
  SparklesIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@wiki/routes';

const NAV_ITEMS = [
  { label: '대시보드', href: ROUTES.DASHBOARD, icon: LayoutDashboardIcon },
  { label: 'Wiki 문서', href: ROUTES.WIKI, icon: BookOpenIcon },
  { label: 'Blueprint', href: ROUTES.BLUEPRINT, icon: SparklesIcon },
  { label: 'Get Started', href: ROUTES.GET_STARTED, icon: RocketIcon },
] as const;

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/60 px-3 py-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderOpenIcon className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">AI Wiki Portal</p>
            <p className="truncate text-xs text-sidebar-foreground/70">
              AI 개발 가이드 플랫폼
            </p>
          </div>
        </div>
        <SidebarInput placeholder="문서 검색..." />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton isActive={pathname === href || pathname.startsWith(href + '/')} asChild>
                    <Link to={href}>
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
