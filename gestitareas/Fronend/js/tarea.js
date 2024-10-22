const apiUrl = 'http://localhost:8094/api/tareas'; // Cambia esto a la URL de tu API si es necesario

document.addEventListener('DOMContentLoaded', () => {
    let userId = localStorage.getItem('userId'); // Recupera el valor guardado en menu.js
    if (userId) {
        console.log('User ID from localStorage:', userId); // Imprime el valor en consola
        loadTareas(userId); // Cargar tareas al iniciar
    } else {
        console.error('No user ID found in localStorage');
    }
});

document.getElementById('tareaForm').addEventListener('submit', async(event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    let userId = localStorage.getItem('userId'); // Recupera el userId antes de enviar la nueva tarea
    console.log('User ID before submitting new task:', userId); // Imprimir userId en consola

    const fechaCreacion = new Date().toLocaleDateString('en-US');

    const nuevaTarea = {
        idUsuario: userId,
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        fechaCreacion: fechaCreacion,
        fechaLimite: document.getElementById('fechaLimite').value,
        prioridad: document.getElementById('prioridad').value,
        estado: 'Pendiente',
        categoria: document.getElementById('categoria').value,
    };

    try {
        const idTarea = document.getElementById('idTarea').value; // Obtener el ID de la tarea

        if (idTarea) { // Si hay un ID, es una actualización
            const response = await fetch(`${apiUrl}/${idTarea}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaTarea),
            });

            if (response.ok) {
                clearForm(); // Limpiar el formulario
                $('#tareaModal').modal('hide'); // Cerrar el modal
                loadTareas(userId); // Cargar las tareas después de editar
            } else {
                console.error('Error al actualizar tarea:', response.statusText);
            }
        } else { // Si no hay ID, es una creación
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaTarea),
            });

            if (response.ok) {
                clearForm(); // Limpiar el formulario
                $('#tareaModal').modal('hide'); // Cerrar el modal
                loadTareas(userId); // Cargar las tareas después de crear una nueva
            } else {
                console.error('Error al crear tarea:', response.statusText);
            }
        }
    } catch (error) {
        console.error('Error al enviar tarea:', error);
    }
});

async function loadTareas(userId) {
    try {
        const response = await fetch(apiUrl);
        const tareas = await response.json();
        const tbody = document.getElementById('tarea-body');
        tbody.innerHTML = ''; // Limpiar el contenido actual

        tareas.forEach(tarea => {
            if (tarea.idUsuario == userId) { // Filtrar las tareas del usuario actual
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
                        <button class="btn btn-warning" onclick="editTarea(${tarea.idTarea})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteTarea(${tarea.idTarea})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error al cargar tareas:', error);
    }
}

// Función para cargar los datos de la tarea a editar
async function editTarea(idTarea) {
    try {
        const response = await fetch(`${apiUrl}/${idTarea}`);
        const tarea = await response.json();

        // Llenar los campos del formulario con la información de la tarea
        document.getElementById('idTarea').value = tarea.idTarea; // Establecer ID de tarea
        document.getElementById('titulo').value = tarea.titulo;
        document.getElementById('descripcion').value = tarea.descripcion;
        document.getElementById('fechaLimite').value = tarea.fechaLimite;
        document.getElementById('prioridad').value = tarea.prioridad;
        document.getElementById('categoria').value = tarea.categoria;

        // Cambiar el título del modal
        document.getElementById('tareaModalLabel').innerText = 'Editar Tarea';
        $('#tareaModal').modal('show'); // Mostrar el modal
    } catch (error) {
        console.error('Error al cargar tarea para editar:', error);
    }
}

// Función para eliminar una tarea
async function deleteTarea(idTarea) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (confirmDelete) {
        try {
            const response = await fetch(`${apiUrl}/${idTarea}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                let userId = localStorage.getItem('userId');
                loadTareas(userId); // Recargar la lista de tareas después de eliminar
            } else {
                console.error('Error al eliminar tarea:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('idTarea').value = ''; // Limpiar el campo ID de tarea
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('fechaLimite').value = '';
    document.getElementById('prioridad').value = 'Alta'; // Valor por defecto
    document.getElementById('categoria').value = ''; // Valor por defecto
    document.getElementById('tareaModalLabel').innerText = 'Nueva Tarea'; // Reiniciar el título del modal
}