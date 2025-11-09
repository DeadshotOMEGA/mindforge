# Issue Handling Workflow Guide

**Last Updated:** 2025-11-08

---

## Quick Start

Use this guide to understand when to use each issue command.

**5 Commands, Complete Issue Lifecycle:**
1. **`/issue-report`** - Record an issue (quick or detailed)
2. **`/issue-list`** - View issues and find what to work on
3. **`/issue-update`** - Add information to an issue
4. **`/issue-debug`** - Systematically investigate and fix
5. **`/issue-close`** - Archive resolved issues

---

## Decision Tree

**I found a problem!**

```
↓
Is there time to investigate now?
│
├→ NO (working on something, quick capture)
│  └→ /issue-report (quick mode, 30 seconds)
│     └→ Continue your work
│        └→ Later: /issue-debug or /issue-update
│
└→ YES (have time to dig in)
   └→ /issue-report (detailed mode, 2-3 min)
      └→ /issue-debug (7-phase investigation & fix)
         └→ Implement fix
            └→ /issue-update (mark fixed, add notes)
               └→ /issue-close (archive when ready)
```

---

## Detailed Workflows

### Workflow 1: Quick Issue Capture (During Active Work)

**Scenario:** You're working on feature X, discover a bug, but need to keep working.

**Steps:**
```
1. /issue-report "Bug description"
   → Quick mode
   → Severity: High
   → Who's affected: all users
   → Takes 30 seconds

2. Issue 20251108-001 created!
   → Continue working on feature X

3. Later (tomorrow or next session):
   → /issue-list high open
   → Find 20251108-001
   → /issue-debug 20251108-001 (when ready to investigate)
```

**Commands Used:** `/issue-report` → later: `/issue-debug`, `/issue-close`

**Time Investment:** 30 seconds now, hours later to fix

---

### Workflow 2: Immediate Investigation & Fix

**Scenario:** Found a critical issue, need to fix it right now.

**Steps:**
```
1. /issue-report "Detailed description"
   → Detailed mode
   → Provide full context
   → Takes 2-3 minutes

2. Issue 20251108-002 created with full context

3. /issue-debug 20251108-002
   → Phase 1: Capture details
   → Phase 2: Classify issue
   → Phase 3: Investigate (agents if needed)
   → Phase 4: Create fix plan
   → Phase 5: Implement fix
   → Phase 6: Validate
   → Phase 7: Document

4. /issue-close 20251108-002
   → Archive completed issue
```

**Commands Used:** `/issue-report` → `/issue-debug` → `/issue-close`

**Time Investment:** Complete issue lifecycle in single session

---

### Workflow 3: Iterative Investigation (Stopping & Resuming)

**Scenario:** Working on issue, make progress, need to switch context.

**Steps:**
```
1. /issue-report "Found authentication timeout"
   → Create issue 20251108-003

2. /issue-debug 20251108-003
   → Work through investigation phases
   → Make progress, but need to switch tasks

3. /issue-update 20251108-003
   → Update status to "Investigating"
   → Add notes about what you found
   → Document next steps

4. [Switch to different task]
   → Session ends
   → Documentation preserved

5. [Later, back to this issue]
   → /issue-list investigating
   → Find 20251108-003
   → /issue-update 20251108-003
   → Review notes, continue investigating
   → Or /issue-debug 20251108-003 for full workflow

6. When fixed:
   → /issue-update 20251108-003 (mark as Fixed)
   → /issue-close 20251108-003 (archive)
```

**Commands Used:** `/issue-report` → `/issue-debug` → `/issue-update` (multiple times) → `/issue-close`

**Key:** Using `/issue-update` to preserve progress between sessions

---

### Workflow 4: Issue Triage & Planning

**Scenario:** Morning standup - review what needs work.

**Steps:**
```
1. /issue-list blocking
   → See what's blocking team
   → Prioritize first

2. /issue-list critical
   → See most severe issues
   → Second priority

3. /issue-list open by:severity
   → All issues sorted by severity
   → Plan sprint from this

4. For each issue:
   → /issue-list -d 20251108-NNN (view details)
   → Plan who will work on it
   → Assign priority

5. Create feature branch:
   → Work on top priority
   → Use /issue-debug when ready to fix
```

