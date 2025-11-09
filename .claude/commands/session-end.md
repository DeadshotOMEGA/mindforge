---
description: Archive completed work
argument-hint: Optional - use --force to archive incomplete sessions (not recommended)
---

# Session End - Review and Archive Completed Work

I'll review your development session and archive completed work to the three-tier archive system.

## Arguments

**Checking arguments:** $ARGUMENTS

**Options:**
- No arguments: Normal workflow (requires completion)
- `--force`: Force archive even if incomplete (shows warning)

---

## Phase 0: Auto-Update Documentation (NEW!)

### Automatic /session-update

Before proceeding with archival, automatically run `/session-update` to ensure all documentation is prepared and current.

```
Running /session-update to prepare documentation...

Scanning dev/active/ for changes...
✅ Analyzing all active tasks
✅ Detecting modified files with git
✅ Updating context files
✅ Updating task progress
✅ Finalizing SESSION_NOTES.md

Updates complete!
```

### Update Summary

```
📋 DOCUMENTATION UPDATED

Modified Files:
✅ task-1-context.md
✅ task-1-tasks.md
✅ task-2-context.md
✅ task-2-tasks.md
✅ SESSION_NOTES.md

Progress Updated:
- task-1: 60% → 80% complete
- task-2: 100% complete ✅

Timestamps: All files current as of 2025-11-08

Ready to proceed with archival? (yes/no)
```

### User Options

**If user responds "yes":**
```
✅ Proceeding with session archival...
```

**If user responds "no":**
```
Cancelled archival. Your session remains active.

Your documentation is now updated:
- All changes from git captured
- Task progress reflects current work
- SESSION_NOTES.md finalized

You can run /session-end again when ready.
```

---

## Phase 1: Detection & Analysis

### Step 1: Check for SESSION_NOTES.md

Checking for `dev/SESSION_NOTES.md`...

**If exists:**
✅ Found SESSION_NOTES.md
- Proceed with analysis

**If not exists:**
⚠️ No SESSION_NOTES.md found

**Options:**
1. **create** - Create SESSION_NOTES.md now (basic structure)
2. **skip** - Continue without SESSION_NOTES.md (limited tracking)
3. **cancel** - Stop /session-end operation

### Step 2: Scan Active Tasks

Scanning `dev/active/` for task directories...

**Active Tasks Found:**
```
dev/active/
├── task-1/
├── task-2/
└── task-3/
```

**If empty:**
```
ℹ️ No active tasks found in dev/active/

Nothing to archive. Your workspace is already clean!

To start new work, use: /session-start
```

### Step 3: Parse Task Completion Status

For each task, reading `*-tasks.md` files...

**Task Analysis:**

**Task 1: authentication-refactor**
- File: `authentication-refactor-tasks.md`
- Total tasks: 15
- Completed: 15 ([x] or ✅)
- Cancelled: 0 ([cancelled] or ❌)
- Pending: 0 ([ ])
- **Status:** ✅ Complete (100%)

**Task 2: session-management**
- File: `session-management-tasks.md`
- Total tasks: 51
- Completed: 45 ([x] or ✅)
- Cancelled: 0
- Pending: 6 ([ ])
- **Status:** ⚠️ Incomplete (88%)

**Task 3: api-documentation**
- File: `api-documentation-tasks.md`
- Total tasks: 8
- Completed: 6 ([x] or ✅)
- Cancelled: 2 ([cancelled])
- Pending: 0
- **Status:** ✅ Complete (all resolved: 6 done + 2 cancelled)

### Step 4: Parse SESSION_NOTES.md Status

Reading `dev/SESSION_NOTES.md`...

**Looking for completion markers:**
- `Status: Complete`
- `Status: ✅ Complete`
- `✅ ALL PHASES COMPLETE`
- `Phases Complete: 1, 2, 3, 4, 5 (ALL phases complete!)`

**Session Status:** ⚠️ Incomplete
- Found: `Status: 🔄 Phase 4 In Progress`
- Required: Explicit completion marker

### Step 5: Calculate Overall Completion

**Completion Criteria:**
Both must be true:
1. ✅ All tasks complete or cancelled
2. ⚠️ SESSION_NOTES.md shows completion

**Current State:**
- Task completion: ⚠️ 2 of 3 tasks complete
- Session status: ⚠️ Not marked complete
- **Eligible for archival:** ❌ No

---

## Phase 2: Review Report

### Present Session Review to User

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SESSION REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Session Status: Incomplete

Active Tasks: 3

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 1. authentication-refactor           ┃
┃    Status: ✅ Complete (15/15 tasks)  ┃
┃    Files modified: 12                 ┃
┃    Ready for archival                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 2. session-management                 ┃
┃    Status: ⚠️ Incomplete (45/51)       ┃
┃    Files modified: 8                  ┃
┃    Blocking archival                  ┃
┃    Remaining: 6 tasks pending         ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 3. api-documentation                  ┃
┃    Status: ✅ Complete (6/8 + 2 ❌)    ┃
┃    Files modified: 24                 ┃
┃    Ready for archival                 ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

