import * as fs from 'fs';
import * as path from 'path';

const skillsDir = 'skills';

const mapping: Record<string, string[]> = {
  '_core': [
    'nextjs-best-practices',
    'react-best-practices',
    'react-patterns',
    'react-ui-patterns',
    'firebase',
    'stripe-integration',
    '3d-web-experience',
    'tailwind-patterns'
  ],
  '_frontend': [
    'frontend-dev-guidelines',
    'frontend-design',
    'javascript-mastery',
    'typescript-expert',
    'web-design-guidelines',
    'ui-ux-pro-max',
    'canvas-design'
  ],
  '_backend': [
    'backend-dev-guidelines',
    'api-patterns',
    'nodejs-best-practices',
    'database-design',
    'graphql'
  ],
  '_quality': [
    'clean-code',
    'code-review-checklist',
    'testing-patterns',
    'tdd-workflow',
    'test-driven-development',
    'playwright-skill',
    'lint-and-validate',
    'systematic-debugging',
    'performance-profiling'
  ],
  '_devops': [
    'vercel-deployment',
    'docker-expert',
    'deployment-procedures',
    'git-pushing',
    'github-workflow-automation',
    'server-management'
  ],
  '_architecture': [
    'architecture',
    'software-architecture',
    'senior-architect',
    'senior-fullstack',
    'plan-writing',
    'writing-plans'
  ],
  '_seo-marketing': [
    'seo-fundamentals',
    'seo-audit',
    'schema-markup',
    'analytics-tracking',
    'page-cro',
    'marketing-ideas',
    'marketing-psychology',
    'copywriting',
    'copy-editing'
  ],
  '_ai-tools': [
    'prompt-engineering',
    'prompt-engineer',
    'mcp-builder',
    'agent-tool-builder',
    'llm-app-patterns',
    'autonomous-agents',
    'autonomous-agent-patterns'
  ],
  '_tools': [
    'clerk-auth',
    'algolia-search',
    'plaid-fintech',
    'segment-cdp',
    'trigger-dev',
    'inngest',
    'upstash-qstash',
    'bullmq-specialist',
    'pdf-official',
    'docx-official',
    'pptx-official',
    'xlsx-official',
    'notebooklm'
  ]
};

function moveSkill(skillName: string, category: string) {
  const source = path.join(skillsDir, skillName);
  const target = path.join(skillsDir, category, skillName);

  if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
    try {
      if (!fs.existsSync(path.join(skillsDir, category))) {
        fs.mkdirSync(path.join(skillsDir, category), { recursive: true });
      }
      fs.renameSync(source, target);
      console.log(`✅ Moved ${skillName} -> ${category}`);
    } catch (err) {
      console.error(`❌ Failed to move ${skillName}: ${err}`);
    }
  }
}

// 1. Create categories
Object.keys(mapping).forEach(category => {
  const catPath = path.join(skillsDir, category);
  if (!fs.existsSync(catPath)) {
    fs.mkdirSync(catPath, { recursive: true });
  }
});

// 2. Move mapped skills
Object.entries(mapping).forEach(([category, skills]) => {
  skills.forEach(skill => moveSkill(skill, category));
});

// 3. Collect and move irrelevant skills to .disabled
const keptSkills = new Set(Object.values(mapping).flat());
keptSkills.add('_core');
keptSkills.add('_frontend');
keptSkills.add('_backend');
keptSkills.add('_quality');
keptSkills.add('_devops');
keptSkills.add('_architecture');
keptSkills.add('_seo-marketing');
keptSkills.add('_ai-tools');
keptSkills.add('_tools');
keptSkills.add('_security');
keptSkills.add('.disabled');
keptSkills.add('.vscode');
keptSkills.add('.gitignore');
keptSkills.add('README.md');
keptSkills.add('_REORGANIZATION_PLAN.md');

const disabledDir = path.join(skillsDir, '.disabled');
if (!fs.existsSync(disabledDir)) {
  fs.mkdirSync(disabledDir, { recursive: true });
}

fs.readdirSync(skillsDir).forEach(item => {
  if (keptSkills.has(item)) return;

  const source = path.join(skillsDir, item);
  const target = path.join(disabledDir, item);

  if (fs.lstatSync(source).isDirectory() && !item.startsWith('_')) {
    try {
      fs.renameSync(source, target);
      console.log(`💤 Disabled ${item}`);
    } catch (err) {
       console.error(`❌ Failed to disable ${item}: ${err}`);
    }
  }
});
