export type PagePath =
  | '/'
  | '/about'
  | '/sustainability'
  | '/brands'
  | '/talent'
  | '/support/notice'
  | '/support/news'
  | '/support/faq';

export interface PageRoute {
  path: PagePath;
  label: string;
  navGroup?: 'support';
  pageTitle: string;
  description: string;
}

export const pageRoutes: readonly PageRoute[] = [
  {
    path: '/',
    label: '홈',
    pageTitle: 'SFood',
    description: 'SFood 브랜드의 미션, 품질, 제품군, 최신 소식',
  },
  {
    path: '/about',
    label: '회사소개',
    pageTitle: '회사소개',
    description: 'SFood의 미션, 비전, 가치, 품질 인증',
  },
  {
    path: '/sustainability',
    label: '지속가능성',
    pageTitle: '지속가능성',
    description: '지속 가능한 식품 생태계를 위한 ESG 실행',
  },
  {
    path: '/brands',
    label: '브랜드',
    pageTitle: '브랜드',
    description: 'B2B와 B2C 브랜드 라인업',
  },
  {
    path: '/talent',
    label: '인재채용',
    pageTitle: '인재채용',
    description: 'SFood의 채용 철학, 문화, 프로세스',
  },
  {
    path: '/support/notice',
    label: '공지사항',
    navGroup: 'support',
    pageTitle: '공지사항',
    description: 'SFood의 주요 안내와 공지',
  },
  {
    path: '/support/news',
    label: '회사소식',
    navGroup: 'support',
    pageTitle: '회사소식',
    description: 'SFood의 최근 활동과 브랜드 뉴스',
  },
  {
    path: '/support/faq',
    label: 'FAQ',
    navGroup: 'support',
    pageTitle: 'FAQ',
    description: '고객과 파트너가 자주 묻는 질문',
  },
] as const;

export const topLevelNavItems = pageRoutes.filter((route) => !route.navGroup);
export const supportNavItems = pageRoutes.filter(
  (route) => route.navGroup === 'support'
);

export function getRouteByPath(pathname: string): PageRoute | undefined {
  return pageRoutes.find((route) => route.path === pathname);
}

export function isPagePath(pathname: string): pathname is PagePath {
  return Boolean(getRouteByPath(pathname));
}
