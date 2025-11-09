# Completed Tasks Archive

This directory contains **recently completed development tasks and sessions** (~30 days). Work here is accessible for reference but has condensed context to save memory.

---

## Purpose

**Completed tasks are:**
- Recently finished work (last ~30 days)
- Accessible for reference
- Searchable and readable
- Can be restored to `dev/active/` if needed
- Eventually moved to `dev/archived/` for long-term storage

---

## Directory Structure

```
dev/completed/
├── sessions/
│   ├── 2025-11-08/
│   │   ├── SESSION_NOTES.md
│   │   └── .metadata.json
│   ├── 2025-11-07/
│   │   ├── SESSION_NOTES.md
│   │   └── .metadata.json
│   └── index.md
├── tasks/
│   ├── authentication-refactor/
│   │   ├── authentication-refactor-plan.md
│   │   ├── authentication-refactor-context.md
│   │   ├── authentication-refactor-tasks.md
│   │   └── .metadata.json
│   ├── session-management-improvements/
│   │   ├── session-management-improvements-plan.md
│   │   ├── session-management-improvements-context.md
│   │   ├── session-management-improvements-tasks.md
│   │   └── .metadata.json
│   └── index.md
└── README.md (this file)
```

---

## How Tasks Get Here

### Via /session-end Command

When you complete work in `dev/active/`:

```bash
/session-end
```

**What happens:**
1. Validates all tasks complete or cancelled
2. Checks SESSION_NOTES.md marked complete
3. Moves `dev/active/[task-name]/` → `dev/completed/tasks/[task-name]/`
4. Moves `dev/SESSION_NOTES.md` → `dev/completed/sessions/YYYY-MM-DD/`
5. Generates `.metadata.json` for each task
6. Updates `index.md` files
7. Clears `dev/active/` for new work

---

## Metadata Files

Each task and session includes `.metadata.json` for tracking:

###Task Metadata Example

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
  "phases": ["Infrastructure", "Migration", "Testing"],
  "tags": ["authentication", "refactoring", "security"],
  "movedFrom": "dev/active/authentication-refactor/",
  "canArchive": true,
  "sessionDate": "2025-11-08"
}
```

### Session Metadata Example

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

---

## Index Files

### tasks/index.md

Quick reference of all completed tasks:

```markdown
# Completed Tasks Index

Last Updated: 2025-11-08

## Recently Completed (Last 30 Days)

### 2025-11-08
- **authentication-refactor** - JWT auth migration (15 tasks, 12 files)
- **session-management** - Unified session commands (51 tasks, 8 files)

### 2025-11-07
- **api-documentation** - Generated API docs (8 tasks, 24 files)

## Archive Candidates (Completed >30 days ago)
- 2025-10-15: user-profile-refactor
- 2025-10-10: database-migration

## Statistics
- Total completed tasks: 25
- Total files modified: 156
- Average completion time: 3.5 days
```

### sessions/index.md

Quick reference of all completed sessions:

```markdown
# Completed Sessions Index

Last Updated: 2025-11-08

## Recent Sessions

- **2025-11-08** - Authentication & session management (3 tasks, 44 files)
- **2025-11-07** - API documentation sprint (1 task, 24 files)

## Statistics
- Total sessions: 2
- Total tasks: 4
- Total files: 68
```

---

## When to Archive

Tasks should stay in `completed/` for ~30 days, then move to `dev/archived/` when:
- 30+ days old and no longer actively referenced
- Project context no longer needed in recent memory
- Want to reduce git repository size (if completed/ is in git)

###Using /session-archive (Future Command)

```bash
/session-archive                    # Show candidates
/session-archive --older-than 30    # Archive tasks >30 days
/session-archive "task-name"        # Archive specific task
/session-archive --all              # Archive all completed
```

**What it does:**
- Moves from `dev/completed/tasks/` → `dev/archived/tasks/YYYY-MM/`
- Updates metadata with archival date
- Removes from completed index
- Adds to archived index

---

## Searching Completed Tasks

### Basic Search

```bash
# List all completed tasks
ls dev/completed/tasks/

# Search for keyword in all tasks
grep -r "authentication" dev/completed/tasks/

# Search in specific files
grep -r "JWT" dev/completed/tasks/*/\*-context.md
```

### Find by Date

```bash
# Tasks completed on specific date
grep -r "2025-11-08" dev/completed/tasks/*/.metadata.json

# Sessions from specific date
ls dev/completed/sessions/2025-11-08/
```

### Find by Tag

```bash
# Find tasks tagged with "refactoring"
grep -r '"refactoring"' dev/completed/tasks/*/.metadata.json

# Find tasks tagged with "authentication"
grep -r '"authentication"' dev/completed/tasks/*/.metadata.json
```

### Search Session Notes

```bash
# Search all session notes
grep -r "keyword" dev/completed/sessions/

# View specific session
cat dev/completed/sessions/2025-11-08/SESSION_NOTES.md
```

---

## Viewing Completed Tasks

### View Full Task

```bash
# View plan
cat dev/completed/tasks/authentication-refactor/authentication-refactor-plan.md

