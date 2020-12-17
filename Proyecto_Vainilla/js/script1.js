'use strict'

chargingScreen();

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

function isValidEmail(email) {
    const expReg = new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})$");
    return expReg.test(email);
}

