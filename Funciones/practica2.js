'use strict';

var palabras = new Map();
test();

function test() {
  var myMap = getMap();
  show(myMap);
}

function save(palabra) {
  if (!palabras.has(palabra)) palabras.set(palabra, 1);
  else {
    var nuevoValor;

    // busca que valor es el mismo y lo actualiza (aumenta su valor)
    for (var valor of palabras.values()) {
      if (palabras.get(palabra) == valor) {
        nuevoValor = valor + 1;
        palabras.delete(palabra);
        palabras.set(palabra, nuevoValor);
        break;
      }
    }
  }
}

function show(arrayMap) {
  for (var [clave, valor] of arrayMap)
    document.write(clave + ' = ' + valor + '<br />');
}

function getMap() {
  var cadena;
  var repetirXVeces = true;

  // bucle infinito que se va a repetir hasta X veces
  while (repetirXVeces) {
    cadena = window.prompt('Introduzca una cadena');
    if (cadena == '' || cadena == null) break;
    else save(cadena);
  }

  return palabras;
}
