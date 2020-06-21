'use strict'

document.addEventListener("DOMContentLoaded", e => {
    let juego = new Juego();
    document.querySelector('.divPuntos').style.display = "none";
    document.querySelector(".inicio").addEventListener("click", e => {
        if (!juego.iniciado) {
            juego.comenzar();
        } else {
            location.reload();
        }
    });

    document.querySelector(".menu").addEventListener("click", e => {
        if (document.querySelector('.reglamento').classList.contains('open')) {
            document.querySelector('.reglamento').classList.remove('open');
        } else {
            document.querySelector('.reglamento').classList.add('open');
        }
    })




});