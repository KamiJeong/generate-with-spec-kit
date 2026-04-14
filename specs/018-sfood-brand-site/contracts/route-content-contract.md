# Contract: SFood Route and Content Surface

**Branch**: `018-sfood-brand-site` | **Date**: 2026-04-14

이 계약은 `packages/sfood`가 외부 사용자에게 노출하는 브라우저 경로와 정적 콘텐츠 렌더링 표면을 정의한다. 별도 HTTP API 계약은 없다.

## Route Contract

| Path | Page | Required content | Navigation |
|------|------|------------------|------------|
| `/` | HomePage | 히어로, 브랜드 미션, 제품 카테고리 하이라이트, 품질 인증 배지, 최신 뉴스/공지 2건 | 전역 nav의 홈 또는 로고에서 접근 |
| `/about` | AboutPage | 미션, 비전, 핵심 가치, 연혁 타임라인, FSSC 22000/HACCP/DLG 인증 | `회사소개` 항목 |
| `/sustainability` | SustainabilityPage | 환경 실천, 사회 공헌, 거버넌스 콘텐츠, 정량 지표 인포그래픽 | `지속가능성` 항목 |
| `/brands` | BrandsPage | B2B/B2C 브랜드 구분, 브랜드명, 슬로건, 대표 제품군 | `브랜드` 항목 |
| `/talent` | TalentPage | 채용 철학, 조직 문화, 복리후생, 채용 프로세스 | `인재채용` 항목 |
| `/support/notice` | NoticePage | 제목, 날짜, 카테고리를 포함한 공지사항 목록 | `고객지원 > 공지사항` 항목 |
| `/support/news` | NewsPage | 이미지, 제목, 날짜, 요약을 포함한 회사소식 카드 그리드 | `고객지원 > 회사소식` 항목 |
| `/support/faq` | FaqPage | 단일 모드 FAQ 아코디언 | `고객지원 > FAQ` 항목 |

## Navigation Contract

- 헤더와 푸터는 모든 정상 경로에서 공통으로 렌더링한다.
- 현재 경로에 해당하는 메뉴는 `aria-current="page"` 또는 동등한 접근성 상태를 제공한다.
- 모바일 내비게이션은 `Sheet` 기반 메뉴로 제공하며, 열기 버튼은 명확한 accessible name을 가진다.
- 고객지원 메뉴는 공지사항, 회사소식, FAQ로 이동할 수 있어야 한다.
- 모든 내부 링크는 `PageRoute.path`에 정의된 경로만 참조해야 한다.

## Content Contract

- 모든 콘텐츠는 `src/content/sfood-content.ts`의 typed constant에서 제공한다.
- 외부 API, CMS, 데이터베이스 요청은 발생하지 않는다.
- 공지사항 목록은 `Article.type === 'notice'`이고 날짜 역순이다.
- 회사소식 목록은 `Article.type === 'news'`이고 카드에 이미지, 제목, 날짜, 요약을 표시한다.
- FAQ 아코디언은 `type="single"` 모드이며 동시에 여러 답변이 열리지 않는다.
- 품질 인증 표면에는 FSSC 22000, HACCP, DLG가 모두 표시되어야 한다.
- 이미지 객체는 빈 문자열이 아닌 `alt`를 반드시 가진다.

## Theme Contract

SFood 브랜드 팔레트는 `src/index.css`에서 semantic CSS variable로 매핑한다.

| Brand role | Hex from spec | CSS variable target | HSL value |
|------------|---------------|---------------------|-----------|
| Primary | `#C8102E` | `--primary`, `--ring`, `--chart-1` | `350 85% 42%` |
| Secondary | `#1A1A2E` | `--secondary-foreground`, selected dark surfaces as needed | `240 28% 14%` |
| Accent | `#F5A623` | `--accent` or `--chart-2` where contrast-safe | `37 91% 55%` |
| Background | `#FAFAF8` | `--background`, `--card` | `60 17% 98%` |
| Text | `#2D2D2D` | `--foreground`, `--card-foreground` | `0 0% 18%` |

Component JSX must use semantic utility classes such as `bg-primary`, `text-primary-foreground`, `bg-background`, `text-foreground`, `text-muted-foreground`, and `border-border`. Raw hex values and arbitrary color classes are not allowed in JSX.

## 404 Contract

- Unknown path renders `NotFoundPage` or an equivalent fallback screen.
- Fallback screen includes a link back to `/`.
- The fallback path must not break header/footer rendering.
