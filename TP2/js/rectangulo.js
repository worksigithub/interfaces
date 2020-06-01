'use strict';
class Rectangulo extends Figura {

    constructor(x, y, relleno, largo, alto, ctx, fondo) {
        super(x, y, relleno, ctx, fondo);
        this.relleno = relleno;
        this.largo = largo;
        this.alto = alto;

    }

    toca(x, y) {
        let tocado = false;
        if ((x >= this.x) && (x <= this.x + this.largo)) {
            if ((y >= this.y) && (y <= this.y + this.alto)) {
                tocado = true;
            }
        }
        return tocado;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.relleno;
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(this.x, this.y, this.largo, this.alto);
        this.ctx.strokeRect(this.x, this.y, this.largo, this.alto);
        if (this.fondo != null) {
            this.ctx.drawImage(this.fondo, this.x, this.y, this.largo, this.alto);
        }
    }
}