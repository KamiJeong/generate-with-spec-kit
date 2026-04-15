import type { PageKey } from '@sfood/routes/route-map';

export interface PageContent {
  title: string;
  eyebrow: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  highlights: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface BrandLine {
  name: string;
  audience: 'consumer' | 'business';
  positioning: string;
  categories: string[];
  summary: string;
  proofPoint: string;
}

export interface ContentEntry {
  type: 'notice' | 'news';
  title: string;
  dateLabel: string;
  category: string;
  summary: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'brand' | 'product' | 'quality' | 'business' | 'talent';
  order: number;
}

export interface HiringStep {
  step: number;
  title: string;
  description: string;
}

export const siteIdentity = {
  name: 'SFood',
  koreanName: '에쓰푸드',
  mission: '더 좋은 식품으로 더 좋은 세상',
  tagline: '프리미엄 육가공에서 시작해 새로운 식문화를 여는 Meal Solution 기업',
  description:
    '햄, 소시지, 베이컨, 바비큐 전문성을 바탕으로 치즈, 빵, 소스, HMR까지 확장하며 맛있는 일상의 기준을 높입니다.',
};

export const pageContent: Record<PageKey, PageContent> = {
  home: {
    title: '더 좋은 식품으로 더 좋은 세상',
    eyebrow: 'SFood Premium Food Culture',
    description:
      '정통 육제품의 깊은 맛과 새로운 식문화 제안을 함께 담아, 오늘의 식탁과 내일의 Meal Solution을 힘차게 연결합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
      alt: '신선한 재료와 소시지가 놓인 밝은 식탁',
    },
    highlights: ['프리미엄 육가공 전문성', 'B2B와 B2C를 잇는 브랜드 구조', '일상을 바꾸는 Meal Solution'],
  },
  about: {
    title: '좋은 식품의 기준을 새롭게 만듭니다',
    eyebrow: 'About SFood',
    description:
      'SFood는 정직한 원료 감각, 안정적인 생산 노하우, 즐거운 식문화 제안으로 더 넓은 식품 경험을 만듭니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
      alt: '깨끗한 주방에서 식재료를 준비하는 모습',
    },
    highlights: ['육가공 기반의 식품 전문성', '소비자와 파트너를 함께 생각하는 구조', '검증 중심의 품질 문화'],
  },
  sustainability: {
    title: '미래를 위한 맛있는 책임',
    eyebrow: 'Sustainable Food Story',
    description:
      '좋은 식품은 맛에서 끝나지 않습니다. SFood는 원료, 생산, 지역사회, 식문화가 함께 건강해지는 미래를 바라봅니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?auto=format&fit=crop&w=1200&q=80',
      alt: '밝은 자연 속에서 자라는 식재료',
    },
    highlights: ['책임 있는 원료 선택', '효율적인 생산 개선', '함께 나누는 식품 생태계'],
  },
  brands: {
    title: 'SFood 브랜드와 Meal Solution',
    eyebrow: 'Brand Portfolio',
    description:
      '새로운 맛과 문화를 제안하는 소비자 브랜드, 안정적인 품질과 활용성을 제공하는 비즈니스 솔루션을 함께 운영합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      alt: '그릴 위에서 조리되는 육제품',
    },
    highlights: ['소비자 브랜드', '비즈니스 솔루션', '폭넓은 제품 카테고리'],
  },
  talent: {
    title: '함께 더 좋은 식문화를 만드는 사람들',
    eyebrow: 'SFood Talent',
    description:
      'SFood는 맛을 연구하고, 기준을 높이고, 밝은 협업으로 더 좋은 식문화를 만드는 사람들과 성장합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
      alt: '밝은 공간에서 협업하는 사람들',
    },
    highlights: ['도전하는 태도', '정직한 품질 감각', '함께 성장하는 팀워크'],
  },
  notice: {
    title: '공지사항',
    eyebrow: 'SFood Notice',
    description:
      'SFood의 운영 안내와 공식 공지를 한눈에 확인할 수 있도록 핵심 내용만 간결하게 전합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      alt: '공지 문서와 펜이 놓인 책상',
    },
    highlights: ['공식 안내', '운영 일정', '브랜드 공지'],
  },
  news: {
    title: '회사소식',
    eyebrow: 'SFood News',
    description:
      '제품 연구, 식문화 활동, 지속 가능성 실천처럼 SFood가 만들어 가는 활기찬 변화를 전합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
      alt: '뉴스 자료와 커피가 놓인 테이블',
    },
    highlights: ['제품 이야기', '브랜드 문화', '미래 식품 활동'],
  },
  faq: {
    title: '자주 묻는 질문',
    eyebrow: 'SFood FAQ',
    description:
      'SFood 브랜드, 제품, 품질, 제휴, 채용에 대해 자주 묻는 질문을 빠르게 확인하세요.',
    image: {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      alt: '노트북으로 정보를 확인하는 모습',
    },
    highlights: ['브랜드 답변', '제품 안내', '제휴와 채용'],
  },
};

