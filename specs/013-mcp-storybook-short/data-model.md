# 데이터 모델: Storybook MCP 서버 적용

**브랜치**: `013-mcp-storybook-short` | **날짜**: 2026-04-09

## 엔티티 정의

이 feature는 새로운 데이터 엔티티를 도입하지 않는다. 설정 파일 구조만 변경된다.

### 설정 엔티티

#### 1. Storybook Main Config (`packages/ui/.storybook/main.ts`)

| 필드 | 변경 | 설명 |
|------|------|------|
| `addons` | 수정 | `@storybook/addon-mcp` 항목 추가 |

**변경 전**:
```typescript
addons: [
  '@storybook/addon-docs',
  '@storybook/addon-a11y',
  '@storybook/addon-vitest',
]
```

**변경 후**:
```typescript
addons: [
  '@storybook/addon-docs',
  '@storybook/addon-a11y',
  '@storybook/addon-vitest',
  '@storybook/addon-mcp',
]
```

#### 2. Package Dependencies (`packages/ui/package.json`)

| 필드 | 변경 | 설명 |
|------|------|------|
| `devDependencies` | 추가 | `@storybook/addon-mcp` 패키지 추가 |

`npx storybook add` 명령이 자동으로 처리한다.

#### 3. CLAUDE.md (프로젝트 루트)

| 섹션 | 변경 | 설명 |
|------|------|------|
| Commands | 추가 | `pnpm --filter @myorg/ui storybook` 명령 추가 (MCP 서버 포함) |
| MCP 사용 지침 | 신규 | AI 에이전트용 MCP 도구 사용 가이드 섹션 추가 |

#### 4. MCP 서버 설정 (자동 생성)

`npx mcp-add` 실행 시 생성되는 설정 파일:

| 파일 | 용도 |
|------|------|
| `.claude/settings.json` | Claude Code MCP 서버 연결 설정 |

**설정 구조** (`.claude/settings.json`):
```json
{
  "mcpServers": {
    "storybook": {
      "type": "http",
      "url": "http://localhost:6006/mcp"
    }
  }
}
```

## 관계도

```text
Storybook Dev Server (port 6006)
  ├── 기존 UI (브라우저)
  └── /mcp 엔드포인트 (MCP 프로토콜)
        ├── Documentation 도구셋
        ├── Development 도구셋
        └── Testing 도구셋
              └── @storybook/addon-vitest (기존 테스트 인프라 활용)
```

## 상태 전이

해당 없음. 이 feature는 stateless 설정 변경이다.
