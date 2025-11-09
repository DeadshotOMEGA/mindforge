# Migration Guide: Old Commands → Unified Session Management

**Version:** 2.0
**Date:** 2025-11-08
**Status:** Active

This guide helps you migrate from the old fragmented commands to the new unified session management system.

---

## Summary of Changes

### Old Command Structure (Archived)
```bash
/dev-docs "task name"        # Create dev docs
/plan                        # Create implementation plan
/dev-docs-update             # Update documentation
(no end command)             # Manual cleanup
```

### New Command Structure (Current)
```bash
/session-start "task-name"              # Create task (Quick Mode)
/session-start --plan "description"     # Create task (Plan Mode)
/session-update                         # Update docs (smart detection)
/session-end                            # Archive completed work
```

---

## Command Mapping

| Old Command | New Command | Notes |
|------------|-------------|-------|
| `/dev-docs` | `/session-start` | Quick Mode for instant structure |
| `/plan` | `/session-start --plan` | Plan Mode with full workflow |
| `/dev-docs-update` | `/session-update` | Enhanced with smart detection |
| (none) | `/session-end` | NEW - complete the workflow |

---

## What Changed & Why

### 1. Unified Naming Convention

**Before:**
- `/dev-docs` - Not clear what it does
- `/plan` - Generic name
- `/dev-docs-update` - Inconsistent naming

**After:**
- `/session-start` - Clear: starts a session
- `/session-update` - Clear: updates session
- `/session-end` - Clear: ends session

**Why:** Session-based naming:
- Matches `SESSION_NOTES.md`
- Clear workflow: start → update → end
- Easier to discover and remember
- Consistent `/session-*` prefix

### 2. Combined Functionality

**Before:**
- `/dev-docs` created basic structure
- `/plan` created plans separately
- Two different workflows

**After:**
- `/session-start` combines both:
  - Quick Mode (like old `/dev-docs`)
  - Plan Mode (like old `/plan`)
- Single unified workflow
- Same output structure

**Why:**
- Reduces command fragmentation
- Clearer when to use which mode
- Simpler mental model
- One command to learn

### 3. Smart Detection

**Before (`/dev-docs-update`):**
- Manual checklist
- User had to remember what changed
- No automation

**After (`/session-update`):**
- Auto-scans `dev/active/` for tasks
- Uses `git diff` to detect modified files
- Parses task files for completion
- Interactive workflow with suggestions
- Automated task completion detection

**Why:**
- Saves time
- More accurate
- Less chance of forgetting updates
- Better integration with git workflow

### 4. Complete Lifecycle

**Before:**
- Start work: `/dev-docs` or `/plan`
- Update: `/dev-docs-update`
- End: (manual cleanup, no command)
- Archive: (manual, inconsistent)

**After:**
- Start: `/session-start`
- Update: `/session-update`
- End: `/session-end` → archives automatically
- Archive: (automated with metadata)

**Why:**
- Complete workflow from start to finish
- No manual cleanup needed
- Consistent archival process
- Metadata tracking for search

---

## Migration Steps

### Step 1: Update Your Workflow

**Old Workflow:**
```bash
# Start
/dev-docs "authentication refactor"

# Work...
# Update manually
/dev-docs-update

# No end command - manual cleanup
```

**New Workflow:**
```bash
# Start (Quick Mode)
/session-start "authentication-refactor"

# Work...
# Update with smart detection
/session-update

# End and archive
/session-end
```

### Step 2: No File Changes Needed

**Good news:** The file structure is identical!

```
dev/active/task-name/
├── task-name-plan.md      # Same
├── task-name-context.md   # Same
└── task-name-tasks.md     # Same
```

**Your existing dev-docs work with new commands!**

### Step 3: Use New Commands Going Forward

**For new work:**
- Use `/session-start` instead of `/dev-docs`
- Use `/session-start --plan` instead of `/plan`
- Use `/session-update` instead of `/dev-docs-update`
- Use `/session-end` when complete

**For existing work:**
- Your current tasks continue to work
- Can use `/session-update` on them
- Can use `/session-end` to archive them

---

## Examples

### Example 1: Quick Task Creation

