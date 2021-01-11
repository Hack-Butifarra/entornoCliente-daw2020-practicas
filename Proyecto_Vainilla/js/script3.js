'use strict'

let tiempo = 5000;
setTimeout(createTable,tiempo);

var btnAtras = document.getElementById('atras');
btnAtras.addEventListener('click', () => {
    window.location.href = "pantalla2.html";
}, false);

function createTable() {
    var parrafo = document.getElementById('preguntas'); // seleccionamos la primera etiqueta <h1> que aparece en el HTML
    var elementoPadre = parrafo.parentNode;
    var tabla = document.createElement('table');
    tabla.setAttribute('id','tabla');
    elementoPadre.replaceChild(tabla, parrafo);

    var fila = document.createElement('tr');
    tabla.appendChild(fila);

    var columna1 = createEncabezado('Preguntas');
    var columna2 = createEncabezado('Respuestas');
    var columna3 = createEncabezado('Puntuación');
    var columna4 = createEncabezado('Estado');
    fila.appendChild(columna1);
    fila.appendChild(columna2);
    fila.appendChild(columna3);
    fila.appendChild(columna4);
}

function createEncabezado(valor) {
    var columna = document.createElement('th');
    columna.innerHTML = valor;
    return columna;
}