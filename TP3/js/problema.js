'use strict';

class Problema {

    constructor(superior, inferior, superior_pos, inferior_pos, nroProblema) {
        this.superior = superior;
        this.inferior = inferior;
        this.superior_pos = superior_pos;
        this.inferior_pos = inferior_pos;
        this.width = 100;
        this.left;
        this.nroProblema = nroProblema;
        this.armar();
    }

    armar() {
        this.left = this.nroProblema * 700 + 1000;
        this.superior.style.left = this.left + 'px';
        this.inferior.style.left = this.left + 'px';

        this.superior.style.width = this.width + 'px';
        this.inferior.style.width = this.width + 'px';

        this.superior.style.height = this.superior_pos + 'px';
        this.inferior.style.height = this.inferior_pos + 'px';
    }

    updateScreen() {
        if (this.left < -80) {
            this.left = 2100;
        } else {
            this.left -= 7;
        }

        this.superior.style.left = this.left + 'px';
        this.inferior.style.left = this.left + 'px';
    }
}