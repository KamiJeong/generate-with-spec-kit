import { hiringSteps } from "@sfood/content/talent";
import { ChevronRight } from "lucide-react";

export function ProcessSection() {
	return (
		<section className="bg-sfood-cream py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-3xl font-bold text-sfood-dark">
					채용 프로세스
				</h2>
				<p className="mt-4 text-center text-gray-500">
					투명하고 공정한 채용을 약속합니다
				</p>
				<div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-0">
					{hiringSteps.map((step, index) => (
						<div
							key={step.order}
							className="flex sm:flex-1 sm:flex-col sm:items-center"
						>
							<div className="flex sm:flex-col sm:items-center">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sfood-red text-white font-bold text-lg">
									{step.order}
								</div>
								{index < hiringSteps.length - 1 && (
									<ChevronRight className="mx-2 h-6 w-6 text-sfood-red sm:hidden" />
								)}
							</div>
							<div className="ml-4 sm:ml-0 sm:mt-4 sm:text-center">
								<h3 className="font-semibold text-sfood-dark">{step.title}</h3>
								<p className="mt-1 text-sm text-gray-500 sm:max-w-36">
									{step.description}
								</p>
							</div>
							{index < hiringSteps.length - 1 && (
								<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center sm:pt-5">
									<ChevronRight className="h-5 w-5 text-sfood-red" />
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
