# Archived Tasks - Long-Term Storage

This directory contains **historical development tasks and sessions** that are no longer in active memory. Work here is organized by completion month for long-term reference and compliance.

---

## Purpose

**Archived tasks are:**
- Historical long-term storage (30+ days old)
- Out of active Claude memory
- Organized by month (YYYY-MM)
- Searchable with grep/find
- For reference, patterns, and compliance
- Can be restored if needed

---

## Directory Structure

```
dev/archived/
├── sessions/
│   ├── 2025-10/
│   │   ├── 2025-10-15/
│   │   │   ├── SESSION_NOTES.md
│   │   │   └── .metadata.json
│   │   ├── 2025-10-10/
│   │   │   ├── SESSION_NOTES.md
│   │   │   └── .metadata.json
│   │   └── index.md
│   ├── 2025-09/
│   │   ├── 2025-09-28/
│   │   │   └── ...
│   │   └── index.md
│   └── index.md
├── tasks/
│   ├── 2025-10/
│   │   ├── user-profile-refactor/
│   │   │   ├── user-profile-refactor-plan.md
│   │   │   ├── user-profile-refactor-context.md
│   │   │   ├── user-profile-refactor-tasks.md
│   │   │   └── .metadata.json
│   │   ├── database-migration/
│   │   │   └── ...
│   │   └── index.md
│   ├── 2025-09/
│   │   ├── api-v2-implementation/
│   │   │   └── ...
│   │   └── index.md
│   └── index.md
└── README.md (this file)
```

---

## How Tasks Get Here

### Via /session-archive Command (Future)

When completed work is >30 days old:

```bash
/session-archive                    # Show candidates
/session-archive --older-than 30    # Archive tasks >30 days
/session-archive "task-name"        # Archive specific task
/session-archive --all              # Archive all completed
```

**What happens:**
1. Scans `dev/completed/` for tasks >30 days old
2. Presents list of candidates
3. User confirms which to archive
4. Moves from `dev/completed/tasks/` → `dev/archived/tasks/YYYY-MM/`
5. Updates metadata with `archivedDate`
6. Updates `dev/archived/tasks/index.md`
7. Removes from `dev/completed/tasks/index.md`

### Manual Archival

```bash
# Create month directory if needed
mkdir -p dev/archived/tasks/2025-10

# Move task
mv dev/completed/tasks/task-name/ dev/archived/tasks/2025-10/

# Update metadata archivedDate field
```

---

## Monthly Organization

Tasks are organized by the month they were **completed** (not archived):

```
2025-10/  ← Tasks completed in October 2025
2025-09/  ← Tasks completed in September 2025
2025-08/  ← Tasks completed in August 2025
```

**Why month-based?**
- Easy to find tasks from specific time periods
- Natural grouping for cleanup/deletion
- Aligns with quarterly reviews
- Simple to backup by month

---

## Metadata Files

Each archived task includes `.metadata.json` with archival tracking:

```json
{
  "taskName": "user-profile-refactor",
  "taskSlug": "user-profile-refactor",
  "completedDate": "2025-10-15T10:00:00Z",
  "archivedDate": "2025-11-08T14:30:00Z",
  "tasksCompleted": 12,
  "tasksTotal": 12,
  "filesModified": 8,
  "duration": "1 day",
  "durationDays": 1,
  "phases": ["Planning", "Implementation"],
  "tags": ["refactoring", "user-management", "profile"],
  "movedFrom": "dev/completed/tasks/user-profile-refactor/",
  "canArchive": false,
  "sessionDate": "2025-10-15",
  "archiveMonth": "2025-10"
}
```

**Key fields:**
- `completedDate` - When task finished
- `archivedDate` - When moved to archived
- `tags` - For searching and categorization
- `archiveMonth` - Which month directory it's in

---

## Index Files

### Global Index (tasks/index.md)

```markdown
# Archived Tasks Index

Last Updated: 2025-11-08

## 2025-11 Archives
- **session-management-improvements** (archived 2025-11-08)
  - 51 tasks completed, 8 files modified
  - Tags: commands, documentation, session-management

## 2025-10 Archives
- **user-profile-refactor** (archived 2025-11-08)
  - 12 tasks completed, 8 files modified
  - Tags: refactoring, user-management

- **database-migration** (archived 2025-11-08)
  - 20 tasks completed, 15 files modified
  - Tags: database, migration, schema

## 2025-09 Archives
- **api-v2-implementation** (archived 2025-10-01)
  - 45 tasks completed, 32 files modified
  - Tags: api, refactoring, breaking-changes

## Search Tips
```bash
# Search by tag
grep -r "refactoring" dev/archived/

# Search by date range
ls dev/archived/tasks/2025-10/

# Find specific task
find dev/archived/ -name "*user-profile*"
```
```

