import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@kamijeong/ui";
import { navItems, siteConfig } from "@sfood/content/site";
import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export function SiteHeader() {
	const [scrolled, setScrolled] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileSubOpen, setMobileSubOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isSupportActive = location.pathname.startsWith("/support");

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
				scrolled ? "bg-sfood-red shadow-md" : "bg-sfood-red/90"
			}`}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* 로고 */}
					<Link to="/" className="text-xl font-bold text-white">
						{siteConfig.name}
					</Link>

					{/* 데스크톱 내비게이션 */}
					<nav className="hidden items-center gap-6 md:flex">
						{navItems.map((item) => {
							if (item.children) {
								return (
									<div
										key={item.href}
										className="relative"
										onMouseEnter={() => setDropdownOpen(true)}
										onMouseLeave={() => setDropdownOpen(false)}
									>
										<button
											type="button"
											className={`flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white ${
												isSupportActive
													? "text-white underline underline-offset-4"
													: ""
											}`}
										>
											{item.label}
											<ChevronDown className="h-3 w-3" />
										</button>
										{dropdownOpen && (
											<div className="absolute top-full left-0 mt-1 w-40 rounded-md bg-white py-1 shadow-lg">
												{item.children.map((child) => (
													<NavLink
														key={child.href}
														to={child.href}
														className={({ isActive }) =>
															`block px-4 py-2 text-sm ${
																isActive
																	? "bg-sfood-red-light font-medium text-sfood-red"
																	: "text-gray-700 hover:bg-gray-50"
															}`
														}
													>
														{child.label}
													</NavLink>
												))}
											</div>
										)}
									</div>
								);
							}

							return (
								<NavLink
									key={item.href}
									to={item.href}
									end={item.href === "/"}
									className={({ isActive }) =>
										`text-sm font-medium transition-colors ${
											isActive
												? "text-white underline underline-offset-4"
												: "text-white/80 hover:text-white"
										}`
									}
								>
									{item.label}
								</NavLink>
							);
						})}
					</nav>

					{/* 모바일 햄버거 버튼 */}
					<div className="md:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<button
									type="button"
									aria-label="메뉴 열기"
									className="text-white"
								>
									<Menu className="h-6 w-6" />
								</button>
							</SheetTrigger>
							<SheetContent side="right">
								<SheetHeader>
									<SheetTitle className="text-sfood-red">
										{siteConfig.name}
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col gap-1 px-4 pt-4">
									{navItems.map((item) => {
										if (item.children) {
											return (
												<div key={item.href}>
													<button
														type="button"
														onClick={() => setMobileSubOpen(!mobileSubOpen)}
														className={`flex w-full items-center justify-between py-2 text-sm font-medium ${
															isSupportActive
																? "text-sfood-red"
																: "text-gray-700"
														}`}
													>
														{item.label}
														<ChevronDown
															className={`h-4 w-4 transition-transform ${
																mobileSubOpen ? "rotate-180" : ""
															}`}
														/>
													</button>
													{mobileSubOpen && (
														<div className="ml-4 border-l-2 border-sfood-red-light pl-3">
															{item.children.map((child) => (
																<NavLink
																	key={child.href}
																	to={child.href}
																	className={({ isActive }) =>
																		`block py-1.5 text-sm ${
																			isActive
																				? "font-medium text-sfood-red"
																				: "text-gray-600"
																		}`
																	}
																>
																	{child.label}
																</NavLink>
															))}
														</div>
													)}
												</div>
											);
										}

										return (
											<NavLink
												key={item.href}
												to={item.href}
												end={item.href === "/"}
												className={({ isActive }) =>
													`py-2 text-sm font-medium ${
														isActive ? "text-sfood-red" : "text-gray-700"
													}`
												}
											>
												{item.label}
											</NavLink>
										);
									})}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