**Old Way:**
```bash
/dev-docs implement user search feature
```

**New Way:**
```bash
/session-start "user-search-feature"
```

**Result:** Same three files created, same structure.

---

### Example 2: Full Planning Workflow

**Old Way:**
```bash
/plan
[Interactive planning session]
[Manual file creation]
```

**New Way:**
```bash
/session-start --plan "Implement user search with filters and pagination"
[Interactive planning session]
[Auto-creates files on approval]
```

**Result:** Better integrated, automatic file creation.

---

### Example 3: Updating Documentation

**Old Way:**
```bash
/dev-docs-update
[Manual checklist]
- Update context.md
- Mark completed tasks
- Update SESSION_NOTES.md
```

**New Way:**
```bash
/session-update

# Smart detection:
Found 2 active tasks with changes:

1. user-search-feature (3 files changed, 70% complete)
   Modified: src/search/SearchService.ts

Which tasks should I update? (all/1/cancel)
```

**Result:** Automated detection, interactive workflow.

---

### Example 4: Completing Work

**Old Way:**
```bash
# No command, manual cleanup:
1. Manually move directories
2. Manually create archive structure
3. Manually track what was done
4. Hope you didn't forget anything
```

**New Way:**
```bash
/session-end

# Automatic process:
Session Review
══════════════════════════════════════

Session Status: Complete
Active Tasks: 1

1. user-search-feature
   Status: ✅ Complete (12/12 tasks)
   Files: 8 modified

✅ Archives to dev/completed/
✅ Generates metadata
✅ Updates indexes
✅ Clears dev/active/
```

**Result:** Automated, consistent, trackable.

---

## Backward Compatibility

### Old Commands Still Work

**Location:** `.claude/commands_archive/`

**Status:** Functional but deprecated

**Files:**
- `dev-docs.md`
- `dev-docs-update.md`
- `plan.md`

**You can still use them** if you have scripts or automation referencing old commands.

### When to Delete Commands Archive

**Safe to delete when:**
1. All team members migrated
2. No automation uses old commands
3. Comfortable with new workflow
4. At least 30 days have passed

**How to delete:**
```bash
rm -rf .claude/commands_archive/
```

---

## Frequently Asked Questions

### Q: Do I need to change my existing tasks?

**A: No!** Existing task structures work with new commands.

Your current `dev/active/task-name/` directories work perfectly with:
- `/session-update` (smart detection on existing tasks)
- `/session-end` (archives existing tasks)

### Q: What if I'm mid-task with old commands?

**A: Just switch!**

```bash
# You were using:
/dev-docs-update

# Now use:
/session-update

# Same task, new command - works fine!
```

### Q: Can I mix old and new commands?

**A: Yes, but not recommended.**

Old and new commands create the same file structure, so they're compatible. However, for consistency, switch completely to new commands.

### Q: What about my SESSION_NOTES.md?

**A: No changes needed!**

SESSION_NOTES.md format is unchanged. `/session-end` uses it exactly as before.

### Q: Do completion markers change?

**A: No!**

Same markers work:
- `[x]` or `✅` for complete
- `[cancelled]` or `❌` for cancelled
- `[ ]` for pending

### Q: What happens to my completed/ directory?

**A: Enhanced!**

If you manually created `dev/completed/`, that's great! `/session-end` will use it and enhance it with:
- Metadata files (`.metadata.json`)
- Index files (`index.md`)
- Organized structure

---

## Feature Comparison

| Feature | Old Commands | New Commands |
|---------|-------------|--------------|
| Create task structure | ✅ Yes | ✅ Yes |
| Planning workflow | ✅ Yes | ✅ Enhanced |
| Update documentation | ✅ Manual | ✅ Automated |
| Git integration | ❌ No | ✅ Yes |
| Completion detection | ❌ No | ✅ Yes |
| Archive workflow | ❌ No | ✅ Yes |
| Metadata tracking | ❌ No | ✅ Yes |
| Index generation | ❌ No | ✅ Yes |
| Three-tier system | ❌ No | ✅ Yes |
| Smart suggestions | ❌ No | ✅ Yes |
| Interactive workflow | ⚠️ Partial | ✅ Full |
| Completion workflow | ❌ Manual | ✅ Automated |

