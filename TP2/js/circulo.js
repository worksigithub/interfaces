'use strict';
class Circulo extends Figura {

    constructor(x, y, radio, relleno, ctx, fondo) {
        super(x, y, relleno, ctx, fondo);
        this.radio = radio;
        this.ocupada = false;
        this.jugador = 0;
    }

    toca(x, y) {
        let toca = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
        return toca < Math.pow(this.radio, 2);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.relleno;
        this.ctx.lineWidth = 5;
        this.ctx.fill();
        this.ctx.stroke();
        if (this.fondo != null) {
            this.ctx.drawImage(this.fondo, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        }
    }
}