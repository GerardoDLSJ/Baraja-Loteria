// Declarar hablador
const synth = window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance();
utterThis.lang = "es-MX";

async function decirCarta(nombreCarta) {
  utterThis.rate = 1;
  utterThis.text = nombreCarta;
  synth.speak(utterThis);
}

export default decirCarta;
