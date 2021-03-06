'use strict'

chargingScreen();
let form = document.getElementsByTagName('main')[0];
form.addEventListener('blur',screen1,true);

function chargingScreen() {
    const tiempo = 5000; // tiempo en ms

    let timer = setTimeout(() => {
        window.removeEventListener('keyup',myEvent,false);
        start();
    }, tiempo);

    let myEvent = window.addEventListener('keyup', () => {
        let event = window.event;
        if (event.ctrlKey && event.keyCode == 121) {
            clearTimeout(timer);
            start();
        }
    }, false);
}

function start() { 
    document.getElementsByTagName('header')[0].style.display = 'none'; 
    document.body.style.backgroundColor = 'white';
    document.getElementsByTagName('main')[0].style.display = 'block';
}

function screen1() {
    var email = document.getElementById('email').value;
    const expReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"); 

    if (expReg.test(email)) { 
        var hoy = new Date();
        var fecha = convert(hoy.getDate()) + "/" + convert(hoy.getMonth() + 1) + "/" + hoy.getFullYear();
        var hora = convert(hoy.getHours()) + ":" + convert(hoy.getMinutes()) + ":" + convert(hoy.getSeconds());
        
        document.cookie = "email=" + email;
        document.cookie = "fecha=" + fecha;
        document.cookie = "hora=" + hora;
        window.location.href = "pantalla2.html";
    }
    else {
        document.getElementsByTagName('button')[0].style.display = 'block';
        document.forms[0].elements[0].focus();
    }
}

// convierte un numero de una cifra en dos cifras
function convert(valor) {
    if (valor < 10)
        valor = "0" + valor;

    return valor;
}
