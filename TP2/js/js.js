'use strict';

let contenedor = new Contenedor("#contenedor");
contenedor.drawInicio();

document.querySelector("#btnComenzar").addEventListener('click', r => {
    contenedor.comenzarJuego();
    //contenedor.agregarFigura('circulo');
});