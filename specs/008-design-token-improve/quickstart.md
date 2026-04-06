# Quickstart: 디자인 토큰 시스템 개선

**Branch**: `008-design-token-improve` | **Date**: 2026-04-06

---

## 개요

이 가이드는 구현자가 `008-design-token-improve` 작업을 시작하기 위한 핵심 정보를 제공합니다.

---

## 현재 문제 요약

```
[버그] semantic/index.ts:49
  destructive: primaryHsl['500'],  ← brand 컬러와 동일! (357 70% 51%)
  
[개선] primitives/typography.ts:2
  sans: ['"NanumBarunGothic"', ...]  ← Pretendard로 교체 필요

[미구현] css/base.css:40
  .dark { /* sidebar 변수만 있음, 전체 semantic 토큰 없음 */ }
```

---

## 구현 우선순위

| 우선순위 | 작업 | 파일 |
|----------|------|------|
| P1 (버그 수정) | destructive 컬러 분리 | `primitives/colors.ts`, `semantic/index.ts`, `css/base.css` |
| P2 (기능 개선) | 브랜드 팔레트 600 앵커 재계산 | `primitives/colors.ts` |
| P3 (기능 추가) | Pretendard 폰트 토큰 | `primitives/typography.ts`, `css/base.css` |
| P4 (기능 추가) | 다크 모드 전체 semantic | `semantic/dark.ts`, `css/base.css` |
| P5 (기능 추가) | 테마 유틸리티 | `theme-utils.ts` |

---

## 핵심 파일 위치

```
packages/tokens/src/
├── primitives/
│   ├── colors.ts          ← P1, P2 수정
│   └── typography.ts      ← P3 수정
├── semantic/
│   ├── index.ts           ← P1 수정
│   └── dark.ts            ← P4 신규
├── css/
│   └── base.css           ← P1, P3, P4 수정
├── theme-utils.ts         ← P5 신규
└── index.ts               ← export 업데이트
```

---

## 브랜드 컬러 600 앵커 계약

`#d92b33` = `brand['600']` (불변). 변경 시 contracts/token-api.md 위반.

기존 `primary['500'] = '#d92b33'`에서 `brand['600'] = '#d92b33'`으로 재정의.  
**`--primary` CSS 변수 값은 동일하게 유지됨** (600 앵커 = 기존 500과 동일 색상값).

---

## 파괴적 컬러 분리 핵심 규칙

```
destructive hue ≈ 22° (orange-red)
brand hue = 357° (red)
차이 = 35° ≥ 15° 계약 충족

destructive['600'] = '#ea6c0a'  (라이트 기본)
destructive['400'] = '#fb923c'  (다크 기본)
```

---

## 폰트 설치 명령

```bash
pnpm --filter @myorg/tokens add pretendard @fontsource/noto-sans-kr
```

---

## 테스트 실행

```bash
pnpm --filter @myorg/tokens test
pnpm --filter @myorg/tokens lint
```

---

## 설계 문서 참조

- **data-model.md**: 전체 엔티티 구조, 파일별 변경 사항
- **contracts/token-api.md**: TypeScript/CSS 공개 API 계약 (불변 규칙 포함)
- **research.md**: 컬러 계산 근거, 폰트 선택 이유
