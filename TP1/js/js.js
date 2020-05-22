let c = document.querySelector("#myCanvasOrigin");
let ctx = c.getContext("2d");
let imageData = ctx.createImageData(c.width, c.height);
let width = imageData.width;
let height = imageData.height;

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

//document.querySelector("#btnGrises").addEventListener("click", cambiarGris);
document.querySelector("#btnBrillo").addEventListener("click", e => {
    $("#collapseBrillo").collapse('show');
    $("#collapseBlur").collapse('hide');
    $("#collapsePintar").collapse('hide');
});

document.querySelectorAll('.filtroSimple').forEach(b=>{
    b.addEventListener("click", cambiarFiltroSimple);
})

document.querySelector("#btnBorde").addEventListener("click", cambiarBorde);
document.querySelector("#btnBlur").addEventListener("click", e => {
    $("#collapseBlur").collapse('show');
    $("#collapseBrillo").collapse('hide');
    $("#collapsePintar").collapse('hide');
});

document.querySelector("#rangoBlur").addEventListener("click", cambiarBlur);
document.querySelector("#rangoBrillo").addEventListener("change", cambiarFiltroSimple);

// funciones generales
function recargar() {
    location.reload();
}

function getPixel(imgData, x, y) {
    let i = (x + y * imgData.width) * 4;
    let r = imgData.data[i + 0];
    let g = imgData.data[i + 1];
    let b = imgData.data[i + 2];
    let a = imgData.data[i + 3];
    return [r, g, b, a];
}

function verificar(valor){
    if(valor<0){
        valor=0;
    }        
    if(valor>255){
        valor=255;
    } 
    return valor;
}

