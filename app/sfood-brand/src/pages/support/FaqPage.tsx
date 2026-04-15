import { AccordionFaq } from "@sfood/components/ui/AccordionFaq";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { faqItems } from "@sfood/content/support";
import { useEffect } from "react";

export function FaqPage() {
	useEffect(() => {
		document.title = "자주 묻는 질문 | SFood";
	}, []);
	return (
		<>
			<SectionHero
				title="자주 묻는 질문"
				subtitle="궁금하신 점을 빠르게 해결해 드립니다"
			/>
			<section className="bg-white py-12">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					<AccordionFaq items={faqItems} />
				</div>
			</section>
		</>
	);
}
