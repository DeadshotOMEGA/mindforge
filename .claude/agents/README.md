# Agent System Guide

**Last Updated:** 2025-11-08

## Overview

This directory contains **26 specialized agents** organized into **10 categories**. Each agent has a specific purpose and expertise level to handle different types of tasks efficiently.

**Key Principle:** Use the right agent for the right task. Specialized agents maintain focused context and deliver better results than trying to handle everything in the main conversation.

---

## Quick Reference Table

| Category | Agents | When to Use |
|----------|--------|-------------|
| **Orchestration** | orchestrator | Large multi-phase tasks requiring coordination |
| **Planning** | planner, plan-optimization, plan-reviewer, refactor-planner | Creating implementation plans, task breakdown |
| **Implementation** | programmer, junior-engineer, senior-programmer, auto-error-resolver | Writing code (simple to complex) |
| **Investigation** | context-engineer, web-research-specialist | Exploring codebases, researching patterns |
| **Review** | senior-architect, code-architecture-reviewer | Code review, architectural validation |
| **Documentation** | library-docs-writer, documentation-architect, api-documenter, code-commentator, example-generator | Writing docs, comments, examples |
| **Testing** | auth-route-tester | Testing route functionality |
| **Debugging** | auth-route-debugger, frontend-error-fixer | Investigating and fixing bugs |
| **Refactoring** | code-refactor-master | Improving code structure |
| **Design** | product-designer | Product design, UX decisions |
| **Operations** | non-dev | Operational tasks, analysis |

---

## Category Details

### 🎯 Orchestration

**Purpose:** Coordinate large, complex tasks by delegating to specialized agents

**Agents:**
- **orchestrator** - Manages multi-phase workflows (investigation → planning → implementation → validation)

**When to use:**
- Large, vague tasks requiring decomposition
- Tasks spanning 15+ files or multiple features
- Full feature lifecycle with unknowns
- Work requiring coordinated phases across multiple agents

**When NOT to use:**
- Well-scoped tasks with clear implementation path
- Single-phase work
- Tasks you can handle directly

**Example:** "Find all code smells in the codebase and implement refactors"

---

### 📋 Planning

**Purpose:** Create detailed implementation plans and task breakdowns

**Agents:**
- **planner** - Creates structured implementation plans from requirements
- **plan-optimization** - Optimizes development plans for TDD, context preservation
- **plan-reviewer** - Reviews plans before implementation to identify issues
- **refactor-planner** - Analyzes code and creates refactoring plans

**When to use:**
- Complex features needing task breakdown
- Before starting major refactoring work
- When you want a roadmap before coding
- To ensure all considerations are captured

**Example:** "Create a plan for implementing user authentication with social login"

---

### 💻 Implementation

**Purpose:** Write code at varying complexity levels

**Agents:**
- **programmer** - Complex 3+ file implementations requiring architectural decisions
- **junior-engineer** - Simple well-specified tasks following existing patterns
- **senior-programmer** - Advanced complex implementations with high technical complexity
- **auto-error-resolver** - Automatically fixes TypeScript compilation errors

**When to use:**
- **programmer**: Multi-file features, needs pattern analysis
- **junior-engineer**: Adding endpoints, simple components, following existing patterns
- **senior-programmer**: Complex algorithms, performance-critical code, advanced patterns
- **auto-error-resolver**: TypeScript build errors need fixing

**Example (programmer):** "Implement payment processing flow across API, services, and UI"
**Example (junior-engineer):** "Add a new GET /users/:id endpoint following existing patterns"

---

### 🔍 Investigation

**Purpose:** Explore codebases, discover patterns, research information

**Agents:**
- **context-engineer** - Codebase exploration, pattern discovery, flow tracing
- **web-research-specialist** - Research technical information online

**When to use:**
- Unfamiliar code areas requiring understanding
- Finding all instances of a pattern
- Researching libraries or best practices
- Understanding data flows

**Example:** "Find all validation logic across the codebase"

---

### 🔎 Review

**Purpose:** Code review, architectural validation, quality assurance

**Agents:**
- **senior-architect** - Architectural guidance and high-level design review
- **code-architecture-reviewer** - Reviews code for best practices and system integration

