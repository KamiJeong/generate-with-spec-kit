const events = [
	{
		year: "1983",
		title: "에쓰푸드 창립",
		description:
			"서울에서 소규모 육가공 공장으로 시작, 국내 프리미엄 소시지 시장 개척",
	},
	{
		year: "1998",
		title: "HACCP 인증 획득",
		description:
			"식품 안전 관리 체계 HACCP 인증을 국내 육가공 업계 최초로 취득",
	},
	{
		year: "2005",
		title: "DLG 국제 품평회 첫 수상",
		description:
			"독일 DLG 국제 품평회에서 금상을 수상하며 세계적 품질을 공인받음",
	},
	{
		year: "2012",
		title: "FSSC 22000 인증 취득",
		description:
			"국제 식품 안전 경영 시스템 FSSC 22000 인증으로 글로벌 기준 충족",
	},
	{
		year: "2020",
		title: "아시아 시장 진출",
		description:
			"일본, 싱가포르를 시작으로 아시아 프리미엄 식품 시장 본격 공략",
	},
];

export function TimelineSection() {
	return (
		<section className="bg-sfood-cream py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h2 className="text-center text-3xl font-bold text-sfood-dark">
					회사 연혁
				</h2>
				<div className="mt-12 relative">
					<div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-sfood-red/20 hidden sm:block" />
					<div className="space-y-8">
						{events.map((event, index) => (
							<div
								key={event.year}
								className={`flex flex-col sm:flex-row gap-6 ${
									index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
								}`}
							>
								<div
									className={`sm:w-1/2 ${index % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8"}`}
								>
									<div className="rounded-xl bg-white p-6 shadow-sm">
										<span className="text-2xl font-bold text-sfood-red">
											{event.year}
										</span>
										<h3 className="mt-1 text-lg font-semibold text-sfood-dark">
											{event.title}
										</h3>
										<p className="mt-2 text-sm text-gray-500">
											{event.description}
										</p>
									</div>
								</div>
								<div className="hidden sm:flex sm:w-0 items-center justify-center">
									<div className="h-4 w-4 rounded-full bg-sfood-red ring-4 ring-sfood-red/20" />
								</div>
								<div className="sm:w-1/2" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
