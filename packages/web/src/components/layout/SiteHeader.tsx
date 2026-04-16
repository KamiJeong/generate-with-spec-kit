import { Menu, Sparkles } from 'lucide-react';

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  buttonVariants,
} from '@kamijeong/ui';

import { navItems, siteConfig } from '@web/content/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="#hero"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          aria-label={`${siteConfig.name} 홈`}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">
              {siteConfig.name}
            </span>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Spec-first service delivery
            </span>
          </span>
        </a>

        <NavigationMenu
          viewport={false}
          className="hidden md:flex"
          aria-label="주요 섹션"
        >
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink href={item.href}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <a href="#contact">{siteConfig.ctaLabel}</a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="메뉴 열기"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>섹션 이동</SheetTitle>
                <SheetDescription>
                  원하는 섹션을 선택해 바로 이동합니다.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="모바일 섹션" className="grid gap-2 px-4">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <a
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <div className="px-4">
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className={buttonVariants({ className: 'w-full' })}
                  >
                    {siteConfig.ctaLabel}
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
