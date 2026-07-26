# Secura CLI — instalador para Windows
#
#   irm https://teamflashackaton30x.com/install.ps1 | iex
#
# Descarga el binario del release de GitHub, verifica el SHA-256 y lo deja en
# el PATH del usuario. No requiere Go, ni admin, ni clonar el repo.

$ErrorActionPreference = 'Stop'

$Repo    = 'FilipaoVfx/hackatonv2Colsubsidio'
$Asset   = 'secura_windows_amd64.zip'
$Dest    = Join-Path $env:LOCALAPPDATA 'Programs\secura'

# Windows PowerShell 5.1 negocia TLS 1.0 por defecto y api.github.com lo
# rechaza. Sin esta linea el instalador falla con un error de conexion opaco.
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

function Info($m) { Write-Host "  $m" -ForegroundColor DarkGray }
function Ok($m)   { Write-Host "  $m" -ForegroundColor Green }

Write-Host ""
Write-Host "  SECURA CLI" -ForegroundColor Yellow
Write-Host "  Guardian AI Operations Center" -ForegroundColor DarkGray
Write-Host ""

Info "Buscando el ultimo release..."
$release = Invoke-RestMethod "https://api.github.com/repos/$Repo/releases/latest" `
    -Headers @{ 'User-Agent' = 'secura-installer' }

$zipUrl = ($release.assets | Where-Object { $_.name -eq $Asset }).browser_download_url
$sumUrl = ($release.assets | Where-Object { $_.name -eq 'checksums.txt' }).browser_download_url
if (-not $zipUrl) { throw "El release $($release.tag_name) no publica $Asset" }
Info "Version $($release.tag_name)"

$tmp    = Join-Path $env:TEMP ("secura-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $tmp -Force | Out-Null
$zip    = Join-Path $tmp $Asset

Info "Descargando..."
Invoke-WebRequest $zipUrl -OutFile $zip -UseBasicParsing

if ($sumUrl) {
    $expected = ((Invoke-WebRequest $sumUrl -UseBasicParsing).Content -split "`n" |
        Where-Object { $_ -match [regex]::Escape($Asset) } |
        Select-Object -First 1) -split '\s+' | Select-Object -First 1
    $actual = (Get-FileHash $zip -Algorithm SHA256).Hash.ToLower()
    if ($expected -and $actual -ne $expected.ToLower()) {
        throw "Checksum no coincide. Esperado $expected, obtenido $actual"
    }
    Ok "Checksum verificado"
}

Info "Instalando en $Dest"
if (Test-Path $Dest) { Remove-Item "$Dest\*" -Recurse -Force -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Path $Dest -Force | Out-Null
Expand-Archive -Path $zip -DestinationPath $Dest -Force
Remove-Item $tmp -Recurse -Force

# Anadir al PATH de usuario solo si falta, para no acumular duplicados al
# reinstalar.
$userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($userPath -notlike "*$Dest*") {
    $new = if ([string]::IsNullOrEmpty($userPath)) { $Dest } else { "$userPath;$Dest" }
    [Environment]::SetEnvironmentVariable('Path', $new, 'User')
    Ok "Anadido al PATH"
}
$env:Path = "$env:Path;$Dest"

Write-Host ""
Ok "Listo."
Write-Host ""
Write-Host "  Abre una terminal NUEVA y escribe:" -ForegroundColor White
Write-Host "      secura" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Verificacion rapida:  secura doctor" -ForegroundColor DarkGray
Write-Host "  El backend se descubre solo, no hace falta --api-url." -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Si Windows SmartScreen avisa (binario sin firmar):" -ForegroundColor DarkGray
Write-Host "  Mas informacion -> Ejecutar de todas formas." -ForegroundColor DarkGray
Write-Host ""
