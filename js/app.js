import decirCarta from "../tools/speech.js";

const seccionInicio = document.querySelector('.seccion-inicio');

const seccionCarta = document.querySelector('.seccion-cartas');

const cartaPrincipal = document.querySelector('.carta img');

const buttonStop = document.querySelector('.parar');

const formInicio = document.querySelector('#form-inicio');

const contenedorProgreso = document.getElementById('myProgress');
const barraProgreso = document.getElementById("myBar");

const contenedorTitulo = document.querySelector('.contenedor-titulo');

let cartasRevueltas = [];
let contador = 0;
let mostrandoBaraja;


formInicio.addEventListener('submit',mostrarSeccionCartas);
buttonStop.addEventListener('click',detener);


function mostrarSeccionCartas(e){
    e.preventDefault();
    console.log('hola');
    seccionInicio.classList.add('ocultar-section');
    contenedorTitulo.classList.add('ocultar-section');
    seccionCarta.classList.remove('ocultar-section');
    buttonStop.classList.remove('ocultar-section');
    contenedorProgreso.classList.remove('ocultar-section');
    barajarCartas();
    console.log(cartasRevueltas);
    mostrarBaraja();

}

function barajarCartas(){
    cartasRevueltas = BARAJA.slice();
    for(var i = cartasRevueltas.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [cartasRevueltas[i],cartasRevueltas[j]]=[cartasRevueltas[j],cartasRevueltas[i]]; // swap
    }
}

function mostrarBaraja(){
   
    mostrandoBaraja = setInterval(()=>{
        console.log(contador);
        if(contador >= cartasRevueltas.length){
            clearInterval(mostrandoBaraja);
            return;
        }
        actualizarProgreso();
        let carta = cartasRevueltas[contador];
        decirCarta(carta.nombre);
        cartaPrincipal.src = carta.urlImagen;
        contador++;
    },3000);
}

function detener(e){
    e.preventDefault();


    if(buttonStop.textContent === 'Parar'){
        clearInterval(mostrandoBaraja);
        buttonStop.textContent = 'Reanudar';
    }else{
        buttonStop.textContent = 'Parar';
        mostrarBaraja();
    }


}

function actualizarProgreso() {
   barraProgreso.classList.add('ancho-completo');

    // if (contador < cartasRevueltas.length) {
    //   const ancho =  calcularPorcentaje();
    //   barraProgreso.style.width = ancho + "%";
    //   return;
    // }
}

function calcularPorcentaje(){
    // 54 - 100%
    // contador - ?%

    let resultado = (((contador+1) * 100) / cartasRevueltas.length);
    // console.log(resultado);
    return resultado;

}