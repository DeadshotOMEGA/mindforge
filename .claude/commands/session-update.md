---
description: Update documentation before context compaction
argument-hint: Optional - specific task to focus on (leave empty for all active tasks)
---

# Session Update - Smart Documentation Updates

Updating development documentation with smart detection and automated suggestions.

## Focus Area

**Arguments:** $ARGUMENTS

**Update Scope:**
- If empty: Analyze all active tasks
- If specified: Focus on specific task

---

## Phase 1: Detection & Analysis

### Step 1: Scan Active Tasks

Scanning `dev/active/` for task directories...

**Active Tasks Found:**
```
dev/active/
├── task-1/
├── task-2/
└── task-3/
```

### Step 2: Git Integration - Detect Modified Files

Running git analysis for each task...

```bash
git diff --name-only HEAD
git status --short
```

**Modified Files by Task:**

**Task 1: [task-name]**
- Modified files: X
- New files: Y
- Deleted files: Z
- Last commit: [time ago]

### Step 3: Parse Task Completion Status

Reading all `*-tasks.md` files...

**Task Completion Analysis:**

**Task 1: [task-name]**
- Total tasks: 15
- Completed: 9 (60%)
- In progress: 3
- Pending: 3
- Last updated: [timestamp from file]

**Task 2: [task-name]**
- Total tasks: 8
- Completed: 8 (100%) ✅
- Last updated: [timestamp from file]

**Task 3: [task-name]**
- Total tasks: 20
- Completed: 5 (25%)
- In progress: 2
- Pending: 13
- Last updated: [timestamp from file]

### Step 4: Identify Update Candidates

**Tasks Needing Updates:**

```
Priority 1: Tasks with file changes + incomplete tasks
Priority 2: Tasks with file changes + complete tasks
Priority 3: Tasks without recent updates (>2 hours old)
```

**Update Recommendations:**

1. **task-1** - 5 files changed, 60% complete, needs update
   - Modified: `src/file1.ts`, `src/file2.ts`, `src/file3.ts`
   - Last updated: 2 hours ago
   - **Reason:** Active work with significant changes

2. **task-2** - 2 files changed, 100% complete, minor update
   - Modified: `.claude/commands/session-start.md`
   - Last updated: 30 minutes ago
   - **Reason:** Recently completed, document final state

3. **task-3** - No file changes, 25% complete, no update needed
   - Last updated: 15 minutes ago
   - **Reason:** Recently updated, no new changes

---

## Phase 2: Interactive Update Workflow

### Present Findings to User

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SESSION UPDATE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 3 active tasks with the following status:

1. task-1 (5 files changed, 60% complete) ⚠️
   Modified: src/file1.ts, src/file2.ts, src/file3.ts (+2 more)
   Last updated: 2 hours ago
   Status: Needs update

2. task-2 (2 files changed, 100% complete) ✅
   Modified: .claude/commands/session-start.md
   Last updated: 30 minutes ago
   Status: Consider final documentation

3. task-3 (no changes, 25% complete) ⏸️
   Last updated: 15 minutes ago
   Status: Up to date

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Which tasks should I help you update?