# View context
cat dev/completed/tasks/authentication-refactor/authentication-refactor-context.md

# View tasks checklist
cat dev/completed/tasks/authentication-refactor/authentication-refactor-tasks.md

# View metadata
cat dev/completed/tasks/authentication-refactor/.metadata.json
```

### Quick Statistics

```bash
# Count completed tasks
ls dev/completed/tasks/ | wc -l

# Total files modified (sum from metadata)
grep -r '"filesModified"' dev/completed/tasks/*/.metadata.json

# Average completion time
grep -r '"durationDays"' dev/completed/tasks/*/.metadata.json
```

---

## Restoring Completed Tasks

### Back to Active

If you need to resume work on a completed task:

```bash
mv dev/completed/tasks/task-name/ dev/active/
```

**Then update:**
```bash
/session-update "task-name"
```

### Why Restore?

- Found a bug in completed work
- Need to add features to finished task
- Want to refactor completed code
- Discovered missing requirements

---

## Manual Operations

### Move Task to Completed (Rarely Needed)

**Normal way:** Use `/session-end`

**Manual way** (if needed):
```bash
# Move task
mv dev/active/task-name/ dev/completed/tasks/

# Create metadata manually (or use command)
# Update index.md manually
```

### Delete Completed Task

**Warning:** Only do this if you're absolutely sure!

```bash
rm -rf dev/completed/tasks/task-name/
```

**Better approach:** Move to archived instead:
```bash
# Create archived directory if needed
mkdir -p dev/archived/tasks/2025-11

# Move task
mv dev/completed/tasks/task-name/ dev/archived/tasks/2025-11/
```

---

## Git Integration

### Recommended .gitignore

```gitignore
# Keep completed in git for team reference
# dev/completed/

# Ignore archived (local storage)
dev/archived/
```

**Rationale:**
- Completed tasks (~30 days) are useful for team reference
- Recent work helps onboarding and context
- Not too much to bloat repository
- Archived work (dev/archived/) is excluded

### If Repository Gets Too Large

Move older completed tasks to archived:

```bash
/session-archive --older-than 30
```

This reduces repository size while preserving history locally.

---

## Statistics & Analysis

### Productivity Metrics

**Task completion rate:**
```bash
# Count tasks completed this month
grep -r "2025-11" dev/completed/tasks/*/.metadata.json | wc -l
```

**Average task duration:**
```bash
# Extract duration from metadata
grep -r '"durationDays"' dev/completed/tasks/*/.metadata.json
```

**Files modified per task:**
```bash
# Extract file counts
grep -r '"filesModified"' dev/completed/tasks/*/.metadata.json
```

### Common Tags

```bash
# Find all tags used
grep -r '"tags"' dev/completed/tasks/*/.metadata.json | sort | uniq
```

### Most Productive Sessions

```bash
# Find sessions with most tasks
grep -r '"tasksCount"' dev/completed/sessions/*/.metadata.json | sort -t: -k2 -n -r
```

---

## Maintenance

### Regular Cleanup (Monthly)

**Review archive candidates:**
```bash
# Check tasks >30 days old
find dev/completed/tasks/ -name ".metadata.json" -mtime +30
```

**Archive old tasks:**
```bash
/session-archive --older-than 30
```

### Backup Completed Work

**Before archiving or deleting:**
```bash
# Create backup
tar -czf completed-backup-$(date +%Y-%m-%d).tar.gz dev/completed/

# Move backup to safe location
mv completed-backup-*.tar.gz ~/backups/
```

---

## Transition to Archived

```
dev/completed/tasks/task-name/
    ↓
    /session-archive
    ↓
dev/archived/tasks/2025-11/task-name/
```

**When to archive:**
- Task >30 days old
- No longer actively referenced
- Want to reduce repository size
- Moving to long-term storage

**Stays accessible:**
- Can still search with grep/find
- Can still view files
- Can restore if needed
- Just not in active memory

---

## Common Scenarios

### Scenario: Reference Old Implementation

**Need to see how you solved something before?**

```bash
# Search for the solution
grep -r "JWT validation" dev/completed/tasks/

# Found in authentication-refactor
cat dev/completed/tasks/authentication-refactor/authentication-refactor-context.md
```

### Scenario: Bug in Completed Work

**Discovered bug in finished task?**

```bash
# Restore to active
mv dev/completed/tasks/task-name/ dev/active/

# Resume work
/session-update "task-name"

# Fix bug, update docs, complete again
/session-end
```

### Scenario: Share Implementation Details

**Team member asks how you implemented feature?**

```bash
# Find the task
ls dev/completed/tasks/ | grep feature-name

# Share the context file
cat dev/completed/tasks/feature-implementation/feature-implementation-context.md
```

---

## See Also

- `../README.md` - Main dev docs overview
- `../active/README.md` - Active development tasks
- `../archived/README.md` - Historical long-term archive
- `.claude/commands/session-end.md` - How tasks get here
- `.claude/commands/session-archive.md` - Moving to archived (future)

---

**Last Updated:** 2025-11-08
**Purpose:** Recently completed work for reference (~30 days)
**Next:** Archive to `dev/archived/` after 30+ days
