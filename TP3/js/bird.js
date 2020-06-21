'use strict';

class Bird {

    constructor() {
        this.posicion = 0;
        this.divBird = document.querySelector('#divBird');
        this.bird = document.querySelector('#bird');
    }

    iniciar() {
        this.posicion = 0;
        this.nivelado();
    }

    setPosicion(posicion) {
        this.posicion = posicion;
    }

    subir(posicion) {
        this.setPosicion(posicion);
        this.bird.classList.remove('bird');
        this.bird.classList.add('birdSubiendo');
        this.bird.style.transform = "rotate(-15deg)";
    }

    bajar(posicion) {
        this.setPosicion(posicion);
        this.bird.classList.remove('birdSubiendo');
        this.bird.classList.add('bird');
        this.bird.style.transform = "rotate(15deg)";
    }

    nivelado() {
        this.bird.classList.remove('birdSubiendo', 'bird');
        this.bird.classList.add('bird');
        this.bird.style.transform = "rotate(0deg)";
    }

    caer(posicion) {
        this.setPosicion(posicion);
        this.bird.classList.remove('birdSubiendo', 'bird');
        this.bird.classList.add('birdCae');
        this.divBird.style.height = "250px";
        this.bird.style.transform = "rotate(90deg)";
        this.sonido = new Audio('sounds/fin.mp3');
        this.sonido.play();
    }
    updateScreen() {
        this.divBird.style.top = this.posicion + 'px';
    }
}