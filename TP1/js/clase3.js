'use strict'

window.onload = function() {


    class Vehiculo {
        constructor(marca, modelo, motor, combustible) {
            this.marca = marca;
            this.modelo = modelo;
            this.motor = motor;
            this.combustible = combustible;
        }
    }

    class Camion {
        constructor(marca, modelo, motor, combustible, carga) {
            this.clase = new Vehiculo(marca, modelo, motor, combustible)
            this.carga = carga;
        }
    }

    class Auto {
        constructor(marca, modelo, motor, combustible, puertas) {
            this.clase = new Vehiculo(marca, modelo, motor, combustible)
            this.puertas = puertas;
        }
    }

    const a = new Vehiculo("chevrolet", "equinox", "1.5", "nafta", "5");
    const c = new Camion("scania", "112", "cummins", "diesel", "12000");

    this.alert(Object.values(a));
    this.alert(Object.values(c));
}

