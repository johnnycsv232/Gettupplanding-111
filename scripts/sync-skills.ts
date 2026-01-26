
import * as fs from 'fs';
import * as path from 'path';

/**
 * sync-skills.ts
 * Cross-platform replacement for sync_recommended_skills.sh
 */

const RECOMMENDED_SKILLS = [
    "systematic-debugging",
    "test-driven-development",
    "writing-skills",
    "doc-coauthoring",
    "planning-with-files",
    "concise-planning",
    "software-architecture",
    "senior-architect",
    "senior-fullstack",
    "verification-before-completion",
    "git-pushing",
    "address-github-comments",
    "javascript-mastery",
    "docx-official",
    "pdf-official",
    "pptx-official",
    "xlsx-official",
    "react-best-practices",
    "web-design-guidelines",
    "frontend-dev-guidelines",
    "webapp-testing",
    "playwright-skill",
    "mcp-builder",
    "notebooklm",
    "ui-ux-pro-max",
    "content-creator",
    "brand-guidelines-anthropic",
    "brand-guidelines-community",
    "internal-comms-anthropic",
    "internal-comms-community",
    "writing-plans",
    "workflow-automation",
    "llm-app-patterns",
    "autonomous-agent-patterns",
    "prompt-library",
    "github-workflow-automation"
];

function copyDir(src: string, dest: string) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function syncSkills(sourceLib: string, localLib: string) {
    console.log("🔄 Sync Recommended Skills");
    console.log("=========================");
    console.log(`📍 Source: ${sourceLib}`);
    console.log(`📍 Target: ${localLib}`);
    console.log(`📊 Recommended count: ${RECOMMENDED_SKILLS.length}\n`);

    if (!fs.existsSync(sourceLib)) {
        console.error(`❌ Source library not found: ${sourceLib}`);
        return;
    }

    if (!fs.existsSync(localLib)) {
        fs.mkdirSync(localLib, { recursive: true });
    }

    // Backup skipped for brevity in this CLI version, but we'll clear and copy
    console.log("🗑️  Clearing existing skills in target...");
    const existing = fs.readdirSync(localLib, { withFileTypes: true });
    for (const entry of existing) {
        if (entry.isDirectory()) {
            fs.rmSync(path.join(localLib, entry.name), { recursive: true, force: true });
        }
    }

    console.log("📋 Copying recommended skills...");
    let successCount = 0;
    let missingCount = 0;

    for (const skill of RECOMMENDED_SKILLS) {
        const srcPath = path.join(sourceLib, skill);
        if (fs.existsSync(srcPath)) {
            copyDir(srcPath, path.join(localLib, skill));
            console.log(`  ✅ ${skill}`);
            successCount++;
        } else {
            console.warn(`  ⚠️  ${skill} (not found in source)`);
            missingCount++;
        }
    }

    console.log(`\n✅ Copied: ${successCount} skills`);
    console.log(`⚠️  Missing: ${missingCount} skills`);
}

function main() {
    const args = process.argv.slice(2);
    // Defaults based on the user's environment if not provided
    const sourceLib = args[0] || path.join(process.cwd(), '..', 'antigravity-awesome-skills', 'skills');
    const localLib = args[1] || path.join(process.cwd(), 'skills');

    syncSkills(sourceLib, localLib);
}

main();
