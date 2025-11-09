---
description: Prepare completed work for GitHub commit and PR
argument-hint: Optional - use --dry-run to preview without archiving, or --skip-archive to generate commit assets without archiving
---

# Commit - Prepare Completed Work for GitHub

I'll help you prepare all completed development work for committing to GitHub with a professional commit message and PR description.

## Quick Overview

This command:
1. ✅ Validates that `/dev/active/` is empty (no in-progress sessions)
2. 📊 Scans `/dev/completed/` and aggregates all sessions and tasks
3. 📝 Generates professional commit message and PR description
4. 📁 Archives completed work to `/dev/archived/`
5. 🧹 Clears `/dev/completed/` for next development cycle

**Output Location:** `.claude/commit-assets/`

---

## Arguments

**Checking arguments:** $ARGUMENTS

**Options:**
- No arguments: Full workflow (generate assets + archive)
- `--dry-run`: Preview everything without making changes
- `--skip-archive`: Generate commit assets but don't archive (for review first)

---

## Phase 1: Validation & Preparation

### Step 1: Check for Active Sessions

Checking `/dev/active/` directory...

**If populated:**
```
❌ CANNOT PROCEED: Active sessions found

Active tasks in /dev/active/:
- authentication-refactor
- api-documentation

Please complete these sessions first:
1. Run /session-end on each active task
2. Move all work to /dev/completed/
3. Then run /commit again

Exit: No changes made.
```

**If empty:**
```
✅ No active sessions
Proceeding with commit preparation...
```

### Step 2: Validate Completed Work Exists

Checking `/dev/completed/` directory...

**If empty:**
```
⚠️ Nothing to commit

/dev/completed/ is empty. You need to complete sessions first:
1. Create work with /session-start
2. Complete tasks and run /session-end
3. Work will appear in /dev/completed/
4. Then run /commit

Exit: No changes made.
```

**If populated:**
```
✅ Found completed work
- Sessions: 3
- Tasks: 8
- Total files modified: 145

Proceeding with aggregation...
```

### Step 3: Ensure Output Directories Exist

Creating `.claude/commit-assets/` if needed...

```
✅ Created .claude/commit-assets/
Ready to generate commit documentation
```

---

## Phase 2: Branch Naming (NEW!)

### Step 1: Generate Branch Name Suggestions

Based on your completed work, I'll suggest several branch names in common formats:

```
Found 3 tasks:
1. authentication-refactor (HIGH impact)
2. api-documentation (MEDIUM impact)
3. frontend-setup (HIGH impact)

SUGGESTED BRANCH NAMES:

1️⃣  authentication-refactor
    Based on primary task: Authentication Refactor

2️⃣  feature/authentication-refactor
    FEATURE: Authentication Refactor

3️⃣  2025-11-08/authentication-refactor
    Date-based: 2025-11-08 - Authentication Refactor

4️⃣  feature/authentication-refactor
    Feature: Authentication Refactor

5️⃣  multi-task/authentication-api
    Multiple tasks: 3 tasks bundled

Which branch name would you like to use?
Enter number (1-5) or type a custom name:
```

### Step 2: User Selection

**If user selects option (e.g., "2"):**
```
✅ Selected: feature/authentication-refactor

This will be your branch name.
```

**If user enters custom name (e.g., "my-custom-branch"):**
```
✅ Custom branch name: my-custom-branch

Validating format... ✅ Valid
```

### Step 3: Validation

Selected branch name is validated:
- ✅ Contains only lowercase letters, numbers, hyphens, slashes
- ✅ Doesn't start/end with hyphen
- ✅ Length is reasonable (3-64 characters)
- ✅ Follows common conventions

**If validation fails:**
```
⚠️ Invalid branch name: "invalid name!"

Issues:
- Contains spaces (not allowed)
- Contains special characters (not allowed)

Please enter a valid branch name:
- Use lowercase letters, numbers, hyphens, slashes
- Format: type/description (e.g., feature/my-feature)
- Examples: auth-refactor, fix/login-bug, docs/api
```

### Step 4: Confirmation

```
📝 BRANCH CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Branch Name: feature/authentication-refactor
Tasks: 3
Files: 145
Sessions: 3

Ready to proceed?
```

