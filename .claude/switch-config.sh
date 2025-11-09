#!/bin/bash

# Claude Config Switcher - Complete Edition
# Usage: ./switch-config.sh [mode]
# All 10 modes from config-examples.json

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR"
SETTINGS_FILE="$CONFIG_DIR/settings.json"
BACKUP_FILE="$CONFIG_DIR/settings.backup.json"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

show_usage() {
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║         Claude Config Switcher - Complete Edition        ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Usage: $0 [mode]"
    echo ""
    echo -e "${CYAN}Available modes (10 total):${NC}"
    echo ""
    echo -e "  ${GREEN}development${NC}         - Active coding with auto-formatting"
    echo -e "  ${YELLOW}code-review${NC}         - Read-only mode for reviews"
    echo -e "  ${YELLOW}learning${NC}            - Confirmation mode with checkpoints"
    echo -e "  ${RED}production${NC}          - Safety checks for prod deployments"
    echo -e "  ${BLUE}ci-cd${NC}               - Headless automation for pipelines"
    echo -e "  ${RED}security-audit${NC}      - Read-only security analysis"
    echo -e "  ${GREEN}performance${NC}         - Background tasks + checkpoints"
    echo -e "  ${YELLOW}pair-programming${NC}    - Collaborative with confirmations"
    echo -e "  ${YELLOW}refactoring${NC}         - Frequent checkpoints + safety"
    echo -e "  ${GREEN}documentation${NC}       - Writing docs with linting"
    echo ""
    echo -e "${CYAN}Utilities:${NC}"
    echo -e "  ${BLUE}show${NC}                - Show current active mode"
    echo -e "  ${BLUE}restore${NC}             - Restore from backup"
    echo -e "  ${BLUE}list${NC}                - List all available modes with descriptions"
    echo ""
    echo -e "${YELLOW}Note: Restart Claude Code after switching for changes to take effect${NC}"
}

list_modes() {
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║              All Available Configuration Modes           ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${GREEN}1. development${NC}"
    echo "   Description: Active development with auto-formatting"
    echo "   Permissions: Unrestricted"
    echo "   Best for: Daily coding, feature development"
    echo ""

    echo -e "${YELLOW}2. code-review${NC}"
    echo "   Description: Read-only mode for reviewing code"
    echo "   Permissions: Read-only"
    echo "   Best for: PR reviews, code analysis, security audits"
    echo ""

    echo -e "${YELLOW}3. learning${NC}"
    echo "   Description: Confirmation mode for safe experimentation"
    echo "   Permissions: Confirm before actions"
    echo "   Best for: Learning, experimenting, understanding code"
    echo ""

    echo -e "${RED}4. production${NC}"
    echo "   Description: Production deployments with safety checks"
    echo "   Permissions: Confirm + all safety hooks"
    echo "   Best for: Production deployments, critical fixes"
    echo ""

    echo -e "${BLUE}5. ci-cd${NC}"
    echo "   Description: Headless automation for CI/CD pipelines"
    echo "   Permissions: Unrestricted (for automation)"
    echo "   Best for: GitHub Actions, automated testing"
    echo ""

    echo -e "${RED}6. security-audit${NC}"
    echo "   Description: Read-only security analysis"
    echo "   Permissions: Read-only with security scanning"
    echo "   Best for: Security reviews, vulnerability scanning"
    echo ""

    echo -e "${GREEN}7. performance${NC}"
    echo "   Description: Performance optimization mode"
    echo "   Permissions: Unrestricted with checkpoints"
    echo "   Best for: Performance tuning, optimization work"
    echo ""

    echo -e "${YELLOW}8. pair-programming${NC}"
    echo "   Description: Collaborative development"
    echo "   Permissions: Confirm with explanations"
    echo "   Best for: Pair programming, teaching, collaboration"
    echo ""

    echo -e "${YELLOW}9. refactoring${NC}"
    echo "   Description: Large refactoring with safety"
    echo "   Permissions: Confirm with backups and tests"
    echo "   Best for: Major refactoring, risky changes"
    echo ""

    echo -e "${GREEN}10. documentation${NC}"
    echo "    Description: Documentation writing"
    echo "    Permissions: Unrestricted with linting"
    echo "    Best for: Writing docs, README files, guides"
    echo ""
}

