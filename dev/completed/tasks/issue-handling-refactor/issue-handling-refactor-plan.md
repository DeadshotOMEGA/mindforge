# Issue Handling System Refactor - Plan

**Last Updated:** 2025-11-08

## Overview

Enhance and reorganize the Claude Code issue handling system by:
1. Consolidating all issue-related commands under `/issue-*` namespace
2. Enabling quick issue reporting without active debugging
3. Adding commands to manage issue lifecycle (update, list, close)
4. Exploring additional commands for improved workflow

This creates a cohesive issue management system supporting both quick capture and in-depth debugging.

## Goals

- [x] Rename `/debug-issue` → `/issue-debug` for consistency
- [x] Create `/issue-report` with quick and detailed modes for recording issues
- [x] Create `/issue-update` to modify and add information to tracked issues
- [x] Create `/issue-list` to view all tracked issues with filtering
- [x] Create `/issue-close` to archive resolved issues
- [x] Explore additional commands for enhanced workflow
- [x] Maintain consistency with existing issue tracking structure
- [x] Document complete workflow and use cases

## Approach

**Implementation Strategy:**
1. Create new commands with consistent YAML structure and naming
2. Maintain compatibility with existing `dev/active/issues/YYYYMMDD-NNN/` structure
3. Support two modes for reporting: quick capture and detailed guided flow
4. Build on existing `/debug-issue` foundation while adding complementary commands
5. Focus on user experience with minimal interruption to active work

**Issue Handling Workflow:**
```
Quick Capture (during work)
→ /issue-report "Brief description"
  ↓
Continue working
  ↓
Later: /issue-debug (if investigation needed)
  ↓
/issue-update (if adding findings)
  ↓
/issue-close (when resolved)

OR

Planned Investigation
→ /issue-debug "Full description"
  ↓
Complete 7-phase debugging workflow
  ↓
/issue-close (when resolved)
```

## Implementation Phases

### Phase 1: Command Renaming (20 min)
- Rename `debug-issue.md` → `issue-debug.md`
- Update command metadata
- Remove old command file
- Verify no broken references

### Phase 2: Quick Capture Commands (55 min)
- Create `/issue-report` with quick and detailed modes
- Create `/issue-update` for modifying issues
- Create `/issue-list` for viewing issues
- Create `/issue-close` for archiving issues

### Phase 3: Enhancement & Exploration (30 min)
- Evaluate additional helpful commands
- Design complementary features
- Document patterns and best practices

### Phase 4: Testing & Documentation (25 min)
- Test all command functionality
- Create workflow guide and examples
- Validate issue structure consistency
- Document when to use each command

## Success Criteria

- [x] All `/issue-*` commands created and functional
- [x] Issue reporting works in quick and detailed modes
- [x] Issue tracking structure maintained consistently
- [x] Status field implemented in issue records
- [x] Commands follow existing patterns and conventions
- [x] Documentation includes clear examples
- [x] All commands tested and validated
- [x] Backward compatibility: old `/debug-issue` fully migrated

## Estimated Time

**Total: 2 hours**
- Phase 1: 20 minutes
- Phase 2: 55 minutes
- Phase 3: 30 minutes
- Phase 4: 25 minutes
- Buffer: 10 minutes

## Key Decisions

1. **Full Migration:** No backward compatibility with `/debug-issue`; fully migrate to `/issue-debug`
2. **Reporting Modes:** Two modes (quick + detailed) to support both quick capture and comprehensive reporting
3. **Issue Status:** Track status (Open/Investigating/Fixed/Blocked) in issue records
4. **Namespace:** Use `/issue-*` pattern for all issue-related commands
5. **Additional Commands:** Include `/issue-list` and `/issue-close` now; explore other commands

## Related Commands

- `/issue-debug` - Active debugging workflow (renamed from `/debug-issue`)
- `/issue-report` - Quick or detailed issue recording (NEW)
- `/issue-update` - Modify existing issue records (NEW)
- `/issue-list` - View all tracked issues (NEW)
- `/issue-close` - Archive resolved issues (NEW)
