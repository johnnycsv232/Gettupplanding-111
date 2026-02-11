# CI/CD: Doctor Integration

## Overview
The `doctor` script (`scripts/doctor.ts`) is the authoritative health check for the repository. It enforces:
1.  **Infrastructure Integrity**: No "Split Brain" config.
2.  **Asset Hygiene**: No large assets committed outside `public/`.
3.  **SEO & A11y Standards**: Schema presence and Accessibility hooks.
4.  **Dependency Cleanliness**: `npm ls` exit code 0.

## CI Workflow Spec
Every Pull Request (PR) and Merge to `main` MUST pass the following steps in order:

```yaml
steps:
  - name: Install Dependencies
    run: npm ci

  - name: Run Repository Doctor
    run: npm run doctor
    # Fails if any check status is FAIL.
    # Emits JSON report to stdout.

  - name: Type Check
    run: npx tsc --noEmit

  - name: Lint
    run: npm run lint

  - name: Test
    run: npm test

  - name: Build
    run: npm run build
```

## Local Usage
Developers should run the doctor locally before pushing:

```bash
# JSON output (default for CI)
npm run doctor

# Pretty output (for humans)
npx tsx scripts/doctor.ts --pretty
```
