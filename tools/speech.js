// Declarar hablador
const synth = window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance();
utterThis.lang = 'es-MX';

function decirCarta(nombreCarta){
    utterThis.rate = 2;
    utterThis.text = nombreCarta;
    synth.speak(utterThis);
}

export default decirCarta;