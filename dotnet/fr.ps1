# rename-recursive.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$Find,
    
    [Parameter(Mandatory=$true)]
    [string]$Replace
)

# Get all items (files and directories) recursively, sorted by depth (deepest first)
# This ensures we rename children before parents to avoid path issues
$items = Get-ChildItem -Path . -Recurse -Force | 
    Where-Object { $_.Name -like "*$Find*" } |
    Sort-Object { $_.FullName.Split([IO.Path]::DirectorySeparatorChar).Count } -Descending

if ($items.Count -eq 0) {
    Write-Host "No files or directories found containing '$Find'" -ForegroundColor Yellow
    exit
}

Write-Host "Found $($items.Count) items to rename:" -ForegroundColor Cyan
$items | ForEach-Object { Write-Host "  $($_.FullName)" -ForegroundColor Gray }
Write-Host ""

$renamed = 0
foreach ($item in $items) {
    $newName = $item.Name -replace [regex]::Escape($Find), $Replace
    $newPath = Join-Path $item.Parent.FullName $newName
    
    try {
        Rename-Item -Path $item.FullName -NewName $newName -ErrorAction Stop
        Write-Host "✓ Renamed: $($item.FullName) -> $newPath" -ForegroundColor Green
        $renamed++
    }
    catch {
        Write-Host "✗ Failed: $($item.FullName) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Successfully renamed $renamed of $($items.Count) items" -ForegroundColor Cyan