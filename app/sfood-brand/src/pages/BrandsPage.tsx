import { BrandsGrid } from "@sfood/components/sections/brands/BrandsGrid";
import { SectionHero } from "@sfood/components/ui/SectionHero";
import { useEffect } from "react";

export function BrandsPage() {
	useEffect(() => {
		document.title = "브랜드 | SFood";
	}, []);
	return (
		<>
			<SectionHero
				title="브랜드"
				subtitle="SFood의 다양한 브랜드를 만나보세요"
			/>
			<BrandsGrid />
		</>
	);
}
