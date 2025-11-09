# Archived Commands

This directory contains deprecated commands that have been replaced by the unified session command structure.

## Archived Commands

These commands have been replaced but are kept for reference and backward compatibility:

### `/dev-docs` → `/session-start` (Quick Mode)
- **Old:** `/dev-docs "task name"`
- **New:** `/session-start "task name"`
- **Status:** Archived 2025-11-08
- **Reason:** Merged into unified `/session-start` command

### `/plan` → `/session-start --plan` (Plan Mode)
- **Old:** `/plan` (interactive planning)
- **New:** `/session-start --plan "description"`
- **Status:** Archived 2025-11-08
- **Reason:** Merged into unified `/session-start` command

### `/dev-docs-update` → `/session-update`
- **Old:** `/dev-docs-update`
- **New:** `/session-update`
- **Status:** Archived 2025-11-08
- **Reason:** Enhanced with smart detection and renamed for consistency

## Why Archived?

The old commands were fragmented and lacked a clear workflow. The new unified structure provides:

1. **Clear lifecycle:** `/session-start` → `/session-update` → `/session-end`
2. **Better naming:** Session-based naming matches `SESSION_NOTES.md`
3. **Enhanced features:** Smart detection, git integration, metadata tracking
4. **Easier discovery:** Consistent `/session-*` prefix

## Backward Compatibility

These commands still work if you have existing workflows using them. However, new work should use the unified session commands.

## Migration Guide

### Old Workflow
```bash
/dev-docs "task name"          # Create structure
[work...]
/dev-docs-update               # Update docs
[work...]
# No end command - manual cleanup
```

### New Workflow
```bash
/session-start "task name"     # Create structure
[work...]
/session-update                # Update docs (smart)
[work...]
/session-end                   # Archive completed work
```

## When to Delete

You can safely delete this `commands_archive/` directory when:
- All team members have migrated to new commands
- No automation scripts reference old commands
- You're comfortable with the new workflow
- At least 30 days have passed since migration

## Restoring Old Commands

If you need to restore old commands to active use:

```bash
mv .claude/commands_archive/[command].md .claude/commands/
```

However, this is not recommended as the new unified structure is superior.

---

**Migration Date:** 2025-11-08
**Reason:** Unified session command structure implementation
