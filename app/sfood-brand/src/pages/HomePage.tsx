import { BrandsPreviewSection } from "@sfood/components/sections/home/BrandsPreviewSection";
import { CtaSection } from "@sfood/components/sections/home/CtaSection";
import { HeroSection } from "@sfood/components/sections/home/HeroSection";
import { StatsSection } from "@sfood/components/sections/home/StatsSection";
import { SustainabilityTeaser } from "@sfood/components/sections/home/SustainabilityTeaser";
import { useEffect } from "react";

export function HomePage() {
	useEffect(() => {
		document.title = "SFood — 더 좋은 식품으로 더 좋은 세상을";
	}, []);
	return (
		<>
			<HeroSection />
			<StatsSection />
			<BrandsPreviewSection />
			<SustainabilityTeaser />
			<CtaSection />
		</>
	);
}
