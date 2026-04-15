export interface TalentPersona {
  keyword: string;
  description: string;
  icon: string;
}

export interface HiringStep {
  order: number;
  title: string;
  description: string;
}

export interface Benefit {
  category: '복지' | '성장' | '보상';
  title: string;
  description: string;
  icon: string;
}

export const personas: TalentPersona[] = [
  {
    keyword: '도전',
    description: '새로운 것을 두려워하지 않고 끊임없이 도전하며 변화를 이끄는 인재',
    icon: 'Rocket',
  },
  {
    keyword: '협업',
    description: '동료와 함께 시너지를 만들어내고 공동의 목표를 향해 나아가는 팀플레이어',
    icon: 'Users',
  },
  {
    keyword: '전문성',
    description: '자신의 분야에서 깊이 있는 전문 지식과 경험을 갖추고 지속적으로 성장하는 인재',
    icon: 'Star',
  },
];

export const hiringSteps: HiringStep[] = [
  {
    order: 1,
    title: '서류 접수',
    description: '온라인 지원서 및 이력서 제출. 자기소개서에 SFood와 함께하고 싶은 이유를 담아주세요.',
  },
  {
    order: 2,
    title: '서류 심사',
    description: '지원서 검토 후 2주 이내 합격 여부를 이메일로 안내드립니다.',
  },
  {
    order: 3,
    title: '면접',
    description: '1차 직무 역량 면접 + 2차 임원 면접. 직무와 조직 문화 적합성을 확인합니다.',
  },
  {
    order: 4,
    title: '최종 합격',
    description: '처우 협의 후 최종 합격 통보. 입사 전 오리엔테이션 일정을 안내드립니다.',
  },
];

export const benefits: Benefit[] = [
  {
    category: '복지',
    title: '유연 근무제',
    description: '코어 타임 기반 자율 출퇴근으로 일과 삶의 균형을 지원합니다.',
    icon: 'Clock',
  },
  {
    category: '복지',
    title: '자녀 교육 지원',
    description: '임직원 자녀 학자금 지원 및 어린이집 운영으로 가족 친화 환경을 제공합니다.',
    icon: 'GraduationCap',
  },
  {
    category: '성장',
    title: '교육 훈련비 지원',
    description: '연간 200만 원의 자기 계발 교육비를 지원하며 직무 관련 외부 교육을 권장합니다.',
    icon: 'BookOpen',
  },
  {
    category: '성장',
    title: '사내 멘토링',
    description: '시니어 전문가와 1:1 멘토링 프로그램으로 빠른 성장을 돕습니다.',
    icon: 'Users',
  },
  {
    category: '보상',
    title: '성과 인센티브',
    description: '개인 및 팀 성과에 따른 분기별 인센티브와 연간 성과급을 지급합니다.',
    icon: 'TrendingUp',
  },
  {
    category: '보상',
    title: '임직원 할인',
    description: 'SFood 전 브랜드 제품을 임직원 특별 가격으로 구매할 수 있는 혜택을 제공합니다.',
    icon: 'Gift',
  },
];
