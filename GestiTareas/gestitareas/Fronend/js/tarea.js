const apiUrl = 'http://localhost:8094/api/tareas'; // URL de la API

// Función para obtener y mostrar las tareas
function obtenerTareas() {
    let userId = localStorage.getItem('userId'); // Recupera el ID del usuario desde localStorage
    if (!userId) {
        console.error('No user ID found in localStorage');
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tareaBody = document.getElementById('tarea-body');
            tareaBody.innerHTML = ''; // Limpiar el contenido actual

            data.forEach(tarea => {
                if (tarea.idUsuario == userId) { // Filtrar las tareas por el ID del usuario
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${tarea.idTarea}</td>
                        <td>${tarea.titulo}</td>
                        <td>${tarea.descripcion}</td>
                        <td>${tarea.fechaCreacion}</td>
                        <td>${tarea.fechaLimite}</td>
                        <td>${tarea.prioridad}</td>
                        <td>${tarea.estado}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="cargarTarea(${tarea.idTarea})" data-toggle="modal" data-target="#editarTareaModal">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.idTarea})">Eliminar</button>
                        </td>
                    `;
                    tareaBody.appendChild(row);
                }
            });
        });
}

// Función para crear una nueva tarea
document.getElementById('tareaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId'); // Recuperar el ID del usuario
    const nuevaTarea = {
        titulo: document.getElementById('tituloNueva').value,
        descripcion: document.getElementById('descripcionNueva').value,
        fechaLimite: document.getElementById('fechaLimiteNueva').value,
        prioridad: document.getElementById('prioridadNueva').value,
        fechaCreacion: new Date().toLocaleDateString('en-US'), // Formato MM/DD/AAAA
        estado: 'Pendiente', // Estado por defecto
        categoria: 222, // Asignando categoría por defecto
        idUsuario: userId // Asignar el ID del usuario
    };

    fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaTarea)
        })
        .then(response => response.json())
        .then(() => {
            $('#nuevaTareaModal').modal('hide'); // Ocultar modal
            obtenerTareas(); // Actualizar la lista de tareas
            limpiarFormulario(); // Limpiar el formulario
        });
});

// Función para cargar los datos de la tarea en el modal de edición
function cargarTarea(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(tarea => {
            document.getElementById('idTareaEditar').value = tarea.idTarea;
            document.getElementById('tituloEditar').value = tarea.titulo;
            document.getElementById('descripcionEditar').value = tarea.descripcion;
            document.getElementById('fechaLimiteEditar').value = tarea.fechaLimite;
            document.getElementById('prioridadEditar').value = tarea.prioridad;
            document.getElementById('estadoEditar').value = tarea.estado;
        });
}

// Función para editar una tarea
document.getElementById('editarTareaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const idTarea = document.getElementById('idTareaEditar').value;
    const tareaEditada = {
        idTarea: idTarea,
        idUsuario: document.getElementById('idUsuarioEditar').value, // ID del usuario que se está editando
        titulo: document.getElementById('tituloEditar').value,
        descripcion: document.getElementById('descripcionEditar').value,
        fechaCreacion: new Date().toLocaleDateString('en-US'), // Mantener el formato MM/DD/AAAA
        fechaLimite: document.getElementById('fechaLimiteEditar').value,
        prioridad: document.getElementById('prioridadEditar').value,
        estado: document.getElementById('estadoEditar').value,
        categoria: 222 // Mantener categoría como 222
    };

    fetch(`${apiUrl}/${idTarea}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tareaEditada)
        })
        .then(response => response.json())
        .then(() => {
            $('#editarTareaModal').modal('hide'); // Ocultar modal
            obtenerTareas(); // Actualizar la lista de tareas
        });
});

// Función para eliminar una tarea
function eliminarTarea(id) {
    fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            obtenerTareas(); // Actualizar la lista de tareas
        });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('tituloNueva').value = '';
    document.getElementById('descripcionNueva').value = '';
    document.getElementById('fechaLimiteNueva').value = '';
    document.getElementById('prioridadNueva').value = 'Alta'; // Opción por defecto
}

// Cargar las tareas al inicio
document.addEventListener('DOMContentLoaded', obtenerTareas);

// Al abrir el modal de nueva tarea, limpiar el formulario
$('#nuevaTareaModal').on('show.bs.modal', function() {
    limpiarFormulario(); // Limpiar el formulario al abrir el modal
});