# 구현 계획: Spec Kit README

**브랜치**: `014-speckit-readme` | **날짜**: 2026-04-09 | **스펙**: [spec.md](./spec.md)  
**입력**: `/specs/014-speckit-readme/spec.md`의 기능 명세

## 요약 (Summary)

프로젝트 루트의 `README.md`를 새로 작성한다. Claude(스펙/계획/태스크 생성)와 Codex(구현 실행)를 활용한 AI 지원 개발 워크플로우를 설명하며, Spec Kit의 구성 요소(문서, 스킬, MCP, 훅, 익스텐션)와 개발 방법론을 소개한다. 기존 README.md를 완전히 대체하는 단일 마크다운 파일을 생성한다.

## 기술 컨텍스트 (Technical Context)

**언어/버전**: Markdown (문서 파일, 코드 없음)  
**주요 의존성**: 없음 (문서 전용)  
**저장소**: N/A  
**테스트**: 없음 (문서 파일)  
**대상 플랫폼**: GitHub / 로컬 에디터 (마크다운 렌더링)  
**프로젝트 타입**: 문서 (documentation)  
**성능 목표**: N/A  
**제약 조건**: 설치/셋업 안내 없음, 영어 전용, 프로젝트 루트 배치  
**규모/범위**: 단일 파일, ~200–400줄

## 헌법 준수 검사 (Constitution Check)

*게이트: Phase 0 리서치 전 통과 필수. Phase 1 설계 후 재검사.*

| 원칙 | 상태 | 비고 |
|------|------|------|
| I. 코드 품질 | ✅ 해당 없음 | 코드 없음 (순수 문서) |
| II. 테스트 표준 | ✅ 해당 없음 | 코드 없음 |
| III. UX 일관성 | ✅ 해당 없음 | UI 없음 |
| IV. 성능 요구사항 | ✅ 해당 없음 | 런타임 없음 |
| V. 단순성 | ✅ 통과 | 단일 파일, 외부 의존성 없음 |
| 문서 언어 정책 | ✅ 통과 | README는 영어(clarify에서 확정됨), plan/tasks는 한국어 |

**결론**: 모든 게이트 통과. Phase 1 진행 가능.

## 프로젝트 구조 (Project Structure)

### 이 기능의 문서

```text
specs/014-speckit-readme/
├── plan.md              # 이 파일
├── research.md          # Phase 0 산출물
├── data-model.md        # Phase 1 산출물
├── quickstart.md        # Phase 1 산출물
└── tasks.md             # Phase 2 산출물 (/speckit.tasks 명령어로 생성)
```

### 소스 코드 (저장소 루트)

```text
README.md                # 생성/교체 대상 파일 (유일한 변경 대상)
```

**구조 결정**: 이 기능은 저장소 루트에 단일 `README.md` 파일을 생성하는 것이 전부이다. 별도의 소스 디렉토리나 패키지 변경은 없다.
