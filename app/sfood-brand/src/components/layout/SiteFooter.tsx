import { siteConfig } from "@sfood/content/site";
import { Link } from "react-router-dom";

export function SiteFooter() {
	return (
		<footer className="bg-sfood-dark text-white">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					<div>
						<span className="text-2xl font-bold text-sfood-red">
							{siteConfig.name}
						</span>
						<p className="mt-2 text-sm text-gray-400">{siteConfig.nameKo}</p>
						<p className="mt-3 text-sm text-gray-300">{siteConfig.tagline}</p>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
							서비스
						</h3>
						<ul className="mt-4 space-y-2">
							<li>
								<Link
									to="/about"
									className="text-sm text-gray-300 hover:text-white"
								>
									회사소개
								</Link>
							</li>
							<li>
								<Link
									to="/brands"
									className="text-sm text-gray-300 hover:text-white"
								>
									브랜드
								</Link>
							</li>
							<li>
								<Link
									to="/sustainability"
									className="text-sm text-gray-300 hover:text-white"
								>
									지속가능성
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
							고객지원
						</h3>
						<ul className="mt-4 space-y-2">
							<li>
								<Link
									to="/support/notice"
									className="text-sm text-gray-300 hover:text-white"
								>
									공지사항
								</Link>
							</li>
							<li>
								<Link
									to="/support/faq"
									className="text-sm text-gray-300 hover:text-white"
								>
									자주 묻는 질문
								</Link>
							</li>
							<li>
								<Link
									to="/talent"
									className="text-sm text-gray-300 hover:text-white"
								>
									인재채용
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-gray-700 pt-8">
					<p className="text-center text-xs text-gray-400">
						© {new Date().getFullYear()} {siteConfig.name}({siteConfig.nameKo}).
						All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
