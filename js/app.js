import decirCarta from "../tools/speech.js";

const seccionInicio = document.querySelector(".seccion-inicio");

const seccionCarta = document.querySelector(".seccion-cartas");

const seccionCartaCarousel = document.querySelector(".seccion-cartas-carousel");

const cartaPrincipal = document.querySelector(".carta img");

const buttonStop = document.querySelector(".parar");
const buttonRestart = document.querySelector(".reiniciar");

const formInicio = document.querySelector("#form-inicio");

const contenedorProgreso = document.getElementById("myProgress");

const barraProgreso = document.getElementById("myBar");

const contenedorTitulo = document.querySelector(".contenedor-titulo");

let cartasRevueltas = [];
let contador = 0;
let mostrandoBaraja;

formInicio.addEventListener("submit", mostrarSeccionCartas);
buttonStop.addEventListener("click", detener);
buttonRestart.addEventListener("click", reiniciarJuego);

function reiniciarJuego() {
  const resultado = confirm("¿Esta seguro que desea reiniciar el juego?");

  if (resultado) {
    contador = 0;
    cartasRevueltas = [];
    nombreDiv = "null";
    cartaPrincipal.src = "../assets/img/carta-reverso-3.jpg";

    limpiarHTML(document.querySelector(".MultiCarousel-inner"));
    buttonRestart.classList.add("ocultar-section");

    if (buttonStop.classList.contains("ocultar-section"))
      buttonStop.classList.remove("ocultar-section");

    buttonStop.textContent = "Pausar";
    llenarModal();
    iniciarJuego();
    return;
  }
  return;
}

function limpiarHTML(elemento) {
  while (elemento.firstChild) {
    if (elemento.firstChild.id === "null") {
      break;
    }
    console.log(elemento.firstChild.id);
    elemento.removeChild(elemento.firstChild);
  }
}

function mostrarSeccionCartas(e) {
  e.preventDefault();
  seccionInicio.classList.add("ocultar-section");
  contenedorTitulo.classList.add("ocultar-section");
  seccionCarta.classList.remove("ocultar-section");
  seccionCartaCarousel.classList.remove("ocultar-section");
  buttonStop.classList.remove("ocultar-section");
  contenedorProgreso.classList.remove("ocultar-section");
  llenarModal();
  iniciarJuego();
}

function iniciarJuego() {
  barajarCartas();
  mostrarBaraja();
  carouselStart();
}

function barajarCartas() {
  cartasRevueltas = BARAJA.slice();
  for (var i = cartasRevueltas.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); //random index
    [cartasRevueltas[i], cartasRevueltas[j]] = [
      cartasRevueltas[j],
      cartasRevueltas[i],
    ]; // swap
  }
}

function mostrarBaraja() {
  mostrandoBaraja = setInterval(() => {
    limpiarProgreso();
    if (contador >= cartasRevueltas.length) {
      clearInterval(mostrandoBaraja);
      buttonStop.classList.add("ocultar-section");
      buttonRestart.classList.remove("ocultar-section");
      return;
    }
    let carta = cartasRevueltas[contador];
    decirCarta(carta.nombre);
    cartaPrincipal.src = carta.urlImagen;
    if(contador!= 0){
      addImageCarousel(cartasRevueltas[contador-1].urlImagen, cartasRevueltas[contador-1].nombre);
    }
    contador++;
    actualizarProgreso();
  }, 3000);
}

function detener() {
  if (buttonStop.textContent === "Pausar") {
    clearInterval(mostrandoBaraja);
    buttonStop.textContent = "Reanudar";
    buttonRestart.classList.remove("ocultar-section");
    limpiarProgreso();
  } else {
    buttonStop.textContent = "Pausar";
    buttonRestart.classList.add("ocultar-section");
    actualizarProgreso();
    mostrarBaraja();
  }
}

function actualizarProgreso() {
  barraProgreso.classList.add("transition");
  barraProgreso.classList.add("ancho-completo");
}

function limpiarProgreso() {
  barraProgreso.classList.remove("transition");
  barraProgreso.classList.remove("ancho-completo");
}

