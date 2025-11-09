# Claude Code Infrastructure Showcase

**A curated reference library of production-tested Claude Code infrastructure.**

Born from 6 months of real-world use managing a complex TypeScript microservices project, this showcase provides the patterns and systems that solved the "skills don't activate automatically" problem and scaled Claude Code for enterprise development.

> **This is NOT a working application** - it's a reference library. Copy what you need into your own projects.

---

## What's Inside

**Production-tested infrastructure for:**
- ✅ **Auto-activating skills** via hooks
- ✅ **Modular skill pattern** (500-line rule with progressive disclosure)
- ✅ **Specialized agents** for complex tasks
- ✅ **Dev docs system** that survives context resets
- ✅ **Comprehensive examples** using generic blog domain

**Time investment to build:** 6 months of iteration
**Time to integrate into your project:** 15-30 minutes

---

## Quick Start - Pick Your Path

### 🤖 Using Claude Code to Integrate?

**Claude:** Read [`CLAUDE_INTEGRATION_GUIDE.md`](CLAUDE_INTEGRATION_GUIDE.md) for step-by-step integration instructions tailored for AI-assisted setup.

### 🎯 I want skill auto-activation

**The breakthrough feature:** Skills that actually activate when you need them.

**What you need:**
1. The skill-activation hooks (2 files)
2. A skill or two relevant to your work
3. 15 minutes

**👉 [Setup Guide: .claude/hooks/README.md](.claude/hooks/README.md)**

### 📚 I want to add ONE skill

Browse the [skills catalog](.claude/skills/) and copy what you need.

**Available:**
- **backend-dev-guidelines** - Node.js/Express/TypeScript patterns
- **frontend-dev-guidelines** - React/TypeScript/MUI v7 patterns
- **skill-developer** - Meta-skill for creating skills
- **route-tester** - Test authenticated API routes
- **error-tracking** - Sentry integration patterns

**👉 [Skills Guide: .claude/skills/README.md](.claude/skills/README.md)**

### 🤖 I want specialized agents

26 production-tested agents organized in 10 categories:
- **Orchestration** - Complex task coordination
- **Planning** - Implementation planning and strategy
- **Implementation** - Code writing (simple to advanced)
- **Investigation** - Codebase exploration and research
- **Review** - Code review and architectural validation
- **Documentation** - Comprehensive documentation generation
- **Testing** - Route and functionality testing
- **Debugging** - Error investigation and fixing
- **Refactoring** - Code structure improvement
- **Design** - Product and UX design

**👉 [Agents Guide: .claude/agents/README.md](.claude/agents/README.md)**

---

## What Makes This Different?

### The Auto-Activation Breakthrough

**Problem:** Claude Code skills just sit there. You have to remember to use them.

**Solution:** UserPromptSubmit hook that:
- Analyzes your prompts
- Checks file context
- Automatically suggests relevant skills
- Works via `skill-rules.json` configuration

**Result:** Skills activate when you need them, not when you remember them.

### Production-Tested Patterns

These aren't theoretical examples - they're extracted from:
- ✅ 6 microservices in production
- ✅ 50,000+ lines of TypeScript
- ✅ React frontend with complex data grids
- ✅ Sophisticated workflow engine
- ✅ 6 months of daily Claude Code use

The patterns work because they solved real problems.

### Modular Skills (500-Line Rule)

Large skills hit context limits. The solution:

```
skill-name/
  SKILL.md                  # <500 lines, high-level guide
  resources/
    topic-1.md              # <500 lines each
    topic-2.md
    topic-3.md
```

**Progressive disclosure:** Claude loads main skill first, loads resources only when needed.

---

## Repository Structure

