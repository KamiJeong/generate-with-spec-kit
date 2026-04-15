import { primaryRoutes, supportRoutes } from '@sfood/routes/route-map';
import { siteIdentity } from '@sfood/content/site';

interface SiteHeaderProps {
  currentPath: string;
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <a href="/" className="flex items-center gap-3" aria-label="SFood 메인으로 이동">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-base font-bold text-primary-foreground">
            SF
          </span>
          <span>
            <span className="block text-base font-bold text-foreground">
              {siteIdentity.name}
            </span>
            <span className="block text-sm text-muted-foreground">
              {siteIdentity.koreanName}
            </span>
          </span>
        </a>

        <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-1">
          {primaryRoutes.map((route) => {
            const isActive = route.path === currentPath;

            return (
              <a
                key={route.path}
                href={route.path}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground'
                    : 'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                }
              >
                {route.label}
              </a>
            );
          })}
          <a
            href={supportRoutes[0].path}
            aria-current={
              supportRoutes.some((route) => route.path === currentPath)
                ? 'page'
                : undefined
            }
            className={
              supportRoutes.some((route) => route.path === currentPath)
                ? 'rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground'
                : 'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
            }
          >
            고객지원
          </a>
        </nav>
      </div>
    </header>
  );
}
