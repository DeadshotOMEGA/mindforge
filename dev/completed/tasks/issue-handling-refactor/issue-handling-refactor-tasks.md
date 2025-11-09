# Issue Handling System Refactor - Tasks

**Last Updated:** 2025-11-08

## Task Checklist

### Phase 1: Command Renaming (20 min)
- [ ] Rename `.claude/commands/debug-issue.md` → `.claude/commands/issue-debug.md`
- [ ] Update YAML frontmatter: `name: debug-issue` → `name: issue-debug`
- [ ] Search codebase for references to `/debug-issue`
- [ ] Remove old `debug-issue.md` file if migration complete
- [ ] Verify `/issue-debug` command works correctly

### Phase 2: Create `/issue-report` Command (20 min)
- [ ] Create `.claude/commands/issue-report.md`
- [ ] Write command structure with YAML frontmatter
- [ ] Implement quick capture mode workflow
- [ ] Implement detailed guided mode workflow
- [ ] Add issue ID generation logic (YYYYMMDD-NNN format)
- [ ] Create issue directory structure
- [ ] Generate `issue.md` template with status field
- [ ] Test with sample issues

### Phase 3: Create `/issue-update` Command (15 min)
- [ ] Create `.claude/commands/issue-update.md`
- [ ] Implement issue listing from `dev/active/issues/`
- [ ] Create selection mechanism for which issue to update
- [ ] Implement status update functionality
- [ ] Implement notes/findings append workflow
- [ ] Add field update options (severity, classification, etc.)
- [ ] Test with existing issues

### Phase 4: Create `/issue-list` Command (15 min)
- [ ] Create `.claude/commands/issue-list.md`
- [ ] Implement directory scanning for active issues
- [ ] Create formatted issue summary display
- [ ] Add filtering by status (Open, Investigating, Fixed, Blocked)
- [ ] Add filtering by severity (Critical, High, Medium, Low)
- [ ] Add sorting options (date, severity, status)
- [ ] Test listing and filtering

### Phase 5: Create `/issue-close` Command (10 min)
- [ ] Create `.claude/commands/issue-close.md`
- [ ] Implement issue selection from active issues
- [ ] Move issue directory from `dev/active/issues/` to `dev/completed/issues/`
- [ ] Prompt for final notes before archiving
- [ ] Update issue status to "Resolved"
- [ ] Test archival process

### Phase 6: Explore Additional Commands (20 min)
- [ ] Evaluate `/issue-search` - Find issues by keyword/ID
- [ ] Evaluate `/issue-link` - Connect related issues
- [ ] Evaluate `/issue-export` - Generate reports from issues
- [ ] Document findings and recommendations
- [ ] Create issues for future implementation if valuable

### Phase 7: Testing & Validation (25 min)
- [ ] Test `/issue-report` quick mode
- [ ] Test `/issue-report` detailed mode
- [ ] Test `/issue-update` with existing issue
- [ ] Test `/issue-list` with filtering
- [ ] Test `/issue-close` archival
- [ ] Verify `/issue-debug` renamed version works
- [ ] Check issue directory structure consistency
- [ ] Verify status field in all new issues
- [ ] Test with edge cases (no issues, many issues, special characters)
- [ ] Validate file system operations and error handling

### Phase 8: Documentation & Guide (15 min)
- [ ] Create issue workflow guide (when to use which command)
- [ ] Add examples for each command
- [ ] Document issue status lifecycle
- [ ] Create decision tree (quick report vs. debug investigation)
- [ ] Update existing documentation if needed
- [ ] Create command cheat sheet
- [ ] Document issue ID generation and collision handling

### Phase 9: Final Cleanup & Summary (5 min)
- [ ] Verify all commands properly formatted
- [ ] Check for any broken references
- [ ] Update this task list with completion status
- [ ] Create summary of changes
- [ ] Mark task as complete

---

## Progress Tracking

**Total Tasks:** 48
**Completed:** 0
**In Progress:** 0
**Pending:** 48

**Status:** Not Started

---

## Completion Markers

- `[ ]` - Pending / Not Started
- `[x]` - Complete
- `⚠️` - Blocked / Needs Review
- `❌` - Cancelled

---

## Phase Dependencies

```
Phase 1 (Rename)
    ↓
Phase 2 (issue-report) ─┐
    ↓                    │
Phase 3 (issue-update) ──┼─→ Phase 7 (Testing)
    ↓                    │       ↓
Phase 4 (issue-list) ────┤   Phase 8 (Docs)
    ↓                    │       ↓
Phase 5 (issue-close) ───┘   Phase 9 (Cleanup)
    ↓
Phase 6 (Explore)
```

---

## Notes

- Each phase builds on previous phases
- Testing (Phase 7) should occur after all commands created
- Documentation (Phase 8) benefits from testing insights
- Phase 6 (exploration) can be done in parallel with other phases
