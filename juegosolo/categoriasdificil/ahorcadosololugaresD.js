let palabrita;
let cant_errores = 0; //cuantas veces me equivoqué
let cant_aciertos = 0; //cuantas letras acerté

let palabras1 = [
  "colombia",
  "españa",
  "mexico",
  "uruguay",
  "argentina",
  "brasil",
];

const btn = id("jugar");
const imagen = id("imagen");
const btn_letras = document.querySelectorAll("#letras button");

btn.addEventListener("click", iniciar);

function iniciar(event) {
  insertar_tiempo()

  imagen.src = "/juego_ahorcado/imgD/img0.png";
  tiempo()
  btn.disabled = true;
  cant_errores = 0;
  cant_aciertos = 0;

  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";

  const cant_palabras = palabras1.length;
  const valor_al_azar = obtener_random(0, cant_palabras);

  palabrita = palabras1[valor_al_azar];
  console.log(palabrita);
  const cant_letras = palabrita.length;

  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }

  document.getElementById("resultado").innerHTML = `
  <div class="alerta">
  <p>
  Tienes 2 intentos y 30 segundos, suerte!!
  </p>
</div>
        
        `;

  setTimeout(() => {
    document.getElementById("resultado").innerHTML = "";
  }, 2000);
}

/* click de adivinar letra */
for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target; //cuál de todas las letras, llamó a la función.
 

  const letra = button.innerHTML.toLowerCase();
  const palabra = palabrita.toLowerCase(); // .toUpperCase( )

  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      //la variable i es la posición de la letra en la palabra.
      //que coincide con el span al que tenemos que mostarle esta letra...
      spans[i].innerHTML = letra;
      cant_aciertos++;
      acerto = true;
    }
  }

  if (acerto == false) {
    cant_errores++;
    const source = `/juego_ahorcado/imgD/img${cant_errores}.png`;
    imagen.src = source;
  }

  if (cant_errores == 2) {
    id("resultado").innerHTML = ` <div class="alerta_lose" role="alert">
    perdiste, la palabra era ${palabrita}

    <button class="boton_denuevo" onclick="iniciar()">volver a jugar</button>
</div>
`;
    game_over();
  } else if (cant_aciertos == palabrita.length) {
    id("resultado").innerHTML = `<div class="alert_win" role="alert">
    Ganaste!!!
    <button class="boton_denuevo" onclick="iniciar()">volver a jugar</button>
</div>
`;

    game_over();
  }
  console.log(
    "la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto
  );
}

/* fin del juego */
function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }

  btn.disabled = false;
}

game_over();

function id(str) {
  return document.getElementById(str);
}

function obtener_random(num_min, num_max) {
  const amplitud_valores = num_max - num_min; //valor más alto - valor más bajo del random... (7 - 0)
  const valor_al_azar =
    Math.floor(Math.random() * amplitud_valores) +
    num_min; /* 5 - 15 = 10 + 5 */
  return valor_al_azar;
}


function tiempo() {

  let time = document.getElementById("tiempo")
  let numero = 30;
  let contador = setInterval(function () {

    let acumu = numero -= 1


    if (numero == 0) {
      clearInterval(contador)
      game_over()
      setTimeout(() => {
        id("resultado").innerHTML=`<div class="alerta_lose" role="alert">
        perdiste, la palabra era ${palabrita}

        <button class="boton_denuevo" onclick="iniciar()">volver a jugar</button>
    </div>`
      }, 100);
    }

  }, 1000);

}


function insertar_tiempo(){
  document.getElementById("barra_de_tiempo").innerHTML=` <div class="tempo_cuerpo">
  <div class="barra"></div>
</div>`
}