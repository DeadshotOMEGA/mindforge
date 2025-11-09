---
name: review-mode
description: Switch to code-review mode (read-only) for analyzing code
---

# 🔍 Switching to Code Review Mode

I'm switching to code-review mode, which means:

✅ **I can:**
- Read and analyze all files
- Search through code (grep, glob)
- Run git commands (read-only)
- Provide detailed code reviews
- Suggest improvements
- Identify bugs and issues

❌ **I cannot:**
- Edit or modify files
- Write new files
- Make commits
- Run build commands

---

## Running the switch...

```bash
./.claude/switch-config.sh code-review
```

**⚠️ Important:** You'll need to restart Claude Code for this change to take effect.

After restarting in code-review mode, ask me to:
- Review a specific file or module
- Analyze code for security issues
- Check for performance problems
- Suggest architectural improvements
- Review a pull request

---

**To switch back to development mode later:**
```bash
./.claude/switch-config.sh development
```

Then restart Claude Code again.