function setPixel(imgData, x, y, r, g, b, a) {
    let i = (x + y * imgData.width) * 4;
    imgData.data[i + 0] = verificar(r);
    imgData.data[i + 1] = verificar(g);
    imgData.data[i + 2] = verificar(b);
    imgData.data[i + 3] = verificar(a);
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

function vaciarCanvas(context) {
    context.clearRect(0, 0, c.width, c.height);
}

function cerrarCollapse() {
    $("#collapseBrillo").collapse('hide');
    $("#collapseBlur").collapse('hide');
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
        c_result.addEventListener("mouseleave", parar);
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
        c_result.addEventListener("mouseleave", parar);
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

function parar(event) {
    console.log("Afuera");
    goma = false;
    pintar = false; 
    pintando = false;
    document.querySelector("#btnLapiz").classList.remove("btn-primary");
    document.querySelector("#btnGoma").classList.remove("btn-primary");
    ctx_result.closePath();    
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
    vaciarCanvas(ctx);
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

//gris-negativo-sepia-binarizacion-brillo
function cambiarFiltroSimple() {    
    let tipo = this.getAttribute('data-name').toUpperCase();
    imageData = ctx.getImageData(0, 0, width, height);
    let filtroMatriz = [    
        [1]
    ];
    imageData = aplicarMatriz(imageData, filtroMatriz, tipo);
    mostrarResultado(imageData, 0, 0);    
}

function cambiarBlur() {
    imageData = ctx.getImageData(0, 0, width, height);
    let distancia = document.querySelector("#rangoBlur").value;    
    document.querySelector("#valorBlur").innerHTML = distancia;
    let filtroMatriz = [];
    let item = [];
    let tam = (distancia * 2) + 1;
    let elem = Math.pow(tam,2);
    let valor = 1/elem;
    valor = valor.toFixed(2);
    for (let d = 0; d < tam; d++) {
        item.push(valor);
    }
    for (let d = 0; d < tam; d++) {
        filtroMatriz.push(item);
    }        
    imageData = aplicarMatriz(imageData, filtroMatriz, "BLUR");
    mostrarResultado(imageData, 0, 0);    
}

function cambiarBorde(){
    imageData = ctx.getImageData(0, 0, width, height);
    let filtroMatriz = [    
        [1]
    ];
    imageData = aplicarMatriz(imageData, filtroMatriz, "GRIS");   
    filtroMatriz = [    
        [1, 0, -1],
        [1, 1, -1],
        [1, 0, -1]
    ];    
    imageData = aplicarMatriz(imageData, filtroMatriz, "BORDE");
    mostrarResultado(imageData, 0, 0);    
}

function aplicarMatriz(imageData, filtroMatriz, tipo) {
    vaciarCanvas(ctx_result);
    let brillo = 0;
    let rb = 0;
    let gb = 0;
    let bb = 0;
    let ab = 255;    
    let distancia = (filtroMatriz[0].length - 1) / 2; 
    
    if(tipo=='BRILLO'){
        brillo = document.querySelector('#rangoBrillo').value;
        document.querySelector("#valorBrillo").innerHTML = brillo + "%";
        brillo = (255 * brillo) / 100;
    }
    else if(tipo=='BLUR'){

    }
    else{
        cerrarCollapse();        
    }
    for (let i = 0; i < imageData.width; i++) {
        for (let j = 0; j < imageData.height; j++) {            
            rb = 0;
            gb = 0;
            bb = 0;
            if(distancia==0){
                let pixel_RGBA = getPixel(imageData, i, j);                
                rb += (pixel_RGBA[0] * filtroMatriz[0][0]);
                gb += (pixel_RGBA[1] * filtroMatriz[0][0]);
                bb += (pixel_RGBA[2] * filtroMatriz[0][0]);
            }
            else{
                for (let dx = (distancia*-1); dx <= distancia; dx++) {
                    for (let dy = (distancia*-1); dy <= distancia; dy++) {
                        let pixel_RGBA = getPixel(imageData, i - dx, j - dy);                
                        rb += (pixel_RGBA[0] * filtroMatriz[distancia+dx][distancia+dy]);
                        gb += (pixel_RGBA[1] * filtroMatriz[distancia+dx][distancia+dy]);
                        bb += (pixel_RGBA[2] * filtroMatriz[distancia+dx][distancia+dy]);
                    }
                }
            }
            switch (tipo){
                case 'GRIS':
                    let valorGris = (rb + gb + bb) / 3;
                    rb = valorGris;
                    gb = valorGris;
                    bb = valorGris;
                    break;
                case 'BORDE':
                    rb = (Math.floor(rb));
                    gb = (Math.floor(gb));
                    bb = (Math.floor(bb));
                    break;
                case 'SEPIA':
                    let sepiaR = Math.floor(0.393 * rb + 0.769 * gb + 0.189 * bb);
                    let sepiaG = Math.floor(0.349 * rb + 0.686 * gb + 0.168 * bb);
                    let sepiaB = Math.floor(0.272 * rb + 0.534 * gb + 0.131 * bb);
                    rb = Math.floor(sepiaR);
                    gb = Math.floor(sepiaG);
                    bb = Math.floor(sepiaB);
                    break;
                case 'NEGATIVO':
                    let negativo = 255;
                    rb = negativo - rb;
                    gb = negativo - gb;
                    bb = negativo - bb;
                    break;                    
                case 'BINARIZACION':
                    valorMedio = (rb + gb + bb) / 2;
                    if (valorMedio < 128) {
                        valorMedio = 0;
                    } else {
                        valorMedio = 255;
                    }                   
                    rb = valorMedio;
                    gb = valorMedio;
                    bb = valorMedio;
                    break;
                case 'BRILLO':                    
                    rb = Math.min(rb + brillo, 255);
                    gb = Math.min(gb + brillo, 255);
                    bb = Math.min(bb + brillo, 255);
                    break;
                case 'BLUR':                    
                    
                    break;
                default :
                    break
            }
            setPixel(imageData, i, j, rb, gb, bb, ab);                
        }
    }
    return imageData;    
}

function ajustaBorde(valor){    
    /* if(valor>255){
        valor = 255;
    }
    if(valor<0){
        valor = 0;
    } */
    /* if(valor>765){
        valor = 255;
    }
    else if(valor>510){
        valor = 192;
    }
    else if(valor>255){
        valor = 128;
    }
    else if(valor>0){
        valor = 64;
    } */
    return valor;
}
