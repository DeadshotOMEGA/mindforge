# Agent System Reorganization - Implementation Plan

**Last Updated:** 2025-11-08

## Summary
**Goal:** Import full CaptainCrouton89 agent system and organize all agents into categorical subfolders
**Type:** Enhancement
**Scope:** Large

## Overview

Reorganize `.claude/agents/` from flat structure to organized hierarchy with 28 total agents across 10 categories. Import 11 new agents from CaptainCrouton89 and reorganize our existing 17 agents.

## Current System

**Existing agents (17 total) - flat structure:**
- auth-route-debugger.md
- auth-route-tester.md
- auto-error-resolver.md
- code-architecture-reviewer.md
- code-refactor-master.md
- documentation-architect.md
- api-documenter.md
- code-commentator.md
- example-generator.md
- frontend-error-fixer.md
- plan-optimization.md
- plan-reviewer.md
- refactor-planner.md
- web-research-specialist.md

## Target System

**New structure (28 agents in 10 categories):**

```
.claude/agents/
├── README.md (agent selection guide)
├── orchestration/
│   └── orchestrator.md (NEW)
├── planning/
│   ├── planner.md (NEW)
│   ├── plan-optimization.md (MOVED)
│   ├── plan-reviewer.md (MOVED)
│   └── refactor-planner.md (MOVED)
├── implementation/
│   ├── programmer.md (NEW)
│   ├── junior-engineer.md (NEW)
│   ├── senior-programmer.md (NEW)
│   └── auto-error-resolver.md (MOVED)
├── investigation/
│   ├── context-engineer.md (NEW)
│   └── web-research-specialist.md (MOVED)
├── review/
│   ├── senior-engineer.md (NEW)
│   ├── senior-architect.md (NEW)
│   └── code-architecture-reviewer.md (MOVED)
├── documentation/
│   ├── library-docs-writer.md (NEW)
│   ├── documentation-architect.md (MOVED)
│   ├── api-documenter.md (MOVED)
│   ├── code-commentator.md (MOVED)
│   └── example-generator.md (MOVED)
├── testing/
│   └── auth-route-tester.md (MOVED)
├── debugging/
│   ├── auth-route-debugger.md (MOVED)
│   └── frontend-error-fixer.md (MOVED)
├── refactoring/
│   └── code-refactor-master.md (MOVED)
├── design/
│   └── product-designer.md (NEW)
└── operations/
    └── non-dev.md (NEW)
```

## Implementation Plan

### Phase 1: Agent System Reorganization

#### Task 1.1: Create Agent Folder Structure
- Create 10 category subdirectories in `.claude/agents/`
- **Files:** New directories
- **Agent:** Direct implementation
- **Success:** Clean folder structure exists

#### Task 1.2: Move Existing Agents (17 files)
- Move agents to appropriate category folders
- **Files:** All existing 17 agent files
- **Agent:** Direct implementation
- **Success:** All existing agents in correct folders

#### Task 1.3: Import CaptainCrouton89 Agents (11 files)
- Copy 11 agent files from CaptainCrouton89
- Adapt references to our project context
- Update examples and agent references
- **Files:** 11 new agent files
- **Agent:** Direct implementation
- **Success:** All CC89 agents available

#### Task 1.4: Create Agent Selection Guide
- Comprehensive README.md with decision trees
- Quick reference table
- Category descriptions
- Usage examples
- **Files:** `.claude/agents/README.md`
- **Agent:** Direct implementation
- **Success:** Clear agent selection guidance

#### Task 1.5: Verify Agent References
- Test that Task tool can find agents
- Check existing commands for broken references
- Update any hardcoded paths
- **Files:** Various command files
- **Agent:** Direct implementation
- **Success:** All agent invocations work

### Phase 2-5: See separate sections (not part of Phase 1)

## Expected Results

After Phase 1:
- ✅ 28 agents organized into 10 logical categories
- ✅ Clear folder hierarchy for easy navigation
- ✅ Comprehensive README with agent selection guidance
- ✅ All existing functionality preserved
- ✅ Ready to build advanced workflows using organized agents

## Next Steps

After Phase 1 completion:
- Phase 2: Enhanced planning templates
- Phase 3: Workflow command integration
- Phase 4: Hook enhancements (optional)
- Phase 5: Documentation & examples
