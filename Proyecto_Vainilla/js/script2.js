'use strict'

var email = search('email');
var fecha = search('fecha');
var hora = search('hora');

var elementoPadre = document.getElementsByTagName('main')[0];
var parrafo1 = document.createElement('p');
var parrafo2 = document.createElement('p');
parrafo1.innerHTML = 'Hola ' + email;
parrafo2.innerHTML = 'La ultima vez que entraste fue ' + fecha + ' a las ' + hora;
elementoPadre.appendChild(parrafo1,parrafo2);
elementoPadre.appendChild(parrafo2);

window.addEventListener('click', () => {
    window.location.href = "pantalla3.html";
}, false);

function search(campo) {
    let dato;
    let listaCookies = document.cookie.split(';');

  // busca el nombre de la cookie y almacena su valor
    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre.trim() == campo) { // trim() para eliminar los espacios en blanco y hacer coincidir el nombre con el valor correspondiente
            dato = valor;
            break;
        }
    }

    return dato;
}