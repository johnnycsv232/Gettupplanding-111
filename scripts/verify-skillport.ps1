# Skillport MCP Server Verification Script
# Ensures skillport-mcp is installed and properly configured

$ErrorActionPreference = "Stop"
$SkillportMcpPath = "C:\Users\finan\AppData\Roaming\Python\Python314\Scripts\skillport-mcp.exe"
$SkillsDir = "C:\Users\finan\Gettupplanding-111\skills"

Write-Host "=== Skillport MCP Verification ===" -ForegroundColor Cyan

# 1. Check if skillport-mcp is installed
if (Test-Path $SkillportMcpPath) {
    Write-Host "[OK] skillport-mcp.exe found" -ForegroundColor Green
} else {
    Write-Host "[MISSING] skillport-mcp.exe not found at $SkillportMcpPath" -ForegroundColor Red
    Write-Host "Installing skillport-mcp..." -ForegroundColor Yellow
    pip install skillport-mcp
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] Failed to install skillport-mcp" -ForegroundColor Red
        exit 1
    }
    Write-Host "[OK] skillport-mcp installed" -ForegroundColor Green
}

# 2. Check skills directory exists
if (Test-Path $SkillsDir) {
    $skillCount = (Get-ChildItem -Path $SkillsDir -Directory).Count
    Write-Host "[OK] Skills directory exists with $skillCount skills" -ForegroundColor Green
} else {
    Write-Host "[FAIL] Skills directory not found: $SkillsDir" -ForegroundColor Red
    exit 1
}

# 3. Verify skillport-mcp version
$version = & $SkillportMcpPath --help 2>&1 | Select-String "SkillPort MCP"
if ($version) {
    Write-Host "[OK] skillport-mcp responds correctly" -ForegroundColor Green
} else {
    Write-Host "[WARN] Could not verify skillport-mcp version" -ForegroundColor Yellow
}

# 4. Check MCP config exists with correct settings
$globalMcpConfig = "C:\Users\finan\.codeium\windsurf\mcp_config.json"
if (Test-Path $globalMcpConfig) {
    $config = Get-Content $globalMcpConfig | ConvertFrom-Json
    if ($config.mcpServers.skillport.command -match "skillport-mcp") {
        Write-Host "[OK] Global MCP config uses skillport-mcp" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Global MCP config may use wrong command" -ForegroundColor Yellow
    }
} else {
    Write-Host "[WARN] Global MCP config not found" -ForegroundColor Yellow
}

# 5. Force reindex if requested
if ($args -contains "--reindex") {
    Write-Host "Rebuilding skill index..." -ForegroundColor Yellow
    & $SkillportMcpPath --skills-dir $SkillsDir --reindex
}

Write-Host ""
Write-Host "=== Verification Complete ===" -ForegroundColor Cyan
Write-Host "Skillport MCP is ready. Restart Windsurf to apply MCP changes." -ForegroundColor White
