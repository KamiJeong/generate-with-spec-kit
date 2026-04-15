import { Route, Routes } from 'react-router-dom';

import { SiteFooter } from '@sfood/components/layout/SiteFooter';
import { SiteHeader } from '@sfood/components/layout/SiteHeader';
import { AboutPage } from '@sfood/pages/AboutPage';
import { BrandsPage } from '@sfood/pages/BrandsPage';
import { HomePage } from '@sfood/pages/HomePage';
import { NotFoundPage } from '@sfood/pages/NotFoundPage';
import { SustainabilityPage } from '@sfood/pages/SustainabilityPage';
import { TalentPage } from '@sfood/pages/TalentPage';
import { FaqPage } from '@sfood/pages/support/FaqPage';
import { NewsPage } from '@sfood/pages/support/NewsPage';
import { NoticePage } from '@sfood/pages/support/NoticePage';

export function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/talent" element={<TalentPage />} />
          <Route path="/support/notice" element={<NoticePage />} />
          <Route path="/support/news" element={<NewsPage />} />
          <Route path="/support/faq" element={<FaqPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}
