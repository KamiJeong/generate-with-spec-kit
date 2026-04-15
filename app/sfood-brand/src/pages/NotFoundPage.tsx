import { Link } from "react-router-dom";

export function NotFoundPage() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="text-6xl font-bold text-sfood-red">404</h1>
			<h2 className="mt-4 text-2xl font-semibold text-sfood-dark">
				페이지를 찾을 수 없습니다
			</h2>
			<p className="mt-2 text-gray-500">
				요청하신 페이지가 존재하지 않거나 이동되었습니다.
			</p>
			<Link
				to="/"
				className="mt-6 inline-flex items-center rounded-md bg-sfood-red px-6 py-3 text-sm font-medium text-white hover:bg-sfood-red/90"
			>
				홈으로 돌아가기
			</Link>
		</div>
	);
}
