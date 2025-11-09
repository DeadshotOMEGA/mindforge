# Issue: /session-end Should Auto-Run /session-update

**Issue ID:** 20251108-SESSION-001
**Severity:** 🟡 High
**Status:** 🔍 Under Investigation

## Problem Summary

When running `/session-end`, the workflow creates an incomplete state:

1. User runs `/session-end` on a completed session
2. SESSION_NOTES.md gets created in `/dev/active/`
3. User has to manually run `/session-update` to prepare docs
4. When running `/session-end` again, it complains about incomplete tasks (even though there are none)
5. System forces user to choose between "exit", "cancel", or "force archive"

## Expected Behavior

`/session-end` should:
1. **Automatically run `/session-update`** before archival workflow
2. Prepare all documentation
3. Clean up `/dev/active/`
4. Archive everything to `/dev/completed/` seamlessly

## Current Behavior

`/session-end` does NOT run `/session-update`, leaving:
- SESSION_NOTES.md created but not updated with final status
- Documentation not finalized
- State inconsistency between `/dev/active/` and `/dev/completed/`

## Reproduction Steps

```bash
# 1. Complete all session work
/session-start "feature-name"
# ... work ...
/session-end
# ✅ Session moved to /dev/completed/
# ⚠️ SESSION_NOTES.md created in /dev/active/

# 2. Try to end session again
/session-end
# ❌ Error: Must choose exit/cancel/force
# This shouldn't happen - should auto-update first
```

## Root Cause

The `/session-end` command workflow:

```
Current flow:
  /session-end
    ↓
  [Check SESSION_NOTES.md]
    ↓
  [Scan /dev/active/]
    ↓
  [Check task completion]
    ↓
  [Archive]

Should be:
  /session-end
    ↓
  [RUN /session-update first] ← MISSING STEP
    ↓
  [Check SESSION_NOTES.md]
    ↓
  [Scan /dev/active/]
    ↓
  [Check task completion]
    ↓
  [Archive]
```

## Impact

- **Users:** Confusing workflow, extra manual step
- **Workflow:** Incomplete state left in `/dev/active/`
- **Clarity:** Documentation not properly finalized before archival

## Solution

Modify `/session-end` command to:

1. **Phase 0: Auto-Update (NEW)**
   - Run `/session-update` automatically
   - Ask user if they want to see updates or just proceed
   - Ensure all documentation is fresh

2. **Phase 1-7:** Continue with existing workflow
   - Now has properly updated documentation
   - `/dev/active/` is clean after update
   - Archival completes properly

## Files to Modify

- `.claude/commands/session-end.md` - Add Phase 0 auto-update

## Success Criteria

✅ `/session-end` automatically runs `/session-update` first
✅ User sees update summary before proceeding
✅ After update, `/dev/active/` is properly cleaned
✅ Archival completes without confusion
✅ No need for manual `/session-update` before `/session-end`

## Implementation Plan

1. **Add Phase 0 to session-end.md** - Auto-run /session-update
2. **Show summary to user** - What was updated
3. **Ask confirmation** - "Ready to proceed with archival?"
4. **Continue with existing archival** - Phases 1-7

## Testing Plan

```bash
# Test 1: Normal workflow
/session-start "test-task"
/session-end
✅ Should auto-update and archive smoothly

# Test 2: Multiple sessions
/session-start "task-1"
/session-end
/session-start "task-2"
/session-end
✅ Each should auto-update and archive

# Test 3: With manual updates
/session-start "task"
/session-update "task"
/session-end
✅ Should still work if user already updated
```

---

**Issue Created:** 2025-11-08
**Priority:** High (improves core workflow)
**Estimated Fix Time:** 30 minutes
