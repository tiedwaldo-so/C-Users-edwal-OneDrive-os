let itemCounter = 0;
let photos = [];
let signatureCanvases = {};

document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
    setupSignatureCanvases();
    addInitialRows();
});

function initializeForm() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('data').value = today;
    
    const now = new Date();
    const horaAtual = now.toTimeString().slice(0, 5);
    document.getElementById('horaInicial').value = horaAtual;
}

function setupEventListeners() {
    document.getElementById('addItemBtn').addEventListener('click', addItemRow);
    document.getElementById('addPhotoBtn').addEventListener('click', () => {
        document.getElementById('photoInput').click();
    });
    document.getElementById('photoInput').addEventListener('change', handlePhotoUpload);
    document.getElementById('generatePdfBtn').addEventListener('click', generatePDF);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
    
    document.getElementById('cnpj').addEventListener('input', function(e) {
        e.target.value = maskCNPJ(e.target.value);
    });
    
    document.getElementById('cep').addEventListener('input', function(e) {
        e.target.value = maskCEP(e.target.value);
    });
    
    document.getElementById('telefone').addEventListener('input', function(e) {
        e.target.value = maskPhone(e.target.value);
    });
}

function maskCNPJ(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    return value;
}

function maskCEP(value) {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    return value;
}

function maskPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
}

function addInitialRows() {
    for (let i = 0; i < 18; i++) {
        addItemRow();
    }
}

function addItemRow() {
    itemCounter++;
    const currentRow = itemCounter;
    const tbody = document.getElementById('itemsTableBody');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td class="item-number">${currentRow}</td>
        <td class="item-quantity">
            <input type="number" class="quantity-input" min="0" step="0.01" value="" data-row="${currentRow}">
        </td>
        <td class="item-description">
            <input type="text" class="description-input" placeholder="Descrição do item/serviço">
        </td>
        <td class="item-price">
            <input type="text" class="price-input" placeholder="0,00" data-row="${currentRow}">
        </td>
        <td class="item-total">
            <input type="text" class="total-input" readonly placeholder="0,00" data-row="${currentRow}">
        </td>
        <td class="item-action">
            <button type="button" class="btn-remove" onclick="removeItemRow(this)">Remover</button>
        </td>
    `;
    
    const quantityInput = row.querySelector('.quantity-input');
    const priceInput = row.querySelector('.price-input');
    
    quantityInput.addEventListener('input', function() {
        calculateRowTotal(currentRow);
    });
    
    priceInput.addEventListener('input', function(e) {
        e.target.value = formatCurrency(e.target.value);
        calculateRowTotal(currentRow);
    });
}

function removeItemRow(btn) {
    const row = btn.parentElement.parentElement;
    row.remove();
    updateItemNumbers();
    calculateGrandTotal();
}

function updateItemNumbers() {
    const tbody = document.getElementById('itemsTableBody');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function formatCurrency(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    if (value === '') return '';
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    return value;
}

function parseCurrency(value) {
    if (!value) return 0;
    return parseFloat(value.toString().replace(/\./g, '').replace(',', '.')) || 0;
}

function calculateRowTotal(rowNum) {
    const quantityInput = document.querySelector(`.quantity-input[data-row="${rowNum}"]`);
    const priceInput = document.querySelector(`.price-input[data-row="${rowNum}"]`);
    const totalInput = document.querySelector(`.total-input[data-row="${rowNum}"]`);
    
    if (quantityInput && priceInput && totalInput) {
        const quantity = parseFloat(quantityInput.value) || 0;
        const priceValue = priceInput.value;
        const price = parseCurrency(priceValue);
        const total = quantity * price;
        
        if (total > 0) {
            totalInput.value = total.toFixed(2).replace('.', ',');
        } else {
            totalInput.value = '';
        }
        calculateGrandTotal();
    }
}

function calculateGrandTotal() {
    const totalInputs = document.querySelectorAll('.total-input');
    let grandTotal = 0;
    
    totalInputs.forEach(input => {
        const value = parseCurrency(input.value);
        grandTotal += value;
    });
    
    const valorTotalField = document.getElementById('valorTotal');
    if (valorTotalField) {
        if (grandTotal > 0) {
            valorTotalField.value = 'R$ ' + grandTotal.toFixed(2).replace('.', ',');
        } else {
            valorTotalField.value = 'R$ 0,00';
        }
    }
}

function setupSignatureCanvases() {
    setupCanvas('signatureTecnico');
    setupCanvas('signatureCliente');
}

function setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    signatureCanvases[canvasId] = { canvas, ctx, isEmpty: true };
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        lastX = x;
        lastY = y;
        signatureCanvases[canvasId].isEmpty = false;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
}

function clearSignature(canvasId) {
    const canvasData = signatureCanvases[canvasId];
    if (canvasData) {
        canvasData.ctx.clearRect(0, 0, canvasData.canvas.width, canvasData.canvas.height);
        canvasData.isEmpty = true;
    }
}

function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 800;
                    
                    if (width > height && width > maxSize) {
                        height = (height / width) * maxSize;
                        width = maxSize;
                    } else if (height > maxSize) {
                        width = (width / height) * maxSize;
                        height = maxSize;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const resizedImage = canvas.toDataURL('image/jpeg', 0.8);
                    photos.push(resizedImage);
                    displayPhotos();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    e.target.value = '';
}

function displayPhotos() {
    const gallery = document.getElementById('photoGallery');
    gallery.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo}" alt="Foto ${index + 1}">
            <button class="remove-photo" onclick="removePhoto(${index})">×</button>
        `;
        gallery.appendChild(photoItem);
    });
}

