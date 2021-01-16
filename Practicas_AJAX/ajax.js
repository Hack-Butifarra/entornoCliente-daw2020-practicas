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
  let response;

  const newUser = {
    title:"Nuevo Usuario",
    name:"Javier",
    userId:1
  };

  const options = {
    method: 'POST',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(newUser)
  };
  
  setTimeout(async () => {
    try {
      // GET
      response = await fetch(BASE_URL + user);
      const cliente = await response.json();

      let id = document.getElementById('id');
      id.innerHTML = cliente.data.id;
      let email = document.getElementById('email');
      email.innerHTML = cliente.data.email;

      // POST
      const post = await fetch(POST_URL, options);
      const usuario = await post.json();
      
      let nombre = document.getElementById('name');
      nombre.innerHTML = usuario.json.name;
    } catch (error) {
      console.log('ERROR: ' + error.message);
    } finally {
      let status = document.getElementById('status');
      status.innerHTML = response.status;
    }
  }, numsecs * 1000);
}
