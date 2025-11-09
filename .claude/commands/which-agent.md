---
name: which-agent
description: Interactive helper to select the right agent for your task
---

# 🤖 Agent Selection Helper

I'll help you choose the right agent for your task using our categorical agent system.

**Your task:** {prompt}

---

## Quick Analysis

Let me analyze your task and recommend the best agent(s):

### Task Classification

1. **What type of work is this?**
   - Investigation/Research
   - Planning/Strategy
   - Implementation/Coding
   - Code Review
   - Documentation
   - Testing
   - Debugging
   - Refactoring
   - Design/UX
   - Other

2. **What's the complexity?**
   - Simple (1-2 files, clear pattern)
   - Medium (3-5 files, some unknowns)
   - Complex (6+ files, architectural decisions)
   - Very Large (multi-phase, multiple subsystems)

3. **What's the current state?**
   - Starting from scratch
   - Modifying existing code
   - Fixing a bug
   - Improving/refactoring
   - Understanding/exploring

---

## Recommended Agent(s)

Based on your task, here are my recommendations:

### Primary Agent
**Agent:** [agent-name]
**Category:** [category]
**Why:** [Reasoning for this recommendation]
**Usage:** `Use the [agent-name] agent to [task description]`

### Alternative Options
- **[agent-name-2]**: [When to use this instead]
- **[agent-name-3]**: [When to use this instead]

### Multi-Agent Workflow (if applicable)
If this is a complex task requiring multiple agents:

```
Phase 1: [agent-name] - [purpose]
Phase 2: [agent-name] - [purpose]
Phase 3: [agent-name] - [purpose]
```

---

## Decision Tree Reference

Here's how I arrived at this recommendation:

```
Is this a LARGE, VAGUE, MULTI-PHASE task?
├─ YES → orchestrator (coordinates everything)
└─ NO → Continue...

Do you need to EXPLORE/UNDERSTAND code?
├─ YES → context-engineer (investigation)
└─ NO → Continue...

Do you need a PLAN before implementing?
├─ YES → planner (creates plan)
│   └─ Is it for REFACTORING? → refactor-planner
└─ NO → Continue...

Do you need to WRITE CODE?
├─ SIMPLE, clear patterns → junior-engineer
├─ COMPLEX, 3+ files → programmer
├─ ADVANCED algorithms → senior-programmer
└─ TypeScript ERRORS → auto-error-resolver

Do you need CODE REVIEW?
├─ Architecture review → senior-architect
└─ Best practices → code-architecture-reviewer

Do you need DOCUMENTATION?
├─ API docs → api-documenter
├─ Full project docs → documentation-architect
└─ Code examples → example-generator

Do you need to TEST?
└─ Routes → auth-route-tester

Do you need to DEBUG?
├─ Auth/route issues → auth-route-debugger
└─ Frontend errors → frontend-error-fixer

Do you need to REFACTOR?
└─ code-refactor-master
```

---

## Quick Command Examples

### To use the recommended agent:

```
"Use the [agent-name] agent to [your task]"
```

### To see all agents by category:

```
cat .claude/agents/README.md
```

### To read a specific agent's details:

```
cat .claude/agents/[category]/[agent-name].md
```

---

## Need More Help?

- **See all agents:** `.claude/agents/README.md`
- **Delegation patterns:** See "Delegation Patterns" section in agents README
- **Not sure?** Start with `orchestrator` for complex tasks or `context-engineer` to explore first

---

**Would you like me to:**
1. Proceed with the recommended agent?
2. Explain more about why I recommended this agent?
3. Show alternative approaches?
4. Launch the agent for you?
