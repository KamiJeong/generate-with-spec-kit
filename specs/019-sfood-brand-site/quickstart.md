# Quickstart: SFood 브랜드 사이트

**Feature**: `019-sfood-brand-site`  
**Date**: 2026-04-15

---

## 사전 준비

- Node.js 20+ 및 pnpm 9+ 설치 확인
- 프로젝트 루트에서 `pnpm install` 실행

---

## pnpm-workspace.yaml 업데이트

`app/*` 패턴이 workspace에 등록되어 있는지 확인. 없으면 추가:

```yaml
packages:
  - 'packages/*'
  - 'app/*'        # 추가 필요
```

---

## 개발 서버 실행

```bash
pnpm --filter @myorg/sfood-brand dev
```

브라우저에서 `http://127.0.0.1:5173` 접속.

---

## 테스트 실행

```bash
pnpm --filter @myorg/sfood-brand test
```

커버리지 포함:

```bash
pnpm --filter @myorg/sfood-brand test -- --coverage
```

---

## 빌드

```bash
pnpm --filter @myorg/sfood-brand build
```

`app/sfood-brand/dist/`에 정적 파일 생성.

---

## 린트

```bash
pnpm --filter @myorg/sfood-brand lint
```

---

## 주요 파일 위치

| 목적 | 경로 |
|------|------|
| 라우트 정의 | `app/sfood-brand/src/App.tsx` |
| 사이트 콘텐츠 | `app/sfood-brand/src/content/` |
| 브랜드 컬러 | `app/sfood-brand/src/index.css` (`@theme` 블록) |
| 헤더 컴포넌트 | `app/sfood-brand/src/components/layout/SiteHeader.tsx` |
| 페이지 컴포넌트 | `app/sfood-brand/src/pages/` |

---

## 브랜드 컬러 사용 방법

`index.css`에 정의된 CSS 변수를 Tailwind 유틸리티로 사용:

```tsx
// 주 강조색 배경
<div className="bg-sfood-red text-white">...</div>

// 오프화이트 배경
<div className="bg-sfood-cream">...</div>

// 골드 액센트 (수상·배지)
<span className="text-sfood-gold">DLG 수상</span>
```