//Funcionalidad del carousel
var nombreDiv = "null";
function addImageCarousel(url, nombre) {
  let carousel = document.getElementById(nombreDiv);
  carousel.insertAdjacentHTML(
    "beforebegin",
    `<div class="item" id="${nombre}">
                                               <div class="pad15">
                                               <img src="${url}" style="height: 125px" alt="${nombre}">
                                               </div>
                                               </div>`
  );
  nombreDiv = nombre;
  carouselStart();
}

var itemsMainDiv = "";
var itemsDiv = "";
var itemWidth = "";

function carouselStart() {
  itemsMainDiv = ".MultiCarousel";
  itemsDiv = ".MultiCarousel-inner";
  itemWidth = "";

  $(".leftLst, .rightLst").click(function () {
    var condition = $(this).hasClass("leftLst");
    if (condition) click(0, this);
    else click(1, this);
  });

  ResCarouselSize();

  $(window).resize(function () {
    ResCarouselSize();
  });
}

//Esta funcion define el tamaño de los articulos
function ResCarouselSize() {
  var incno = 0;
  var dataItems = "data-items";
  var itemClass = ".item";
  var id = 0;
  var btnParentSb = "";
  var itemsSplit = "";
  var sampwidth = $(itemsMainDiv).width();
  var bodyWidth = $("body").width();
  $(itemsDiv).each(function () {
    id = id + 1;
    var itemNumbers = $(this).find(itemClass).length;
    btnParentSb = $(this).parent().attr(dataItems);
    itemsSplit = btnParentSb.split(",");
    $(this)
      .parent()
      .attr("id", "MultiCarousel" + id);

    if (bodyWidth >= 1200) {
      incno = itemsSplit[3];
      itemWidth = sampwidth / incno;
    } else if (bodyWidth >= 992) {
      incno = itemsSplit[2];
      itemWidth = sampwidth / incno;
    } else if (bodyWidth >= 768) {
      incno = itemsSplit[1];
      itemWidth = sampwidth / incno;
    } else {
      incno = itemsSplit[0];
      itemWidth = sampwidth / incno;
    }
    $(this).css({
      transform: "translateX(0px)",
      width: itemWidth * itemNumbers,
    });
    $(this)
      .find(itemClass)
      .each(function () {
        $(this).outerWidth(itemWidth);
      });

    $(".leftLst").addClass("over");
    $(".rightLst").removeClass("over");
  });
}

//Esta funcion se utiliza para mover los elementos
function ResCarousel(e, el, s) {
  var leftBtn = ".leftLst";
  var rightBtn = ".rightLst";
  var translateXval = "";
  var divStyle = $(el + " " + itemsDiv).css("transform");
  var values = divStyle.match(/-?[\d\.]+/g);
  var xds = Math.abs(values[4]);
  if (e == 0) {
    translateXval = parseInt(xds) - parseInt(itemWidth * s);
    $(el + " " + rightBtn).removeClass("over");

    if (translateXval <= itemWidth / 2) {
      translateXval = 0;
      $(el + " " + leftBtn).addClass("over");
    }
  } else if (e == 1) {
    var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
    translateXval = parseInt(xds) + parseInt(itemWidth * s);
    $(el + " " + leftBtn).removeClass("over");

    if (translateXval >= itemsCondition - itemWidth / 2) {
      translateXval = itemsCondition;
      $(el + " " + rightBtn).addClass("over");
    }
  }
  $(el + " " + itemsDiv).css(
    "transform",
    "translateX(" + -translateXval + "px)"
  );
}

//Se utiliza para traer algunos elementos del boton
function click(ell, ee) {
  var Parent = "#" + $(ee).parent().attr("id");
  var slide = $(Parent).attr("data-slide");
  ResCarousel(ell, Parent, slide);
}


function llenarModal()
{
    let contenido;
    let cuenta =3;
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: true
      })
    modal.show();
    let modalContenido=document.getElementById("modalContenido");
    modalContenido.innerHTML=cuenta
    cuenta--;
    contenido = setInterval(() => {
        console.log(cuenta)
        if (cuenta == 0) {
            clearInterval(contenido);
            modal.hide();
            return;
        }
        modalContenido.innerHTML=cuenta
        cuenta--;
    }, 1000);
}