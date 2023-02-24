
let palabras1 = [];

function agregar() {

    palabras1.push(document.getElementById("ingreso").value)

    document.getElementById("ingreso").value = ""

    window.location.href = "/juego_ahorcado/multijugador/amigos_juego.html"
    localStorage.setItem("palabra", palabras1)


}
console.log(palabras1);
