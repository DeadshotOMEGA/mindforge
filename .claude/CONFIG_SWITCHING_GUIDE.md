# Claude Code Configuration Switching Guide

## Quick Overview

The config examples in `claude-howto/09-advanced-features/config-examples.json` are **templates**, not active profiles. This guide shows you how to actually use them.

---

## Using the Config Switcher Script

I've created a helper script that makes switching between configurations easy!

### Basic Usage

```bash
# Show available modes
./.claude/switch-config.sh

# Switch to a specific mode
./.claude/switch-config.sh code-review
./.claude/switch-config.sh development
./.claude/switch-config.sh learning

# Show current mode
./.claude/switch-config.sh show

# Restore from backup
./.claude/switch-config.sh restore
```

### Available Modes

| Mode | Description | Use When |
|------|-------------|----------|
| **development** | Unrestricted editing with auto-activation | Active coding |
| **code-review** | Read-only mode | Reviewing PRs, analyzing code |
| **learning** | Confirmation before actions | Learning, experimenting safely |
| **production** | Safety checks + confirmations | Deploying to production |
| **pair-programming** | Confirmation mode with explanations | Collaborative coding |

---

## What Each Mode Does

### Development Mode (Default)
```bash
./.claude/switch-config.sh development
```

**Settings:**
- ✅ Full edit permissions
- ✅ Skill auto-activation
- ✅ All hooks enabled
- 🔧 Permission: `acceptEdits` (unrestricted)

**Best for:** Daily coding, feature development, bug fixes

---

### Code Review Mode
```bash
./.claude/switch-config.sh code-review
```

**Settings:**
- 📖 Read-only permissions
- ✅ Can read, grep, glob files
- ✅ Can run git commands (read-only)
- ❌ Cannot edit or write files
- 🔧 Permission: `readonly`

**Best for:**
- Reviewing pull requests
- Code analysis
- Security audits
- Understanding unfamiliar code

**Example workflow:**
```bash
# Switch to code review mode
./.claude/switch-config.sh code-review

# Restart Claude Code
# Now ask: "Review the authentication module for security issues"
# Claude can read and analyze but won't modify files
```

---

### Learning Mode
```bash
./.claude/switch-config.sh learning
```

**Settings:**
- ⚠️ Confirmation required before actions
- ✅ Full permissions (with confirmation)
- ✅ Auto-checkpoints every 15 minutes
- 🔧 Permission: `confirm`

**Best for:**
- Learning new codebases
- Experimenting safely
- Pair programming
- Understanding "why" before changes

**Example workflow:**
```bash
./.claude/switch-config.sh learning

# Now when you ask Claude to make changes:
# "Fix the bug in auth.ts"
#
# Claude will respond:
# "I need to modify src/auth.ts. The change will update the
#  password validation logic. Approve? (yes/no/show)"
#
# You can type "show" to see the exact changes first
```

---

### Production Mode
```bash
./.claude/switch-config.sh production
```

**Settings:**
- ⚠️ Confirmation for all actions
- ✅ All safety hooks enabled (tsc-check, build)
- ✅ Auto-checkpoints every 10 minutes
- 🔧 Permission: `confirm`

**Best for:**
- Production deployments
- Critical bug fixes in prod
- Hotfixes that need extra safety

---

### Pair Programming Mode
```bash
./.claude/switch-config.sh pair-programming
```

**Settings:**
- ⚠️ Confirmation before actions
- ✅ Show thinking process
- ✅ Time estimates for tasks
- ✅ Progress indicators
- 🔧 Permission: `confirm`

**Best for:**
- Collaborative development
- Teaching/mentoring
- Explaining code changes

---

## Complete Workflow Example

### Scenario: You want to review a PR, then implement a fix

```bash
# Step 1: Switch to code review mode
./.claude/switch-config.sh code-review

# Step 2: Restart Claude Code or start new session
# (The settings.json has been updated)

# Step 3: Review the PR
# Ask: "Review PR #123 for security and performance issues"
# Claude analyzes without making changes

# Step 4: Switch back to development mode
./.claude/switch-config.sh development

# Step 5: Restart Claude Code

# Step 6: Implement the fixes
# Ask: "Fix the issues we found in the review"
# Claude can now edit files
```