**Commands Used:** `/issue-list` (multiple times with different filters)

**Output:** Prioritized list of work

---

### Workflow 5: Recording & Reviewing Past Issues

**Scenario:** Need to understand what issues you've solved before.

**Steps:**
```
1. /issue-list completed
   → See all resolved issues
   → Good reference for patterns

2. /issue-list search "auth"
   → Find all auth-related issues (active + completed)
   → Understand history

3. /issue-list -d 20251105-001
   → Review completed issue
   → See how it was solved
   → Learn from past solutions

4. Use patterns to solve current issues faster:
   → "We solved this before in issue X"
   → Review fix from issue X
   → Apply similar approach
```

**Commands Used:** `/issue-list` with various filters and searches

**Benefit:** Learn from history, prevent solving same issue twice

---

## When to Use Each Command

### `/issue-report` - Create New Issues

**Use when:**
- ✅ You discovered a new problem
- ✅ Someone reported an issue
- ✅ Feature request received
- ✅ Improvement idea

**Don't use if:**
- ❌ Issue already exists (check with `/issue-list` first)
- ❌ You're adding info to existing issue (use `/issue-update`)
- ❌ You're fixing issue (use `/issue-debug`)

**Modes:**
- **Quick Mode (30 sec):** During active work, minimal interruption
- **Detailed Mode (2-3 min):** When you have time, want full context

**Next Step:** Usually `/issue-list` to find issues, or later `/issue-debug` to fix

---

### `/issue-list` - Find & View Issues