function removePhoto(index) {
    photos.splice(index, 1);
    displayPhotos();
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPos = 15;
    
    // LADO ESQUERDO - LOGO (ALTA QUALIDADE)
    try {
        const logoImg = document.querySelector('.header-left .logo');
        if (logoImg && logoImg.complete) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Configuração de alta qualidade
            const pdfWidth = 45;  // Largura no PDF (mm)
            const pdfHeight = 30; // Altura no PDF (mm)
            
            // SUPER-SAMPLING: Renderiza em 4x a resolução final
            const scale = 4;
            const dpi = 300; // DPI para impressão de alta qualidade
            const mmToInch = 0.0393701;
            
            // Calcula dimensões em pixels para 300 DPI
            const targetWidthPx = Math.round(pdfWidth * mmToInch * dpi);
            const targetHeightPx = Math.round(pdfHeight * mmToInch * dpi);
            
            // Dimensões originais da imagem
            let imgWidth = logoImg.naturalWidth;
            let imgHeight = logoImg.naturalHeight;
            
            // Calcula proporção para caber no espaço disponível
            const ratio = Math.min(targetWidthPx / imgWidth, targetHeightPx / imgHeight);
            const finalWidth = Math.round(imgWidth * ratio);
            const finalHeight = Math.round(imgHeight * ratio);
            
            // Canvas em alta resolução (4x)
            canvas.width = finalWidth * scale;
            canvas.height = finalHeight * scale;
            
            // Configurações de renderização de alta qualidade
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Fundo branco
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Desenha a imagem em alta resolução
            ctx.drawImage(logoImg, 0, 0, canvas.width, canvas.height);
            
            // Converte para PNG com qualidade máxima
            const logoDataUrl = canvas.toDataURL('image/png', 1.0);
            
            // Calcula dimensões finais no PDF mantendo proporção
            const finalPdfWidth = (finalWidth / dpi) / mmToInch;
            const finalPdfHeight = (finalHeight / dpi) / mmToInch;
            
            // Adiciona ao PDF
            doc.addImage(logoDataUrl, 'PNG', 10, yPos, finalPdfWidth, finalPdfHeight);
        }
    } catch (error) {
        console.log('Erro ao adicionar logo ao PDF:', error);
    }
    
    // CENTRO - ELFON SERVICE + ORDEM DE SERVIÇO
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Elfon Service', 105, yPos + 8, { align: 'center' });
    
    const osNumber = document.getElementById('osNumber').value;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Ordem de Serviço Nº: ${osNumber}`, 105, yPos + 18, { align: 'center' });
    
    // LADO DIREITO - DADOS DA EMPRESA
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.text('Email: elfon@elfon.com.br', 200, yPos + 3, { align: 'right' });
    doc.text('Telefone: (15) 2102-4777', 200, yPos + 9, { align: 'right' });
    doc.text('Site: www.elfon.com.br', 200, yPos + 15, { align: 'right' });
    doc.text('CNPJ: 62.651.123/0001-40', 200, yPos + 21, { align: 'right' });
    
    // Linha divisória
    yPos += 30;
    doc.setDrawColor(25, 118, 210);
    doc.setLineWidth(0.5);
    doc.line(10, yPos, 200, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    doc.text('Cliente: ' + (document.getElementById('cliente').value || ''), 10, yPos);
    yPos += 7;
    doc.text('CNPJ: ' + (document.getElementById('cnpj').value || ''), 10, yPos);
    doc.text('IE: ' + (document.getElementById('ie').value || ''), 120, yPos);
    yPos += 7;
    doc.text('Endereço: ' + (document.getElementById('endereco').value || ''), 10, yPos);
    doc.text('Nº: ' + (document.getElementById('numero').value || ''), 160, yPos);
    yPos += 7;
    doc.text('Bairro: ' + (document.getElementById('bairro').value || ''), 10, yPos);
    doc.text('CEP: ' + (document.getElementById('cep').value || ''), 120, yPos);
    yPos += 7;
    doc.text('Telefone: ' + (document.getElementById('telefone').value || ''), 10, yPos);
    yPos += 7;
    doc.text('E-mail: ' + (document.getElementById('email').value || ''), 10, yPos);
    yPos += 7;
    doc.text('Contato no local: ' + (document.getElementById('contatoLocal').value || ''), 10, yPos);
    yPos += 7;
    doc.text('Defeito Reclamado: ' + (document.getElementById('defeitoReclamado').value || ''), 10, yPos);
    
    yPos += 10;
    
    const tableData = [];
    const rows = document.querySelectorAll('#itemsTableBody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('input');
        const item = row.cells[0].textContent;
        const qty = cells[0].value;
        const desc = cells[1].value;
        const price = cells[2].value;
        const total = cells[3].value;
        
        if (desc.trim() || qty > 0) {
            tableData.push([item, qty, desc, price, total]);
        }
    });
    
    doc.autoTable({
        startY: yPos,
        head: [['Item', 'Qtd', 'Descrição', 'Valor Unit.', 'Valor Total']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [25, 118, 210] }
    });
    
    yPos = doc.lastAutoTable.finalY + 10;
    
    if (photos.length > 0) {
        doc.text('Fotos:', 10, yPos);
        yPos += 5;
        
        let xPos = 10;
        for (let i = 0; i < photos.length; i++) {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
                xPos = 10;
            }
            
            try {
                doc.addImage(photos[i], 'JPEG', xPos, yPos, 60, 45);
                xPos += 65;
                
                if (xPos > 140) {
                    xPos = 10;
                    yPos += 50;
                }
            } catch (e) {
                console.error('Erro ao adicionar foto:', e);
            }
        }
        
        if (xPos > 10) {
            yPos += 50;
        }
    }
    
    if (yPos > 220) {
        doc.addPage();
        yPos = 20;
    }
    
    doc.text('Condição de Pagamento: ' + (document.getElementById('condicaoPagamento').value || ''), 10, yPos);
    yPos += 7;
    doc.setFont(undefined, 'bold');
    doc.text('Valor TOTAL: ' + (document.getElementById('valorTotal').value || 'R$ 0,00'), 10, yPos);
    doc.setFont(undefined, 'normal');
    
    yPos += 10;
    doc.text('Laudo Técnico:', 10, yPos);
    yPos += 7;
    const laudo = document.getElementById('laudoTecnico').value || '';
    const laudoLines = doc.splitTextToSize(laudo, 180);
    doc.text(laudoLines, 10, yPos);
    yPos += (laudoLines.length * 5) + 10;
    
    if (yPos > 220) {
        doc.addPage();
        yPos = 20;
    }
    
    doc.text('Data: ' + (document.getElementById('data').value || ''), 10, yPos);
    doc.text('Hora Inicial: ' + (document.getElementById('horaInicial').value || ''), 60, yPos);
    doc.text('Hora Final: ' + (document.getElementById('horaFinal').value || ''), 110, yPos);
    
    yPos += 10;
    
    const signatureTecnico = signatureCanvases['signatureTecnico'];
    const signatureCliente = signatureCanvases['signatureCliente'];
    
    if (!signatureTecnico.isEmpty) {
        doc.text('Assinatura do Técnico:', 10, yPos);
        const imgDataTecnico = signatureTecnico.canvas.toDataURL('image/png');
        doc.addImage(imgDataTecnico, 'PNG', 10, yPos + 2, 60, 30);
    }
    
    if (!signatureCliente.isEmpty) {
        doc.text('Assinatura do Cliente:', 110, yPos);
        const imgDataCliente = signatureCliente.canvas.toDataURL('image/png');
        doc.addImage(imgDataCliente, 'PNG', 110, yPos + 2, 60, 30);
    }
    
    const cliente = document.getElementById('cliente').value || 'Cliente';
    const dataValue = document.getElementById('data').value;
    let dataFormatada = '';
    
    if (dataValue) {
        const [ano, mes, dia] = dataValue.split('-');
        dataFormatada = `${dia}-${mes}-${ano}`;
    } else {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        dataFormatada = `${dia}-${mes}-${ano}`;
    }
    
    const fileName = `OS_${osNumber}_${cliente.substring(0, 20)}_${dataFormatada}.pdf`;
    
    const pdfBlob = doc.output('blob');
    
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], fileName, { type: 'application/pdf' })] })) {
        try {
            const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
            await navigator.share({
                files: [file],
                title: `Ordem de Serviço ${osNumber}`,
                text: `OS ${osNumber} - ${cliente}`
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                doc.save(fileName);
            }
        }
    } else {
        doc.save(fileName);
    }
}

function clearForm() {
    if (confirm('Tem certeza que deseja limpar todo o formulário?')) {
        document.querySelectorAll('input[type="text"], input[type="email"], input[type="time"], textarea').forEach(input => {
            if (input.id !== 'data' && input.id !== 'horaInicial' && input.id !== 'osNumber') {
                input.value = '';
            }
        });
        
        document.getElementById('horaFinal').value = '';
        document.getElementById('valorTotal').value = '';
        
        const tbody = document.getElementById('itemsTableBody');
        tbody.innerHTML = '';
        itemCounter = 0;
        addInitialRows();
        
        photos = [];
        displayPhotos();
        
        clearSignature('signatureTecnico');
        clearSignature('signatureCliente');
        
        initializeForm();
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => console.log('Service Worker registrado'))
            .catch(error => console.log('Erro ao registrar Service Worker:', error));
    });
}
