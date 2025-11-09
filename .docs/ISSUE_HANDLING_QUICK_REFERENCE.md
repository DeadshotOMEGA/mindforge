# Issue Command Quick Reference

**Print this or bookmark it!**

---

## 5-Command System

| Command | Purpose | Time | When |
|---------|---------|------|------|
| `/issue-report` | Create issue | 30s-3m | Found a problem |
| `/issue-list` | Find issues | <1m | Planning work |
| `/issue-update` | Add info | <2m | Making progress |
| `/issue-debug` | Investigate & fix | 1-4h | Time to debug |
| `/issue-close` | Archive | <2m | Issue solved |

---

## Decision Tree

```
Found a problem?
  ├─ Have time to debug now?
  │  ├─ YES → /issue-debug
  │  └─ NO → /issue-report (quick)
  │
  Need to know what to work on?
  │  └─ /issue-list [filter]
  │
  Making progress on issue?
  │  └─ /issue-update
  │
  Issue fixed and validated?
  │  └─ /issue-close
```

---

## Common Commands

```bash
# Start work session
/issue-list blocking           # What's urgent?
/issue-list critical           # Most severe?
/issue-list high open          # High priority open issues

# Record a problem
/issue-report "Description"    # Quick capture
/issue-report                  # Detailed guided mode

# Make progress
/issue-update 20251108-001     # Add notes, change status
/issue-update                  # Pick issue to update

# Fix it
/issue-debug 20251108-001      # Systematic investigation
/issue-debug                   # Guided mode

# Complete it
/issue-close 20251108-001      # Archive resolved issue
/issue-close                   # Select issue to close

# Review
/issue-list                    # All active issues
/issue-list -d 20251108-001    # Full details
/issue-list completed          # Past issues
```

---

## Issue Statuses

```
ACTIVE:
  Open            → Not yet investigated
  Investigating   → Currently working on it
  Blocked         → Waiting for something

TERMINAL:
  Fixed           → Fix implemented
  Resolved        → Fix validated (ready to close)
  Closed          → Archived in dev/completed/issues/
```

---

## Severity Levels

```
🔴 Critical  → Application broken, data loss, security
🟡 High      → Major feature broken, many users affected
🟢 Medium    → Minor issue, workaround exists
⚪ Low       → Polish, edge cases, nice-to-have
```

---

## Workflow Snippets

### Quick Bug Capture During Work
```
/issue-report "Bug found"
→ Quick mode
→ Issue created
→ Back to work
[Later] /issue-debug [issue-id] → fix
```

### Systematic Fix
```
/issue-report "Detailed description"
→ Detailed mode
→ Issue created
→ /issue-debug [issue-id]
→ Fix through 7 phases
→ /issue-close [issue-id]
```

### Progress Tracking Across Sessions
```
Day 1:
  /issue-report [create]
  /issue-debug [start investigation]
  /issue-update [add notes]

Day 2:
  /issue-list investigating [find it]
  /issue-debug [continue from notes]
  /issue-update [mark as Fixed]

Day 3:
  /issue-list [verify fix validated]
  /issue-close [archive]
```

---

## Filters for `/issue-list`

### By Status
```
/issue-list open
/issue-list investigating
/issue-list fixed
/issue-list blocked
```

### By Severity
```
/issue-list critical
/issue-list high
/issue-list medium
/issue-list low
```

### By Time
```
/issue-list today
/issue-list blocking
```

### By Content
```
/issue-list search "keyword"
/issue-list -d [issue-id]    # View full details
```

### Combined
```
/issue-list critical open
/issue-list high investigating
/issue-list search "auth" critical
```

---

## File Structure

```
dev/
  active/issues/
    20251108-001/
      ├── issue.md           # Issue description, status
      ├── investigation.md   # Investigation findings
      ├── fix-plan.md       # Proposed fix
      └── resolution.md     # Final solution

    20251108-002/
      └── ...

  completed/issues/
    (archived issues here)
```

---

## Tips

**Before creating issue:**
```
/issue-list search "keyword"  # Check if already exists
```

**While investigating:**
```
/issue-update [id]            # Preserve progress
/issue-update [id]            # Update status as you go
```

**After fixing:**
```
/issue-update [id]            # Mark as Fixed
[Validate thoroughly]
/issue-close [id]             # Archive when confident
```

**At standup/planning:**
```
/issue-list blocking          # See blockers
/issue-list critical          # See severity
/issue-list by:severity       # Prioritize
```

---

## Shortcuts

```
# Check project health
/issue-list

# What's urgent?
/issue-list critical blocking

# See what team worked on
/issue-list by:updated

# Find similar issues (prevent duplicate work)
/issue-list search [problem-type]

# Review past solutions
/issue-list completed
/issue-list search [topic] (searches completed too)
```

---

## Common Mistakes

❌ Create issue without checking for duplicates
  → Always: `/issue-list search [keyword]` first

❌ Close issue without testing
  → Always: Validate before `/issue-close`

❌ Leave issues with no status updates
  → Use: `/issue-update` to mark progress

❌ Jump to `/issue-debug` without creating record
  → Always: `/issue-report` to create issue first

❌ Create mega-issue with multiple problems
  → Better: One issue per problem

---

## Getting Help

```bash
# See command details
/issue-debug       # Shows full workflow
/issue-report      # Shows capture modes
/issue-update      # Shows update options
/issue-list        # Shows filter options
/issue-close       # Shows archive process

# See workflow guide
.docs/ISSUE_HANDLING_WORKFLOW.md
```

---

## Issue Lifecycle Diagram

```
                    /issue-report
                         ↓
                    [Open]
                         ↓
              /issue-update (add notes)
                         ↓
        /issue-debug → Investigating
                         ↓
                      [Fixed]
                         ↓
        /issue-update → [Resolved]
                         ↓
              /issue-close
                         ↓
                      [Closed] ✅
                    (archived)
```

---

## Cheat Sheet

Save this as quick reference:

```
Need to...          Use this command

Create issue        /issue-report
Find issues         /issue-list
Check what's due    /issue-list critical
See what's blocking /issue-list blocking
Add to issue        /issue-update
Investigate & fix   /issue-debug
Archive when done   /issue-close
Review past issues  /issue-list completed
Find similar issues /issue-list search
```

---

Happy issuing! 🚀
