# /commit Command - Quick Start Guide

You now have a new `/commit` command that prepares all your completed development work for GitHub!

## What Does It Do?

The `/commit` command:
1. ✅ Checks that you have no active sessions
2. 📊 Scans all completed work in `/dev/completed/`
3. 📝 Generates a professional commit message
4. 📋 Generates a comprehensive PR description
5. 📁 Archives everything to `/dev/archived/`

## Quick Example Workflow

```bash
# 1. Complete your development sessions
/session-start "my-feature"
# ... work ...
/session-end

/session-start "another-feature"
# ... work ...
/session-end

# 2. Prepare for GitHub
/commit
# → Shows branch name suggestions
# → You pick one (or type custom name)

# 3. You now have ready-to-use files
ls .claude/commit-assets/

# 4. Get your branch name
cat .claude/commit-assets/BRANCH_INFO.md

# 5. Create your git branch and commit
git checkout -b feature/my-feature
git add .
git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"

# 6. Push to GitHub
git push -u origin feature/my-feature

# 7. Create GitHub PR
gh pr create --body "$(cat .claude/commit-assets/PR_DESCRIPTION.md)"

# Done! Your completed work is archived in dev/archived/
```

## Generated Files

After running `/commit`, you'll find these files in `.claude/commit-assets/`:

### BRANCH_INFO.md (NEW!)
Your branch name and setup instructions. It includes:
- Selected branch name (e.g., `feature/authentication-refactor`)
- Why that branch name was chosen
- Tasks included in this branch
- Step-by-step git commands to use

**Use this first** to get your branch name!

### COMMIT_MESSAGE.md
Copy this into your `git commit -m` message. It includes:
- Clear title of your changes
- Description of what changed
- Statistics (sessions, tasks, files)

### PR_DESCRIPTION.md
Paste this into your GitHub PR body. It includes:
- Executive summary
- Detailed breakdown by session
- Testing information
- File statistics
- Links to documentation

### COMMIT_SUMMARY.txt
Quick reference with:
- Number of sessions/tasks
- Files modified
- Time invested
- Archive locations

### index.md
Usage guide for the generated files.

## Command Options

```bash
# Full workflow (generate + archive)
/commit

# Generate assets but keep work in /dev/completed/ for review
/commit --skip-archive

# Preview what would happen without making changes
/commit --dry-run
```

## Key Features

### Smart Branch Naming (NEW!)
- 🌿 Suggests 5 branch name options based on your completed work
- 🌿 Pick from suggestions or enter a custom name
- 🌿 Validates branch name format (lowercase, hyphens, slashes)
- 🌿 Generates BRANCH_INFO.md with your selected branch name

### Safety Checks
- ✅ Blocks if you have active sessions (use `/session-end` first)
- ✅ Validates all your completed work is properly structured
- ✅ Gives clear error messages if something's wrong

### Professional Output
- 📝 Generates GitHub-ready commit messages
- 📋 Creates comprehensive PR descriptions
- 📊 Includes statistics and impact assessment
- 🔗 References your development documentation

### Flexible Workflow
- Review generated files before committing
- Customize branch name, commit message if needed
- Skip archival and run again later
- Dry-run to see what would happen

## Branch Naming

When you run `/commit`, it will suggest branch names based on your completed work:

### Suggested Branch Name Formats

1. **Simple** - Based on primary task name
   - Example: `authentication-refactor`

2. **Type-Prefixed** - Common convention with type prefix
   - Example: `feature/authentication-refactor`
   - Other prefixes: `fix/`, `refactor/`, `docs/`, `test/`

3. **Date-Based** - Includes date for reference
   - Example: `2025-11-08/authentication-refactor`

4. **Multi-Task** - For multiple related tasks
   - Example: `multi-task/auth-api`

5. **Feature-Focused** - Emphasizes feature work
   - Example: `feature/authentication-refactor`

### Custom Branch Names

