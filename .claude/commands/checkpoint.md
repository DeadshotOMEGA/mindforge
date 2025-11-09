---
name: checkpoint
description: Create a checkpoint to document current state (manual checkpoint system)
---

# 💾 Creating Checkpoint

I'll document the current state of our work to create a checkpoint you can reference later.

**Checkpoint Name:** {prompt}

---

## 📸 Current State Snapshot

### What We're Working On
- Current task/feature
- Files being modified
- Recent changes made

### Code State
- Last successful build: [timestamp]
- Tests passing: [status]
- Branch: [git branch name]
- Latest commit: [git commit info]

### Context & Decisions
- Key decisions made
- Assumptions taken
- Trade-offs chosen
- Open questions

### Next Steps
- What's left to do
- Planned changes
- Known issues to address

---

## 📋 Checkpoint Details

**Created:** {current_timestamp}
**Branch:** {git_branch}
**Files Modified:**
- [List of modified files]

**Recent Changes:**
```
[Recent git commits or file changes]
```

**Working State:**
- [ ] Build passing
- [ ] Tests passing
- [ ] No linting errors
- [ ] Documentation updated

---

## 🔄 How to Restore This Checkpoint

If you need to revert to this point later:

1. **If using git:**
   ```bash
   git log  # Find the commit from this time
   git checkout <commit-hash>
   # Or create a branch from this point
   git checkout -b restore-checkpoint-{checkpoint_name}
   ```

2. **If you want to compare:**
   ```bash
   # Compare current state with this checkpoint time
   git diff <commit-hash> HEAD
   ```

3. **Ask me to help:**
   - "Restore to checkpoint: {checkpoint_name}"
   - "Compare current state to checkpoint: {checkpoint_name}"
   - "What changed since checkpoint: {checkpoint_name}"

---

## 💡 Checkpoint Saved!

This checkpoint has been documented. You can:
- Continue working from here
- Create another checkpoint later
- Reference this checkpoint by name
- Ask me to compare states

**Checkpoint Name:** `{prompt}`
**Timestamp:** `{current_timestamp}`

---

*Note: This is a documentation checkpoint. For version control, use git commits. For configuration checkpoints, use the config switcher's backup/restore feature.*

**Next:** Continue working, or create a git commit to preserve this state:
```bash
git add .
git commit -m "Checkpoint: {prompt}"
```
