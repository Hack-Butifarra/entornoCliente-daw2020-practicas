const BASE_URL = 'https://reqres.in/api/users/';
const POST_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}

function procesarFetch(numsecs, user) {
  setTimeout(async () => {
    try {
      const response = await fetch(BASE_URL + user);
      const cliente = await response.json();
      let email = document.getElementById('email');
      email.innerHTML = cliente.data.email;
    } catch (error){
      let status = document.getElementById('status');
      status.innerHTML = error;
    }
  }, numsecs * 1000);
}
