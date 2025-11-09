#!/usr/bin/env node

/**
 * Archive Migrator - Moves /dev/completed/ → /dev/archived/
 *
 * Usage:
 *   node archive-migrator.js [baseDir] [--dry-run]
 *   baseDir: Path to dev directory (default: ./dev)
 *   --dry-run: Preview changes without executing
 *
 * Implements the three-tier archive system:
 * active/ → completed/ → archived/
 */

const fs = require('fs');
const path = require('path');

class ArchiveMigrator {
  constructor(baseDir = './dev', dryRun = false) {
    this.baseDir = baseDir;
    this.activeDIr = path.join(baseDir, 'active');
    this.completedDir = path.join(baseDir, 'completed');
    this.archivedDir = path.join(baseDir, 'archived');
    this.dryRun = dryRun;
    this.operations = [];
    this.stats = {
      sessionsMoved: 0,
      tasksMoved: 0,
      filesMoved: 0,
      errors: []
    };
  }

  /**
   * Main entry point - migrate completed → archived
   */
  migrate() {
    // Validate state
    this.validateState();

    // Create archived directories if needed
    this.ensureArchivedDirs();

    // Migrate sessions
    this.migrateSessions();

    // Migrate tasks
    this.migrateTasks();

    // Update indexes
    this.updateIndexes();

    // Clear completed if not dry-run
    if (!this.dryRun) {
      this.clearCompleted();
    }

    return {
      success: this.stats.errors.length === 0,
      stats: this.stats,
      operations: this.operations
    };
  }

  /**
   * Validate pre-migration state
   */
  validateState() {
    // Check if active directory has tasks
    if (this.hasActiveTasks()) {
      throw new Error('Cannot archive: /dev/active/ contains active tasks');
    }

    // Check if completed directory exists
    if (!fs.existsSync(this.completedDir)) {
      throw new Error('Nothing to archive: /dev/completed/ does not exist');
    }

    // Check if completed directory has content
    const hasContent = this.hasCompletedContent();
    if (!hasContent) {
      throw new Error('Nothing to archive: /dev/completed/ is empty');
    }
  }

  /**
   * Check if /dev/active/ has tasks
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
   * Check if completed directory has content
   */
  hasCompletedContent() {
    try {
      const entries = fs.readdirSync(this.completedDir, { withFileTypes: true });
      return entries.some(entry => !entry.name.startsWith('.'));
    } catch (error) {
      return false;
    }
  }

