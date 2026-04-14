import { Button } from '@myorg/ui';

export function NotFoundPage() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-foreground">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          요청한 경로가 없거나 이동되었습니다.
        </p>
        <div className="mt-8">
          <Button asChild>
            <a href="/">홈으로 이동</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
