---
name: issue-update
description: Update existing issue records with new information
argument-hint: [optional issue ID, or leave empty to select]
---

# 📝 Issue Update

**Target Issue:** {prompt}

---

## Overview

Update an existing issue record with new information, findings, or status changes. This is useful for:
- Adding investigation notes
- Updating status (Open → Investigating → Fixed → Blocked)
- Recording new findings or workarounds
- Changing severity if understanding changes
- Linking related issues
- Adding context you discover later

Perfect for issues that were quickly reported but need enrichment as you learn more.

---

## Workflow

### Step 1: Select Issue

If you didn't specify an issue ID, I'll:
1. Scan `dev/active/issues/` directory
2. Display all active issues in a table:
   - Issue ID
   - Created date
   - Status
   - Severity
   - Brief description
3. Let you choose which to update

**If you specified an ID:** Verify you want to update that issue

### Step 2: Choose What to Update

Select from available updates:

**A) Update Status**
- Open → Investigating
- Investigating → Fixed
- Fixed → Resolved (ready to close)
- Any → Blocked (waiting for something)
- Any → Open (reopen if needed)

**B) Add Investigation Notes**
- Document findings without full `/issue-debug` workflow
- Append to issue.md or create investigation.md
- Great for: "I looked into this and found..."

**C) Change Severity**
- 🔴 Critical - Application broken
- 🟡 High - Major impact
- 🟢 Medium - Minor impact
- ⚪ Low - Polish/nice-to-have
- Useful if severity changes as you learn more

**D) Add Workaround**
- Document how users can work around the issue
- Help others dealing with the problem immediately

**E) Update Impact Notes**
- Who's affected (all users / some users / dev only)
- Blocking status (yes / no)
- Updated workarounds available

**F) Add Related Issues**
- Link to similar or dependent issues
- Example: "Related to #20251108-001"

**G) Append General Notes**
- Any other information or context
- Update reproduction steps if clearer now
- Note about what you've already tried

### Step 3: Provide Information

I'll prompt you for the specific information needed for your chosen update.

### Step 4: Update Issue Record

I'll:
1. Read the current issue.md
2. Add/update the requested information
3. Update timestamp
4. Write changes back to file
5. Show you the updated record
6. Suggest next steps

---

## Update Options in Detail

### Update Status

**Possible Transitions:**
```
Open
 ↓
Investigating (when /issue-debug starts or when you actively look at it)
 ↓
Fixed (when fix is implemented)
 ↓
Resolved (when validated and ready to close)

OR

Any Status → Blocked (if waiting for something)
Blocked → (previous status) (when unblocked)

OR

Any Status → Open (if reopened)
```

**When to change:**
- **To Investigating:** When you or someone else starts debugging
- **To Fixed:** When a fix has been implemented and code committed
- **To Resolved:** When fix is validated and working
- **To Blocked:** When waiting for external input, dependencies, etc.
- **Back to Open:** If issue resurfaces or was incorrectly marked fixed

### Add Investigation Notes

Record what you've discovered:
- "Checked logs, error originates in AuthService"
- "Happens only when database is slow"
- "Reproduced with 100% consistency using these steps..."
- "Found similar issue in old tickets"

These are informal notes that help others understand the problem better.

### Change Severity

Adjust severity if understanding improves:
- Started as Low, discovered it affects core feature → change to High
- Thought it was widespread → discovered only affects one user → change to Low
- New data about impact → severity update needed

### Add Workaround

Help users/team work around issue immediately:
- "Can delay upgrade to release X.Y.Z"
- "Restart app to clear the error temporarily"
- "Use Legacy button instead of New interface"
- "Work in Firefox instead of Chrome until fixed"

### Update Impact

Refine who's affected and whether it's blocking:
- "Initially thought all users, but only dev team"
- "Turns out there's a good workaround, not blocking anymore"
- "Much worse than thought, now blocking all new feature development"

### Link Related Issues

Connect issues that are related:
- "Same root cause as #20251108-002"
- "Blocked by #20251108-001"
- "Duplicate of #20251105-003"

### Add Notes

General-purpose field for anything else:
- "Docker container issue, might be environment-specific"
- "User reported via support ticket #12345"
- "Should check this against new test suite in PR #789"

---

## Active Issues Display

When you run `/issue-update` without an ID, you'll see:

```
📋 Active Issues:

ID           | Created    | Status       | Severity | Description
─────────────┼────────────┼──────────────┼──────────┼──────────────────────
20251108-001 | 2025-11-08 | Open         | 🟡 High  | Login broken on mobile
20251108-002 | 2025-11-08 | Investigating| 🔴 Crit  | Database timeout error
20251108-003 | 2025-11-08 | Open         | 🟢 Med   | Form validation issue
20251108-004 | 2025-11-07 | Fixed        | 🟡 High  | API rate limiting
20251108-005 | 2025-11-07 | Blocked      | 🔴 Crit  | Waiting for vendor fix

Select issue to update (ID or number):
```

---

