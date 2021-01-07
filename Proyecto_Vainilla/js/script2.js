'use strict'
 
accountInformation();

function accountInformation() {
    var email = search('email');
    var fecha = search('fecha');
    var hora = search('hora');

    var elementoPadre = document.getElementsByTagName('main')[0];
    var parrafo1 = document.createElement('p');
    var parrafo2 = document.createElement('p');
    parrafo1.innerHTML = 'Hola' + email;
    parrafo2.innerHTML = 'La ultima vez que entraste fue' + fecha + 'a las' + hora;
    elementoPadre.appendChild(parrafo1);
    elementoPadre.appendChild(parrafo2);
}

function search(campo) {
    let valor;
    let listaCookies = document.cookie.split(';');

  // busca el nombre de la cookie (contador) y nos muestra su valor
    for (let cookie of listaCookies) {
        let [nombre, valor] = cookie.split('=');
        if (nombre == campo) {
            valor = nombre;
            break;
        }
    }

    return valor;
}