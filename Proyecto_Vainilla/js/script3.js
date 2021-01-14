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
btnGrabar.addEventListener('click', async () => {
    document.getElementById('atras').disabled = "disabled";

    var tabla = document.getElementById('tabla');
    var filaActual = document.getElementsByTagName('tr').length;
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

    await setTimeout(save,tiempo,filaActual);
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

    if (existsQuestion)
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

function save(fila) {
    var estado = document.getElementById('ultimo'); // seleccionamos la primera etiqueta <h1> que aparece en el HTML
    var elementoPadre = estado.parentNode;
    var actualizar = document.createElement('td');

    var table = document.getElementById("tabla");
    
    try {
        document.cookie = "pregunta" + fila + "=" + table.rows[fila].cells[0].innerHTML;
        document.cookie = "respuesta" + fila + "=" + table.rows[fila].cells[1].innerHTML;
        document.cookie = "puntuacion" + fila + "=" + table.rows[fila].cells[2].innerHTML;
        document.cookie = "estado" + fila + "=" + table.rows[fila].cells[3].innerHTML;

        actualizar.innerHTML = 'OK';
        document.cookie = "estado" + fila + "=" + actualizar.innerHTML;
    } catch (error) {
        actualizar.innerHTML = 'ERROR';
        console.error(error);
    } finally {
        elementoPadre.replaceChild(actualizar, estado);
    }
    
    if (fila == document.getElementsByTagName('tr').length - 1)
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
    let contador = 0;

    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre.trim() != 'email' && nombre.trim() != 'fecha' && nombre.trim() != 'hora') {
            if (contador == 0) {
                var fila = document.createElement('tr');
                tabla.appendChild(fila);
            }

            var columna = createColumn(valor);
            fila.appendChild(columna);
            contador++;

            if (contador == 4)
                contador = 0;
        }
    }
}

function existsQuestion() {
    let listaCookies = document.cookie.split(';');
    let exits = false;

    // busca el nombre de la cookie y almacena su valor
    for (let cookie of listaCookies) {
        let [nombre,valor] = cookie.split('=');
        let nuevoNombre = nombre.trim(); // quita los espacios en blanco
        if (nuevoNombre.substr(0,nuevoNombre.length - 1) == 'pregunta') {
            exits = true;
            break;
        }
    }

    return exits;
}

function deleteCookie(valor) { // desarrollo (no funcional) solo test
    document.cookie = "estado" + valor + "=; max-age=0";
    document.cookie = "pregunta"+ valor + "=; max-age=0";
    document.cookie = "respuesta" + valor + "=; max-age=0";
    document.cookie = "puntuacion"+ valor + "=; max-age=0";
}
