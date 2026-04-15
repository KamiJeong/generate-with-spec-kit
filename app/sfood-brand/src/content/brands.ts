export type BrandType = 'B2C' | 'B2B';

export interface Brand {
  id: string;
  name: string;
  type: BrandType;
  tagline: string;
  categories: string[];
  description: string;
  accentColor: string;
}

export const brands: Brand[] = [
  {
    id: 'joncook',
    name: '존쿡 델리미트',
    type: 'B2C',
    tagline: '유럽 정통 레시피로 만든 프리미엄 델리',
    categories: ['프리미엄 소시지', '델리 미트', '샤퀴테리'],
    description:
      '1980년대 유럽에서 전수받은 정통 레시피를 바탕으로, 최고급 돼지고기만을 엄선해 만든 프리미엄 델리 브랜드입니다. DLG 국제 품평회에서 연속 수상한 품질을 자랑합니다.',
    accentColor: '#8B1A2A',
  },
  {
    id: 'sfood-homegrill',
    name: 'SFood 홈그릴',
    type: 'B2C',
    tagline: '집에서 즐기는 BBQ의 진수',
    categories: ['BBQ 소시지', '그릴 패티', '홈파티 세트'],
    description:
      '집에서도 레스토랑 수준의 BBQ를 즐길 수 있도록 설계된 브랜드입니다. 손쉬운 조리법과 뛰어난 맛으로 가족 모임과 홈파티의 완성을 도와드립니다.',
    accentColor: '#D46B08',
  },
  {
    id: 'sfood-pro',
    name: 'SFood 프로',
    type: 'B2B',
    tagline: '외식 산업을 위한 프로페셔널 식재료',
    categories: ['업소용 소시지', '냉동 패티', '대용량 델리 미트'],
    description:
      '레스토랑, 호텔, 급식소 등 외식 업계 전문가를 위한 고품질 식재료를 공급합니다. HACCP 인증 시설에서 생산되며, 엄격한 품질 관리로 신뢰할 수 있는 일관된 맛을 보장합니다.',
    accentColor: '#1A4F7A',
  },
  {
    id: 'sfood-catering',
    name: 'SFood 캐터링',
    type: 'B2B',
    tagline: '행사와 단체 급식의 믿음직한 파트너',
    categories: ['케이터링 패키지', '단체 급식 식재료', '이벤트 메뉴 솔루션'],
    description:
      '기업 행사, 학교 급식, 대규모 케이터링 서비스에 최적화된 솔루션을 제공합니다. 메뉴 기획부터 대량 공급까지, SFood의 전문 팀이 성공적인 행사를 지원합니다.',
    accentColor: '#2D6A4F',
  },
];
