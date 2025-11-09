# Resolution: PostToolUse:Edit Hook Error

**Issue ID:** 20251108-001
**Resolved:** 2025-11-08
**Resolution Time:** ~30 minutes

---

## Issue Summary

PostToolUse hook (`post-tool-use-tracker.sh`) was failing because it required `jq` (JSON parser) which wasn't installed on the system.

---

## Root Cause

**Primary Cause:**
Hook script used `jq` to parse JSON input without checking if `jq` was installed.

**Contributing Factors:**
1. Script had `set -e` which caused immediate exit on any command failure
2. No fallback parsing method for systems without `jq`
3. Silent failure - no error message visible to user

**Why It Wasn't Caught:**
- Hook runs in background after tool use
- Failures don't block the main operation
- No error reporting mechanism for hook failures

---

## Solution Implemented

**Option Chosen:** Make hook jq-optional with bash fallback

**Changes Made:**

### Modified: `.claude/hooks/post-tool-use-tracker.sh`

1. **Removed `set -e`** - Prevents script from crashing on first error
2. **Added `parse_json_value()` function** - Native bash JSON parsing using grep/sed
3. **Added conditional jq usage** - Try jq first, fall back to bash if unavailable

**Code Changes:**
```bash
# Before (lines 1-15):
#!/bin/bash
set -e
...
tool_name=$(echo "$tool_info" | jq -r '.tool_name // empty')
file_path=$(echo "$tool_info" | jq -r '.tool_input.file_path // empty')
session_id=$(echo "$tool_info" | jq -r '.session_id // empty')

# After (lines 1-30):
#!/bin/bash
# Function to parse JSON value (bash fallback when jq not available)
parse_json_value() {
    local json="$1"
    local key="$2"
    echo "$json" | grep -o "\"$key\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" | sed 's/.*: *"\([^"]*\)".*/\1/' | head -1
}

# Try jq first, fall back to bash parsing
if command -v jq >/dev/null 2>&1; then
    tool_name=$(echo "$tool_info" | jq -r '.tool_name // empty')
    file_path=$(echo "$tool_info" | jq -r '.tool_input.file_path // empty')
    session_id=$(echo "$tool_info" | jq -r '.session_id // empty')
else
    tool_name=$(parse_json_value "$tool_info" "tool_name")
    file_path=$(parse_json_value "$tool_info" "file_path")
    session_id=$(parse_json_value "$tool_info" "session_id")
fi
```

---

## Testing Performed

### Test 1: Write Tool
- Created test file using Write tool
- ✅ Hook ran without errors
- ✅ Cache directory created: `.claude/tsc-cache/{session-id}/`
- ✅ No error messages

### Test 2: Edit Tool
- Modified test file using Edit tool
- ✅ Hook ran without errors
- ✅ Session cache maintained
- ✅ No error messages

### Test 3: Bash Fallback Verification
- Confirmed `jq` is not installed (`which jq` returns exit code 1)
- ✅ Hook successfully used bash fallback parsing
- ✅ JSON values correctly extracted using grep/sed

---

## Prevention

### How to Prevent This in the Future

**1. Dependency Checking Pattern:**
```bash
# Check for required commands, fall back gracefully
if command -v jq >/dev/null 2>&1; then
    # Use jq
else
    # Use fallback
fi
```

**2. Avoid `set -e` in Hooks:**
- Hooks should handle errors gracefully
- Silent failures are better than blocking user operations
- Use explicit error checking instead of `set -e`

**3. Documentation:**
- Document hook dependencies in hook header comments
- Provide installation instructions for optional dependencies

**4. Testing:**
- Test hooks in minimal environments (without optional tools)
- Verify hooks work without dependencies

---

## Code Patterns to Follow

**✅ Good - Graceful Degradation:**
```bash
#!/bin/bash
# Optional dependency: jq (falls back to bash parsing)

if command -v jq >/dev/null 2>&1; then
    # Use jq for robust parsing
else
    # Use native bash tools
fi
```

**❌ Bad - Hard Dependency:**
```bash
#!/bin/bash
set -e

# Will crash if jq not installed
tool_name=$(echo "$tool_info" | jq -r '.tool_name')
```

---

## Learnings

1. **Hooks should be resilient** - Don't assume dependencies are installed
2. **Graceful degradation** - Provide fallback implementations
3. **Silent failures are context-dependent** - Hooks failing silently is OK; main tools failing silently is not
4. **Test without dependencies** - Minimal environment testing catches these issues
5. **`set -e` is dangerous in hooks** - Prefer explicit error handling

---

## Related Issues

None (first issue tracked in this system)

---

## Files Modified

- `.claude/hooks/post-tool-use-tracker.sh` - Made jq optional with bash fallback

**Lines Changed:** 30 lines modified (added fallback parsing function and conditional usage)

---

## Benefits of This Solution

✅ **No external dependencies required** - Works out of the box
✅ **Still uses jq if available** - Best performance when jq is installed
✅ **Portable** - Works on any bash-compatible system
✅ **Maintains all functionality** - No features lost
✅ **Future-proof** - Won't break if jq gets uninstalled

---

## Testing Checklist

- [x] Hook runs without errors when jq is not installed
- [x] Hook creates cache directory correctly
- [x] Hook parses tool_name correctly
- [x] Hook parses file_path correctly
- [x] Hook parses session_id correctly
- [x] No error messages appear to user
- [x] Edit operations complete successfully
- [x] Write operations complete successfully
- [x] Hook still functions as designed

---

**Resolution Status:** ✅ Complete and Tested
**Can Be Closed:** Yes
**Archive To:** `dev/completed/issues/20251108-001/`
