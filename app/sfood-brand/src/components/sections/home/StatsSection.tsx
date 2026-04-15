const stats = [
  {
    value: '1983',
    label: '설립 연도',
    description: '40년 이상의 육가공 전문 경험',
  },
  {
    value: '12년',
    label: 'DLG 수상',
    description: 'DLG 국제 품평회 연속 수상',
  },
  {
    value: '200+',
    label: '제품 라인업',
    description: '소시지부터 델리 미트까지 다양한 제품군',
  },
];

export function StatsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-100 p-8 text-center shadow-sm"
            >
              <div className="text-4xl font-bold text-sfood-red">{stat.value}</div>
              <div className="mt-2 text-lg font-semibold text-sfood-dark">{stat.label}</div>
              <div className="mt-1 text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
