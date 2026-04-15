import { ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SustainabilityTeaser() {
  return (
    <section className="bg-sfood-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-sfood-dark">더 나은 미래를 위한 약속</h2>
              <p className="mt-1 text-gray-500">
                SFood는 2030년까지 탄소 배출 30% 감축과 지속 가능한 원료 조달을 목표로 합니다.
              </p>
            </div>
          </div>
          <Link
            to="/sustainability"
            className="flex shrink-0 items-center gap-1 rounded-md bg-sfood-red px-5 py-2.5 text-sm font-medium text-white hover:bg-sfood-red/90"
          >
            자세히 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
