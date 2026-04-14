import type { PagePath } from '@sfood/routing/routes';

export interface ImageAsset {
  src: string;
  alt: string;
  loading?: 'eager' | 'lazy';
}

export interface SiteConfig {
  name: 'SFood';
  tagline: string;
  mission: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaPath: PagePath;
}

export type BrandType = 'B2B' | 'B2C';

export interface Brand {
  id: string;
  name: string;
  type: BrandType;
  slogan: string;
  productCategories: string[];
  image: ImageAsset;
}

export interface ProductCategory {
  id: string;
  name: '햄' | '소시지' | '베이컨' | '바비큐' | '치즈' | '빵' | '소스' | 'HMR';
  iconName: string;
  description: string;
}

export type ArticleType = 'notice' | 'news';

export interface Article {
  id: string;
  type: ArticleType;
  title: string;
  date: string;
  category: string;
  summary: string;
  body?: string;
  image?: ImageAsset;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface HiringStep {
  step: 1 | 2 | 3 | 4;
  title: string;
  description: string;
}

export interface SustainabilityMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  targetValue: number;
  description: string;
}

export interface Certification {
  id: string;
  name: 'FSSC 22000' | 'HACCP' | 'DLG';
  description: string;
  badgeLabel: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const heroImage: ImageAsset = {
  src: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80',
  alt: '프리미엄 육가공 제품과 신선한 재료가 놓인 SFood 브랜드 테이블',
  loading: 'eager',
};

export const siteConfig: SiteConfig = {
  name: 'SFood',
  tagline: '프리미엄 식품으로 완성하는 더 좋은 일상',
  mission: '더 좋은 식품으로 더 좋은 세상을 만든다',
  description:
    'SFood는 품질 인증과 지속 가능한 생산 기준으로 B2B 파트너와 소비자에게 신뢰할 수 있는 육가공 식품을 제공합니다.',
  primaryCtaLabel: '브랜드 라인업 보기',
  primaryCtaPath: '/brands',
};

export const productCategories: ProductCategory[] = [
  {
    id: 'ham',
    name: '햄',
    iconName: 'Sandwich',
    description: '샌드위치, 델리, 외식 메뉴에 맞춘 균일한 품질의 햄',
  },
  {
    id: 'sausage',
    name: '소시지',
    iconName: 'Utensils',
    description: '풍부한 육즙과 안정적인 식감을 갖춘 프리미엄 소시지',
  },
  {
    id: 'bacon',
    name: '베이컨',
    iconName: 'Flame',
    description: '훈연 향과 두께를 목적별로 설계한 베이컨 라인',
  },
  {
    id: 'barbecue',
    name: '바비큐',
    iconName: 'ChefHat',
    description: '간편 조리와 외식 채널에 대응하는 바비큐 제품군',
  },
  {
    id: 'hmr',
    name: 'HMR',
    iconName: 'PackageCheck',
    description: '소비자 경험을 빠르게 완성하는 가정간편식 솔루션',
  },
];

export const brands: Brand[] = [
  {
    id: 'chef-partner',
    name: 'Chef Partner',
    type: 'B2B',
    slogan: '주방의 표준을 안정적으로 공급합니다',
    productCategories: ['햄', '소시지', '베이컨'],
    image: {
      src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
      alt: '전문 주방에서 식재료를 준비하는 Chef Partner 브랜드 이미지',
      loading: 'lazy',
    },
  },
  {
    id: 'food-service-lab',
    name: 'Food Service Lab',
    type: 'B2B',
    slogan: '외식 메뉴 개발을 위한 맞춤형 식품 솔루션',
    productCategories: ['바비큐', '소스', 'HMR'],
    image: {
      src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
      alt: '메뉴 개발 테이블 위의 Food Service Lab 제품 샘플',
      loading: 'lazy',
    },
  },
  {
    id: 'daily-table',
    name: 'Daily Table',
    type: 'B2C',
    slogan: '매일의 식탁을 간편하고 풍성하게',
    productCategories: ['햄', '소시지', '치즈'],
    image: {
      src: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80',
      alt: '가정 식탁에 차려진 Daily Table 제품과 샐러드',
      loading: 'lazy',
    },
  },
  {
    id: 'good-meal',
    name: 'Good Meal',
    type: 'B2C',
    slogan: '더 좋은 한 끼를 위한 간편식',
    productCategories: ['HMR', '빵', '바비큐'],
    image: {
      src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      alt: '완성된 Good Meal 간편식 바비큐 플레이트',
      loading: 'lazy',
    },
  },
];

export const certifications: Certification[] = [
  {
    id: 'fssc-22000',
    name: 'FSSC 22000',
    badgeLabel: 'Food Safety',
    description: '국제 식품 안전 관리 체계 기준에 맞춘 생산 운영',
  },
  {
    id: 'haccp',
    name: 'HACCP',
    badgeLabel: 'Hazard Control',
    description: '위해 요소 분석과 중요 관리점 기반의 안전 관리',
  },
  {
    id: 'dlg',
    name: 'DLG',
    badgeLabel: 'Quality Award',
    description: '품질 평가 기준을 통과한 제품 경쟁력',
  },
];

export const articles: Article[] = [
  {
    id: 'notice-2026-quality',
    type: 'notice',
    title: '2026년 품질 인증 갱신 안내',
    date: '2026-04-02',
    category: '품질',
    summary: 'FSSC 22000 및 HACCP 인증 갱신 절차가 완료되었습니다.',
  },
  {
    id: 'news-2026-esg',
    type: 'news',
    title: '재활용 포장 전환 프로젝트 확대',
    date: '2026-03-28',
    category: '지속가능성',
    summary: '주요 HMR 라인에 재활용 가능 포장재 적용을 확대합니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      alt: '재활용 포장재와 녹색 잎이 놓인 지속가능성 이미지',
      loading: 'lazy',
    },
  },
  {
    id: 'news-2026-brand',
    type: 'news',
    title: 'Daily Table 신제품 라인 공개',
    date: '2026-03-15',
    category: '브랜드',
    summary: '간편 조리 햄과 소시지 신제품을 소비자 채널에 선보입니다.',
    image: {
      src: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1200&q=80',
      alt: '신제품 식품 패키지와 조리된 소시지 플레이트',
      loading: 'lazy',
    },
  },
  {
    id: 'notice-2026-holiday',
    type: 'notice',
    title: '파트너 주문 마감 일정 안내',
    date: '2026-02-20',
    category: '물류',
    summary: '연휴 기간 B2B 파트너 주문과 출고 마감 일정을 안내합니다.',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-b2b',
    category: 'B2B',
    question: 'B2B 제품 상담은 어떻게 신청하나요?',
    answer: '고객지원 채널로 회사명, 필요 제품군, 예상 물량을 남기면 담당자가 검토 후 연락합니다.',
  },
  {
    id: 'faq-certification',
    category: '품질',
    question: '품질 인증 자료를 받을 수 있나요?',
    answer: '파트너 계약 검토 단계에서 FSSC 22000, HACCP, DLG 관련 자료를 제공합니다.',
  },
  {
    id: 'faq-storage',
    category: '제품',
    question: '제품 보관 기준은 어디에서 확인하나요?',
    answer: '제품 패키지와 거래 명세서의 보관 기준을 우선 확인하고, 추가 문의는 고객지원으로 접수합니다.',
  },
];

