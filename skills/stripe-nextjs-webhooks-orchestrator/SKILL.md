---
name: stripe-nextjs-webhooks-orchestrator
description: Robust handling of Stripe webhook events in Next.js Route Handlers. Covers signature verification, idempotency logic, and state synchronization with your database. Use when: stripe webhook, next.js api route, verify signature, webhook event.
---

# Stripe & Next.js Webhook Orchestrator

Handling asynchronous payment events with reliability and security.

## Best Practices

### 1. Raw Body Handling
Next.js API routes need deliberate handling to access the raw request body for signature verification.
```typescript
const buf = await req.text();
const sig = req.headers.get('stripe-signature');
```

### 2. Idempotency
Always check if a `checkout.session.completed` event has already been processed in your database to prevent duplicate fulfillment.

### 3. Immediate Response
Respond with `200 OK` quickly and perform heavy processing (e.g., sending emails) in a background worker or after the response is sent.
