import { BrandCard } from "@sfood/components/ui/BrandCard";
import { brands } from "@sfood/content/brands";

export function BrandsGrid() {
	const b2cBrands = brands.filter((b) => b.type === "B2C");
	const b2bBrands = brands.filter((b) => b.type === "B2B");

	return (
		<div className="bg-sfood-cream py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<section className="mb-16">
					<h2 className="text-2xl font-bold text-sfood-dark border-l-4 border-sfood-red pl-4">
						B2C 브랜드
					</h2>
					<p className="mt-2 text-gray-500">소비자를 위한 프리미엄 브랜드</p>
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
						{b2cBrands.map((brand) => (
							<BrandCard key={brand.id} brand={brand} />
						))}
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-bold text-sfood-dark border-l-4 border-sfood-red pl-4">
						B2B 브랜드
					</h2>
					<p className="mt-2 text-gray-500">
						전문 파트너를 위한 비즈니스 솔루션
					</p>
					<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
						{b2bBrands.map((brand) => (
							<BrandCard key={brand.id} brand={brand} />
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
