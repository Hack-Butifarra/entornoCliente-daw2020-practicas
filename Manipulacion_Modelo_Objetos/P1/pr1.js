'use strict';

const tiempo = 5000; // almacenamos el tiempo en ms

setTimeout(goGoogle, tiempo);

function goGoogle() {
  location.href = 'https://www.google.es';
}
