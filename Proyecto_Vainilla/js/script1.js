'use strict'

let timer;
chargingScreen()

function chargingScreen(opcion) {
    const tiempo = 5000; // tiempo en ms
    window.addEventListener('keyup', changeContent, false);

    timer = setTimeout(() => {
        window.removeEventListener('keyup', chargingScreen, false);
        start();
    }, tiempo);
    
}

function start() { document.write('hola'); } // test

function changeContent(event) { 
    if (event.ctrlKey && event.keyCode == 121) {
        clearTimeout(timer);
        start();
    }
}