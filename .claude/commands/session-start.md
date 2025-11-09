---
description: Create new task/project structure
argument-hint: Task name or description (use --plan for full planning mode)
---

# Session Start - Create New Development Task

I'll help you start a new development task or project with proper structure and documentation.

## Detecting Mode

**Checking arguments:** $ARGUMENTS

**Mode Detection:**
- If `$ARGUMENTS` contains `--plan`: **Plan Mode** (full planning workflow)
- Otherwise: **Quick Mode** (immediate structure creation)

---

## Quick Mode Workflow

**For simple task structure creation without full planning**

### Step 1: Validate Task Name

Extracting task name from: $ARGUMENTS

**Validation Rules:**
1. Convert to kebab-case (lowercase, hyphens for spaces)
2. Remove special characters (except hyphens)
3. Must be 3-50 characters
4. Cannot start or end with hyphen

**Task Name:** `[sanitized-task-name]`

### Step 2: Check for Existing Directory

Checking if `dev/active/[task-name]/` already exists...

**If exists:**
- Show existing files
- Ask user:
  - **overwrite** - Delete existing and create new
  - **merge** - Keep existing, only add missing files
  - **rename** - Use different task name
  - **cancel** - Stop operation

**If not exists:** Proceed to creation

### Step 3: Create Directory Structure

Creating: `dev/active/[task-name]/`

**Files to create:**
1. `[task-name]-plan.md` - Overall plan and strategy
2. `[task-name]-context.md` - Key decisions, files, dependencies
3. `[task-name]-tasks.md` - Checklist for tracking progress

### Step 4: Generate Initial Content

**For `[task-name]-plan.md`:**
```markdown
# [Task Name] - Plan

**Last Updated:** YYYY-MM-DD

## Overview

[Brief description of what this task aims to accomplish]

## Goals

- [ ] Goal 1
- [ ] Goal 2
- [ ] Goal 3

## Approach

[High-level approach to solving this task]

## Implementation Phases

### Phase 1: [Phase Name]
- Task 1
- Task 2

### Phase 2: [Phase Name]
- Task 1
- Task 2

## Success Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Estimated Time

[Estimated completion time]
```

**For `[task-name]-context.md`:**
```markdown
# [Task Name] - Context

**Last Updated:** YYYY-MM-DD

## Key Files

- `file1.ts` - Description
- `file2.ts` - Description

## Key Decisions

### Decision 1: [Decision Name]
**Rationale:** Why this decision was made
**Impact:** What this affects

## Dependencies

- Dependency 1
- Dependency 2

## Integration Points

- Where this integrates with existing code

## Notes

- Important note 1
- Important note 2
```

**For `[task-name]-tasks.md`:**
```markdown
# [Task Name] - Tasks

**Last Updated:** YYYY-MM-DD

## Task Checklist

### Phase 1: [Phase Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

**Completion Markers:**
- `[ ]` - Pending
- `[x]` - Complete
- `✅` - Complete (alternate)
- `[cancelled]` or `❌` - Cancelled

## Progress

**Total Tasks:** X
**Completed:** 0
**Pending:** X

**Status:** Not Started
```

### Step 5: Update SESSION_NOTES.md (Optional)

**Checking for `dev/SESSION_NOTES.md`...**

**If exists:**
- Remind user to add this task to SESSION_NOTES.md
- Suggest adding to "Current Task" section
- Suggest adding to "Files Modified This Session"

**If not exists:**
- Suggest creating SESSION_NOTES.md with `/session-start --plan` mode

### Step 6: Verification & Confirmation

**Files created:**
✅ `dev/active/[task-name]/[task-name]-plan.md`
✅ `dev/active/[task-name]/[task-name]-context.md`
✅ `dev/active/[task-name]/[task-name]-tasks.md`

**Next Steps:**
1. Edit the plan file to add detailed implementation steps
2. Use `/session-update` to track progress as you work
3. Run `/session-end` when all tasks are complete

**Completion Markers for `/session-end`:**
- Mark all tasks as `[x]` or `✅` in tasks file
- Update SESSION_NOTES.md with completion status

---

## Plan Mode Workflow

**For comprehensive planning with approval workflow**

Activated when `$ARGUMENTS` contains `--plan`

### Step 1: Extract Task Description

Removing `--plan` flag from arguments...

**Task Description:** $ARGUMENTS (without --plan)

### Step 2: Analyze Task

**Understanding the request:**

1. **Scope & Complexity**
   - What is the full scope of this task?
   - Complexity level: simple / medium / complex
   - Any ambiguities needing clarification?

2. **Dependencies & Prerequisites**
   - What existing code/systems will this interact with?
   - Required tools, libraries, resources?
   - Prerequisites that must be in place first?

3. **Potential Challenges**
   - Technical challenges?
   - What could go wrong?
   - Unknown factors?

### Step 3: Present Comprehensive Plan

## 🎯 Task Analysis

**Scope:** [Scope description]
**Complexity:** [Simple/Medium/Complex]
**Estimated Time:** [Time estimate]

---

## 📝 Implementation Plan

### Phase-by-Phase Breakdown

**Phase 1: [Phase Name]** ([Time estimate])

**Objectives:**
- What this phase accomplishes

**Tasks:**
1. [Specific actionable task]
2. [Specific actionable task]
3. [Specific actionable task]

**Success Criteria:**
- [ ] How we know this phase is complete

**Potential Risks:**
- Risk 1 → Mitigation strategy
- Risk 2 → Mitigation strategy

---

