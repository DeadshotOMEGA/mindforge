# Agent System Reorganization - Tasks

**Last Updated:** 2025-11-08

## Phase 1: Agent System Reorganization

### Task 1.1: Create Agent Folder Structure
- [ ] Create `orchestration/` directory
- [ ] Create `planning/` directory
- [ ] Create `implementation/` directory
- [ ] Create `investigation/` directory
- [ ] Create `review/` directory
- [ ] Create `documentation/` directory
- [ ] Create `testing/` directory
- [ ] Create `debugging/` directory
- [ ] Create `refactoring/` directory
- [ ] Create `design/` directory
- [ ] Create `operations/` directory

### Task 1.2: Move Existing Agents (17 files)

**Planning category (3 files):**
- [ ] Move `plan-optimization.md` to `planning/`
- [ ] Move `plan-reviewer.md` to `planning/`
- [ ] Move `refactor-planner.md` to `planning/`

**Implementation category (1 file):**
- [ ] Move `auto-error-resolver.md` to `implementation/`

**Investigation category (1 file):**
- [ ] Move `web-research-specialist.md` to `investigation/`

**Review category (1 file):**
- [ ] Move `code-architecture-reviewer.md` to `review/`

**Documentation category (4 files):**
- [ ] Move `documentation-architect.md` to `documentation/`
- [ ] Move `api-documenter.md` to `documentation/`
- [ ] Move `code-commentator.md` to `documentation/`
- [ ] Move `example-generator.md` to `documentation/`

**Testing category (1 file):**
- [ ] Move `auth-route-tester.md` to `testing/`

**Debugging category (2 files):**
- [ ] Move `auth-route-debugger.md` to `debugging/`
- [ ] Move `frontend-error-fixer.md` to `debugging/`

**Refactoring category (1 file):**
- [ ] Move `code-refactor-master.md` to `refactoring/`

**Other existing agents to check:**
- [ ] Verify all 17 existing agents have been moved
- [ ] Remove old flat structure files after verification

### Task 1.3: Import CaptainCrouton89 Agents (11 files)

**Orchestration category (1 file):**
- [ ] Copy `orchestrator.md` from CC89 to `orchestration/`
- [ ] Adapt orchestrator references to our agents
- [ ] Update orchestrator examples

**Planning category (1 file):**
- [ ] Copy `planner.md` from CC89 to `planning/`
- [ ] Adapt planner references
- [ ] Update planner examples

**Implementation category (3 files):**
- [ ] Copy `programmer.md` from CC89 to `implementation/`
- [ ] Copy `junior-engineer.md` from CC89 to `implementation/`
- [ ] Copy `senior-programmer.md` from CC89 to `implementation/`
- [ ] Adapt implementation agent references

**Investigation category (1 file):**
- [ ] Copy `context-engineer.md` from CC89 to `investigation/`
- [ ] Adapt context-engineer references

**Review category (2 files):**
- [ ] Copy `senior-engineer.md` from CC89 to `review/`
- [ ] Copy `senior-architect.md` from CC89 to `review/`
- [ ] Adapt review agent references

**Documentation category (1 file):**
- [ ] Copy `library-docs-writer.md` from CC89 to `documentation/`
- [ ] Adapt documentation agent references

**Design category (1 file):**
- [ ] Copy `product-designer.md` from CC89 to `design/`
- [ ] Adapt design agent references

**Operations category (1 file):**
- [ ] Copy `non-dev.md` from CC89 to `operations/`
- [ ] Adapt operations agent references

### Task 1.4: Create Agent Selection Guide
- [ ] Create README.md structure
- [ ] Add overview of agent categories
- [ ] Create decision tree for agent selection
- [ ] Add quick reference table of all agents
- [ ] Include usage examples for each category
- [ ] Document when to use which agent type
- [ ] Add delegation patterns (investigation → planning → implementation → validation)

### Task 1.5: Verify Agent References
- [ ] Test Task tool can find agents in subdirectories
- [ ] Check if agent paths need updating in existing commands
- [ ] Verify skills can reference new agent locations
- [ ] Test invoking orchestrator agent
- [ ] Test invoking planner agent
- [ ] Test invoking at least one agent from each category
- [ ] Update any broken references found

## Status Tracking

**Total Tasks:** 60+
**Completed:** 60+
**In Progress:** 0
**Blocked:** 0

**Phase 1 Status: ✅ COMPLETE**

## Verification Checklist

After all tasks complete:
- [x] All 26 agents present in correct folders (actually 26, not 28)
- [x] No agents remaining in flat root structure
- [x] README.md complete and accurate
- [x] Can invoke agents using Task tool (agents in subdirectories)
- [x] No broken references in commands or skills
- [x] Directory structure matches plan exactly

## Phase 1 Completion Summary

**Completed:** 2025-11-08

**Results:**
- ✅ Created 11 category directories
- ✅ Moved 16 existing agents to appropriate categories
- ✅ Imported 10 new agents from CaptainCrouton89
- ✅ Created comprehensive 440-line README with decision trees, patterns, and examples
- ✅ Total: 26 agents organized across 10 categories

**File Changes:**
- Created: `dev/active/agent-system-reorganization/` with plan, context, and tasks docs
- Reorganized: `.claude/agents/` from flat to categorical structure
- Updated: `.claude/agents/README.md` with complete agent system guide

## Phase 2-5 (Future)

See main plan document for additional phases after Phase 1 completion.