Options:
- "all" - Update all tasks needing updates (1, 2)
- "1" - Update only task-1
- "1,2" - Update specific tasks
- "skip" - Skip updates for now
```

---

## Phase 3: Automated Update Suggestions

### For Each Selected Task:

#### Task Context File Updates

**Analyzing `[task-name]-context.md`...**

**Suggested Updates:**

1. **Files Modified Section**
   ```markdown
   ## Files Modified This Session

   **Added:**
   - `src/new-file.ts` - Purpose description

   **Modified:**
   - `src/file1.ts` - Changes made
   - `src/file2.ts` - Changes made

   **Deleted:**
   - `src/old-file.ts` - Reason for deletion
   ```

2. **Key Decisions Section**
   - Detect if new patterns or approaches were used
   - Suggest documenting architectural decisions
   - Prompt for rationale if significant changes

3. **Integration Points Section**
   - Check for new imports/exports
   - Detect new dependencies added
   - Suggest documenting new integration points

4. **Blockers/Issues Section**
   - Prompt: "Did you encounter any blockers or issues?"
   - If yes: Document them in context

5. **Update Timestamp**
   ```markdown
   **Last Updated:** 2025-11-08
   ```

#### Task File Updates

**Analyzing `[task-name]-tasks.md`...**

**Suggested Updates:**

1. **Mark Completed Tasks**
   ```
   Detected potentially completed work based on git commits:

   - [ ] Implement feature X
     → Found commit: "feat: implement feature X"
     → Suggest marking as: [x]

   - [ ] Add unit tests
     → Found new test files
     → Suggest marking as: [x]
   ```

2. **Add New Tasks**
   ```
   Detected new files that might need tasks:

   - New file: src/new-component.ts
     → Suggest adding: "Document new component API"

   - Modified: README.md
     → Might need: "Review documentation changes"
   ```

3. **Update Progress Tracking**
   ```markdown
   ## Progress

   **Total Tasks:** 15
   **Completed:** 12 (was 9) ↑
   **Pending:** 3 (was 6) ↓

   **Status:** 80% Complete (was 60%)
   ```

4. **Update Timestamp**
   ```markdown
   **Last Updated:** 2025-11-08
   ```

#### SESSION_NOTES.md Updates

**Checking for `dev/SESSION_NOTES.md`...**

**If exists, suggest updates:**

1. **What's Been Done Section**
   ```markdown
   ### [Current Phase]: Progress Update
   - Completed X tasks in task-1
   - Finished task-2 (all tasks complete)
   - Added Y files, modified Z files
   ```

2. **Files Modified This Session**
   ```markdown
   **Modified:**
   - task-1-context.md
   - task-1-tasks.md
   - task-2-context.md (final updates)
   - task-2-tasks.md (marked complete)
   ```

3. **Current Task Section**
   ```markdown
   ## Current Task

   **Task:** task-1
   **Location:** `dev/active/task-1/`
   **Phase:** Phase 3 - Implementation
   **Progress:** 80% complete (12/15 tasks)
   ```

4. **Update Status**
   ```markdown
   **Status:** 🔄 Phase 3 In Progress
   ```

5. **Update Timestamp**
   ```markdown
   Last Updated: 2025-11-08
   ```

**If SESSION_NOTES.md doesn't exist:**
- Inform user
- Suggest creating one for better session tracking
- Offer to create basic structure

---

## Phase 4: Apply Updates

### Update Process

For each task being updated:

```
1. Read current context.md and tasks.md
2. Apply automated suggestions
3. Preserve existing content
4. Add new sections if missing
5. Update timestamps
6. Verify all changes
```

### User Interaction Options

**For each suggested update, ask user:**

```
Update [task-name]-context.md:

Suggested changes:
1. Add 5 new files to "Files Modified" section
2. Update "Last Updated" timestamp
3. Add new integration point: "API endpoint connection"

Apply these updates? (yes/no/edit)
- "yes" - Apply all suggested changes
- "no" - Skip this file
- "edit" - Let me modify suggestions first
```

### Batch Mode

**If user selected "all":**
- Apply all high-confidence updates automatically
- Show summary of changes
- Ask for confirmation on uncertain changes

---

## Phase 5: Summary Report

### Changes Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ SESSION UPDATE COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Updated 2 tasks:

📝 task-1
   ✅ Updated context.md
      - Added 5 files to "Files Modified"
      - Documented 2 new key decisions
      - Updated timestamp
   ✅ Updated tasks.md
      - Marked 3 tasks complete (9 → 12)
      - Added 1 new task
      - Updated progress: 60% → 80%

📝 task-2
   ✅ Updated context.md
      - Final documentation complete
      - Added completion notes
      - Updated timestamp
   ✅ Updated tasks.md
      - All tasks marked complete ✅
      - Status: Complete

📝 SESSION_NOTES.md
   ✅ Updated "What's Been Done" section
   ✅ Updated "Files Modified This Session"
   ✅ Updated "Current Task" progress
   ✅ Updated timestamp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files updated: 6
Tasks marked complete: 3
Progress: task-1 (60% → 80%), task-2 (100% ✅)

Next steps:
- Continue working on active tasks
- Run /session-update again before context resets
- Run /session-end when all tasks complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Git Integration Details

### Commands Used

```bash
# Find all modified files
git diff --name-only HEAD

