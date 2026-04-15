import { benefits } from "@sfood/content/talent";
import {
	BookOpen,
	Clock,
	Gift,
	GraduationCap,
	TrendingUp,
	Users,
} from "lucide-react";

const iconMap = { Clock, GraduationCap, BookOpen, Users, TrendingUp, Gift };

export function BenefitsSection() {
	const categories = ["복지", "성장", "보상"] as const;

	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-3xl font-bold text-sfood-dark">
					복리후생
				</h2>
				<p className="mt-4 text-center text-gray-500">
					SFood 구성원을 위한 특별한 혜택
				</p>
				{categories.map((category) => {
					const categoryBenefits = benefits.filter(
						(b) => b.category === category,
					);
					return (
						<div key={category} className="mt-12">
							<h3 className="mb-6 border-b border-gray-100 pb-3 font-semibold text-sfood-dark">
								{category}
							</h3>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{categoryBenefits.map((benefit) => {
									const Icon =
										iconMap[benefit.icon as keyof typeof iconMap] ?? Gift;
									return (
										<div
											key={benefit.title}
											className="flex gap-4 rounded-xl border border-gray-100 p-5 shadow-sm"
										>
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sfood-red-light">
												<Icon className="h-5 w-5 text-sfood-red" />
											</div>
											<div>
												<h4 className="font-semibold text-sfood-dark">
													{benefit.title}
												</h4>
												<p className="mt-1 text-sm text-gray-500">
													{benefit.description}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
