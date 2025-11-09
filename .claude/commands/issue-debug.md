---
name: issue-debug
description: Track, investigate, and debug errors or issues with systematic workflow
argument-hint: [error description or leave empty for guided input]
---

# 🐛 Issue Debug Workflow

**Issue:** {prompt}

---

## Overview

I'll help you systematically track, investigate, and debug this error or issue using a structured workflow:

**Capture → Investigate → Diagnose → Fix → Validate → Document**

This ensures we understand the problem fully before attempting fixes, and document the solution for future reference.

---

## Phase 1: Issue Capture & Classification

Let me gather essential information about this issue:

### Required Information

**1. What is the error or issue?**
   - Exact error message (if applicable)
   - Unexpected behavior description
   - Expected vs. actual behavior

**2. When does it occur?**
   - Specific steps to reproduce
   - Frequency (always, intermittent, specific conditions)
   - First noticed when (new feature, after change, existing issue)

**3. Where does it occur?**
   - Frontend/Backend/Both
   - Specific file or component (if known)
   - Browser console/server logs/build errors
   - Environment (development, staging, production)

**4. Impact Assessment:**
   - Who is affected? (all users, specific users, developers only)
   - Severity: 🔴 Critical | 🟡 High | 🟢 Medium | ⚪ Low
   - Blocking work? Yes/No

**5. Context:**
   - Recent changes that might be related
   - Related features or systems
   - Any workarounds currently in use

---

## Phase 2: Issue Classification & Agent Selection

Based on the information provided, I'll classify the issue and select appropriate debugging agents:

### Issue Type Detection

**Authentication/Route Issues:**
- 401/403 errors
- Cookie/JWT problems
- Route not found (404)
- Permission errors
→ **Agent:** `auth-route-debugger`

**Frontend Errors:**
- TypeScript compilation errors
- React runtime errors
- Browser console errors
- Build failures
- UI rendering issues
→ **Agent:** `frontend-error-fixer`

**Backend Errors:**
- API errors
- Database errors
- Service layer issues
→ **Agent:** `context-engineer` (investigation) + `programmer` (fix)

**Performance Issues:**
- Slow responses
- Memory leaks
- High CPU usage
→ **Agent:** `context-engineer` + `senior-programmer`

**Unknown/Complex Issues:**
- Multiple systems involved
- Unclear root cause
- Need exploration
→ **Agent:** `orchestrator` (coordinates investigation)

---

## Phase 3: Investigation

### Creating Issue Tracking Structure

I'll create a tracking directory at `dev/active/issues/[issue-id]/`:

**Files to create:**
1. `issue.md` - Complete issue description and details
2. `investigation.md` - Investigation findings (using investigation.template.md)
3. `fix-plan.md` - Proposed fix strategy
4. `resolution.md` - Final resolution and learnings

**Issue ID Format:** `YYYYMMDD-NNN` (e.g., 20251108-001)

### Investigation Strategy

Based on issue type, I'll spawn appropriate agents:

**For Frontend Errors:**
```
Use the frontend-error-fixer agent to investigate [error details]
Provide: Error message, stack trace, file context
```

**For Auth/Route Issues:**
```
Use the auth-route-debugger agent to investigate [route/auth issue]
Provide: Route path, expected behavior, error codes
```

**For Complex/Unknown Issues:**
```
Use the context-engineer agent to investigate [system/component]
Focus: Data flow, integration points, recent changes
```

**Investigation Outputs:**
- Root cause analysis
- Affected files and systems
- Related code patterns
- Dependencies and side effects

---

## Phase 4: Diagnosis & Fix Planning

### Root Cause Analysis

From investigation findings, I'll determine:
- **Primary cause:** What directly caused the error
- **Contributing factors:** What made it possible
- **Why it wasn't caught:** Testing gaps, edge cases

### Fix Strategy Options

I'll present options for fixing the issue:

**Option 1: Quick Fix**
- Minimal change to resolve immediate issue
- Pros: Fast, low risk
- Cons: May not address root cause

**Option 2: Proper Fix**
- Addresses root cause completely
- Pros: Permanent solution, prevents recurrence
- Cons: More time, potentially broader changes

**Option 3: Refactor Fix**
- Improves underlying structure while fixing
- Pros: Better long-term codebase health
- Cons: Most time-intensive, highest risk

### Creating Fix Plan

Using `fix-plan.md`:
```markdown
# Fix Plan: [Issue ID]

## Issue Summary
[Brief description]

## Root Cause
[What's actually broken]

## Proposed Solution
[Chosen fix strategy]

## Files to Modify
- file1.ts - [changes needed]
- file2.ts - [changes needed]

## Testing Strategy
- How to verify fix works
- How to prevent regression

## Risks & Mitigation
[What could go wrong and how to handle it]
```

**🛑 CHECKPOINT:** User reviews and approves fix plan before implementation

---

## Phase 5: Implementation

### Agent Selection for Fix

**Simple, well-understood fix:**
```
Use the junior-engineer agent to implement [fix]
Provide: fix-plan.md, investigation.md
```

