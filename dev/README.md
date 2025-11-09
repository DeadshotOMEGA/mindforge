# Dev Docs & Session Management System

A comprehensive methodology for maintaining project context across Claude Code sessions with a complete development workflow from start to archive.

---

## The Problem

**Context resets lose everything:**
- Implementation decisions
- Key files and their purposes
- Task progress
- Technical constraints
- Why certain approaches were chosen

**After a reset, Claude has to rediscover everything.**

---

## The Solution: Unified Session Management

A complete workflow with four session commands and a three-tier archive system:

### Session Commands

```bash
/session-start   # Create new task structure
/session-update  # Update docs with smart detection
/session-end     # Archive completed work
/commit          # Prepare for GitHub commit & PR (NEW!)
```

### Three-Tier Directory Structure

```
dev/
├── active/              # Current work (in memory)
├── completed/           # Recent work (condensed memory, ~30 days)
└── archived/            # Historical (out of memory, long-term)
```

**These files and structure survive context resets** - Claude reads them to resume instantly.

---

## Complete Workflow Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│                   SESSION LIFECYCLE                      │
└─────────────────────────────────────────────────────────┘

1. START NEW WORK
   /session-start "task-name"
   └─> Creates: dev/active/task-name/
       ├── task-name-plan.md
       ├── task-name-context.md
       └── task-name-tasks.md

2. WORK & UPDATE
   [Make changes to code]
   /session-update
   └─> Updates docs with git-detected changes
       Marks completed tasks automatically
       Suggests context updates

3. COMPLETE & ARCHIVE
   /session-end
   └─> Moves to: dev/completed/
       Archives SESSION_NOTES.md
       Generates metadata
       Clears active/ for new work

4. PREPARE FOR GITHUB (NEW!)
   /commit
   └─> Generates commit message & PR description
       Archives completed/ → archived/
       Creates .claude/commit-assets/
       Ready to push to GitHub

5. LONG-TERM STORAGE (Optional)
   [After PR merged, old sessions auto-archive]
   └─> Moves to: dev/archived/
```

---

## Session Commands

### 1. /session-start - Start New Work

**Two Modes:**

**Quick Mode** (instant structure):
```bash
/session-start "authentication-refactor"
```
Creates basic task structure immediately.

**Plan Mode** (full planning workflow):
```bash
/session-start --plan "Refactor authentication to use JWT tokens"
```
Presents comprehensive plan, waits for approval, then creates structure.

**What it creates:**
```
dev/active/authentication-refactor/
├── authentication-refactor-plan.md      # Strategic plan
├── authentication-refactor-context.md   # Key decisions & files
└── authentication-refactor-tasks.md     # Progress checklist
```

**Features:**
- Task name validation (kebab-case)
- Checks for existing directories
- SESSION_NOTES.md integration
- Template support
- Error handling

**Replaces:** `/dev-docs` (Quick Mode) and `/plan` (Plan Mode)

---

### 2. /session-update - Smart Documentation Updates

**Usage:**
```bash
/session-update                    # Update all active tasks
/session-update "specific-task"    # Update specific task
```

**Smart Detection:**
- Scans `dev/active/` for tasks
- Uses `git diff` to detect modified files
- Parses task files for completion status
- Suggests marking completed tasks
- Proposes context updates based on changes

**Interactive Workflow:**
```
Found 3 active tasks with changes:

1. authentication-refactor (5 files changed, 60% complete)
   Modified: src/auth/jwt.ts, src/auth/middleware.ts
   Last updated: 2 hours ago

Which tasks should I update? (all/1/2/cancel)
```

**What it updates:**
- `[task]-context.md` - Adds modified files, updates decisions
- `[task]-tasks.md` - Marks completed tasks, adds new ones
- `SESSION_NOTES.md` - Updates progress, phase status

**When to use:**
- Before context resets
- After major milestones
- End of work session
- Before `/session-end`

**Replaces:** `/dev-docs-update` with enhanced smart detection

---

### 3. /session-end - Archive Completed Work

**Usage:**
```bash
/session-end                # Normal workflow (requires completion)
/session-end --force        # Force archive (not recommended)
```

**What it does:**

**1. Reviews session:**
```
Session Review
══════════════════════════════════════

Session Status: Complete / Incomplete
Active Tasks: 2

