'use strict';
class Circle extends Figure {

    constructor(x, y, radius, colour, ctx) {
        super(x, y, colour, ctx);
        this.radius = radius;
    }

    hit(x, y) {
        let temp = false;
        let m = Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2);
        return m < Math.pow(this.radius, 2);
    }


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.colour;
        this.ctx.fill();
        this.ctx.stroke();
    }

}