'use strict';

const tiempo = 3000; // almacenamos el tiempo en ms

setTimeout(orderAlphabetically, tiempo);

function orderAlphabetically() {
  var respuesta = window.confirm('Quieres ordenar la lista alfabeticamente?');

  if (respuesta == true) {
    var arrayDesordenado = getArray();
    var arrayOrdenado = arrayDesordenado.sort();

    var elementoUl = document.getElementById('lista');
    while (elementoUl.firstChild) elementoUl.removeChild(elementoUl.firstChild); // eliminamos los elementos <li> de la lista <ul>

    var antiguoH1 = document.getElementsByTagName('h1')[0]; // seleccionamos la primera etiqueta <h1> que aparece en el HTML
    var elementoPadre = antiguoH1.parentNode;
    var nuevoH1 = document.createElement('h1');
    nuevoH1.innerHTML = 'Llista de Paraules Ordenades Alfabeticament';
    elementoPadre.replaceChild(nuevoH1, antiguoH1); // reemplazamos el contenido de la etiqueta h1

    // creamos un elemento <li> y lo escribimos en el documento
    for (var palabra of arrayOrdenado) {
      let nuevoLi = document.createElement('li');
      nuevoLi.innerHTML = palabra;
      elementoUl.appendChild(nuevoLi);
    }
  }
}

function getArray() {
  var array = new Array();
  var elemento = document.getElementsByTagName('li');

  for (var index = 0; index < elemento.length; index++)
    array[index] = elemento[index].innerHTML; // almacenamos el contenido de la lista en un array

  return array;
}
