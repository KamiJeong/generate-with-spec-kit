# 빠른 시작: DESIGN.md 사용 가이드

**Feature**: 003-design-md | **Date**: 2026-04-03

## AI 에이전트로서 DESIGN.md 사용하기

### Claude Code

`/DESIGN.md`는 프로젝트 루트에 있다. UI 관련 작업 시 이 파일을 먼저 읽는다.

```
# 예: 로그인 폼 컴포넌트 생성 요청 시
# Claude Code는 DESIGN.md를 참조하여:
# - Field + Input + Button (variant="default") 조합 선택
# - primary 색상 토큰 사용
# - aria-invalid 패턴 적용
```

### Codex

`/AGENTS.md`를 자동으로 읽으며, 이 파일이 `/DESIGN.md`로 안내한다.

---

## 개발자로서 DESIGN.md 업데이트하기

### 새 컴포넌트 추가 시

1. `packages/ui/src/components/`에 컴포넌트 추가
2. `DESIGN.md`의 Section 5 (Components)에 항목 추가:
   ```markdown
   ### NewComponent
   
   **서브컴포넌트**: NewComponent, NewComponentItem
   **Props**: variant (`default|outline`), size (`sm|default|lg`)
   **사용 예시**: `<NewComponent variant="outline">...</NewComponent>`
   ```

### 새 색상 토큰 추가 시

1. `packages/tokens/src/semantic/`에 토큰 추가
2. `DESIGN.md`의 Section 3 (Color System) 시맨틱 토큰 테이블에 항목 추가:
   - CSS Variable명
   - 목적
   - Light hex 값
   - 사용 상황

### 검증 방법

DESIGN.md 업데이트 후:
1. 토큰명이 `packages/tokens/src/`의 실제 export와 일치하는지 확인
2. 컴포넌트명이 `packages/ui/src/components/`의 실제 파일명과 일치하는지 확인
3. AI 에이전트에게 간단한 UI 생성 요청으로 문서 유효성 검증

---

## 관련 파일

| 파일 | 목적 |
|------|------|
| `/DESIGN.md` | AI 에이전트용 디자인 시스템 문서 (메인 산출물) |
| `/AGENTS.md` | Codex용 에이전트 규칙 파일 |
| `/CLAUDE.md` | Claude Code 프로젝트 컨텍스트 |
| `packages/tokens/src/` | 디자인 토큰 소스 (정답 소스) |
| `packages/ui/src/components/` | UI 컴포넌트 소스 (정답 소스) |
| `specs/003-design-md/data-model.md` | DESIGN.md 콘텐츠 스키마 |

---

## Speckit 워크플로우

이 프로젝트는 speckit 워크플로우를 따른다:

```
/speckit.specify  →  /speckit.plan  →  /speckit.tasks  →  구현
```

UI 작업 전 항상 스펙을 먼저 작성하고, 구현은 tasks.md의 단계를 순서대로 따른다.