SESSION_NOTES.md: ⚠️ Not marked complete
Current status: "🔄 Phase 4 In Progress"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ NOT ELIGIBLE FOR ARCHIVAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reasons:
1. Task "session-management" is incomplete (6 tasks pending)
2. SESSION_NOTES.md not marked as complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What would you like to do?

Options:
1. Continue working - Finish remaining tasks
2. Cancel task - Mark "session-management" as [cancelled]
3. Force archive - Archive anyway (⚠️ not recommended)
4. Exit - Do nothing for now

Please respond: continue / cancel / force / exit
```

---

## Phase 3: User Decision Handling

### Option 1: Continue Working

**User chose: continue**

```
Understood. Continue working on incomplete tasks.

Remaining work:
- session-management: 6 tasks pending
- Update SESSION_NOTES.md status when complete

Use /session-update to track progress.
Use /session-end again when fully complete.
```

**Exit /session-end command**

---

### Option 2: Cancel Task

**User chose: cancel**

```
Which task should be marked as cancelled?

1. session-management

Enter task number: _
```

**After user enters task number:**

```
Marking "session-management" as cancelled...

✅ Updated session-management-tasks.md
   - Added cancellation note
   - Marked remaining tasks as [cancelled]
   - Updated status to "Cancelled"

Re-running eligibility check...

✅ All tasks now resolved (complete or cancelled)
⚠️ SESSION_NOTES.md still needs completion marker

Please update SESSION_NOTES.md status to complete, then run /session-end again.
```

---

### Option 3: Force Archive (Not Recommended)

**User chose: force** or used `--force` flag

```
⚠️⚠️⚠️ WARNING ⚠️⚠️⚠️

You are about to force-archive INCOMPLETE work:

- session-management: 6 tasks still pending
- SESSION_NOTES.md: Not marked complete

This is NOT RECOMMENDED because:
- You may lose track of incomplete work
- Archives assume completed work
- Hard to resume from incomplete state

Are you absolutely sure? (type "yes" to confirm)
```

**If user confirms "yes":**

```
Proceeding with force archive...

⚠️ Archiving incomplete session
⚠️ 6 tasks in session-management will be archived as-is

[Proceed to Phase 4: Archival Workflow]
```

---

### Option 4: Exit

**User chose: exit**

```
No changes made. Session remains active.

When ready to archive:
1. Complete remaining tasks
2. Update SESSION_NOTES.md status
3. Run /session-end again
```

**Exit /session-end command**

---

## Phase 4: Archival Workflow

**Triggered when:**
- All tasks complete/cancelled AND SESSION_NOTES.md complete
- OR user force-archived (with warning)

### Step 1: Preparation

```
Preparing to archive session...

Creating archive directories if needed:
✅ Created dev/completed/
✅ Created dev/completed/sessions/
✅ Created dev/completed/tasks/
```

### Step 2: Generate Metadata

**For each task, creating `.metadata.json`...**

**Example for authentication-refactor:**
```json
{
  "taskName": "authentication-refactor",
  "taskSlug": "authentication-refactor",
  "completedDate": "2025-11-08T14:30:00Z",
  "archivedDate": null,
  "tasksCompleted": 15,
  "tasksTotal": 15,
  "filesModified": 12,
  "duration": "2 days",
  "durationDays": 2,
  "phases": ["Analysis", "Design", "Implementation", "Testing"],
  "tags": ["authentication", "refactoring", "security"],
  "movedFrom": "dev/active/authentication-refactor/",
  "canArchive": true,
  "sessionDate": "2025-11-08"
}
```

**For SESSION_NOTES.md:**
```json
{
  "sessionDate": "2025-11-08",
  "completedDate": "2025-11-08T14:30:00Z",
  "archivedDate": null,
  "tasksCount": 3,
  "tasksCompleted": 3,
  "filesModifiedTotal": 44,
  "duration": "1 day",
  "movedFrom": "dev/SESSION_NOTES.md"
}
```

### Step 3: Move Files to Completed

**Moving tasks...**

```
Moving dev/active/authentication-refactor/
    → dev/completed/tasks/authentication-refactor/
    ✅ Moved 3 files + metadata

Moving dev/active/session-management/
    → dev/completed/tasks/session-management/
    ✅ Moved 3 files + metadata

Moving dev/active/api-documentation/
    → dev/completed/tasks/api-documentation/
    ✅ Moved 3 files + metadata
```

**Moving session notes...**

```
Extracting session name from SESSION_NOTES.md...
Found session name: "authentication-workflow"

