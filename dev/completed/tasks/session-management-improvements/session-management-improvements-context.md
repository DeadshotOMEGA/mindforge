# Session Management & Command Improvements - Context

**Last Updated:** 2025-11-08

---

## Key Architectural Decisions

### Decision 1: Three-Tier Archive System

**Rationale:** Different levels of memory/accessibility needed for work lifecycle

**Structure:**
```
dev/
├── active/              # In memory - current work
├── completed/           # Memory condensed - accessible but finished
│   ├── sessions/
│   └── tasks/
├── archived/            # Out of memory - long-term storage
│   ├── sessions/
│   └── tasks/
└── SESSION_NOTES.md
```

**Workflow:**
1. **Active:** Work in progress, full context in memory
2. **Completed:** Work done, condensed for reference
3. **Archived:** Historical record, removed from active memory

**Benefits:**
- Clear separation of work states
- Gradual memory reduction
- Accessibility when needed
- Long-term historical record

### Decision 2: Strict Completion Criteria

**Requirement:** BOTH conditions must be met:
1. All tasks in task files marked completed
2. Explicit completion status in SESSION_NOTES.md

**Rationale:**
- Prevents premature archival
- Ensures intentional completion
- Requires explicit user confirmation via session notes
- Double-check system for accuracy

**Implementation:**
- Parse `*-tasks.md` files for `[completed]` or `✅` markers
- Parse SESSION_NOTES.md for status indicators like "Status: Complete" or "✅ Complete"
- Both must be true before allowing archival

### Decision 3: All-or-Nothing Move Policy

**Policy:** No partial moves from active/ to completed/

**Rationale:**
- Maintains context integrity
- Prevents fragmented work states
- Clearer mental model
- Easier to track progress

**Implementation:**
- Check ALL directories in active/
- Only move when ALL are complete or cancelled
- Present summary to user before action
- Require confirmation

### Decision 4: SESSION_NOTES.md Lifecycle

**Handling:**
- Move SESSION_NOTES.md only when ALL tasks/phases complete
- Preserve in `completed/sessions/YYYY-MM-DD/`
- New SESSION_NOTES.md created when next plan starts
- Old notes remain accessible in completed/

**Rationale:**
- Session notes track multiple tasks
- Only archive when session truly ends
- Automatic new session on next plan
- Historical continuity

---

## Current Command Structure

### Existing Commands

**`/dev-docs`**
- Creates plan/context/tasks structure
- Saves to `dev/active/[task-name]/`
- Three files: plan.md, context.md, tasks.md
- Used for strategic planning

**`/dev-docs-update`**
- Updates existing dev-docs before context reset
- Preserves key decisions and progress
- Prevents memory loss

**`/plan`**
- Creates implementation plans
- Auto-saves to dev-docs when approved
- Integrated with plan.template.md

### Planned Improvements

**All Commands:**
- Better template integration
- Consistent output formatting
- Enhanced error handling
- Clearer user prompts

**Specific to each:**
- `/dev-docs`: Better validation, clearer structure
- `/dev-docs-update`: Smarter change detection
- `/plan`: Enhanced phase tracking

---

## Completion Detection Logic

### Task File Parsing

**Supported Formats:**
```markdown
- [x] Task completed
- [completed] Task completed
- ✅ Task completed
```

**Detection:**
- Read all `*-tasks.md` files in directory
- Parse for task status markers
- Count completed vs total tasks
- 100% completion required

### SESSION_NOTES.md Parsing

**Supported Formats:**
```markdown
Status: ✅ Complete
Status: Complete
**Status:** Complete
Phases Complete: 1, 2, 3, 4, 5 (ALL phases complete!)
```

**Detection:**
- Scan for status indicators
- Look for "complete" or "✅"
- Check phase completion statements
- Require explicit completion marker

### Combined Logic

```
IF (all_tasks_complete AND session_status_complete) THEN
  eligible_for_archival = true
ELSE
  eligible_for_archival = false
END IF
```

---

## File Organization Patterns

### Active Work
```
dev/active/
├── task-name-1/
│   ├── task-name-1-plan.md
│   ├── task-name-1-context.md
│   └── task-name-1-tasks.md
└── task-name-2/
    ├── task-name-2-plan.md
    ├── task-name-2-context.md
    └── task-name-2-tasks.md
```

### Completed Work
```
dev/completed/
├── sessions/
│   └── 2025-11-08/
│       └── SESSION_NOTES.md
└── tasks/
    ├── task-name-1/
    │   ├── task-name-1-plan.md
    │   ├── task-name-1-context.md
    │   └── task-name-1-tasks.md
    └── task-name-2/
        └── ...
```

