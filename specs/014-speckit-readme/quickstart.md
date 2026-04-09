# 빠른 시작 가이드: Spec Kit README

**날짜**: 2026-04-09  
**기능**: 014-speckit-readme  
**참고**: 이 문서는 README.md 구현 시 "Quick Start" 섹션의 콘텐츠 초안이다.

---

## README의 Quick Start 섹션 콘텐츠

### 새 기능 시작하기

1. **Claude Code에서 기능 명세 생성**
   ```
   /speckit.specify [기능 설명]
   ```
   → 새 브랜치와 `specs/###-feature/spec.md` 생성

2. **명세 명확화 (선택 사항, 권장)**
   ```
   /speckit.clarify
   ```
   → 모호한 부분을 Claude가 질문하고 사용자가 답변. 명세에 반영.

3. **구현 계획 생성**
   ```
   /speckit.plan
   ```
   → `plan.md`, `research.md`, `data-model.md` 생성  
   → `before_plan` 훅: docguard 리뷰 자동 실행

4. **태스크 목록 생성**
   ```
   /speckit.tasks
   ```
   → `tasks.md` 생성 (Codex가 읽을 구현 단위)  
   → `before_tasks` 훅: docguard 리뷰 자동 실행  
   → `after_tasks` 훅: docguard 점수 자동 실행

5. **Codex로 구현 실행**
   ```
   codex
   ```
   → Codex가 `tasks.md`를 읽고 구현 실행  
   → 또는 Claude에서: `/speckit.implement`

6. **검증 및 마무리** (자동)
   - `after_implement` 훅: `speckit.verify.run` 자동 실행
   - `after_implement` 훅: `speckit.sync.analyze` 자동 실행
   - `after_implement` 훅: `speckit.retrospective.analyze` (선택 실행)

### 전체 흐름 요약

```
Claude: /speckit.specify → /speckit.clarify → /speckit.plan → /speckit.tasks
Codex:                                                         → implement
Auto:                                                                      → verify → sync → retrospective
```
