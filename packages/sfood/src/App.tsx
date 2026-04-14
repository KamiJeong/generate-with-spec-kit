import { SiteFooter } from '@sfood/components/layout/SiteFooter';
import { SiteHeader } from '@sfood/components/layout/SiteHeader';
import { useCurrentRoute } from '@sfood/routing/useCurrentRoute';
import { AboutPage } from '@sfood/pages/AboutPage';
import { BrandsPage } from '@sfood/pages/BrandsPage';
import { FaqPage } from '@sfood/pages/FaqPage';
import { HomePage } from '@sfood/pages/HomePage';
import { NewsPage } from '@sfood/pages/NewsPage';
import { NotFoundPage } from '@sfood/pages/NotFoundPage';
import { NoticePage } from '@sfood/pages/NoticePage';
import { SustainabilityPage } from '@sfood/pages/SustainabilityPage';
import { TalentPage } from '@sfood/pages/TalentPage';

function CurrentPage() {
  const { route } = useCurrentRoute();

  switch (route?.path) {
    case '/':
      return <HomePage />;
    case '/about':
      return <AboutPage />;
    case '/sustainability':
      return <SustainabilityPage />;
    case '/brands':
      return <BrandsPage />;
    case '/talent':
      return <TalentPage />;
    case '/support/notice':
      return <NoticePage />;
    case '/support/news':
      return <NewsPage />;
    case '/support/faq':
      return <FaqPage />;
    default:
      return <NotFoundPage />;
  }
}

export function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />
      <main>
        <CurrentPage />
      </main>
      <SiteFooter />
    </div>
  );
}
