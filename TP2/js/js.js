'use strict';

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