**When to use:**
- After implementing complex features
- Want second opinion on approach
- Ensure code follows project patterns
- Architectural decisions need validation

**Example:** "Review the new authentication system for security and best practices"

---

### 📚 Documentation

**Purpose:** Write documentation, comments, API docs, examples

**Agents:**
- **library-docs-writer** - External library documentation research
- **documentation-architect** - Comprehensive documentation creation and maintenance
- **api-documenter** - API endpoint documentation specialist
- **code-commentator** - Code comment improvements
- **example-generator** - Code example creation

**When to use:**
- Need API documentation generated
- Want comprehensive project documentation
- Researching how to use external libraries
- Creating code examples for tutorials

**Example:** "Generate API documentation for all /api/users endpoints"

---

### 🧪 Testing

**Purpose:** Test functionality and verify implementations

**Agents:**
- **auth-route-tester** - Tests authenticated routes after implementation

**When to use:**
- After implementing or modifying routes
- Need to verify route creates records correctly
- Want to test full route functionality

**Example:** "Test the new POST /form/submit route to ensure it creates submissions"

---

### 🐛 Debugging

**Purpose:** Investigate and fix bugs

**Agents:**
- **auth-route-debugger** - Debug authentication issues, 401/403 errors, cookie problems
- **frontend-error-fixer** - Fix frontend TypeScript, build, and runtime errors

**When to use:**
- 401/403 errors on authenticated routes
- Frontend build failing with errors
- Runtime errors in browser console
- Cookie/JWT authentication issues

**Example:** "I'm getting a 401 error on /api/workflow/123 even though I'm logged in"

---

### ♻️ Refactoring

**Purpose:** Improve code structure and quality

**Agents:**
- **code-refactor-master** - Comprehensive refactoring for better organization

**When to use:**
- Reorganizing file structures
- Breaking down large components
- Improving code maintainability
- Fixing loading indicator patterns

**Example:** "Refactor the Dashboard component - it's over 2000 lines"

---

### 🎨 Design

**Purpose:** Product design and UX decisions

**Agents:**
- **product-designer** - Product design and user experience guidance

**When to use:**
- Need UX input on features
- Designing user workflows
- Product design decisions

**Example:** "Design the user flow for the checkout process"

---

### ⚙️ Operations

**Purpose:** Operational tasks, analysis, coordination

**Agents:**
- **non-dev** - Operational tasks, analysis, planning, non-coding coordination

**When to use:**
- Operational tasks without code changes
- Analysis and planning without implementation
- Coordination work

**Example:** "Analyze our current deployment process and identify improvements"

---

## Agent Selection Decision Tree

```
START: What type of task do you have?

├─ Is it a LARGE, VAGUE, MULTI-PHASE task?
│  └─ YES → Use `orchestrator` (orchestration/)
│
├─ Do you need a PLAN before implementing?
│  ├─ YES → Use `planner` or `plan-optimization` (planning/)
│  └─ Is it specifically for REFACTORING?
│     └─ YES → Use `refactor-planner` (planning/)
│
├─ Do you need to EXPLORE/UNDERSTAND code?
│  ├─ YES → Use `context-engineer` (investigation/)
│  └─ Is it EXTERNAL research/libraries?
│     └─ YES → Use `web-research-specialist` (investigation/)
│
├─ Do you need to WRITE CODE?
│  ├─ SIMPLE task, clear patterns → `junior-engineer` (implementation/)
│  ├─ COMPLEX 3+ files → `programmer` (implementation/)
│  ├─ ADVANCED complex logic → `senior-programmer` (implementation/)
│  └─ TypeScript ERRORS → `auto-error-resolver` (implementation/)
│
├─ Do you need CODE REVIEW?
│  ├─ Architecture review → `senior-architect` (review/)
│  └─ Best practices → `code-architecture-reviewer` (review/)
│
├─ Do you need DOCUMENTATION?
│  ├─ API docs → `api-documenter` (documentation/)
│  ├─ Full project docs → `documentation-architect` (documentation/)
│  ├─ Library research → `library-docs-writer` (documentation/)
│  ├─ Code comments → `code-commentator` (documentation/)
│  └─ Examples → `example-generator` (documentation/)
│
├─ Do you need to TEST something?
│  └─ Routes → `auth-route-tester` (testing/)
│
├─ Do you need to DEBUG?
│  ├─ Auth/route issues → `auth-route-debugger` (debugging/)
│  └─ Frontend errors → `frontend-error-fixer` (debugging/)
│
└─ Do you need to REFACTOR?
   └─ YES → `code-refactor-master` (refactoring/)
```

