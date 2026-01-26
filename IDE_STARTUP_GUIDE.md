# IDE Smooth Startup Guide

This repository is configured for seamless startup across **Windsurf**, **Cursor**, **Antigravity IDE**, **VSCode**, and other AI-powered IDEs.

## ✅ Pre-Configured IDEs

All IDEs are pre-configured with:
- Unified settings (formatting, linting, TypeScript)
- AI development rules (security-first, test-first)
- Skills integration (73 curated skills)
- Git workflow standards
- Proper exclusions for performance

## 🚀 First-Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Firebase and Stripe keys

# 3. Run setup script (optional - verifies everything)
.\scripts\complete-setup.ps1

# 4. Start development
npm run dev
```

## 🔧 IDE-Specific Notes

### Windsurf / Cascade
- Auto-loads skills from `skills/` folder
- Uses `.windsurf/rules` for AI guidelines
- Settings in `.windsurf/settings.json`

### Cursor
- Auto-loads skills from `skills/` folder
- Uses `.cursor/rules` for AI guidelines
- Settings in `.cursor/settings.json`

### Antigravity IDE
- Skills linked via `.agent/skills` junction
- Project context in `AGENTS.md`
- Always-on rules in `.agent/rules`

### VSCode / Claude Code
- Standard VSCode settings apply
- Skills available via extensions
- Use `.vscode/settings.json`

## 📁 Directory Structure

```
C:\Users\finan\Gettupplanding-111\
├── .agent/                 # Antigravity IDE config
│   ├── skills/            # → Junction to ../skills/
│   └── rules              # Always-on AI rules
├── .cursor/               # Cursor IDE config
│   ├── settings.json
│   └── rules
├── .windsurf/             # Windsurf IDE config
│   ├── settings.json
│   └── rules
├── .claude/               # Claude-specific (if needed)
├── .gemini/               # Gemini-specific (if needed)
├── skills/                # 73 curated AI skills
│   ├── [active skills]
│   └── .disabled/         # 143 disabled skills
├── src/                   # Next.js application
├── scripts/               # Automation scripts
└── docs/                  # Documentation
```

## 🎯 Skills System

### Using Skills
In any AI IDE, reference skills with `@` symbol:
```
@nextjs-best-practices help optimize this component
@test-driven-development write tests for this function
@firebase review my security rules
@stitch-react-components create a pricing card
```

### Managing Skills
```bash
# List active skills
npm run skills:list

# Regenerate index
npx tsx scripts/generate-index.ts

# Clean ghost code
.\scripts\cleanup-ghost-code.ps1
```

## ⚡ Common Issues & Fixes

### Issue: IDE not finding skills
**Fix:** Regenerate skills index
```bash
npx tsx scripts/generate-index.ts
```

### Issue: Git conflicts
**Fix:** Ensure `.next/` and `node_modules/` are in .gitignore

### Issue: Dependencies out of sync
**Fix:** Clean install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: IDE slow startup
**Fix:** All IDEs exclude `.next/`, `node_modules/`, `skills/.disabled/`
Already configured in settings.json files.

## 🔐 Security Checklist

Before committing:
- [ ] No API keys in code
- [ ] Environment variables in `.env.local` (git-ignored)
- [ ] Firebase rules tested
- [ ] Stripe webhooks verified
- [ ] All tests passing

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific tests
npm test -- path/to/test

# E2E tests
npm run test:e2e

# Type check
npm run type-check
```

## 📚 Documentation

- [Docker Decision](./docs/DOCKER_DECISION.md) - Why we don't use Docker
- [AGENTS.md](./AGENTS.md) - Project context for AI agents
- [Skills README](./skills/README.md) - Skills documentation

## 🆘 Support

If you encounter issues:
1. Run `.\scripts\complete-setup.ps1` to verify setup
2. Check IDE-specific settings files
3. Ensure Node.js 20+ is installed
4. Verify Firebase CLI is installed for emulators

---

**Happy coding! All IDEs should start smoothly. If not, run the setup script.** 🚀
