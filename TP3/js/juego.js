'use strict';

class Juego {

    constructor() {
        this.container = document.querySelector('#divBird');
        this.hPuntos = document.querySelector('#puntos');
        this.divPuntos = document.querySelector('.divPuntos');
        this.divMensaje = document.querySelector('.mensaje');
        this.divReglamento = document.querySelector('#divReglamento');
        this.iniciado = false;
        this.body = document.querySelector('body');
        this.bodyHeight = window.getComputedStyle(this.body, null).getPropertyValue("height");
        this.altura = parseInt(this.bodyHeight.split('px')[0]);
        this.height = window.getComputedStyle(this.container, null).getPropertyValue("height");
        this.diferencia = this.altura - parseInt(this.height.split('px')[0]) - 120;
        this.bird = new Bird();
        this.problemas = [];
        this.premio;
        this.puntos;
        this.limite = 10;
        this.subir = false;
        this.interval;
        this.sonido = new Audio('sounds/ambiente.mp3');

    }

    comenzar() {
        this.iniciado = true;
        this.problemas = [];
        this.puntos = 0;
        this.divReglamento.style.display = "none";
        this.divPuntos.style.display = "flex";
        this.sonido.play();

        this.bird.setPosicion();
        this.bird.iniciar();
        let premioDiv;
        let problemaSuperior;
        let problemaInferior;
        for (let i = 1; i < 6; i = i + 2) {
            let indice = i + 1;
            let nroProblema = Math.floor(i / 2) + 1;
            problemaSuperior = document.querySelector('.problema' + indice);
            problemaInferior = document.querySelector('.problema' + i);
            this.problemas.push(new Problema(problemaSuperior, problemaInferior, 300 / nroProblema, 100 * nroProblema, nroProblema));
        }

        premioDiv = document.querySelector('.premio');
        this.premio = new Premio(premioDiv);

        document.querySelector('body').addEventListener('keypress', e => {
            if (e.keyCode === 32) {
                this.subir = true;

            }
        });

        this.interval = setInterval(e => {
            this.loop();
        }, 40);

    }

    loop() {

        let top = window.getComputedStyle(this.container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);

        if (this.subir) {
            if ((top - 10) >= 0) {
                this.bird.subir(top - 10);
                this.subir = false;
            } else {
                top = 0;
                this.subir = false;
                this.bird.nivelado();
            }
        } else {

            if ((top + 20) <= this.diferencia) {
                this.bird.bajar(top + 6);
            } else {
                this.bird.nivelado();
            }
        }
        this.updateScreen();

        if (this.choque()) {
            this.bird.caer();
            this.fin();
        }

        if (this.puntos >= this.limite) {
            this.fin()
        }
    }

    choque() {

        let birdCola = this.bird.divBird.offsetLeft;
        let birdSuperior = this.bird.divBird.offsetTop + 20;
        let birdAltura = this.bird.divBird.offsetHeight;
        let birdAncho = this.bird.divBird.offsetWidth;
        let birdPico = birdCola + birdAncho - 40;
        let birdInferior = birdSuperior + birdAltura - 40;

        for (const problema of this.problemas) {
            if ((problema.left <= birdPico) && (problema.left + problema.width >= birdCola)) {
                if ((problema.superior_pos >= birdSuperior) || ((birdInferior) >= (this.altura - problema.inferior_pos))) {
                    return true;
                }

            }
            if ((problema.left + problema.width + 2 < birdCola) && (problema.left + problema.width + 10 > birdCola)) {
                this.puntos++;
                return false;
            }
        }

        if (this.premio.left <= birdPico) {

            let premioArriba = this.premio.divPremio.offsetTop;
            let premioAbajo = premioArriba - this.premio.divPremio.offsetHeight
            if ((premioArriba >= birdSuperior) && ((premioAbajo) <= birdSuperior)) {
                this.puntos += 3;
                this.sonidoPremio = new Audio('sounds/premio.mp3');
                this.sonidoPremio.play();
                this.premio.divPremio.style.display = 'none';
            }
        }
        return false;

    }

    updateScreen() {

        this.bird.updateScreen();
        this.premio.updateScreen();
        for (let i = 0; i < this.problemas.length; i++) {
            this.problemas[i].updateScreen();
        }
        this.hPuntos.innerHTML = "Ptos: " + this.puntos;

    }

    fin() {
        this.sonido.pause();
        document.querySelector(".inicio").innerHTML = "Reset";
        this.divReglamento.style.display = "block";
        clearInterval(this.interval);
        if (this.puntos >= this.limite) {
            this.divMensaje.innerHTML = "<h1>Felicitaciones, ha ganado!!!</h1>"
            this.sonidoGano = new Audio('sounds/gano.mp3');
            this.sonidoGano.play();
        } else {
            this.divMensaje.innerHTML = "<h1>Lo siento, ha perdido!!!</h1>"

        }
    }
}