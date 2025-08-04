# GitHub Copilot Cache Clear Script
# Run this to optimize Copilot performance

Write-Host "🧹 Clearing GitHub Copilot and VS Code caches..." -ForegroundColor Yellow

# Close VS Code if running
$vscodeProcesses = Get-Process "Code" -ErrorAction SilentlyContinue
if ($vscodeProcesses) {
    Write-Host "Closing VS Code..." -ForegroundColor Yellow
    $vscodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Cache paths to clear
$cachePaths = @(
    "$env:APPDATA\Code\User\workspaceStorage",
    "$env:APPDATA\Code\User\History", 
    "$env:APPDATA\Code\logs",
    "$env:APPDATA\Code\CachedExtensions",
    "$env:APPDATA\github-copilot",
    "$env:LOCALAPPDATA\github-copilot",
    "$env:TEMP\vscode-*"
)

$clearedCount = 0
foreach ($path in $cachePaths) {
    if (Test-Path $path) {
        try {
            Write-Host "🗑️  Clearing: $path" -ForegroundColor Green
            Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
            $clearedCount++
        }
        catch {
            Write-Host "⚠️  Could not clear: $path" -ForegroundColor Yellow
        }
    }
}

# Clear VS Code extension host cache
Write-Host "🔧 Clearing extension host cache..." -ForegroundColor Green

# Clear temporary files
Get-ChildItem -Path $env:TEMP -Filter "*copilot*" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path $env:TEMP -Filter "*vscode*" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "✅ Cache optimization completed!" -ForegroundColor Green
Write-Host "📊 Cleared $clearedCount cache locations" -ForegroundColor Cyan
Write-Host "🚀 Restart VS Code to see performance improvements" -ForegroundColor Yellow
Write-Host ""

# Optionally restart VS Code
$restart = Read-Host "Would you like to restart VS Code now? (y/N)"
if ($restart -eq "y" -or $restart -eq "Y") {
    Start-Process "code" -ArgumentList "."
    Write-Host "🎯 VS Code restarted in current directory" -ForegroundColor Green
}
