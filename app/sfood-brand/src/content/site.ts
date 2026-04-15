export interface SubNavItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: SubNavItem[];
}

export interface SiteConfig {
  name: string;
  nameKo: string;
  tagline: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  name: 'SFood',
  nameKo: '에쓰푸드',
  tagline: '더 좋은 식품으로 더 좋은 세상을',
  description: 'SFood(에쓰푸드) — 프리미엄 육가공 식품 전문 기업',
};

export const navItems: NavItem[] = [
  { label: '홈', href: '/' },
  { label: '회사소개', href: '/about' },
  { label: '지속가능성', href: '/sustainability' },
  { label: '브랜드', href: '/brands' },
  { label: '인재채용', href: '/talent' },
  {
    label: '고객지원',
    href: '/support/notice',
    children: [
      { label: '공지사항', href: '/support/notice' },
      { label: '회사소식', href: '/support/news' },
      { label: '자주 묻는 질문', href: '/support/faq' },
    ],
  },
];
