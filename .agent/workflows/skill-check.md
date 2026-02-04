---
description: Verify skill discovery and Skillport MCP server are working
---

# Skill Discovery Check

Use this workflow to validate Skillport MCP and skill system are functioning.

## Quick Verification

// turbo

1. Run the verification script:

```powershell
npm run skillport:verify
```

## Manual Checks

1. Verify skillport-mcp is installed:

```powershell
C:\Users\finan\AppData\Roaming\Python\Python314\Scripts\skillport-mcp.exe --help
```

Expected: Shows help with `--skills-dir`, `--reindex` options

1. Count skills in directory:

```powershell
(Get-ChildItem -Path skills -Directory).Count
```

Expected: 200+ skills

1. Force reindex if skills aren't showing:

```powershell
npm run skillport:reindex
```

## Troubleshooting

If Skillport MCP isn't working:

1. **Reinstall skillport-mcp**: `pip install --upgrade skillport-mcp`
2. **Check MCP config**: Ensure `mcp_config.json` uses `skillport-mcp.exe` not `skillport.exe`
3. **Restart Windsurf**: MCP servers reload on IDE restart
4. **Check Python path**: Ensure `C:\Users\finan\AppData\Roaming\Python\Python314\Scripts` exists

## Test Invocation

Start a new conversation with prompts like:

- "Help me add Stripe checkout" → Should invoke `stripe-integration`
- "Debug this build error" → Should invoke `systematic-debugging`
- "Optimize the hero section" → Should invoke `3d-web-experience`
