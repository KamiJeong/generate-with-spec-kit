import { Card, CardContent, CardHeader, CardTitle } from '@myorg/ui';

import { PageHero } from '@sfood/components/shared/PageHero';
import { SectionHeader } from '@sfood/components/shared/SectionHeader';
import { HiringProcess } from '@sfood/components/talent/HiringProcess';
import { benefits, cultureValues, heroImage, hiringSteps } from '@sfood/content/sfood-content';

export function TalentPage() {
  return (
    <>
      <PageHero
        title="인재채용"
        eyebrow="Talent"
        description="정직한 품질과 빠른 실행으로 더 좋은 식품 경험을 함께 만드는 동료를 기다립니다."
        image={heroImage}
      />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>채용 철학</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                좋은 식품을 만드는 태도, 문제를 끝까지 해결하는 실행력, 파트너를 존중하는 협업 방식을 봅니다.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>조직 문화</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {cultureValues.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle>복리후생</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <SectionHeader title="채용 프로세스" description="서류부터 최종 합격까지 네 단계로 진행합니다." />
          <HiringProcess steps={hiringSteps} />
        </div>
      </section>
    </>
  );
}
