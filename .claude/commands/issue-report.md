---
name: issue-report
description: Quick or detailed issue recording without active debugging
argument-hint: [issue description or leave empty for mode selection]
---

# 📋 Issue Report

**Issue Description:** {prompt}

---

## Overview

I'll help you record an issue without immediately diving into active debugging. This is perfect for:
- Capturing issues during active development work
- Recording problems discovered by others
- Documenting feature requests or improvements
- Building up a backlog for later investigation

**Two Reporting Modes:**
1. **Quick Mode** - Minimal interruption, essential info only (30 seconds)
2. **Detailed Mode** - Comprehensive capture with context (2-3 minutes)

---

## Mode Selection

**If you provided a description:** I'll ask if you want to continue in Quick or Detailed mode.

**If you didn't provide a description:** Please choose:

### Quick Mode
**Best for:** During active work, simple issues, non-blocking problems

**What you provide:**
- Brief issue description
- Severity level (Critical/High/Medium/Low)
- Quick impact note (who's affected)

**Time:** ~30 seconds
**Result:** Creates issue directory with basic info, ready to debug later

### Detailed Mode
**Best for:** Complex issues, feature requests, well-researched problems

**What you provide:**
- Complete issue description
- Steps to reproduce (if applicable)
- Environment and context
- Impact assessment
- Any related information

**Time:** ~2-3 minutes
**Result:** Creates comprehensive issue record with full context

---

## Quick Mode Workflow

When you choose Quick Mode, I'll:

1. **Confirm issue description**
   - Use provided description or ask for one

2. **Ask for severity**
   - 🔴 Critical - Application broken, data loss, security issue
   - 🟡 High - Major feature broken, many users affected
   - 🟢 Medium - Minor issue, workaround exists
   - ⚪ Low - Polish, edge cases, nice-to-have

3. **Ask for quick impact**
   - "Who's affected?" (all users / some users / development only)
   - "Blocking work?" (yes / no)

4. **Generate issue record**
   - Create `dev/active/issues/YYYYMMDD-NNN/` directory
   - Generate `issue.md` with:
     - Description
     - Severity
     - Impact
     - Status: Open
     - Created date
   - Show issue ID
   - Offer to edit details or start `/issue-debug`

**Example Quick Report:**
```
/issue-report "Login button not working on mobile"

→ Is this correct?
→ Severity? (Critical/High/Medium/Low) → High
→ Who's affected? (all/some/dev-only) → all users
→ Blocking work? (yes/no) → yes

✅ Issue 20251108-003 created!
Ready to: /issue-debug 20251108-003 (investigate) or continue working
```

---

## Detailed Mode Workflow

When you choose Detailed Mode, I'll guide you through:

1. **Issue Description**
   - What is the problem?
   - What should happen vs. what actually happens?

2. **Reproduction Steps**
   - Can you reproduce it consistently?
   - What are the exact steps?
   - Does it happen every time or intermittently?

3. **Environment & Context**
   - Where does it occur? (frontend/backend/both)
   - Browser/environment/version if applicable
   - When was it first noticed?
   - Recent changes that might be related?

4. **Impact Assessment**
   - Severity: 🔴 Critical | 🟡 High | 🟢 Medium | ⚪ Low
   - Who's affected? (all users / some users / specific users / dev only)
   - Is it blocking work? (yes / no)
   - Are there workarounds?

5. **Additional Context**
   - Error messages or logs?
   - Related features or systems?
   - Any other relevant details?

6. **Generate Issue Record**
   - Create `dev/active/issues/YYYYMMDD-NNN/` directory
   - Generate comprehensive `issue.md` with all details
   - Status: Open
   - Show issue ID
   - Offer next steps: `/issue-debug`, `/issue-update`, or continue

**Example Detailed Report:**
```
/issue-report

Mode: Detailed

1. Description: "Workflow form submission timeout after 30 seconds"
2. Steps:
   - Open workflow creation form
   - Fill in all fields
   - Click submit
   - After ~30 seconds: timeout error
3. Environment: Chrome, Windows, dev environment
4. Context: Started after database migration last Tuesday
5. Severity: 🟡 High
6. Who's affected: All users trying to create workflows
7. Blocking: Yes - can't create new workflows
8. Error: "Network timeout after 30s" in console

✅ Issue 20251108-004 created with full context!
Next: /issue-debug 20251108-004 (start investigation)
```

---

## Issue ID Generation

**Format:** `YYYYMMDD-NNN`
- **YYYYMMDD:** Current date (e.g., 20251108)
- **NNN:** Sequential number for that day (001, 002, 003...)

**Collision Handling:**
- Checks existing issues before assignment
- Automatically increments if day already has issues
- User can override if needed

---

## Issue Record Template

Both modes create an `issue.md` file with:

```markdown
# Issue: [YYYYMMDD-NNN]

**Created:** [Date] [Time]
**Status:** Open
**Severity:** [Critical/High/Medium/Low]

## Description

[Issue description here]

## Impact

- **Who:** [all users / some users / dev only]
- **Blocking:** [Yes / No]
- **Workaround:** [If available]

[Quick mode includes minimal details]
[Detailed mode includes reproduction steps, environment, context]

## Notes

[Additional details, links, related issues]
```

---

## After Creating an Issue

### Option 1: Start Debugging Now
```
/issue-debug 20251108-NNN
```
Launches the full 7-phase debugging workflow

### Option 2: Update With More Info Later
```
/issue-update
```
Modify the issue record with new findings

### Option 3: Continue Working
Leave the issue for later investigation during another session

### Option 4: Close When Resolved
```
/issue-close
```
Archive the issue to `dev/completed/issues/`

---

## Issue Status Lifecycle

```
Open
  ↓
  → /issue-debug (Investigating)
  ↓
Fixed (if quick fix applied)
  ↓
  → /issue-close (Resolved)

OR

Open
  ↓
  → /issue-update (add notes)
  ↓
Blocked (waiting for info)
  ↓
  → Continue monitoring
  ↓
  → /issue-debug when ready
```

---

## Tips for Effective Reports

**For Quick Mode:**
- Be concise but clear
- Severity is key - helps prioritization
- Don't feel pressure to provide all details

**For Detailed Mode:**
- Exact reproduction steps are gold
- Include error messages/logs if available
- Context about when it started helps
- Related features or system changes matter

**General:**
- Use the report that matches your current state
- You can always add more info with `/issue-update`
- `/issue-debug` is available anytime for deeper investigation
- The goal is to capture, not to solve immediately

---

## Examples

### Quick Report Example

```
/issue-report "Search function returns no results for valid queries"

Mode: Quick

Severity: High
Who's affected: all users
Blocking: yes

✅ Issue 20251108-005 created!

Status: Open
Severity: 🟡 High
Impact: All users, blocking work

[Later] /issue-debug 20251108-005 to investigate
```

### Detailed Report Example

```
/issue-report

Mode: Detailed

Description: "API returns 500 error when uploading files larger than 10MB"

Steps to reproduce:
1. Go to upload page
2. Select file larger than 10MB
3. Click upload
4. Wait ~2 seconds
5. Error: "Internal Server Error (500)"

Environment:
- Frontend: Chrome 120 on Windows
- Backend: Node.js, AWS S3
- Noticed after: Upgraded AWS SDK yesterday

Severity: 🟡 High
Who's affected: Users needing to upload large files
Blocking: Yes - file uploads completely broken for large files
Workaround: None currently

Error message: "EntityTooLarge: Your proposed upload exceeds the maximum allowed size" in server logs

Related: AWS SDK update commit from yesterday

✅ Issue 20251108-006 created with full context!

Next steps:
- /issue-debug 20251108-006 (investigate AWS SDK changes)
- Or continue working and debug later
```

---

## Getting Started

**Ready to report an issue?**

If you provided a description in the command, I'll:
1. Confirm the issue description
2. Ask which mode you prefer (Quick or Detailed)
3. Guide you through the appropriate workflow
4. Create the issue record
5. Show you next steps

**If you didn't provide a description:**

Please choose:
- **Quick** - Fast capture, minimal details (best during active work)
- **Detailed** - Complete information (best for thorough documentation)

Or describe your issue and I'll help you decide which mode works best!
