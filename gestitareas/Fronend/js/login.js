function validarLogin() {
    var nombreUsuario = document.getElementById('icon_user').value;
    var password = document.getElementById('icon_pass').value;

    console.log(nombreUsuario);
    console.log(password);

    let data = { 'nombreUsuario': nombreUsuario, 'password': password };
    console.log(data);

    let request = sendRequest('logincliente', 'POST', data);
    request.onload = function() {
        let datal = request.response;
        console.log(datal);

        if (datal > 1) {
            alert("Login Correcto");

            // Guardar el valor de datal en localStorage
            localStorage.setItem('userId', datal); // Puedes cambiar 'userId' por cualquier nombre que prefieras

            if (nombreUsuario === 'admin') {
                window.location = 'usuarios.html';
            } else {
                // Redireccionar a menu.html
                window.location = 'menu.html'
            }
        } else {
            alert('Alerta: Usuario o Password incorrectos');
        }
    };

    request.onerror = function() {
        alert("Error al recuperar los datos.");
    };
}