1. authentication-refactor
   Status: ✅ Complete (15/15 tasks)
   Files: 12 modified

2. api-documentation
   Status: ⚠️ Incomplete (6/8 tasks)
   Files: 24 modified
```

**2. Validates completion:**
- All tasks must be `[x]` or `✅` OR `[cancelled]`
- SESSION_NOTES.md must show completion status
- Both required (strict all-or-nothing policy)

**3. Archives to completed/:**
```
dev/active/task-name/
  → dev/completed/tasks/task-name/

dev/SESSION_NOTES.md
  → dev/completed/sessions/2025-11-08/SESSION_NOTES.md
```

**4. Generates metadata:**
- Creates `.metadata.json` for each task
- Tracks completion date, file counts, duration
- Tags and categorization
- Links to related work

**5. Updates indexes:**
- `dev/completed/tasks/index.md`
- `dev/completed/sessions/index.md`

**6. Clears active/:**
- Removes archived directories
- Leaves `dev/active/` empty for new work

**Edge Cases Handled:**
- Incomplete sessions (blocks archival)
- Mixed status (some complete, some not)
- Cancelled tasks (treats as complete)
- Missing files (warns user)
- Force override (with warnings)

**New command** - completes the unified workflow

---

### 4. /commit - Prepare for GitHub (NEW!)

**Purpose:** Generate professional commit message & PR description from completed work

**Two-Phase Workflow:**

**Phase 1: Validation & Aggregation**
- ✅ Ensures `/dev/active/` is empty (no ongoing sessions)
- ✅ Scans `/dev/completed/` for all sessions and tasks
- ✅ Aggregates metadata, statistics, and summaries

**Phase 2: Generation & Archival**
- ✅ Generates `COMMIT_MESSAGE.md` - Ready for `git commit`
- ✅ Generates `PR_DESCRIPTION.md` - For GitHub PR
- ✅ Generates `COMMIT_SUMMARY.txt` - Quick reference
- ✅ Archives `/dev/completed/` → `/dev/archived/`

**Options:**
```bash
/commit                    # Full workflow: generate + archive
/commit --skip-archive     # Generate only, archive later
/commit --dry-run          # Preview without changes
```

**What it creates:**
```
.claude/commit-assets/
├── COMMIT_MESSAGE.md       # For: git commit -m
├── PR_DESCRIPTION.md       # For: GitHub PR body
├── COMMIT_SUMMARY.txt      # Quick statistics
└── index.md               # Usage guide
```

**Output location:** `.claude/commit-assets/`

**Session Naming (Enhanced):**

Previous format used just date: `2025-11-08/`
New format prevents collisions: `2025-11-08_143022-session-name/`

Example: `2025-11-08_143022-authentication-refactor/`

Benefits:
- Multiple sessions per day no longer conflict
- Timestamp provides unique identifier
- Session name gives context
- Chronologically sortable

**Workflow Integration:**

```
/session-start
   ↓
[Work]
   ↓
/session-update (track progress)
   ↓
/session-end (move to completed/)
   ↓
[Repeat for more sessions]
   ↓
/commit ← Generates assets
   ↓
git commit + GitHub PR
   ↓
dev/archived/ ← Old work moved here
```

**Key Features:**
- ✅ Blocks if `/dev/active/` has tasks (safety check)
- ✅ Generates professional, formatted commit messages
- ✅ Includes statistics (tasks, files, time)
- ✅ Ready-to-use PR descriptions
- ✅ Archives completed work automatically
- ✅ Customizable before committing

**New command** - bridges development workflow to GitHub

---

## Three-File Task Structure

### 1. [task-name]-plan.md

**Purpose:** Strategic plan for implementation

**Contains:**
- Executive summary
- Current state analysis
- Proposed future state
- Implementation phases (numbered, with time estimates)
- Detailed tasks with acceptance criteria
- Risk assessment and mitigation
- Success metrics
- Timeline estimates

**When to create:** Start of task (via `/session-start`)

**When to update:** Scope changes or new phases discovered

**Example:**
```markdown
# Authentication Refactor - Implementation Plan

**Last Updated:** 2025-11-08

## Executive Summary
Migrate from session-based authentication to JWT tokens...

## Implementation Phases

### Phase 1: Infrastructure (2 hours)
- Task 1.1: Create JWT service
  - Acceptance: Tokens generated, signed, validated
