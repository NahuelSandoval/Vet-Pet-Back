/* PAGINA CONTACTO */

document.addEventListener("DOMContentLoaded", function() {
    fetch('./templates/contacto.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contacto').innerHTML = data;

        //Llamo a la función de validar formulario que esta en el otro archivo js
        //Tengo que incluir el script en el index también
        formValidation()
    });

});

/* PAGINA NOSOTROS */

document.addEventListener("DOMContentLoaded", function() {
    fetch('./templates/nosotros.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nosotros').innerHTML = data;
    });

});

/* PAGINA HOME */

document.addEventListener("DOMContentLoaded", function() {
    fetch('./templates/home.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('home').innerHTML = data;
    });
});
