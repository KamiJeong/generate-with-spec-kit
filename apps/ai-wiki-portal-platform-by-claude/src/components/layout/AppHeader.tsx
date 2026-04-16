import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  SidebarTrigger,
} from '@kamijeong/ui';
import { Link } from 'react-router-dom';

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

interface AppHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbEntry[];
}

export function AppHeader({ title, breadcrumbs = [] }: AppHeaderProps) {
  return (
    <header className="border-b">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="space-y-1">
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <BreadcrumbItem key={crumb.label}>
                        {isLast ? (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        ) : (
                          <>
                            <BreadcrumbLink asChild>
                              <Link to={crumb.href ?? '#'}>{crumb.label}</Link>
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                          </>
                        )}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