- Task 1.2: Update middleware
  - Acceptance: Middleware validates JWT, rejects invalid

### Phase 2: Migration (3 hours)
...
```

---

### 2. [task-name]-context.md

**Purpose:** Key information for resuming work

**Contains:**
- Key architectural decisions (with rationale)
- Important files and their purposes
- Dependencies and integration points
- Technical constraints discovered
- Blockers and issues
- Files modified this session
- Last updated timestamp

**When to create:** Start of task

**When to update:** **FREQUENTLY** via `/session-update`
- After major decisions
- When discovering important files
- When encountering blockers
- Before context resets

**Example:**
```markdown
# Authentication Refactor - Context

**Last Updated:** 2025-11-08

## Key Architectural Decisions

### Decision 1: JWT Storage Location
**Decision:** Store JWT in httpOnly cookie (not localStorage)
**Rationale:**
- Prevents XSS attacks
- Automatic sending with requests
- Secure flag for HTTPS-only

**Impact:**
- Must update client-side code
- Requires CORS configuration

## Key Files

**src/services/JWTService.ts**
- Generates and validates JWT tokens
- Uses RS256 algorithm
- 1-hour expiration

**src/middleware/authMiddleware.ts**
- Validates JWT from cookie
- Attaches user to request
- Handles token refresh

## Integration Points

- Keycloak: External identity provider
- API Gateway: Validates tokens
- Frontend: Stores in httpOnly cookie
```

**CRITICAL:** Update frequently with `/session-update`!

---

### 3. [task-name]-tasks.md

**Purpose:** Progress tracking checklist

**Contains:**
- Phases broken by logical sections
- Tasks in checkbox format
- Status indicators
- Progress statistics
- Completion markers

**When to create:** Start of task

**When to update:** After completing tasks (via `/session-update`)

**Completion Markers:**
```markdown
- [ ]  Pending
- [x]  Complete
- ✅   Complete (visual)
- [cancelled] or ❌  Cancelled
```

**Example:**
```markdown
# Authentication Refactor - Tasks

**Last Updated:** 2025-11-08

## Phase 1: Infrastructure ✅ COMPLETE
- [x] Create JWTService class
- [x] Implement token generation
- [x] Implement token validation
- [x] Add Sentry error tracking

## Phase 2: Middleware 🟡 IN PROGRESS
- [x] Update authMiddleware to use JWT
- [x] Add cookie parsing
- [ ] Add token refresh logic (IN PROGRESS)
- [ ] Add error handling

## Phase 3: Testing ⏳ NOT STARTED
- [ ] Unit tests for JWTService
- [ ] Integration tests for middleware
- [ ] Manual API testing

## Progress

**Total Tasks:** 12
**Completed:** 6
**Pending:** 6

**Status:** 50% Complete
```

---

## Three-Tier Archive System

### Active → Completed → Archived

```
dev/
├── active/                 # CURRENT WORK (in Claude's memory)
│   ├── task-1/
│   │   ├── task-1-plan.md
│   │   ├── task-1-context.md
│   │   └── task-1-tasks.md
│   └── task-2/
│       └── ...
│
├── completed/              # RECENT WORK (~30 days, condensed memory)
│   ├── sessions/
│   │   ├── 2025-11-08/
│   │   │   ├── SESSION_NOTES.md
│   │   │   └── .metadata.json
│   │   └── index.md
│   ├── tasks/
│   │   ├── finished-task/
│   │   │   ├── finished-task-plan.md
│   │   │   ├── finished-task-context.md
│   │   │   ├── finished-task-tasks.md
│   │   │   └── .metadata.json
│   │   └── index.md
│   └── README.md
│
└── archived/               # HISTORICAL (out of memory, long-term)
    ├── sessions/
    │   ├── 2025-10/
    │   │   ├── 2025-10-15/SESSION_NOTES.md
    │   │   └── index.md
    │   └── index.md
    ├── tasks/
    │   ├── 2025-10/
    │   │   ├── old-task-1/
    │   │   ├── old-task-2/
    │   │   └── index.md
    │   └── index.md
    └── README.md
