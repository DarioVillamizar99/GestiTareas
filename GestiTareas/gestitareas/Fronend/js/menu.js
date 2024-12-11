// Al cargar la página del menú, recuperamos el valor de 'userId' desde localStorage
window.onload = function() {
    let userId = localStorage.getItem('userId'); // Recupera el valor que guardamos en login.js

    if (userId) {
        console.log('User ID:', userId); // Imprime el valor en consola
    } else {
        console.log('No user ID found');
    }
};