**Complex fix requiring pattern analysis:**
```
Use the programmer agent to implement [fix]
Provide: fix-plan.md, investigation.md, affected files
```

**Advanced fix requiring expertise:**
```
Use the senior-programmer agent to implement [fix]
Provide: Full context, architectural considerations
```

### Implementation Tracking

I'll update `dev/active/issues/[issue-id]/resolution.md` as work progresses:
- Changes made
- Files modified
- Decisions made during implementation

---

## Phase 6: Validation

### Testing the Fix

**Automated Testing:**
- Run build to ensure no compilation errors
- Run relevant unit tests
- Run integration tests if applicable

**Manual Testing:**
- Reproduce original issue - should be fixed
- Test related functionality - should still work
- Test edge cases - should be handled

**For Route Fixes:**
```
Use the auth-route-tester agent to verify [route] works correctly
```

**For Frontend Fixes:**
- Test in browser with dev tools open
- Verify no console errors
- Test user workflows affected

### Validation Checklist

- [ ] Original issue is resolved
- [ ] No new errors introduced
- [ ] Related functionality still works
- [ ] Build passes
- [ ] Tests pass (if applicable)
- [ ] No console warnings/errors
- [ ] Performance is acceptable

---

## Phase 7: Documentation & Closure

### Resolution Documentation

I'll complete `resolution.md` with:

```markdown
# Resolution: [Issue ID]

## Issue Summary
[Original problem]

## Root Cause
[What was broken and why]

## Solution Implemented
[What was changed]

## Files Modified
- file1.ts - [specific changes]
- file2.ts - [specific changes]

## Testing Performed
- [Tests run]
- [Manual verification]

## Prevention
[How to prevent this in the future]
- Code patterns to follow
- Tests to add
- Documentation to update

## Learnings
[What we learned from this issue]

## Related Issues
[Links to similar issues if any]
```

### Knowledge Base Update

If this reveals a pattern or common issue:
- Update relevant documentation
- Add to troubleshooting guide
- Create test to prevent regression
- Update skill or agent if pattern is common

### Archive Issue

Move completed issue to `dev/completed/issues/[issue-id]/` for future reference.

---

## Quick Start Examples

### Example 1: Frontend Error
```
User: "I'm getting 'Cannot read property of undefined' in UserProfile component"

I'll:
1. Create issue tracking in dev/active/issues/20251108-001/
2. Use frontend-error-fixer agent to investigate
3. Identify null check missing on user.profile
4. Create fix plan
5. Use junior-engineer to add null checks
6. Validate in browser
7. Document resolution
```

### Example 2: Authentication Issue
```
User: "Users getting 401 on /api/workflow/123 even when logged in"

I'll:
1. Create issue tracking in dev/active/issues/20251108-002/
2. Use auth-route-debugger to investigate
3. Identify cookie not being sent with request
4. Create fix plan
5. Use programmer to fix cookie configuration
6. Use auth-route-tester to validate
7. Document resolution
```

### Example 3: Complex Mystery Issue
```
User: "Application crashes randomly after 2 hours of use"

I'll:
1. Create issue tracking
2. Use orchestrator to coordinate investigation
3. Spawn multiple context-engineer agents for different subsystems
4. Analyze findings to identify memory leak
5. Create comprehensive fix plan
6. Use senior-programmer for fix
7. Validate with extended testing
8. Document thoroughly
```

---

## Issue Severity Guidelines

**🔴 Critical (Fix Immediately):**
- Application crashes
- Data loss
- Security vulnerabilities
- Complete feature failure affecting all users

**🟡 High (Fix Soon):**
- Important feature broken
- Affecting many users
- Workaround exists but painful
- Performance severely degraded

**🟢 Medium (Fix in Sprint):**
- Minor feature issues
- Affecting some users
- Acceptable workaround exists
- Quality of life improvements

**⚪ Low (Backlog):**
- Cosmetic issues
- Edge cases
- Nice-to-have improvements
- Technical debt

---

## Debugging Tips

### Before Spawning Agents

**Quick checks to try first:**
1. Check browser/server console for error messages
2. Check recent git commits for related changes
3. Try reproducing in clean environment
4. Check if issue is environment-specific

### When to Use Which Agent

**Use auth-route-debugger when:**
- Error codes: 401, 403, 404 on routes
- "Unauthorized" or "Forbidden" messages
- Cookie/session issues
- JWT token problems

**Use frontend-error-fixer when:**
- TypeScript compilation errors
- React errors in browser console
- Build process failures
- Undefined/null reference errors in UI

**Use context-engineer when:**
- Need to understand code flow
- Root cause unclear
- Multiple files potentially involved
- Need to trace data through system

**Use orchestrator when:**
- Issue spans multiple systems
- Root cause completely unknown
- Need coordinated investigation
- Multiple debugging approaches needed

---

## Getting Started

**Ready to debug this issue?**

Please provide answers to the Phase 1 questions, or if you've already described the issue, I'll:

1. Create issue tracking structure
2. Classify the issue type
3. Select appropriate debugging agent(s)
4. Begin systematic investigation
5. Create fix plan for your approval
6. Implement and validate fix
7. Document resolution

**What information can you provide about the issue?**
