# ================================================================================
# SCRIPT 1: Preparar Pacote Completo para Transferir via USB
# ================================================================================
# Este script cria um pacote ZIP com TODOS os arquivos necessários

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ELFON SERVICE OS - PACOTE OFFLINE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$origem = "C:\Users\edwal\OneDrive\os"
$destino = "$env:USERPROFILE\Desktop\elfon-os-offline"
$zip = "$env:USERPROFILE\Desktop\elfon-os-offline.zip"

# Remove pacote anterior se existir
if (Test-Path $destino) {
    Remove-Item $destino -Recurse -Force
    Write-Host "[OK] Pacote anterior removido" -ForegroundColor Green
}

if (Test-Path $zip) {
    Remove-Item $zip -Force
    Write-Host "[OK] ZIP anterior removido" -ForegroundColor Green
}

Write-Host ""
Write-Host "Copiando arquivos necessarios..." -ForegroundColor Yellow

# Cria pasta de destino
New-Item -ItemType Directory -Path $destino -Force | Out-Null

# Lista de arquivos essenciais
$arquivos = @(
    "index.html",
    "styles.css",
    "app.js",
    "manifest.json",
    "service-worker.js",
    "logo.jpg",
    "icon-192.png",
    "icon-512.png"
)

# Copia arquivos principais
foreach ($arquivo in $arquivos) {
    $source = Join-Path $origem $arquivo
    if (Test-Path $source) {
        Copy-Item $source $destino
        Write-Host "  [OK] $arquivo" -ForegroundColor Green
    } else {
        Write-Host "  [AVISO] $arquivo nao encontrado" -ForegroundColor Yellow
    }
}

# Copia pasta libs
$libsOrigem = Join-Path $origem "libs"
$libsDestino = Join-Path $destino "libs"

if (Test-Path $libsOrigem) {
    Copy-Item $libsOrigem $libsDestino -Recurse
    Write-Host "  [OK] libs/ (jsPDF)" -ForegroundColor Green
} else {
    Write-Host "  [ERRO] Pasta libs nao encontrada!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Criando arquivo ZIP..." -ForegroundColor Yellow

# Cria ZIP
Compress-Archive -Path "$destino\*" -DestinationPath $zip -Force

$tamanho = (Get-Item $zip).Length / 1MB
$tamanhoFormatado = "{0:N2} MB" -f $tamanho

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " PACOTE CRIADO COM SUCESSO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Localizacao:" -ForegroundColor Cyan
Write-Host "  $zip" -ForegroundColor White
Write-Host ""
Write-Host "Tamanho: $tamanhoFormatado" -ForegroundColor Cyan
Write-Host ""
Write-Host "PROXIMO PASSO:" -ForegroundColor Yellow
Write-Host "  1. Conecte o celular no PC via USB" -ForegroundColor White
Write-Host "  2. Copie a pasta ou o ZIP para o celular" -ForegroundColor White
Write-Host "  3. No celular, descompacte (se ZIP)" -ForegroundColor White
Write-Host "  4. Abra index.html com Chrome ou HTML Viewer" -ForegroundColor White
Write-Host ""

# Abre pasta no explorador
Start-Process explorer.exe -ArgumentList "/select,$zip"

Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
