import { Card, CardContent, CardHeader, CardTitle } from '@kamijeong/ui';
import { PageHero } from '@sfood/components/sections/PageHero';
import { SectionHeader } from '@sfood/components/sections/SectionHeader';
import { hiringSteps, pageContent, talentValues } from '@sfood/content/site';

export function TalentPage() {
  return (
    <>
      <PageHero content={pageContent.talent} />
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Talent Values"
          title="밝은 에너지와 정직한 기준으로 성장합니다"
          description="SFood는 맛을 깊이 탐구하고 품질 앞에서 정직하며 함께 성장하는 사람을 기다립니다."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {talentValues.map((value) => (
            <Card key={value.title} className="border-border/70">
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeader
            eyebrow="Hiring Process"
            title="채용 프로세스"
            description="지원부터 최종 안내까지, 서로를 충분히 이해하는 흐름으로 진행합니다."
          />
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {hiringSteps.map((step) => (
              <li key={step.step} className="rounded-lg border bg-card p-5">
                <div className="flex size-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                  {step.step}
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-normal">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
