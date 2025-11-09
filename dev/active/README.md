# Active Development Tasks

This directory contains all **current work in progress**. Tasks in this directory are actively maintained in Claude's memory during development sessions.

---

## Purpose

**Active tasks are:**
- Currently being worked on
- In Claude's full context
- Updated frequently with `/session-update`
- Moved to `dev/completed/` when done with `/session-end`

---

## Directory Structure

Each task has its own directory with three core files:

```
dev/active/
├── task-name-1/
│   ├── task-name-1-plan.md      # Strategic plan and phases
│   ├── task-name-1-context.md   # Key decisions and files
│   └── task-name-1-tasks.md     # Progress checklist
└── task-name-2/
    ├── task-name-2-plan.md
    ├── task-name-2-context.md
    └── task-name-2-tasks.md
```

---

## Three-File Structure

### 1. [task-name]-plan.md
**What:** Strategic implementation plan

**Contains:**
- Executive summary
- Implementation phases with time estimates
- Detailed tasks with acceptance criteria
- Risk assessment
- Success metrics

**Updated:** When scope changes or phases added

---

### 2. [task-name]-context.md
**What:** Key information for resuming work

**Contains:**
- Architectural decisions with rationale
- Important files and their purposes
- Dependencies and integration points
- Blockers and issues
- Files modified this session

**Updated:** **FREQUENTLY** with `/session-update`
- After major decisions
- When discovering important files
- Before context resets
- End of work session

---

### 3. [task-name]-tasks.md
**What:** Progress tracking checklist

**Contains:**
- Phases with checkbox tasks
- Progress statistics
- Completion markers (`[x]`, `✅`, `[cancelled]`)
- Status indicators

**Updated:** As tasks complete (via `/session-update`)

---

## Workflow

### Creating New Tasks

```bash
# Quick Mode - instant structure
/session-start "task-name"

# Plan Mode - full planning workflow
/session-start --plan "description of what to build"
```

Both create the three-file structure in `dev/active/[task-name]/`

---

### Working on Tasks

1. **Make changes to code**
2. **Update documentation regularly:**
   ```bash
   /session-update
   ```
   - Detects modified files via git
   - Suggests marking completed tasks
   - Updates context with changes
   - Interactive workflow

---

### Completing Tasks

When all tasks are done:

1. **Mark all tasks complete** in `[task]-tasks.md`:
   ```markdown
   - [x] Task 1
   - [x] Task 2
   - ✅ Task 3
   ```

2. **Update SESSION_NOTES.md** status:
   ```markdown
   **Status:** ✅ Complete
   ```

3. **Archive the work:**
   ```bash
   /session-end
   ```
   - Validates completion
   - Moves to `dev/completed/`
   - Generates metadata
   - Clears this directory

---

## Task Lifecycle

```
┌─────────────────────────────────────────┐
│         ACTIVE TASK LIFECYCLE            │
└─────────────────────────────────────────┘

1. CREATE
   /session-start → Creates in dev/active/

2. WORK
   [Make code changes]
   /session-update (regularly)

3. COMPLETE
   Mark all tasks [x]
   Update SESSION_NOTES.md: Complete

4. ARCHIVE
   /session-start → Moves to dev/completed/
   → dev/active/ becomes empty
```

---

## Best Practices

### 1. Update Frequently
**DON'T:** Update only at end of session
**DO:** Update after each milestone

```bash
# After completing a phase
/session-update

# Before context reset
/session-update

# End of work day
/session-update
```

### 2. Keep One Task Active
**DON'T:** Work on 10 tasks simultaneously
**DO:** Focus on 1-3 tasks at a time

**Why:**
- Clearer focus
- Easier to track
- Faster to complete
- Simpler archival

### 3. Use Descriptive Names
**Bad:** `task`, `fix`, `update`
**Good:** `authentication-refactor`, `api-documentation`, `user-profile-feature`

**Format:** kebab-case (lowercase with hyphens)

### 4. Mark Completion Properly

**In task files:**
```markdown
- [x] Completed task
- ✅ Completed task (alternate)
- [cancelled] or ❌ Cancelled task
```

**Required for `/session-end` to archive**

---

## SESSION_NOTES.md Integration

**Location:** `dev/SESSION_NOTES.md` (parent directory)

**Purpose:** Track overall session across all active tasks

**Updated:** With `/session-update`

**Example:**
```markdown
# Session Notes - 2025-11-08

## Current Task
**Task:** authentication-refactor
**Phase:** Phase 3 - Testing
**Progress:** 75% complete

## What's Been Done
### Phase 1: Infrastructure ✅
- Created JWT service
- Updated middleware

## Files Modified This Session
**Created:**
- src/services/JWTService.ts

**Modified:**
- src/middleware/authMiddleware.ts
```

**Completion marker for `/session-end`:**
```markdown
**Status:** ✅ Complete
```

---

## Common Scenarios

### Scenario: Multiple Active Tasks

```
dev/active/
├── authentication-refactor/    (75% complete)
├── api-documentation/           (90% complete)
└── user-profile-feature/        (30% complete)
```

**Update all:**
```bash
/session-update
# Shows all tasks, lets you select which to update
```

**Update specific:**
```bash
/session-update "authentication-refactor"
```

---

### Scenario: Pausing a Task

**Don't want to complete but need to pause?**

1. Run `/session-update` to document current state
2. Leave in `dev/active/`
3. Work on other tasks
4. Resume later - context is preserved

**No need to archive incomplete work**

---

### Scenario: Cancelling a Task

**Decided not to finish?**

1. Mark remaining tasks as `[cancelled]` in tasks file
2. Add cancellation note to context.md
3. Run `/session-end` - treats cancelled as complete
4. Archives to `dev/completed/` for reference

---

### Scenario: Task is Blocked

**Can't proceed due to external dependency?**

1. Document blocker in context.md:
   ```markdown
   ## Blockers
   - Waiting for API access from team
   - Need design approval
   ```

2. Leave in `dev/active/`
3. Work on other tasks
4. Resume when unblocked

---

## Completion Criteria

For `/session-end` to archive a task:

**Both required:**
1. ✅ All tasks in `[task]-tasks.md` are `[x]`, `✅`, or `[cancelled]`
2. ✅ `dev/SESSION_NOTES.md` shows `Status: ✅ Complete`

**All-or-nothing policy:**
- ALL active tasks must meet criteria
- OR mark incomplete ones as `[cancelled]`
- Prevents partial archival

---

## When This Directory is Empty

**After `/session-end`:**
```
dev/active/
└── (empty - ready for new work)
```

**Start new work:**
```bash
/session-start "new-task-name"
```

---

## Searching Active Tasks

```bash
# List all active tasks
ls dev/active/

# Search for keyword
grep -r "authentication" dev/active/

# Find specific file
find dev/active/ -name "*tasks.md"

# Check task completion
grep -r "\[x\]" dev/active/*/\*-tasks.md
```

---

## Moving Tasks Manually

**From active to completed** (rarely needed - use `/session-end`):
```bash
mv dev/active/task-name/ dev/completed/tasks/
```

**From completed back to active** (resume work):
```bash
mv dev/completed/tasks/task-name/ dev/active/
```

---

**Last Updated:** 2025-11-08
**Purpose:** Active development workspace