---

## Manual Configuration (Advanced)

If you want to create custom modes or manually edit settings:

### 1. Backup Your Current Settings

```bash
cp .claude/settings.json .claude/settings.backup.json
```

### 2. Edit settings.json

```bash
# Open your settings file
nano .claude/settings.json

# Or use your preferred editor
code .claude/settings.json
```

### 3. Key Settings to Change

**For read-only mode:**
```json
{
  "permissions": {
    "allow": ["Read:*", "Grep:*", "Glob:*"],
    "defaultMode": "readonly"
  }
}
```

**For confirmation mode:**
```json
{
  "permissions": {
    "allow": ["Edit:*", "Write:*", "Bash:*"],
    "defaultMode": "confirm"
  }
}
```

**For unrestricted mode:**
```json
{
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "Bash:*"],
    "defaultMode": "acceptEdits"
  }
}
```

---

## Troubleshooting

### Changes Not Taking Effect

**Problem:** You switched modes but Claude still behaves the same way.

**Solution:** You need to restart Claude Code after switching configurations:
```bash
# Exit Claude Code (Ctrl+D or /exit)
# Then start it again
claude-code
```

### Lost Your Configuration

**Problem:** Accidentally broke settings.json

**Solution:** Restore from backup:
```bash
./.claude/switch-config.sh restore
```

Or manually restore:
```bash
cp .claude/settings.backup.json .claude/settings.json
```

### Want to See Difference Between Modes

```bash
# Show current settings
./.claude/switch-config.sh show

# Switch to a different mode
./.claude/switch-config.sh code-review

# Show new settings
./.claude/switch-config.sh show
```

---

## Creating Your Own Custom Modes

### 1. Edit the switch-config.sh script

Open `.claude/switch-config.sh` and find the `get_config_for_mode()` function.

### 2. Add a new case

```bash
your-custom-mode)
    cat <<'EOF'
{
  "permissions": {
    "allow": ["Read:*", "Write:*"],
    "defaultMode": "confirm"
  },
  "hooks": {
    "PreToolUse:Write": "your-custom-hook.sh"
  }
}
EOF
    ;;
```

### 3. Use your new mode

```bash
./.claude/switch-config.sh your-custom-mode
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│         CLAUDE CONFIG QUICK REFERENCE           │
├─────────────────────────────────────────────────┤
│                                                 │
│  Switch Mode:                                   │
│    ./.claude/switch-config.sh [mode]            │
│                                                 │
│  Common Modes:                                  │
│    development      → Full access              │
│    code-review      → Read-only                │
│    learning         → Confirm before action    │
│    production       → Extra safety checks      │
│                                                 │
│  Utilities:                                     │
│    show            → Show current mode         │
│    restore         → Restore from backup       │
│                                                 │
│  Important:                                     │
│    ⚠️  Restart Claude Code after switching!     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Best Practices

### ✅ Do:
- Switch to code-review mode before analyzing PRs
- Use learning mode when exploring new codebases
- Switch to production mode for critical deployments
- Keep backups of your custom configurations
- Restart Claude Code after switching modes

### ❌ Don't:
- Forget to restart Claude Code after switching
- Use production mode for routine development (too slow)
- Stay in read-only mode when you need to code
- Edit settings.json while Claude Code is running

---

## Advanced: Environment-Based Switching

You can also use environment variables to switch modes:

```bash
# In your .bashrc or .zshrc
alias claude-dev='cd ~/projects/myproject && ./.claude/switch-config.sh development && claude-code'
alias claude-review='cd ~/projects/myproject && ./.claude/switch-config.sh code-review && claude-code'
alias claude-learn='cd ~/projects/myproject && ./.claude/switch-config.sh learning && claude-code'

# Then just run:
claude-dev      # Starts Claude in development mode
claude-review   # Starts Claude in code-review mode
claude-learn    # Starts Claude in learning mode
```

---

## Summary

The key insight is that **config examples are templates, not active profiles**. You need to:

1. ✅ Use the switcher script: `./.claude/switch-config.sh [mode]`
2. ✅ Restart Claude Code after switching
3. ✅ Or manually copy settings from examples into your settings.json

This approach gives you the flexibility to quickly switch between different working modes!
