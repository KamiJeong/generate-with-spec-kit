import type { SustainabilityPillar } from "@sfood/content/sustainability";
import { Leaf, ShieldCheck, Users } from "lucide-react";

const iconMap = {
	Leaf,
	Users,
	ShieldCheck,
};

interface PillarSectionProps {
	pillar: SustainabilityPillar;
	reversed?: boolean;
}

export function PillarSection({
	pillar,
	reversed = false,
}: PillarSectionProps) {
	const Icon = iconMap[pillar.icon as keyof typeof iconMap] ?? Leaf;

	return (
		<section className={`py-16 ${reversed ? "bg-sfood-cream" : "bg-white"}`}>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div
					className={`flex flex-col gap-10 lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""}`}
				>
					<div className="lg:w-1/3">
						<div className="flex items-start gap-4">
							<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sfood-red-light">
								<Icon className="h-7 w-7 text-sfood-red" />
							</div>
							<div>
								<span className="text-xs font-semibold uppercase tracking-wider text-sfood-red">
									{pillar.area}
								</span>
								<h2 className="mt-1 text-2xl font-bold text-sfood-dark">
									{pillar.title}
								</h2>
							</div>
						</div>
						<p className="mt-4 text-gray-600">{pillar.description}</p>
						{pillar.metric && (
							<div className="mt-6 rounded-lg bg-sfood-red px-5 py-3 text-white">
								<p className="text-sm font-semibold">{pillar.metric}</p>
							</div>
						)}
					</div>
					<div className="lg:w-2/3">
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							{pillar.activities.map((activity) => (
								<div
									key={activity.title}
									className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
								>
									<h3 className="font-semibold text-sfood-dark">
										{activity.title}
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										{activity.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
