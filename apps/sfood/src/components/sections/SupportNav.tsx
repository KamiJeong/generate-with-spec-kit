import { supportRoutes } from '@sfood/routes/route-map';

interface SupportNavProps {
  currentPath: string;
}

export function SupportNav({ currentPath }: SupportNavProps) {
  return (
    <nav aria-label="지원 메뉴" className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6">
      <div className="flex flex-wrap gap-2 rounded-lg border bg-card p-2">
        {supportRoutes.map((route) => {
          const isActive = route.path === currentPath;

          return (
            <a
              key={route.path}
              href={route.path}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground'
                  : 'rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
              }
            >
              {route.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
