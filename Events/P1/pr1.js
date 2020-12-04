'use strict'

window.addEventListener('keyup', changeBackground, false);

function changeBackground(event) {
    if (event.altKey && event.keyCode == 123) document.body.style.backgroundImage = "url(../img/imagen.jfif)";
}