'use strict';

let canvas = new Canvas("#canvas1");

document.querySelector("#generateCircle").addEventListener('click', r => {
    canvas.addFigure('circle');
});