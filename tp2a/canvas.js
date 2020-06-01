'use strict';
class Canvas {

    constructor(idCanvas) {
        this.canvas = document.querySelector(idCanvas);
        this.ctx = this.canvas.getContext('2d');
        this.figures = [];
        this.dragging = false;
        this.draggingId = -1;
        this.detectClick();
    }

    detectClick() {

        this.canvas.addEventListener('mousedown', r => {
            this.dragging = true;
            for (let i = 0; i < this.figures.length; i++) {
                let status = this.figures[i].hit(r.layerX, r.layerY);
                if (status) {
                    this.draggingId = i;
                    console.log('le pegue');
                    break;
                }
            }
        });

        this.canvas.addEventListener('mouseup', r => {
            this.dragging = false;
            this.draggingId = -1;
        });

        this.canvas.addEventListener('mousemove', r => {
            if (this.draggingId != -1) {
                this.figures[this.draggingId].setPosition(r.layerX, r.layerY);
                this.redraw();
            }
        });

    }

    addFigure(type, colour) {
        if (type === 'circle') {
            this.figures.push(new Circle((Math.random() * this.canvas.width), (Math.random() * this.canvas.height), 50, (Math.random() * 255), this.ctx));
            this.redraw();
            console.log('Se ha creado la figura circulo correctamente');
        } else {
            console.log('Introduzca una figura valida');
        }
    }

    redraw(x, y) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.figures.length; i++) {
            if (this.draggingId !== i) {
                this.figures[i].draw();
            }
        }

        if (this.draggingId !== -1) {
            this.figures[this.draggingId].draw();
        }

    }

}