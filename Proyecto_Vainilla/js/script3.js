'use strict'

var contador = 0;
let tiempo = 5000;
setTimeout(createTable,tiempo);

document.addEventListener('blur',checkForm,true);

var btnAtras = document.getElementById('atras');
btnAtras.addEventListener('click', () => {
    window.location.href = "pantalla2.html";
}, false);

var btnGrabar = document.getElementById('grabar');
btnGrabar.addEventListener('click',() => {
    document.getElementById('atras').disabled = "disabled";

    var tabla = document.getElementById('tabla');
    var fila = document.createElement('tr');
    tabla.appendChild(fila);

    var pregunta = document.getElementById('texto').value;
    var puntuacion = document.getElementById('puntuacion').value;
    var respuesta = getValue();

    var columna1 = createColumn(pregunta);
    var columna2 = createColumn(respuesta);
    var columna3 = createColumn(puntuacion);
    var columna4 = createColumn('Guardando...');

    fila.appendChild(columna1);
    fila.appendChild(columna2);
    fila.appendChild(columna3);
    fila.appendChild(columna4);

    document.getElementsByTagName('form')[0].reset();
    document.getElementById('grabar').disabled = "disabled";

    setTimeout(save,tiempo);
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

    if (existsInfo)
        showCookies(tabla);
}

function createEncabezado(valor) {
    var columna = document.createElement('th');
    columna.innerHTML = valor;
    return columna;
}

function checkForm() {
    var canSubmit = false;
    var text = document.getElementById('texto').value;
    var puntuacion = document.getElementById('puntuacion').value;

    if ((document.getElementById('v').checked || document.getElementById('f').checked) && text != null && puntuacion != 0)
        canSubmit = true;

    if (canSubmit) 
        document.getElementById('grabar').disabled = false;
}

function save() {
    var estado = document.getElementById('ultimo'); // seleccionamos la primera etiqueta <h1> que aparece en el HTML
    var elementoPadre = estado.parentNode;
    var actualizar = document.createElement('td');

    var table = document.getElementById("tabla");
    
    try {
        document.cookie = "pregunta=" + table.rows[contador].cells[0].innerHTML;
        document.cookie = "respuesta=" + table.rows[contador].cells[1].innerHTML;
        document.cookie = "puntuacion=" + table.rows[contador].cells[2].innerHTML;
        document.cookie = "estado=" + table.rows[contador].cells[3].innerHTML;

        actualizar.innerHTML = 'OK';
        contador++;
    } catch (error) {
        actualizar.innerHTML = 'ERROR';
        console.error(error);
    } 

    elementoPadre.replaceChild(actualizar, estado);
    
    if (contador == document.getElementsByTagName('tr').length)
        document.getElementById('atras').disabled = false;
}

function createColumn(valor) {
    var columna = document.createElement('td');
    columna.innerHTML = valor;

    if (valor == "Guardando...")
        columna.setAttribute('id','ultimo');

    return columna;
}

function getValue() {
    if (document.getElementById('v').checked)
        return document.getElementById('v').value;
    else
        return document.getElementById('f').value;
}

function showCookies(tabla) {
    var fila = document.createElement('tr');
    tabla.appendChild(fila);
    let listaCookies = document.cookie.split(';');

    // busca el nombre de la cookie y almacena su valor
    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre.trim() != 'email' && nombre.trim() != 'fecha' && nombre.trim() != 'hora') {
            var columna = createColumn(valor);
            fila.appendChild(columna);
        }
    }

    contador++;
}

function existsInfo() {
    let listaCookies = document.cookie.split(';');

    // busca el nombre de la cookie y almacena su valor
    for (let cookie of listaCookies) {
        let [nombre,valor] = cookie.split('=');
        if (nombre.trim() == 'pregunta')
            return true;
        else
            return false;
    }
}