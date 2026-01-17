# ===================================================
# Script de Inicialização - Elfon Service OS
# ===================================================

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  ELFON SERVICE - ORDEM DE SERVIÇO" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está na pasta correta
$currentPath = Get-Location
Write-Host "📂 Pasta atual: $currentPath" -ForegroundColor Green

# Verificar se os arquivos principais existem
Write-Host ""
Write-Host "🔍 Verificando arquivos..." -ForegroundColor Cyan

$files = @("index.html", "app.js", "styles.css", "logo.jpg")
$allFilesExist = $true

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (FALTANDO!)" -ForegroundColor Red
        $allFilesExist = $false
    }
}

Write-Host ""

if (-not $allFilesExist) {
    Write-Host "⚠️  ATENÇÃO: Alguns arquivos estão faltando!" -ForegroundColor Red
    Write-Host "   Certifique-se de estar na pasta correta." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione ENTER para sair"
    exit
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  OPÇÕES DE INICIALIZAÇÃO" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Abrir aplicativo no navegador (arquivo local)" -ForegroundColor White
Write-Host "2️⃣  Iniciar servidor Python (recomendado)" -ForegroundColor White
Write-Host "3️⃣  Iniciar servidor Node.js (http-server)" -ForegroundColor White
Write-Host "4️⃣  Abrir guia de uso" -ForegroundColor White
Write-Host "5️⃣  Testar cálculos" -ForegroundColor White
Write-Host "6️⃣  Sair" -ForegroundColor White
Write-Host ""

$option = Read-Host "Escolha uma opção (1-6)"

switch ($option) {
    "1" {
        Write-Host ""
        Write-Host "🌐 Abrindo aplicativo no navegador..." -ForegroundColor Green
        Start-Process "index.html"
    }
    "2" {
        Write-Host ""
        Write-Host "🐍 Verificando Python..." -ForegroundColor Cyan
        
        try {
            $pythonVersion = python --version 2>&1
            Write-Host "  ✅ Python encontrado: $pythonVersion" -ForegroundColor Green
            Write-Host ""
            Write-Host "🚀 Iniciando servidor na porta 8000..." -ForegroundColor Green
            Write-Host ""
            Write-Host "📱 Acesse no navegador:" -ForegroundColor Yellow
            Write-Host "   🔹 Local: http://localhost:8000" -ForegroundColor White
            
            # Pegar IP local
            $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}).IPAddress
            if ($ip) {
                Write-Host "   🔹 Celular (mesma rede): http://${ip}:8000" -ForegroundColor White
            }
            
            Write-Host ""
            Write-Host "⏹️  Pressione CTRL+C para parar o servidor" -ForegroundColor Red
            Write-Host ""
            
            python -m http.server 8000
        }
        catch {
            Write-Host "  ❌ Python não encontrado!" -ForegroundColor Red
            Write-Host ""
            Write-Host "📥 Instale Python em: https://www.python.org/downloads/" -ForegroundColor Yellow
            Write-Host "   Ou escolha a opção 3 (Node.js)" -ForegroundColor Yellow
        }
    }
    "3" {
        Write-Host ""
        Write-Host "🟢 Verificando Node.js..." -ForegroundColor Cyan
        
        try {
            $nodeVersion = node --version 2>&1
            Write-Host "  ✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
            Write-Host ""
            Write-Host "🚀 Iniciando servidor na porta 8000..." -ForegroundColor Green
            Write-Host ""
            Write-Host "📱 Acesse no navegador:" -ForegroundColor Yellow
            Write-Host "   🔹 Local: http://localhost:8000" -ForegroundColor White
            
            # Pegar IP local
            $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*"}).IPAddress
            if ($ip) {
                Write-Host "   🔹 Celular (mesma rede): http://${ip}:8000" -ForegroundColor White
            }
            
            Write-Host ""
            Write-Host "⏹️  Pressione CTRL+C para parar o servidor" -ForegroundColor Red
            Write-Host ""
            
            npx http-server -p 8000
        }
        catch {
            Write-Host "  ❌ Node.js não encontrado!" -ForegroundColor Red
            Write-Host ""
            Write-Host "📥 Instale Node.js em: https://nodejs.org/" -ForegroundColor Yellow
            Write-Host "   Ou escolha a opção 2 (Python)" -ForegroundColor Yellow
        }
    }
    "4" {
        Write-Host ""
        Write-Host "📖 Abrindo guia de uso..." -ForegroundColor Green
        Start-Process "guia-de-uso.html"
    }
    "5" {
        Write-Host ""
        Write-Host "🧪 Abrindo teste de cálculos..." -ForegroundColor Green
        Start-Process "teste-calculo.html"
    }
    "6" {
        Write-Host ""
        Write-Host "👋 Até logo!" -ForegroundColor Cyan
        exit
    }
    default {
        Write-Host ""
        Write-Host "❌ Opção inválida!" -ForegroundColor Red
    }
}

Write-Host ""
Read-Host "Pressione ENTER para sair"
