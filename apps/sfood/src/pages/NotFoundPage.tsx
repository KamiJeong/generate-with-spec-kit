import { Button } from '@myorg/ui';
import { PageHero } from '@sfood/components/sections/PageHero';

const notFoundContent = {
  title: '페이지를 찾을 수 없습니다',
  eyebrow: 'SFood 안내',
  description:
    '요청한 페이지가 준비되어 있지 않습니다. 메인으로 돌아가 SFood의 브랜드 이야기를 다시 확인해 주세요.',
  image: {
    src: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=1200&q=80',
    alt: '정돈된 식탁 위 안내 카드',
  },
  highlights: ['브랜드 탐색', '지원 메뉴 확인', '메인으로 이동'],
};

export function NotFoundPage() {
  return (
    <>
      <PageHero content={notFoundContent} />
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <Button asChild>
          <a href="/">메인으로 돌아가기</a>
        </Button>
      </section>
    </>
  );
}
