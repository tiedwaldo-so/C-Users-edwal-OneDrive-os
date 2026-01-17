# 📱 Elfon Service - Sistema de Ordem de Serviço

Sistema PWA para criação de ordens de serviço com assinatura digital e captura de fotos.

---

## ⚡ INÍCIO RÁPIDO

### 🎯 Opção 1: Clique Duplo (Mais Fácil)
1. Clique duas vezes em **`INICIAR.ps1`**
2. Escolha a opção desejada
3. Pronto!

### 🎯 Opção 2: Abrir Diretamente
1. Clique duas vezes em **`index.html`**
2. Use o aplicativo no navegador

### 🎯 Opção 3: Servidor Local
```powershell
python -m http.server 8000
```
Acesse: http://localhost:8000

---

## 📚 ARQUIVOS DE AJUDA

| Arquivo | Descrição |
|---------|-----------|
| 📖 **guia-de-uso.html** | Guia visual completo (RECOMENDADO!) |
| 🧪 **teste-calculo.html** | Teste os cálculos antes de usar |
| 📄 **RESUMO-FINAL.txt** | Resumo de todas as correções |
| 📋 **LEIA-ME-IMPORTANTE.txt** | Instruções rápidas |

---

## 🔢 COMO USAR - VALORES MONETÁRIOS

**IMPORTANTE:** Digite apenas números (sem vírgula, sem R$)

| Quer digitar | Digite | Resultado |
|--------------|--------|-----------|
| R$ 50,00 | `5000` | 50,00 |
| R$ 100,00 | `10000` | 100,00 |
| R$ 15,50 | `1550` | 15,50 |

---

## ✅ CORREÇÕES APLICADAS

- ✅ **Cálculo por linha:** Quantidade × Valor Unitário
- ✅ **Total geral:** Soma de todas as linhas
- ✅ **Logo:** Logo da Elfon Service no cabeçalho
- ✅ **Atualização automática:** Valores calculados em tempo real

---

## 📱 FUNCIONALIDADES

- ✅ Formulário completo de OS
- ✅ Cálculo automático de valores
- ✅ Captura de fotos pela câmera
- ✅ Assinatura digital (técnico e cliente)
- ✅ Geração de PDF profissional
- ✅ Compartilhamento via WhatsApp, Email
- ✅ Instalável no Android (PWA)
- ✅ Funciona offline

---

## 🎓 EXEMPLO DE USO

**Cenário:** 2 serviços de R$ 50,00 + 3 peças de R$ 100,00

1. **Linha 1:**
   - Quantidade: `2`
   - Valor Unitário: digite `5000`
   - ✅ Valor Total: **R$ 100,00** (automático)

2. **Linha 2:**
   - Quantidade: `3`
   - Valor Unitário: digite `10000`
   - ✅ Valor Total: **R$ 300,00** (automático)

3. **📊 TOTAL GERAL: R$ 400,00** (automático)

---

## 🚀 COMO USAR NO CELULAR

1. Inicie servidor local no PC
2. Descubra o IP do PC: `ipconfig`
3. No celular (mesma rede Wi-Fi):
   - Acesse: `http://SEU_IP:8000`
   - Exemplo: `http://192.168.1.100:8000`
4. Instale na tela inicial:
   - Chrome: Menu ⋮ → "Adicionar à tela inicial"

---

## 🌐 DEPLOY ONLINE (RECOMENDADO)

Para usar como PWA completo, faça deploy gratuito:

- **Netlify:** https://www.netlify.com
- **Vercel:** https://vercel.com
- **GitHub Pages:** https://pages.github.com

Vantagens:
- ✅ HTTPS automático
- ✅ Acesso de qualquer lugar
- ✅ PWA instalável
- ✅ Compartilhamento fácil

---

## ❓ SOLUÇÃO DE PROBLEMAS

### ❌ Cálculos não funcionam
**Solução:** Digite apenas números no valor (ex: `5000` para R$ 50,00)

### ❌ Logo não aparece
**Solução:** Verifique se `logo.jpg` existe na pasta

### ❌ Assinatura não funciona
**Solução:** Use Chrome atualizado, limpe e tente novamente

### ❌ PDF não gera
**Solução:** Primeira vez precisa de internet, depois funciona offline

---

## 📞 CONTATO

**Elfon Service**
- 📧 Email: elfon@elfon.com.br
- 📱 Telefone: (15) 2102-4777
- 🌐 Site: www.elfon.com.br
- 🏢 CNPJ: 62.651.123/0001-40

---

## 📂 ESTRUTURA DO PROJETO

```
os/
├── 📱 index.html              # Aplicativo principal
├── 🎨 styles.css              # Estilos
├── ⚡ app.js                  # Lógica (CORRIGIDA)
├── 🖼️  logo.jpg               # Logo da empresa
├── 📋 manifest.json           # PWA
├── 🔧 service-worker.js       # Cache offline
├── 📖 guia-de-uso.html        # Guia completo
├── 🧪 teste-calculo.html      # Teste cálculos
├── 🚀 INICIAR.ps1             # Script inicialização
└── 📄 README-PT.md            # Este arquivo
```

---

## ✨ DICA PROFISSIONAL

**Antes de usar em produção:**
1. ✅ Abra `guia-de-uso.html` e leia tudo
2. ✅ Teste com `teste-calculo.html`
3. ✅ Faça testes completos no `index.html`
4. ✅ Teste no celular
5. ✅ Faça deploy online

---

**🎉 Tudo pronto! Comece usando o aplicativo agora!**

Para começar:
1. Clique duas vezes em **`INICIAR.ps1`** ⚡
2. Ou abra **`guia-de-uso.html`** 📖
