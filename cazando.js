let canvas = document.getElementById("areaJuego");
let context = canvas.getContext("2d");

const ANCHO_GATO = 80;
const ALTO_GATO = 50;

const ANCHO_COMIDA = 25;
const ALTO_COMIDA = 25;

const ANCHO = (canvas.width - ANCHO_GATO) / 2;
const ALTO = (canvas.height - ALTO_GATO) / 2;

// variables de posicion
let gatoX = 0;
let gatoY = 0;

let comidaX = 0;
let comidaY = 0;

function graficarGato() {
  graficarRectangulo(ANCHO, ALTO, ANCHO_GATO, ALTO_GATO, "blue");
}

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "green");
}

function iniciarJuego() {
  comidaX = canvas.width - ANCHO_COMIDA;
  comidaY = canvas.height - ALTO_COMIDA;

  context.fillRect(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
  graficarComida();
  graficarGato();
}

function graficarRectangulo(x, y, ancho, alto, color) {
  context.fillStyle = color;
  context.fillRect(x, y, ancho, alto);
}
