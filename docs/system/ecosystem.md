# GETTUPPENT - Zenflow Ecosystem Guide

This guide explains the relationship between your repository, worktrees, and workspace to provide clarity during development.

## 🏛️ The Architecture

### 1. The Main Repository (Base Camp)

**Path**: `C:\Users\finan\Gettupplanding-111`

- This is the **Source of Truth**.
- It contains the `.git` directory, which holds the entire history of the project.
- Most development should happen here unless you are working on parallel tasks.

### 2. Zenflow Worktrees (Satellite Camps)

**Path**: `C:\Users\finan\.zenflow\worktrees\`

- **What they are**: Separate physical folders where a specific branch is checked out.
- **Why use them**: Allows you to work on `feature-A` and `feature-B` at the same time without having to `git checkout` and lose your uncommitted state or rebuild dependencies.
- **The "Ghost" Problem**: Sometimes folders in this directory persist even after the worktree is deleted or the branch is merged. If a folder in here is "empty," it means it is a ghost of a previous task and can be safely ignored or deleted.

### 3. The Workspace

- This is simply the folder currently open in your IDE (VS Code, Windsurf, etc.).
- **Pro Tip**: Always confirm your path in the terminal before running commands. If you are in `Gettupplanding-111`, you are in the "Base Camp."

## 🧹 Maintenance Commands

If you feel the system is "messy," run these commands in the **Main Repository**:

```bash
# Remove registrations for deleted worktree folders
git worktree prune

# List all active worktrees
git worktree list
```

## 🛰️ Current Active Worktrees

As of 2026-01-31:

1. `Gettupplanding-111` (Branch: `unified-main`)
2. `.zenflow/worktrees/set-up-project-config-5d06` (Branch: `set-up-project-config-5d06`)

---

**Status**: Synchronized & Audited
