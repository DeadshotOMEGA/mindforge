# Issue Handling System Documentation

Welcome to the Issue Handling System! This documentation covers the complete issue lifecycle management in this project.

---

## 📚 Documentation Files

### Quick Start (Start Here!)
- **[ISSUE_HANDLING_QUICK_REFERENCE.md](ISSUE_HANDLING_QUICK_REFERENCE.md)** (6.5KB)
  - One-page cheat sheet
  - Command overview table
  - Common commands and filters
  - Decision tree
  - Perfect for printing or bookmarking
  - **Best for:** Quick lookups while working

### Complete Workflow Guide
- **[ISSUE_HANDLING_WORKFLOW.md](ISSUE_HANDLING_WORKFLOW.md)** (17KB)
  - Comprehensive workflow documentation
  - 5 detailed workflow examples
  - When to use each command
  - Daily workflow examples
  - Anti-patterns to avoid
  - Tips and best practices
  - **Best for:** Learning the system thoroughly

---

## 🚀 Getting Started (5 Minutes)

1. **Read the Quick Reference:** [ISSUE_HANDLING_QUICK_REFERENCE.md](ISSUE_HANDLING_QUICK_REFERENCE.md)
2. **Understand the decision tree** - Which command should I use?
3. **Try your first command:** `/issue-list` to see existing issues
4. **Reference the workflow guide** when you need more details

---

## 5 Commands - Complete System

### 1. **`/issue-report`** - Record Issues
- **Purpose:** Create a new issue (quick or detailed)
- **Time:** 30 seconds to 3 minutes
- **Best for:** Capturing problems you find
- **Modes:**
  - Quick (30s) - Fast capture during work
  - Detailed (2-3m) - Comprehensive documentation

### 2. **`/issue-list`** - Find & Review Issues
- **Purpose:** View, filter, and sort issues
- **Time:** Less than 1 minute
- **Best for:** Planning work and staying organized
- **Features:**
  - Filter by status, severity, keywords
  - Sort by date, severity, status
  - View full details
  - Search across all issues

### 3. **`/issue-update`** - Track Progress
- **Purpose:** Add information to existing issues
- **Time:** Less than 2 minutes
- **Best for:** Documenting progress between sessions
- **Features:**
  - Update status
  - Add investigation notes
  - Change severity
  - Document workarounds
  - Link related issues

### 4. **`/issue-debug`** - Investigate & Fix
- **Purpose:** Systematic investigation and fix
- **Time:** 1-4 hours
- **Best for:** Actually solving issues
- **Features:**
  - 7-phase debugging workflow
  - Agent selection by issue type
  - Fix plan creation
  - Implementation and validation

### 5. **`/issue-close`** - Archive Issues
- **Purpose:** Archive resolved issues
- **Time:** Less than 2 minutes
- **Best for:** Completing issues and keeping active list focused
- **Features:**
  - Move to completed archive
  - Add closure notes
  - Preserve for future reference

---

## 📊 Command Comparison

| Command | Purpose | Time | Status |
|---------|---------|------|--------|
| `/issue-report` | Create | 30s-3m | Ready |
| `/issue-list` | Find | <1m | Ready |
| `/issue-update` | Update | <2m | Ready |
| `/issue-debug` | Fix | 1-4h | Ready |
| `/issue-close` | Archive | <2m | Ready |

---

## 🔄 Issue Lifecycle

```
DISCOVERY
  ↓
Found a problem
  ↓
RECORDING
  /issue-report → Creates issue with status: Open
  ↓
PLANNING
  /issue-list → Find what to work on
  ↓
PROGRESS
  /issue-update → Track progress, change status
  ↓
INVESTIGATION
  /issue-debug → 7-phase systematic investigation
  ↓
IMPLEMENTATION
  Implement the fix
  ↓
VALIDATION
  Test and verify
  ↓
CLOSURE
  /issue-close → Archive when done
  ↓
ARCHIVED
  Preserved in dev/completed/issues/ for reference
```

---

## 🎯 Common Workflows

### Quick Issue During Work
```
1. /issue-report "Bug found"
   → Quick mode (30 seconds)
2. Continue working
3. Later: /issue-debug to fix
```

### Complete Issue in One Session
```
1. /issue-report "Full description"
   → Detailed mode (2-3 min)
2. /issue-debug
   → 7-phase investigation (1-4 hours)
3. /issue-close
   → Archive when done (2 min)
```

### Iterative Debugging
```
Day 1:
  /issue-report → Create
  /issue-debug → Start investigation
  /issue-update → Add notes, pause

Day 2:
  /issue-list → Find issue
  /issue-update → Review notes, continue
  /issue-debug → Deep investigation

Day 3:
  /issue-update → Mark as Fixed
  /issue-close → Archive
```

---

## 📂 Where Issues Are Stored

