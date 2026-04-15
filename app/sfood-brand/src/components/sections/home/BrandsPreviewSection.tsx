import { brands } from "@sfood/content/brands";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function BrandsPreviewSection() {
	const previewBrands = brands.slice(0, 4);

	return (
		<section className="bg-sfood-cream py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-end justify-between">
					<div>
						<h2 className="text-3xl font-bold text-sfood-dark">우리 브랜드</h2>
						<p className="mt-2 text-gray-500">
							B2C부터 B2B까지, SFood의 다양한 브랜드를 만나보세요
						</p>
					</div>
					<Link
						to="/brands"
						className="hidden items-center gap-1 text-sm font-medium text-sfood-red hover:underline sm:flex"
					>
						전체 브랜드 보기
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{previewBrands.map((brand) => (
						<div
							key={brand.id}
							className="overflow-hidden rounded-xl bg-white shadow-sm"
						>
							<div
								className="h-3"
								style={{ backgroundColor: brand.accentColor }}
							/>
							<div className="p-5">
								<span
									className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
									style={{
										backgroundColor:
											brand.type === "B2C" ? "#FEE2E2" : "#DBEAFE",
										color: brand.type === "B2C" ? "#991B1B" : "#1E40AF",
									}}
								>
									{brand.type}
								</span>
								<h3 className="mt-2 font-bold text-sfood-dark">{brand.name}</h3>
								<p className="mt-1 text-sm text-gray-500 line-clamp-2">
									{brand.tagline}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="mt-8 text-center sm:hidden">
					<Link
						to="/brands"
						className="inline-flex items-center gap-1 text-sm font-medium text-sfood-red hover:underline"
					>
						전체 브랜드 보기
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
