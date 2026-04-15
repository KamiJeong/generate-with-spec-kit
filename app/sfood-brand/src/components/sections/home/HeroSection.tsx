import { siteConfig } from "@sfood/content/site";
import { Link } from "react-router-dom";

export function HeroSection() {
	return (
		<section className="relative flex min-h-[85vh] items-center bg-gradient-to-br from-sfood-red via-sfood-red to-sfood-dark">
			<div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-widest text-sfood-gold">
						{siteConfig.name} · {siteConfig.nameKo}
					</p>
					<h1 className="mt-4 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
						{siteConfig.tagline}
					</h1>
					<p className="mt-6 text-xl text-white/80">
						DLG 국제 품평회 연속 수상 — 품질로 증명하는 프리미엄 육가공 식품의
						기준
					</p>
					<div className="mt-10 flex flex-wrap gap-4">
						<Link
							to="/brands"
							className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-sfood-red shadow-sm hover:bg-gray-50"
						>
							브랜드 살펴보기
						</Link>
						<Link
							to="/about"
							className="rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
						>
							회사소개
						</Link>
					</div>
				</div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
		</section>
	);
}
