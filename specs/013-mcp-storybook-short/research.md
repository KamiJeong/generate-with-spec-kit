# 연구: Storybook MCP 서버 적용

**브랜치**: `013-mcp-storybook-short` | **날짜**: 2026-04-09

## 연구 항목

### 1. MCP Addon 설치 및 등록 방법

**결정**: `npx storybook add @storybook/addon-mcp` 명령으로 설치. 이 명령은 패키지 설치와 `.storybook/main.ts`의 addons 배열에 자동 등록을 모두 수행한다.

**근거**: Storybook 공식 문서에서 권장하는 표준 addon 설치 방법. `npx storybook add` 명령은 패키지 매니저를 자동 감지하고(이 프로젝트는 pnpm), devDependencies에 추가하며, `main.ts`의 addons 배열에 엔트리를 삽입한다.

**대안 검토**:
- 수동 설치(`pnpm add -D @storybook/addon-mcp` + main.ts 수동 편집): 가능하지만 `npx storybook add`가 더 안전하고 설정 누락 방지
- 자동 설치가 실패할 경우 수동 방법으로 fallback

### 2. MCP 도구셋 활성화 설정

**결정**: 3개 도구셋(Development, Documentation, Testing) 모두 활성화. `@storybook/addon-mcp`는 기본적으로 모든 도구셋을 활성화하므로 별도 설정 없이 addon 등록만으로 충분하다.

**근거**: 스펙 FR-010에서 3개 도구셋 모두 활성화 요구. MCP addon은 기본 설정으로 전체 도구셋을 포함하며, 개별 비활성화 옵션은 제공되지만 이 프로젝트에서는 불필요.

**사용 가능한 도구 목록**:

| 도구셋 | 도구 이름 | 기능 |
|---------|-----------|------|
| Documentation | `list-all-documentation` | 전체 컴포넌트 및 문서 목록 반환 |
| Documentation | `get-documentation` | 특정 컴포넌트의 상세 문서 (props, 스토리, 사용 예시) |
| Documentation | `get-documentation-for-story` | 특정 스토리의 소스 코드 및 관련 문서 |
| Development | `get-storybook-story-instructions` | 스토리 작성 가이드 및 인터랙션 테스트 지침 |
| Development | `preview-stories` | 스토리 렌더링 미리보기 (이미지 또는 링크) |
| Testing | `run-story-tests` | 스토리 테스트 실행 및 결과 반환 (접근성 이슈 포함) |

### 3. MCP 엔드포인트 구조

**결정**: Storybook 개발 서버 실행 시 MCP 엔드포인트가 `http://localhost:6006/mcp`에 자동 활성화된다.

**근거**: MCP addon은 Storybook 개발 서버의 HTTP 미들웨어로 동작하며, 별도 포트나 프로세스 없이 동일 포트(기본 6006)에서 서비스된다. 브라우저에서 접속하면 사용 가능한 도구 목록과 manifest debugger 링크를 표시한다.

### 4. AI 에이전트 연결 방법

**결정**: `npx mcp-add` CLI 도구를 사용하여 프로젝트 스코프로 MCP 서버를 등록한다.

**근거**: Storybook 공식 문서에서 권장하는 범용 방법. 에이전트별 설정 파일을 자동 생성한다.

```bash
npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
```

이 명령은 프로젝트 루트에 에이전트별 설정 파일을 생성/업데이트한다:
- Claude Code: `.claude/settings.json`의 `mcpServers` 항목
- VS Code Copilot: `.vscode/mcp.json`
- 기타 MCP 호환 에이전트: 해당 에이전트의 MCP 설정 파일

**이 프로젝트 적용**: CLAUDE.md에 MCP 사용 지침만 추가 (FR-009). 에이전트 설정 파일(`.claude/settings.json`)은 `npx mcp-add` 실행 시 자동 생성.

### 5. 기존 Storybook 설정 호환성

**결정**: 기존 설정과 완전 호환. addon 배열에 추가만 하면 된다.

**근거**: 현재 `main.ts`의 addons:
- `@storybook/addon-docs` — 문서 자동 생성
- `@storybook/addon-a11y` — 접근성 검사
- `@storybook/addon-vitest` — Vitest 통합 테스트

`@storybook/addon-mcp`는 이들과 독립적으로 동작하며, 기존 addon 기능에 영향을 주지 않는다. MCP Testing 도구셋의 `run-story-tests`는 기존 `@storybook/addon-vitest` 설정을 활용한다.

### 6. Preview 단계 제약사항

**결정**: React 전용 제약을 수용하고 진행.

**근거**: 이 프로젝트는 `@storybook/react-vite` 기반이므로 React 전용 제약에 해당하지 않음. Vue, Angular, Svelte 등 다른 프레임워크 지원은 향후 Storybook 업데이트에서 제공 예정. API 변경 가능성은 스펙의 가정 섹션에 이미 문서화됨.
