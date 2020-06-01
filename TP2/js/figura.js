'use strict';

class Figura {

    constructor(x, y, relleno, ctx, fondo) {
        this.x = x;
        this.y = y;
        this.ctx = ctx
        this.relleno = relleno;
        this.fondo = fondo;
    }

    setPosicion(x, y) {
        this.x = x;
        this.y = y;
    }
}