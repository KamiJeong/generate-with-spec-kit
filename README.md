# generate-with-spec-kit

AI-assisted development in this repository follows a Spec Kit workflow: define the feature with Claude, turn that into a concrete plan and task list, then use Codex to execute the implementation.

This README is a workflow guide, not an installation guide. It explains how this project uses Spec Kit documents, slash commands, MCP integrations, hooks, and extensions so a new contributor can start a feature without reverse-engineering the process from scattered config files.

## Overview

Spec Kit gives the repository a repeatable path from feature idea to implementation:

- Claude is responsible for specification work.
- Codex is responsible for implementation work.
- Hooks and extensions run quality checks around the workflow.
- MCP integrations give the agents live tooling when a task needs more than static files.

In practice, that means you should avoid jumping directly into code. Start with the feature description, let Claude create the spec artifacts, review and clarify them, then hand the task list to Codex for execution.

## Workflow

The default flow in this repository is:

```text
Human
  -> describe the feature and review AI output

Claude
  -> /speckit.specify
  -> /speckit.clarify      (recommended when anything is ambiguous)
  -> /speckit.plan
  -> /speckit.tasks

Codex
  -> read tasks.md
  -> implement the work
  -> update task checkboxes as work completes

Automatic hooks
  -> verify
  -> sync analysis
  -> retrospective (optional)
```

You can also think of the workflow as a handoff:

```text
specify -> clarify -> plan -> tasks -> implement -> verify
   Claude-owned planning work       Codex-owned execution
```

### Step by Step

1. Write the feature request in plain language.
2. Run `/speckit.specify` in Claude to create `spec.md`.
3. Run `/speckit.clarify` if the scope, constraints, or success criteria are not sharp enough.
4. Run `/speckit.plan` to generate the design and research artifacts.
5. Run `/speckit.tasks` to generate an ordered execution plan.
6. Open Codex and execute the implementation from `tasks.md`.
7. Let the post-implementation hooks validate the result.

## Quick Start

Use this when starting a new feature. The examples assume you already have the repository and tools configured.

### 1. Create the feature spec in Claude

```text
/speckit.specify [feature description]
```

This creates a new feature directory under `specs/###-feature-name/` with the initial `spec.md`.

### 2. Clarify the spec before planning

```text
/speckit.clarify
```

Use this when the generated spec is directionally right but still underspecified. Clarify before planning instead of fixing the plan later.

### 3. Generate the implementation plan

```text
/speckit.plan
```

This produces the design artifacts that shape implementation, typically including:

- `plan.md`
- `research.md`
- `data-model.md`
- `quickstart.md`

This stage also triggers the `before_plan` hook configured in `.specify/extensions.yml`.

### 4. Generate the task list

```text
/speckit.tasks
```

This creates `tasks.md`, which is the execution contract for implementation. The task file defines phases, dependencies, parallel work, and completion tracking.

This stage also triggers:

- `before_tasks` -> docguard review
- `after_tasks` -> docguard score

### 5. Execute implementation with Codex

```text
codex
```

In Codex, point the agent at the feature and have it execute the work from `tasks.md`. Codex is expected to read the generated plan artifacts, implement the tasks in order, and mark completed tasks as done.

If you are staying inside Claude instead of switching tools, `/speckit.implement` exists as the equivalent implementation command.

### 6. Finish with automatic validation

After implementation, this repository is configured to run post-implementation hooks for validation and drift analysis.

## Release Automation

This repository publishes release artifacts from `main` only. Feature branches and pull requests validate readiness but do not publish packages or deploy public documentation.

### Private Packages

The release workflow publishes these packages to GitHub Packages:

| Package | Registry | Visibility |
|---|---|---|
| `@myorg/tokens` (`packages/tokens`) | `https://npm.pkg.github.com` | Restricted/private |
| `@myorg/ui` (`packages/ui`) | `https://npm.pkg.github.com` | Restricted/private |

Before publication, the workflow runs package-specific lint, test, and build gates. It also checks whether the package version already exists in the registry. Existing versions are not republished; the workflow reports them as skipped with a duplicate-version failure category so maintainers can rerun only the failed path.

### Storybook on GitHub Pages

