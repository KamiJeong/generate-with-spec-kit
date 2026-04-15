import { newsItems } from "@sfood/content/support";

export function NewsList() {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			{newsItems.map((item) => (
				<article
					key={item.id}
					className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
				>
					<div className={`h-40 ${item.imagePlaceholderColor}`} />
					<div className="p-5">
						<time className="text-xs text-gray-400">{item.date}</time>
						<h3 className="mt-2 font-bold text-sfood-dark">{item.title}</h3>
						<p className="mt-2 text-sm text-gray-500 line-clamp-2">
							{item.summary}
						</p>
					</div>
				</article>
			))}
		</div>
	);
}