### Archived Work
```
dev/archived/
├── sessions/
│   └── 2025-10-15/
│       └── SESSION_NOTES.md
└── tasks/
    └── old-task-name/
        └── ...
```

---

## /end-session Workflow

### Step-by-Step Process

**1. Detection Phase:**
- Check for `dev/SESSION_NOTES.md`
- Scan `dev/active/` for directories
- Count active tasks

**2. Analysis Phase:**
- For each active directory:
  - Find all `*-tasks.md` files
  - Parse for completion status
  - Calculate completion percentage
- Parse SESSION_NOTES.md for status
- Determine overall completion state

**3. Report Phase:**
- Present summary to user:
  ```
  Session Status: Complete / Incomplete
  Active Tasks: X
  - task-1: 100% complete ✅
  - task-2: 75% complete ⚠️
  - task-3: Cancelled

  Eligible for archival: Yes/No
  ```

**4. Confirmation Phase:**
- If eligible: Ask user to confirm
- If not eligible: Explain what's needed
- Allow manual override (with warning)

**5. Archival Phase:**
- Create `completed/` directories if needed
- Move active tasks to `completed/tasks/`
- Move SESSION_NOTES.md to `completed/sessions/YYYY-MM-DD/`
- Create archive index/metadata
- Confirm success

**6. Cleanup Phase:**
- Verify all files moved successfully
- Remove empty active/ directories
- Provide summary of actions taken

---

## Edge Cases & Handling

### No SESSION_NOTES.md
- **Scenario:** User hasn't created session notes
- **Handling:** Inform user, offer to create one, or skip archival

### Empty active/
- **Scenario:** No active tasks exist
- **Handling:** Nothing to archive, inform user

### Partial Completion
- **Scenario:** Some tasks done, some not
- **Handling:** Report status, wait for all completion

### Cancelled Tasks
- **Scenario:** Task marked as cancelled
- **Handling:** Treat as "complete" for archival purposes
- **Marker:** `[cancelled]` or `❌`

### Mixed Status
- **Scenario:** Some complete, some cancelled, some in progress
- **Handling:** Only archive when no "in progress" remain

### Missing Task Files
- **Scenario:** Directory exists but no task files
- **Handling:** Warn user, ask how to proceed

---

## Integration Points

### With Existing Commands

**`/dev-docs`**
- Creates structure that /end-session will scan
- Uses same directory conventions
- Produces task files in standard format

**`/plan`**
- Auto-saves to dev/active/
- Creates task files /end-session parses
- Uses same completion markers

**`/debug-issue`**
- Creates issue tracking in dev/active/issues/
- Same archival workflow applies
- Issue resolution follows same pattern

### With Future Commands

**`/archive-session`** (potential future)
- Move from completed/ to archived/
- Manual archival when no longer needed
- Same structure preservation

**`/restore-task`** (potential future)
- Recover from completed/ or archived/
- Move back to active/
- Maintain structure integrity

---

## Completion Markers Reference

### Task-Level Markers

**Completed:**
- `[x]`
- `[completed]`
- `✅`

**Cancelled:**
- `[cancelled]`
- `❌`
- `[x] (cancelled)`

**In Progress:**
- `[in_progress]`
- `[ ]`
- No marker

### Session-Level Markers

**Completed:**
- `Status: Complete`
- `Status: ✅ Complete`
- `Phases Complete: 1, 2, 3, 4, 5 (ALL phases complete!)`
- `**Status:** ✅ ALL PHASES COMPLETE`

**In Progress:**
- `Status: In Progress`
- `Phase X in progress`
- `Status: Active`

---

## Files Modified This Session

**Will Create:**
- `.claude/commands/end-session.md`
- `dev/completed/` directory structure
- `dev/archived/` directory structure
- Documentation for archival system

**Will Modify:**
- `.claude/commands/dev-docs.md`
- `.claude/commands/dev-docs-update.md`
- `.claude/commands/plan.md`
- `README.md`
- `dev/SESSION_NOTES.md`

---

## Command Improvement Designs

### Phase 2: Command Improvements Design

#### Unified Command Principles

**Consistency Standards:**
1. **Argument Handling:** Always use `$ARGUMENTS` (not `{prompt}`)
2. **Directory Creation:** Always check if directory exists before creating
3. **Error Handling:** Include error handling for common failure cases
4. **Validation:** Validate inputs (e.g., kebab-case for task names)
5. **Feedback:** Provide clear success/failure messages
6. **Integration:** Reference SESSION_NOTES.md when appropriate
7. **Timestamps:** Always include "Last Updated: YYYY-MM-DD" in generated files
8. **Completion Markers:** Document expected markers in output