The release workflow builds `packages/ui` Storybook and deploys the static `packages/ui/storybook-static` artifact to GitHub Pages. Storybook build or test failures stop the Pages deployment, leaving the currently published site unchanged.

### Required Permissions

The workflow uses least-privilege job permissions:

| Job | Required permissions |
|---|---|
| Package validation | `contents: read` |
| Package publication | `contents: read`, `packages: write` |
| Storybook build | `contents: read` |
| GitHub Pages deployment | `contents: read`, `pages: write`, `id-token: write` |

`GITHUB_TOKEN` is used for GitHub Packages publication. Do not print token values in logs, summaries, or artifacts.

### Maintainer Release Flow

1. Merge the release-ready change to `main`.
2. Confirm `packages/tokens` and `packages/ui` versions are correct.
3. Publish a GitHub release, or run the publish workflow manually from `main`.
4. Review the workflow summary for `tokens_publication`, `ui_publication`, `storybook_publication`, `failure_category`, and `page_url`.
5. If only one path fails, rerun the workflow from `main` and enable only the failed package or Storybook path.

### Local Verification

Run this before merging release automation changes:

```text
pnpm release:verify
pnpm --filter @myorg/tokens lint
pnpm --filter @myorg/tokens test
pnpm --filter @myorg/tokens build
pnpm --filter @myorg/ui lint
pnpm --filter @myorg/ui test
pnpm --filter @myorg/ui build
pnpm --filter @myorg/ui build-storybook
```

## Spec Kit Documents

Each feature lives in its own `specs/###-feature-name/` directory. The core documents are:

| Document | Purpose | Generated by |
|---|---|---|
| `spec.md` | Defines what to build, why it matters, user stories, requirements, and success criteria. | `/speckit.specify` |
| `plan.md` | Defines how the feature should be designed and implemented. | `/speckit.plan` |
| `tasks.md` | Defines the concrete execution steps, dependencies, and phase ordering. | `/speckit.tasks` |

Supporting documents are created when relevant:

| Document | Purpose |
|---|---|
| `research.md` | Records technical decisions, constraints, and repo facts collected during planning. |
| `data-model.md` | Describes the entities or information architecture involved in the feature. |
| `quickstart.md` | Captures the intended operator flow for the feature or workflow. |
| `checklists/` | Holds requirement or quality checklists that should be green before implementation starts. |

The document chain matters:

- `spec.md` answers "what are we building?"
- `plan.md` answers "how should we design it?"
- `tasks.md` answers "what exactly should be executed, and in what order?"

## Skills and Slash Commands

This repository supports the workflow in both Claude Code and Codex, but the command surfaces are different.

### Claude Commands

Claude commands live in `.claude/commands/`. Key commands include:

| Command | What it does |
|---|---|
| `/speckit.specify` | Creates the initial feature specification. |
| `/speckit.clarify` | Resolves ambiguity in the current spec. |
| `/speckit.plan` | Generates the implementation plan and supporting artifacts. |
| `/speckit.tasks` | Generates the task breakdown from the plan. |
| `/speckit.implement` | Executes the implementation workflow from `tasks.md`. |
| `/speckit.verify` or `/speckit.verify.run` | Validates the implementation against the spec artifacts. |
| `/speckit.sync.analyze` | Checks for drift between implementation and specification. |
| `/speckit.retrospective.analyze` | Produces a post-implementation retrospective. |
| `/speckit.docguard.review` | Reviews documentation consistency. |
| `/speckit.docguard.score` | Computes documentation maturity signals after task generation. |

### Codex Skills

Codex skills live in `.agents/skills/` as `SKILL.md` files. They mirror the Spec Kit workflow so Codex can execute the same process from its own environment. Important examples:

- `.agents/skills/speckit-specify`
- `.agents/skills/speckit-plan`
- `.agents/skills/speckit-tasks`
- `.agents/skills/speckit-implement`
- `.agents/skills/speckit-verify`
- `.agents/skills/speckit-sync.analyze`

The key handoff point is `speckit-implement`: Claude generates the plan and tasks, then Codex consumes those artifacts to perform the implementation.

### DocGuard Skills

