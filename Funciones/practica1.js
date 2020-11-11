'use strict';

var cadena;
var palabras = new Set();
var repetirXVeces = true;

// bucle infinito que se va a repetir hasta X veces
while (repetirXVeces) {
  cadena = window.prompt('Introduzca una cadena');
  if (cadena == '' || cadena == null) break;
  else palabras.add(cadena);
}

var arrayOrdenado = Array.from(palabras).sort();
var arrayRevertido = arrayOrdenado.reverse();
show();

function show() {
  var array = '';
  for (var palabra of arrayRevertido) array += palabra + ',';
  console.log('Array Ordenado de la Z a la A: ' + array);
}
