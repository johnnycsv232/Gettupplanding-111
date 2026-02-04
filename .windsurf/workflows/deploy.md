---
description: Deploy to Vercel production
---

# Deploy Workflow

Deploy the application to Vercel.

## Pre-flight Checks

1. Ensure all tests pass (run `/build-and-test` first)
1. Verify no uncommitted changes: `git status`

## Steps

// turbo

1. Push to main branch:

```bash
git push origin main
```

1. Vercel auto-deploys from main. Check deployment at:
   - Dashboard: [Vercel Dashboard](https://vercel.com/dashboard)
   - Or run: `npx vercel --prod` for manual deploy

## Post-Deploy

- Verify live site loads correctly
- Check Vercel deployment logs for errors
- Test critical flows (checkout, auth)