---

## Phase 3: Aggregate Completed Work

### Step 1: Scan Sessions

Running commit-aggregator.js to analyze your completed work...

```
Scanning /dev/completed/sessions/...

Found sessions:
1. 2025-11-08_143022-auth-refactor
   - 3 tasks completed
   - 45 files modified
   - Duration: 2 days

2. 2025-11-08_152145-api-docs
   - 2 tasks completed
   - 24 files modified
   - Duration: 1 day

3. 2025-11-07_090530-frontend-setup
   - 4 tasks completed
   - 76 files modified
   - Duration: 3 days

Total sessions: 3
Total files modified: 145
```

### Step 2: Scan Tasks

Scanning /dev/completed/tasks/...

```
Found tasks:
1. authentication-refactor ✅
   - Tasks: 15/15 complete
   - Files: 12 modified
   - Phases: Infrastructure, Migration, Testing
   - Impact: HIGH

2. api-documentation ✅
   - Tasks: 8/8 complete
   - Files: 24 modified
   - Phases: Analysis, Documentation, Examples
   - Impact: MEDIUM

3. frontend-setup ✅
   - Tasks: 23/23 complete
   - Files: 76 modified
   - Phases: Scaffolding, Config, Components, Testing
   - Impact: HIGH

[... 5 more tasks ...]

Total tasks: 8
Total tasks completed: 98
```

### Step 3: Extract Key Information

Processing metadata...

```
✅ Extracted task summaries
✅ Calculated impact scores
✅ Identified phases and technologies
✅ Aggregated statistics

Statistics:
- Sessions completed: 3
- Tasks completed: 8
- Total files modified: 145
- Estimated lines changed: 4,200+
```

---

## Phase 4: Generate Commit Assets

### Step 1: Generate Commit Message

Creating `.claude/commit-assets/COMMIT_MESSAGE.md`...

```markdown
# Add frontend foundation and development tooling

## Description

Complete frontend setup with modern React patterns, development workflow automation,
and comprehensive documentation. Includes session management system for tracking
development progress across sessions.

### Key Changes

- **Frontend Foundation** (76 files, 23 tasks)
  - React component structure with Suspense boundaries
  - TanStack Query for data fetching
  - MUI v7 styling system
  - TanStack Router configuration

- **API Documentation** (24 files, 8 tasks)
  - Generated API documentation
  - Example code snippets
  - Integration guides

- **Session Management** (45 files, 3 tasks)
  - Development workflow commands
  - Progress tracking system
  - Archive management

## Statistics

- **Sessions completed:** 3
- **Tasks completed:** 8
- **Files modified:** 145
- **Time invested:** 6 days

## Related Sessions

- 2025-11-08_143022-auth-refactor
- 2025-11-08_152145-api-docs
- 2025-11-07_090530-frontend-setup

See `dev/archived/` for detailed documentation.
```

**File created:** ✅ `.claude/commit-assets/COMMIT_MESSAGE.md`

### Step 2: Generate PR Description

Creating `.claude/commit-assets/PR_DESCRIPTION.md`...

