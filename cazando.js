let canvas = document.getElementById("areaJuego");
let context = canvas.getContext("2d");

const ANCHO_DIBUJO = 80;
const ALTO_DIBUJO = 50;

const ANCHO = (canvas.width - ANCHO_DIBUJO) / 2;
const ALTO = (canvas.height - ALTO_DIBUJO) / 2;

function graficarGato() {
  context.fillStyle = "blue";
  context.fillRect(ANCHO, ALTO, ANCHO_DIBUJO, ALTO_DIBUJO);
}
