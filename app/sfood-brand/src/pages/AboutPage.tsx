import { CertificationSection } from "@sfood/components/sections/about/CertificationSection";
import { MissionSection } from "@sfood/components/sections/about/MissionSection";
import { TimelineSection } from "@sfood/components/sections/about/TimelineSection";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { useEffect } from "react";

export function AboutPage() {
	useEffect(() => {
		document.title = "SFood 소개 | SFood";
	}, []);
	return (
		<>
			<SectionHero
				title="SFood 소개"
				subtitle="더 좋은 식품으로 더 좋은 세상을 만들어갑니다"
			/>
			<MissionSection />
			<TimelineSection />
			<CertificationSection />
		</>
	);
}