```

### Memory Tiers

**Active** (dev/active/)
- Current work in progress
- Full context in Claude's memory
- Updated frequently with `/session-update`
- Archived with `/session-end`

**Completed** (dev/completed/)
- Recently finished work (~30 days)
- Condensed memory for reference
- Searchable and accessible
- Can be restored to active if needed
- Move to archived/ with `/session-archive`

**Archived** (dev/archived/)
- Historical long-term storage
- Out of active memory
- Organized by month (YYYY-MM)
- Searchable with grep/find
- For reference and compliance

---

## SESSION_NOTES.md Integration

**Purpose:** Track overall development session across multiple tasks

**Location:** `dev/SESSION_NOTES.md`

**Created:** Manually or with `/session-start --plan`

**Updated:** With `/session-update`

**Archived:** With `/session-end` → `dev/completed/sessions/YYYY-MM-DD/`

**Structure:**
```markdown
# Session Notes - 2025-11-08

## Session Overview
**Goal:** Refactor authentication and improve API docs
**Status:** 🔄 Phase 3 In Progress
**Duration:** Started 2025-11-08

## Current Task
**Task:** authentication-refactor
**Phase:** Phase 3 - Testing
**Progress:** 75% complete

## What's Been Done
### Phase 1: Infrastructure ✅
- Created JWT service
- Updated middleware

### Phase 2: Migration ✅
- Migrated all endpoints
- Updated frontend

### Phase 3: Testing 🟡
- Added unit tests
- In progress: Integration tests

## Key Decisions Made
1. **Use httpOnly cookies** - Prevents XSS attacks

## Files Modified This Session
**Created:**
- src/services/JWTService.ts
- tests/jwtService.test.ts

**Modified:**
- src/middleware/authMiddleware.ts
```

**Completion Criteria for /session-end:**
```markdown
**Status:** ✅ Complete
```

---

## When to Use Session Management

**Use for:**
- ✅ Complex multi-session tasks
- ✅ Features with many moving parts
- ✅ Work needing careful planning
- ✅ Refactoring large systems
- ✅ Multi-day projects

**Skip for:**
- ❌ Simple bug fixes
- ❌ Single-file changes
- ❌ Quick updates
- ❌ Trivial modifications

**Rule of thumb:** If it takes >2 hours or spans multiple sessions, use session management.

---

## Complete Workflow Example

### Day 1: Start New Work

```bash
/session-start --plan "Refactor authentication to use JWT tokens"
```

Claude presents comprehensive plan, you approve, structure is created.

**Work on implementation...**

Before context reset:
```bash
/session-update
```

Updates all documentation with your progress.

### Day 2: Resume Work

Claude reads the three files and SESSION_NOTES.md, understands complete state, continues exactly where you left off.

**Complete remaining work...**

```bash
/session-update  # Final updates
```

Mark all tasks complete in tasks file, update SESSION_NOTES.md status to complete.

### End: Archive Completed Work

```bash
/session-end
```

Reviews completion, archives everything to `dev/completed/`, clears `dev/active/`.

### 30+ Days Later: Archive Old Work

```bash
/session-archive  # (Future command)
```

Moves old completed work to `dev/archived/`.

---

## Migration from Old Commands

**Old commands have been archived** to `.claude/commands_archive/`:
- `/dev-docs` → `/session-start` (Quick Mode)
- `/plan` → `/session-start --plan` (Plan Mode)
- `/dev-docs-update` → `/session-update`

**Old commands still work** for backward compatibility, but new workflow is recommended.

**See:** `.claude/commands_archive/README.md` for migration guide.

---

## Best Practices

### 1. Update Context Frequently

**Bad:** Update only at end of session
**Good:** Update after each major milestone

Use `/session-update` regularly:
- After completing phases
- Before context resets
- When making key decisions
- End of work session

### 2. Make Tasks Actionable

**Bad:** "Fix the authentication"
**Good:** "Implement JWT token validation in AuthMiddleware.ts (Acceptance: Tokens validated, errors to Sentry)"

Include:
- Specific file names
- Clear acceptance criteria
- Dependencies

### 3. Use Completion Markers Consistently

**In tasks files:**
- `[x]` or `✅` for completed
- `[cancelled]` or `❌` for cancelled
- `[ ]` for pending

**In SESSION_NOTES.md:**
- `Status: ✅ Complete` when ALL work done
- Required for `/session-end` to archive

### 4. Keep SESSION_NOTES.md Current

Track your overall session:
- Update goal/status
- Note key decisions
- List modified files
- Mark completion explicitly

### 5. Archive Completed Work

Don't leave finished tasks in `dev/active/`:
```bash
/session-end  # Move to completed/
```

After 30+ days:
```bash
/session-archive  # Move to archived/ (future)
```

---

## Searching Archives

### Search Completed Tasks

```bash
# Search all completed work
grep -r "authentication" dev/completed/tasks/

