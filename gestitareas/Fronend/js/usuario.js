document.getElementById('usuarioForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    saveUsuario(); // Llama a la función para guardar el usuario
});


function saveUsuario() {
    // Obtiene los valores de los elementos con los IDs correctos
    let id = document.getElementById('idNuevoUsuario').value;
    let nombre = document.getElementById('nombreNuevo').value;
    let contraseña = document.getElementById('contraseñaNuevo').value;
    let email = document.getElementById('emailNuevo').value;

    // Construye el objeto de datos a enviar
    let data = {
        "idUsuario": id,
        "nombre": nombre,
        "password": contraseña,
        "email": email
    };

    // Define la URL de la API
    let url = `usuario/agregar`;

    // Envía la solicitud usando `sendRequest`
    let request = sendRequest(url, 'POST', data);

    // Maneja la respuesta en `onload`
    request.onload = function() {
        if (request.status === 200 || request.status === 201) { // Asegúrate de manejar correctamente los códigos de éxito
            alert('Usuario creado con éxito.');
            $('#nuevoUsuarioModal').modal('hide'); // Oculta el modal
            window.location = "usuarios.html"; // Redirecciona a otra página
        } else {
            alert('Error al guardar los cambios: ' + request.status);
        }
    };

    // Maneja cualquier error de red
    request.onerror = function() {
        alert('Error de red al intentar guardar los cambios.');
    };
}


function deleteUsuario(idUsuario) {
    let request = sendRequest('usuario/' + idUsuario, 'DELETE', '')
    request.onload = function() {
        alert('Registro eliminado exitosamente')
        window.location = 'menu.html';
    }
    request.onerror = function() {
        alert('Error al elminar el registro.')
    }
}


function loadData() {
    let request = sendRequest('list/usuario', 'GET', '');
    let table = document.getElementById('usuario-table');
    table.innerHTML = "";
    request.onload = function() {
        let data = request.response;
        data.forEach((element, index) => {
            table.innerHTML += `
            <tr>
                <th>${element.idUsuario}</th>
                <td>${element.nombre}</th>
                <td>${element.email}</th>
                <td>${element.fechaCreacion}</th>
                <td> 
                    <button class="btn btn-warning btn-sm" onclick="loadUsuario(${element.idUsuario})" data-toggle="modal" data-target="#editarUsuarioModal">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUsuario(${element.idUsuario})">Eliminar</button>
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

//funcion para mostrar los datos de un Usuario
function loadUsuario(idUsuario) {
    // Realiza la solicitud con `sendRequest` usando el método `GET`
    let request = sendRequest('list/usuario/' + idUsuario, 'GET', '');

    // Espera a que la respuesta esté lista
    request.onload = function() {
        if (request.status === 200) { // Comprueba si la respuesta fue exitosa
            const data = request.response;
            // Actualiza los campos del modal con los datos del usuario
            document.getElementById('idUsuarioEditar').value = data.idUsuario;
            document.getElementById('nombreEditar').value = data.nombre;
            document.getElementById('contraseñaEditar').value = data.contraseña
            document.getElementById('emailEditar').value = data.email;

            // Abre el modal después de cargar los datos
            $('#editarUsuarioModal').modal('show');
        } else {
            alert("Error al recuperar los datos: " + request.status);
        }
    };

    // Manejo de errores de red
    request.onerror = function() {
        alert("Error de red al recuperar los datos.");
    };
}

// Llama a `loadUsuario` cuando se cargue el DOM y hay un `idUsuario` en la URL
document.addEventListener('DOMContentLoaded', function() {
    const urlParam = new URLSearchParams(window.location.search);
    const idUsuario = urlParam.get('idUsuario');
    if (idUsuario) {
        loadUsuario(idUsuario);
    }
});


document.addEventListener('DOMContentLoaded', loadData);

$('#nuevoUsuarioModal').on('show.bs.modal', function() {});

document.getElementById('editarUsuarioForm').onsubmit = function(event) {
    event.preventDefault(); // Evita el envío predeterminado
    updateUsuario(); // Llama a la función de actualización
};

//funcion para actualizar los datos
function updateUsuario() {
    // Obtiene los valores de los campos del modal de edición
    let id = document.getElementById('idUsuarioEditar').value;
    let nombre = document.getElementById('nombreEditar').value;
    let contraseña = document.getElementById('contraseñaEditar').value;
    let email = document.getElementById('emailEditar').value;

    // Construye el objeto de datos a enviar
    let data = {
        "idUsuario": id,
        "nombre": nombre,
        "password": contraseña,
        "email": email
    };

    // Define la URL de la API para la actualización
    let url = `usuario/actualizar`;

    // Envía la solicitud usando `sendRequest`
    let request = sendRequest(url, 'PUT', data);

    // Maneja la respuesta
    request.onload = function() {
        if (request.status === 200) {
            alert('Usuario actualizado con éxito.');
            $('#editarUsuarioModal').modal('hide'); // Cierra el modal
            loadData(); // Llama a la función que recarga la lista de usuarios
        } else {
            alert('Error al actualizar el usuario: ' + request.status);
        }
    };

    // Manejo de errores de red
    request.onerror = function() {
        alert('Error de red al intentar actualizar los datos.');
    };
}