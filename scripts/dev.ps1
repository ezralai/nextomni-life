# ==============================================================================
# NextOmni Local Dev Orchestrator
# Concurrently boots Next.js Web (:3000) and FastAPI AI Engine (:8000)
# ==============================================================================

$Host.UI.RawUI.WindowTitle = "NextOmni Life (LifeOS) - Local Orchestrator"

Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host "   _  _          _    ___                   _    _     _  __     " -ForegroundColor Green
Write-Host "  | \| |_____ __| |_ / _ \ _ __  _ _  _ _  (_)  | |   (_)/ _|___ " -ForegroundColor Green
Write-Host "  | .` / -_) \ /  _| (_) | '  \| ' \| | | | |  | |__ | |  _/ -_)" -ForegroundColor Green
Write-Host "  |_|\_\___/_\_\\__|\___/|_|_|_|_||_|_|_| |_|  |____||_|_| \___|" -ForegroundColor Green
Write-Host "   The Intelligent Operating System for Human Flourishing (LifeOS)" -ForegroundColor DarkGreen
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host ""

$MonorepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $MonorepoRoot

Write-Host "[1/3] Verifying environment & workspace..." -ForegroundColor Yellow
if (-not (Test-Path "$MonorepoRoot\.env")) {
    if (Test-Path "$MonorepoRoot\.env.example") {
        Copy-Item "$MonorepoRoot\.env.example" "$MonorepoRoot\.env"
        Write-Host "  -> Generated .env from .env.example" -ForegroundColor Green
    }
}

# 1. Start FastAPI AI Engine (:8000)
Write-Host "[2/3] Launching FastAPI AI Engine on port 8000..." -ForegroundColor Yellow
$aiProcess = Start-Process -FilePath "python" -ArgumentList "-m", "uvicorn", "main:app", "--app-dir", "apps/ai-engine", "--host", "127.0.0.1", "--port", "8000", "--reload" -PassThru -NoNewWindow

Start-Sleep -Seconds 2

# 2. Start Next.js Web App (:3000)
Write-Host "[3/3] Launching NextOmni Life Web Application on port 3000..." -ForegroundColor Yellow
$webProcess = Start-Process -FilePath "npm" -ArgumentList "run", "--prefix", "apps/web", "dev" -PassThru -NoNewWindow

Write-Host ""
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host "   NextOmni Life (LifeOS) Ecosystem is LIVE!" -ForegroundColor Green
Write-Host "   - LifeOS Command Center:  http://localhost:3000/life" -ForegroundColor Cyan
Write-Host "   - Unified Overview:       http://localhost:3000" -ForegroundColor Cyan
Write-Host "   - FastAPI Neural Engine:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "   - OpenAPI Swagger Docs:   http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host "Press Ctrl+C to terminate both servers..." -ForegroundColor DarkGray
Write-Host ""

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    Write-Host "`nGracefully terminating NextOmni services..." -ForegroundColor Yellow
    if ($aiProcess -and -not $aiProcess.HasExited) {
        Stop-Process -Id $aiProcess.Id -Force -ErrorAction SilentlyContinue
    }
    if ($webProcess -and -not $webProcess.HasExited) {
        Stop-Process -Id $webProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Write-Host "All NextOmni processes stopped." -ForegroundColor Green
}
