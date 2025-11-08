# clean-build-dirs.ps1

# Find all bin and obj directories recursively
$dirsToDelete = Get-ChildItem -Path . -Recurse -Force -Directory | 
    Where-Object { $_.Name -eq "bin" -or $_.Name -eq "obj" }

if ($dirsToDelete.Count -eq 0) {
    Write-Host "No bin or obj directories found" -ForegroundColor Yellow
    exit
}

Write-Host "Found $($dirsToDelete.Count) directories to delete:" -ForegroundColor Cyan
$dirsToDelete | ForEach-Object { Write-Host "  $($_.FullName)" -ForegroundColor Gray }
Write-Host ""

$deleted = 0
foreach ($dir in $dirsToDelete) {
    try {
        Remove-Item -Path $dir.FullName -Recurse -Force -ErrorAction Stop
        Write-Host "✓ Deleted: $($dir.FullName)" -ForegroundColor Green
        $deleted++
    }
    catch {
        Write-Host "✗ Failed: $($dir.FullName) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Successfully deleted $deleted of $($dirsToDelete.Count) directories" -ForegroundColor Cyan