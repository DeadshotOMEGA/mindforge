---
name: plan
description: Create a detailed implementation plan before coding
---

# 📋 Planning Mode Activated

I am now in planning mode for the following task:

**TASK:** {prompt}

I will create a comprehensive implementation plan before beginning any work.

**Important Instructions for Claude:**
- Present the complete plan below following all sections
- Wait for user approval (yes/no/modify)
- If user says "yes" or "proceed":
  1. Extract task name from the prompt and convert to kebab-case
  2. Create `dev/active/[task-name]/` directory
  3. Generate three files: `[task-name]-plan.md`, `[task-name]-context.md`, `[task-name]-tasks.md`
  4. Populate files with the plan content from this session
  5. Begin Phase 1 implementation
- If user says "no" or "cancel": Stop and do not implement
- If user says "modify": Ask what they want changed and revise the plan

---

## 🎯 Task Analysis

Let me first analyze the task to understand:

1. **Scope & Complexity:**
   - What is the full scope of this task?
   - What is the complexity level (simple/medium/complex)?
   - Are there any ambiguities that need clarification?

2. **Dependencies & Prerequisites:**
   - What existing code/systems will this interact with?
   - What tools, libraries, or resources are required?
   - Are there any prerequisites that must be in place first?

3. **Potential Challenges:**
   - What are the technical challenges?
   - What could go wrong?
   - What are the unknowns?

---

## 📝 Implementation Plan

I will break this down into logical phases with specific, actionable steps.

### Phase-by-Phase Breakdown

For each phase, I will provide:
- **Clear objectives** - What this phase accomplishes
- **Specific tasks** - Numbered, actionable steps
- **Time estimates** - Realistic time for completion
- **Success criteria** - How we know this phase is complete
- **Potential risks** - What could go wrong and mitigations

### Files to Create/Modify

I will list:
- New files to create
- Existing files to modify
- Configuration changes needed

### Testing Strategy

For each phase:
- Unit tests required
- Integration tests needed
- Manual testing checklist
- How to verify correctness

---

## ⚠️ Risk Assessment

### Technical Risks
- What technical challenges exist?
- What are the areas of uncertainty?
- What external dependencies could fail?

### Mitigation Strategies
- How to reduce each risk
- Fallback approaches
- Rollback plan if something goes wrong

---

## ✅ Success Metrics

### Definition of Done
- [ ] All functional requirements met
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No known bugs or issues

### Quality Standards
- Performance targets
- Code quality metrics
- Test coverage requirements

---

## 🚀 Implementation Approach

### Order of Operations
1. Start with Phase 1 (foundation/setup)
2. Progress sequentially through phases
3. Test after each phase
4. Only move forward when current phase is solid

### Checkpoints
- Key decision points
- Where to pause and verify
- Opportunities for course correction

---

## ⏱️ Time Estimates

**Total Estimated Time:** [To be calculated based on phases]

**Breakdown by Phase:**
- Phase 1: X hours/minutes
- Phase 2: X hours/minutes
- etc.

**Confidence Level:** [High/Medium/Low]

---

## 💬 Questions for Clarification

Before I finalize the plan, I may have questions:

1. [Question 1 if needed]
2. [Question 2 if needed]
3. [Question 3 if needed]

---

## 🎬 Approval & Next Steps

After reviewing this comprehensive plan, please let me know:

**Options:**
- **"yes"** or **"proceed"** - I'll save the plan to dev-docs and begin Phase 1 implementation
- **"no"** or **"cancel"** - I'll stop and not implement
- **"modify"** - Tell me what to change in the plan
- **Specific feedback** - I'll adjust the plan accordingly

**I will wait for your explicit approval before beginning any implementation work.**

---

## 📁 When You Approve (say "yes")

I will automatically:

1. **Create dev-docs structure:**
   - Extract a clean task name from your request (kebab-case)
   - Create directory: `dev/active/[task-name]/`

2. **Generate 3 files:**
   - `[task-name]-plan.md` - This complete plan with all phases, risks, and estimates
   - `[task-name]-context.md` - Key files, architectural decisions, and dependencies
   - `[task-name]-tasks.md` - Checklist format for tracking progress through phases
   - Each file will include "Last Updated: YYYY-MM-DD" timestamp

3. **Begin implementation:**
   - Start with Phase 1
   - Update tasks.md as I complete each step
   - Reference the plan files throughout development

**This ensures your plan persists across context resets and provides a clear record of decisions made.**

---

*Note: This planning mode ensures we have a clear roadmap before writing any code, reducing the risk of going down the wrong path and making it easier to estimate time and resources.*
