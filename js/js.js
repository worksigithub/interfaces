let c = document.querySelector("#myCanvasOrigin");
let ctx = c.getContext("2d");
let imgData = ctx.createImageData(c.width, c.height);
let width = imgData.width;
let height = imgData.height;
let imageDataTem = imgData;

let c_result = document.querySelector("#myCanvas");
let ctx_result = c_result.getContext("2d");

let anchoLinea = 0;
let colorLinea = 0;

let pintando = false;
let pintar = false;
let goma = false;
let actualPos;
let botones = document.querySelector("#divBotones");
c.style.display = "none";
c_result.style.display = "none";
botones.style.display = "none";
// captura de botones
let grabar = document.querySelector("#btnGrabar");
document.querySelector("#btnHome").addEventListener("click", recargar);
document.querySelector("#btnLapiz").addEventListener("click", datosLapiz);
document.querySelector("#btnGoma").addEventListener("click", activarGoma);

document.querySelector("#btnGrises").addEventListener("click", cambiarGris);
document.querySelector("#btnBrillo").addEventListener("click", e => {
    $("#collapseBrillo").collapse('show');
    $("#collapsePintar").collapse('hide');
});
document.querySelector("#btnNegativo").addEventListener("click", cambiarNegativo);
document.querySelector("#btnSepia").addEventListener("click", cambiarSepia);
document.querySelector("#btnBinarizacion").addEventListener("click", cambiarBinarizacion);

document.querySelector("#rangoBrillo").addEventListener("change", cambiarBrillo);


// funciones generales
function recargar() {
    location.reload();
}

function setPixel(imgData, x, y, r, g, b, a) {
    let i = (x + y * imgData.width) * 4;
    imgData.data[i + 0] = r;
    imgData.data[i + 1] = g;
    imgData.data[i + 2] = b;
    imgData.data[i + 3] = a;
}

function getR(imageData, x, y) {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 0];
}

function getG(imageData, x, y) {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 1];
}

function getB(imageData, x, y) {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 2];
}

function getA(imageData, x, y) {
    let i = (x + y * imageData.width) * 4;
    return imageData.data[i + 3];
}

function vaciarCanvas(canvas) {
    ctx_result.clearRect(0, 0, width, height);
}

function cerrarCollapse() {
    $("#collapseBrillo").collapse('hide');
    $("#collapsePintar").collapse('hide');
}

//upload
document.querySelector('#inputFile').addEventListener('change', r => {
    const archivo = document.querySelector('#inputFile').files[0];
    const nuevaImagen = new FileReader();
    if (archivo) {
        nuevaImagen.readAsDataURL(archivo);
    }
    nuevaImagen.addEventListener("load", function() {
        image = new Image();
        image.src = nuevaImagen.result;
        image.onload = function() {
            myDrawImageMethod(this);
            cerrarCollapse();
            $("#collapseCanvas").collapse('show');
            c.style.display = "block";
            botones.style.display = "block";
        }
    }, false);
});

//download
grabar.addEventListener('click', e => {
    var dataURL = c_result.toDataURL('image/png');
    grabar.href = dataURL;
});

function mostrarResultado(imageData, x, y) {
    c_result.style.display = "block";
    ctx_result.putImageData(imageData, x, y);
}

// funciones herramientas
function datosLapiz() {
    c_result.style.display = "block";
    pintar = !pintar;
    goma = false;
    if (pintar) {
        $("#collapsePintar").collapse('show');
        document.querySelector("#btnLapiz").classList.add("btn-primary");
        document.querySelector("#btnGoma").classList.remove("btn-primary");
        c_result.addEventListener("mousemove", pintarLinea);
        c_result.addEventListener("mousedown", puntoActual);
        c_result.addEventListener("mouseup", puntoActual);
    } else {
        $("#collapsePintar").collapse('hide');
        document.querySelector("#btnLapiz").classList.remove("btn-primary");
    }
}

function activarGoma() {
    goma = !goma;
    pintar = false;
    if (goma) {
        c_result.addEventListener("mousemove", pintarLinea);
        c_result.addEventListener("mousedown", puntoActual);
        c_result.addEventListener("mouseup", puntoActual);
        $("#collapsePintar").collapse('hide');
        document.querySelector("#btnLapiz").classList.remove("btn-primary");
        document.querySelector("#btnGoma").classList.add("btn-primary");
    } else {

        document.querySelector("#btnGoma").classList.remove("btn-primary");
    }
}

