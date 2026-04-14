import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  cn,
} from '@myorg/ui';
import { Menu } from 'lucide-react';
import type { MouseEvent } from 'react';

import { siteConfig } from '@sfood/content/sfood-content';
import {
  supportNavItems,
  topLevelNavItems,
  type PagePath,
  type PageRoute,
} from '@sfood/routing/routes';
import { navigateTo, useCurrentRoute } from '@sfood/routing/useCurrentRoute';

function handleRouteClick(event: MouseEvent<HTMLAnchorElement>, path: PagePath) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  event.preventDefault();
  navigateTo(path);
}

function NavLink({
  route,
  pathname,
  className,
}: {
  route: PageRoute;
  pathname: string;
  className?: string;
}) {
  const isActive = pathname === route.path;

  return (
    <a
      href={route.path}
      aria-current={isActive ? 'page' : undefined}
      onClick={(event) => handleRouteClick(event, route.path)}
      className={cn(
        'rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1',
        isActive && 'bg-accent text-accent-foreground',
        className
      )}
    >
      {route.label}
    </a>
  );
}

export function SiteHeader() {
  const { pathname } = useCurrentRoute();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          aria-label="SFood 홈"
          onClick={(event) => handleRouteClick(event, '/')}
          className="rounded-md text-xl font-bold text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden lg:block" aria-label="주요 메뉴">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {topLevelNavItems.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <NavigationMenuLink asChild active={pathname === route.path}>
                    <NavLink route={route} pathname={pathname} />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    pathname.startsWith('/support') &&
                      'bg-accent text-accent-foreground'
                  )}
                >
                  고객지원
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-56 gap-1 p-2">
                    {supportNavItems.map((route) => (
                      <NavigationMenuLink key={route.path} asChild>
                        <NavLink
                          route={route}
                          pathname={pathname}
                          className="justify-start"
                        />
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a
              href={siteConfig.primaryCtaPath}
              onClick={(event) =>
                handleRouteClick(event, siteConfig.primaryCtaPath)
              }
            >
              {siteConfig.primaryCtaLabel}
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="메뉴 열기"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
                <SheetDescription>원하는 페이지로 이동합니다.</SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-col gap-2 px-4"
                aria-label="모바일 주요 메뉴"
              >
                {[...topLevelNavItems, ...supportNavItems].map((route) => (
                  <SheetClose key={route.path} asChild>
                    <NavLink
                      route={route}
                      pathname={pathname}
                      className="w-full justify-start"
                    />
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
