---
description: Run build and test suite with linting
---

# Build and Test Workflow

Run this workflow to verify code quality before commits.

## Steps

// turbo

1. Run TypeScript type-check:

```bash
npm run type-check
```

// turbo

1. Run ESLint:

```bash
npm run lint
```

// turbo

1. Run build:

```bash
npm run build
```

// turbo

1. Run tests (if available):

```bash
npm run test
```

## Success Criteria

- All commands exit with code 0
- No TypeScript errors
- No ESLint errors (warnings acceptable)
- Build completes successfully
