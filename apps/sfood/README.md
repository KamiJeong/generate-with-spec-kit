# SFood 브랜드 사이트

SFood(에쓰푸드)를 위한 정적 브랜드 사이트 프로토타입입니다. 프리미엄 육가공 전문성과 Meal Solution 포지셔닝을 기반으로 메인, 회사소개, 지속 가능성, 브랜드, 인재 채용, 지원 콘텐츠를 제공합니다.

## 범위

- API, 검색, 로그인, 구매, 문의 폼, CMS는 포함하지 않습니다.
- 공지사항과 회사소식은 목록형 요약만 제공하며 상세 페이지를 만들지 않습니다.
- 실제 인증, 안전 시스템, 수상 명칭은 최종 검증 문구가 제공되기 전까지 사용하지 않습니다.
- 콘텐츠는 `src/content/site.ts`의 TypeScript 정적 데이터로 관리합니다.

## 공개 URL

```text
/
/about
/sustainability
/brands
/talent
/support/notice
/support/news
/support/faq
```

## 명령

```powershell
pnpm --filter @myorg/sfood-by-codex dev
pnpm --filter @myorg/sfood-by-codex test
pnpm --filter @myorg/sfood-by-codex lint
pnpm --filter @myorg/sfood-by-codex build
```

## 구현 메모

- Vite, React, TypeScript, Tailwind CSS 4를 사용합니다.
- `@myorg/tokens` semantic token과 `@myorg/ui` 컴포넌트를 우선 사용합니다.
- 라우팅은 새 런타임 의존성 없이 `src/routes/route-map.ts`와 `history.pushState` 기반으로 처리합니다.
- 테스트는 라우트 계약, 콘텐츠 불변 조건, 접근성 구조, 사용자 스토리별 핵심 검증을 포함합니다.
