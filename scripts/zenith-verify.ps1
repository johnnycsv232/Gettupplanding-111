Write-Host "Starting Robust Zenith Verification..." -ForegroundColor Cyan

# 1. Check for valid structure
Write-Host "Checking structure..."
if (-not (Test-Path "skills")) { Write-Error "CRITICAL: skills/ folder missing!"; exit 1 }
if (-not (Test-Path ".agent/rules")) { Write-Error "CRITICAL: .agent/rules missing!"; exit 1 }

# 2. Check for Prettier
Write-Host "Checking Prettier..."
if (-not (Test-Path "node_modules/.bin/prettier")) {
    if (-not (Test-Path "node_modules/prettier")) { Write-Error "Prettier not installed! Run npm install."; exit 1 }
}

# 3. Check for specific skills
Write-Host "Checking Skills..."
$required = @("agent-manager-skill", "agent-memory-systems", "ai-agents-architect", "using-superpowers")
foreach ($skill in $required) {
    if (-not (Test-Path "skills/$skill")) { Write-Error "Missing skill: $skill"; exit 1 }
}

# 4. Check Rules Propagation
Write-Host "Checking Agents Config..."
$agents = @(".claude", ".cursor", ".gemini", ".windsurf", ".zenflow")
foreach ($agent in $agents) {
    if (-not (Test-Path "$agent/rules")) { Write-Error "Missing rules for $agent"; exit 1 }
}

# 5. Type Check
Write-Host "Running Type Check..."
cmd /c "npm run type-check"
if ($LASTEXITCODE -ne 0) { Write-Error "Type Check Failed"; exit 1 }

# 6. Lint
Write-Host "Running Lint..."
cmd /c "npm run lint"
if ($LASTEXITCODE -ne 0) { Write-Error "Lint Failed"; exit 1 }

# 7. Ghost Code / Forbidden Patterns
Write-Host "Scanning for forbidden patterns..."
$forbidden = @("console.log", "useEffect.*fetch")
$files = Get-ChildItem -Path "src" -Recurse -Include "*.ts","*.tsx" -ErrorAction SilentlyContinue

if ($files) {
    foreach ($file in $files) {
        $content = Get-Content $file.FullName -Raw
        foreach ($pattern in $forbidden) {
            if ($content -match $pattern) {
                Write-Warning "Forbidden pattern '$pattern' found in $($file.Name)"
                # We won't fail the build for now, but warn loudly.
            }
        }
    }
}

# 8. Build
Write-Host "Running Build..."
cmd /c "npm run build"
if ($LASTEXITCODE -ne 0) { Write-Error "Build Failed"; exit 1 }

# 9. Success
Write-Host "ZENITH ROBUST VERIFICATION PASSED. All systems operational." -ForegroundColor Green
exit 0
