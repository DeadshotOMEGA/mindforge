---
name: issue-close
description: Archive resolved issues and move them to completed
argument-hint: [optional issue ID, or leave empty to select]
---

# ✅ Issue Close

**Issue to Close:** {prompt}

---

## Overview

Archive a resolved issue and move it to the completed issues directory. This is the final step in the issue lifecycle:

**Issue Lifecycle:**
```
Open → Investigating → Fixed → Resolved → ✅ CLOSED (archived)
```

When an issue is fully resolved and validated, you close it to:
- Archive it for future reference
- Mark it as complete
- Keep active issues list focused
- Maintain historical record in `dev/completed/issues/`

---

## When to Close an Issue

Close an issue when:
- ✅ Fix has been implemented
- ✅ Fix has been tested and validated
- ✅ No regressions found
- ✅ User/team confirmed it works
- ✅ Related documentation is updated
- ✅ No follow-up actions needed

**Don't close if:**
- ❌ Fix is partial or workaround-only
- ❌ Waiting for validation from someone
- ❌ Related issues still open
- ❌ Regression risk is high

---

## Close Workflow

### Step 1: Select Issue

If you didn't specify an issue ID, I'll show you resolved issues ready to close:

```
✅ Resolved Issues (Ready to Close)

ID           | Created    | Status   | Severity | Description
─────────────┼────────────┼──────────┼──────────┼──────────────
20251108-002 | 2025-11-08 | Fixed    | 🔴 Crit  | Database timeout
20251107-015 | 2025-11-07 | Fixed    | 🟡 High  | API rate limits
20251107-012 | 2025-11-07 | Fixed    | 🟢 Med   | Cache bug

Select issue to close (ID or number):
```

If you specified an ID, I'll verify that issue and confirm closure.

### Step 2: Review Issue

Before closing, you'll see:
- Issue summary
- Status: (should be "Fixed" or "Resolved")
- What was fixed
- Related files changed
- Testing performed

**Confirmation:** "Ready to close this issue?"

### Step 3: Add Closure Notes (Optional)

Before archiving, you can add final notes:

```
Final Notes (optional):
- Brief summary of what was done
- Key takeaway or learning
- Prevention tips for future
- Link to merged PR if applicable

Example:
"Upgraded AWS SDK to v3.580. Fixes large file uploads.
PR #456. Tested with files up to 500MB. No regressions found."
```

### Step 4: Archive Issue

I'll:
1. Move `dev/active/issues/[ID]/` → `dev/completed/issues/[ID]/`
2. Update status to "Resolved"
3. Add closure timestamp
4. Add any final notes to issue.md
5. Show confirmation with details

---

## After Closing

The issue is now:
- **Archived** in `dev/completed/issues/[ID]/`
- **Referenced** for historical knowledge
- **Available** to review if similar issue arises
- **No longer** in active list

If you need to reopen: Use `/issue-update` to move back to active if needed (rare).

---

## Issue Status Values

```
ACTIVE STATUSES:
- Open:         Not yet investigated
- Investigating: Currently being debugged
- Blocked:      Waiting for something

TERMINAL STATUSES:
- Fixed:        Fix implemented, awaiting validation
- Resolved:     Fully fixed and validated (ready to close)

ARCHIVED:
- Closed:       ✅ Moved to dev/completed/issues/
```

---

## Close Examples

### Example 1: Simple Close

```
/issue-close 20251108-001

Issue 20251108-001: Login broken on mobile
Status: Resolved
Severity: 🟡 High

Created: 2025-11-08
Fixed by: PR #456 (Auth refactor)
Validated: Tested on iOS Safari, Chrome Android

Ready to close and archive?
→ Yes

Final Notes (optional):
→ Fixed in auth refactor PR #456. Tested on all mobile browsers.

✅ Issue 20251108-001 closed and archived!

Moved: dev/active/issues/20251108-001/
    → dev/completed/issues/20251108-001/

Closure Summary:
- Status: Resolved → Closed
- Archived: 2025-11-08 16:30
- Fixed by: PR #456
- Files modified: 3 (auth.ts, utils.ts, types.ts)
- Tests added: 5 new regression tests

For future reference: See dev/completed/issues/20251108-001/
```