**Quality Checklist for All Commands:**
- [ ] Uses $ARGUMENTS consistently
- [ ] Validates inputs before processing
- [ ] Checks for existing files/directories
- [ ] Handles errors gracefully
- [ ] Provides clear user feedback
- [ ] Integrates with SESSION_NOTES.md where relevant
- [ ] Documents completion criteria
- [ ] Includes usage examples
- [ ] Backward compatible with existing usage

---

### /dev-docs Command Improvements

**Current Strengths:**
- Good 3-file structure (plan, context, tasks)
- Clear quality standards
- References project knowledge files
- Well-documented task management

**Proposed Improvements:**

1. **Task Name Validation**
   - Validate task name is kebab-case
   - Auto-convert spaces to hyphens if needed
   - Reject special characters (except hyphens)
   - Provide feedback if name is invalid

2. **Directory Existence Check**
   - Check if `dev/active/[task-name]/` already exists
   - If exists, ask user: overwrite, merge, or use different name
   - Prevent accidental overwrites

3. **Template Integration**
   - Reference `plan.template.md` if it exists
   - Use template structure for plan files
   - Allow customization while maintaining structure

4. **SESSION_NOTES.md Integration**
   - Remind user to update SESSION_NOTES.md after creating plan
   - Suggest adding entry to "Files Modified This Session"
   - Optionally auto-update SESSION_NOTES.md with new task

5. **Verification Step**
   - After creating files, verify all 3 files exist
   - Display summary of what was created
   - Show file paths for easy reference

6. **Enhanced Output**
   - Show clear success message with file paths
   - Include next steps (e.g., "Run /plan to begin implementation")
   - Remind about completion markers to use

7. **Example Usage Section**
   - Add examples of good vs bad task names
   - Show expected directory structure
   - Clarify when to use vs /plan command

**Implementation Priority:** Medium
**Backward Compatibility:** High (additive changes only)
**Estimated Effort:** 20 minutes

---

### /dev-docs-update Command Improvements

**Current Strengths:**
- Comprehensive update checklist
- Good focus on capturing session context
- Structured approach to documentation

**Proposed Improvements:**

1. **Smart Change Detection**
   - Scan `dev/active/` for directories
   - For each directory, check git status for modified files
   - Identify which tasks have file changes
   - Suggest which context files need updating

2. **Automated Task Scanning**
   - Read all `*-tasks.md` files
   - Compare with previous state (if available)
   - Detect new tasks, completed tasks, status changes
   - Suggest updates to task files

3. **Context File Analysis**
   - Parse existing context files
   - Identify sections that may be outdated
   - Suggest specific sections to update
   - Show what was last updated and when

4. **SESSION_NOTES.md Integration**
   - Check if SESSION_NOTES.md exists
   - Extract current phase/status
   - Suggest updates to "Files Modified" section
   - Remind to update phase status

5. **Interactive Update Workflow**
   - Present findings: "3 tasks have file changes"
   - For each task, show: modified files, completion %, last updated
   - Ask: "Which tasks should I help you update?"
   - Guide through updates systematically

6. **Git Integration**
   - Run `git diff --name-only` to find modified files
   - Correlate modified files with active tasks
   - Show which files belong to which tasks
   - Suggest context updates based on changes

7. **Summary Report**
   - After updates, show summary:
     - Tasks updated: X
     - Files modified in this session: Y
     - Last update timestamp: Z
   - Remind about next steps

**Implementation Priority:** High (most impactful)
**Backward Compatibility:** High (maintains current checklist, adds automation)
**Estimated Effort:** 20 minutes

---

### /plan Command Improvements

**Current Strengths:**
- Excellent comprehensive structure
- Clear approval workflow
- Good auto-save integration
- Phase-based approach
- Risk assessment included

**Proposed Improvements:**

1. **Argument Standardization**
   - Replace `{prompt}` with `$ARGUMENTS`
   - Ensure consistent variable naming
   - Match format of other commands

2. **Template Integration Enhancement**
   - Check for `.claude/templates/plan.template.md`
   - Use template structure if available
   - Allow overrides for custom planning
   - Maintain sections from template

3. **SESSION_NOTES.md Integration**
   - After plan approval, remind to update SESSION_NOTES.md
   - Suggest adding to "Current Task" section
   - Include plan in "Files Modified This Session"
   - Update session status to reflect new task