# List completed tasks
ls dev/completed/tasks/

# View specific task
cat dev/completed/tasks/task-name/task-name-plan.md
```

### Search Archived Tasks

```bash
# Search archived work
grep -r "keyword" dev/archived/

# Find by date
ls dev/archived/tasks/2025-10/

# Find specific task
find dev/archived/ -name "*task-name*"
```

### Using Metadata

```bash
# Find tasks completed on specific date
grep -r "2025-11-08" dev/completed/tasks/*/.metadata.json

# Find tasks by tag
grep -r '"authentication"' dev/completed/tasks/*/.metadata.json
```

---

## Metadata Format

Each archived task includes `.metadata.json`:

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

**Used for:**
- Quick statistics
- Search and filtering
- Archive management
- Progress tracking

---

## Git Integration

### Recommended .gitignore

```gitignore
# Keep active and completed in git
# dev/active/
# dev/completed/

# Ignore archived (local long-term storage)
dev/archived/
```

**Rationale:**
- `dev/active/` - Current work, needs version control
- `dev/completed/` - Recent reference, useful in git (~30 days)
- `dev/archived/` - Historical, takes space, local storage only

---

## For Claude Code

### When user starts new work:

```bash
/session-start "task-name"              # Quick Mode
/session-start --plan "description"     # Plan Mode
```

1. Validate task name (kebab-case)
2. Check for existing directory
3. Create three files (plan, context, tasks)
4. Integrate with SESSION_NOTES.md

### When user updates docs:

```bash
/session-update
```

1. Scan `dev/active/` for tasks
2. Use `git diff` to detect changes
3. Parse task files for completion
4. Present interactive update workflow
5. Update context, tasks, SESSION_NOTES.md

### When user ends session:

```bash
/session-end
```

1. Validate all tasks complete/cancelled
2. Check SESSION_NOTES.md completion
3. Present review report
4. Archive to `dev/completed/`
5. Generate metadata
6. Update indexes
7. Clear `dev/active/`

### When resuming from archives:

1. Read plan.md (overall strategy)
2. Read context.md (current state, key decisions)
3. Read tasks.md (what's done, what's next)
4. Read SESSION_NOTES.md (session overview)
5. Resume work exactly where left off

---

## Future Commands

Planned archive management commands:

```bash
/session-archive          # Move completed → archived
/session-restore "name"   # Restore from archives
/session-search "keyword" # Search all archives
/session-stats            # Show statistics
```

---

## Benefits

**Before unified session management:**
- Context reset = start over
- Fragmented workflow
- Manual cleanup
- Lost progress

**After unified session management:**
- Context reset = read files, resume instantly
- Clear workflow: start → update → end
- Automatic archival
- Full history preserved

**Time saved:** Hours per context reset
**Clarity gained:** Always know where you are

---

## Quick Reference

```bash
# Start new work
/session-start "task-name"               # Quick structure
/session-start --plan "description"      # Full planning

# Update documentation
/session-update                          # All tasks
/session-update "task-name"              # Specific task

# Archive completed work
/session-end                             # Normal flow
/session-end --force                     # Force (not recommended)

# Prepare for GitHub (NEW!)
/commit                                  # Generate + archive
/commit --skip-archive                   # Generate only
/commit --dry-run                        # Preview

# Directory structure
dev/active/          # Current work
dev/completed/       # Recent (~30 days)
dev/archived/        # Historical
```

---

## See Also

- `.claude/commands/session-start.md` - Full command documentation
- `.claude/commands/session-update.md` - Update workflow details
- `.claude/commands/session-end.md` - Archive process details
- `.claude/commands/commit.md` - GitHub commit & PR preparation (NEW!)
- `.claude/commands_archive/README.md` - Migration from old commands
- `dev/active/[task]/` - Example active task structure
- `dev/completed/README.md` - Completed tasks archive
- `dev/archived/README.md` - Historical archive
- `.claude/commit-assets/` - Generated commit documentation

---

**Last Updated:** 2025-11-08
**Version:** 2.1 - Added /commit for GitHub Integration