### Example 2: Close with Notes

```
/issue-close

✅ Resolved Issues Ready to Close (3):

ID           | Status | Severity | Description
─────────────┼────────┼──────────┼────────────────
20251108-002 | Resolved| 🔴 Crit  | Database timeout
20251108-003 | Fixed   | 🟢 Med   | Form validation
20251107-015 | Fixed   | 🟡 High  | Rate limiting

Select issue: 20251108-002

Issue: Database timeout error
Status: Resolved
Severity: 🔴 Critical
Impact: All workflows affected

Investigation: Found N+1 query in WorkflowService
Fix: Added proper joins and indexes
Testing: Load tested with 1000 concurrent requests

Final Notes:
"Query now completes in <100ms. Added composite index on workflows(user_id, created_at). Prevent future N+1 queries by using QueryBuilder with .load() instead of lazy loading. See migration #20251108-migration-001"

✅ Issue 20251108-002 closed and archived!

What next?
→ /issue-list (see remaining active issues)
→ /issue-report (create new issue)
→ /issue-debug (work on another issue)
```

### Example 3: Close Multiple Issues

```
/issue-close
→ Shows 5 resolved issues
→ Close first issue (20251108-001)
→ Ask if you want to close another

Continue closing?
→ Yes

Select next issue: 20251108-003
→ Close it
→ Continue?

→ Yes

Select next issue: 20251107-015
→ Close it
→ Continue?

→ No

✅ Closed 3 issues total!

Summary:
- 20251108-001 ✅ Closed
- 20251108-003 ✅ Closed
- 20251107-015 ✅ Closed

Remaining active: 2 issues
→ /issue-list (see active issues)
```

---

## Preventing Premature Closure

I'll warn you if:

```
⚠️  Are you sure?
- Status is "Open" (not resolved)
- Status is "Investigating" (still working on it)
- No changes recorded in this issue
- Related issues are still open
- Status is "Blocked" (waiting for something)

Better to:
→ /issue-update (update status first)
→ /issue-debug (continue investigating)
→ Close the blocking issue first
```

---

## Reopening an Issue

If an issue resurfaces after being closed:

```
This issue was previously closed (20251108-001)
Last closed: 2025-11-08 16:30

Reopen it?
→ Yes: Moves back to dev/active/issues/
       Status reset to "Open"
       Can be investigated again
→ No: Keep archived, create new issue instead
```

**Best Practice:** Create a new issue for regression/recurrence to maintain clear history.

---

## Archive Structure

After closing, issues live in:
```
dev/completed/issues/
├── 20251108-001/
│   ├── issue.md (with closure notes)
│   ├── investigation.md
│   ├── fix-plan.md
│   └── resolution.md
├── 20251108-002/
├── 20251107-015/
└── ...
```

All original files preserved for reference.

---

## Tips for Closing Issues

**Good Closure Practices:**
- ✅ Close only when truly resolved
- ✅ Add comprehensive final notes
- ✅ Reference PRs and commits
- ✅ Document prevention tips
- ✅ Share learnings with team

**Avoid:**
- ❌ Closing premature fixes (wait for validation)
- ❌ Closing with missing testing
- ❌ Closing without documenting what was done
- ❌ Closing multiple related issues as one

**Closure Checklist:**
- [ ] Fix implemented and merged
- [ ] Testing completed and passed
- [ ] No regressions found
- [ ] Documentation updated
- [ ] Team aware and agrees
- [ ] Related issues handled

---

## Bulk Operations

To see completed issues:

```
/issue-list completed
→ Shows all resolved issues
→ Select one to view full details

/issue-list by:completed-date
→ Most recent completions first
```

To search completed issues:

```
/issue-list search "auth" completed
→ Find completed auth-related issues
→ Good for understanding past solutions
```

---

## Getting Started

**Ready to close an issue?**

If you provided an issue ID:
1. I'll show that issue's details
2. Verify it's ready to close (status, testing)
3. Prompt for final notes
4. Archive the issue
5. Show completion summary

**If you didn't provide an ID:**

I'll show resolved issues ready for closure and let you pick which to close.

Start with `/issue-list resolved` to see issues ready to close!

Or directly close with: `/issue-close 20251108-001`
