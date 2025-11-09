---
name: issue-list
description: View all tracked issues with filtering and sorting options
argument-hint: [optional: status/severity filter, e.g., "high" or "critical open"]
---

# 📊 Issue List

**Filter:** {prompt}

---

## Overview

View all tracked issues in a searchable, sortable format. Perfect for:
- Getting overview of active issues
- Finding issues to work on
- Checking project health
- Locating similar issues
- Understanding issue backlog

All issues in `dev/active/issues/` are displayed with filtering and sorting.

---

## Default View

If you run `/issue-list` with no arguments, you'll see all active issues:

```
📊 Active Issues (15 total)

ID           | Created    | Updated    | Status       | Severity | Description
─────────────┼────────────┼────────────┼──────────────┼──────────┼──────────────────────
20251108-001 | 2025-11-08 | 2025-11-08 | Open         | 🟡 High  | Login broken mobile
20251108-002 | 2025-11-08 | 2025-11-08 | Investigating| 🔴 Crit  | Database timeout
20251108-003 | 2025-11-08 | 2025-11-08 | Open         | 🟢 Med   | Form validation
20251107-015 | 2025-11-07 | 2025-11-07 | Blocked      | 🟡 High  | API rate limits
20251107-014 | 2025-11-07 | 2025-11-07 | Fixed        | 🔴 Crit  | Search timeout
...

Options:
- View specific issue details
- Filter by status or severity
- Sort differently
```

---

## Filtering Options

### Filter by Status

```
/issue-list open
→ Shows all issues with Status: Open

/issue-list investigating
→ Shows all issues being investigated

/issue-list fixed
→ Shows issues with fixes implemented

/issue-list blocked
→ Shows issues waiting for something

/issue-list resolved
→ Shows resolved issues (ready to close)
```

### Filter by Severity

```
/issue-list critical
→ Shows all 🔴 Critical severity issues

/issue-list high
→ Shows 🟡 High severity issues

/issue-list medium
→ Shows 🟢 Medium severity issues

/issue-list low
→ Shows ⚪ Low severity issues
```

### Combine Filters

```
/issue-list critical open
→ Shows all Critical severity issues that are Open

/issue-list high investigating
→ Shows High severity issues currently being investigated

/issue-list medium blocked
→ Shows Medium issues waiting for something
```

### Other Filters

```
/issue-list today
→ Shows issues created today

/issue-list blocking
→ Shows only blocking issues (issues where users can't work)

/issue-list unblocking
→ Shows issues with workarounds available

/issue-list search [keyword]
/issue-list search "login"
→ Shows issues matching keyword in description
```

---

## Sorting Options

Default sort is by **Created (newest first)**.

Available sorts:
- `by:created` - Newest first (default)
- `by:severity` - Critical to Low
- `by:status` - Open → Investigating → Fixed → Resolved → Blocked
- `by:updated` - Recently updated first
- `by:id` - Chronological by issue ID

```
/issue-list open by:severity
→ All open issues, critical first

/issue-list by:updated
→ All issues, most recently updated first

/issue-list critical by:updated
→ Critical issues, most recently updated first
```

---

## View Detailed Issue

From the list, you can view full details of any issue:

```
/issue-list
→ [See table above]
→ Select issue ID to view full details

/issue-list -d 20251108-001
→ Shows full details immediately

Full details include:
- Complete description
- Reproduction steps (if available)
- Environment info (if available)
- Current status and severity
- Impact assessment
- Investigation notes (if any)
- Workarounds (if any)
- Related issues
- Timeline of updates
```

---

## Status Summary

After the issue table, a summary shows:

```
📈 Status Summary

Open:          5 issues
Investigating: 2 issues
Fixed:         1 issue
Blocked:       1 issue
Resolved:      0 issues (ready to close)

🔴 Critical:   2 issues (20251108-002, 20251108-015)
🟡 High:       4 issues
🟢 Medium:     2 issues
⚪ Low:        1 issue

⚠️  Blocking Issues:
    20251108-001 (High, Open, Login broken mobile)
    20251108-002 (Critical, Investigating, Database timeout)
```

---

## Quick Actions

From any list view, you can:

```
View issue details:
  20251108-001

Update an issue:
  /issue-update 20251108-001

Debug an issue:
  /issue-debug 20251108-001

Close an issue:
  /issue-close 20251108-001

Create new issue:
  /issue-report
```

---

## List Examples

### Example 1: All Critical Issues

```
/issue-list critical

📊 Critical Issues (2 total)

ID           | Created    | Status       | Description
─────────────┼────────────┼──────────────┼───────────────────────
20251108-002 | 2025-11-08 | Investigating| Database timeout error
20251107-015 | 2025-11-07 | Blocked      | Authentication failure

📈 Status Summary
Investigating: 1
Blocked:       1
```

### Example 2: Open High Severity Issues

