let canvas = document.getElementById("areaJuego");
let context = canvas.getContext("2d");

const ANCHO_GATO = 70;
const ALTO_GATO = 40;

const ANCHO_COMIDA = 20;
const ALTO_COMIDA = 20;

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

  setInterval(restarTiempo, 1000);
}

function moverIzquierda() {
  gatoX -= 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverDerecha() {
  gatoX += 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverArriba() {
  gatoY -= 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverAbajo() {
  gatoY += 10;
  limpiarCanva();
  graficarGato();
  graficarComida();
  detectarColision();
}

let puntaje = 0;

function detectarColision() {
  console.log("gatoY:", gatoY, "gato abajo:", gatoY + ALTO_GATO);
  console.log("comidaY:", comidaY, "comida abajo:", comidaY + ALTO_COMIDA);
  if (
    gatoX + ANCHO_GATO >= comidaX &&
    gatoX <= comidaX + ANCHO_COMIDA &&
    gatoY + ALTO_GATO >= comidaY &&
    gatoY <= comidaY + ALTO_COMIDA
  ) {
    alert("Delicius! 😻");

    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

    graficarGato();

    puntaje += 1;
    mostrarEnSpan("puntos", puntaje);
  }
}

let tiempo = 10;

function restarTiempo() {
  tiempo -= 1;
  mostrarEnSpan("tiempo", tiempo);
}
