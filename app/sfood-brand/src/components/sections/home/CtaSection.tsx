import { Link } from 'react-router-dom';

export function CtaSection() {
  return (
    <section className="bg-sfood-dark py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          지금 SFood와 함께하세요
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
          프리미엄 육가공 식품의 새로운 기준, SFood 브랜드와 채용 정보를 확인해 보세요.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/brands"
            className="rounded-md bg-sfood-red px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sfood-red/90"
          >
            브랜드 보기
          </Link>
          <Link
            to="/talent"
            className="rounded-md border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            채용 정보
          </Link>
        </div>
      </div>
    </section>
  );
}
