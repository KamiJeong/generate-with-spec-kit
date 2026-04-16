# @myorg/web

정적 단일 페이지 서비스 소개 사이트입니다. Vite + React로 실행하며 기존
`@kamijeong/ui` 컴포넌트와 디자인 토큰을 재사용합니다.

## 실행

```bash
pnpm --filter @myorg/web dev
pnpm --filter @myorg/web test
pnpm --filter @myorg/web build
```

## 콘텐츠 교체

실제 마케팅 카피는 `src/content/site.ts`에서 교체합니다.

- `siteConfig`: 서비스 이름, 헤드라인, 설명, CTA 라벨
- `navItems`: 헤더와 푸터의 섹션 앵커
- `features`: 강점 카드 3-6개
- `stats`: 히어로와 신뢰 섹션에 쓰이는 숫자 지표
- `testimonials`: 후기 인용구와 작성자 정보

강점 카드는 `FR-003`에 따라 3개 이상 6개 이하를 유지해야 합니다.
