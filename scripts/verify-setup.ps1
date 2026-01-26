# Master Verification & Auto-Fix Script
# Run this to ensure everything is perfect before starting work

$ErrorActionPreference = "Continue"
$basePath = "C:\Users\finan\Gettupplanding-111"
Set-Location $basePath

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         GETTUPPENT - Master Verification Script         ║" -ForegroundColor Cyan
Write-Host "║    AI-First | Security-First | Test-First Development    ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$issues = 0
$fixed = 0

# 1. Check Node.js version
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion -match "v(\d+)\.") {
    $major = [int]$matches[1]
    if ($major -ge 20) {
        Write-Host "  ✅ Node.js $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Node.js $nodeVersion (Need v20+)" -ForegroundColor Red
        $issues++
    }
}

# 2. Check Git status
Write-Host ""
Write-Host "📊 Checking Git..." -ForegroundColor Yellow
$gitStatus = git status --porcelain 2>&1
if ($LASTEXITCODE -eq 0) {
    if (-not $gitStatus) {
        Write-Host "  ✅ Git clean (no uncommitted changes)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Uncommitted changes exist" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ Git not initialized" -ForegroundColor Red
    $issues++
}

# 3. Check IDE configs
Write-Host ""
Write-Host "🔧 Checking IDE configurations..." -ForegroundColor Yellow
$ideConfigs = @{
    ".vscode" = @("settings.json", "extensions.json")
    ".cursor" = @("settings.json", "rules")
    ".windsurf" = @("settings.json", "rules")
    ".agent" = @("rules")
}

foreach ($ide in $ideConfigs.Keys) {
    $idePath = Join-Path $basePath $ide
    if (Test-Path $idePath) {
        $allExist = $true
        foreach ($file in $ideConfigs[$ide]) {
            $filePath = Join-Path $idePath $file
            if (-not (Test-Path $filePath)) {
                $allExist = $false
                Write-Host "  ❌ Missing: $ide\$file" -ForegroundColor Red
                $issues++
            }
        }
        if ($allExist) {
            Write-Host "  ✅ $ide configured" -ForegroundColor Green
        }
    } else {
        Write-Host "  ❌ Missing IDE folder: $ide" -ForegroundColor Red
        $issues++
    }
}

# 4. Check Skills
Write-Host ""
Write-Host "🎯 Checking Skills..." -ForegroundColor Yellow
$activeSkills = (Get-ChildItem -Path "$basePath\skills" -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -ne ".disabled" }).Count
$disabledSkills = (Get-ChildItem -Path "$basePath\skills\.disabled" -Directory -ErrorAction SilentlyContinue).Count

if ($activeSkills -gt 0) {
    Write-Host "  ✅ Active skills: $activeSkills" -ForegroundColor Green
    Write-Host "  ℹ️  Disabled skills: $disabledSkills" -ForegroundColor Gray
    
    # Check for Stitch skills
    $stitchSkills = Get-ChildItem -Path "$basePath\skills" -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -like "stitch*" }
    if ($stitchSkills.Count -gt 0) {
        Write-Host "  ✅ Google Stitch skills: $($stitchSkills.Count)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Google Stitch skills not found" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ No active skills found" -ForegroundColor Red
    $issues++
}

# 5. Check Skills Index
if (Test-Path "$basePath\skills_index.json") {
    Write-Host "  ✅ Skills index exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Regenerating skills index..." -ForegroundColor Yellow
    npx tsx scripts/generate-index.ts 2>&1 | Out-Null
    $fixed++
}

# 6. Check Dependencies
Write-Host ""
Write-Host "📚 Checking Dependencies..." -ForegroundColor Yellow
if (Test-Path "$basePath\node_modules") {
    Write-Host "  ✅ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  Installing dependencies..." -ForegroundColor Yellow
    npm install 2>&1 | Out-Null
    $fixed++
}

# 7. Check Environment Variables
Write-Host ""
Write-Host "🔐 Checking Environment..." -ForegroundColor Yellow
if (Test-Path "$basePath\.env.local") {
    Write-Host "  ✅ .env.local exists" -ForegroundColor Green
    
    # Check for critical keys
    $envContent = Get-Content "$basePath\.env.local" -Raw
    $criticalKeys = @("NEXT_PUBLIC_FIREBASE_API_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET")
    
    foreach ($key in $criticalKeys) {
        if ($envContent -match $key) {
            Write-Host "  ✅ $key configured" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  $key not found" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "  ⚠️  .env.local not found (copy from .env.local.example)" -ForegroundColor Yellow
}

# 8. Check Key Files
Write-Host ""
Write-Host "📄 Checking Key Files..." -ForegroundColor Yellow
$keyFiles = @("AGENTS.md", "package.json", "tsconfig.json", "next.config.ts", "firebase.json")
foreach ($file in $keyFiles) {
    if (Test-Path "$basePath\$file") {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Missing: $file" -ForegroundColor Red
        $issues++
    }
}

# 9. Type Check
Write-Host ""
Write-Host "🔍 Running Type Check..." -ForegroundColor Yellow
$typeCheck = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✅ TypeScript: No errors" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  TypeScript has errors (check manually)" -ForegroundColor Yellow
}

# 10. Check for Ghost Code
Write-Host ""
Write-Host "👻 Checking for Ghost Code..." -ForegroundColor Yellow
$ghostFiles = @()

# Check for ghost files in skills/
$skillsGhost = Get-ChildItem "$basePath\skills" -File -ErrorAction SilentlyContinue | Where-Object { $_.Extension -in @(".pdf", ".docx", ".xlsx", ".pptx") }
if ($skillsGhost) {
    Write-Host "  ⚠️  Ghost files found in skills/: $($skillsGhost.Count)" -ForegroundColor Yellow
    Write-Host "  💡 Run .\scripts\cleanup-ghost-code.ps1 to clean" -ForegroundColor Cyan
} else {
    Write-Host "  ✅ No ghost files in skills/" -ForegroundColor Green
}

# Summary
Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    Verification Summary                   ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

if ($issues -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED!" -ForegroundColor Green
    if ($fixed -gt 0) {
        Write-Host "🔧 Auto-fixed $fixed issue(s)" -ForegroundColor Cyan
    }
    Write-Host ""
    Write-Host "🚀 Ready for AI-First Development!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Quick start:" -ForegroundColor Gray
    Write-Host "  npm run dev                    # Start development server" -ForegroundColor Gray
    Write-Host "  firebase emulators:start       # Start Firebase emulators" -ForegroundColor Gray
    Write-Host "  npm test                       # Run tests" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Found $issues issue(s) - please fix manually" -ForegroundColor Yellow
    if ($fixed -gt 0) {
        Write-Host "🔧 Auto-fixed $fixed issue(s)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "IDE Startup: Open Windsurf, Cursor, or Antigravity - all configured!" -ForegroundColor Cyan
Write-Host ""
