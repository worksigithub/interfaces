'use strict';

class Premio {

    constructor(divPremio) {
        this.divPremio = divPremio;
        this.left = 0;
        this.armar();
    }

    armar() {
        this.left = 2000;
        this.divPremio.style.left = this.left + 'px';
        this.divPremio.style.left = this.left + 'px';

    }

    updateScreen() {
        if (this.left < -80) {
            this.left = 2100;
        } else {
            this.left -= 7;

        }
        this.divPremio.style.left = this.left + 'px';
    }
}