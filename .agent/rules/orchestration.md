# MASTER SKILL ORCHESTRATION PROTOCOL

This rule governs how agents select, compose, and execute skills from the `.agent/skills/` directory.

## 1. AUTOMATIC DISCOVERY HIERARCHY

When receiving a task, the agent MUST perform a recursive scan of `.agent/skills/` following this priority:

1. **Thematic Category**: Look into the `_` prefixed folder that matches the task domain (e.g., `_core`, `_frontend`).
2. **Specific Trigger**: Identify skills with a `description` or `metadata` that matches the current technical challenge.
3. **Composite Match**: If a task has multiple components (e.g., "Add a 3D Hero and pay for it"), the agent MUST select multiple skills for orchestration.

## 2. THE "DIRECTOR" PATTERN (ORCHESTRATION)

For complex objectives, the agent MUST initiate a **Composition Chain**:

- **Step 1 (Plan)**: Use `@senior-architect` or `@planning-with-files`.
- **Step 2 (Execute)**: Chain domain skills (e.g., `@nextjs-best-practices` -> `@three-js-expert`).
- **Step 3 (Verify)**: Use `@systematic-debugging` or `@playwright-skill`.

## 3. SELECTION CRITERIA

- **Specificity**: Prefer `@stripe-integration` over a general `@backend-dev-guidelines`.
- **Recency**: Use skills updated or mentioned in `_REORGANIZATION_PLAN.md`.
- **Anti-Redundancy**: Never use two skills that perform the same atomic task; pick the one in the `_core` directory first.

## 4. EXECUTION INVARIANTS

- **Pre-execution Check**: Before writing code, the agent MUST explicitly mention which skills it is invoking.
- **Context Injection**: Each skill's `SKILL.md` instructions take precedence over general system prompts for that specific sub-task.

> [!IMPORTANT]
> Failure to invoke at least one specialized skill for any non-trivial code change is a violation of the **GETTUPP ZENITH PROTOCOLS**.
