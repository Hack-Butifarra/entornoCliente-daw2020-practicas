'use strict'

chargingScreen();
window.addEventListener('onclick',screen1,false);

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
    if (isValidEmail) {
        window.location.href="http://127.0.0.1:5500/Proyecto_Vainilla/index2.html";
    } else {
       
    }
}

function isValidEmail() {
    let email = document.getElementsByName('email').values;
    const expReg = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})$");
    return expReg.test(email);
}