function puntoActual(event) {
    if ((pintar) || (goma)) {
        pintando = !pintando;
        actualPos = {
            x: event.offsetX,
            y: event.offsetY
        };
        if (pintando) {
            ctx_result.beginPath();
        } else {
            ctx_result.closePath();
        }
    }
}

function pintarLinea(event) {
    anchoLinea = document.querySelector("#anchoLinea").value;
    if (goma) {
        colorLinea = "#ffffff";
    } else {
        colorLinea = document.querySelector("#colorLinea").value;
    }
    if (pintando) {
        ctx_result.moveTo(actualPos.x, actualPos.y);
        ctx_result.lineTo(event.offsetX, event.offsetY);
        ctx_result.lineWidth = anchoLinea;
        ctx_result.strokeStyle = colorLinea;
        ctx_result.stroke();
        actualPos = {
            x: event.offsetX,
            y: event.offsetY
        };
    }
}

// funciones filtros
function myDrawImageMethod(image) {
    vaciarCanvas(c);
    let ratioH = width / image.width;
    let ratioV = height / image.height;
    let ratio = Math.min(ratioH, ratioV);
    let centroH = (width - image.width * ratio) / 2;
    let centroV = (height - image.height * ratio) / 2;
    ctx.drawImage(image, 0, 0, image.width, image.height, centroH, centroV, image.width * ratio, image.height * ratio);
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    imageDataTem = ctx.getImageData(0, 0, image.width, image.height);
    ctx.putImageData(imageData, 0, 0);
}

function cambiarBrillo() {
    $("#collapsePintar").collapse('hide');
    let brillo = parseInt(this.value);
    brillo = (255 * brillo) / 100;
    imageData = ctx.getImageData(0, 0, width, height);
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 0;
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            rb = Math.min(getR(imageData, i, j) + brillo, 255);
            gb = Math.min(getG(imageData, i, j) + brillo, 255);
            bb = Math.min(getB(imageData, i, j) + brillo, 255);
            ab = Math.min(getA(imageData, i, j), 255);
            setPixel(imageData, i, j, rb, gb, bb, ab);
        }
    }
    mostrarResultado(imageData, 0, 0);
}

function cambiarGris() {
    cerrarCollapse();
    imageData = ctx.getImageData(0, 0, width, height);
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 0;
    let valorGris = 0;
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            rb = getR(imageData, i, j);
            gb = getG(imageData, i, j);
            bb = getB(imageData, i, j);
            ab = getA(imageData, i, j);
            valorGris = (rb + gb + bb) / 3;
            setPixel(imageData, i, j, valorGris, valorGris, valorGris, ab);
        }
    }
    mostrarResultado(imageData, 0, 0);
}

function cambiarNegativo() {
    cerrarCollapse();
    let negativo = 255;
    imageData = ctx.getImageData(0, 0, width, height);
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 0;
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            rb = negativo - getR(imageData, i, j);
            gb = negativo - getG(imageData, i, j);
            bb = negativo - getB(imageData, i, j);
            ab = getA(imageData, i, j);
            setPixel(imageData, i, j, rb, gb, bb, ab);
        }
    }
    mostrarResultado(imageData, 0, 0);
}

function cambiarSepia() {
    cerrarCollapse();
    let sepiaR = 0;
    let sepiaG = 0;
    let sepiaB = 0;
    imageData = ctx.getImageData(0, 0, width, height);
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 0;
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            rb = getR(imageData, i, j);
            gb = getG(imageData, i, j);
            bb = getB(imageData, i, j);
            ab = getA(imageData, i, j);
            sepiaR = Math.floor(0.393 * rb + 0.769 * gb + 0.189 * bb);
            sepiaG = Math.floor(0.349 * rb + 0.686 * gb + 0.168 * bb);
            sepiaB = Math.floor(0.272 * rb + 0.534 * gb + 0.131 * bb);
            setPixel(imageData, i, j, sepiaR, sepiaG, sepiaB, ab);
        }
    }
    mostrarResultado(imageData, 0, 0);
}

function cambiarBinarizacion() {
    cerrarCollapse();
    imageData = ctx.getImageData(0, 0, width, height);
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 0;
    let valorMedio = 0;
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {
            rb = getR(imageData, i, j);
            gb = getG(imageData, i, j);
            bb = getB(imageData, i, j);
            ab = getA(imageData, i, j);
            valorMedio = (rb + gb + bb) / 2;
            if (valorMedio < 128) {
                valorMedio = 0;
            } else {
                valorMedio = 255;
            }
            setPixel(imageData, i, j, valorMedio, valorMedio, valorMedio, ab);
        }
    }
    mostrarResultado(imageData, 0, 0);

}