4. **Completion Marker Guidance**
   - In tasks.md, include example markers:
     ```
     - [ ] Task pending
     - [x] Task complete
     - ✅ Task complete (alternate)
     ```
   - Remind about /end-session integration
   - Document status indicators

5. **Enhanced Auto-Save**
   - Current: saves to dev-docs on approval
   - Add: verify files created successfully
   - Add: show confirmation with file paths
   - Add: catch and handle file creation errors

6. **Approval Workflow Clarity**
   - Current options: yes/no/modify
   - Make clearer: "yes", "no", "modify [what to change]"
   - Add "save without implementing" option
   - Show what will happen for each choice

7. **Integration Documentation**
   - Add note about /end-session workflow
   - Mention completion criteria
   - Link to dev-docs update process
   - Show full lifecycle: plan → implement → update → end-session

**Implementation Priority:** Low (already excellent, minor enhancements)
**Backward Compatibility:** High (improvements to existing structure)
**Estimated Effort:** 20 minutes

---

### Unified Command Structure

**Common Template Structure:**

```markdown
---
description: [Command description]
argument-hint: [What user should provide]
---

# [Command Name]

## Overview
[What this command does]

## Arguments
$ARGUMENTS - [Description of what to provide]

## Process

### Step 1: Validation
- Validate inputs
- Check prerequisites
- Verify directory structure

### Step 2: [Main Action]
- Primary command logic
- File operations
- User interactions

### Step 3: Verification
- Confirm success
- Show created/modified files
- Provide next steps

## Error Handling
- Common errors and solutions
- Recovery procedures
- Help resources

## Integration
- How this relates to other commands
- SESSION_NOTES.md updates
- Completion criteria

## Examples
- Good examples
- Common use cases
- Tips and best practices
```

---

### Backward Compatibility Approach

**Principles:**
1. **Additive Only:** Add features, don't remove existing functionality
2. **Default Behavior:** Maintain current default behavior
3. **Optional Enhancements:** New features are opt-in or automatic but non-breaking
4. **Clear Migration:** If changes are needed, provide clear migration path
5. **Version Notes:** Document what changed and why

**Testing Strategy:**
1. Test all commands with previous usage patterns
2. Verify existing dev-docs structures still work
3. Ensure no breaking changes to file formats
4. Test integration points with other commands
5. Validate SESSION_NOTES.md compatibility

**Rollback Plan:**
- Keep backup of original command files
- Git commit before changes
- Document all changes in commit message
- Easy revert if issues found

---

## Phase 2.6: Unified Session Commands Design

### Decision: Session-Based Naming Convention ✅

**User Decision:** Consolidate commands with unified session-based naming

**New Command Structure:**
```
/session-start   - Create new task/project structure
/session-update  - Update documentation before context reset
/session-end     - Archive completed work
```

**Lifecycle Flow:**
```
/session-start → [work] → /session-update (as needed) → [work] → /session-end
```

---

### /session-start Command Design

**Purpose:** Create comprehensive task structure for new development work

**Combines functionality from:**
- `/dev-docs` - Creating dev-docs structure
- `/plan` - Implementation planning with approval workflow

**Key Features:**

1. **Dual Mode Operation**
   - **Quick Mode:** `/session-start "task name"` - Creates basic structure immediately
   - **Plan Mode:** `/session-start --plan "task description"` - Full planning workflow with approval

2. **Quick Mode Workflow**
   ```
   1. Validate task name (kebab-case)
   2. Check if dev/active/[task-name]/ exists
   3. Create directory structure
   4. Generate 3 files: plan.md, context.md, tasks.md
   5. Optionally update SESSION_NOTES.md
   6. Show summary and next steps
   ```

3. **Plan Mode Workflow**
   ```
   1. Analyze task request
   2. Present comprehensive plan (all sections from /plan template)
   3. Wait for approval (yes/no/modify)
   4. On approval:
      - Create dev/active/[task-name]/ directory
      - Generate plan.md, context.md, tasks.md with full plan content
      - Update SESSION_NOTES.md
      - Begin Phase 1 implementation
   ```

4. **Validation & Error Handling**
   - Task name validation (kebab-case, no special chars except hyphens)
   - Auto-convert spaces to hyphens
   - Check for existing directories (offer: overwrite/merge/rename)
   - Verify all files created successfully

5. **SESSION_NOTES.md Integration**
   - Prompt to update SESSION_NOTES.md
   - Add to "Files Modified This Session"
   - Update "Current Task" section
   - Track task start date

6. **Template Integration**
   - Use `.claude/templates/plan.template.md` if exists
   - Maintain consistent structure across all tasks
   - Allow customization per task