```
dev/
├── active/issues/
│   ├── 20251108-001/
│   │   ├── issue.md          (Issue description & status)
│   │   ├── investigation.md  (Investigation findings)
│   │   ├── fix-plan.md      (Proposed solution)
│   │   └── resolution.md    (Final solution & learnings)
│   └── 20251108-NNN/
│       └── ...
│
└── completed/issues/
    ├── 20251105-001/        (Archived issues)
    └── ...
```

---

## 🔍 Decision Tree - Which Command?

```
Found a problem?
  │
  ├─ Is it already recorded?
  │  ├─ YES → /issue-update (add info)
  │  └─ NO → /issue-report (create)
  │
  ├─ Need to find what to work on?
  │  └─ /issue-list [filter]
  │
  ├─ Making progress on investigation?
  │  └─ /issue-update (preserve progress)
  │
  ├─ Time to investigate deeply?
  │  └─ /issue-debug (7-phase workflow)
  │
  └─ Issue fixed and validated?
     └─ /issue-close (archive)
```

---

## 💡 Tips & Best Practices

### ✅ Do:
- Check `/issue-list search` before creating issue (prevent duplicates)
- Update issue status as you make progress
- Add clear, specific investigation notes
- Test thoroughly before closing
- Learn from past issues in completed archive

### ❌ Don't:
- Create duplicate issues without checking
- Close issues without testing
- Overload one issue with multiple problems
- Skip the `/issue-list` step when planning
- Let updates replace full `/issue-debug` investigation

---

## 📞 Getting Help

**Quick lookup?**
→ See [ISSUE_HANDLING_QUICK_REFERENCE.md](ISSUE_HANDLING_QUICK_REFERENCE.md)

**Want to learn deeply?**
→ Read [ISSUE_HANDLING_WORKFLOW.md](ISSUE_HANDLING_WORKFLOW.md)

**Need command details?**
→ Run any `/issue-*` command to see full help

**Want to see examples?**
→ See "Workflow Snippets" in the Quick Reference

---

## 🎓 Learning Path

### Level 1: Beginner (15 minutes)
1. Read Quick Reference
2. Try `/issue-list` to see existing issues
3. Try `/issue-report "test"` to create test issue
4. Move on to Level 2

### Level 2: User (30 minutes)
1. Read Workflow Guide introduction
2. Try all 5 commands
3. Understand the complete lifecycle
4. Move on to Level 3

### Level 3: Power User (1-2 hours)
1. Read complete Workflow Guide
2. Master filtering and searching
3. Understand anti-patterns section
4. You're ready!

---

## 🔄 Issue Status Values

```
ACTIVE STATUSES:
  Open         → Newly reported, not yet investigated
  Investigating → Currently being debugged
  Blocked      → Waiting for external input

TERMINAL STATUSES:
  Fixed        → Fix implemented and committed
  Resolved     → Fix validated and working
  Closed       → Archived to dev/completed/issues/
```

---

## 🎯 Severity Levels

```
🔴 Critical  → Application broken, data loss, security
🟡 High      → Major feature broken, many users affected
🟢 Medium    → Minor feature issue, workaround exists
⚪ Low       → Polish, edge cases, nice-to-have
```

---

## 📊 System Statistics

- **Commands:** 5 (all production ready)
- **Quick Reference:** 1 page
- **Workflow Guide:** 800+ lines
- **Documented Workflows:** 5 detailed examples
- **Anti-patterns:** 5 documented
- **File Storage:** Markdown in dev/active/issues/ and dev/completed/issues/
- **Issue ID Format:** YYYYMMDD-NNN (e.g., 20251108-001)

---

## 🚀 What's Next?

### To Start Using:
1. Read Quick Reference (5 min)
2. Run `/issue-list` (see existing)
3. Pick a workflow that fits your situation
4. Start with `/issue-report` if unsure

### To Get Deeper:
1. Read complete Workflow Guide
2. Study workflow examples
3. Review anti-patterns section
4. Practice with small issues first

### To Master:
1. Use all 5 commands regularly
2. Learn the patterns
3. Help others learn the system
4. Provide feedback on improvements

---

## 📝 FAQ

**Q: Can I have multiple issues at once?**
A: Yes! Use `/issue-list` to manage multiple issues. Update status to mark which ones you're actively working on.

**Q: What if I create duplicate issues?**
A: Always use `/issue-list search` before creating. If duplicates exist, you can document the duplicate in the issue notes.

**Q: How often should I update issues?**
A: Update whenever you make progress. This helps preserve your work across sessions.

**Q: Can I change severity after creating?**
A: Yes! Use `/issue-update` to change severity if understanding changes.

**Q: What goes in each phase of `/issue-debug`?**
A: See the complete Workflow Guide for details on all 7 phases.

---

## 🎉 Ready to Get Started?

Start here:
1. **[Quick Reference](ISSUE_HANDLING_QUICK_REFERENCE.md)** - 5 minute overview
2. **[Workflow Guide](ISSUE_HANDLING_WORKFLOW.md)** - Complete details
3. **Commands:** Type `/issue-list` to see system in action

**Happy issue handling!** 🚀