# Show detailed status
git status --short

# Show recent commits
git log --oneline -10

# Show files in last commit
git diff-tree --no-commit-id --name-only -r HEAD
```

### File Change Detection

**Mapping files to tasks:**

1. Check if file path contains task name
2. Check if file is in directories referenced in context.md
3. Check commit messages for task references
4. Use heuristics for likely associations

**Example:**
- File: `src/auth/jwt.ts`
- Tasks: `authentication-refactor`, `session-management`
- Best match: `authentication-refactor` (path contains "auth")

---

## Smart Suggestions

### Completion Detection

**Automatically detect completed tasks:**

1. **Commit message analysis**
   - Commit: "feat: implement user authentication"
   - Task: "Implement user authentication"
   - Suggestion: Mark as complete

2. **File existence**
   - Task: "Create UserService class"
   - Check: Does `UserService.ts` exist?
   - If yes: Suggest marking complete

3. **Test file creation**
   - Task: "Add unit tests for auth"
   - Check: New files matching `*.test.ts` or `*.spec.ts`
   - If found: Suggest marking complete

### New Task Detection

**Automatically suggest new tasks:**

1. **TODO comments in code**
   ```typescript
   // TODO: Add error handling
   // TODO: Implement caching
   ```
   → Suggest adding these as tasks

2. **New files without corresponding tasks**
   - New: `src/CacheService.ts`
   - No task mentions "cache"
   - Suggest: "Document CacheService"

3. **Modified critical files**
   - Modified: `package.json`
   - Suggest: "Update documentation for new dependencies"

---

## Error Handling

**Common Issues:**

1. **No active tasks found**
   - Check `dev/active/` exists
   - Inform user if empty
   - Suggest using `/session-start`

2. **Cannot read task files**
   - File permissions issue
   - Corrupted files
   - Show error, skip that task

3. **Git not available**
   - Fall back to file modification times
   - Limited change detection
   - Inform user of limitations

4. **Conflicting changes**
   - File modified since last update
   - Ask user to resolve manually
   - Offer to backup before updating

---

## Integration with Session Workflow

**When to use `/session-update`:**

1. **Before context reset** (recommended)
   - Preserve recent work
   - Update documentation
   - Ensure continuity

2. **After major milestone**
   - Completed a phase
   - Finished significant feature
   - Good checkpoint

3. **End of work session**
   - Before taking a break
   - Before switching tasks
   - Daily wrap-up

4. **Before `/session-end`**
   - Final documentation
   - Mark remaining tasks
   - Prepare for archival

---

## Examples

### Example 1: Update All Active Tasks
```
/session-update
```

**Result:**
- Scans all tasks in `dev/active/`
- Shows analysis of each task
- Suggests updates for tasks with changes
- Interactive update workflow

### Example 2: Update Specific Task
```
/session-update "authentication-refactor"
```

**Result:**
- Focuses only on `authentication-refactor` task
- Shows detailed analysis
- Suggests updates for that task only

### Example 3: Quick Check (No Updates)
```
/session-update
```

**Result if no changes:**
```
No updates needed:
- All tasks recently updated
- No new file changes detected
- SESSION_NOTES.md up to date
```

---

## Tips

**Best Practices:**

1. **Run regularly**
   - Before context resets
   - After significant work
   - End of each session

2. **Review suggestions**
   - Don't blindly accept all changes
   - Verify completion markers
   - Add context where needed

3. **Use git integration**
   - Commit frequently for better detection
   - Use descriptive commit messages
   - Reference tasks in commits

4. **Keep SESSION_NOTES.md updated**
   - Central tracking point
   - Helps with session continuity
   - Required for `/session-end`

**Common Patterns:**

```
# Daily workflow
[morning] /session-start "new-task"
[working] ... make changes ...
[midday]  /session-update (checkpoint)
[working] ... more changes ...
[evening] /session-update (before context reset)
[done]    /session-end (when complete)
```

---

**Note:** This command replaces `/dev-docs-update` with enhanced smart detection and automation. Old command is in `.claude/commands_archive/` for reference.
