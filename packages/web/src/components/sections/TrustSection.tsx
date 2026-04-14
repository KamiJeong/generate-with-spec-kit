import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@myorg/ui';

import { stats, testimonials } from '@web/content/site';

export function TrustSection() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-primary">신뢰 지표</p>
          <h2 id="trust-heading" className="text-3xl font-semibold">
            숫자와 사용자의 목소리로 판단 근거를 제공합니다.
          </h2>
          <p className="text-muted-foreground">
            정적 소개 사이트에서도 방문자가 신뢰할 수 있는 근거를 빠르게
            확인할 수 있도록 지표와 후기를 함께 배치합니다.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-lg border-border/70">
              <CardContent className="space-y-2 p-5">
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="rounded-lg border-border/70"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{testimonial.author}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