You can also enter your own branch name when prompted:
- Must be lowercase
- Use hyphens and slashes
- Examples: `my-custom-branch`, `custom/feature-name`

### Why Branch Naming Matters

- Keeps commits organized by feature/task
- Makes git history cleaner
- Easier code reviews (clear scope)
- Follows team conventions (feature/, fix/, etc.)

## New Session Naming

Sessions now use this format: `YYYY-MM-DD_HHmmss-session-name`

Example: `2025-11-08_143022-auth-refactor`

**Why?** Prevents problems when multiple sessions complete in the same day!

## Common Workflows

### Workflow 1: Review Before Committing
```bash
# Generate assets but don't archive yet
/commit --skip-archive

# Review branch name, message, and PR description
cat .claude/commit-assets/BRANCH_INFO.md
cat .claude/commit-assets/COMMIT_MESSAGE.md

# Customize if needed (edit the .md files)
# Then when ready, run /commit again to archive
/commit
```

### Workflow 2: Quick Commit with Branch
```bash
# Do all your sessions
/session-start "feature-a" && ... && /session-end
/session-start "feature-b" && ... && /session-end

# Prepare and archive in one command
/commit
# → Pick branch name from suggestions (or enter custom)

# Get your branch name and create branch
BRANCH=$(grep "Branch Name:" .claude/commit-assets/BRANCH_INFO.md | cut -d: -f2 | xargs)
git checkout -b $BRANCH

# Create git commit
git add .
git commit -m "$(cat .claude/commit-assets/COMMIT_MESSAGE.md)"

# Push and create PR
git push -u origin $BRANCH
gh pr create --body "$(cat .claude/commit-assets/PR_DESCRIPTION.md)"
```

### Workflow 3: Custom Branch Name
```bash
/commit

# When prompted for branch name, enter your custom name
# (e.g., "my-custom-branch-name")
# → /commit validates and confirms your choice

# Then use the branch name from BRANCH_INFO.md
git checkout -b [your-custom-name]
# ... continue with commit and push
```

### Workflow 4: Preview First (Dry Run)
```bash
# See exactly what /commit would do
/commit --dry-run

# Review the output, then run for real
/commit
```

## What Gets Archived?

When you run `/commit`, these happen:

1. **Sessions** are moved from `/dev/completed/sessions/` to `/dev/archived/sessions/YYYY-MM/`
2. **Tasks** are moved from `/dev/completed/tasks/` to `/dev/archived/tasks/YYYY-MM/`
3. **Index files** are created so you can search archives
4. **Metadata** is preserved so you can reference old work

Example: `dev/archived/sessions/2025-11/2025-11-08_143022-auth-refactor/`

## Finding Archived Work

After running `/commit`, your completed work is safely archived:

```bash
# List all sessions from November
ls dev/archived/sessions/2025-11/

# Search archived work by keyword
grep -r "authentication" dev/archived/

# View specific task
cat dev/archived/tasks/2025-11/auth-refactor/auth-refactor-plan.md
```

## Error Messages & Solutions

**Error: "Active sessions found"**
- Solution: Run `/session-end` on each active task first

**Error: "Nothing to commit"**
- Solution: Complete sessions with `/session-end` first

**Error: "Archive failed"**
- Solution: Check disk space, try `/commit --skip-archive` to review first

## Next Steps

1. **Complete your current work** with `/session-end`
2. **Run `/commit`** to prepare for GitHub
3. **Review generated files** in `.claude/commit-assets/`
4. **Create your git commit** using the generated message
5. **Create your GitHub PR** using the generated description

## Questions?

See detailed documentation:
- `.claude/commands/commit.md` - Full command reference
- `dev/README.md` - Complete session management workflow
- `.claude/COMMIT_COMMAND_IMPLEMENTATION.md` - Technical details

---

**Ready to try it?**

When you have completed sessions in `/dev/completed/`, just run:

```bash
/commit
```

Let me know if you need help!