```markdown
# Pull Request: Add Frontend Foundation and Development Tooling

## Summary

This PR introduces a complete frontend development foundation with modern React patterns,
comprehensive development tooling, and session management system. Work completed across
3 development sessions totaling 6 days.

## What's Included

### 1. Frontend Foundation (76 files)
**Session:** 2025-11-07_090530-frontend-setup

**Changes:**
- Modern React component structure with proper lazy loading
- Suspense boundaries for loading states
- TanStack Query integration for data fetching
- TanStack Router setup with file-based routing
- MUI v7 styling system with custom themes
- TypeScript configuration and standards
- ESLint and Prettier configuration

**Files Modified:**
- `src/components/` - Reusable components
- `src/features/` - Domain-specific features
- `src/routes/` - Router configuration
- `vite.config.ts` - Build configuration
- And 71 more files

### 2. API Documentation (24 files)
**Session:** 2025-11-08_152145-api-docs

**Changes:**
- Auto-generated API documentation
- Example code snippets for all endpoints
- Integration guides for frontend integration
- Request/response schema documentation

**Files Modified:**
- `docs/api/` - API documentation
- `docs/examples/` - Code examples
- README files with API overview

### 3. Session Management System (45 files)
**Session:** 2025-11-08_143022-auth-refactor

**Changes:**
- `/session-start` command for creating development tasks
- `/session-update` command for tracking progress
- `/session-end` command for archiving completed work
- Session documentation system with three-tier archives
- Progress tracking with task checklists

**Files Modified:**
- `.claude/commands/` - New Claude Code commands
- `dev/` - Session management system
- Documentation and guides

## Statistics

| Metric | Value |
|--------|-------|
| Sessions Completed | 3 |
| Tasks Completed | 8 |
| Files Modified | 145 |
| Estimated Lines Added | 2,500+ |
| Estimated Lines Removed | 1,200 |
| Development Time | 6 days |

## Testing & QA

### Frontend Foundation
- [x] React components render correctly
- [x] Suspense boundaries work with lazy loading
- [x] TanStack Query data fetching tested
- [x] Router navigation works
- [x] Styling applies correctly

### API Documentation
- [x] All endpoints documented
- [x] Example code runs without errors
- [x] Schema validation tested

### Session Management
- [x] Commands execute successfully
- [x] Progress tracking accurate
- [x] Archive system functional

## Breaking Changes

None - This is additive work with no breaking changes.

## Related Documentation

- See `dev/completed/` for detailed session notes
- See `dev/archived/` for moved historical documentation
- See `README.md` for project overview
- See `claude-howto/` for development guides

## Deployment Notes

No backend changes or database migrations required.
This PR contains frontend changes only.

## Next Steps

1. **Code Review** - Review commit messages and changes
2. **Merge** - Merge to main branch
3. **Next Development** - Use `/session-start` for new work
4. **Archive** - Old completed work moves to archived/ (future)

## References

- Commit generated from: `/dev/completed/`
- Aggregated by: commit-aggregator.js
- Using: Claude Code session management system
```

**File created:** ✅ `.claude/commit-assets/PR_DESCRIPTION.md`

### Step 3: Generate Quick Summary

Creating `.claude/commit-assets/COMMIT_SUMMARY.txt`...

```
════════════════════════════════════════════════════════════════
COMMIT SUMMARY - Quick Reference
════════════════════════════════════════════════════════════════

COMPLETED WORK:
  Sessions: 3
  Tasks: 8
  Files Modified: 145

PRIMARY CHANGES:
  ✓ Frontend Foundation (76 files)
  ✓ API Documentation (24 files)
  ✓ Session Management (45 files)

STATISTICS:
  Lines Added: 2,500+
  Lines Removed: 1,200
  Development Time: 6 days

SESSIONS INCLUDED:
  1. 2025-11-07_090530-frontend-setup
  2. 2025-11-08_143022-auth-refactor
  3. 2025-11-08_152145-api-docs

ASSET FILES:
  - COMMIT_MESSAGE.md (for commit message)
  - PR_DESCRIPTION.md (for GitHub PR)
  - COMMIT_SUMMARY.txt (this file)

NEXT STEPS:
  1. Review generated commit assets
  2. Customize if needed
  3. Copy message to git commit
  4. Create PR with description
  5. Run /commit --finish to archive (optional)

ARCHIVE LOCATION:
  Completed work will be moved to: dev/archived/sessions/2025-11/
  Tasks will be organized by month in: dev/archived/tasks/2025-11/

════════════════════════════════════════════════════════════════
```

**File created:** ✅ `.claude/commit-assets/COMMIT_SUMMARY.txt`

### Step 4: Create Index File

Creating `.claude/commit-assets/index.md`...