---

## Delegation Patterns

### Pattern 1: Investigation → Planning → Implementation

**Best for:** New features with unknowns

```
1. orchestrator
   ├─ context-engineer (parallel investigations)
   ├─ context-engineer
   └─ context-engineer
2. Wait for investigations
3. planner (synthesize findings)
4. Wait for plan
5. programmer/junior-engineer (implement in parallel)
6. senior-architect (validate)
```

### Pattern 2: Direct Implementation

**Best for:** Well-understood tasks

```
1. programmer or junior-engineer (depending on complexity)
2. auth-route-tester (if it's a route)
```

### Pattern 3: Refactoring

**Best for:** Code improvement tasks

```
1. refactor-planner (analyze and plan)
2. code-refactor-master (execute refactoring)
3. code-architecture-reviewer (validate)
```

### Pattern 4: Bug Fixing

**Best for:** Debugging issues

```
1. auth-route-debugger or frontend-error-fixer (diagnose)
2. programmer or junior-engineer (fix)
3. auth-route-tester (verify fix)
```

---

## Usage Tips

### Parallel vs Sequential

**Parallel agents** (spawn multiple at once):
- Independent investigations
- Independent implementations
- No shared dependencies

**Sequential agents** (wait for completion):
- Results inform next step
- Building on previous work
- Shared dependencies

### Agent Prompts

**Good agent prompts include:**
- Clear task description
- Files to read for patterns
- Expected output format
- Success criteria

**Example:**
```
Task: Create payment API endpoints
- Read types/payment.ts for PaymentIntent interface
- Follow patterns in api/orders.ts for consistency
- Implement POST /api/payments/create and GET /api/payments/:id
- Include proper error handling and validation
```

### Monitoring Agents

Agents run asynchronously and write to `agent-responses/{agent_id}.md`

**Use `./agent-responses/await {agent_id}`** when you need results before proceeding

---

## Examples

### Example 1: New Feature Implementation

**Task:** "Add user profile editing functionality"

**Approach:**
1. Use `planner` to create implementation plan
2. Use `programmer` to implement backend API
3. Use `programmer` to implement frontend UI
4. Use `auth-route-tester` to verify routes work
5. Use `code-architecture-reviewer` to review implementation

### Example 2: Bug Investigation

**Task:** "Users can't log in - getting 401 errors"

**Approach:**
1. Use `auth-route-debugger` to investigate authentication flow
2. Use `programmer` to fix identified issues
3. Use `auth-route-tester` to verify fix works

### Example 3: Large Refactoring

**Task:** "Refactor authentication system to modern patterns"

**Approach:**
1. Use `context-engineer` to analyze current auth system
2. Use `refactor-planner` to create refactoring strategy
3. Use `orchestrator` to coordinate multi-phase refactoring
4. Use `code-architecture-reviewer` to validate final result

---

## Agent Locations

All agents are organized by category:

```
.claude/agents/
├── orchestration/orchestrator.md
├── planning/{planner, plan-optimization, plan-reviewer, refactor-planner, plan-patterns}.md
├── implementation/{programmer, junior-engineer, senior-programmer, auto-error-resolver}.md
├── investigation/{context-engineer, web-research-specialist}.md
├── review/{senior-architect, code-architecture-reviewer}.md
├── documentation/{library-docs-writer, documentation-architect, api-documenter, code-commentator, example-generator}.md
├── testing/auth-route-tester.md
├── debugging/{auth-route-debugger, frontend-error-fixer}.md
├── refactoring/code-refactor-master.md
├── design/product-designer.md
└── operations/non-dev.md
```

---

## Getting Started

**Not sure which agent to use?**

1. Check the decision tree above
2. Look at the quick reference table
3. Read the category that matches your task
4. When in doubt, start with `orchestrator` for complex tasks or `planner` for clarity

**Need help?**
- Consult this README
- Use the decision tree
- Ask Claude for agent recommendations
