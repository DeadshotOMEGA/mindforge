#!/usr/bin/env node

/**
 * Commit Aggregator - Scans /dev/completed/ and aggregates session/task data
 *
 * Usage:
 *   node commit-aggregator.js [baseDir]
 *   baseDir: Path to dev directory (default: ./dev)
 *
 * Returns JSON with aggregated data for PR/commit generation
 */

const fs = require('fs');
const path = require('path');

class CommitAggregator {
  constructor(baseDir = './dev') {
    this.baseDir = baseDir;
    this.completedDir = path.join(baseDir, 'completed');
    this.activeDIr = path.join(baseDir, 'active');
    this.data = {
      sessions: [],
      tasks: [],
      totalTasksCompleted: 0,
      totalFilesChanged: 0,
      totalLinesAdded: 0,
      totalLinesRemoved: 0,
      completedDate: new Date().toISOString(),
      summary: ''
    };
  }

  /**
   * Main entry point - aggregate all data
   */
  aggregate() {
    // Check if active dir has tasks
    if (this.hasActiveTasks()) {
      throw new Error('Cannot commit: /dev/active/ contains active tasks. Please complete all sessions first.');
    }

    // Scan sessions
    this.scanSessions();

    // Scan tasks
    this.scanTasks();

    // Generate summary
    this.generateSummary();

    return this.data;
  }

  /**
   * Check if /dev/active/ has any tasks
   */
  hasActiveTasks() {
    try {
      if (!fs.existsSync(this.activeDIr)) {
        return false;
      }

      const entries = fs.readdirSync(this.activeDIr, { withFileTypes: true });
      return entries.some(entry => entry.isDirectory() && !entry.name.startsWith('.'));
    } catch (error) {
      return false;
    }
  }

