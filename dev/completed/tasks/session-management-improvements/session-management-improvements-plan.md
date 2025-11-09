# Implementation Plan: Session Management & Command Improvements

**Last Updated:** 2025-11-08

---

## Overview

**Goal:** Improve existing dev-docs commands and create session management system with three-tier archival

**Type:** Enhancement + New Feature

**Scope:** Medium

---

## User Decisions

### 1. Completion Criteria (Both Required)
- ✅ All tasks in `*-tasks.md` marked `[completed]` or with ✅
- ✅ Explicit completion status in SESSION_NOTES.md

### 2. Three-Tier Archive System
```
dev/
├── active/              # Current work (in memory)
├── completed/           # Finished work (memory condensed, accessible)
│   ├── sessions/
│   └── tasks/
├── archived/            # Old work (removed from memory)
│   ├── sessions/
│   └── tasks/
└── SESSION_NOTES.md     # Current session
```

**Workflow:** Active → Completed → Archived

### 3. SESSION_NOTES.md Handling
- Move when ALL tasks and phases complete
- New one created when new plan starts
- Preserved in `completed/sessions/YYYY-MM-DD/`

### 4. Partial Completion
- Wait until ALL items complete or cancelled
- No partial moves
- Clear status required

---

## Phase 1: Analysis & Discovery (30 min)

**Objectives:**
- Understand current command implementations
- Document SESSION_NOTES.md format
- Identify improvement opportunities

**Tasks:**
1. Read `/dev-docs.md` command
2. Read `/dev-docs-update.md` command
3. Read `/plan.md` command
4. Read example SESSION_NOTES.md
5. Read example task files
6. Document completion markers
7. Identify improvements

**Success Criteria:**
- Complete understanding of existing patterns
- Documented completion criteria format
- List of improvements

---

## Phase 2: Command Improvements Design (20 min)

**Objectives:**
- Design improvements for each command
- Ensure consistency
- Maintain compatibility

**Tasks:**
1. Design `/dev-docs` improvements
2. Design `/dev-docs-update` improvements
3. Design `/plan` improvements
4. Create unified principles
5. Document compatibility approach

**Success Criteria:**
- Written specifications
- No breaking changes
- Clear rationale

---

## Phase 3: End-Session Workflow Design (45 min)

**Objectives:**
- Design `/end-session` command
- Define completion detection
- Design three-tier archive

**Tasks:**
1. Design session review workflow
2. Define completion criteria logic
3. Design three-tier structure
4. Design workflow steps
5. Handle edge cases

**Workflow Steps:**
1. Scan for SESSION_NOTES.md
2. Parse for completion status
3. Scan /dev/active/
4. Check each directory for completion
5. Present summary
6. Confirm with user
7. Move to completed/
8. Archive SESSION_NOTES.md if done

**Edge Cases:**
- Partial completion
- No SESSION_NOTES.md
- Empty /dev/active/
- Cancelled tasks

**Success Criteria:**
- Clear workflow
- Completion criteria defined
- Archive structure documented
- Edge cases handled

---

## Phase 4: Implementation - Command Improvements (1 hour)

**Objectives:**
- Improve existing commands
- Maintain compatibility
- Test each command

**Tasks:**

### 4.1 Improve `/dev-docs` (20 min)
- Better template integration
- Improved output formatting
- Validation checks
- Testing

### 4.2 Improve `/dev-docs-update` (20 min)
- Enhanced context detection
- Better update recommendations
- Change summary
- Testing

### 4.3 Improve `/plan` (20 min)
- Better template usage
- Enhanced auto-save
- Improved phase tracking
- Testing

**Success Criteria:**
- All commands improved
- No regressions
- Tested successfully

---

## Phase 5: Implementation - /end-session Command (1.5 hours)

**Objectives:**
- Create `/end-session` command
- Implement completion detection
- Implement three-tier archival
- Test thoroughly

**Tasks:**

### 5.1 Create Command File (15 min)
- Create `.claude/commands/end-session.md`
- YAML frontmatter
- Command structure

### 5.2 Implement Detection Logic (30 min)
- Scan for SESSION_NOTES.md
- Parse session status
- Scan /dev/active/
- Parse task files
- Generate summary

### 5.3 Implement Archival Logic (30 min)
- Create completed/archived directories
- Move completed tasks
- Archive SESSION_NOTES.md
- Preserve structure
- Create metadata

### 5.4 Add User Interaction (15 min)
- Present summary
- Request confirmation
- Handle response
- Provide feedback

**Success Criteria:**
- Detects completion correctly
- Archives preserve structure
- User review before archiving
- Clean error handling

---

## Phase 6: Testing & Documentation (45 min)

**Objectives:**
- Test all commands
- Create documentation
- Update README

**Tasks:**

### 6.1 Testing (25 min)
- Test improved commands
- Test /end-session with completion
- Test with partial completion
- Test edge cases
- Verify archive structure
- Test recovery

### 6.2 Documentation (20 min)
- Document improvements
- Create /end-session guide
- Update README (14 → 15 commands)
- Document archive structure
- Create examples

**Success Criteria:**
- All commands tested
- Complete documentation
- README updated
- Examples provided

---

## Files to Create

**New Files:**
1. `.claude/commands/end-session.md` - Session management command
2. `dev/completed/` - Completed work directory
3. `dev/archived/` - Archived work directory
4. Archive structure documentation

**Modified Files:**
1. `.claude/commands/dev-docs.md` - Improvements
2. `.claude/commands/dev-docs-update.md` - Improvements
3. `.claude/commands/plan.md` - Improvements
4. `README.md` - Add /end-session (15 commands)
5. `dev/SESSION_NOTES.md` - Archival instructions

---

## Testing Strategy

**Unit Tests:**
- SESSION_NOTES.md parsing
- Task completion detection
- Directory creation
- File operations

**Integration Tests:**
- Full /end-session with completion
- Partial completion handling
- Command improvements
- Archive and recovery

**Manual Checklist:**
- [ ] `/dev-docs` proper structure
- [ ] `/dev-docs-update` detects changes
- [ ] `/plan` saves correctly
- [ ] `/end-session` detects notes
- [ ] `/end-session` scans active/
- [ ] `/end-session` identifies completion
- [ ] `/end-session` creates structure
- [ ] `/end-session` preserves files
- [ ] Edge: No SESSION_NOTES.md
- [ ] Edge: Empty active/
- [ ] Edge: Partial completion

---

## Risk Mitigation

**Risk 1: False Positive Detection**
- Mitigation: Both task AND session completion required
- User confirmation before archiving

**Risk 2: Data Loss**
- Mitigation: Copy-then-verify approach
- Keep originals until confirmed

**Risk 3: Breaking Workflows**
- Mitigation: Backward compatibility
- Clear documentation

**Risk 4: Inconsistent Markers**
- Mitigation: Support multiple formats
- Clear documentation

---

## Time Estimate

**Total:** 4 hours 30 minutes

- Phase 1: 30 min
- Phase 2: 20 min
- Phase 3: 45 min
- Phase 4: 1 hour
- Phase 5: 1.5 hours
- Phase 6: 45 min

**Confidence:** High

---

## Success Metrics

**Definition of Done:**
- [ ] Three commands improved
- [ ] `/end-session` functional
- [ ] Three-tier archive created
- [ ] Completion detection working
- [ ] Edge cases handled
- [ ] Documentation complete
- [ ] README updated
- [ ] No data loss
- [ ] User confirmation required
- [ ] Full context preserved

**Quality Standards:**
- Performance: < 2 seconds
- Reliability: 100% data preservation
- Usability: Clear prompts
- Documentation: Complete examples
