# Git Context Injection Hook

**Type:** UserPromptSubmit hook
**File:** `git-hook.py`
**Language:** Python 3
**Dependencies:** None (uses standard library)

---

## What It Does

When you type the `/git` command, this hook automatically injects comprehensive git context into your prompt, including:

- **Recent commit messages** (last 8 commits) - For style reference when writing commit messages
- **Git status** - Current branch, staged/unstaged files
- **Staged changes** (`git diff --cached`) - Changes ready to commit
- **Unstaged changes** (`git diff`) - Working directory changes
- **Status summary** (`git status --short`) - Concise overview

---

## Usage

Simply type:
```
/git
```

The hook will enhance your prompt with full git context, making it easy to:
- Write commit messages in the style of recent commits
- Review changes before committing
- Understand current repository state
- Get help with git workflows

---

## Example Output

When you type `/git`, Claude receives:

```
/git

## Commit Message Style Guide
Recent commits for style reference:
```
b863df7 Initial commit
a1b2c3d Add user authentication
d4e5f6g Fix login validation bug
...
```

## Current Git State

### Status:
```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   src/auth.ts
  modified:   README.md
...
```

### Staged changes (git diff --cached):
```
(No staged changes)
```

### Unstaged changes (git diff):
```
diff --git a/src/auth.ts b/src/auth.ts
...
```

### Status summary:
```
 M src/auth.ts
 M README.md
```
```

---

## How It Works

1. **Detects `/git` command** - Hook watches for exact match
2. **Runs git commands** - Executes git in subprocess with 5s timeout
3. **Formats output** - Structures git information in readable format
4. **Injects context** - Replaces `/git` with enhanced prompt containing all git info

---

## Configuration

Added to `.claude/settings.json`:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/git-hook.py"
          }
        ]
      }
    ]
  }
}
```

---

## Error Handling

- **Timeout protection** - Git commands timeout after 5 seconds
- **Graceful failures** - If git command fails, shows error message instead of crashing
- **Pass-through** - All non-`/git` prompts pass through unchanged

---

## Use Cases

### 1. Writing Commit Messages
```
/git

Please help me write a commit message for these changes following the project's style.
```

### 2. Reviewing Changes
```
/git

Can you review the changes I'm about to commit and suggest improvements?
```

### 3. Understanding Repository State
```
/git

What's the current state of the repository? Should I commit or stage anything?
```

### 4. Git Workflow Help
```
/git

I have unstaged changes. Should I stage them all or selectively?
```

---

## Technical Details

**Language:** Python 3
**Standard Library Only:** No external dependencies
**Execution Time:** ~100-500ms (depends on repository size)
**Security:** Runs with same permissions as Claude Code

---

## Customization

To modify what git information is injected, edit `git-hook.py`:

```python
# Add more git commands
branch_info = run_git_command('git branch -vv')
remote_info = run_git_command('git remote -v')

# Add to enhanced_prompt
enhanced_prompt = f"""
...
### Branch Information:
```
{branch_info}
```
...
"""
```

---

## Troubleshooting

**Hook doesn't seem to work:**
1. Check hook is executable: `ls -la .claude/hooks/git-hook.py`
2. Verify Python 3: `python3 --version`
3. Test manually: `echo '{"prompt": "/git"}' | python3 .claude/hooks/git-hook.py`

**Git commands timing out:**
- Large repositories may take longer
- Increase timeout in `git-hook.py` line 14: `timeout=10`

**Wrong directory:**
- Hook runs from project root (`$CLAUDE_PROJECT_DIR`)
- Git commands will fail if not in a git repository

---

## Benefits

✅ **Fast commit message writing** - See recent commit style instantly
✅ **Better change review** - Full diff context available
✅ **No manual git commands** - All info in one command
✅ **Context-aware** - Claude sees exactly what you're working on
✅ **Safe** - Read-only git operations, no modifications

---

**Phase 4 Implementation:** Part of optional hook enhancements
**Status:** ✅ Active
**Maintenance:** Low - Pure git status reading, no external dependencies