export const homeStats: Stat[] = [
  { value: '4', label: '햄, 소시지, 베이컨, 바비큐 핵심 카테고리' },
  { value: '2', label: 'B2B와 B2C를 함께 키우는 브랜드 축' },
  { value: '1', label: '더 좋은 식품으로 더 좋은 세상을 만드는 미션' },
];

export const homePillars = [
  {
    title: '정통 육제품 전문성',
    description:
      '깊은 풍미와 안정적인 식감을 위해 원료 선별부터 조리 경험까지 세밀하게 설계합니다.',
  },
  {
    title: 'Meal Solution 확장',
    description:
      '치즈, 빵, 소스, HMR까지 넓혀 매장과 가정에서 바로 활용할 수 있는 식사 경험을 제안합니다.',
  },
  {
    title: '새로운 맛과 문화',
    description:
      '프리미엄 감각의 소비자 브랜드와 현장 맞춤형 비즈니스 솔루션으로 더 즐거운 식문화를 만듭니다.',
  },
];

export const aboutValues = [
  {
    title: '식품 전문성',
    description:
      '햄과 소시지에서 시작한 노하우를 다양한 식품 카테고리로 넓혀 완성도 높은 한 끼를 설계합니다.',
  },
  {
    title: '품질 중심 운영',
    description:
      '원료 확인, 생산 위생, 맛 평가, 출고 전 점검을 연결해 신뢰할 수 있는 품질 흐름을 만듭니다.',
  },
  {
    title: '함께 성장하는 구조',
    description:
      '파트너에게는 안정적인 솔루션을, 소비자에게는 새로운 맛과 문화를 제공하는 균형을 지향합니다.',
  },
];

export const sustainabilityThemes = [
  {
    title: '책임 있는 원료',
    description:
      '좋은 식품의 출발점을 원료에서 찾고, 더 투명하고 안정적인 공급 흐름을 꾸준히 넓혀 갑니다.',
  },
  {
    title: '효율적인 생산',
    description:
      '불필요한 낭비를 줄이고 생산 과정의 에너지와 자원 사용을 살피며 더 나은 공정을 고민합니다.',
  },
  {
    title: '함께 나누는 식문화',
    description:
      '지역사회와 파트너가 함께 즐길 수 있는 식문화 활동을 통해 지속 가능한 식품 생태계를 키웁니다.',
  },
  {
    title: '미래 식탁 연구',
    description:
      'HMR과 Meal Solution 연구를 통해 바쁜 일상에서도 균형 있는 식사를 즐길 수 있는 선택지를 만듭니다.',
  },
];

export const brandLines: BrandLine[] = [
  {
    name: 'SFood Pro Kitchen',
    audience: 'business',
    positioning: '외식, 급식, 리테일 현장을 위한 안정적인 Meal Solution',
    categories: ['햄', '소시지', '베이컨', '바비큐', '소스'],
    summary:
      '조리 편의성과 일정한 품질이 필요한 현장에 맞춰 활용도 높은 육가공 및 식사 솔루션을 제공합니다.',
    proofPoint: '입고부터 출고까지 이어지는 품질 점검 흐름',
  },
  {
    name: 'SFood Deli Culture',
    audience: 'consumer',
    positioning: '새로운 맛과 문화를 제안하는 프리미엄 델리 브랜드',
    categories: ['소시지', '바비큐', '치즈', '빵', 'HMR'],
    summary:
      '집에서도 근사한 델리 경험을 즐길 수 있도록 맛, 조합, 분위기를 함께 설계한 소비자 브랜드입니다.',
    proofPoint: '맛 평가와 레시피 검토를 반복하는 제품 개발 방식',
  },
  {
    name: 'SFood Table Lab',
    audience: 'business',
    positioning: '파트너 메뉴 개발을 돕는 식문화 연구 라인',
    categories: ['베이컨', '치즈', '빵', '소스', 'HMR'],
    summary:
      '브랜드와 매장의 콘셉트에 맞춰 메뉴 조합, 운영 효율, 고객 경험을 함께 고민하는 솔루션입니다.',
    proofPoint: '현장 피드백을 반영하는 샘플링과 개선 프로세스',
  },
];

export const talentValues = [
  {
    title: '맛을 끝까지 탐구하는 사람',
    description: '작은 차이가 만드는 즐거움을 알고 더 나은 한 입을 위해 질문합니다.',
  },
  {
    title: '품질 앞에서 정직한 사람',
    description: '빠른 결과보다 신뢰를 먼저 생각하고 기준을 지키는 태도로 일합니다.',
  },
  {
    title: '함께 크게 성장하는 사람',
    description: '동료, 파트너, 고객의 관점을 연결하며 더 큰 식문화를 만듭니다.',
  },
];

