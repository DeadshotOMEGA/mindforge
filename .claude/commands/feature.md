---
name: feature
description: Complete feature development lifecycle with agent delegation
argument-hint: [feature description]
---

# 🚀 Feature Development Lifecycle

**Feature:** {prompt}

---

## Overview

I'll guide you through the complete feature development lifecycle using strategic agent delegation:

**Investigation → Planning → Implementation → Validation**

This workflow ensures we understand the requirements, create a solid plan, implement systematically, and validate the results.

---

## Phase 1: Requirements & Investigation

### Initial Analysis

First, let me understand the feature requirements by asking clarifying questions:

**Essential Questions:**
1. **What problem does this feature solve?**
2. **Who will use this feature?**
3. **What are the key user interactions?**
4. **Are there any constraints or requirements?**
5. **What defines success for this feature?**

### Investigation Strategy

Based on your answers, I'll determine what investigation is needed:

**Investigation Tasks** (run in parallel using context-engineer agents):
- [ ] Existing patterns and conventions
- [ ] Related code structures and files
- [ ] Dependencies and integration points
- [ ] Technical constraints
- [ ] Similar features in the codebase

**Investigation Outputs:**
- Each agent writes to `agent-responses/{agent_id}.md`
- Use `./agent-responses/await {agent_id}` to monitor progress
- All findings will be compiled into investigation documents

**I will spawn context-engineer agents as needed for parallel investigation.**

---

## Phase 2: Requirements Documentation

After investigation completes, I'll create:

**Requirements Document** (`dev/active/{feature-name}/requirements.md`)
Using template from `.claude/templates/requirements.template.md`:
- User requirements and interactions
- Functional requirements
- Technical requirements
- Success criteria
- Integration points
- Out of scope items

**Investigation Summary** (`dev/active/{feature-name}/investigation.md`)
Using template from `.claude/templates/investigation.template.md`:
- Key files and entry points
- Data flow documentation
- Patterns to follow
- Integration points
- Important context and gotchas

**🛑 CHECKPOINT:** User reviews and approves requirements before proceeding

---

## Phase 3: Planning

**Planning Agent:** I'll delegate to the `planner` agent with all requirements and investigation documents.

**Plan Output** (`dev/active/{feature-name}/plan.md`)
Using template from `.claude/templates/plan.template.md`:
- Implementation tasks with dependencies
- Task breakdown with assigned agents
- Parallelization strategy
- Data/schema impacts
- Testing strategy
- Risk analysis

**🛑 CHECKPOINT:** User reviews and approves plan before implementation

---

## Phase 4: Implementation

**Implementation Strategy:**
- Delegate tasks to appropriate agents based on complexity:
  - `junior-engineer` for simple, well-specified tasks
  - `programmer` for complex multi-file implementations
  - `senior-programmer` for advanced technical challenges

**Parallel Execution:**
- Independent tasks run in parallel
- Sequential tasks wait for dependencies
- Each agent gets relevant context from investigation and plan

**Continuous Validation:**
- Spawn validation agents one step behind implementation
- Use `code-architecture-reviewer` to check patterns and integration
- Fix issues as they're discovered

**Progress Tracking:**
- Update `dev/active/{feature-name}/tasks.md` as work progresses
- Monitor agent outputs in `agent-responses/`
- Keep plan synchronized with actual implementation

---

## Phase 5: Final Validation

**Comprehensive Validation:**
- Use `senior-architect` agent with full context:
  - Requirements document
  - Investigation findings
  - Implementation plan
  - All code changes

**Validation Checklist:**
- [ ] All requirements met
- [ ] Follows project patterns and conventions
- [ ] Integration points work correctly
- [ ] Error handling implemented
- [ ] Performance considerations addressed
- [ ] No architectural issues

**Testing:**
- If routes were implemented: Use `auth-route-tester`
- Run build to verify no compilation errors
- Manual testing of key workflows

---

## Phase 6: Documentation & Completion

**Final Documentation:**
- Update README if needed
- Add feature documentation
- Update API docs if applicable
- Document any new patterns or conventions

**Completion Checklist:**
- [ ] All code implemented and tested
- [ ] Build passes
- [ ] Validation completed
- [ ] Documentation updated
- [ ] Requirements met
- [ ] No known issues

---

## Agent Delegation Reference

### Investigation Phase
```
Use the context-engineer agent to investigate [specific area]
```
Spawn multiple in parallel for different investigation areas.

### Planning Phase
```
Use the planner agent to create an implementation plan for [feature]
Provide: requirements.md, investigation.md files
```

### Implementation Phase
```
Use the programmer agent to implement [complex task]
Use the junior-engineer agent to implement [simple task]
Use the senior-programmer agent to implement [advanced task]
```

### Validation Phase
```
Use the code-architecture-reviewer agent to review [implementation]
Use the senior-architect agent to validate [architecture]
```

---

## Workflow Commands

Throughout this process, you can use:

- `/plan` - Create detailed implementation plan
- `/which-agent` - Get help selecting the right agent
- `/dev-docs-update` - Update development documentation
- `/validate-docs` - Ensure documentation is complete

---

## Getting Started

**Ready to begin?**

I'll start by asking clarifying questions about your feature requirements. Based on your answers, I'll:

1. Spawn investigation agents in parallel
2. Gather all findings
3. Create requirements and investigation documents
4. Get your approval
5. Create implementation plan
6. Get your approval
7. Begin systematic implementation
8. Validate continuously
9. Complete with comprehensive validation

**Let's start with the requirements. Please answer the essential questions above, or provide any additional context about your feature.**

---

## Tips for Success

- **Be specific** in your requirements - reduces back-and-forth later
- **Review plans carefully** before implementation - changes are cheaper before coding
- **Trust the process** - systematic approach reduces bugs and rework
- **Communicate blockers early** - I can spawn agents to resolve issues
- **Validate continuously** - catch issues early when they're easier to fix

---

**I'm ready to start. Please provide details about your feature or answer the essential questions above.**
