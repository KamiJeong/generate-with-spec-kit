import { NoticeList } from "@sfood/components/sections/support/NoticeList";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { useEffect } from "react";

export function NoticePage() {
	useEffect(() => {
		document.title = "공지사항 | SFood";
	}, []);
	return (
		<>
			<SectionHero title="공지사항" subtitle="SFood의 최신 소식을 확인하세요" />
			<section className="bg-white py-12">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<NoticeList />
				</div>
			</section>
		</>
	);
}