```
.claude/
├── skills/                 # 5 production skills
│   ├── backend-dev-guidelines/  (12 resource files)
│   ├── frontend-dev-guidelines/ (11 resource files)
│   ├── skill-developer/         (7 resource files)
│   ├── route-tester/
│   ├── error-tracking/
│   └── skill-rules.json    # Skill activation configuration
├── hooks/                  # 6 hooks for automation
│   ├── skill-activation-prompt.*  (ESSENTIAL)
│   ├── post-tool-use-tracker.sh   (ESSENTIAL)
│   ├── tsc-check.sh        (optional, needs customization)
│   └── trigger-build-resolver.sh  (optional)
├── agents/                 # 26 specialized agents in 10 categories
│   ├── orchestration/      # 1 agent
│   ├── planning/           # 5 agents
│   ├── implementation/     # 4 agents
│   ├── investigation/      # 2 agents
│   ├── review/             # 2 agents
│   ├── documentation/      # 5 agents
│   ├── testing/            # 1 agent
│   ├── debugging/          # 2 agents
│   ├── refactoring/        # 1 agent
│   ├── design/             # 1 agent
│   ├── operations/         # 1 agent
│   └── README.md           # Comprehensive agent guide
├── commands/               # 15 slash commands
│   ├── session-start.md    (NEW - replaces dev-docs & plan)
│   ├── session-update.md   (NEW - replaces dev-docs-update)
│   ├── session-end.md      (NEW - complete workflow)
│   ├── feature.md
│   ├── debug-issue.md
│   ├── which-agent.md
│   └── ...
├── commands_archive/       # Deprecated commands (backward compatible)
│   ├── dev-docs.md
│   ├── dev-docs-update.md
│   ├── plan.md
│   └── README.md          (migration guide)
└── templates/              # 6 document templates
    ├── plan.template.md
    ├── investigation.template.md
    ├── requirements.template.md
    └── ...

dev/
├── active/                 # Current work (in memory)
│   ├── session-management-improvements/
│   └── README.md
├── completed/              # Recent work (~30 days, condensed memory)
│   ├── sessions/2025-11-08/
│   ├── tasks/
│   └── README.md
├── archived/               # Historical (out of memory, long-term)
│   ├── sessions/
│   ├── tasks/
│   └── README.md
├── SESSION_NOTES.md        # Current session tracking
├── MIGRATION_GUIDE.md      # Old → New commands migration
└── README.md               # Dev docs & session management guide
```

---

## Component Catalog

### 🎨 Skills (5)

| Skill | Lines | Purpose | Best For |
|-------|-------|---------|----------|
| [**skill-developer**](.claude/skills/skill-developer/) | 426 | Creating and managing skills | Meta-development |
| [**backend-dev-guidelines**](.claude/skills/backend-dev-guidelines/) | 304 | Express/Prisma/Sentry patterns | Backend APIs |
| [**frontend-dev-guidelines**](.claude/skills/frontend-dev-guidelines/) | 398 | React/MUI v7/TypeScript | React frontends |
| [**route-tester**](.claude/skills/route-tester/) | 389 | Testing authenticated routes | API testing |
| [**error-tracking**](.claude/skills/error-tracking/) | ~250 | Sentry integration | Error monitoring |

**All skills follow the modular pattern** - main file + resource files for progressive disclosure.

**👉 [How to integrate skills →](.claude/skills/README.md)**

### 🪝 Hooks (7)

| Hook | Type | Essential? | Customization |
|------|------|-----------|---------------|
| skill-activation-prompt | UserPromptSubmit | ✅ YES | ✅ None needed |
| **git-hook** | **UserPromptSubmit** | **✅ Recommended** | **✅ None needed** |
| post-tool-use-tracker | PostToolUse | ✅ YES | ✅ None needed (jq-optional) |
| tsc-check | Stop | ⚠️ Optional | ⚠️ Heavy - monorepo only |
| trigger-build-resolver | Stop | ⚠️ Optional | ⚠️ Heavy - monorepo only |
| error-handling-reminder | Stop | ⚠️ Optional | ⚠️ Moderate |
| stop-build-check-enhanced | Stop | ⚠️ Optional | ⚠️ Moderate |

**Start with the three core hooks** - skill activation, git context injection, and file tracking work out of the box.

**New: Git Hook** - Type `/git` to inject full git context (status, diffs, commit history) for fast commit messages and change reviews.

**👉 [Hook setup guide →](.claude/hooks/README.md)**

