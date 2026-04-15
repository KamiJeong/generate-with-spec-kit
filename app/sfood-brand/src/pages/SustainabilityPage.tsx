import { useEffect } from 'react';

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PillarSection } from '@sfood/components/sections/sustainability/PillarSection';
import { SectionHero } from '@sfood/components/ui/SectionHero';
import { goal2030, pillars } from '@sfood/content/sustainability';

export function SustainabilityPage() {
  useEffect(() => { document.title = '지속가능성 | SFood'; }, []);
  return (
    <>
      <SectionHero
        title="지속가능성"
        subtitle="더 나은 미래를 위한 SFood의 약속"
        bgColor="bg-green-700"
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            SFood는 맛있는 식품을 만드는 것을 넘어, 지속 가능한 방식으로 지구와 사람 모두에게
            이로운 기업이 되고자 합니다.
          </p>
        </div>
      </section>

      {pillars.map((pillar, index) => (
        <PillarSection key={pillar.id} pillar={pillar} reversed={index % 2 === 1} />
      ))}

      <section className="bg-sfood-dark py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">2030 지속가능 목표</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">{goal2030}</p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-sfood-red px-6 py-3 text-sm font-semibold text-white hover:bg-sfood-red/90"
          >
            SFood 더 알아보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
