import { Heart, Lightbulb, Shield } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: '혁신',
    description: '끊임없는 연구 개발로 더 나은 맛과 품질을 추구합니다.',
  },
  {
    icon: Shield,
    title: '안전',
    description: 'HACCP, FSSC 22000 인증 기반의 철저한 식품 안전 관리를 실천합니다.',
  },
  {
    icon: Heart,
    title: '책임',
    description: '사람과 환경에 대한 책임감 있는 기업 운영을 약속합니다.',
  },
];

export function MissionSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-sfood-dark">미션 & 비전</h2>
          <p className="mt-4 text-xl font-semibold text-sfood-red">
            더 좋은 식품으로 더 좋은 세상을
          </p>
          <p className="mt-4 text-gray-600">
            SFood는 최고 품질의 육가공 식품을 통해 사람들의 식탁을 풍요롭게 하고,
            건강하고 지속 가능한 식품 문화를 만들어 나갑니다.
          </p>
          <div className="mt-4 rounded-lg bg-sfood-cream px-6 py-4">
            <p className="font-semibold text-sfood-dark">비전 2030</p>
            <p className="mt-1 text-gray-600">
              아시아를 대표하는 프리미엄 육가공 식품 기업으로 도약
            </p>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-xl border border-gray-100 p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sfood-red-light">
                  <Icon className="h-6 w-6 text-sfood-red" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-sfood-dark">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