export const hiringSteps: HiringStep[] = [
  {
    step: 1,
    title: '서류',
    description: '직무 적합성과 성장 경험을 중심으로 검토합니다.',
  },
  {
    step: 2,
    title: '1차 면접',
    description: '직무 역량과 협업 방식을 실무진과 함께 확인합니다.',
  },
  {
    step: 3,
    title: '2차 면접',
    description: '가치관, 문제 해결 방식, 장기 성장 가능성을 논의합니다.',
  },
  {
    step: 4,
    title: '최종 합격',
    description: '처우 협의와 온보딩 일정을 확정합니다.',
  },
];

export const sustainabilityMetrics: SustainabilityMetric[] = [
  {
    id: 'carbon',
    label: '탄소 배출 저감',
    value: 18,
    unit: '%',
    targetValue: 30,
    description: '고효율 설비와 물류 동선 개선으로 배출량을 줄입니다.',
  },
  {
    id: 'recycled-packaging',
    label: '재활용 포장 전환',
    value: 64,
    unit: '%',
    targetValue: 80,
    description: '주요 소비자 제품군에 재활용 가능 포장재를 적용합니다.',
  },
  {
    id: 'local-partner',
    label: '지역 파트너 협력',
    value: 42,
    unit: '곳',
    targetValue: 50,
    description: '지역 공급망과 사회 공헌 프로그램을 함께 운영합니다.',
  },
];

export const companyTimeline: TimelineItem[] = [
  {
    year: '2016',
    title: 'SFood 품질 연구소 설립',
    description: '제품 개발과 식품 안전 검증을 전담하는 연구 조직을 구성했습니다.',
  },
  {
    year: '2019',
    title: 'B2B 파트너 솔루션 확대',
    description: '외식, 급식, 델리 채널에 맞춘 맞춤형 제품 공급 체계를 확장했습니다.',
  },
  {
    year: '2023',
    title: '지속가능 패키징 전환',
    description: '주요 소비자 제품군에 재활용 가능 포장재를 단계적으로 도입했습니다.',
  },
  {
    year: '2026',
    title: '통합 브랜드 사이트 공개',
    description: '브랜드, 품질, 지속가능성 정보를 하나의 디지털 경험으로 연결했습니다.',
  },
];

export const cultureValues = ['정직한 품질', '빠른 실행', '파트너십', '지속 가능한 성장'];
export const benefits = ['유연 근무 제도', '자기계발 지원', '건강 검진', '식품 연구 체험 프로그램'];

function sortArticlesByDateDesc(items: Article[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestArticles(limit = 2) {
  return sortArticlesByDateDesc(articles).slice(0, limit);
}

export function getNoticeArticles() {
  return sortArticlesByDateDesc(
    articles.filter((article) => article.type === 'notice')
  );
}

export function getNewsArticles() {
  return sortArticlesByDateDesc(
    articles.filter((article) => article.type === 'news')
  );
}