```markdown
# Commit Assets

Generated by `/commit` command on 2025-11-08

## Files in This Directory

### COMMIT_MESSAGE.md
**Purpose:** Use as your git commit message

**Usage:**
```bash
git add .
git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"
```

### PR_DESCRIPTION.md
**Purpose:** Use as your GitHub PR description

**Usage:**
1. Push to GitHub: `git push -u origin feature-branch`
2. Create PR on GitHub
3. Paste content of PR_DESCRIPTION.md into PR body

### COMMIT_SUMMARY.txt
**Purpose:** Quick reference before committing

Shows key statistics and changes at a glance.

## How to Use These Assets

### Option 1: Direct to GitHub (Recommended)

1. Copy COMMIT_MESSAGE.md content
2. Stage and commit:
   ```bash
   git add .
   git commit -m "[paste content here]"
   ```
3. Push to GitHub
4. Create PR and paste PR_DESCRIPTION.md content

### Option 2: Review First

1. Read COMMIT_SUMMARY.txt for overview
2. Review COMMIT_MESSAGE.md and PR_DESCRIPTION.md
3. Edit if needed (customize for your needs)
4. Follow Option 1 steps

## What Happens Next

After committing and creating the PR:

1. **Code Review** - Team reviews changes
2. **Approval** - Get approval
3. **Merge** - Merge to main
4. **Archive** - Completed work archived to `dev/archived/`

## Cleanup

Once committed and PR is merged, you can:
- Delete these assets: `rm -rf .claude/commit-assets/`
- Or keep for reference

These files are not needed after PR is merged.

## Generated From

Sessions archived from `/dev/completed/`:
- 2025-11-07_090530-frontend-setup
- 2025-11-08_143022-auth-refactor
- 2025-11-08_152145-api-docs

See `dev/archived/` for detailed documentation.

---

**Generated:** 2025-11-08T15:30:45Z
**Command:** /commit
**Status:** Ready for GitHub
```

**File created:** ✅ `.claude/commit-assets/index.md`

### Step 5: Create Branch Configuration File

Creating `.claude/commit-assets/BRANCH_INFO.md`...

```markdown
# Branch Configuration

**Selected Branch Name:** feature/authentication-refactor

**Why This Branch Name?**
Based on primary task: Authentication Refactor

**Tasks Included:**
1. authentication-refactor (HIGH impact, 12 files)
2. api-documentation (MEDIUM impact, 24 files)
3. frontend-setup (HIGH impact, 76 files)

**How to Use:**

Create and push the branch:
\`\`\`bash
git checkout -b feature/authentication-refactor
git add .
git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"
git push -u origin feature/authentication-refactor
\`\`\`

Then create PR on GitHub with PR_DESCRIPTION.md content.

**Alternatives:** If you prefer a different branch name, you can:
1. Use any of the suggested names from earlier
2. Create a custom name and push with that instead
3. Re-run /commit to get new suggestions
```

**File created:** ✅ `.claude/commit-assets/BRANCH_INFO.md`

---

## Phase 5: Archive Preparation & Confirmation

### Step 1: Summary of Changes

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 COMMIT PREPARATION COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Validation Passed
  - No active sessions in /dev/active/
  - Completed work found in /dev/completed/

📊 Work Aggregated
  - Sessions: 3
  - Tasks: 8
  - Files modified: 145

📝 Commit Assets Generated
  - ✅ COMMIT_MESSAGE.md
  - ✅ PR_DESCRIPTION.md
  - ✅ COMMIT_SUMMARY.txt
  - ✅ index.md

📁 Location: .claude/commit-assets/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 2: What Happens Next

```
🎯 NEXT STEPS

1️⃣ REVIEW COMMIT ASSETS
   Review generated files in .claude/commit-assets/

   Commands:
   - cat .claude/commit-assets/COMMIT_SUMMARY.txt
   - cat .claude/commit-assets/COMMIT_MESSAGE.md
   - cat .claude/commit-assets/PR_DESCRIPTION.md

2️⃣ CUSTOMIZE IF NEEDED
   Edit the .md files if you want to adjust anything

3️⃣ CREATE GIT COMMIT
   git add .
   git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"

4️⃣ CREATE GITHUB PR
   Push branch and create PR with PR_DESCRIPTION.md content

5️⃣ ARCHIVE COMPLETED WORK
   Once PR is merged, run: /commit --finish
   This will move /dev/completed/ → /dev/archived/
```

### Step 3: Archive Decision

**Current settings:** $ARGUMENTS

**If --dry-run:**
```
🔄 DRY RUN MODE

No changes made to your system.
All files remain in original locations.

To proceed with actual archival:
  /commit [--skip-archive]

Options:
- /commit : Generate assets + archive
- /commit --skip-archive : Generate assets only (archive later)
```