**Use when:**
- ✅ Starting work session (what to work on?)
- ✅ Looking for similar issues (prevent duplicates)
- ✅ Need overview (what's blocking?)
- ✅ Morning standup (prioritize work)
- ✅ Searching for past solutions

**Variations:**
```
/issue-list               → All active issues
/issue-list blocking      → What's blocking team
/issue-list critical      → Most severe
/issue-list high open     → Prioritize this
/issue-list by:severity   → Sorted by impact
/issue-list search "keyword" → Find similar
```

**Don't use if:**
- ❌ You just want to update one specific issue (use `/issue-update`)
- ❌ You're fixing an issue (use `/issue-debug`)

**Next Step:** Then either `/issue-update`, `/issue-debug`, or `/issue-close`

---

### `/issue-update` - Add Information

**Use when:**
- ✅ Adding investigation notes without full debugging
- ✅ Changing status as you make progress
- ✅ Adding workaround for users
- ✅ Changing severity based on new info
- ✅ Linking to related issues
- ✅ Quick status updates between sessions

**Common updates:**
- Add notes: "Checked logs, found X"
- Change status: Open → Investigating
- Change severity: Low → High (or vice versa)
- Add workaround: "Use old interface meanwhile"
- Link issue: "Same as #20251105-001"

**Don't use if:**
- ❌ You're doing full investigation/fix (use `/issue-debug`)
- ❌ You're creating new issue (use `/issue-report`)
- ❌ You're archiving issue (use `/issue-close`)

**Next Step:** More updates, or `/issue-debug` to investigate fully, or `/issue-close` to archive

---

### `/issue-debug` - Investigate & Fix

**Use when:**
- ✅ Time to investigate issue deeply
- ✅ Ready to implement a fix
- ✅ Need systematic 7-phase approach
- ✅ Want to spawn specialized debugging agents
- ✅ Complex issue needs full attention

**What it does:**
1. Gathers all info about issue
2. Classifies issue type
3. Investigates with agents if needed
4. Creates fix plan for approval
5. Implements fix
6. Validates solution
7. Documents everything

**Don't use if:**
- ❌ Just want quick status update (use `/issue-update`)
- ❌ Creating issue (use `/issue-report`)
- ❌ Archiving completed issue (use `/issue-close`)
- ❌ Just searching issues (use `/issue-list`)

**Prerequisites:**
- Issue already created (via `/issue-report`)
- Have time for systematic investigation
- Ready to make code changes

**Next Step:** Usually `/issue-close` when fix is validated

---

### `/issue-close` - Archive Resolved Issues

**Use when:**
- ✅ Fix is fully implemented
- ✅ Solution is tested and validated
- ✅ No regressions found
- ✅ Documentation updated
- ✅ Ready to archive

**What it does:**
1. Moves issue from `dev/active/issues/` to `dev/completed/issues/`
2. Marks as "Closed"
3. Adds closure timestamp and notes
4. Preserves for future reference

**Don't close if:**
- ❌ Still investigating (use `/issue-update` to mark Investigating)
- ❌ Fix not yet implemented (use `/issue-debug`)
- ❌ Waiting for validation (leave as Fixed, close later)
- ❌ Related issues still open (close them first)

**Prerequisites:**
- Issue must be in Fixed or Resolved status
- Fix validated and working
- No follow-up actions needed

**Next Step:** Done! Issue archived. Look for next issue to work on with `/issue-list`

---

## Command Comparison

| Aspect | `/issue-report` | `/issue-list` | `/issue-update` | `/issue-debug` | `/issue-close` |
|--------|---|---|---|---|---|
| **Purpose** | Create issue | Find issues | Add info | Investigate | Archive |
| **Time** | 30s-3m | <1m | <2m | 1-4h | <2m |
| **Creates files?** | Yes | No | Modifies | Modifies | Moves |
| **Output** | Issue created | List display | Updated issue | Fixed issue | Archived issue |
| **Best for** | Recording | Planning | Progress | Solving | Completion |
| **Interrupts work?** | Briefly | No | Briefly | Significantly | Briefly |

---

## Daily Workflow Examples

### Developer Session: 4-Hour Sprint

```
08:00 START
  → /issue-list blocking (see what's urgent)
  → /issue-list high open (prioritize)

08:10 WORK ON ISSUE #1
  → /issue-debug 20251108-001 (pick high priority)
  → Phase 1-7: Investigate and fix
  → Takes 2-3 hours

11:00 NEAR COMPLETION
  → /issue-update 20251108-001 (mark as Fixed)
  → /issue-close 20251108-001 (archive when validated)

11:15 NEXT ISSUE
  → /issue-list blocking open (any remaining?)
  → /issue-debug 20251108-003 (next priority)
  → Continue...

12:00 END
  → /issue-list open (what's left?)
  → Update planning docs
```

---

### Standup Review: 15 Minutes

```
MORNING STANDUP

Reviewer: "What's our issue status?"

→ /issue-list
  (See all active issues, counts by status/severity)

→ /issue-list critical
  (Any critical issues?)

→ /issue-list blocking
  (What's blocking the team?)

→ /issue-list by:updated
  (Recent activity - who's working on what?)

Output: Team knows:
  - Status overview
  - Priorities
  - Blockers
  - Recent progress

Decisions: Allocate people to top priorities
```

---

### Quick Bug Fix: 30 Minutes

```
14:00 DISCOVER BUG
  → /issue-report "Form submit button broken"
  → Quick mode, 30 seconds
  → Issue 20251108-004 created
  → Continue current work

14:30 DEDICATED TIME
  → /issue-list high open (see what needs attention)
  → Find 20251108-004
  → /issue-debug 20251108-004 (start investigation)
  → Spend 30 min investigating/fixing

15:00 WRAP UP
  → /issue-update 20251108-004 (mark as Fixed)
  → /issue-close 20251108-004 (archive)
  → Commit changes

15:05 NEXT ISSUE
  → Ready for next task
```

---

## Anti-Patterns to Avoid

### ❌ Don't: Create Issue Without Status Check

```
WRONG:
  /issue-report "Login broken"
  [hours later]
  /issue-report "Login broken"  ← Creates duplicate!

RIGHT:
  /issue-list search "login" (check if exists)
  → If exists: /issue-update (add info)
  → If not: /issue-report (create new)
```

### ❌ Don't: Overload Issue with Multiple Separate Problems

```
WRONG:
  /issue-report "Form broken, API slow, docs outdated"
  ← Mixed concerns, hard to fix

RIGHT:
  /issue-report "Form submit broken"
  /issue-report "API response times slow"
  /issue-report "Documentation outdated"
  ← Each issue, each cause, each fix
```

### ❌ Don't: Close Issues Before Validation

```
WRONG:
  /issue-debug (implement fix)
  /issue-close (archive immediately)
  ← No time to test!

RIGHT:
  /issue-debug (implement fix)
  /issue-update (mark as Fixed)
  [Test and validate]
  /issue-close (archive when confident)
```

### ❌ Don't: Skip `/issue-list` for Planning

```
WRONG:
  [Pick random issue to work on]
  /issue-debug 20251108-XXX
  ← Might not be highest priority

RIGHT:
  /issue-list blocking (see what's urgent)
  /issue-list critical (see severity)
  /issue-debug (work on highest impact)
```

### ❌ Don't: Let `/issue-update` Replace `/issue-debug`

```
WRONG:
  /issue-update (add notes about problem)
  /issue-update (add more notes)
  /issue-update (try fix in notes)
  ← Not systematic, no validation

RIGHT:
  /issue-update (add notes about problem)
  /issue-debug (systematic investigation)
  [Implement proper fix]
  /issue-update (mark Fixed)
  /issue-close (archive)
```

---

## Tips & Best Practices

### 🎯 Effective Issue Reporting

**Good:**
- "Login button not responding on mobile Safari"
- Clear description of what's broken
- Impact: "All mobile users can't log in"

**Bad:**
- "It's broken"
- Unclear what's wrong
- No context

### 🔍 Effective Searching & Listing

**Good:**
- `/issue-list critical` (start with severity)
- `/issue-list blocking` (see what blocks team)
- `/issue-list by:severity` (prioritized view)

**Bad:**
- Manually scanning all issues
- No clear prioritization

### 📝 Effective Updates

**Good:**
- "Checked logs: error is in UserService.getUserData()"
- "Reproduced: Only happens when database is slow"
- Specific findings that help others

**Bad:**
- "Looked at it, it's weird"
- Vague notes
- No actionable information

### 🔨 Effective Debugging

**Good:**
- Use full `/issue-debug` for complex issues
- Follow 7-phase workflow systematically
- Document findings at each step

**Bad:**
- Jump straight to code changes
- No investigation phase
- Skip validation

### ✅ Effective Closure

**Good:**
- Only close when fully validated
- Add final notes about what was fixed
- Reference PR/commit that fixed it

**Bad:**
- Close without testing
- No documentation of solution
- Leave follow-up items hanging

---

## Transition Guide: Old → New System

### Old: `/debug-issue`
### New: `/issue-debug`

**What Changed:**
- Command name: `/debug-issue` → `/issue-debug`
- Same 7-phase workflow
- All functionality preserved
- Fits new `/issue-*` namespace

**Migration:**
```
Old command: /debug-issue "error message"
New command: /issue-debug "error message"

All scripts, habits, muscle memory: Update command name
Everything else: Works exactly the same
```

**Deprecation:** `/debug-issue` no longer available (fully migrated to `/issue-debug`)

---

## Integration with `/session-start` and `/session-update`

**Using issues with sessions:**

```
/session-start --plan "Fix critical auth issue"
  → Plans work session
  → Use /issue-debug as primary command
  → Issue ID becomes session tracker

/session-update
  → Update documentation
  → Shows issue progress
  → Integrates with session tracking

/session-end
  → Archive completed work
  → Issues closed as part of session
```

---

## Getting Help

**For command-specific help:**
- `/issue-debug` - Full investigation workflow
- `/issue-report` - Quick or detailed reporting
- `/issue-update` - Update existing issues
- `/issue-list` - Find and filter issues
- `/issue-close` - Archive completed issues

**For workflow help:**
- Read this guide
- Start with `/issue-list` (see current state)
- Pick appropriate command based on situation
- Follow decision tree at top of guide

---

## Summary

**The Complete Issue Lifecycle:**

```
Discovery       Recording       Finding         Investigation    Closure

Spot problem → /issue-report → /issue-list → /issue-debug → /issue-close
                ↑                ↑                ↑
                └──── /issue-update (add info anytime) ────┘

Each command serves a purpose
Used in sequence or independently
Flexible workflow based on your context
```

**Start with:**
1. `/issue-list` - Understand current state
2. `/issue-report` - Create issues
3. `/issue-debug` - Fix issues
4. `/issue-close` - Archive solved issues

**Master the system:**
- Use `/issue-update` to preserve progress
- Use `/issue-list` to stay organized
- Follow decision tree for context
- Learn from completed issues

**Happy issue handling!** 🎉
