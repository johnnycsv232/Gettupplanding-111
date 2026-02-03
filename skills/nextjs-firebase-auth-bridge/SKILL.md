---
name: nextjs-firebase-auth-bridge
description: Managing authentication state synchronization between Next.js Server Components and the Firebase Client SDK. Covers session management, middleware-level auth checks, and using Firebase ID tokens securely in the App Router. Use when: next.js auth, firebase session, server component auth, firebase id token.
---

# Next.js & Firebase Auth Bridge

Expert guidance on bridging the gap between Next.js server-side rendering and Firebase's client-centric auth model.

## Core Patterns

### 1. The Token Exchange
Use a secure HTTP-only cookie to share the Firebase ID token with the server.
- **Client**: `onIdTokenChanged` -> send to `/api/login` -> create cookie.
- **Server**: Middleware or Server Component -> read cookie -> `adminAuth.verifyIdToken`.

### 2. State Sync
Avoid flashes of unauthenticated content by passing the initial session from a Server Layout to a Client-side Auth Provider.

## Integration Checklist
- [ ] Is `firebase-admin` used for token verification on the server?
- [ ] Are cookies set with `HttpOnly`, `Secure`, and `SameSite=Lax`?
- [ ] Does the Auth Provider handle token refreshing automatically?
