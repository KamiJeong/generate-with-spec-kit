import { notices } from '@sfood/content/support';

const categoryColors: Record<string, string> = {
  공지: 'bg-sfood-red-light text-sfood-red',
  업데이트: 'bg-blue-100 text-blue-700',
  이벤트: 'bg-yellow-100 text-yellow-700',
};

export function NoticeList() {
  return (
    <div className="divide-y divide-gray-100">
      {notices.map((notice) => (
        <div key={notice.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-6">
          <span
            className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColors[notice.category]}`}
          >
            {notice.category}
          </span>
          <div className="flex-1">
            <p className="font-medium text-sfood-dark">{notice.title}</p>
            <p className="mt-1 text-sm text-gray-500">{notice.summary}</p>
          </div>
          <time className="shrink-0 text-sm text-gray-400">{notice.date}</time>
        </div>
      ))}
    </div>
  );
}