7. **Output & Feedback**
   - Show created file paths
   - Display completion markers to use
   - Suggest next steps
   - Remind about /session-update and /session-end

**Arguments:**
- `$ARGUMENTS` - Task name (Quick Mode) or description (Plan Mode)
- `--plan` flag - Enable full planning workflow

**Example Usage:**
```
/session-start "authentication-refactor"
/session-start --plan "Refactor authentication to use JWT tokens"
```

---

### /session-update Command Design

**Purpose:** Smart documentation updates before context resets

**Replaces:** `/dev-docs-update`

**Key Features:**

1. **Smart Detection & Analysis**
   ```
   1. Scan dev/active/ for task directories
   2. Check git status for modified files per task
   3. Parse *-tasks.md files for completion status
   4. Identify which tasks need updates
   5. Present findings to user
   ```

2. **Interactive Update Workflow**
   ```
   Found 3 active tasks with changes:

   1. authentication-refactor (5 files changed, 60% complete)
      - Modified: src/auth/jwt.ts, src/auth/middleware.ts
      - Last updated: 2 hours ago

   2. session-management (2 files changed, 80% complete)
      - Modified: .claude/commands/session-start.md
      - Last updated: 30 minutes ago

   Which tasks should I update? (all/1/2/1,2/cancel)
   ```

3. **Automated Suggestions**
   - Detect completed tasks (mark as ✅)
   - Find new files created (suggest adding to context)
   - Identify modified files (suggest context updates)
   - Calculate completion percentages

4. **Context File Updates**
   - Update "Files Modified This Session" section
   - Add new architectural decisions
   - Document blockers/issues discovered
   - Update "Last Updated" timestamp

5. **Task File Updates**
   - Mark completed tasks as [x] or ✅
   - Add newly discovered tasks
   - Update in-progress task status
   - Reorder priorities if needed

6. **SESSION_NOTES.md Integration**
   - Suggest updates to session status
   - Update phase progress
   - Add to "What's Been Done" section
   - Update completion percentages

7. **Git Integration**
   - Use `git diff --name-only` for change detection
   - Correlate files to tasks automatically
   - Show commit history per task
   - Suggest what to document

8. **Summary Report**
   ```
   Session Update Complete:

   ✅ Updated 2 tasks
   ✅ Marked 8 tasks complete
   ✅ Added 3 new tasks
   ✅ Updated SESSION_NOTES.md

   Files updated:
   - authentication-refactor-context.md
   - authentication-refactor-tasks.md
   - session-management-context.md
   - SESSION_NOTES.md

   Next: Continue work or run /session-end when complete
   ```

**Arguments:**
- `$ARGUMENTS` (optional) - Specific task or focus area
- If empty, analyzes all active tasks

**Example Usage:**
```
/session-update
/session-update "authentication-refactor"
```

---

### /session-end Command Design

**Purpose:** Review and archive completed development sessions

**New Command** (previously designed as `/end-session`)

**Key Features:**

1. **Detection & Analysis Phase**
   ```
   1. Check for dev/SESSION_NOTES.md
   2. Scan dev/active/ for task directories
   3. Parse all *-tasks.md files for completion status
   4. Parse SESSION_NOTES.md for session status
   5. Calculate overall completion state
   ```

2. **Completion Criteria**
   - **Both required:**
     - All tasks in task files marked [x] or ✅
     - SESSION_NOTES.md shows explicit completion status

3. **Review Report**
   ```
   Session Review
   ══════════════════════════════════════

   Session Status: Complete / Incomplete
   Active Tasks: 2

   1. authentication-refactor
      Status: ✅ Complete (15/15 tasks)
      Files: 12 modified

   2. session-management
      Status: ⚠️ Incomplete (45/51 tasks)
      Files: 8 modified

   Overall: Not eligible for archival
   Reason: session-management not complete

   Options:
   - Continue working
   - Mark session-management as cancelled
   - Force archive (not recommended)
   ```

4. **Three-Tier Archive System**
   ```
   dev/
   ├── active/              # Current work (in memory)
   ├── completed/           # Recently done (condensed memory)
   │   ├── sessions/YYYY-MM-DD/
   │   └── tasks/[task-name]/
   └── archived/            # Historical (out of memory)
       ├── sessions/YYYY-MM-DD/
       └── tasks/[task-name]/
   ```

5. **Archival Workflow**
   ```
   1. User confirms archival
   2. Create completed/ directories if needed
   3. Move tasks: dev/active/* → dev/completed/tasks/
   4. Move notes: SESSION_NOTES.md → completed/sessions/YYYY-MM-DD/
   5. Verify all files moved
   6. Clean up empty active/ directories
   7. Show summary
   ```

