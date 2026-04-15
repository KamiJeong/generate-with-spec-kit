export type PillarArea = '환경' | '사회' | '식품 안전';

export interface SustainabilityPillar {
  id: string;
  area: PillarArea;
  title: string;
  description: string;
  metric?: string;
  icon: string;
  activities: { title: string; description: string }[];
}

export const pillars: SustainabilityPillar[] = [
  {
    id: 'environment',
    area: '환경',
    title: '탄소 중립을 향한 여정',
    description:
      '기후변화 대응을 위한 탄소 배출 감축과 친환경 생산 공정 도입에 앞장섭니다.',
    metric: '2030년까지 탄소 배출 30% 감축',
    icon: 'Leaf',
    activities: [
      {
        title: '친환경 포장재 전환',
        description: '2026년까지 모든 제품 포장재를 재활용 가능 소재로 100% 교체합니다.',
      },
      {
        title: '재생에너지 전환',
        description: '태양광 발전 시설 도입으로 공장 에너지 소비의 40%를 재생에너지로 충당합니다.',
      },
    ],
  },
  {
    id: 'social',
    area: '사회',
    title: '지역사회와 함께하는 성장',
    description:
      '임직원의 성장과 지역사회 발전을 위한 다양한 사회 공헌 활동을 펼칩니다.',
    metric: '지역 협력 농가 200개 파트너십',
    icon: 'Users',
    activities: [
      {
        title: '공정 거래 원료 조달',
        description: '국내 축산 농가와의 장기 계약을 통해 안정적이고 공정한 원료 조달 체계를 구축합니다.',
      },
      {
        title: '지역사회 일자리 창출',
        description: '지역 기반 생산 거점 확대로 양질의 일자리를 창출하고 지역 경제 활성화에 기여합니다.',
      },
    ],
  },
  {
    id: 'food-safety',
    area: '식품 안전',
    title: '타협 없는 식품 안전',
    description:
      'FSSC 22000, HACCP 등 국제 최고 수준의 식품 안전 인증을 유지하며 소비자 건강을 최우선으로 합니다.',
    metric: '식품 안전 사고 제로(Zero) 달성',
    icon: 'ShieldCheck',
    activities: [
      {
        title: '원료 단계 추적 시스템',
        description: '원산지부터 식탁까지 전 과정을 추적하는 블록체인 기반 이력 관리 시스템을 도입합니다.',
      },
      {
        title: '정기 외부 감사',
        description: '분기별 제3자 식품 안전 감사를 통해 내부 기준의 지속적 개선과 투명성을 확보합니다.',
      },
    ],
  },
];

export const goal2030 = '2030년까지 탄소 배출 30% 감축, 공정 거래 원료 조달 100% 달성, 식품 안전 사고 Zero를 통해 아시아 대표 지속 가능 식품 기업으로 도약합니다.';