### Monthly Index (tasks/YYYY-MM/index.md)

```markdown
# October 2025 Archived Tasks

Last Updated: 2025-11-08

## Tasks Completed in October 2025

### user-profile-refactor
- **Completed:** 2025-10-15
- **Archived:** 2025-11-08
- **Tasks:** 12/12 complete
- **Files:** 8 modified
- **Duration:** 1 day
- **Tags:** refactoring, user-management, profile

### database-migration
- **Completed:** 2025-10-20
- **Archived:** 2025-11-08
- **Tasks:** 20/20 complete
- **Files:** 15 modified
- **Duration:** 3 days
- **Tags:** database, migration, schema

## Statistics
- Total tasks this month: 2
- Total files modified: 23
- Average duration: 2 days
```

---

## Searching Archives

### Search All Archives

```bash
# Search for keyword in all archived work
grep -r "authentication" dev/archived/

# Search only in context files
grep -r "JWT" dev/archived/tasks/*/*-context.md

# Search in specific month
grep -r "database" dev/archived/tasks/2025-10/
```

### Find by Date Range

```bash
# Tasks from October 2025
ls dev/archived/tasks/2025-10/

# Sessions from October 2025
ls dev/archived/sessions/2025-10/

# All tasks from Q4 2025
ls dev/archived/tasks/2025-{10,11,12}/
```

### Find by Tag

```bash
# Find all tasks tagged "refactoring"
grep -r '"refactoring"' dev/archived/tasks/*/.metadata.json

# Find tasks with multiple tags
grep -r '"tags".*"database".*"migration"' dev/archived/tasks/*/.metadata.json
```

### Find Specific Task

```bash
# Find by name (fuzzy)
find dev/archived/ -name "*user-profile*"

# Find by exact name
find dev/archived/ -type d -name "user-profile-refactor"

# View task details
cat dev/archived/tasks/2025-10/user-profile-refactor/user-profile-refactor-context.md
```

---

## Viewing Archived Tasks

### Full Task View

```bash
# Plan
cat dev/archived/tasks/2025-10/task-name/task-name-plan.md

# Context (most useful for reference)
cat dev/archived/tasks/2025-10/task-name/task-name-context.md

# Tasks checklist
cat dev/archived/tasks/2025-10/task-name/task-name-tasks.md

# Metadata
cat dev/archived/tasks/2025-10/task-name/.metadata.json
```

### Quick Reference

```bash
# List tasks in a month
ls dev/archived/tasks/2025-10/

# Count archived tasks
find dev/archived/tasks/ -mindepth 2 -maxdepth 2 -type d | wc -l

# Recent archives
ls -lt dev/archived/tasks/*/ | head -10
```

---

## Restoring Archived Tasks

### Back to Completed

```bash
# Move from archived to completed
mv dev/archived/tasks/2025-10/task-name/ dev/completed/tasks/

# Update metadata (remove archivedDate, update movedFrom)
```

### Back to Active (Resume Work)

```bash
# Move directly to active
mv dev/archived/tasks/2025-10/task-name/ dev/active/

# Update with /session-update
/session-update "task-name"
```

**When to restore:**
- Need to reference implementation closely
- Found bug in archived work
- Want to build similar feature
- Compliance or audit requirements

---

## Git Integration

### Recommended .gitignore

```gitignore
# Ignore archived directory (local storage only)
dev/archived/
```

**Rationale:**
- Archived work is historical, not needed by team
- Reduces repository clone size
- Can backup externally if needed
- Team can archive their own completed work

### If You Want Archives in Git

```gitignore
# Keep everything in git
# (no exclusions)
```

**Pros:**
- Full history in version control
- Team can see all past work
- No risk of data loss

**Cons:**
- Repository size grows over time
- Slower clones
- More data to sync

---

## Backup Strategy

### Regular Backups

```bash
# Backup all archives monthly
tar -czf archives-backup-$(date +%Y-%m).tar.gz dev/archived/

# Store in safe location
mv archives-backup-*.tar.gz ~/backups/archives/

# Or use cloud storage
rsync -av dev/archived/ ~/Dropbox/project-archives/
```

### Selective Backup

```bash
# Backup specific month
tar -czf archive-2025-10.tar.gz dev/archived/*/2025-10/

# Backup by tag
find dev/archived/ -name ".metadata.json" -exec grep -l "critical" {} \; | \
  xargs tar -czf critical-tasks-backup.tar.gz
```

---

## Cleanup & Maintenance

### When to Delete Archives

**Consider deleting when:**
- Project is completely finished
- >2 years old and no longer relevant
- Compliance retention period has passed
- Need to free up disk space

**Before deleting:**
1. Create backup
2. Verify backup integrity
3. Get team confirmation
4. Document what was deleted

### Deleting Old Archives