**If --skip-archive:**
```
📝 COMMIT ASSETS GENERATED
✋ ARCHIVAL SKIPPED (as requested)

Completed work remains in /dev/completed/

When ready to archive, run:
  /commit

This will:
- Generate fresh commit assets
- Archive /dev/completed/ → /dev/archived/
- Clear /dev/completed/ for next cycle
```

**If no flags (default):**
```
🔄 READY TO ARCHIVE

Proceeding with archival workflow...

[Continue to Phase 5]
```

---

## Phase 6: Archive Completed Work (Unless Skipped)

### Step 1: Pre-Archive Validation

```
Validating pre-archive state...

✅ No active sessions
✅ Completed sessions exist
✅ Task files well-formed
✅ Metadata present
✅ Ready for archival
```

### Step 2: Execute Archive Migration

Running archive-migrator.js...

```
Starting migration: /dev/completed/ → /dev/archived/

Migrating sessions:
  ✅ 2025-11-07_090530-frontend-setup → archived/sessions/2025-11/
  ✅ 2025-11-08_143022-auth-refactor → archived/sessions/2025-11/
  ✅ 2025-11-08_152145-api-docs → archived/sessions/2025-11/

Migrating tasks:
  ✅ frontend-setup → archived/tasks/2025-11/
  ✅ authentication-refactor → archived/tasks/2025-11/
  ✅ api-documentation → archived/tasks/2025-11/
  [... 5 more tasks ...]

Creating index files:
  ✅ archived/sessions/index.md
  ✅ archived/tasks/index.md
  ✅ archived/README.md

Clearing completed directory:
  ✅ Removed /dev/completed/sessions/
  ✅ Removed /dev/completed/tasks/
  ✅ Kept /dev/completed/ directory (empty for reuse)

Total operations: 15
Files moved: 157
Errors: 0
```

### Step 3: Verify Archive Success

```
✅ ARCHIVE SUCCESSFUL

Verification:
  ✓ Sessions moved to dev/archived/sessions/2025-11/
  ✓ Tasks moved to dev/archived/tasks/2025-11/
  ✓ Index files updated
  ✓ /dev/completed/ now empty
  ✓ All metadata preserved

Archive location: dev/archived/sessions/2025-11/
Task archive location: dev/archived/tasks/2025-11/
```

---

## Phase 7: Completion & Summary

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ /commit WORKFLOW COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 COMMIT ASSETS READY
Location: .claude/commit-assets/
  - BRANCH_INFO.md (your branch name & setup)
  - COMMIT_MESSAGE.md (for git commit)
  - PR_DESCRIPTION.md (for GitHub PR)
  - COMMIT_SUMMARY.txt (quick reference)
  - index.md (usage guide)

📁 WORK ARCHIVED
From: /dev/completed/
To: /dev/archived/sessions/2025-11/
    /dev/archived/tasks/2025-11/

📊 STATISTICS
  - Sessions archived: 3
  - Tasks archived: 8
  - Files preserved: 145+
  - Storage freed: ~2MB

🔄 READY FOR NEXT CYCLE
  - /dev/completed/ is now empty
  - Ready to start new development
  - Use /session-start for new work

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 WHAT TO DO NOW:

1. Review branch configuration:
   cat .claude/commit-assets/BRANCH_INFO.md

2. Create and switch to branch:
   git checkout -b [branch-name-from-BRANCH_INFO.md]

3. Create git commit:
   git add .
   git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"

4. Push branch to GitHub:
   git push -u origin [branch-name]

5. Create GitHub PR:
   gh pr create --body "$(cat .claude/commit-assets/PR_DESCRIPTION.md)"

6. Start new work:
   /session-start "next-feature"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Error Handling

### Error: Active Sessions Found

```
❌ CANNOT PROCEED: Active sessions in /dev/active/

Active tasks:
  - task-1
  - task-2

You must complete these sessions before committing:
  /session-end (on each active task)

Then try /commit again.
```

### Error: Nothing to Commit

```
⚠️ No work to commit

/dev/completed/ is empty.

To get work here:
  1. Create work with: /session-start "feature"
  2. Complete the work
  3. Run: /session-end
  4. Work appears in /dev/completed/
  5. Then run: /commit
```