**Phase 2: [Phase Name]** ([Time estimate])

[Same structure as Phase 1]

---

## 📁 Files to Create/Modify

**New Files:**
- `path/to/new/file1.ts` - Purpose
- `path/to/new/file2.ts` - Purpose

**Files to Modify:**
- `path/to/existing/file1.ts` - Changes needed
- `path/to/existing/file2.ts` - Changes needed

**Configuration:**
- Config file changes if needed

---

## 🧪 Testing Strategy

**Unit Tests:**
- What needs unit testing
- Test files to create

**Integration Tests:**
- Integration points to test
- Test scenarios

**Manual Testing:**
- [ ] Manual test 1
- [ ] Manual test 2

---

## ⚠️ Risk Assessment

**Technical Risks:**
1. **[Risk Name]**
   - Description of risk
   - **Mitigation:** How to reduce this risk
   - **Fallback:** Plan B if it happens

**Mitigation Strategies:**
- Overall risk reduction approach

**Rollback Plan:**
- How to undo changes if something goes wrong

---

## ✅ Success Metrics

**Definition of Done:**
- [ ] All functional requirements met
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No known bugs or issues

**Quality Standards:**
- Performance targets
- Code quality metrics
- Test coverage requirements

---

## ⏱️ Time Estimates

**Total Estimated Time:** [Total]

**Breakdown by Phase:**
- Phase 1: [Time]
- Phase 2: [Time]
- Phase 3: [Time]

**Confidence Level:** High / Medium / Low

---

## 💬 Questions for Clarification

**Before finalizing, I may need clarification on:**

1. [Question 1 if needed]
2. [Question 2 if needed]

---

## 🎬 Approval & Next Steps

**Please review this comprehensive plan and respond with:**

- **"yes"** or **"proceed"** - I'll create the dev-docs structure and begin Phase 1
- **"no"** or **"cancel"** - I'll stop without creating anything
- **"modify [what to change]"** - Tell me what to adjust
- **Specific feedback** - I'll revise the plan accordingly

**I will wait for your explicit approval before creating any files or beginning implementation.**

---

### Step 4: Wait for User Approval

[Pause here for user response]

---

### Step 5: On Approval - Create Dev-Docs Structure

**When user says "yes" or "proceed":**

1. **Extract task name** from description (kebab-case)
2. **Create directory:** `dev/active/[task-name]/`
3. **Generate files:**
   - `[task-name]-plan.md` - Full plan from above
   - `[task-name]-context.md` - Key decisions, files, dependencies
   - `[task-name]-tasks.md` - All tasks in checklist format
4. **Update SESSION_NOTES.md** (if exists)
5. **Begin Phase 1 implementation**

**Files created:**
✅ `dev/active/[task-name]/[task-name]-plan.md` (with full plan)
✅ `dev/active/[task-name]/[task-name]-context.md` (with decisions)
✅ `dev/active/[task-name]/[task-name]-tasks.md` (with all tasks)

**Ready to begin Phase 1!**

---

## Template Integration

**Checking for `.claude/templates/plan.template.md`...**

**If exists:**
- Use template structure for plan files
- Maintain template sections
- Allow customization for this specific task

**If not exists:**
- Use default structure shown above

---

## Error Handling

**Common Errors & Solutions:**

1. **Invalid task name**
   - Error: Task name contains invalid characters
   - Solution: Auto-sanitize to kebab-case, inform user

2. **Directory already exists**
   - Error: `dev/active/[task-name]/` already exists
   - Solution: Ask user to overwrite/merge/rename

3. **Missing dev/active/ directory**
   - Error: `dev/active/` doesn't exist
   - Solution: Create it automatically

4. **Cannot create files**
   - Error: Permission denied or disk full
   - Solution: Show error, suggest checking permissions

---

## Integration with Session Workflow

**Full Session Lifecycle:**

```
/session-start
    ↓
[Work on tasks]
    ↓
/session-update (as needed - track progress)
    ↓
[Continue working]
    ↓
/session-end (when complete - archive work)
```

**Completion Criteria for `/session-end`:**
1. All tasks in `*-tasks.md` marked `[x]` or `✅`
2. SESSION_NOTES.md shows explicit completion status

---

## Examples

### Example 1: Quick Mode
```
/session-start "authentication refactor"
```

**Result:**
- Creates `dev/active/authentication-refactor/`
- Generates 3 files with basic structure
- Ready to start working immediately

### Example 2: Plan Mode
```
/session-start --plan "Refactor authentication to use JWT tokens instead of sessions"
```

**Result:**
- Analyzes the task comprehensively
- Presents detailed plan with phases, risks, estimates
- Waits for approval
- On approval: creates structure + begins implementation

### Example 3: Quick Mode with Existing Directory
```
/session-start "existing task"
```

**Result:**
- Detects existing directory
- Asks: overwrite/merge/rename?
- Proceeds based on user choice

---

## Tips

**When to use Quick Mode:**
- Simple, straightforward tasks
- You already know what to do
- Just need structure for tracking

**When to use Plan Mode:**
- Complex, multi-phase tasks
- Need to think through approach
- Want comprehensive planning
- Need time estimates and risk assessment

**Best Practices:**
- Use kebab-case names: `my-task-name`
- Keep names descriptive but concise
- Update tasks file as you progress
- Run `/session-update` before context resets
- Use `/session-end` when fully complete

---

**Note:** This command replaces `/dev-docs` (Quick Mode) and `/plan` (Plan Mode). Old commands are in `.claude/commands_archive/` for reference.
