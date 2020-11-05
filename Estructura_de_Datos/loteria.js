'use strict';

var numAleatorio;
var boleto = new Set();
var min = 1;
var max = 49;
var numVoltes = 50;
var indice = 0;
const tamañoMax = 6;

while (numVoltes != 0) {
  numAleatorio = Math.round(getRandom(min, max));

  if (boleto.size != tamañoMax) {
    boleto.add(numAleatorio);
  } else {
    indice++;
    numVoltes--;
    show();
    boleto.clear();
  }
}

function show() {
  var numeros = '';
  for (let num of boleto) {
    numeros += num + ',';
  }
  console.log('Boleto' + indice + ': ' + numeros);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
