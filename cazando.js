let canvas = document.getElementById("areaJuego");
let context = canvas.getContext("2d");

const ANCHO_GATO = 80;
const ALTO_GATO = 80;

const ANCHO_COMIDA = 60;
const ALTO_COMIDA = 80;

// variables de posicion
let gatoX = 0;
let gatoY = 0;

let comidaX = 0;
let comidaY = 0;

let anchoCentrado = (canvas.width - ANCHO_GATO) / 2;
let altoCentrado = (canvas.height - ALTO_GATO) / 2;

let intervaloTiempo;
let juegoTerminado = false;

const imagen = new Image();
imagen.src = "./images/gato.png";

const imagenComida = new Image();
imagenComida.src = "./images/comida.png";

function graficar(imagen, x, y, ancho, alto) {
  context.drawImage(imagen, x, y, ancho, alto);
}

function graficarGato() {
  graficar(imagen, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
  graficar(imagenComida, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function limpiarCanva() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function mostrarEstado(texto, tipo = "info") {
  let componente = document.getElementById("txtPlayInfo");
  componente.textContent = texto;
  componente.className = "";

  if (tipo === "win") {
    componente.classList.add("estado-win");
  } else if (tipo === "lose") {
    componente.classList.add("estado-lose");
  } else {
    componente.classList.add("estado-info");
  }
}

function terminarJuego(gano) {
  juegoTerminado = true;
  clearInterval(intervaloTiempo);

  if (gano) {
    mostrarEstado("Winner 🏆", "win");
  } else {
    mostrarEstado("Game Over 😭 Reinicia Ahora", "lose");
  }
}

// function configurarAvisoMobile() {
//   let aviso = document.getElementById("avisoMobile");
//   let btnCerrarAviso = document.getElementById("btnCerrarAviso");

//   if (!aviso || !btnCerrarAviso) return;

//   if (window.innerWidth <= 980) {
//     aviso.classList.remove("oculto");
//   }

//   btnCerrarAviso.onclick = function () {
//     aviso.classList.add("oculto");
//   };
// }

function iniciarJuego() {
  juegoTerminado = false;

  comidaX = canvas.width - ANCHO_COMIDA;
  comidaY = canvas.height - ALTO_COMIDA;

  gatoX = anchoCentrado;
  gatoY = altoCentrado;

  limpiarCanva();
  graficarComida();
  graficarGato();

  mostrarEstado("Atrapa Tu plato de Comida❗", "info");

  clearInterval(intervaloTiempo);
  intervaloTiempo = setInterval(restarTiempo, 1000);

  // configurarAvisoMobile();
}

function limitarMovimiento() {
  if (gatoX < 0) {
    gatoX = 0;
  }

  if (gatoY < 0) {
    gatoY = 0;
  }

  if (gatoX > canvas.width - ANCHO_GATO) {
    gatoX = canvas.width - ANCHO_GATO;
  }

  if (gatoY > canvas.height - ALTO_GATO) {
    gatoY = canvas.height - ALTO_GATO;
  }
}

function moverIzquierda() {
  if (juegoTerminado) return;
  gatoX -= 10;
  limpiarCanva();
  limitarMovimiento();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverDerecha() {
  if (juegoTerminado) return;
  gatoX += 10;
  limpiarCanva();
  limitarMovimiento();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverArriba() {
  if (juegoTerminado) return;
  gatoY -= 10;
  limpiarCanva();
  limitarMovimiento();
  graficarGato();
  graficarComida();
  detectarColision();
}

function moverAbajo() {
  if (juegoTerminado) return;
  gatoY += 10;
  limpiarCanva();
  limitarMovimiento();
  graficarGato();
  graficarComida();
  detectarColision();
}

let puntaje = 0;
let tiempoBase = 15;
let tiempo = tiempoBase;

function restarTiempo() {
  if (juegoTerminado) return;
  tiempo -= 1;
  mostrarEnSpan("tiempo", tiempo);

  if (puntaje === 6) {
    terminarJuego(true);
    return;
  }
  if (tiempo === 0) {
    mostrarEnSpan("tiempo", tiempo);
    terminarJuego(false);
  }
}

// Modificar el juego para que, cada vez que el gato atrape la comida, el tiempo
// disponible se reduzca en 1 segundo respecto al valor anterior

function detectarColision() {
  if (juegoTerminado) return;

  if (
    gatoX + ANCHO_GATO >= comidaX &&
    gatoX <= comidaX + ANCHO_COMIDA &&
    gatoY + ALTO_GATO >= comidaY &&
    gatoY <= comidaY + ALTO_COMIDA
  ) {
    puntaje += 1;
    tiempoBase -= 1;
    tiempo = tiempoBase;

    mostrarEnSpan("puntos", puntaje);
    mostrarEnSpan("tiempo", tiempo);

    comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
    comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

    limpiarCanva();
    graficarGato();
    graficarComida();

    if (puntaje >= 6) {
      terminarJuego(true);
      return;
    }

    mostrarEnSpan("txtPlayInfo", "Delicius! 😻");
  }
}

function reiniciarJuego() {
  puntaje = 0;
  tiempoBase = 15;
  tiempo = tiempoBase;
  juegoTerminado = false;

  mostrarEnSpan("puntos", puntaje);
  mostrarEnSpan("tiempo", tiempo);

  iniciarJuego();
}

document.addEventListener("keydown", function (event) {
  if (juegoTerminado) return;
  if (event.key === "a" || event.key === "ArrowLeft") moverIzquierda();
  if (event.key === "d" || event.key === "ArrowRight") moverDerecha();
  if (event.key === "s" || event.key === "ArrowDown") moverAbajo();
  if (event.key === "w" || event.key === "ArrowUp") moverArriba();
});
