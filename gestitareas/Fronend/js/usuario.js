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
