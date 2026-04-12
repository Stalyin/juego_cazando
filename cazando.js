let canvas = document.getElementById("areaJuego");
let context = canvas.getContext("2d");

const ANCHO_GATO = 80;
const ALTO_GATO = 50;

const ANCHO_COMIDA = 25;
const ALTO_COMIDA = 25;

// variables de posicion
let gatoX = 0;
let gatoY = 0;

let comidaX = 0;
let comidaY = 0;

let anchoCentrado = (canvas.width - ANCHO_GATO) / 2;
let altoCentrado = (canvas.height - ALTO_GATO) / 2;

function graficarGato() {
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "blue");
}

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "green");
}

function graficarRectangulo(x, y, ancho, alto, color) {
  context.fillStyle = color;
  context.fillRect(x, y, ancho, alto);
}

function limpiarCanva() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function iniciarJuego() {
  comidaX = canvas.width - ANCHO_COMIDA;
  comidaY = canvas.height - ALTO_COMIDA;

  gatoX = anchoCentrado;
  gatoY = altoCentrado;

  limpiarCanva();
  graficarComida();
  graficarGato();
}

function moverIzquierda() {
  gatoX -= 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
}

function moverDerecha() {
  gatoX += 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
}

function moverArriba() {
  gatoY -= 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
}

function moverAbajo() {
  gatoY += 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
}