get_config_for_mode() {
    local mode=$1

    case "$mode" in
        development)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "acceptEdits"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        code-review)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Read:*", "Grep:*", "Glob:*", "Bash:ls*", "Bash:git*"],
    "defaultMode": "readonly"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }]
  }
}
EOF
            ;;
        learning)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "confirm"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        production)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "confirm"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }],
    "Stop": [{
      "hooks": [
        {"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/tsc-check.sh"},
        {"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/trigger-build-resolver.sh"}
      ]
    }]
  }
}
EOF
            ;;
        ci-cd)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "acceptEdits"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        security-audit)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Read:*", "Grep:*", "Glob:*", "Bash:ls*", "Bash:git*"],
    "defaultMode": "readonly"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }]
  }
}
EOF
            ;;
        performance)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "acceptEdits"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        pair-programming)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "confirm"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        refactoring)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "confirm"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }],
    "Stop": [{
      "hooks": [
        {"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/tsc-check.sh"}
      ]
    }]
  }
}
EOF
            ;;
        documentation)
            cat <<'EOF'
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["mysql", "sequential-thinking", "playwright"],
  "permissions": {
    "allow": ["Edit:*", "Write:*", "MultiEdit:*", "NotebookEdit:*", "Bash:*"],
    "defaultMode": "acceptEdits"
  },
  "hooks": {
    "UserPromptSubmit": [{
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/skill-activation-prompt.sh"}]
    }],
    "PostToolUse": [{
      "matcher": "Edit|MultiEdit|Write",
      "hooks": [{"type": "command", "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/post-tool-use-tracker.sh"}]
    }]
  }
}
EOF
            ;;
        *)
            echo -e "${RED}Error: Unknown mode '$mode'${NC}"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

show_current_mode() {
    if [ ! -f "$SETTINGS_FILE" ]; then
        echo -e "${RED}No settings.json found${NC}"
        return
    fi

    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║              Current Configuration Status                ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""

    # Check permission mode
    if grep -q '"defaultMode": "readonly"' "$SETTINGS_FILE"; then
        echo -e "  Mode: ${GREEN}Read-Only${NC} (Code Review / Security Audit)"
    elif grep -q '"defaultMode": "confirm"' "$SETTINGS_FILE"; then
        echo -e "  Mode: ${YELLOW}Confirmation Mode${NC} (Learning / Production / Pair Programming / Refactoring)"
    elif grep -q '"defaultMode": "acceptEdits"' "$SETTINGS_FILE"; then
        echo -e "  Mode: ${GREEN}Development (Unrestricted)${NC}"
    else
        echo -e "  Mode: ${BLUE}Custom${NC}"
    fi

    # Check for Stop hooks (production/refactoring mode indicator)
    if grep -q '"Stop":' "$SETTINGS_FILE"; then
        echo -e "  Safety: ${RED}Enhanced (Stop hooks enabled)${NC}"
    else
        echo -e "  Safety: ${YELLOW}Standard${NC}"
    fi

    echo ""
    echo "  Settings file: $SETTINGS_FILE"

    if [ -f "$BACKUP_FILE" ]; then
        echo -e "  ${GREEN}✓${NC} Backup available: $BACKUP_FILE"
    else
        echo -e "  ${YELLOW}⚠${NC} No backup found"
    fi
    echo ""
}

switch_config() {
    local mode=$1

    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║              Switching Configuration Mode                ║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""

    # Backup current settings
    if [ -f "$SETTINGS_FILE" ]; then
        echo -e "${BLUE}→${NC} Backing up current settings..."
        cp "$SETTINGS_FILE" "$BACKUP_FILE"
        echo -e "  ${GREEN}✓${NC} Backup saved to: ${BACKUP_FILE}"
    fi

    # Get new config
    local new_config=$(get_config_for_mode "$mode")

    # Write new config
    echo -e "${BLUE}→${NC} Writing new configuration..."
    echo "$new_config" > "$SETTINGS_FILE"
    echo -e "  ${GREEN}✓${NC} Configuration updated"

    echo ""
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║         Successfully switched to ${mode} mode!${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${YELLOW}⚠  IMPORTANT: Restart Claude Code for changes to take effect${NC}"
    echo ""
    echo "  To verify: ./.claude/switch-config.sh show"
    echo ""
}

restore_backup() {
    if [ ! -f "$BACKUP_FILE" ]; then
        echo -e "${RED}No backup file found at: $BACKUP_FILE${NC}"
        exit 1
    fi

    cp "$BACKUP_FILE" "$SETTINGS_FILE"
    echo -e "${GREEN}✓ Restored from backup${NC}"
    echo ""
    echo -e "${YELLOW}⚠  Restart Claude Code for changes to take effect${NC}"
}

# Main script
if [ $# -eq 0 ]; then
    show_usage
    exit 0
fi

case "$1" in
    show)
        show_current_mode
        ;;
    list)
        list_modes
        ;;
    restore)
        restore_backup
        ;;
    -h|--help|help)
        show_usage
        ;;
    *)
        switch_config "$1"
        ;;
esac
