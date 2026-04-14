import { Separator } from '@myorg/ui';

import { navItems, siteConfig } from '@web/content/site';

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p>스펙에서 시작해 검증 가능한 제품 경험으로 연결합니다.</p>
        </div>
        <Separator className="lg:hidden" />
        <nav aria-label="푸터 섹션" className="flex flex-wrap gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
