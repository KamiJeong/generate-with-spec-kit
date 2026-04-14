import { SiteFooter } from '@web/components/layout/SiteFooter';
import { SiteHeader } from '@web/components/layout/SiteHeader';
import { AboutSection } from '@web/components/sections/AboutSection';
import { ContactSection } from '@web/components/sections/ContactSection';
import { FeaturesSection } from '@web/components/sections/FeaturesSection';
import { HeroSection } from '@web/components/sections/HeroSection';
import { TrustSection } from '@web/components/sections/TrustSection';

export function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <TrustSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
