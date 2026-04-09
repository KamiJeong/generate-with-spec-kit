# 리서치: Spec Kit README

**날짜**: 2026-04-09  
**기능**: 014-speckit-readme  
**목적**: README 작성에 필요한 모든 사실 정보를 코드베이스에서 직접 수집

---

## 결정 1: README 언어

- **결정**: 영어 전용
- **근거**: `/speckit.clarify`에서 사용자가 "recommended(Option A)"로 확정. 영어 기술 용어와의 일관성 및 유지보수 부담 최소화.
- **검토된 대안**: 한국어, 영/한 혼용 — 모두 기각

---

## 결정 2: README 범위

- **결정**: 워크플로우 및 사용법 전용. 설치/셋업 안내 없음.
- **근거**: `/speckit.clarify`에서 사용자가 확정. MCP, 훅 등은 이미 구성되어 있으므로 설정 방법이 아닌 사용 방법을 설명한다.
- **검토된 대안**: 전체 설치 가이드 포함, prerequisites 섹션 추가 — 기각

---

## 결정 3: 기존 README.md 처리

- **결정**: 프로젝트 루트의 `README.md`를 완전히 대체
- **근거**: `/speckit.clarify`에서 사용자가 확정. 저장소에 루트 README.md가 없으므로 새로 생성.
- **현재 상태**: `README.md`가 루트에 존재하지 않음 (node_modules 내부 파일만 존재)
- **검토된 대안**: 다른 경로(docs/SPECKIT.md), 기존 파일에 추가 — 기각

---

## 사실 수집: 프로젝트 구조

### AI 에이전트 설정 파일

| 경로 | 설명 |
|------|------|
| `.claude/` | Claude Code 설정. `commands/` 디렉토리에 모든 speckit 및 docguard 슬래시 커맨드 정의. `settings.json` 포함. |
| `.agents/` | Codex(및 기타 에이전트)용 스킬 디렉토리. `skills/` 하위에 speckit 및 docguard 스킬이 SKILL.md 형태로 존재. |
| `.agent/` | docguard 전용 스킬 (fix, guard, review, score). |
| `.codex/config.toml` | Codex MCP 서버 설정 (Storybook MCP: `http://localhost:6006/mcp`). |
| `.mcp.json` | Claude Code MCP 서버 설정 (동일하게 Storybook MCP 연결). |

### Claude 슬래시 커맨드 목록 (`.claude/commands/`)

**Spec Kit 워크플로우:**
| 커맨드 | 설명 |
|--------|------|
| `speckit.specify` | 기능 명세(spec.md) 생성 |
| `speckit.clarify` | 명세의 모호한 부분을 인터랙티브하게 명확화 |
| `speckit.plan` | 구현 계획(plan.md) 및 설계 산출물 생성 |
| `speckit.tasks` | 태스크 목록(tasks.md) 생성 |
| `speckit.implement` | tasks.md 기반으로 구현 실행 (Claude 사용 시) |
| `speckit.verify` / `speckit.verify.run` | 구현이 명세를 충족하는지 검증 |
| `speckit.analyze` | 스펙/계획/태스크 간 일관성 및 품질 분석 |
| `speckit.checklist` | 기능별 커스텀 체크리스트 생성 |
| `speckit.constitution` | 프로젝트 헌법(constitution.md) 생성/업데이트 |
| `speckit.drift` | 명세와 구현 간 드리프트 분석 |
| `speckit.taskstoissues` | tasks.md를 GitHub 이슈로 변환 |
| `speckit.retrospective.analyze` | 구현 후 회고 분석 |

**Sync 서브커맨드:**
| 커맨드 | 설명 |
|--------|------|
| `speckit.sync.analyze` | 드리프트 감지 |
| `speckit.sync.propose` | 드리프트 해결 제안 |
| `speckit.sync.apply` | 드리프트 해결 적용 |
| `speckit.sync.backfill` | 구현된 코드에서 명세 역생성 |
| `speckit.sync.conflicts` | 명세 간 충돌 감지 |

**DocGuard 커맨드:**
| 커맨드 | 설명 |
|--------|------|
| `speckit.docguard.review` | 문서 일관성 리뷰 |
| `speckit.docguard.guard` | 19개 검증기 품질 게이트 실행 |
| `speckit.docguard.score` | CDD 성숙도 점수 계산 |
| `speckit.docguard.fix` | 문서 이슈 자동 수정 |
| `speckit.docguard.generate` / `diagnose` | 정규 문서 역생성/진단 |

### Codex 스킬 목록 (`.agents/skills/`)

Codex는 `.agents/skills/` 디렉토리의 SKILL.md 파일을 읽어 동일한 Spec Kit 워크플로우를 실행한다. 주요 스킬:
- `speckit-specify`, `speckit-clarify`, `speckit-plan`, `speckit-tasks`
- `speckit-implement` — **구현 실행의 핵심 스킬**
- `speckit-verify`, `speckit-analyze`, `speckit-drift`
- `speckit-sync.*`, `speckit-docguard.*`, `speckit-retrospective.analyze`

### MCP 통합

| MCP 서버 | URL | 용도 |
|----------|-----|------|
| Storybook MCP | `http://localhost:6006/mcp` | UI 컴포넌트 문서 조회, 스토리 미리보기, 테스트 실행 |

- Claude Code: `.mcp.json`에서 설정
- Codex: `.codex/config.toml`에서 설정
- 전제조건: Storybook 개발 서버 실행 중이어야 함 (`pnpm --filter @myorg/ui storybook`)

### 훅 (`.specify/extensions.yml`)

| 훅 | 커맨드 | 필수여부 |
|----|--------|---------|
| `before_plan` | `speckit.docguard.review` | 필수 (mandatory) |
| `before_tasks` | `speckit.docguard.review` | 필수 (mandatory) |
| `after_tasks` | `speckit.docguard.score` | 필수 (mandatory) |
| `after_implement` | `speckit.verify.run` | 필수 (mandatory) |
| `after_implement` | `speckit.sync.analyze` | 필수 (mandatory) |
| `after_implement` | `speckit.retrospective.analyze` | 선택 (optional) |

### Spec Kit 문서 구조 (`specs/###-feature-name/`)

| 파일 | 생성 커맨드 | 내용 |
|------|------------|------|
| `spec.md` | `/speckit.specify` | 기능 명세 (무엇을, 왜) |
| `plan.md` | `/speckit.plan` | 구현 계획 (설계, 연구, 컨텍스트) |
| `tasks.md` | `/speckit.tasks` | 구현 태스크 목록 (단계별 작업) |
| `research.md` | `/speckit.plan` | 기술 리서치 결과 |
| `data-model.md` | `/speckit.plan` | 데이터 모델 설계 |
| `checklists/` | `/speckit.checklist` | 품질 체크리스트 |

### 핵심 설정 파일

| 파일 | 설명 |
|------|------|
| `.specify/extensions.yml` | 훅 및 익스텐션 설정 |
| `.specify/memory/constitution.md` | 프로젝트 헌법 (개발 원칙) |
| `.specify/init-options.json` | Spec Kit 초기화 옵션 (AI 에이전트, 브랜치 번호링 등) |
| `CLAUDE.md` | Claude Code 프로젝트 지침 |
| `DESIGN.md` | 디자인 시스템 가이드 |

---

## 미해결 사항

없음. README 작성에 필요한 모든 정보가 코드베이스에서 확인됨.
