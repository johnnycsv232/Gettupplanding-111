---
description: Verify skill discovery is working correctly
---

# Skill Discovery Check

Use this workflow to validate the Antigravity skill system is functioning.

## Steps

1. List all skill folders:

```bash
ls .agent/skills | wc -l
```

Expected: 200+ skills

1. Verify SKILL.md files exist:

```bash
find .agent/skills -name "SKILL.md" | wc -l
```

Expected: Same count as step 1 (minus .vscode folder)

1. Check a sample skill has valid YAML frontmatter:

```bash
head -10 .agent/skills/using-superpowers/SKILL.md
```

Expected: Should see `---`, `name:`, `description:`, `---`

1. Verify SKILL_TRIGGERS.md exists:

```bash
cat .agent/SKILL_TRIGGERS.md | head -20
```

## Test Invocation

To test skill discovery, start a new conversation with a prompt like:

- "Help me add Stripe checkout" → Should invoke `stripe-integration`
- "Debug this build error" → Should invoke `systematic-debugging`
- "Optimize the hero section" → Should invoke `3d-web-experience`
