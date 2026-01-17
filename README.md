# Elfon Service - Sistema de Ordem de Serviço

Aplicativo PWA (Progressive Web App) para criação de ordens de serviço móvel com captura de assinatura digital e fotos.

## 🚀 Funcionalidades

- ✅ Formulário completo de ordem de serviço
- ✅ Dados da empresa Elfon Service no cabeçalho
- ✅ Campos do cliente (CNPJ, IE, endereço, telefone, etc.)
- ✅ Tabela de itens/serviços com cálculo automático
- ✅ Captura de fotos pela câmera do celular/tablet
- ✅ Assinatura digital do técnico e cliente via touch/mouse
- ✅ Geração de PDF completo
- ✅ Compartilhamento do PDF via WhatsApp, Email, etc.
- ✅ Funciona offline (PWA)
- ✅ Instalável na tela inicial do Android

## 📱 Como usar

### Instalação

1. Primeiro, gere os ícones PNG:
   - Abra o arquivo `generate-icons.html` no navegador
   - Clique nos botões para baixar `icon-192.png`, `icon-512.png` e `logo.png`
   - Salve os arquivos na pasta do projeto

2. Configure um servidor web local ou faça deploy:
   
   **Opção A - Servidor Local (para testes):**
   ```powershell
   # Usando Python (se instalado)
   python -m http.server 8000
   
   # Ou usando Node.js (se instalado)
   npx http-server -p 8000
   ```
   
   **Opção B - Deploy Online (recomendado para PWA):**
   - GitHub Pages
   - Netlify
   - Vercel
   - Firebase Hosting
   
   ⚠️ **IMPORTANTE**: PWA requer HTTPS para funcionar completamente (exceto localhost)

3. Acesse o aplicativo pelo celular/tablet Android

4. Para instalar como app:
   - No Chrome Android: Menu (⋮) → "Adicionar à tela inicial"
   - Ou use o banner de instalação que aparece automaticamente

### Uso do Aplicativo

1. **Preencher dados do cliente**
   - Os campos CNPJ, CEP e Telefone têm máscaras automáticas

2. **Adicionar itens/serviços**
   - Clique em "+ Adicionar Item" para novas linhas
   - Digite quantidade, descrição e valor unitário
   - O valor total é calculado automaticamente

3. **Adicionar fotos**
   - Clique em "📷 Adicionar Foto"
   - Escolha tirar foto ou selecionar da galeria
   - As fotos são redimensionadas automaticamente

4. **Assinar**
   - Use o dedo ou caneta stylus para assinar nos campos de assinatura
   - Técnico e cliente assinam em campos separados
   - Use "Limpar" para refazer a assinatura

5. **Gerar PDF**
   - Clique em "📄 Gerar PDF"
   - O PDF será gerado com todos os dados
   - Opção de compartilhar via apps do Android ou fazer download

6. **Limpar formulário**
   - Clique em "🔄 Limpar Formulário" para começar nova OS

## 📋 Estrutura dos Arquivos

```
os/
├── index.html              # Interface principal
├── styles.css              # Estilização responsiva
├── app.js                  # Lógica do aplicativo
├── manifest.json           # Configuração PWA
├── service-worker.js       # Cache offline
├── generate-icons.html     # Gerador de ícones
├── icon-192.png           # Ícone 192x192 (gerar)
├── icon-512.png           # Ícone 512x512 (gerar)
├── logo.png               # Logo da empresa (gerar)
├── icon-192.svg           # Ícone SVG fonte
├── icon-512.svg           # Ícone SVG fonte
└── logo.svg               # Logo SVG fonte
```

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilização responsiva
- **JavaScript** - Lógica e interatividade
- **jsPDF** - Geração de PDF
- **jsPDF-AutoTable** - Tabelas no PDF
- **PWA** - Progressive Web App
- **Service Worker** - Cache offline
- **Web Share API** - Compartilhamento

## 📝 Observações

- O aplicativo **não salva** dados localmente (conforme requisito)
- Cada OS gera um PDF independente
- As fotos são incluídas no PDF
- Numeração da OS é editável manualmente
- Funciona offline após o primeiro carregamento
- Otimizado para telas touch (celular/tablet)

## 🐛 Solução de Problemas

**PWA não instala:**
- Verifique se está usando HTTPS (ou localhost)
- Certifique-se que os ícones PNG foram gerados

**Assinatura não funciona:**
- Use navegador atualizado (Chrome recomendado)
- Tente limpar e assinar novamente

**PDF não gera:**
- Verifique se há conexão (primeira vez precisa carregar bibliotecas)
- Depois funciona offline

**Fotos não aparecem:**
- Dê permissão de câmera ao navegador
- Verifique se o formato é imagem válida

## 📞 Contato

**Elfon Service**
- Email: elfon@elfon.com.br
- Telefone: (15) 2102-4777
- Site: www.elfon.com.br
- CNPJ: 62.651.123/0001-40