## Issue Record Update

When you update an issue, the `issue.md` file gets updated:

```markdown
# Issue: 20251108-001

**Created:** 2025-11-08 14:30
**Updated:** 2025-11-08 15:45
**Status:** Investigating  ← Updated
**Severity:** 🟡 High      ← Can be updated

## Description
Login button not working on mobile devices

## Impact
- **Who:** All mobile users
- **Blocking:** Yes

## Investigation Notes
(Updated content appended here)

Added 2025-11-08 15:45:
- Checked mobile logs
- Error only occurs in Safari on iOS
- Chrome on Android works fine
- Seems related to recent auth refactor

## Workaround
Use desktop to log in for now

## Related Issues
#20251105-003 (similar auth issues)

## Notes
User reported via Slack channel #support
```

---

## Examples

### Example 1: Quick Update After Checking Issue

```
/issue-update 20251108-001

Updating: Login button not working on mobile
Current Status: Open
Current Severity: 🟡 High

What would you like to update?
A) Update Status
B) Add Investigation Notes
C) Change Severity
D) Add Workaround
E) Update Impact Notes
F) Link Related Issues
G) Add General Notes

> B (Add Investigation Notes)

Investigation notes:
→ "Just checked, error only in Safari on iOS. Chrome/Android work fine. Likely related to recent auth refactor in PR #456"

✅ Updated issue 20251108-001!

Status: Open → (unchanged)
Added investigation notes about Safari-specific issue
Suggest: /issue-debug 20251108-001 to investigate PR #456 changes
```

### Example 2: Status Update During Debugging

```
/issue-update 20251108-002

What would you like to update?
A) Update Status ← Selected

Current Status: Open
New Status:
 1) Investigating (actively looking at this)
 2) Fixed (solution implemented)
 3) Resolved (validated and working)
 4) Blocked (waiting for something)
 5) Keep as Open

> 1 (Investigating)

✅ Status updated: Open → Investigating

Next: Use /issue-debug to systematically investigate
Or: /issue-update again to add notes as you discover things
```

### Example 3: Severity Update After Learning More

```
/issue-update

📋 Active Issues (showing 3):
20251108-001 | Open | 🟡 High | Login broken on mobile
20251108-002 | Open | 🟢 Med  | Search results formatting
20251108-003 | Open | ⚪ Low  | Documentation typo

Select issue: 20251108-003

Updating: Documentation typo
Current Severity: ⚪ Low

What to update?
A) Update Status
B) Add Investigation Notes
C) Change Severity ← Selected

New Severity:
🔴 Critical - Application broken
🟡 High - Major feature broken
🟢 Medium - Minor issue
⚪ Low - Polish/nice-to-have

> 🟡 High (changed my mind, critical doc is missing)

✅ Severity updated: ⚪ Low → 🟡 High

This doc issue blocks new users from starting!
Next: /issue-report to create companion issue for doc improvement
```

### Example 4: Multiple Updates

```
/issue-update 20251108-002

Current: Database timeout - Open - 🔴 Critical

What to update?
A) Update Status → Investigating (started looking at it)
B) Add Investigation Notes → "Logs show query takes 45s. Checked indexes, looks like N+1 query problem"
C) Add Workaround → "Restart app to clear cache"

✅ Updated issue 20251108-002!
- Status: Open → Investigating
- Added investigation notes
- Added workaround

Next: Run /issue-debug 20251108-002 for full systematic investigation
```

---

## Tips for Good Updates

**Do:**
- Update status as you make progress (keeps everyone informed)
- Add notes as you discover things (helps others and future-you)
- Change severity if understanding improves
- Link related issues (prevents duplicate work)
- Document workarounds (helps users immediately)

**Don't:**
- Don't try to fix in update notes (use `/issue-debug` for full fixes)
- Don't create big narrative updates (keep them factual)
- Don't update old issues without checking if they're already fixed
- Don't ignore critical severity issues (prioritize them)

**Best Practices:**
- Use updates frequently as you learn things
- Update status to "Investigating" when you start looking
- Add workarounds immediately to help users/team
- Keep notes focused on the issue (one topic per note)
- Link to related issues and tickets when you discover connections

---

## When to Use `/issue-update` vs `/issue-debug`

**Use `/issue-update` when:**
- Issue already reported
- You want to add a note or workaround
- Status needs updating
- Learning more without full debugging
- Adding context from slack/support tickets
- Severity changes based on new info

**Use `/issue-debug` when:**
- Time to actively investigate and fix
- Need systematic 7-phase debugging
- Ready to implement a solution
- Need to spawn specialized agents
- Full investigation workflow required

---

## Getting Started

**Ready to update an issue?**

If you provided an issue ID, I'll:
1. Show you that issue's current state
2. Ask what you want to update
3. Gather the information needed
4. Update the issue record
5. Show you the result
6. Suggest next steps

**If you didn't provide an ID:**

I'll show you all active issues and let you pick which one to update.

Start with `/issue-update` (no args) to see what needs updating!
