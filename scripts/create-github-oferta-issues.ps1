#Requires -Version 5.1
<#
.SYNOPSIS
  Creates GitHub labels and issues from oferta-vs-projekt-orthomedica.csv (repo root).

.DESCRIPTION
  Requires: gh auth login
  Refuses second import unless -Force (checks label oferta/import-batch).

.PARAMETER Force
  Skip duplicate check.

.PARAMETER DryRun
  Print actions only.

.EXAMPLE
  .\scripts\create-github-oferta-issues.ps1
.EXAMPLE
  .\scripts\create-github-oferta-issues.ps1 -DryRun
#>
param(
  [switch]$Force,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$CsvPath = Join-Path $RepoRoot 'oferta-vs-projekt-orthomedica.csv'
$BatchLabel = 'oferta/import-batch'

function Get-GhExe {
  $cmd = Get-Command gh -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  $p = 'C:\Program Files\GitHub CLI\gh.exe'
  if (Test-Path $p) { return $p }
  throw 'GitHub CLI (gh) not found. Install: winget install GitHub.cli'
}

function Get-RepoSlug {
  Push-Location $RepoRoot
  try {
    $url = git remote get-url origin 2>$null
  } finally { Pop-Location }
  if ($url -match 'github\.com[:/]([^/]+)/([^/.]+?)(?:\.git)?$') {
    return "$($Matches[1])/$($Matches[2])"
  }
  throw "Cannot parse git remote: $url"
}

function Invoke-Gh {
  param([string[]]$Args)
  if ($DryRun) {
    Write-Host "[DRY-RUN] gh $($Args -join ' ')"
    return
  }
  & $script:GhExe @Args
  if ($LASTEXITCODE -ne 0) { throw "gh exited with code $LASTEXITCODE" }
}

function Ensure-Label {
  param([string]$Name, [string]$Color, [string]$Description)
  if ($DryRun) {
    Write-Host "[DRY-RUN] label create $Name"
    return
  }
  $null = & $script:GhExe label create $Name --color $Color --description $Description -R $script:RepoSlug 2>&1
  if ($LASTEXITCODE -ne 0) {
    # already exists
  }
}

# Czesciowo: third char is latin small e with ogonek (U+0119)
function Get-StatusBucket {
  param([string]$status)
  if ($status -eq 'Gotowe') { return 'done' }
  if ($status.Length -ge 5 -and $status.StartsWith('Wynik')) { return 'biz' }
  if ($status.StartsWith('Do zrob')) { return 'todo' }
  if ($status.Length -ge 4 -and $status[2] -eq [char]0x0119 -and $status.EndsWith('owo')) { return 'partial' }
  return 'partial'
}

$GhExe = Get-GhExe
$RepoSlug = Get-RepoSlug
$script:GhExe = $GhExe
$script:RepoSlug = $RepoSlug

if (-not (Test-Path $CsvPath)) {
  throw "Missing CSV: $CsvPath"
}

if (-not $DryRun) {
  $null = & $GhExe auth status 2>$null
  if ($LASTEXITCODE -ne 0) {
    throw 'Run: gh auth login (install: winget install GitHub.cli)'
  }
}

if (-not $Force -and -not $DryRun) {
  $listJson = & $GhExe issue list -R $RepoSlug -l $BatchLabel --limit 1 --json number 2>$null
  if ($listJson -and $listJson -ne '[]') {
    throw "Issues with label $BatchLabel already exist. Use -Force to add another batch (duplicates risk)."
  }
}

Write-Host "Repo: $RepoSlug"
Write-Host "CSV: $CsvPath"
if ($DryRun) { Write-Host "Mode: DRY-RUN`n" }

Ensure-Label 'oferta/gotowe' '0E8A16' 'Done in offer review'
Ensure-Label 'oferta/czesciowo' 'FBCA04' 'Partial / needs work'
Ensure-Label 'oferta/do-zrobienia' 'D73A49' 'Todo'
Ensure-Label 'oferta/wynik-biznesowy' '5319E7' 'Business outcome / out of repo'
Ensure-Label $BatchLabel '1D76DB' 'Offer checklist import batch'

$rows = Import-Csv -Path $CsvPath -Encoding UTF8
$created = 0

foreach ($r in $rows) {
  $nr = $r.Nr.Trim()
  $title = "[$nr] $($r.'Punkt oferty')"
  $body = @"
**Section:** $($r.Sekcja)

**Status:** $($r.Status)

**Notes:** $($r.'Uwagi / stan w repozytorium')

---
_From ``oferta-vs-projekt-orthomedica.csv`` — use GitHub Projects + labels ``oferta/*`` for a Trello-style board._
"@

  $bucket = Get-StatusBucket $r.Status.Trim()
  $labels = @($BatchLabel)
  $close = $false

  switch ($bucket) {
    'done' { $labels += 'oferta/gotowe'; $close = $true }
    'partial' { $labels += 'oferta/czesciowo'; $close = $false }
    'todo' { $labels += 'oferta/do-zrobienia'; $close = $false }
    'biz' { $labels += 'oferta/wynik-biznesowy'; $close = $true }
  }

  $labelArg = ($labels | ForEach-Object { @('-l', $_) })

  if ($DryRun) {
    Write-Host "Issue: $title | bucket=$bucket closed=$close | $($labels -join ', ')"
    $created++
    continue
  }

  $json = & $GhExe issue create -R $RepoSlug -t $title -b $body @labelArg --json number -q .number
  if ($LASTEXITCODE -ne 0) { throw "Failed to create issue: $title" }

  if ($close -and $json) {
    Invoke-Gh @('issue', 'close', $json, '-R', $RepoSlug, '-c', 'Auto-closed: marked done in offer checklist import.')
  }
  $created++
  Write-Host "Created #$json : $title"
}

Write-Host ""
Write-Host "Finished: $created issues."
if (-not $DryRun) {
  Write-Host @"
Next: open https://github.com/$RepoSlug/projects and create a Board project, add issues (filter: label:$BatchLabel).
Issues list: https://github.com/$RepoSlug/issues
"@
}
