---
name: react-server-actions-optimistic-ui
description: Bridging the gap between Next.js Server Actions and immediate UI feedback using optimistic updates. Covers useOptimistic hook and state management during mutations. Use when: server action, optimistic update, useOptimistic, mutation feedback.
---

# React Server Actions & Optimistic UI

Expert patterns for making server-heavy operations feel instantaneous to the user.

## Implementation Flow

1. **Trigger**: User interacts with a form or button.
2. **Optimistic Change**: Use `useOptimistic` to immediately update the local state with the expected outcome.
3. **Execution**: Fire the Server Action.
4. **Resolution**: The optimistic state is automatically replaced when the server response arrives.

## Integration Tips
- Use a `pending` state to dim or overlay the UI during the transition.
- Ensure the optimistic state matches the exact shape of your actual data to avoid "jumping" UI.