---

## Benefits of Migrating

### 1. Complete Workflow
- Start → Update → End (no manual steps)
- Clear process every time
- Nothing forgotten

### 2. Time Savings
- Smart detection saves manual work
- Automated archival
- Less context switching

### 3. Better Tracking
- Metadata for all tasks
- Searchable archives
- Progress statistics

### 4. Cleaner Workspace
- `dev/active/` only has current work
- Completed work properly archived
- Historical work organized by month

### 5. Team Collaboration
- Consistent process for everyone
- Easy to find past work
- Clear completion criteria

---

## Rollback Plan

**If you need to go back to old commands:**

### Option 1: Restore Old Commands

```bash
# Move commands back from archive
mv .claude/commands_archive/dev-docs.md .claude/commands/
mv .claude/commands_archive/dev-docs-update.md .claude/commands/
mv .claude/commands_archive/plan.md .claude/commands/
```

### Option 2: Keep Both

**Old and new commands can coexist.**

Just keep commands_archive/ and both will work.

### Option 3: Manual Workflow

**Everything is just files!**

You can always:
- Manually create task directories
- Manually edit markdown files
- Manually move directories
- No commands required

---

## Checklist for Migration

**For Individual Developers:**

- [ ] Read this migration guide
- [ ] Try `/session-start` on a test task
- [ ] Try `/session-update` with git changes
- [ ] Try `/session-end` to archive
- [ ] Update personal documentation/notes
- [ ] Switch to new commands for all new work
- [ ] Comfortable with new workflow
- [ ] Can delete `.claude/commands_archive/` (optional)

**For Teams:**

- [ ] Share migration guide with team
- [ ] Schedule migration training/demo
- [ ] Update team documentation
- [ ] Update CI/CD scripts (if using commands)
- [ ] Set migration deadline
- [ ] Verify all team members migrated
- [ ] Archive old commands (optional)
- [ ] Update onboarding docs

---

## Getting Help

**If you have questions:**

1. **Read command documentation:**
   - `.claude/commands/session-start.md`
   - `.claude/commands/session-update.md`
   - `.claude/commands/session-end.md`

2. **Check main README:**
   - `dev/README.md` - Complete overview

3. **Try it on a test task:**
   - Create a simple test task
   - Go through full workflow
   - See how it works

4. **Old commands still work:**
   - Fall back if needed
   - No rush to migrate
   - Gradual transition OK

---

## Timeline Recommendation

**Week 1: Learn**
- Read migration guide
- Try new commands on test task
- Understand differences

**Week 2: Transition**
- Use new commands for new work
- Keep old for existing work
- Get comfortable with workflow

**Week 3: Migrate**
- Finish old tasks with new commands
- Use exclusively new workflow
- Update any automation

**Week 4+: Full Adoption**
- All new work with new commands
- Archive old commands (optional)
- Share learnings with team

**No hard deadline** - migrate at your own pace!

---

## Success Stories

### Before Migration

**Developer:** "I have to remember so many commands! `/dev-docs`, `/plan`, `/dev-docs-update`... which one do I use when?"

**Problem:** Command fragmentation, unclear workflow, manual cleanup

### After Migration

**Developer:** "Now it's easy! `/session-start` to begin, `/session-update` as I work, `/session-end` when done. Clear workflow, no thinking required!"

**Result:** Streamlined process, automated tracking, complete workflow

---

## Summary

**Key Changes:**
1. **Unified naming:** All commands use `/session-*` prefix
2. **Combined functionality:** `/session-start` replaces both `/dev-docs` and `/plan`
3. **Smart detection:** `/session-update` auto-detects changes with git
4. **Complete lifecycle:** `/session-end` completes the workflow
5. **No file changes:** Existing tasks work with new commands

**Migration:**
- Start using new commands for new work
- Existing work continues to function
- Gradual migration OK
- Old commands still available in archive

**Benefits:**
- Clearer workflow
- Time savings
- Better tracking
- Complete automation
- Consistent process

---

**Questions?** See `dev/README.md` or `.claude/commands/session-*.md`

**Last Updated:** 2025-11-08
