'use strict'

chargingScreen()

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

function start() { document.write('hola'); } // test
