import type { Brand } from "@sfood/content/brands";

interface BrandCardProps {
	brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
	return (
		<div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100">
			<div className="h-2" style={{ backgroundColor: brand.accentColor }} />
			<div className="p-6">
				<div className="flex items-start justify-between gap-4">
					<h3 className="text-lg font-bold text-sfood-dark">{brand.name}</h3>
					<span
						className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
						style={{
							backgroundColor: brand.type === "B2C" ? "#FEE2E2" : "#DBEAFE",
							color: brand.type === "B2C" ? "#991B1B" : "#1E40AF",
						}}
					>
						{brand.type}
					</span>
				</div>
				<p className="mt-2 text-sm font-medium text-gray-500">
					{brand.tagline}
				</p>
				<div className="mt-3 flex flex-wrap gap-1.5">
					{brand.categories.map((cat) => (
						<span
							key={cat}
							className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
						>
							{cat}
						</span>
					))}
				</div>
				<p className="mt-4 text-sm text-gray-600 leading-relaxed">
					{brand.description}
				</p>
			</div>
		</div>
	);
}