Creating timestamp: 2025-11-08_143022

Moving dev/SESSION_NOTES.md
    → dev/completed/sessions/2025-11-08_143022-authentication-workflow/SESSION_NOTES.md
    ✅ Moved + metadata created
```

**Session Naming Convention (NEW):**

Format: `YYYY-MM-DD_HHmmss-{session-name}`
- `YYYY-MM-DD` - Date
- `HHmmss` - Time (24-hour format with seconds)
- `{session-name}` - Session identifier from SESSION_NOTES.md or active task names

Example: `2025-11-08_143022-auth-refactor`

**Rationale:**
- Prevents collisions when multiple sessions complete in one day
- Timestamp ensures unique identifier
- Session name provides quick context
- Chronologically sortable

### Step 4: Update Index Files

**Creating/updating `dev/completed/tasks/index.md`...**

```markdown
# Completed Tasks Index

Last Updated: 2025-11-08

## Recently Completed (Last 30 Days)

### 2025-11-08
- **authentication-refactor** - Refactored JWT authentication (15 tasks, 12 files)
- **session-management** - Created unified session commands (51 tasks, 8 files)
- **api-documentation** - Generated API documentation (8 tasks, 24 files)

## Statistics
- Total completed tasks: 3
- Total files modified: 44
- Average completion time: 2 days
```

**Creating/updating `dev/completed/sessions/index.md`...**

```markdown
# Completed Sessions Index

Last Updated: 2025-11-08

## Recent Sessions

- **2025-11-08_143022-auth-refactor** - Session management & unified commands (3 tasks, 44 files)
- **2025-11-08_152145-api-docs** - API documentation updates (2 tasks, 24 files)

## Statistics
- Total sessions: 2
- Total tasks: 5
- Total files: 68

## Directory Structure
Each session folder format: `YYYY-MM-DD_HHmmss-{session-name}`
```

### Step 5: Create README Files (If Missing)

**Creating `dev/completed/README.md`...**

```markdown
# Completed Tasks Archive

Recently completed development tasks and sessions.

## Structure
- `sessions/YYYY-MM-DD/` - Session notes by date
- `tasks/[task-name]/` - Task documentation
- `index.md` - Quick reference index

## Archive Lifecycle
Tasks remain here for ~30 days, then can be moved to `dev/archived/` for long-term storage.

Use `/session-archive` to move old completed tasks to archived.
```

### Step 6: Cleanup Active Directory

**Cleaning up `dev/active/`...**

```
Checking dev/active/ directory...

Removed empty directories:
✅ Removed dev/active/authentication-refactor/
✅ Removed dev/active/session-management/
✅ Removed dev/active/api-documentation/

✅ dev/active/ is now empty and ready for new work
```

### Step 7: Verification

**Verifying archival...**

```
Verifying all files moved successfully...

✅ 3 tasks moved to dev/completed/tasks/
✅ 1 session moved to dev/completed/sessions/
✅ 4 metadata files created
✅ 2 index files updated
✅ dev/active/ cleaned up

All files accounted for. Archival successful!
```

---

## Phase 5: Success Confirmation

### Display Success Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SESSION ARCHIVED SUCCESSFULLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Archived to: dev/completed/

Tasks Archived:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ authentication-refactor
   - 15 tasks complete
   - 12 files modified
   - Location: dev/completed/tasks/authentication-refactor/

✅ session-management
   - 51 tasks complete
   - 8 files modified
   - Location: dev/completed/tasks/session-management/

✅ api-documentation
   - 8 tasks complete (6 done + 2 cancelled)
   - 24 files modified
   - Location: dev/completed/tasks/api-documentation/

Session Notes:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SESSION_NOTES.md
   - Session: 2025-11-08_143022-auth-refactor
   - 3 tasks completed
   - 44 total files modified
   - Location: dev/completed/sessions/2025-11-08_143022-auth-refactor/

Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total files moved: 13
Metadata files created: 4
Index files updated: 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your dev/active/ directory is now clear!

Next Steps:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Ready to start new work with /session-start

📚 Access completed work:
   - View: dev/completed/tasks/[task-name]/
   - Search: grep -r "keyword" dev/completed/

♻️ After 30+ days, archive old tasks:
   - Use: /session-archive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Edge Cases & Special Handling

### Edge Case 1: No SESSION_NOTES.md

**Scenario:** User has active tasks but no SESSION_NOTES.md

**Handling:**
1. Warn user about missing session notes
2. Offer to create basic SESSION_NOTES.md
3. Or proceed without it (limited tracking)
4. Still require task completion

### Edge Case 2: Empty dev/active/

**Scenario:** No active tasks exist

**Handling:**
```
ℹ️ No active tasks to archive

Your workspace is already clean!

