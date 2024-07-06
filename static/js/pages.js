document.addEventListener("DOMContentLoaded", function() {
    // Hacer una petición para obtener las URLs desde Flask
    
    fetch('/urls')
        .then(response => response.json())
        .then(urls => {
            // Ahora se puede usar las URLs en js
            
            const urlHome = urls.home;
            const urlNosotros = urls.nosotros;
            const urlContacto = urls.contacto;

            /* PAGINA HOME */
            fetch(urlHome)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('home').innerHTML = data;
                });

            /* PAGINA NOSOTROS */
            fetch(urlNosotros)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('nosotros').innerHTML = data;
                });

            /* PAGINA CONTACTO */
            fetch(urlContacto)
                .then(response => response.text())
                .then(data => {
                    document.getElementById('contacto').innerHTML = data;
                    formValidation();
                });

            // Otras acciones con otras URLs...
        });
});