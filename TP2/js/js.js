'use strict';

let anchoPantalla = screen.width * .80;
let altoPantalla = screen.height * .80;


//document.querySelector("#divCanvas").style.margin - left = "30%";
document.querySelector("#divCanvas").style.width = anchoPantalla + "px";
document.querySelector("#divCanvas").style.height = altoPantalla + "px";
document.querySelector("#contenedor").width = anchoPantalla;
document.querySelector("#contenedor").height = altoPantalla;

let contenedor = new Contenedor("#contenedor");
contenedor.drawInicio();

document.querySelector("#btnComenzar").addEventListener('click', r => {
    if (contenedor.jugando) {
        $("#modalInicio").modal("hide");
        $("#modalControl").modal("show");

    } else {
        contenedor.comenzarJuego();
    }
});

document.querySelector("#btnIniciar").addEventListener('click', r => {
    $("#modalControl").modal("hide");
    contenedor.comenzarJuego();
});