---
name: modes
description: Show available configuration modes and how to switch between them
---

# 🎛️ Claude Code Configuration Modes

You have **10 different configuration modes** available:

## 📋 Quick Reference

| Mode | Permissions | Best For |
|------|-------------|----------|
| **development** | Unrestricted | Daily coding, feature development |
| **code-review** | Read-only | PR reviews, code analysis |
| **learning** | Confirm before actions | Safe experimentation, learning |
| **production** | Confirm + safety checks | Production deployments |
| **ci-cd** | Unrestricted automation | GitHub Actions, CI/CD |
| **security-audit** | Read-only + scanning | Security reviews |
| **performance** | Unrestricted + checkpoints | Performance optimization |
| **pair-programming** | Confirm + explanations | Collaborative coding |
| **refactoring** | Confirm + backups | Major refactoring work |
| **documentation** | Unrestricted + linting | Writing documentation |

---

## 🔧 How to Switch Modes

### View Available Modes
```bash
./.claude/switch-config.sh
```

### See Detailed Descriptions
```bash
./.claude/switch-config.sh list
```

### Check Current Mode
```bash
./.claude/switch-config.sh show
```

### Switch to a Specific Mode
```bash
# Examples:
./.claude/switch-config.sh code-review
./.claude/switch-config.sh learning
./.claude/switch-config.sh production
./.claude/switch-config.sh development
```

### Restore Previous Configuration
```bash
./.claude/switch-config.sh restore
```

---

## ⚠️ Important Notes

1. **Restart Required:** After switching modes, you must restart Claude Code for changes to take effect.

2. **Backup Automatic:** Each time you switch, your previous configuration is backed up automatically.

3. **Choose the Right Mode:**
   - Reviewing code? → Use `code-review`
   - Learning new codebase? → Use `learning`
   - Deploying to production? → Use `production`
   - Daily coding? → Use `development`

---

## 💡 Common Workflows

### Code Review Workflow
```bash
# 1. Switch to code-review mode
./.claude/switch-config.sh code-review

# 2. Restart Claude Code

# 3. Ask me to review code (I can only read, not modify)

# 4. Switch back to development
./.claude/switch-config.sh development

# 5. Restart and implement fixes
```

### Safe Experimentation
```bash
# 1. Switch to learning mode
./.claude/switch-config.sh learning

# 2. Restart Claude Code

# 3. I'll ask for confirmation before each action

# 4. Switch back when comfortable
./.claude/switch-config.sh development
```

---

**For complete documentation, see:**
- `.claude/CONFIG_SWITCHING_GUIDE.md`
- `.claude/PLANNING_MODE_ANALYSIS.md`
