const domElements = {
    encryptButton: document.getElementById('btnEncrypted'),
    decryptButton: document.getElementById('btnDecrypted'),
    inputTextArea: document.getElementById('inptTextArea'),
    outputTextArea: document.getElementById('outptTextArea'),
    copyResultButton: document.getElementById('btnCopyResult'),
    preInfo: document.getElementsByClassName("pre-information"),
}

const encodedKeys = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
}

domElements.inputTextArea.addEventListener("input", validateInput);
domElements.encryptButton.onclick = () => processInput(encrypt);
domElements.decryptButton.onclick = () => processInput(decrypt);
domElements.copyResultButton.onclick = copyOutput;

function processInput(processFunction){
    const inputText = domElements.inputTextArea.value;
    if (inputText){
        const processedText = processFunction(inputText);
        domElements.outputTextArea.value = processedText;
        toggleTextOutput("none", "block");
    }
}

function encrypt(inputText){
    return Object.keys(encodedKeys).reduce((acc, key) => acc.replace(new RegExp(key, "g"), encodedKeys[key]), inputText);
}

function decrypt(inputText){
    return Object.keys(encodedKeys).reduce((acc, key) => acc.replace(new RegExp(encodedKeys[key], "g"), key), inputText);
}

function copyOutput(){
    domElements.outputTextArea.select();
    navigator.clipboard ? navigator.clipboard.writeText(domElements.outputTextArea.value) : document.execCommand("copy");
}

function validateInput() {
    if (!domElements.inputTextArea.value) {
        toggleTextOutput("block", "none");
    }
    domElements.inputTextArea.value = domElements.inputTextArea.value.replace(/[W]|[áéíóúÁÉÍÓÚñÑ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g, "");
}

function toggleTextOutput(style1, style2){
    Array.from(domElements.preInfo).forEach(el => el.style.display = style1);
    domElements.outputTextArea.style.display = style2;
    domElements.copyResultButton.style.display = style2;
}