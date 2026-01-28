# Report - Set up project config

I have configured `.zenflow/settings.json` with the following settings:

- **setup_script**: `npm install && npm run skills:index`
  - Installs dependencies and regenerates the skills index required by the project.
- **dev_script**: `npm run dev`
  - Starts the Next.js development server.
- **verification_script**: `npm run test -- --run`
  - Runs the Vitest test suite. It completes in ~21 seconds, well within the 60-second limit.
  - *Note*: `lint` and `type-check` were excluded because they currently fail on backup/skill files and `type-check` takes close to 60 seconds.
- **copy_files**: `[".env.local"]`
  - Based on the project's dependency on Firebase and Stripe environment variables mentioned in the setup scripts.

The broken PowerShell verification script was noted but not used as a base for automation.