  /**
   * Ensure archived directories exist
   */
  ensureArchivedDirs() {
    const dirs = [
      this.archivedDir,
      path.join(this.archivedDir, 'sessions'),
      path.join(this.archivedDir, 'tasks')
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        this.executeOperation(() => {
          fs.mkdirSync(dir, { recursive: true });
        }, `Create directory: ${dir}`);
      }
    }
  }

  /**
   * Migrate all sessions from completed → archived
   */
  migrateSessions() {
    const sessionsDir = path.join(this.completedDir, 'sessions');

    if (!fs.existsSync(sessionsDir)) {
      return;
    }

    const sessionFolders = fs.readdirSync(sessionsDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'));

    for (const folder of sessionFolders) {
      this.migrateSession(folder.name);
    }
  }

  /**
   * Migrate individual session
   */
  migrateSession(sessionFolder) {
    const sourceDir = path.join(this.completedDir, 'sessions', sessionFolder);

    // Extract date from folder name: YYYY-MM-DD_HHmmss-name
    const datePart = sessionFolder.split('_')[0]; // YYYY-MM-DD
    const yearMonth = datePart.substring(0, 7); // YYYY-MM

    const archiveDir = path.join(this.archivedDir, 'sessions', yearMonth);
    const targetDir = path.join(archiveDir, sessionFolder);

    this.executeOperation(() => {
      // Create year-month directory
      fs.mkdirSync(archiveDir, { recursive: true });

      // Move entire session folder
      fs.cpSync(sourceDir, targetDir, { recursive: true });
      fs.rmSync(sourceDir, { recursive: true, force: true });

      this.stats.sessionsMoved++;
    }, `Migrate session: ${sessionFolder} → archived/sessions/${yearMonth}/`);
  }

  /**
   * Migrate all tasks from completed → archived
   */
  migrateTasks() {
    const tasksDir = path.join(this.completedDir, 'tasks');

    if (!fs.existsSync(tasksDir)) {
      return;
    }

    const taskFolders = fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'));

    for (const folder of taskFolders) {
      if (folder.name !== 'index.md') {
        this.migrateTask(folder.name);
      }
    }
  }

  /**
   * Migrate individual task
   */
  migrateTask(taskName) {
    const sourceDir = path.join(this.completedDir, 'tasks', taskName);

    // Get completion date from metadata if available
    const metadataPath = path.join(sourceDir, '.metadata.json');
    let yearMonth = new Date().toISOString().substring(0, 7); // YYYY-MM default

    if (fs.existsSync(metadataPath)) {
      try {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        if (metadata.completedDate) {
          yearMonth = metadata.completedDate.substring(0, 7);
        }
      } catch (error) {
        // Use default
      }
    }

    const archiveDir = path.join(this.archivedDir, 'tasks', yearMonth);
    const targetDir = path.join(archiveDir, taskName);

    this.executeOperation(() => {
      // Create year-month directory
      fs.mkdirSync(archiveDir, { recursive: true });

      // Move entire task folder
      fs.cpSync(sourceDir, targetDir, { recursive: true });
      fs.rmSync(sourceDir, { recursive: true, force: true });

      this.stats.tasksMoved++;
      this.countFiles(targetDir);
    }, `Migrate task: ${taskName} → archived/tasks/${yearMonth}/`);
  }

  /**
   * Count files in directory
   */
  countFiles(dir) {
    try {
      const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
      this.stats.filesMoved += entries.filter(e => e.isFile()).length;
    } catch (error) {
      // Ignore
    }
  }

  /**
   * Update index files
   */
  updateIndexes() {
    this.updateArchivedSessionsIndex();
    this.updateArchivedTasksIndex();
    this.updateArchivedReadme();
  }

  /**
   * Update archived sessions index
   */
  updateArchivedSessionsIndex() {
    const indexPath = path.join(this.archivedDir, 'sessions', 'index.md');
    const sessionsDir = path.join(this.archivedDir, 'sessions');

    if (!fs.existsSync(sessionsDir)) {
      return;
    }

    const monthDirs = fs.readdirSync(sessionsDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name)
      .sort()
      .reverse();

    let content = '# Archived Sessions Index\n\n';
    content += `Last Updated: ${new Date().toISOString().split('T')[0]}\n\n`;
    content += '## Sessions by Month\n\n';

    for (const month of monthDirs) {
      const monthDir = path.join(sessionsDir, month);
      const sessions = fs.readdirSync(monthDir, { withFileTypes: true })
        .filter(e => e.isDirectory() && !e.name.startsWith('.'))
        .sort()
        .reverse();

      content += `### ${month}\n\n`;
      for (const session of sessions) {
        content += `- \`${session.name}\`\n`;
      }
      content += '\n';
    }

    this.executeOperation(() => {
      fs.writeFileSync(indexPath, content);
    }, `Update archived sessions index`);
  }

  /**
   * Update archived tasks index
   */
  updateArchivedTasksIndex() {
    const indexPath = path.join(this.archivedDir, 'tasks', 'index.md');
    const tasksDir = path.join(this.archivedDir, 'tasks');

    if (!fs.existsSync(tasksDir)) {
      return;
    }

    const monthDirs = fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.'))
      .map(e => e.name)
      .sort()
      .reverse();

    let content = '# Archived Tasks Index\n\n';
    content += `Last Updated: ${new Date().toISOString().split('T')[0]}\n\n`;
    content += '## Tasks by Month\n\n';

    for (const month of monthDirs) {
      const monthDir = path.join(tasksDir, month);
      const tasks = fs.readdirSync(monthDir, { withFileTypes: true })
        .filter(e => e.isDirectory() && !e.name.startsWith('.'))
        .sort();

      content += `### ${month}\n\n`;
      for (const task of tasks) {
        content += `- \`${task.name}\`\n`;
      }
      content += '\n';
    }

    this.executeOperation(() => {
      fs.writeFileSync(indexPath, content);
    }, `Update archived tasks index`);
  }

  /**
   * Update archived README
   */
  updateArchivedReadme() {
    const readmePath = path.join(this.archivedDir, 'README.md');
    const content = `# Archived Development Work

Long-term storage of completed development sessions and tasks.

## Structure

\`\`\`
archived/
├── sessions/        # Session notes organized by month
│   ├── 2025-10/
│   ├── 2025-11/
│   └── index.md
├── tasks/           # Task documentation organized by month
│   ├── 2025-10/
│   ├── 2025-11/
│   └── index.md
└── README.md
\`\`\`

## Accessing Archived Work

### Search by month
\`\`\`bash
ls archived/tasks/2025-11/
\`\`\`

### Search by keyword
\`\`\`bash
grep -r "keyword" archived/
\`\`\`

### View specific task
\`\`\`bash
cat archived/tasks/2025-11/task-name/task-name-plan.md
\`\`\`

## Archive Lifecycle

- **Active** (dev/active/) - Current work in progress
- **Completed** (dev/completed/) - Recently finished (~30 days)
- **Archived** (dev/archived/) - Long-term storage (this directory)

## Last Updated

${new Date().toISOString().split('T')[0]}
`;

    this.executeOperation(() => {
      fs.writeFileSync(readmePath, content);
    }, `Create/update archived README`);
  }

  /**
   * Clear completed directory (after successful migration)
   */
  clearCompleted() {
    this.executeOperation(() => {
      // Only remove contents, keep directory
      const entries = fs.readdirSync(this.completedDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.name.startsWith('.')) {
          const fullPath = path.join(this.completedDir, entry.name);
          if (entry.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
        }
      }
    }, `Clear /dev/completed/ directory`);
  }

  /**
   * Execute operation with error handling
   */
  executeOperation(fn, description) {
    this.operations.push({
      description,
      timestamp: new Date().toISOString(),
      dryRun: this.dryRun
    });

    if (this.dryRun) {
      return; // Don't execute in dry-run mode
    }

    try {
      fn();
    } catch (error) {
      this.stats.errors.push({
        operation: description,
        error: error.message
      });
    }
  }

  /**
   * Get migration report
   */
  getReport() {
    return {
      success: this.stats.errors.length === 0,
      dryRun: this.dryRun,
      timestamp: new Date().toISOString(),
      statistics: {
        sessionsMigrated: this.stats.sessionsMoved,
        tasksMigrated: this.stats.tasksMoved,
        filesMoved: this.stats.filesMoved,
        errors: this.stats.errors.length
      },
      operations: this.operations,
      errors: this.stats.errors
    };
  }
}

/**
 * Main execution
 */
if (require.main === module) {
  try {
    const baseDir = process.argv[2] || './dev';
    const dryRun = process.argv.includes('--dry-run');

    const migrator = new ArchiveMigrator(baseDir, dryRun);
    migrator.migrate();

    const report = migrator.getReport();
    console.log(JSON.stringify(report, null, 2));

    process.exit(report.success ? 0 : 1);
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
}

module.exports = ArchiveMigrator;
