const input = document.querySelector('input');
const userList = document.querySelector('#users');

let users = [];

window.addEventListener('DOMContentLoaded', async() => {
    const data = await loadUsers();
    users = data.data
    renderUsers(users)
})

const loadUsers = async() => {
    const response = await  fetch('https://fakerapi.it/api/v1/users?_quantity=1000');
    return await response.json();
}

const createUserItems = users => users.map(user => `<li>${user.firstname} ${user.lastname}</li>`).join(" ");

const renderUsers = users => {
    const itemsString = createUserItems(users)
    userList.innerHTML = itemsString;
}

input.addEventListener('keyup', e => {
    let newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase()));
    renderUsers(newUsers);
})

/* 
Explicacion de lo que se hizo:
    Se guardo en variable la etiqueta input y ol.
    
    1)- loadUsers
        Una funcion asincronica que trae los datos con fetch, los guarda dentro de la variable response, y los retorna en un formato json.
        entonces esa respuesta está lista para ser guardada dentro de una variable.
    2)- DOMContent
        Cuando el dom está listo, se ejecuta una funcion asincronica para traer esos datos que mandamos desde loadUsers en formato json y guardarlos dentro de la variable data.
    3)- createUserItems
        funcion que recibe por parametro a los users para hacerle un mapeo y por cada user va a crear una etiqueta LI con su respectivo nombre.
    4)- renderUsers
        Recibe recibe user y se lo pasa a createUserItems y por cada mapeo se guarda el valor en una constante de nombre itemsString y se coloca ese valor dentro de la etiqueta ol.
        
        
*/