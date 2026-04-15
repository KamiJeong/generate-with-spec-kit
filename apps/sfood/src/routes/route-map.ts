export type RoutePath =
  | '/'
  | '/about'
  | '/sustainability'
  | '/brands'
  | '/talent'
  | '/support/notice'
  | '/support/news'
  | '/support/faq';

export type PageKey =
  | 'home'
  | 'about'
  | 'sustainability'
  | 'brands'
  | 'talent'
  | 'notice'
  | 'news'
  | 'faq';

export interface SiteRoute {
  path: RoutePath;
  label: string;
  title: string;
  description: string;
  navGroup: 'primary' | 'support';
  pageKey: PageKey;
  order: number;
}

export interface NavigationItem {
  label: string;
  href: RoutePath;
  group: 'primary' | 'support';
  order: number;
}

export const allRoutes: SiteRoute[] = [
  {
    path: '/',
    label: '메인',
    title: '더 좋은 식품으로 더 좋은 세상',
    description: '프리미엄 육가공 전문성과 Meal Solution으로 새로운 식문화를 제안합니다.',
    navGroup: 'primary',
    pageKey: 'home',
    order: 1,
  },
  {
    path: '/about',
    label: '회사소개',
    title: '좋은 식품의 기준을 새롭게 만듭니다',
    description: 'SFood가 쌓아 온 식품 전문성과 밝은 기업 철학을 소개합니다.',
    navGroup: 'primary',
    pageKey: 'about',
    order: 2,
  },
  {
    path: '/sustainability',
    label: '지속 가능성',
    title: '미래를 위한 맛있는 책임',
    description: '더 건강한 식품 생태계를 향한 SFood의 지속 가능성 이야기를 전합니다.',
    navGroup: 'primary',
    pageKey: 'sustainability',
    order: 3,
  },
  {
    path: '/brands',
    label: '브랜드',
    title: 'SFood 브랜드와 Meal Solution',
    description: '소비자 브랜드와 비즈니스 솔루션을 함께 성장시키는 포트폴리오입니다.',
    navGroup: 'primary',
    pageKey: 'brands',
    order: 4,
  },
  {
    path: '/talent',
    label: '인재 채용',
    title: '함께 더 좋은 식문화를 만드는 사람들',
    description: '도전과 협업으로 성장하는 SFood의 인재상과 채용 여정을 소개합니다.',
    navGroup: 'primary',
    pageKey: 'talent',
    order: 5,
  },
  {
    path: '/support/notice',
    label: '공지사항',
    title: '공지사항',
    description: 'SFood의 주요 운영 안내와 공식 소식을 목록으로 확인합니다.',
    navGroup: 'support',
    pageKey: 'notice',
    order: 6,
  },
  {
    path: '/support/news',
    label: '회사소식',
    title: '회사소식',
    description: '제품, 품질, 문화, 지속 가능성에 관한 SFood의 이야기를 전합니다.',
    navGroup: 'support',
    pageKey: 'news',
    order: 7,
  },
  {
    path: '/support/faq',
    label: 'FAQ',
    title: '자주 묻는 질문',
    description: '브랜드, 제품, 품질, 제휴, 채용에 관한 답변을 빠르게 확인합니다.',
    navGroup: 'support',
    pageKey: 'faq',
    order: 8,
  },
];

export const primaryRoutes = allRoutes.filter((route) => route.navGroup === 'primary');
export const supportRoutes = allRoutes.filter((route) => route.navGroup === 'support');

export const navigationItems: NavigationItem[] = allRoutes.map((route) => ({
  label: route.label,
  href: route.path,
  group: route.navGroup,
  order: route.order,
}));

export function resolveRoute(pathname: string): SiteRoute | undefined {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

  return allRoutes.find((route) => route.path === normalizedPath);
}
