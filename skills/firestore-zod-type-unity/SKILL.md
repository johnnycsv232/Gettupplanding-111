---
name: firestore-zod-type-unity
description: Enforcing a single source of truth for Firestore documents and TypeScript types using Zod. Covers schema validation for writes and type-safe reads. Use when: firestore schema, zod validation, shared types, firestore types.
---

# Firestore & Zod Type Unity

Expert strategies for maintaining data integrity between your application and your document store.

## The Strategy

Define a central Zod schema in `src/lib/schemas/` and use it for:
1. **Writing**: `schema.parse(data)` before `setDoc`.
2. **Reading**: `schema.safeParse(doc.data())` to handle legacy data gracefully.
3. **Typing**: `type User = z.infer<typeof userSchema>`.

## Benefits
- No more "impossible" data states.
- Shared validation logic between Frontend forms and Backend actions.
- Automatic documentation of your data model through the Zod schema.
