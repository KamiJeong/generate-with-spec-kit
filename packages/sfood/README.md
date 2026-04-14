# @myorg/sfood

Static SFood brand site package built with Vite, React, Tailwind CSS v4, `@myorg/ui`, and `@myorg/tokens`.

## Commands

```bash
pnpm --filter @myorg/sfood dev
pnpm --filter @myorg/sfood test
pnpm --filter @myorg/sfood lint
pnpm --filter @myorg/sfood build
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | 회사소개 |
| `/sustainability` | 지속가능성 |
| `/brands` | 브랜드 |
| `/talent` | 인재채용 |
| `/support/notice` | 공지사항 |
| `/support/news` | 회사소식 |
| `/support/faq` | FAQ |

Routing is handled by `src/routing/routes.ts` and the History API helper in `src/routing/useCurrentRoute.ts`. Content is static typed data in `src/content/sfood-content.ts`.
