'use strict'

let vecesPulsados = 0;
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
    let contador = document.getElementsByTagName('tr').length - 1;
    var estado = document.getElementById('ultimo'); // seleccionamos la primera etiqueta <h1> que aparece en el HTML
    var elementoPadre = estado.parentNode;
    var actualizar = document.createElement('td');

    var table = document.getElementById("tabla");
    
    try {
        document.cookie = "pregunta" + contador + "=" + table.rows[contador].cells[0].innerHTML;
        document.cookie = "respuesta" + contador + "=" + table.rows[contador].cells[1].innerHTML;
        document.cookie = "puntuacion" + contador + "=" + table.rows[contador].cells[2].innerHTML;
        document.cookie = "estado" + contador + "=" + table.rows[contador].cells[3].innerHTML;

        actualizar.innerHTML = 'OK';
    } catch (error) {
        actualizar.innerHTML = 'ERROR';
        console.error(error);
    } finally {
        document.cookie = "estado" + contador + "=" + actualizar.innerHTML;
        elementoPadre.replaceChild(actualizar, estado);
    }
    
   
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
    let listaCookies = document.cookie.split(';');
    let cont = 0;

    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre.trim() != 'email' && nombre.trim() != 'fecha' && nombre.trim() != 'hora') {
            if (cont == 0) {
                var fila = document.createElement('tr');
                tabla.appendChild(fila);
            }

            var columna = createColumn(valor);
            fila.appendChild(columna);
            cont++;

            if (cont == 4)
                cont = 0;
        }
    }
}

function existsInfo() {
    let listaCookies = document.cookie.split(';');

    // busca el nombre de la cookie y almacena su valor
    for (let cookie of listaCookies) {
        let nombre = cookie.split('=');
        if (nombre.trim() == 'pregunta')
            return true;
        else
            return false;
    }
}

function deleteCookie(valor) { // desarrollo (no funcional)
    document.cookie = "estado" + valor + "=; max-age=0";
    document.cookie = "pregunta"+ valor + "=; max-age=0";
    document.cookie = "respuesta" + valor + "=; max-age=0";
    document.cookie = "puntuacion"+ valor + "=; max-age=0";
}