  /**
   * Scan all completed sessions
   */
  scanSessions() {
    const sessionsDir = path.join(this.completedDir, 'sessions');

    if (!fs.existsSync(sessionsDir)) {
      return;
    }

    const sessionFolders = fs.readdirSync(sessionsDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .sort((a, b) => b.name.localeCompare(a.name)); // Most recent first

    for (const folder of sessionFolders) {
      const sessionPath = path.join(sessionsDir, folder.name);
      const notesPath = path.join(sessionPath, 'SESSION_NOTES.md');
      const metadataPath = path.join(sessionPath, '.metadata.json');

      if (fs.existsSync(notesPath)) {
        const sessionData = this.parseSession(folder.name, notesPath, metadataPath);
        if (sessionData) {
          this.data.sessions.push(sessionData);
        }
      }
    }
  }

  /**
   * Parse individual session
   */
  parseSession(folderName, notesPath, metadataPath) {
    try {
      const notes = fs.readFileSync(notesPath, 'utf-8');
      let metadata = {};

      if (fs.existsSync(metadataPath)) {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      }

      // Extract session name from folder: YYYY-MM-DD_HHmmss-session-name
      const sessionName = folderName.split('-').slice(1).join('-') || 'session';
      const timestamp = folderName.split('_')[1]?.split('-')[0] || '';

      return {
        folderName,
        sessionName,
        timestamp,
        filesModified: metadata.filesModifiedTotal || this.countFilesModified(notes),
        tasksCompleted: metadata.tasksCompleted || this.countCompletedTasks(notes),
        duration: metadata.duration || 'unknown',
        summary: this.extractSessionSummary(notes),
        completedDate: metadata.completedDate || new Date().toISOString(),
        path: `dev/completed/sessions/${folderName}`
      };
    } catch (error) {
      console.error(`Error parsing session ${folderName}:`, error.message);
      return null;
    }
  }

  /**
   * Scan all completed tasks
   */
  scanTasks() {
    const tasksDir = path.join(this.completedDir, 'tasks');

    if (!fs.existsSync(tasksDir)) {
      return;
    }

    const taskFolders = fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .sort((a, b) => b.name.localeCompare(a.name)); // Most recent first

    for (const folder of taskFolders) {
      const taskPath = path.join(tasksDir, folder.name);
      const taskData = this.parseTask(folder.name, taskPath);
      if (taskData) {
        this.data.tasks.push(taskData);
        this.data.totalTasksCompleted++;
        this.data.totalFilesChanged += taskData.filesModified;
      }
    }
  }

  /**
   * Parse individual task
   */
  parseTask(taskName, taskPath) {
    try {
      const planPath = path.join(taskPath, `${taskName}-plan.md`);
      const contextPath = path.join(taskPath, `${taskName}-context.md`);
      const tasksPath = path.join(taskPath, `${taskName}-tasks.md`);
      const metadataPath = path.join(taskPath, '.metadata.json');

      let metadata = {};
      if (fs.existsSync(metadataPath)) {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      }

      const plan = fs.existsSync(planPath) ? fs.readFileSync(planPath, 'utf-8') : '';
      const context = fs.existsSync(contextPath) ? fs.readFileSync(contextPath, 'utf-8') : '';
      const tasks = fs.existsSync(tasksPath) ? fs.readFileSync(tasksPath, 'utf-8') : '';

      return {
        name: taskName,
        displayName: this.formatTaskName(taskName),
        filesModified: metadata.filesModified || 0,
        tasksCompleted: metadata.tasksCompleted || this.countCheckedBoxes(tasks),
        tasksTotal: metadata.tasksTotal || this.countTotalTasks(tasks),
        phases: metadata.phases || this.extractPhases(tasks),
        tags: metadata.tags || [],
        summary: this.extractTaskSummary(plan),
        completedDate: metadata.completedDate || new Date().toISOString(),
        path: `dev/completed/tasks/${taskName}`,
        impact: this.calculateImpact(metadata.filesModified || 0, metadata.tasksCompleted || 0)
      };
    } catch (error) {
      console.error(`Error parsing task ${taskName}:`, error.message);
      return null;
    }
  }

  /**
   * Count modified files mentioned in session notes
   */
  countFilesModified(content) {
    const match = content.match(/files?.*?(?:modified|changed|updated)[:\s]+(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Count completed tasks in notes
   */
  countCompletedTasks(content) {
    const match = content.match(/tasks?.*?completed[:\s]+(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Count checked boxes in tasks file
   */
  countCheckedBoxes(content) {
    return (content.match(/\[x\]/gi) || []).length + (content.match(/✅/gi) || []).length;
  }

  /**
   * Count total tasks
   */
  countTotalTasks(content) {
    return (content.match(/\[\s*\]/gi) || []).length +
           (content.match(/\[x\]/gi) || []).length +
           (content.match(/✅/gi) || []).length;
  }

  /**
   * Extract phases from tasks file
   */
  extractPhases(content) {
    const phases = [];
    const matches = content.matchAll(/###\s+Phase\s+\d+:\s*(.+?)(?:\n|$)/gi);
    for (const match of matches) {
      phases.push(match[1].trim());
    }
    return phases.length > 0 ? phases : ['General'];
  }

  /**
   * Extract summary from session notes
   */
  extractSessionSummary(content) {
    // Try to find summary section
    const match = content.match(/##\s+Summary\s*\n\n(.+?)(?=\n##|\n\n|$)/s);
    if (match) {
      return match[1].trim().split('\n')[0];
    }
    return '';
  }

  /**
   * Extract summary from plan
   */
  extractTaskSummary(content) {
    // Try to find overview or summary section
    const match = content.match(/##\s+Overview\s*\n\n(.+?)(?=\n##|\n\n|$)/s) ||
                  content.match(/##\s+Summary\s*\n\n(.+?)(?=\n##|\n\n|$)/s);
    if (match) {
      return match[1].trim().split('\n')[0];
    }
    return '';
  }

  /**
   * Format task name for display (kebab-case to Title Case)
   */
  formatTaskName(name) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Calculate impact score (simple heuristic)
   */
  calculateImpact(filesModified, tasksCompleted) {
    if (filesModified > 50 || tasksCompleted > 30) {
      return 'high';
    } else if (filesModified > 10 || tasksCompleted > 10) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Generate summary of all work
   */
  generateSummary() {
    const sessionCount = this.data.sessions.length;
    const taskCount = this.data.tasks.length;
    const filesChanged = this.data.totalFilesChanged;

    let summary = '';

    if (sessionCount > 0) {
      summary += `${sessionCount} session${sessionCount !== 1 ? 's' : ''} completed\n`;
    }
    if (taskCount > 0) {
      summary += `${taskCount} task${taskCount !== 1 ? 's' : ''} completed\n`;
    }
    if (filesChanged > 0) {
      summary += `${filesChanged} file${filesChanged !== 1 ? 's' : ''} modified`;
    }

    this.data.summary = summary.trim();
  }

  /**
   * Generate branch name suggestions based on completed work
   */
  generateBranchNameSuggestions() {
    const suggestions = [];

    // Suggestion 1: Based on primary task
    if (this.data.tasks.length > 0) {
      const primaryTask = this.data.tasks[0];
      suggestions.push({
        name: this.kebabCase(primaryTask.name),
        description: `Based on primary task: ${primaryTask.displayName}`
      });
    }

    // Suggestion 2: Based on type prefix + primary task
    if (this.data.tasks.length > 0) {
      const primaryTask = this.data.tasks[0];
      const prefix = this.inferTypePrefix(primaryTask);
      suggestions.push({
        name: `${prefix}/${this.kebabCase(primaryTask.name)}`,
        description: `${prefix.toUpperCase()}: ${primaryTask.displayName}`
      });
    }

    // Suggestion 3: Based on date + focus
    if (this.data.tasks.length > 0) {
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const primaryTask = this.data.tasks[0];
      suggestions.push({
        name: `${date}/${this.kebabCase(primaryTask.name)}`,
        description: `Date-based: ${date} - ${primaryTask.displayName}`
      });
    }

    // Suggestion 4: Multi-task summary
    if (this.data.tasks.length > 1) {
      const taskCount = this.data.tasks.length;
      suggestions.push({
        name: `multi-task/${this.getMultiTaskSummary()}`,
        description: `Multiple tasks: ${taskCount} tasks bundled`
      });
    }

    // Suggestion 5: Feature-based
    if (this.data.tasks.length > 0) {
      const highImpactTasks = this.data.tasks.filter(t => t.impact === 'high');
      if (highImpactTasks.length > 0) {
        suggestions.push({
          name: `feature/${this.kebabCase(highImpactTasks[0].name)}`,
          description: `Feature: ${highImpactTasks[0].displayName}`
        });
      }
    }

    return suggestions;
  }

  /**
   * Infer type prefix from task characteristics
   */
  inferTypePrefix(task) {
    const name = task.name.toLowerCase();
    const displayName = task.displayName.toLowerCase();
    const fullText = `${name} ${displayName}`;

    if (fullText.includes('fix') || fullText.includes('bug')) {
      return 'fix';
    } else if (fullText.includes('refactor') || fullText.includes('improve')) {
      return 'refactor';
    } else if (fullText.includes('docs') || fullText.includes('documentation')) {
      return 'docs';
    } else if (fullText.includes('test')) {
      return 'test';
    } else {
      return 'feature';
    }
  }

  /**
   * Convert to kebab-case
   */
  kebabCase(str) {
    return str
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Get summary for multi-task branch name
   */
  getMultiTaskSummary() {
    const taskNames = this.data.tasks.slice(0, 2).map(t => this.kebabCase(t.name));
    return taskNames.join('-');
  }

  /**
   * Get formatted output for commit message
   */
  getCommitMessageData() {
    return {
      title: this.generateCommitTitle(),
      description: this.generateCommitDescription(),
      statistics: {
        sessions: this.data.sessions.length,
        tasks: this.data.tasks.length,
        files: this.data.totalFilesChanged
      },
      branchSuggestions: this.generateBranchNameSuggestions()
    };
  }

  /**
   * Generate commit title
   */
  generateCommitTitle() {
    if (this.data.tasks.length === 0) {
      return 'Update development documentation';
    }

    // Get primary impact areas
    const highImpact = this.data.tasks.filter(t => t.impact === 'high');
    const mediumImpact = this.data.tasks.filter(t => t.impact === 'medium');

    if (highImpact.length > 0) {
      return `${highImpact[0].displayName}: Complete implementation`;
    } else if (mediumImpact.length > 0) {
      return `${mediumImpact[0].displayName}: Add functionality`;
    } else {
      return `Update: ${this.data.tasks[0].displayName}`;
    }
  }

  /**
   * Generate commit description
   */
  generateCommitDescription() {
    const lines = [];

    // Add key changes
    if (this.data.tasks.length > 0) {
      lines.push('## Changes');
      lines.push('');
      for (const task of this.data.tasks.slice(0, 5)) {
        lines.push(`- ${task.displayName}: ${task.filesModified} files, ${task.tasksCompleted}/${task.tasksTotal} tasks`);
      }
      if (this.data.tasks.length > 5) {
        lines.push(`- +${this.data.tasks.length - 5} more tasks`);
      }
    }

    // Add statistics
    if (this.data.sessions.length > 0 || this.data.totalFilesChanged > 0) {
      lines.push('');
      lines.push('## Statistics');
      lines.push('');
      if (this.data.sessions.length > 0) {
        lines.push(`- Sessions completed: ${this.data.sessions.length}`);
      }
      if (this.data.totalTasksCompleted > 0) {
        lines.push(`- Tasks completed: ${this.data.totalTasksCompleted}`);
      }
      if (this.data.totalFilesChanged > 0) {
        lines.push(`- Files modified: ${this.data.totalFilesChanged}`);
      }
    }

    return lines.join('\n');
  }
}

/**
 * Main execution
 */
if (require.main === module) {
  try {
    const baseDir = process.argv[2] || './dev';
    const aggregator = new CommitAggregator(baseDir);
    const data = aggregator.aggregate();

    // Output as JSON to stdout
    console.log(JSON.stringify(data, null, 2));

    // Exit with success code
    process.exit(0);
  } catch (error) {
    // Output error to stderr
    console.error('ERROR:', error.message);
    process.exit(1);
  }
}

module.exports = CommitAggregator;
