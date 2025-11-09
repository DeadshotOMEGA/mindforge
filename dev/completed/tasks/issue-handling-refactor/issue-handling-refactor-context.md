# Issue Handling System Refactor - Context

**Last Updated:** 2025-11-08

## Current State

### Existing Command
- **Location:** `.claude/commands/debug-issue.md`
- **Purpose:** Comprehensive 7-phase debugging workflow
- **Phases:** Capture → Investigate → Diagnose → Fix → Validate → Document
- **Status:** Fully functional but assumes active debugging/fixing

### Issue Tracking Structure
- **Directory:** `dev/active/issues/YYYYMMDD-NNN/` (e.g., `dev/active/issues/20251108-001/`)
- **Files Created:**
  - `issue.md` - Issue description and details
  - `investigation.md` - Investigation findings
  - `fix-plan.md` - Proposed fix strategy
  - `resolution.md` - Final resolution
- **Status:** Working well for active debugging scenarios

### Gap Identified
- No command for quick issue recording without investigation
- Can't update issue records later without `/debug-issue` workflow
- No way to list all tracked issues
- No way to archive resolved issues

## Key Files

- `.claude/commands/debug-issue.md` - Current debugging command (to be renamed)
- `.claude/commands/` - Directory where all commands reside
- `dev/active/issues/` - Where active issue records are stored
- `dev/completed/issues/` - Where archived issue records are stored

## Key Decisions

### Decision 1: Command Naming Convention
**Choice:** Full migration to `/issue-*` namespace
**Rationale:**
- Creates logical grouping of all issue-related commands
- Follows existing namespace patterns in codebase
- Makes it clear which commands work with issues
- Easier for users to discover related commands
**Impact:**
- Requires updating any references to `/debug-issue`
- Benefits new and existing users with clearer naming

### Decision 2: Reporting Modes
**Choice:** Dual-mode `/issue-report` (quick + detailed)
**Rationale:**
- Quick mode for minimal interruption during active work
- Detailed mode for comprehensive issue reporting
- Both guided with required field prompts
**Impact:**
- Single command covers two workflows
- Users choose appropriate mode based on context
- Reduces command proliferation

### Decision 3: Issue Status Tracking
**Choice:** Add status field to issue.md (Open/Investigating/Fixed/Blocked)
**Rationale:**
- Enables issue lifecycle tracking
- Supports listing and filtering by status
- Helps context switching between multiple issues
**Impact:**
- All new issues have status field
- `/issue-update` can change status
- `/issue-list` can filter by status

### Decision 4: Command Set Priority
**Choice:** Include list, close, and update; explore others
**Rationale:**
- These three enable complete issue lifecycle
- Other commands can be added based on usage
- Focus on core workflow first
**Impact:**
- Five commands total in `/issue-*` namespace
- Covers capture → track → resolve workflow
- Foundation for future enhancements

## Dependencies

### Internal Dependencies
- All commands depend on issue directory structure (`dev/active/issues/`)
- `/issue-update` and `/issue-list` depend on existing issue records
- `/issue-close` depends on `dev/completed/issues/` directory

### External Dependencies
- No external libraries required
- Pure markdown-based issue tracking
- Relies on file system operations

## Integration Points

### With Existing System
- Commands integrate with existing `.claude/commands/` infrastructure
- Follow same YAML frontmatter format as other commands
- Use same prompt expansion mechanism

### With Other Commands
- `/session-start`, `/session-end`, `/session-update` track development sessions
- `/debug-issue` (renamed to `/issue-debug`) provides deep investigation
- New issue commands complement session management

## Command Structure Template

All commands follow this YAML structure:
```yaml
---
name: issue-[command]
description: [What the command does]
argument-hint: [Example argument or guided input prompt]
---

# Command Title

**Usage:** {prompt}

---

## Overview

[Description of what happens]

## Workflow

[Steps and user interaction]

## Examples

[Real-world usage examples]
```

## Issue Directory Structure

```
dev/
├── active/
│   ├── issues/
│   │   ├── 20251108-001/
│   │   │   ├── issue.md (required)
│   │   │   ├── investigation.md (optional)
│   │   │   ├── fix-plan.md (optional)
│   │   │   └── resolution.md (optional)
│   │   └── 20251108-002/
│   └── issue-handling-refactor/ (this task)
└── completed/
    └── issues/
        ├── 20251108-001/ (archived when /issue-close called)
        └── ...
```

## Issue ID Format

- Format: `YYYYMMDD-NNN`
- Example: `20251108-001`
- Generation:
  - Date: Current date
  - Sequence: Incremented number for that day (001, 002, 003...)
  - Collision handling: Check existing IDs before assignment

## Issue Status Values

- **Open** - Newly reported, awaiting investigation
- **Investigating** - Active debugging in progress
- **Fixed** - Fix implemented, awaiting validation
- **Blocked** - Waiting for external input or dependencies
- **Resolved** - Complete, ready to archive

## Notes

- Issue structure is intentionally simple (markdown files)
- No database required, works with any file system
- Easy to version control and backup
- Supports collaborative issue investigation
- Templates can be enhanced without breaking existing issues
