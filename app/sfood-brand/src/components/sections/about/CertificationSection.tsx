import { Award, CheckCircle, ShieldCheck } from "lucide-react";

const certifications = [
	{
		icon: ShieldCheck,
		name: "FSSC 22000",
		fullName: "Food Safety System Certification 22000",
		description:
			"글로벌 식품 안전 경영 시스템 인증. ISO 22000 기반으로 전 세계 식품 기업이 취득해야 하는 최고 수준의 식품 안전 표준입니다.",
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		icon: CheckCircle,
		name: "HACCP",
		fullName: "Hazard Analysis Critical Control Point",
		description:
			"식품 위해 요소 중점 관리 기준. 식품 생산 전 과정에서 발생 가능한 위해 요소를 분석하고 중점 관리하는 국제 인증 시스템입니다.",
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		icon: Award,
		name: "DLG 국제 품평회",
		fullName: "Deutsche Landwirtschafts-Gesellschaft",
		description:
			"독일 농업협회 주관 국제 식품 품평회. 세계 최고 권위의 식품 품질 평가 기관으로, SFood는 12년 연속 수상의 영예를 안고 있습니다.",
		color: "text-sfood-gold",
		bgColor: "bg-yellow-50",
	},
];

export function CertificationSection() {
	return (
		<section className="bg-white py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-sfood-dark">품질 인증</h2>
					<p className="mt-4 text-gray-500">세계가 인정한 SFood의 품질 기준</p>
				</div>
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
					{certifications.map((cert) => {
						const Icon = cert.icon;
						return (
							<div
								key={cert.name}
								className="rounded-xl border border-gray-100 p-8 shadow-sm"
							>
								<div
									className={`flex h-14 w-14 items-center justify-center rounded-full ${cert.bgColor}`}
								>
									<Icon className={`h-7 w-7 ${cert.color}`} />
								</div>
								<h3 className={`mt-4 text-xl font-bold ${cert.color}`}>
									{cert.name}
								</h3>
								<p className="mt-1 text-xs text-gray-400">{cert.fullName}</p>
								<p className="mt-3 text-sm text-gray-600">{cert.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