### 🤖 Agents (26)

**Organized by category - includes decision trees and delegation patterns!**

| Category | Count | Key Agents | Use Cases |
|----------|-------|------------|-----------|
| **Orchestration** | 1 | orchestrator | Large multi-phase tasks |
| **Planning** | 5 | planner, plan-optimization, refactor-planner | Implementation planning, task breakdown |
| **Implementation** | 4 | programmer, junior-engineer, senior-programmer | Code writing (simple to advanced) |
| **Investigation** | 2 | context-engineer, web-research-specialist | Codebase exploration, research |
| **Review** | 2 | senior-architect, code-architecture-reviewer | Code review, architectural validation |
| **Documentation** | 5 | documentation-architect, api-documenter | Comprehensive documentation |
| **Testing** | 1 | auth-route-tester | Route functionality testing |
| **Debugging** | 2 | auth-route-debugger, frontend-error-fixer | Error investigation and fixing |
| **Refactoring** | 1 | code-refactor-master | Code structure improvement |
| **Design** | 1 | product-designer | Product and UX design |
| **Operations** | 1 | non-dev | Operational tasks and analysis |

**Features:**
- ✅ Categorical organization for easy discovery
- ✅ Decision tree for agent selection
- ✅ Delegation patterns for complex workflows
- ✅ Usage examples for each agent
- ✅ 440-line comprehensive guide

**👉 [Complete agent guide with decision trees →](.claude/agents/README.md)**

### 💬 Slash Commands (15)

| Command | Purpose | Category |
|---------|---------|----------|
| **🆕 /session-start** | **Create new task structure (Quick + Plan modes)** | **Session Management** |
| **🆕 /session-update** | **Update docs with smart git detection** | **Session Management** |
| **🆕 /session-end** | **Archive completed work automatically** | **Session Management** |
| /feature | Complete feature development lifecycle | Workflow |
| /debug-issue | Track, investigate, and debug errors systematically | Debugging |
| /which-agent | Interactive agent selection helper | Utility |
| /init-workspace | Initialize Claude Code environment | Setup |
| /generate-api-docs | Generate API documentation | Documentation |
| /generate-readme | Update project README | Documentation |
| /sync-docs | Synchronize documentation with code | Documentation |
| /validate-docs | Validate documentation completeness | Documentation |
| /route-research-for-testing | Research route patterns for testing | Testing |
| /checkpoint | Create development checkpoint | Project Management |
| /modes | Show available configuration modes | Utility |

**⚠️ Archived Commands (Deprecated):**
- `/dev-docs` → Use `/session-start` (Quick Mode)
- `/plan` → Use `/session-start --plan` (Plan Mode)
- `/dev-docs-update` → Use `/session-update`

See `dev/MIGRATION_GUIDE.md` for full migration details.

---

## Key Concepts

### Hooks + skill-rules.json = Auto-Activation

**The system:**
1. **skill-activation-prompt hook** runs on every user prompt
2. Checks **skill-rules.json** for trigger patterns
3. Suggests relevant skills automatically
4. Skills load only when needed

**This solves the #1 problem** with Claude Code skills: they don't activate on their own.

### Progressive Disclosure (500-Line Rule)

**Problem:** Large skills hit context limits

**Solution:** Modular structure
- Main SKILL.md <500 lines (overview + navigation)
- Resource files <500 lines each (deep dives)
- Claude loads incrementally as needed

**Example:** backend-dev-guidelines has 12 resource files covering routing, controllers, services, repositories, testing, etc.

### Unified Session Management

**Problem:** Context resets lose project context, no clear workflow lifecycle

**Solution:** Three-tier system with complete workflow
- **Active** (`dev/active/`) - Current work, full context
- **Completed** (`dev/completed/`) - Recent work (~30 days), condensed
- **Archived** (`dev/archived/`) - Historical, long-term storage

**Three-file task structure:**
- `[task]-plan.md` - Strategic plan
- `[task]-context.md` - Key decisions and files
- `[task]-tasks.md` - Checklist format