export const hiringSteps: HiringStep[] = [
  {
    step: 1,
    title: '지원서 접수',
    description: '경험과 관심 직무를 바탕으로 SFood와 함께 만들고 싶은 식문화를 들려주세요.',
  },
  {
    step: 2,
    title: '직무 적합성 검토',
    description: '지원자의 경험, 강점, 성장 방향이 직무와 어떻게 연결되는지 살펴봅니다.',
  },
  {
    step: 3,
    title: '인터뷰',
    description: '일하는 방식, 문제 해결 태도, 협업 경험을 중심으로 서로를 이해합니다.',
  },
  {
    step: 4,
    title: '최종 안내',
    description: '함께할 준비가 되었는지 확인하고 다음 여정을 위한 안내를 전달합니다.',
  },
];

export const contentEntries: ContentEntry[] = [
  {
    type: 'notice',
    title: 'SFood 브랜드 사이트 리뉴얼 안내',
    dateLabel: '2026.04.15',
    category: '브랜드',
    summary:
      'SFood의 미션, 브랜드, 지속 가능성, 채용 정보를 더 쉽고 밝은 흐름으로 확인할 수 있도록 사이트 구성을 새롭게 정리했습니다.',
  },
  {
    type: 'notice',
    title: '프리미엄 소시지 샘플 운영 일정 안내',
    dateLabel: '2026.04.08',
    category: '제품',
    summary:
      '파트너 대상 프리미엄 소시지 샘플 운영 일정과 기본 확인 항목을 안내하며, 세부 상담은 담당 채널을 통해 순차적으로 진행됩니다.',
  },
  {
    type: 'notice',
    title: '품질 점검 프로세스 정기 업데이트',
    dateLabel: '2026.03.28',
    category: '품질',
    summary:
      '더 안정적인 제품 경험을 위해 원료 확인, 생산 환경 점검, 맛 평가 흐름을 정기적으로 정비하고 있습니다.',
  },
  {
    type: 'news',
    title: '새로운 바비큐 Meal Solution 테스트 진행',
    dateLabel: '2026.04.10',
    category: '제품 연구',
    summary:
      '매장과 가정에서 모두 활용하기 쉬운 바비큐 Meal Solution을 목표로 조리 편의성과 풍미 균형을 함께 테스트했습니다.',
  },
  {
    type: 'news',
    title: 'SFood Table Lab 식문화 워크숍 개최',
    dateLabel: '2026.04.02',
    category: '브랜드 문화',
    summary:
      '파트너와 함께 메뉴 조합과 고객 경험을 탐구하는 워크숍을 열고, 현장에서 바로 활용할 수 있는 아이디어를 나눴습니다.',
  },
  {
    type: 'news',
    title: '미래 식품 생태계를 위한 포장 개선 실험',
    dateLabel: '2026.03.21',
    category: '지속 가능성',
    summary:
      '제품 보호와 자원 절감을 함께 고려하는 포장 개선 실험을 진행하며 더 책임 있는 식품 경험을 준비하고 있습니다.',
  },
];

export const faqItems: FAQItem[] = [
  {
    category: 'brand',
    order: 1,
    question: 'SFood는 어떤 브랜드인가요?',
    answer:
      'SFood는 프리미엄 육가공 전문성을 바탕으로 새로운 식문화와 Meal Solution을 제안하는 가상의 식품 브랜드입니다.',
  },
  {
    category: 'product',
    order: 2,
    question: '어떤 제품군을 다루나요?',
    answer:
      '햄, 소시지, 베이컨, 바비큐를 중심으로 치즈, 빵, 소스, HMR까지 식사 경험을 넓히는 제품군을 다룹니다.',
  },
  {
    category: 'quality',
    order: 3,
    question: '품질은 어떻게 설명하나요?',
    answer:
      '첫 버전에서는 검증된 실명 주장 대신 원료 확인, 생산 위생, 맛 평가, 출고 전 점검 같은 일반화된 품질 신뢰 표현을 사용합니다.',
  },
  {
    category: 'business',
    order: 4,
    question: '비즈니스 제휴 관점에서는 무엇을 제공하나요?',
    answer:
      '외식, 급식, 리테일 현장에서 활용할 수 있는 육가공 제품과 Meal Solution 아이디어를 함께 제안합니다.',
  },
  {
    category: 'talent',
    order: 5,
    question: '채용 페이지에서 실제 지원이 가능한가요?',
    answer:
      '현재 버전은 인재상과 채용 프로세스를 소개하는 정적 페이지이며, 개인정보 입력이나 실제 지원서 제출은 제공하지 않습니다.',
  },
];
