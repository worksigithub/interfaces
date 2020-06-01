'use strict';

class Figure {

    constructor(x, y, colour, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx
        this.colour = `rgb(${(Math.random() * 255)}, ${(Math.random() * 255)}, ${(Math.random() * 255)}, 1)`;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;

    }


}