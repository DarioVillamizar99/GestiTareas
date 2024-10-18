function saveUsuario(){
    let id = document.getElementById('usuario-id').value
    let nombre = document.getElementById('usuario-nombre').value
    let contraseña = document.getElementById('usuario-contraseña').value
    let email = document.getElementById('usuario-email').value
    let data = 
    {
        "nombre": nombre,
        "password": contraseña,
        "email": email,
        "id": id
    };
    let url = id ? `usuario/actualizar/${id}` : 'usuario/agregar';
    let method = id ? 'PUT' : 'POST';

    let request = sendRequest(url, method, data);

    request.onload = function(){
        alert('usuario creado o actualizado con exito.')
        window.location = "menu.html"
    }

    request.onerror = function() {
        alert('Error al guardar los cambios.');
    }
}

function deleteUsuario(){
    let id = document.getElementById('usuario-id').value
    let request = sendRequest('usuario/' +id , 'DELETE', '')
    request.onload= function() {
        alert('Registro eliminado exitosamente')
        window.location = 'menu.html';
    }
    request.onerror = function() {
        alert('Error al elminar el registro.')
    }
}


function loadData(){
    let request = sendRequest('list/usuario', 'GET', '');
    let table = document.getElementById('usuario-table');
    table.innerHTML="";
    request.onload = function(){
        let data = request.response;
        data.forEach((element, index) => {
            table.innerHTML +=  `
            <tr>
                <th>${element.idUsuario}</th>
                <td>${element.nombre}</th>
                <td>${element.email}</th>
                <td>${element.fechaCreacion}</th>
                <td>${element.ultimaSesion}</th>
                <td> 
                    <button type="button" class="btn-primary" onclick='window.location = 
                    "formUsuario.html?idUsuario=${element.idUsuario}"'>Ver</button>
                </td>
            </tr>`
        });
    }
    request.onerror = function() {
        table.innerHTML = `
        <tr>
            <td colspan="5">Error al recuperar los datos.</td>
        </tr>`;
    };
}

//funcion para actualizar los datos de un proveedor
function loadUsuario(idUsuario){
    let request = sendRequest('list/usuario/'+idUsuario, 'GET', '')
    let id = document.getElementById('usuario-id')
    let nombre = document.getElementById('usuario-nombre')
    let contraseña = document.getElementById('usuario-contraseña')
    let email = document.getElementById('usuario-email')
    request.onload = function(){
        let data = request.response;
        //Se actualiza el valor de las variables segun el JSON
        id.value = data.idUsuario
        nombre.value = data.nombre
        contraseña.value = data.contraseña
        email.value = data.email
    }
    request.onerror = function(){
        alert("Error al recuperar los datos.")
    }
}