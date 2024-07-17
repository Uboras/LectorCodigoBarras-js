
const scannerContainer = document.getElementById('scanner-container');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const saveButton = document.getElementById('save-button');
const copyButton = document.getElementById('copy-button');
const barcodeList = document.getElementById('barcode-list');
const listaguardada=  localStorage.getItem('barcodes') || "";
let isScanning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerContainer,
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "upc_reader", "code_39_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        listaguardada()
        Quagga.start();
    });

    Quagga.onDetected(onDetectedHandler);
}

function stopScanner() {
    Quagga.stop();
    Quagga.offDetected(onDetectedHandler);
    while (barcodeList.firstChild) {
        barcodeList.removeChild(barcodeList.firstChild);
    }
}

function onDetectedHandler(data) {
    if (!isScanning) {
        isScanning = true;
        const code = data.codeResult.code;
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = code;
        barcodeList.appendChild(listItem);
        saveBarcodesToLocalStorage(listItem)
        alert("agregado a lista" )
        
        setTimeout(() => {
            isScanning = false;
        }, 1000); // Esperar 1 segundo antes de permitir otro escaneo
    }
}
function c (listaguardada){
    listaguardada.forEach( e =>{
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = e;
        barcodeList.appendChild(listItem);

    })
}
function saveBarcodesToLocalStorage(item) {
    listaguardada.appendChild(item)
    localStorage.setItem('barcodes', JSON.stringify(listaguardada));
    alert('Barcodes saved to localStorage');
}

function copyBarcodesToClipboard() {
    const barcodes = [];
    barcodeList.querySelectorAll('li').forEach(item => {
        barcodes.push(item.textContent);
    });
    const textContent = barcodes.join(' 1\n');
    navigator.clipboard.writeText(textContent).then(() => {
        alert('Barcodes copied to clipboard');
    }).catch(err => {
        console.error('Error copying to clipboard', err);
    });
}

startButton.addEventListener('click', startScanner);
stopButton.addEventListener('click', stopScanner);
saveButton.addEventListener('click', saveBarcodesToLocalStorage);
copyButton.addEventListener('click', copyBarcodesToClipboard);
