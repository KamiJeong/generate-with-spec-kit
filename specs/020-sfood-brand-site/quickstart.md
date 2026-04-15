# Quickstart: SFood 브랜드 사이트

## 전제 조건

- 현재 브랜치: `020-sfood-brand-site`
- 작업 루트: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit`
- 구현 대상: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\apps\sfood`
- 디자인 기준: `C:\Users\USER\Documents\GitHub\generate-with-spec-kit\DESIGN.md`
- Storybook 참고: `BrandSite`, `NavigationMenu`, `Card`, `Accordion`, `Button`

## 구현 순서

1. `apps/sfood`에 Vite/React/TypeScript 앱 구조를 만든다.
2. `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`를 `packages/web` 패턴에 맞춰 구성하되 앱 이름과 alias는 SFood 전용으로 둔다.
3. `src/content/site.ts`와 `src/routes/route-map.ts` 타입 및 테스트를 먼저 작성한다.
4. 실패하는 테스트를 확인한 뒤 공통 레이아웃, 페이지 컴포넌트, 콘텐츠 렌더링을 구현한다.
5. `@myorg/ui` 컴포넌트와 `@myorg/tokens` semantic token을 우선 사용한다.
6. 공지사항과 회사소식은 목록형 요약만 제공하고 상세 링크를 만들지 않는다.
7. 콘텐츠 전체에서 정확한 인증/수상 명칭이 없는지 테스트로 확인한다.

## 권장 테스트 명령

```powershell
pnpm --filter @myorg/sfood test
pnpm --filter @myorg/sfood lint
pnpm --filter @myorg/sfood build
```

## 수동 검증

1. 개발 서버를 실행한다.

```powershell
pnpm --filter @myorg/sfood dev
```

2. 브라우저에서 다음 URL을 확인한다.

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/about
http://127.0.0.1:5173/sustainability
http://127.0.0.1:5173/brands
http://127.0.0.1:5173/talent
http://127.0.0.1:5173/support/notice
http://127.0.0.1:5173/support/news
http://127.0.0.1:5173/support/faq
```

3. 각 페이지에서 다음을 확인한다.

- 공통 헤더와 푸터가 유지된다.
- 현재 메뉴가 활성 상태로 표시된다.
- 모바일 폭에서 텍스트가 넘치지 않는다.
- FAQ는 키보드로 열고 닫을 수 있다.
- 공지사항과 회사소식은 상세 페이지를 암시하지 않는다.
- 정확한 인증/수상 명칭이 화면에 보이지 않는다.

## 완료 기준

- 8개 URL이 모두 접근 가능하다.
- 라우트, 콘텐츠, 접근성 구조 테스트가 통과한다.
- lint와 build가 통과한다.
- 헌법의 성능 기준을 방해하는 불필요한 API 호출이나 큰 외부 의존성이 없다.