The repository also contains `.agent/skills/` for DocGuard-specific workflows such as review, score, guard, and fix. These are separate from `.agents/skills/` and exist to support documentation quality gates.

## MCP Integration

This project uses Storybook MCP so agents can query live component documentation and run story workflows during UI tasks.

| File | Role |
|---|---|
| `.mcp.json` | Claude-side MCP configuration |
| `.codex/config.toml` | Codex-side MCP configuration |

Both files point at the same Storybook MCP server:

```text
http://localhost:6006/mcp
```

The UI package exposes the expected Storybook command:

```text
pnpm --filter @myorg/ui storybook
```

Run that before expecting Storybook MCP tools to work. Once Storybook is running, agents can use MCP-powered documentation lookup, story previews, and story tests instead of relying only on static code search.

## Hooks and Extensions

Hooks are automatic commands that run before or after key Spec Kit stages. The configuration for this repository lives in `.specify/extensions.yml`.

### Configured Hooks

| Stage | Command | Role | Optional |
|---|---|---|---|
| `before_plan` | `speckit.docguard.review` | Review documentation consistency before planning. | No |
| `before_tasks` | `speckit.docguard.review` | Review documentation consistency before generating tasks. | No |
| `after_tasks` | `speckit.docguard.score` | Check documentation maturity after task generation. | No |
| `after_implement` | `speckit.verify.run` | Validate implementation against the specification. | No |
| `after_implement` | `speckit.sync.analyze` | Analyze drift between implementation and specification. | No |
| `after_implement` | `speckit.retrospective.analyze` | Generate a retrospective after implementation. | Yes |

### Extensions in This Repository

The hook commands are backed by a small set of extensions with distinct jobs:

| Extension | Purpose |
|---|---|
| `docguard` | Reviews documentation quality and measures documentation maturity. |
| `verify` | Checks whether the implementation actually satisfies the spec artifacts. |
| `sync` | Finds drift between the written specification and the implemented result. |
| `retrospective` | Captures what happened after implementation for future improvement. |

The practical takeaway is simple: quality gates are part of the workflow, not an afterthought. If the spec is weak, DocGuard should catch it early. If implementation drifts, verify and sync should catch it at the end.

## Developing with AI

AI works best here when responsibilities stay clear.

### Division of Responsibility

| Actor | Owns |
|---|---|
| Human | Product intent, constraints, tradeoffs, approval, and final judgment |
| Claude | Converting intent into a specification, plan, and task structure |
| Codex | Executing the task list, editing files, running checks, and reporting implementation results |

The human still owns the "what" and the acceptance bar. Claude and Codex accelerate the "how," but they are not a substitute for clear intent.

### How to Get Better Results

- Describe the problem, not just the UI or code change.
- Include constraints early: scope limits, language requirements, rollout expectations, and non-goals.
- Use `/speckit.clarify` whenever the generated spec is missing important detail.
- Review `plan.md` and `tasks.md` before implementation starts; bad inputs produce bad execution.
- Keep tasks small and sequential where file overlap is high.
- Treat the generated artifacts as living documents and correct them before asking Codex to implement.

### Edge Cases and Recovery

**If the spec does not match your intent**

Run `/speckit.clarify` again or regenerate the spec before moving on. Fixing ambiguity at the spec stage is cheaper than patching a misaligned implementation later.

**If Codex fails during implementation**

Re-run the implementation workflow with better constraints, or retry after correcting `tasks.md` and any missing context in the spec artifacts. Do not assume the task list is correct just because it was generated.

**If someone tries to skip straight to implementation**

That usually means the team loses the shared contract that `spec.md`, `plan.md`, and `tasks.md` provide. The result is predictable: weaker requirements, noisier reviews, and more rework.

## Repository Pointers

These files and directories are the main reference points for the workflow in this repository:

- `.claude/commands/` for Claude slash commands
- `.agents/skills/` for Codex skill definitions
- `.agent/skills/` for DocGuard-focused skills
- `.codex/config.toml` for Codex MCP configuration
- `.mcp.json` for Claude MCP configuration
- `.specify/extensions.yml` for hook and extension configuration
- `specs/` for feature-level Spec Kit artifacts

When in doubt, inspect the generated feature directory first, then run the next command in the workflow instead of inventing a shortcut.
