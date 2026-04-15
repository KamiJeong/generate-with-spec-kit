import { BenefitsSection } from "@sfood/components/sections/talent/BenefitsSection";
import { PersonaSection } from "@sfood/components/sections/talent/PersonaSection";
import { ProcessSection } from "@sfood/components/sections/talent/ProcessSection";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { Mail } from "lucide-react";
import { useEffect } from "react";

export function TalentPage() {
	useEffect(() => {
		document.title = "인재채용 | SFood";
	}, []);
	return (
		<>
			<SectionHero
				title="인재채용"
				subtitle="SFood와 함께 더 좋은 세상을 만들어갈 인재를 찾습니다"
			/>
			<PersonaSection />
			<ProcessSection />
			<BenefitsSection />
			<section className="bg-sfood-cream py-16">
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="text-2xl font-bold text-sfood-dark">채용 문의</h2>
					<p className="mt-3 text-gray-500">
						채용과 관련한 문의 사항은 아래로 연락해 주세요.
					</p>
					<a
						href="mailto:recruit@sfood.co.kr"
						className="mt-6 inline-flex items-center gap-2 rounded-md bg-sfood-red px-6 py-3 text-sm font-semibold text-white hover:bg-sfood-red/90"
					>
						<Mail className="h-4 w-4" />
						recruit@sfood.co.kr
					</a>
				</div>
			</section>
		</>
	);
}