```bash
# Delete specific month (BE CAREFUL!)
rm -rf dev/archived/tasks/2023-01/
rm -rf dev/archived/sessions/2023-01/

# Delete entire year
rm -rf dev/archived/*/2023-*/

# After deletion, update indexes
# (or use /session-archive to handle this)
```

**Warning:** Deletion is permanent unless you have backups!

---

## Statistics & Insights

### Productivity Over Time

```bash
# Tasks completed each month
for month in dev/archived/tasks/*/; do
  echo "$month: $(ls $month | wc -l) tasks"
done
```

### Most Common Tags

```bash
# Extract all tags
grep -r '"tags"' dev/archived/tasks/*/.metadata.json | \
  grep -o '\[.*\]' | \
  tr ',' '\n' | \
  sort | uniq -c | sort -rn
```

### Average Task Duration

```bash
# Extract durations
grep -r '"durationDays"' dev/archived/tasks/*/.metadata.json | \
  awk -F':' '{sum+=$NF; count++} END {print sum/count " days average"}'
```

### Files Modified Over Time

```bash
# Total files modified per month
for month in dev/archived/tasks/*/; do
  total=$(grep -r '"filesModified"' $month/.metadata.json | \
    awk -F':' '{sum+=$NF} END {print sum}')
  echo "$month: $total files modified"
done
```

---

## Common Use Cases

### Use Case: Reference Old Implementation

**"How did we implement feature X last year?"**

```bash
# Search for the feature
grep -r "feature X" dev/archived/tasks/

# View implementation context
cat dev/archived/tasks/2024-06/feature-x-implementation/feature-x-context.md
```

### Use Case: Code Audit/Compliance

**"Show all database changes in Q3 2025"**

```bash
# Find database-related tasks
grep -r '"database"' dev/archived/tasks/2025-{07,08,09}/*/.metadata.json

# Review each one
for task in $(find dev/archived/tasks/2025-{07,08,09}/ -name ".metadata.json" -exec grep -l '"database"' {} \; | sed 's|/.metadata.json||'); do
  echo "=== $task ==="
  cat $task/*-context.md
done
```

### Use Case: Pattern Reuse

**"We built something similar before, what approach did we use?"**

```bash
# Find tasks with similar tags
grep -r '"api".*"refactoring"' dev/archived/tasks/*/.metadata.json

# Compare approaches
diff dev/archived/tasks/2025-09/api-v2/api-v2-context.md \
     dev/archived/tasks/2024-06/api-v1/api-v1-context.md
```

---

## Transition From Completed

```
dev/completed/tasks/task-name/
    ↓
    (30+ days old)
    ↓
    /session-archive
    ↓
dev/archived/tasks/2025-10/task-name/
```

**Trigger:** Age >30 days OR manual decision
**Command:** `/session-archive`
**Result:** Long-term storage, out of active memory

---

## Archive Lifecycle

```
┌────────────────────────────────────────┐
│         COMPLETE ARCHIVE LIFECYCLE      │
└────────────────────────────────────────┘

1. ACTIVE
   dev/active/task-name/
   ↓ /session-end

2. COMPLETED (~30 days)
   dev/completed/tasks/task-name/
   ↓ /session-archive (after 30+ days)

3. ARCHIVED (long-term)
   dev/archived/tasks/2025-10/task-name/
   ↓ (manual backup & optional deletion after years)

4. BACKUP (permanent external storage)
   ~/backups/archives/2025-10/task-name/
```

---

## Best Practices

### 1. Regular Archival

**Schedule:** Monthly or quarterly
**Process:**
1. Check `dev/completed/` for tasks >30 days old
2. Run `/session-archive --older-than 30`
3. Verify archives moved correctly
4. Update team if shared repository

### 2. Consistent Tagging

**During development:**
- Add meaningful tags to metadata
- Use consistent tag names
- Include: type, area, technology

**Examples:**
- Type: refactoring, feature, bugfix, migration
- Area: authentication, database, api, frontend
- Tech: jwt, postgresql, react, typescript

### 3. Backup Before Cleanup

**Always:**
1. Create backup first
2. Verify backup works
3. Then delete if needed
4. Keep backups for compliance period

### 4. Document Patterns

**Extract learnings:**
- Copy useful patterns to project docs
- Document anti-patterns encountered
- Update best practices
- Share with team

---

## See Also

- `../README.md` - Main dev docs overview
- `../active/README.md` - Active development tasks
- `../completed/README.md` - Recently completed tasks
- `.claude/commands/session-archive.md` - Archival command (future)
- `.claude/commands/session-restore.md` - Restoration command (future)

---

**Last Updated:** 2025-11-08
**Purpose:** Historical long-term storage (30+ days)
**Retention:** Indefinite (until manual deletion)
**Searchable:** Yes (grep, find, metadata)
