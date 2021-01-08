'use strict'

chargingScreen();
window.addEventListener('blur',screen1,true);

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
    const expReg = new RegExp("^\w+([\.-]?)*\w*@+a-z+\.+a-z{2,4}$"); // validar correctamente email *fallo

    if (true) {  //expReg.test(email)
        var hoy = new Date();
        var fecha = hoy.getDay() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
        var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
        
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
