import { Separator } from '@myorg/ui';

import { siteConfig } from '@sfood/content/sfood-content';
import { pageRoutes } from '@sfood/routing/routes';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-2xl font-bold">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary-foreground/80">
              {siteConfig.description}
            </p>
          </div>
          <nav
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="푸터 메뉴"
          >
            {pageRoutes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                className="rounded-md text-sm text-secondary-foreground/85 hover:text-secondary-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
        <Separator className="my-8 bg-secondary-foreground/20" />
        <p className="text-sm text-secondary-foreground/70">
          SFood. Quality food for better everyday meals.
        </p>
      </div>
    </footer>
  );
}
