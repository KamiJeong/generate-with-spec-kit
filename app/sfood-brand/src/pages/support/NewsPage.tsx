import { NewsList } from "@sfood/components/sections/support/NewsList";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { useEffect } from "react";

export function NewsPage() {
	useEffect(() => {
		document.title = "회사소식 | SFood";
	}, []);
	return (
		<>
			<SectionHero
				title="회사소식"
				subtitle="SFood의 새로운 이야기를 전합니다"
			/>
			<section className="bg-sfood-cream py-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<NewsList />
				</div>
			</section>
		</>
	);
}
