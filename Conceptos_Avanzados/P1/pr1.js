'use strict'

let tiempo = 5000; 
timer(tiempo);

function timer (tiempo) {
    let promesa = new Promise(function (resol,reject) {
        setTimeout(() => {
            resol('Tiempo concluido');
            clearTimeout(case2);
        }, tiempo);
        let case2 = setTimeout(() => {
            reject('El tiempo no va bien')
        }, tiempo * 2);
    });
   
    promesa.then(createContent).catch(createContent);
}

function createContent(texto) {
    let parrafo = document.createElement('p');
    let contenido = document.createTextNode(texto);
    parrafo.appendChild(contenido);
    document.body.appendChild(parrafo);
}

