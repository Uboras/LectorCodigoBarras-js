const saveLista = ()=>{
    const barcodes = [];
    barcodeList.querySelectorAll('li').forEach(item => {
        barcodes.push(item.textContent);
    });
    const barcodeObject = { barcodes: barcodes };
    localStorage.setItem('barcodes', JSON.stringify(barcodeObject));
} 
const ejecutarconversion = (data) =>{

}
const enviarLista =(data) =>{
    
    envioWhats(ejecutarconversion(data))
}