6. **All-or-Nothing Policy**
   - No partial moves from active/ to completed/
   - ALL tasks must be complete or cancelled
   - Require user confirmation
   - Explain what's blocking if incomplete

7. **Cancelled Task Handling**
   - Marker: `[cancelled]` or `❌`
   - Treated as "complete" for archival purposes
   - User must explicitly mark as cancelled
   - Moved to completed/ with other tasks

8. **Edge Cases**
   - No SESSION_NOTES.md: Warn, offer to create or skip
   - Empty active/: Nothing to archive, inform user
   - Partial completion: Show status, block archival
   - Mixed status: Only archive when no in-progress remain
   - Missing task files: Warn user, ask how to proceed

9. **Success Confirmation**
   ```
   Session Archived Successfully
   ══════════════════════════════════════

   Archived to: dev/completed/sessions/2025-11-08/

   Tasks archived:
   ✅ authentication-refactor (15 tasks complete)
   ✅ session-management (51 tasks complete)

   Files moved: 8

   Your dev/active/ directory is now clear.
   Ready to start new work with /session-start
   ```

**Arguments:**
- `$ARGUMENTS` (optional) - Override flags like `--force`

**Example Usage:**
```
/session-end
/session-end --force (archives even if incomplete, with warning)
```

---

### Migration Plan

**Phase 1: Create Archive Directory**
```
.claude/
├── commands/
│   └── (keep existing commands for now)
└── commands_archive/
    ├── dev-docs.md         (moved from commands/)
    ├── dev-docs-update.md  (moved from commands/)
    └── plan.md             (moved from commands/)
```

**Phase 2: Create New Commands**
- Create `/session-start.md` with unified design
- Create `/session-update.md` with smart detection
- Create `/session-end.md` with archival workflow

**Phase 3: Update Documentation**
- Update README.md command table
  - Old: `/dev-docs`, `/dev-docs-update`, `/plan`
  - New: `/session-start`, `/session-update`, `/session-end`
- Add migration guide for users
- Note that old commands still work (in archive)

**Phase 4: Move Old Commands**
- Move `/dev-docs.md` to `commands_archive/`
- Move `/dev-docs-update.md` to `commands_archive/`
- Move `/plan.md` to `commands_archive/`
- Keep them functional but not in main command list

**Phase 5: Testing**
- Test all new commands
- Verify old commands still work from archive
- Test full lifecycle: start → update → end
- Validate all edge cases

**Backward Compatibility:**
- Old commands remain functional in archive
- Existing dev-docs structures work with new commands
- File formats unchanged
- Users can delete archive when ready

**Migration Guide for Users:**
```markdown
## Command Migration Guide

### Old → New Command Names

| Old Command | New Command | Notes |
|------------|-------------|-------|
| /dev-docs | /session-start | Quick mode for immediate setup |
| /plan | /session-start --plan | Full planning workflow |
| /dev-docs-update | /session-update | Enhanced with smart detection |
| (new) | /session-end | Archive completed work |

### What Changed?

1. **Unified naming:** All session commands use `/session-*` prefix
2. **Combined functionality:** /session-start combines /dev-docs + /plan
3. **Smart updates:** /session-update auto-detects changes
4. **Complete lifecycle:** start → update → end workflow

### Migration Steps

1. Start using new commands for new work
2. Old commands still work (in .claude/commands_archive/)
3. Existing dev-docs structures work with new commands
4. Delete commands_archive/ when comfortable

### No Breaking Changes

- All file formats remain the same
- Existing tasks continue to work
- SESSION_NOTES.md format unchanged
- Completion markers unchanged
```

---

## Phase 3: Archive Directory Structure Design

### Completed Archive Structure

**Purpose:** Store recently completed work with condensed context for easy reference

**Directory Layout:**
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
└── README.md
```

**Metadata Format (.metadata.json):**
```json
{
  "completedDate": "2025-11-08T14:30:00Z",
  "taskName": "authentication-refactor",
  "tasksCompleted": 15,
  "tasksTotal": 15,
  "filesModified": 12,
  "duration": "2 days",
  "phases": ["Analysis", "Design", "Implementation", "Testing"],
  "archivedFrom": "dev/active/authentication-refactor/",
  "canArchive": true
}
```

**Index Format (index.md):**
```markdown
# Completed Tasks Index

Last Updated: 2025-11-08

## Recently Completed (Last 30 Days)

