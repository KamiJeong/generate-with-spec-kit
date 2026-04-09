# Feature Specification: Spec Kit README

**Feature Branch**: `014-speckit-readme`  
**Created**: 2026-04-09  
**Status**: Draft  
**Input**: User description: "add README.md for what we are doing with spec kit (claude, codex) - i am trying generate spec, plan, tasks with claude, - i am trying generate implement with codex - what we are using spec kit (documents, skills, mcp, hook, extensions) - how to developing with ai and spec kit"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - New Developer Onboarding (Priority: P1)

A developer who is new to this project reads the README to understand the AI-assisted development workflow using Spec Kit with Claude and Codex. They need to understand the overall process: how Claude generates specs/plans/tasks, and how Codex executes the implementation.

**Why this priority**: This is the primary purpose of the README — enabling any new contributor to quickly understand and participate in the AI-driven workflow without prior knowledge.

**Independent Test**: Can be tested by giving the README to a developer unfamiliar with the project; they should be able to describe the full workflow correctly after reading it.

**Acceptance Scenarios**:

1. **Given** a developer has no prior knowledge of the project, **When** they read the README, **Then** they understand that Claude is used for spec/plan/task generation and Codex is used for implementation.
2. **Given** a developer reads the README, **When** they look for the workflow steps, **Then** they find a clear step-by-step guide: specify → clarify → plan → tasks → implement.
3. **Given** a developer reads the README, **When** they want to start a new feature, **Then** they know which AI tool to use at each stage and what commands to run.

---

### User Story 2 - Understanding Spec Kit Components (Priority: P2)

A developer wants to understand what tools and components make up Spec Kit in this project: documents (spec.md, plan.md, tasks.md), skills (slash commands), MCP integrations, hooks, and extensions.

**Why this priority**: Understanding the components helps developers use and extend the workflow correctly. Without this, they may skip steps or misuse tools.

**Independent Test**: Can be tested by verifying the README lists and explains each component category with examples.

**Acceptance Scenarios**:

1. **Given** a developer reads the README, **When** they look for what documents Spec Kit manages, **Then** they find descriptions of spec.md, plan.md, and tasks.md.
2. **Given** a developer reads the README, **When** they look for available skills/slash commands, **Then** they find a list of key commands (e.g., /speckit.specify, /speckit.plan, /speckit.tasks, /speckit.implement).
3. **Given** a developer reads the README, **When** they look for hooks and extensions, **Then** they find an explanation of before/after hooks and how extensions like docguard integrate with the workflow.

---

### User Story 3 - AI-Assisted Development Guide (Priority: P3)

A developer wants to understand the philosophy and practical approach of developing with AI and Spec Kit — what role the human plays, what role the AI plays, and how to get the best results.

**Why this priority**: Guidance on how to collaborate with AI effectively reduces friction and improves output quality, but it is supplementary to the core workflow documentation.

**Independent Test**: Can be tested by verifying the README includes a section on AI collaboration best practices or workflow philosophy.

**Acceptance Scenarios**:

1. **Given** a developer reads the README, **When** they look for guidance on collaborating with AI, **Then** they find practical tips on writing good feature descriptions and when to clarify vs. proceed.
2. **Given** a developer reads the README, **When** they finish reading, **Then** they understand the division of responsibility: human owns the "what", AI generates the "how to specify and plan", Codex executes the implementation.

---

### Edge Cases

- What happens if a developer skips the spec step and goes directly to implementation?
- How does a developer recover if the generated spec does not match their intent?
- What should a developer do when Codex fails to implement a task correctly?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: README MUST explain the overall AI-assisted development workflow using Claude for spec/plan/tasks generation and Codex for implementation.
- **FR-002**: README MUST describe the role of each Spec Kit document: spec.md, plan.md, and tasks.md.
- **FR-003**: README MUST list the key Spec Kit skills (slash commands) available in Claude Code, with a brief description of each.
- **FR-004**: README MUST explain what MCP (Model Context Protocol) integrations are used and how they assist the workflow (e.g., Storybook MCP for UI work).
- **FR-005**: README MUST describe the hooks system: before/after hooks, and which hooks are configured in this project (e.g., docguard before planning, verify after implementation).
- **FR-006**: README MUST describe extensions (e.g., docguard, verify, sync, retrospective) and their role in the quality gate.
- **FR-007**: README MUST include a step-by-step quick start guide for starting a new feature using the full workflow. It MUST NOT include installation or setup instructions; a developer is assumed to have the tooling already configured.
- **FR-008**: README MUST include guidance on how to develop effectively with AI, including tips for writing feature descriptions and when to use Claude vs. Codex.
- **FR-009**: README MUST be written in a way that is accessible to developers who have not used Spec Kit before.

### Key Entities

- **Spec Kit Workflow**: The end-to-end process from feature description to implemented code, mediated by AI agents.
- **Claude (AI Agent)**: Responsible for generating spec.md, plan.md, and tasks.md from natural language feature descriptions.
- **Codex (AI Agent)**: Responsible for executing implementation tasks defined in tasks.md.
- **Spec Kit Documents**: spec.md (what to build), plan.md (how to design it), tasks.md (discrete implementation steps).
- **Skills**: Slash commands in Claude Code that trigger Spec Kit workflows (e.g., /speckit.specify, /speckit.plan, /speckit.implement).
- **MCP Integrations**: Model Context Protocol servers that give AI agents live access to tools like Storybook.
- **Hooks**: Automated commands that run before or after key Spec Kit stages (before_plan, after_tasks, after_implement, etc.).
- **Extensions**: Optional or mandatory quality gates that integrate into the workflow (docguard, verify, sync, retrospective).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A developer new to the project can describe the full AI-assisted workflow correctly after reading the README alone, without needing to ask teammates for clarification.
- **SC-002**: The README covers all 4 component categories: documents, skills, MCP integrations, and hooks/extensions — each with at least one concrete example.
- **SC-003**: A developer can start a new feature using the workflow within 10 minutes of reading the README for the first time.
- **SC-004**: 90% of developers who read the README understand the distinct roles of Claude and Codex in the workflow.

## Clarifications

### Session 2026-04-09

- Q: What language should the README be written in? → A: English only
- Q: Should the README include installation/setup instructions or focus on workflow and usage only? → A: Workflow and usage only — no setup/installation section
- Q: Should the new README replace the existing root README.md or be placed elsewhere? → A: Replace the existing root README.md entirely

## Assumptions

- The README will replace the existing file at the project root (`README.md`) and will be the primary entry point for new contributors.
- The target audience is developers who are familiar with Git and command-line tools but may be new to AI-assisted development workflows.
- The README will be written entirely in English.
- MCP tools (Storybook MCP) are already configured in the project; the README describes their purpose, not their setup.
- The hooks and extensions described are those currently configured in `.specify/extensions.yml`.
- The README is a living document and will be updated as the workflow evolves; version history is tracked via Git.
