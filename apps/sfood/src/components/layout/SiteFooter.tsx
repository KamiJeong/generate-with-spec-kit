import { Separator } from '@kamijeong/ui';
import { siteIdentity } from '@sfood/content/site';
import { primaryRoutes, supportRoutes } from '@sfood/routes/route-map';

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-2xl space-y-2">
          <p className="text-lg font-bold text-foreground">
            {siteIdentity.name} <span className="text-muted-foreground">{siteIdentity.koreanName}</span>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {siteIdentity.description}
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">브랜드</p>
            <div className="flex flex-col gap-2">
              {primaryRoutes.map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {route.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">지원</p>
            <div className="flex flex-col gap-2">
              {supportRoutes.map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {route.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="lg:col-span-2" />
        <p className="text-sm text-muted-foreground lg:col-span-2">
          가상의 브랜드 사이트 프로토타입입니다. 실제 제품, 채용, 제휴 정보는 최종 검토 후 확정됩니다.
        </p>
      </div>
    </footer>
  );
}
