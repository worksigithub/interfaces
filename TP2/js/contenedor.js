'use strict';
class Contenedor {

    constructor(contenedor) {
        this.contenedor = document.querySelector(contenedor);
        this.ctx = this.contenedor.getContext('2d');
        this.colJugador = ["#ab8cba", "#ebdc36", "#ff2137"];
        this.jugador = 0;
        this.fichas = [];
        this.posiciones = [
            [],
            [],
            [],
            [],
            [],
            []
        ];
        this.tablero = "";
        this.dibujando = false;
        this.jugando = false;
        this.idFigura = -1;
        this.radio = 35;
        this.cantidad = 42;
        //
        this.fondo = [];
        let ijug1 = new Image();
        let ijug2 = new Image();
        let itab1 = new Image();
        ijug1.src = 'images/fondo1.png';
        ijug2.src = 'images/fondo2.png';
        itab1.src = 'images/fondo3.png';
        ijug1.onload = function() {
            this.fondo.push(ijug1);
            ijug2.onload = function() {
                this.fondo.push(ijug2);
                itab1.onload = function() {
                    this.fondo.push(itab1);
                }.bind(this);
            }.bind(this);
        }.bind(this);
        this.eventosMouse();
    }

    comenzarJuego() {
        // tablero
        this.jugando = true;
        this.fichas = [];
        this.posiciones = [
            [],
            [],
            [],
            [],
            [],
            []
        ];
        // tablero
        let relleno = "#344ac2";
        let coeficiente = (this.contenedor.width / 9);
        let xTablero = (coeficiente * 1);
        let yTablero = (coeficiente * 1);
        let largoTablero = (this.contenedor.width) - (xTablero * 2);
        let altoTablero = (this.contenedor.height) - (yTablero);
        this.tablero = new Rectangulo(xTablero, yTablero, relleno, largoTablero, altoTablero, this.ctx, this.fondo[2]);
        this.tablero.draw();
        // posiciones
        let posicion = "";
        relleno = "#ffffff";
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                posicion = new Circulo(xTablero + (coeficiente * j) + (coeficiente / 3) + 20, yTablero + ((coeficiente - 30) * i) + (coeficiente / 3) + 10, this.radio, relleno, this.ctx, null);
                this.posiciones[i].push(posicion);
            }
        }
        // sorteo de turno
        this.jugador = Math.floor(Math.random() * 2) + 1;
        this.dibujarTablero();
        // fichas                
        posicion = "";
        relleno = ["#e62525", "#a820a6"];
        let xjug = [coeficiente / 2, this.contenedor.width - (coeficiente / 2)];

        let i = 0;
        let jnuevo = 0;
        for (let j = 0; j < this.cantidad; j++) {
            if (j > this.cantidad / 2) {
                if (i == 0) {
                    jnuevo = 0;
                }
                i = 1;
            }
            posicion = new Circulo(xjug[i], yTablero + ((this.radio / 2) * jnuevo) + coeficiente, this.radio, relleno[i], this.ctx, this.fondo[i]);
            this.fichas.push(posicion);
            jnuevo++;
        }
        this.redraw();
        $("#tituloModal").html("Comienza el Jugador:");
        $("#imgInicio").attr("src", "images/fondo" + this.jugador + ".png");
        $("#modalInicio").modal("show");

    }

    dibujarTablero() {
        this.tablero.draw();
        this.posiciones.forEach(filas => {
            filas.forEach(columna => {
                columna.draw();
            });
        });
        this.fichas.forEach(ficha => {
            ficha.draw();
        });
    }

    eventosMouse() {
        this.contenedor.addEventListener('mousedown', r => {
            this.dibujando = true;
            this.idFigura = -1;
            for (let i = 0; i < this.fichas.length; i++) {
                let contiene = this.fichas[i].toca(r.layerX, r.layerY);
                if (contiene) {
                    if (this.jugador == Math.floor((i + 1) / (this.cantidad / 2)) + 1) {
                        this.idFigura = i;
                        break;
                    }
                }
            }
        });
        this.contenedor.addEventListener('mouseup', r => {
            this.dibujando = false;
            if ((this.idFigura != -1) && (this.jugando) && (!this.fichas[this.idFigura].ocupada)) {
                this.verificarPosicion(r.layerX, r.layerY);
            }
            this.idFigura = -1;
        });
        this.contenedor.addEventListener('mousemove', r => {
            if ((this.idFigura != -1) && (this.jugando)) {
                if (this.fichas[this.idFigura].ocupada == false) {
                    if (!this.tablero.toca(r.layerX + this.radio, r.layerY + this.radio)) {
                        this.fichas[this.idFigura].setPosicion(r.layerX, r.layerY);
                        this.redraw();
                    }
                }
            }
        });
    }

    verificarPosicion(x, y) {
        for (let i = 0; i < this.posiciones[0].length; i++) {
            if (this.posiciones[0][i].toca(x, this.posiciones[0][i].y)) {
                for (let j = this.posiciones.length - 1; j >= 0; j--) {
                    if (!this.posiciones[j][i].ocupada) {
                        this.fichas[this.idFigura].x = this.posiciones[j][i].x;
                        this.fichas[this.idFigura].y = this.posiciones[j][i].y;
                        this.fichas[this.idFigura].ocupada = true;
                        this.posiciones[j][i].ocupada = true;
                        this.posiciones[j][i].jugador = this.jugador;
                        this.verificarGanador();
                        return true;
                    }
                }
            }
        }
    }

    verificarGanador() {
        if ((this.verificarHorizontal()) || (this.verificarVertical()) || (this.verificarDiagonal())) {
            this.redraw();
            this.jugando = false;
            $("#tituloModal").html("Ha ganado el jugador:");
            $("#imgInicio").attr("src", "images/fondo" + this.jugador + ".png");
            $("#modalInicio").modal("show");
        } else {
            if (this.jugador == 1) {
                this.jugador = 2
            } else {
                this.jugador = 1
            }
            this.redraw();
        }
    }

    verificarHorizontal() {
        let contador;
        for (let i = 0; i < this.posiciones.length; i++) {
            contador = 0;
            for (let j = 0; j < this.posiciones[i].length; j++) {
                if (this.posiciones[i][j].jugador == this.jugador) {
                    contador++;
                } else {
                    contador = 0;
                }
                if (contador == 4) {
                    return true;
                }
            }
        }
        return false;
    }

    verificarVertical() {
        let contador;
        for (let i = 0; i < this.posiciones[0].length; i++) {
            contador = 0;
            for (let j = 0; j < this.posiciones.length; j++) {
                if (this.posiciones[j][i].jugador == this.jugador) {
                    contador++;
                } else {
                    contador = 0;
                }
                if (contador == 4) {
                    return true;
                }
            }
        }
        return false;
    }

    verificarDiagonal() {
        for (let i = 3; i < this.posiciones.length; i++) {
            for (let j = 0; j < this.posiciones[0].length - 3; j++) {
                if ((this.posiciones[i][j].jugador == this.jugador) && (this.posiciones[i - 1][j + 1].jugador == this.jugador) && (this.posiciones[i - 2][j + 2].jugador == this.jugador) && (this.posiciones[i - 3][j + 3].jugador == this.jugador)) {
                    return true;
                }
            }
        }

        for (let i = 3; i < this.posiciones.length; i++) {
            for (let j = 3; j < this.posiciones[0].length; j++) {
                if ((this.posiciones[i][j].jugador == this.jugador) && (this.posiciones[i - 1][j - 1].jugador == this.jugador) && (this.posiciones[i - 2][j - 2].jugador == this.jugador) && (this.posiciones[i - 3][j - 3].jugador == this.jugador)) {
                    return true;
                }

            }
        }
        return false;
    }

    agregarFigura(tipo, color) {
        if (tipo === 'circulo') {
            this.fichas.push(new Circulo(0, 0, 45, color, this.ctx));
            this.redraw();
        }
    }

    redraw(x, y) {
        this.ctx.clearRect(0, 0, this.contenedor.width, this.contenedor.height);
        this.draw();
        this.dibujarTablero();
        for (let i = 0; i < this.fichas.length; i++) {
            if (this.idFigura !== i) {
                this.fichas[i].draw();
            }
        }
        if (this.idFigura !== -1) {
            this.fichas[this.idFigura].draw();
        }

    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colJugador[this.jugador];
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(0, 0, this.contenedor.width, this.contenedor.height);
        this.ctx.strokeRect(0, 0, this.contenedor.width, this.contenedor.height);
    }

    drawInicio() {
        let inicio = new Image();
        inicio.src = 'images/inicio.jpg';
        inicio.onload = function() {
            this.ctx.drawImage(inicio, 0, 0);
        }.bind(this);
    }
}