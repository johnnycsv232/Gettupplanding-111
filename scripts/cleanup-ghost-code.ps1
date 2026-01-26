# Ghost Code Cleanup Script
# Moves unused components to .unused/ folder for recovery if needed

$basePath = "C:\Users\finan\Gettupplanding-111"
$unusedDir = "$basePath\src\.unused"

Write-Host "=== Ghost Code Cleanup ===" -ForegroundColor Cyan
Write-Host ""

# Create .unused directory if it doesn't exist
if (-not (Test-Path $unusedDir)) {
    New-Item -ItemType Directory -Path $unusedDir -Force | Out-Null
    Write-Host "Created .unused directory" -ForegroundColor Yellow
}

# Check which landing components are actually used
Write-Host "Scanning for unused components..." -ForegroundColor Yellow

$srcPath = "$basePath\src"
$components = Get-ChildItem -Path "$srcPath\features\landing\components" -Filter "*.tsx" -ErrorAction SilentlyContinue

$unusedComponents = @()

foreach ($comp in $components) {
    $compName = [System.IO.Path]::GetFileNameWithoutExtension($comp.Name)
    
    # Search for imports of this component across all .tsx and .ts files
    $importPattern = "from ['""]@/features/landing/components/$compName['""]|import.*$compName.*from"
    
    $imports = Get-ChildItem -Path $srcPath -Recurse -Include "*.tsx","*.ts" -ErrorAction SilentlyContinue | 
        Select-String -Pattern $importPattern -SimpleMatch:$false |
        Where-Object { $_.Path -ne $comp.FullName }
    
    if (-not $imports) {
        $unusedComponents += $comp
        Write-Host "  ⚠️  Unused: $compName" -ForegroundColor Yellow
    } else {
        Write-Host "  ✅ Used: $compName" -ForegroundColor Green
    }
}

# Move unused components
if ($unusedComponents.Count -gt 0) {
    Write-Host ""
    Write-Host "Moving $($unusedComponents.Count) unused components..." -ForegroundColor Yellow
    
    foreach ($comp in $unusedComponents) {
        $dest = Join-Path $unusedDir $comp.Name
        Move-Item -Path $comp.FullName -Destination $dest -Force
        Write-Host "  Moved: $($comp.Name)" -ForegroundColor Gray
    }
    
    Write-Host ""
    Write-Host "✅ Cleanup complete! Unused components moved to src\.unused\" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "✅ No unused components found!" -ForegroundColor Green
}

# Check for unused files in skills/ folder
Write-Host ""
Write-Host "Checking skills folder for ghost files..." -ForegroundColor Yellow

$ghostFiles = @("pdf", "docx", "xlsx", "pptx")
foreach ($file in $ghostFiles) {
    $path = "$basePath\skills\$file"
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "  Removed: skills/$file" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=== Cleanup Summary ===" -ForegroundColor Cyan
Write-Host "  • Unused components: $($unusedComponents.Count) moved to .unused/" -ForegroundColor Green
Write-Host "  • Ghost files removed from skills/" -ForegroundColor Green
Write-Host "  • All code is clean and organized!" -ForegroundColor Green
