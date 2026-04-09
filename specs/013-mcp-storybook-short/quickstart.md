# 빠른 시작 가이드: Storybook MCP 서버 적용

**브랜치**: `013-mcp-storybook-short` | **날짜**: 2026-04-09

## 구현 단계

### Step 1: MCP Addon 설치

`packages/ui` 디렉토리에서 Storybook CLI를 사용하여 addon을 설치한다.

```bash
cd packages/ui
npx storybook add @storybook/addon-mcp
```

이 명령은:
1. `@storybook/addon-mcp`를 devDependencies에 추가
2. `.storybook/main.ts`의 addons 배열에 `@storybook/addon-mcp` 등록

**검증**: `packages/ui/package.json`의 devDependencies에 `@storybook/addon-mcp`가 존재하는지 확인.

### Step 2: Addon 등록 확인

`packages/ui/.storybook/main.ts`에 addon이 올바르게 등록되었는지 확인한다.

```typescript
addons: [
  '@storybook/addon-docs',
  '@storybook/addon-a11y',
  '@storybook/addon-vitest',
  '@storybook/addon-mcp',
],
```

자동 등록이 실패한 경우, 수동으로 addons 배열에 `'@storybook/addon-mcp'`를 추가한다.

### Step 3: MCP 서버 연결 설정

프로젝트 루트에서 `npx mcp-add`를 실행하여 AI 에이전트용 MCP 서버 설정을 등록한다.

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

- 서버 이름 입력 프롬프트에 `storybook` 입력
- 프로젝트 스코프로 설정하여 `.claude/settings.json`에 MCP 서버 항목이 추가됨

### Step 4: CLAUDE.md 업데이트

프로젝트 루트 `CLAUDE.md`에 MCP 사용 지침 섹션을 추가한다.

추가 위치: `## Commands` 섹션 이후, `<!-- MANUAL ADDITIONS START -->` 이전.

추가 내용:
- Storybook 개발 서버 실행 명령 (`pnpm --filter @myorg/ui storybook`)
- MCP 도구 사용 지침 (컴포넌트 작업 전 문서 조회 필수)
- 사용 가능한 MCP 도구 목록 (6개 도구)

### Step 5: 동작 검증 (수동 테스트)

1. Storybook 개발 서버 시작:
   ```bash
   pnpm --filter @myorg/ui storybook
   ```

2. 브라우저에서 `http://localhost:6006/mcp` 접속하여 MCP 엔드포인트 응답 확인

3. AI 에이전트(Claude Code)에서 MCP 도구 호출 테스트:
   - `list-all-documentation`: 컴포넌트 목록 조회
   - `get-documentation`: 특정 컴포넌트 상세 문서 조회
   - `run-story-tests`: 스토리 테스트 실행

## 주의사항

- Storybook 개발 서버가 실행 중이어야 MCP 엔드포인트가 활성화됨
- MCP 기능은 현재 preview 단계 — React 전용, API 변경 가능성 있음
- `npx storybook add` 명령이 pnpm 패키지 매니저를 자동 감지하여 올바른 설치 명령 실행
