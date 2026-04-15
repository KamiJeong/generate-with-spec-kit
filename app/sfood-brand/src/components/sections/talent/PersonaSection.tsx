import { personas } from "@sfood/content/talent";
import { Rocket, Star, Users } from "lucide-react";

const iconMap = { Rocket, Users, Star };

export function PersonaSection() {
	return (
		<section className="bg-white py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-3xl font-bold text-sfood-dark">
					인재상
				</h2>
				<p className="mt-4 text-center text-gray-500">
					SFood가 함께하고 싶은 사람
				</p>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
					{personas.map((persona) => {
						const Icon = iconMap[persona.icon as keyof typeof iconMap] ?? Star;
						return (
							<div
								key={persona.keyword}
								className="rounded-xl border border-gray-100 p-8 text-center shadow-sm"
							>
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sfood-red-light">
									<Icon className="h-8 w-8 text-sfood-red" />
								</div>
								<h3 className="mt-4 text-xl font-bold text-sfood-dark">
									{persona.keyword}
								</h3>
								<p className="mt-3 text-sm text-gray-500 leading-relaxed">
									{persona.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