```
/issue-list high open

📊 Open & High Severity (4 total)

ID           | Created    | Updated    | Description
─────────────┼────────────┼────────────┼─────────────────────────
20251108-001 | 2025-11-08 | 2025-11-08 | Login broken on mobile
20251108-003 | 2025-11-08 | 2025-11-08 | Workflow export error
20251108-004 | 2025-11-08 | 2025-11-08 | Report generation timeout
20251107-012 | 2025-11-07 | 2025-11-07 | Cache invalidation bug

Quick next steps:
→ /issue-debug 20251108-001 (start investigating)
→ /issue-update 20251108-002 (add more details)
```

### Example 3: Recently Updated Issues

```
/issue-list by:updated

📊 Most Recently Updated (15 total)

ID           | Created    | Updated    | Status       | Severity | Description
─────────────┼────────────┼────────────┼──────────────┼──────────┼───────────────────
20251108-005 | 2025-11-08 | 13:45      | Open         | 🟢 Med   | Upload validation
20251108-002 | 2025-11-08 | 13:42      | Investigating| 🔴 Crit  | Database timeout
20251108-001 | 2025-11-08 | 13:30      | Open         | 🟡 High  | Login broken mobile
...

(Shows issues you or team recently updated)
```

### Example 4: Issues with Workarounds

```
/issue-list unblocking

📊 Issues with Workarounds (5 total)

ID           | Created    | Status | Workaround
─────────────┼────────────┼────────┼──────────────────────────
20251108-003 | 2025-11-08 | Open   | Use old form for now
20251107-015 | 2025-11-07 | Fixed  | Restart app to clear cache
20251107-012 | 2025-11-07 | Open   | Use Firefox instead
...

These issues have workarounds available for users/team
```

### Example 5: Blocking the Team

```
/issue-list blocking

📊 Blocking Issues (2 total)

ID           | Created    | Status | Severity | Description
─────────────┼────────────┼────────┼──────────┼──────────────────────
20251108-001 | 2025-11-08 | Open   | 🟡 High  | Login broken on mobile
20251108-002 | 2025-11-08 | Invest | 🔴 Crit  | Database timeout

⚠️  URGENT - These are blocking work!
Suggest:
→ /issue-debug 20251108-002 (critical - investigate first)
→ /issue-debug 20251108-001 (high - investigate second)
```

---

## View Full Issue Details

From any list, you can expand to see full details:

```
/issue-list -d 20251108-001

═══════════════════════════════════════════════════════════════
Issue 20251108-001
═══════════════════════════════════════════════════════════════

Created: 2025-11-08 14:30
Updated: 2025-11-08 15:45
Status: Open
Severity: 🟡 High
Blocking: Yes

DESCRIPTION:
Login button not working on mobile devices

IMPACT:
- Who: All mobile users
- Blocking: Yes (users can't log in on phones)
- Workaround: Use desktop to log in

INVESTIGATION NOTES:
2025-11-08 15:45:
- Checked mobile logs
- Error only occurs in Safari on iOS
- Chrome on Android works fine
- Likely related to recent auth refactor (PR #456)

RELATED ISSUES:
#20251105-003 (similar auth issues)
#20251108-002 (database affecting auth)

NEXT STEPS:
→ /issue-debug 20251108-001 (investigate PR #456)
→ /issue-update 20251108-001 (add more details)
```

---

## Tips for Using `/issue-list`

**Regular Checks:**
- Run `/issue-list blocking` daily to see what's blocking team
- Run `/issue-list high open` to prioritize next work
- Run `/issue-list by:updated` to see team activity

**During Planning:**
- Check `/issue-list open` to understand backlog
- See `/issue-list critical` to identify urgent issues
- Review `/issue-list investigating` to see what's in progress

**When Starting New Work:**
- `/issue-list by:severity` to pick highest impact
- `/issue-list blocking` if you want to unblock team
- `/issue-list high by:updated` to find recent problems

**For Team Sync:**
- Share output of `/issue-list` to show overall status
- Use status summary to show health metrics
- Highlight blocking issues that need attention

---

## Completed Issues

To see **completed/resolved** issues:

```
/issue-list completed
→ Shows issues in dev/completed/issues/

/issue-list resolved
→ Shows issues with Status: Resolved (before archiving)

/issue-list by:completed-date
→ Shows completed issues, most recent first
```

These are archived issues for reference.

---

## Export Options

```
/issue-list --json
→ Get issue list as JSON for processing

/issue-list --csv
→ Get issue list as CSV for spreadsheet

/issue-list --markdown
→ Get issue list formatted as markdown table
```

---

## Getting Started

**Ready to see your issues?**

Try:
- `/issue-list` - See all active issues
- `/issue-list critical` - See critical issues
- `/issue-list blocking` - See what's blocking the team
- `/issue-list high open by:severity` - Prioritized open issues
- `/issue-list search "auth"` - Find auth-related issues

From there, you can:
- View details of any issue
- Update issues with `/issue-update`
- Debug issues with `/issue-debug`
- Close resolved issues with `/issue-close`
