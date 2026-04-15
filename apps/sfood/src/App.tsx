import type { MouseEvent } from 'react';
import { SiteFooter } from '@sfood/components/layout/SiteFooter';
import { SiteHeader } from '@sfood/components/layout/SiteHeader';
import { resolveRoute } from '@sfood/routes/route-map';
import { AboutPage } from '@sfood/pages/AboutPage';
import { BrandsPage } from '@sfood/pages/BrandsPage';
import { FaqPage } from '@sfood/pages/FaqPage';
import { HomePage } from '@sfood/pages/HomePage';
import { NewsPage } from '@sfood/pages/NewsPage';
import { NotFoundPage } from '@sfood/pages/NotFoundPage';
import { NoticePage } from '@sfood/pages/NoticePage';
import { SustainabilityPage } from '@sfood/pages/SustainabilityPage';
import { TalentPage } from '@sfood/pages/TalentPage';
import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);

  return () => {
    window.removeEventListener('popstate', callback);
  };
}

function getPathname() {
  return window.location.pathname;
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPage(pageKey: string | undefined, currentPath: string) {
  switch (pageKey) {
    case 'home':
      return <HomePage />;
    case 'about':
      return <AboutPage />;
    case 'sustainability':
      return <SustainabilityPage />;
    case 'brands':
      return <BrandsPage />;
    case 'talent':
      return <TalentPage />;
    case 'notice':
      return <NoticePage currentPath={currentPath} />;
    case 'news':
      return <NewsPage currentPath={currentPath} />;
    case 'faq':
      return <FaqPage currentPath={currentPath} />;
    default:
      return <NotFoundPage />;
  }
}

export function App() {
  const currentPath = useSyncExternalStore(subscribe, getPathname, () => '/');
  const route = resolveRoute(currentPath);

  function handleInternalLink(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a[href^="/"]');

    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    navigate(anchor.pathname);
  }

  return (
    <div
      className="min-h-svh bg-background text-foreground"
      onClick={handleInternalLink}
    >
      <SiteHeader currentPath={route?.path ?? currentPath} />
      <main>{renderPage(route?.pageKey, route?.path ?? currentPath)}</main>
      <SiteFooter />
    </div>
  );
}
