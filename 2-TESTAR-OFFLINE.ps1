# ================================================================================
# SCRIPT 2: Testar Modo Offline no PC (Antes de instalar no celular)
# ================================================================================
# Este script inicia um servidor local e mostra como testar offline

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " ELFON SERVICE OS - TESTE OFFLINE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$porta = 8080
$caminho = "C:\Users\edwal\OneDrive\os"

Write-Host "Iniciando servidor local na porta $porta..." -ForegroundColor Yellow
Write-Host ""

# Verifica se Python está instalado
$pythonInstalado = $false
try {
    $pythonVersao = python --version 2>&1
    if ($pythonVersao -match "Python") {
        $pythonInstalado = $true
        Write-Host "[OK] Python encontrado: $pythonVersao" -ForegroundColor Green
    }
} catch {
    Write-Host "[AVISO] Python nao encontrado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " INSTRUCOES PARA TESTE OFFLINE" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($pythonInstalado) {
    Write-Host "1. Abrindo navegador em http://localhost:$porta" -ForegroundColor White
    Write-Host ""
    
    # Inicia servidor Python
    Set-Location $caminho
    Start-Process "http://localhost:$porta"
    
    Write-Host "2. No Chrome, pressione F12 (DevTools)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Va em: Application > Service Workers" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "4. Marque a opcao 'Offline'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "5. Recarregue a pagina (F5)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "6. Se carregar normalmente = FUNCIONA OFFLINE!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Servidor rodando. Pressione Ctrl+C para parar." -ForegroundColor White
    Write-Host ""
    
    python -m http.server $porta
    
} else {
    Write-Host "Python nao esta instalado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "OPCOES:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPCAO 1: Instalar Python" -ForegroundColor Cyan
    Write-Host "  1. Baixe em: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "  2. Execute este script novamente" -ForegroundColor White
    Write-Host ""
    Write-Host "OPCAO 2: Usar servidor embutido do Windows" -ForegroundColor Cyan
    Write-Host "  1. Abra index.html diretamente no Chrome" -ForegroundColor White
    Write-Host "  2. Pressione F12" -ForegroundColor White
    Write-Host "  3. Va em Application > Service Workers" -ForegroundColor White
    Write-Host "  4. Marque 'Offline' e recarregue (F5)" -ForegroundColor White
    Write-Host ""
    
    # Abre o arquivo diretamente
    $indexPath = Join-Path $caminho "index.html"
    Start-Process chrome.exe -ArgumentList $indexPath
    
    Write-Host "Arquivo aberto no Chrome!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