### Error: Archive Failed

```
❌ ARCHIVE ERROR

Error during migration to /dev/archived/:
[error details]

What to do:
  1. Check disk space
  2. Verify permissions on dev/ directory
  3. Try again: /commit

If problem persists:
  - /commit --skip-archive (archive later)
  - Assets are safe in .claude/commit-assets/
```

---

## Examples

### Example 1: Normal Workflow
```
/commit
→ Validates no active sessions ✅
→ Suggests branch names (you pick one) ✅
→ Aggregates completed work ✅
→ Generates commit assets ✅
→ Archives to dev/archived/ ✅
→ Ready to push to GitHub ✅

Next: git checkout -b [branch-name]
      git commit + git push
      Create PR with PR description
```

### Example 2: Review Before Archive
```
/commit --skip-archive
→ Generates commit assets ✅
→ Keeps work in /dev/completed/ for review ✅

[Review files, customize if needed]

/commit
→ Archives to dev/archived/ ✅
```

### Example 3: Dry Run Preview
```
/commit --dry-run
→ Shows what would happen
→ No changes made
→ Preview complete workflow ✅
```

---

## Tips & Best Practices

**Before running /commit:**
1. ✅ Complete all active sessions with `/session-end`
2. ✅ Verify no work in `/dev/active/`
3. ✅ Ensure `/dev/completed/` has your finished work
4. ✅ Review what will be committed: `ls dev/completed/`

**Branch naming:**
1. 🌿 /commit suggests branch names based on your work
2. 🌿 Pick from suggestions or enter a custom name
3. 🌿 Common formats: `feature/name`, `fix/name`, `refactor/name`
4. 🌿 Use lowercase letters, hyphens, slashes only
5. 🌿 Examples: `feature/auth-refactor`, `fix/login-bug`, `docs/api`

**Using generated assets:**
1. 📝 Review BRANCH_INFO.md for your branch name
2. 📝 Review COMMIT_SUMMARY.txt for quick overview
3. 📝 Customize COMMIT_MESSAGE.md if needed
4. 📝 Customize PR_DESCRIPTION.md for your team
5. 🔗 Include links to related issues/PRs
6. ✅ Copy and paste into git/GitHub

**After committing:**
1. Create branch: `git checkout -b [branch-name-from-BRANCH_INFO]`
2. Push to GitHub with `git push -u origin [branch-name]`
3. Create PR with PR_DESCRIPTION.md
4. Share for code review
5. Merge when approved
6. Start next work with `/session-start`

---

## FAQ

**Q: Can I customize the branch name?**
A: Yes! Either pick from the suggestions or type a custom name when prompted.

**Q: What branch name formats does /commit suggest?**
A: It suggests 5 common formats:
- Simple: `task-name`
- Type-prefixed: `feature/task-name`
- Date-based: `2025-11-08/task-name`
- Multi-task: `multi-task/summary`
- Feature-specific: `feature/task-name`

**Q: Can I use my own branch naming convention?**
A: Yes! Just type your custom name when prompted (must be lowercase with hyphens/slashes).

**Q: Can I customize the commit message?**
A: Yes! Edit `.claude/commit-assets/COMMIT_MESSAGE.md` after generation.

**Q: What if I want to archive later?**
A: Use `/commit --skip-archive` to generate assets (including branch name) without archiving.

**Q: Can I revert the archive?**
A: Files are in `dev/archived/`. You can copy back if needed.

**Q: Does this work with GitHub Actions?**
A: Yes! Assets are plain markdown files, easy to integrate.

**Q: What about multiple branches?**
A: Create separate branches before running `/commit`. Each branch gets its own branch name suggestion.

**Q: What if the suggested branch names don't fit my workflow?**
A: You can customize the branch naming logic in commit-aggregator.js or just enter a custom name when prompted.

---

**Related Commands:**
- `/session-start` - Begin new development task
- `/session-update` - Track progress during work
- `/session-end` - Archive completed session
- `/commit` - You are here

**Documentation:**
- `dev/README.md` - Session management system
- `.claude/commit-assets/index.md` - Using generated files