To start new work: /session-start
To view completed work: ls dev/completed/tasks/
```

### Edge Case 3: Mixed Status (Some Complete, Some Not)

**Scenario:**
- Task 1: Complete
- Task 2: Incomplete
- Task 3: Cancelled

**Handling:**
- Show detailed status for each
- Block archival until ALL resolved
- Offer to cancel incomplete tasks
- OR continue working

### Edge Case 4: Cancelled Tasks

**Scenario:** Task marked with `[cancelled]` or `❌`

**Handling:**
- Treat as "complete" for archival purposes
- Move to completed/ like other tasks
- Metadata shows cancellation status
- Include in archive summary

### Edge Case 5: Missing Task Files

**Scenario:** Directory exists but missing plan/context/tasks files

**Handling:**
```
⚠️ Warning: Incomplete task structure

Task "task-name" is missing files:
- Missing: task-name-tasks.md
- Found: task-name-plan.md, task-name-context.md

Options:
1. skip - Skip this task (leave in active/)
2. archive - Archive anyway with available files
3. cancel - Cancel /session-end operation

What would you like to do?
```

### Edge Case 6: Git Conflicts

**Scenario:** Files modified during archival process

**Handling:**
- Check file timestamps before move
- Warn if files changed during operation
- Offer to backup before proceeding
- Or cancel and retry

---

## Completion Markers Reference

### Task-Level Markers (in *-tasks.md)

**Complete:**
- `[x]` - Standard markdown
- `[completed]` - Explicit
- `✅` - Visual indicator

**Cancelled:**
- `[cancelled]` - Explicit
- `❌` - Visual indicator
- `[x] (cancelled)` - Complete but cancelled

**Pending/In Progress:**
- `[ ]` - Pending
- `[in_progress]` - In progress
- No marker - Pending

### Session-Level Markers (in SESSION_NOTES.md)

**Complete:**
- `Status: Complete`
- `Status: ✅ Complete`
- `✅ ALL PHASES COMPLETE`
- `Phases Complete: 1-5 (ALL phases complete!)`
- `**Status:** Complete`

**In Progress:**
- `Status: In Progress`
- `Status: 🔄 Phase X In Progress`
- `Phase X in progress`

---

## Integration with Archive System

### Three-Tier System

```
dev/
├── active/              ← Current work (this command moves FROM here)
├── completed/           ← Recently done (this command moves TO here)
│   ├── sessions/2025-11-08/
│   └── tasks/task-name/
└── archived/            ← Long-term storage (use /session-archive)
    └── tasks/2025-11/
```

### Lifecycle Flow

```
/session-start
    ↓
[Work in dev/active/]
    ↓
/session-update (track progress)
    ↓
[Complete all tasks]
    ↓
/session-end ← YOU ARE HERE
    ↓
[Work moved to dev/completed/]
    ↓
[After 30+ days]
    ↓
/session-archive
    ↓
[Work moved to dev/archived/]
```

---

## Error Handling

**Common Errors:**

1. **Permission denied**
   - Cannot create directories
   - Cannot move files
   - **Solution:** Check file permissions, run with appropriate access

2. **Disk space full**
   - Cannot create metadata
   - Cannot move files
   - **Solution:** Free up space, clean old archives

3. **Corrupted task files**
   - Cannot parse tasks.md
   - Invalid format
   - **Solution:** Skip corrupted task, warn user, offer manual fix

4. **Interrupted archival**
   - Move process failed midway
   - Partial state
   - **Solution:** Rollback changes, restore from backup, retry

---

## Examples

### Example 1: Successful Archive (All Complete)

```
/session-end

→ All tasks complete ✅
→ SESSION_NOTES.md marked complete ✅
→ Archives to dev/completed/
→ Clears dev/active/
→ Success!
```

### Example 2: Incomplete Session

```
/session-end

→ Task 1: Complete ✅
→ Task 2: Incomplete ⚠️ (5 tasks pending)
→ SESSION_NOTES.md: Incomplete ⚠️
→ Not eligible for archival
→ Options: continue / cancel / force
```

### Example 3: Force Archive

```
/session-end --force

→ Warning: Incomplete work
→ Confirm: yes
→ Archives anyway (with incomplete tasks)
→ Metadata shows incomplete status
```

---

## Tips

**Before running /session-end:**

1. ✅ Complete all pending tasks
2. ✅ Run `/session-update` to finalize docs
3. ✅ Update SESSION_NOTES.md status to complete
4. ✅ Review all task files one last time
5. ✅ Commit any uncommitted changes

**After /session-end:**

1. ✨ Start fresh with `/session-start`
2. 📚 Reference completed work in `dev/completed/`
3. ♻️ Archive old completed work with `/session-archive`
4. 🔍 Search archives: `grep -r "keyword" dev/completed/`

---

**Note:** This command is NEW functionality not present in old commands. It completes the unified session workflow: start → update → end.
