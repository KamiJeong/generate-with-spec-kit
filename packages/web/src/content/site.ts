import {
  Bot,
  ClipboardCheck,
  GitPullRequestArrow,
  type LucideIcon,
  Route,
} from 'lucide-react';

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export const siteConfig: SiteConfig = {
  name: 'Spec Kit Studio',
  tagline: '명확한 스펙에서 바로 실행 가능한 제품 경험을 만듭니다.',
  description:
    '요구사항, 계획, 구현, 검증을 하나의 흐름으로 연결해 팀이 더 빠르고 예측 가능하게 서비스를 소개하고 개선할 수 있도록 돕습니다.',
  ctaLabel: '문의하기',
};

export const navItems: NavItem[] = [
  { label: '홈', href: '#hero' },
  { label: '서비스 소개', href: '#about' },
  { label: '강점', href: '#features' },
  { label: '신뢰 지표', href: '#trust' },
  { label: '문의', href: '#contact' },
];

export const features: Feature[] = [
  {
    icon: ClipboardCheck,
    title: '스펙 우선 정렬',
    description:
      '아이디어를 바로 구현하지 않고 요구사항과 검증 기준부터 정리해 팀의 해석 차이를 줄입니다.',
  },
  {
    icon: Route,
    title: '실행 가능한 계획',
    description:
      '기술 선택과 파일 구조, 테스트 전략을 구현 전에 고정해 작업 순서를 분명하게 만듭니다.',
  },
  {
    icon: Bot,
    title: 'AI 협업 최적화',
    description:
      '에이전트가 따라갈 수 있는 산출물을 남겨 반복 작업과 리뷰 흐름을 안정적으로 유지합니다.',
  },
  {
    icon: GitPullRequestArrow,
    title: '검토 가능한 변경',
    description:
      '기능 의도와 실제 구현의 차이를 추적해 공유와 외부 검토에 필요한 근거를 제공합니다.',
  },
];

export const stats: Stat[] = [
  { value: '5', label: '스펙 기반 작업 단계' },
  { value: '3x', label: '요구사항 리뷰 속도 향상 목표' },
  { value: '0', label: '불필요한 서버 의존성' },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      '짧은 소개 페이지도 스펙과 검증 흐름을 남기니 외부 공유 전에 팀 내부 합의가 훨씬 쉬워졌습니다.',
    author: 'Jina Park',
    role: 'Product Lead',
    initials: 'JP',
  },
  {
    quote:
      '디자인 시스템 컴포넌트로 구성되어 있어서 새 페이지를 검토할 때 접근성과 일관성을 먼저 확인할 수 있었습니다.',
    author: 'Min Lee',
    role: 'Design Engineer',
    initials: 'ML',
  },
];
