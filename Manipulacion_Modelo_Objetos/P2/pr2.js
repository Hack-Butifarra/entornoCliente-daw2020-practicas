'use strict';

start();

function start() {
  let contador = getValue();
  contador++;
  saveCookie(contador);

  if (contador > 10) {
    document.cookie = 'contador=11;expires=Sat, 01 Jan 2000 00:00:01 GMT'; // borramos la cookie
    saveCookie(0); // volvemos a crear la cookie con el contador a 0
  }

  showCookie();
}

function showCookie() {
  let listaCookies = document.cookie.split(';');

  // busca el nombre de la cookie (contador) y nos muestra su valor
  for (let cookie of listaCookies) {
    let [nombre, valor] = cookie.split('=');
    if (nombre == ' contador') {
      document.write(nombre + ': ' + valor);
      break;
    }
  }
}

function saveCookie(numero) {
  if (numero == 1) {
    let hoy = new Date();
    let mesPosterior = hoy.setMonth(hoy.getMonth() + 1); // cambiamos la fecha actual a 1 mes despues
    let caducidad = new Date(mesPosterior);
    document.cookie =
      'contador=' + numero + ';expires=' + caducidad.toUTCString(); // creamos una cookie con una fecha de caducidad
  } else document.cookie = 'contador=' + numero; // actualizamos el valor de la cookie
}

function getValue() {
  let valorContador = 0;
  let listaCookies = document.cookie.split(';');

  // busca el nombre de la cookie (contador) y nos devuelve su valor
  for (let cookie of listaCookies) {
    let [nombre, valor] = cookie.split('=');
    if (nombre == ' contador') {
      valorContador = valor;
      break;
    }
  }

  return valorContador;
}
