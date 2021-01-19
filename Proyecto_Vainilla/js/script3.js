'use strict'

let tiempo = 5000;
setTimeout(createTable,tiempo);

document.addEventListener('blur',checkForm,true);

var btnAtras = document.getElementById('atras');
btnAtras.addEventListener('click', () => {
    window.location.href = "pantalla2.html";
}, false);

var btnGrabar = document.getElementById('grabar');
btnGrabar.addEventListener('click',async () => {
    document.getElementById('atras').disabled = "disabled";

    var tabla = document.getElementById('tabla');
    var filaActual = document.getElementsByTagName('tr').length; // obtemos la fila actual donde se esta guardando la pregunta y le pasamos el valor a la funcion save()
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

    await new Promise(() => {
        setTimeout(save,tiempo,filaActual)
    });

}, false);

function createTable() {
    var parrafo = document.getElementById('preguntas'); // seleccionamos el parrafo (Cargando Preguntas)
    var elementoPadre = parrafo.parentNode; // obtenemos la etiqueta padre (<section>) en el bloque donde se encuentra la etiqueta (<p>)
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

// comprueba que todos los campos del form esten completados y no vacios
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
    var estado = document.getElementById('ultimo'); // seleccionamos la ultima columna (Estado)
    var elementoPadre = estado.parentNode; // obtenemos la etiqueta padre (<tr>) en el bloque donde se encuentra la etiqueta (<td>)
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
    // Comprueba que campo del radio (Verdadero o Falso) esta seleccionado
    if (document.getElementById('v').checked)
        return document.getElementById('v').value;
    else
        return document.getElementById('f').value;
}

function showCookies(tabla) {
    let listaCookies = document.cookie.split(';');
    let contador = 0;

    // guarda los valores de las cookies (pregunta,respuesta,puntuacion,estado) en la tabla
    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre.trim() != 'email' && nombre.trim() != 'fecha' && nombre.trim() != 'hora') { // Comprueba que el nombre (id) de la cookie no sea el email, la fecha o la hora
            if (contador == 0) {
                var fila = document.createElement('tr');
                tabla.appendChild(fila);
            }

            var columna = createColumn(valor);
            fila.appendChild(columna);
            contador++;

            if (contador == 4)  // Cuando se guarda los valores de las cookies en las 4 columnas, se reestblace el contador
                contador = 0;
        }
    }
}

function existsQuestion() {
    let listaCookies = document.cookie.split(';');
    let exits = false;

    // busca si existe el campo (pregunta) en la cookie, esto nos indica si hay alguna pregunta guardada en la tabla o no
    for (let cookie of listaCookies) {
        let nombres = cookie.split('=');
        for (let i = 0; i < nombres.length; i += 2) {
            let nuevoNombre = nombres[i].trim(); // quita los espacios en blanco
            if (nuevoNombre.substr(0,nuevoNombre.length - 1) == 'pregunta') {
                exits = true;
                break;
            }
        }
    }

    return exits;
}

// ***ESTE CODIGO NO ES NECESARIO, SOLO SE UTLIZA PARA ELIMINAR LAS COOKIES DEL NAVEGADOR DE LA PAGINA DESDE LA PROPIA CONSOLA DEL NAVEGADOR (SOLO TESTING)***
// DEJO ESTE CODIGO POR SI LO QUIERES UTILIZAR

function deleteCookie(valor) { // VALOR = A LA VARIABLE "FILA" QUE SE ENCUENTRA EN LA FUNCION SAVE()
    document.cookie = "estado" + valor + "=; max-age=0";
    document.cookie = "pregunta"+ valor + "=; max-age=0";
    document.cookie = "respuesta" + valor + "=; max-age=0";
    document.cookie = "puntuacion"+ valor + "=; max-age=0";
}