**Complete workflow:**
```bash
/session-start "task-name"    # Create structure (Quick or Plan mode)
/session-update               # Update with smart git detection
/session-end                  # Archive to completed/
```

**Features:**
- Smart detection via git integration
- Automatic archival with metadata
- Three-tier memory management
- Complete lifecycle from start to archive

**Replaces:** `/dev-docs`, `/plan`, `/dev-docs-update` (now in `commands_archive/`)

**See:** `dev/README.md` for complete documentation

---

## ⚠️ Important: What Won't Work As-Is

### settings.json
The included `settings.json` is an **example only**:
- Stop hooks reference specific monorepo structure
- Service names (blog-api, etc.) are examples
- MCP servers may not exist in your setup

**To use it:**
1. Extract ONLY UserPromptSubmit and PostToolUse hooks
2. Customize or skip Stop hooks
3. Update MCP server list for your setup

### Blog Domain Examples
Skills use generic blog examples (Post/Comment/User):
- These are **teaching examples**, not requirements
- Patterns work for any domain (e-commerce, SaaS, etc.)
- Adapt the patterns to your business logic

### Hook Directory Structures
Some hooks expect specific structures:
- `tsc-check.sh` expects service directories
- Customize based on YOUR project layout

---

## Integration Workflow

**Recommended approach:**

### Phase 1: Skill Activation (15 min)
1. Copy skill-activation-prompt hook
2. Copy post-tool-use-tracker hook
3. Update settings.json
4. Install hook dependencies

### Phase 2: Add First Skill (10 min)
1. Pick ONE relevant skill
2. Copy skill directory
3. Create/update skill-rules.json
4. Customize path patterns

### Phase 3: Test & Iterate (5 min)
1. Edit a file - skill should activate
2. Ask a question - skill should be suggested
3. Add more skills as needed

### Phase 4: Optional Enhancements
- Add agents you find useful
- Add slash commands
- Customize Stop hooks (advanced)

---

## Getting Help

### For Users
**Issues with integration?**
1. Check [CLAUDE_INTEGRATION_GUIDE.md](CLAUDE_INTEGRATION_GUIDE.md)
2. Ask Claude: "Why isn't [skill] activating?"
3. Open an issue with your project structure

### For Claude Code
When helping users integrate:
1. **Read CLAUDE_INTEGRATION_GUIDE.md FIRST**
2. Ask about their project structure
3. Customize, don't blindly copy
4. Verify after integration

---

## What This Solves

### Before This Infrastructure

❌ Skills don't activate automatically
❌ Have to remember which skill to use
❌ Large skills hit context limits
❌ Context resets lose project knowledge
❌ No consistency across development
❌ Manual agent invocation every time

### After This Infrastructure

✅ Skills suggest themselves based on context
✅ Hooks trigger skills at the right time
✅ Modular skills stay under context limits
✅ Dev docs preserve knowledge across resets
✅ Consistent patterns via guardrails
✅ Agents streamline complex tasks

---

## Community

**Found this useful?**

- ⭐ Star this repo
- 🐛 Report issues or suggest improvements
- 💬 Share your own skills/hooks/agents
- 📝 Contribute examples from your domain

**Background:**
This infrastructure was detailed in a post I made to Reddit ["Claude Code is a Beast – Tips from 6 Months of Hardcore Use"](https://www.reddit.com/r/ClaudeAI/comments/1oivjvm/claude_code_is_a_beast_tips_from_6_months_of/). After hundreds of requests, this showcase was created to help the community implement these patterns.


---

## License

MIT License - Use freely in your projects, commercial or personal.

---

## Quick Links

- 📖 [Claude Integration Guide](CLAUDE_INTEGRATION_GUIDE.md) - For AI-assisted setup
- 🎨 [Skills Documentation](.claude/skills/README.md)
- 🪝 [Hooks Setup](.claude/hooks/README.md)
- 🤖 [Agents Guide](.claude/agents/README.md)
- 📝 [Dev Docs Pattern](dev/README.md)

**Start here:** Copy the two essential hooks, add one skill, and see the auto-activation magic happen.
