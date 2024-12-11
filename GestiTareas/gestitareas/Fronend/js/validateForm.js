// Verificar si el formulario es válido para habilitar el botón
function validateForm() {
    const form = document.getElementById('form-usuario');
    const saveBtn = document.getElementById('save-btn');

    // Habilitar o deshabilitar el botón basado en la validez del formulario
    if (form.checkValidity()) {
        saveBtn.disabled = false; // Habilita el botón si el formulario es válido
    } else {
        saveBtn.disabled = true;  // Deshabilita el botón si no lo es
    }
}

// Ejecutar la validación en cada cambio de campo
document.querySelectorAll('#form-usuario input').forEach(input => {
    input.addEventListener('input', validateForm);
});


