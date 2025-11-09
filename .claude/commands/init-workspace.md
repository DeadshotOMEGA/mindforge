---
name: init-workspace
description: Initialize Claude Code environment for a new project
---

# 🔧 Workspace Initialization

I'll help you set up the optimal Claude Code environment for this project by analyzing the project type and recommending appropriate agents and configurations.

---

## Step 1: Project Analysis

Let me analyze this project to understand what you're building:

### Reading Project Files

I'll examine:
- `README.md` - Project overview and goals
- `package.json` - Dependencies and scripts (if Node.js project)
- `pyproject.toml` / `requirements.txt` - Python dependencies (if Python project)
- `.git/config` - Repository information
- Main source directories
- Any existing documentation

### Project Classification

Based on my analysis, I'll determine:

**Project Type:**
- [ ] Full-stack web application
- [ ] Backend API service
- [ ] Frontend application
- [ ] Library/package
- [ ] CLI tool
- [ ] Data science/ML project
- [ ] DevOps/infrastructure
- [ ] Documentation project
- [ ] Other: _______

**Technology Stack:**
- Languages: [detected]
- Frameworks: [detected]
- Key libraries: [detected]

**Project Scale:**
- [ ] Small (< 10 files)
- [ ] Medium (10-100 files)
- [ ] Large (100-1000 files)
- [ ] Very Large (1000+ files)

**Development Phase:**
- [ ] Greenfield (new project)
- [ ] Active development
- [ ] Maintenance mode
- [ ] Legacy/refactoring

---

## Step 2: Agent Recommendations

Based on the project analysis, here are the agents I recommend having available:

### Essential Agents (Always Recommended)

**Planning & Orchestration:**
- ✅ `planner` - Implementation planning
- ✅ `plan-optimization` - Plan refinement
- ✅ `orchestrator` - Complex task coordination

**Implementation:**
- ✅ `programmer` - Complex implementations
- ✅ `junior-engineer` - Simple tasks
- ✅ `auto-error-resolver` - Fix compilation errors

**Investigation:**
- ✅ `context-engineer` - Codebase exploration
- ✅ `web-research-specialist` - Online research

**Review:**
- ✅ `code-architecture-reviewer` - Code review

### Project-Specific Agents

Based on your project type:

**[If web application]:**
- ✅ `frontend-error-fixer` - Frontend debugging
- ✅ `auth-route-tester` - Route testing
- ✅ `auth-route-debugger` - Auth debugging

**[If documentation-heavy]:**
- ✅ `documentation-architect` - Comprehensive docs
- ✅ `api-documenter` - API documentation
- ✅ `code-commentator` - Code comments

**[If refactoring/legacy]:**
- ✅ `refactor-planner` - Refactoring strategy
- ✅ `code-refactor-master` - Code restructuring
- ✅ `senior-architect` - Architecture review

**[If greenfield/design phase]:**
- ✅ `product-designer` - UX and product design
- ✅ `senior-programmer` - Advanced implementations

---

## Step 3: Command Setup

### Recommended Slash Commands

Based on your project, these commands will be most useful:

**Development Workflow:**
- `/plan` - Create implementation plans
- `/feature` - Feature development lifecycle
- `/which-agent` - Agent selection helper
- `/dev-docs` - Strategic planning
- `/dev-docs-update` - Update documentation

**Quality & Documentation:**
- `/generate-api-docs` - Generate API documentation
- `/validate-docs` - Validate documentation
- `/sync-docs` - Synchronize documentation
- `/generate-readme` - Update README

**Project Management:**
- `/checkpoint` - Document current state
- `/modes` - View available modes
- `/review-mode` - Code review mode

---

## Step 4: Configuration Recommendations

### Git Hooks

Consider setting up these hooks for automated workflows:
- **pre-commit**: Run linting and formatting
- **commit-msg**: Validate commit message format
- **post-commit**: Update documentation

### Skills

Recommended skills based on project type:
- [List will be populated based on project analysis]

### MCP Servers

If you need additional capabilities, consider these MCP servers:
- **Browser tools**: For testing web UIs
- **Database tools**: For database operations
- **File system tools**: For advanced file operations

---

## Step 5: Directory Structure

I recommend creating this structure for organized development:

```
project-root/
├── dev/
│   ├── active/          # Active development tasks
│   ├── completed/       # Completed tasks archive
│   └── SESSION_NOTES.md # Session tracking
├── .claude/
│   ├── agents/          # ✅ Already set up (26 agents)
│   ├── commands/        # ✅ Custom slash commands
│   ├── templates/       # ✅ Document templates
│   └── skills/          # Optional: Project-specific skills
└── docs/
    ├── architecture/    # Architecture decisions
    ├── api/            # API documentation
    └── guides/         # Development guides
```

---

## Step 6: Initialization Summary

### Current State

**Agents Available:** 26 agents across 10 categories
- Orchestration: 1 agent
- Planning: 5 agents
- Implementation: 4 agents
- Investigation: 2 agents
- Review: 2 agents
- Documentation: 5 agents
- Testing: 1 agent
- Debugging: 2 agents
- Refactoring: 1 agent
- Design: 1 agent
- Operations: 1 agent

**Commands Available:** [Count from .claude/commands/]

**Templates Available:** 6 templates
- plan.template.md
- investigation.template.md
- requirements.template.md
- api-endpoint.md
- function-docs.md
- adr-template.md

### Recommended Next Steps

1. **Create dev/ structure** (if it doesn't exist)
2. **Set up SESSION_NOTES.md** for tracking work
3. **Generate initial CLAUDE.md** for the project (if needed)
4. **Configure git hooks** (optional)
5. **Review and customize agents** for project-specific needs

---

## Action Plan

Would you like me to:

1. **Create the recommended directory structure?**
   - dev/active/, dev/completed/, dev/SESSION_NOTES.md

2. **Generate initial project documentation?**
   - CLAUDE.md with project context
   - Architecture overview
   - Development guide

3. **Set up git hooks?**
   - Automated documentation updates
   - Pre-commit checks

4. **Customize agent configurations?**
   - Update agent descriptions for project-specific tasks
   - Add project-specific agents

5. **All of the above?**

---

## Quick Start

If you're ready to start development immediately:

1. Use `/which-agent` to find the right agent for your next task
2. Use `/feature` to start a new feature with guided workflow
3. Use `/plan` to create a detailed implementation plan
4. Check `.claude/agents/README.md` for complete agent guide

---

**What would you like to do?**

- Say "setup all" to create recommended structure
- Say "just summary" to see recommendations without changes
- Say "custom" to pick specific initialization steps
- Ask questions about any recommendations