### 2025-11-08
- **authentication-refactor** - Refactored JWT authentication (15 tasks, 12 files)
- **session-management-improvements** - Created unified session commands (51 tasks, 8 files)

### 2025-11-07
- **api-documentation** - Generated comprehensive API docs (8 tasks, 24 files)

## Archive Candidates (Completed >30 days ago)
- 2025-10-15: user-profile-refactor
- 2025-10-10: database-migration

## Statistics
- Total completed tasks: 25
- Total files modified: 156
- Average completion time: 3.5 days
```

**README.md:**
```markdown
# Completed Tasks Archive

This directory contains recently completed development tasks and sessions.

## Structure

- `sessions/YYYY-MM-DD/` - Completed session notes by date
- `tasks/[task-name]/` - Completed task documentation
- `index.md` - Quick reference index of completed work

## When to Archive

Tasks remain in `completed/` for reference but should be moved to `archived/` when:
- 30+ days old and no longer actively referenced
- Project context is no longer needed in active memory
- Using `/session-archive` command (manual)

## Searching Completed Tasks

Use grep to search across completed tasks:
```bash
grep -r "authentication" dev/completed/tasks/
```

## Restoring Tasks

To restore a completed task to active:
```bash
mv dev/completed/tasks/[task-name]/ dev/active/
```
```

---

### Archived Directory Structure

**Purpose:** Long-term storage for historical tasks removed from active memory

**Directory Layout:**
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
│   │   └── index.md
│   └── index.md
└── README.md
```

**Metadata Format (.metadata.json):**
```json
{
  "completedDate": "2025-10-15T10:00:00Z",
  "archivedDate": "2025-11-08T14:30:00Z",
  "taskName": "user-profile-refactor",
  "tasksCompleted": 12,
  "tasksTotal": 12,
  "filesModified": 8,
  "duration": "1 day",
  "phases": ["Planning", "Implementation"],
  "movedFrom": "dev/completed/tasks/user-profile-refactor/",
  "tags": ["refactoring", "user-management"]
}
```

**Index Format (index.md in archived/tasks/):**
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

