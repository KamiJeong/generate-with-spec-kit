import { Separator } from '@kamijeong/ui';

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-primary">서비스 개요</p>
          <h2 id="about-heading" className="text-3xl font-semibold">
            소개부터 검증까지 같은 기준으로 정렬합니다.
          </h2>
        </div>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            Spec Kit Studio는 팀이 기능을 설명하고 공유할 때 필요한 구조를
            먼저 정리합니다. 페이지, 컴포넌트, 테스트가 모두 같은 요구사항을
            기준으로 움직이도록 도와 실행 과정의 불확실성을 줄입니다.
          </p>
          <Separator />
          <p>
            실제 마케팅 카피가 준비되기 전에도 섹션 구조와 CTA 흐름을 먼저
            검증할 수 있어, 내부 이해관계자와 외부 파트너 모두에게 일관된
            메시지를 전달할 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