**README.md:**
```markdown
# Archived Tasks

Long-term storage for completed development tasks.

## Structure

Tasks are organized by completion month:
- `sessions/YYYY-MM/` - Archived session notes
- `tasks/YYYY-MM/[task-name]/` - Archived task documentation

## Purpose

This archive serves as:
- Historical record of development work
- Reference for similar future tasks
- Knowledge base for patterns and solutions
- Compliance/audit trail if needed

## Accessing Archives

Archives are not loaded into active memory but can be accessed anytime:

```bash
# List all archived tasks
ls dev/archived/tasks/*/

# Search for specific pattern
grep -r "authentication" dev/archived/

# View specific archived task
cat dev/archived/tasks/2025-10/user-profile-refactor/user-profile-refactor-plan.md
```

## Permanent Deletion

When you're confident archives are no longer needed:

```bash
# Delete entire archive directory
rm -rf dev/archived/

# Delete specific month
rm -rf dev/archived/tasks/2025-09/
```

**Warning:** Deletion is permanent. Consider backing up to external storage first.
```

---

### Transition Workflow Design

**Active → Completed Transition (via /session-end)**

**Trigger:** User runs `/session-end` when all tasks complete

**Process:**
```
1. Validation Phase
   ✓ Check all tasks in active/ are complete or cancelled
   ✓ Verify SESSION_NOTES.md shows completion
   ✓ User confirms archival

2. Preparation Phase
   ✓ Create dev/completed/ if doesn't exist
   ✓ Create dev/completed/sessions/ if doesn't exist
   ✓ Create dev/completed/tasks/ if doesn't exist
   ✓ Generate date folder: YYYY-MM-DD

3. Metadata Generation
   ✓ For each task: create .metadata.json
   ✓ For session: create .metadata.json
   ✓ Calculate statistics (tasks, files, duration)

4. Move Phase
   ✓ Move dev/active/[task-name]/ → dev/completed/tasks/[task-name]/
   ✓ Move dev/SESSION_NOTES.md → dev/completed/sessions/YYYY-MM-DD/
   ✓ Verify all files moved successfully

5. Index Update
   ✓ Update dev/completed/tasks/index.md
   ✓ Update dev/completed/sessions/index.md
   ✓ Add to recent completions list

6. Cleanup Phase
   ✓ Remove empty dev/active/ directories
   ✓ Verify active/ is empty or has only remaining tasks

7. Confirmation
   ✓ Show summary of what was archived
   ✓ Display new location paths
   ✓ Suggest next steps
```

**Completed → Archived Transition (manual command)**

**Trigger:** User runs `/session-archive` or `/archive-old` command

**Criteria for Archival:**
- Completed >30 days ago (recommended)
- No longer needed in active reference
- User confirms archival

**Process:**
```
1. Detection Phase
   ✓ Scan dev/completed/tasks/ for candidates
   ✓ Check completion dates in metadata
   ✓ List tasks older than threshold (30 days)

2. User Selection
   ✓ Present list of archival candidates
   ✓ User selects which to archive (all/specific)
   ✓ Confirm selections

3. Preparation Phase
   ✓ Create dev/archived/ if doesn't exist
   ✓ Create year-month folder: YYYY-MM
   ✓ Create session/task subdirectories

4. Metadata Update
   ✓ Update .metadata.json with archivalDate
   ✓ Add tags if not present
   ✓ Record move source

5. Move Phase
   ✓ Move completed/tasks/[name]/ → archived/tasks/YYYY-MM/[name]/
   ✓ Move completed/sessions/YYYY-MM-DD/ → archived/sessions/YYYY-MM/
   ✓ Verify moves successful

6. Index Update
   ✓ Remove from completed/index.md
   ✓ Add to archived/index.md
   ✓ Update statistics

7. Confirmation
   ✓ Show archived items
   ✓ Display storage location
   ✓ Show storage space saved
```

---

### Archive Management Commands (Future)

**`/session-archive`** - Move completed → archived
```bash
/session-archive                    # Show candidates
/session-archive --older-than 30    # Archive tasks >30 days
/session-archive "task-name"        # Archive specific task
/session-archive --all              # Archive all completed
```

**`/session-restore`** - Restore from archives
```bash
/session-restore "task-name"        # Restore from completed or archived
/session-restore --from completed   # Restore from completed only
/session-restore --list             # List restorable tasks
```

**`/session-search`** - Search archives
```bash
/session-search "authentication"    # Search all archives
/session-search --active            # Search active only
/session-search --completed         # Search completed only
/session-search --archived          # Search archived only
/session-search --tags refactoring  # Search by tags
```

**`/session-stats`** - Show statistics
```bash
/session-stats                      # Overall statistics
/session-stats --completed          # Completed task stats
/session-stats --archived           # Archived task stats
/session-stats --chart              # Visual chart (if possible)
```

---

### Storage Optimization

**Git Ignore Considerations:**

Should archives be in git? Options:

**Option A: Keep all in git**
```gitignore
# Nothing ignored - full history in git
```
- ✅ Full backup
- ✅ Version controlled
- ❌ Repo size grows

**Option B: Ignore archives**
```gitignore
dev/archived/
```
- ✅ Smaller repo
- ✅ Faster clones
- ❌ No backup
- ❌ Lost on new clone

**Option C: Ignore archived, keep completed (RECOMMENDED)**
```gitignore
dev/archived/
```
- ✅ Recent work in git (completed/)
- ✅ Old work local only (archived/)
- ✅ Reasonable repo size
- ✅ Manual backup of archived/ if needed

**Recommendation:** Use Option C
- Keep `dev/completed/` in git (recent reference)
- Ignore `dev/archived/` (old historical data)
- User can backup archived/ separately if needed

---

### Metadata Schema Reference

**Complete .metadata.json Schema:**

```json
{
  // Identity
  "taskName": "string",
  "taskSlug": "kebab-case-name",

  // Dates
  "createdDate": "ISO8601",
  "completedDate": "ISO8601",
  "archivedDate": "ISO8601 (null if not archived)",

  // Statistics
  "tasksCompleted": "number",
  "tasksTotal": "number",
  "fileCreated": "number",
  "filesModified": "number",
  "filesDeleted": "number",
  "duration": "string (human readable)",
  "durationDays": "number",

  // Structure
  "phases": ["array", "of", "phase", "names"],
  "categories": ["array", "of", "categories"],
  "tags": ["array", "of", "tags"],

  // Tracking
  "movedFrom": "original/path/",
  "archivedFrom": "completed/path/",
  "canArchive": "boolean",

  // References
  "relatedTasks": ["array", "of", "related", "task", "slugs"],
  "sessionDate": "YYYY-MM-DD",

  // Optional
  "notes": "string (optional notes)",
  "issuesFound": "number",
  "issuesResolved": "number"
}
```

---

## Related Documentation

- `dev/active/agent-system-reorganization/` - Example of dev-docs structure
- `dev/SESSION_NOTES.md` - Current session tracking example
- `.claude/templates/plan.template.md` - Plan format reference
- `.claude/commands/debug-issue.md` - Issue tracking pattern
