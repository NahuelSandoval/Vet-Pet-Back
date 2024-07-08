function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value //input
    let precio_ingresado = document.getElementById("precio").value 
    let stock_ingresado = document.getElementById("stock").value 
    let imagen_ingresada = document.getElementById("imagen").value 
    let categoria_ingresada = document.getElementById("categoria").value 


    console.log(nombre_ingresado,precio_ingresado,stock_ingresado,imagen_ingresada,categoria_ingresada);
    // Se arma el objeto de js 
    let datos = {
        nombre: nombre_ingresado,
        precio:precio_ingresado,
        stock:stock_ingresado,
        imagen:imagen_ingresada,
        categoria:categoria_ingresada
    }
    console.log(datos);
    
    let url = "http://localhost:5000/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            openPopup(true, "Producto creado", "Se creo un nuevo producto con éxito")    
            
        })
        .catch(err => {
            //this.errored = true
            openPopup(false, "Error al crear", "Intente mas tarde")
            console.error(err);
        })
}

//FUNCION DE POPUP DE INGRESAR PRODUCTO.(IGUAL QUE EL EDITAR)

/* function openPopup(success, title, message){
    let popup = document.getElementById("popup");
    let popupImg = document.getElementById("popup-img");
    let popupTitle = popup.querySelector(".popup-title");
    let popupMessage = popup.querySelector(".popup-message");
    //si se edita aparece la ruta de la imagen checkmark
    if (success) {
        popupImg.src = "../img/checkmark.png"
    //si es false aparece la ruta de la imagen crossmark
    } else {
        popupImg.src = "../img/crossmark.png"
    }
    //aca defino los parametros y les agrego contenido
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    popup.classList.add("open-popup");
    //cuando se valida el form, abre el popup

    let boton = document.getElementById("btnPopup");
    boton.addEventListener("click", function() {
        popup.classList.remove("open-popup");
    //cuando se aprieta el aceptar cierra el popup
        window.location.href = "../templates/tabla_productos.html";
    //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
    })  
}; */


function openPopup(success, title, message){
    let popup = document.getElementById("popup");
    let popupImg = document.getElementById("popup-img");
    let popupTitle = popup.querySelector(".popup-title");
    let popupMessage = popup.querySelector(".popup-message");
    
    if (success) {
        popupImg.src = "http://24169codogrupo2vetpet.pythonanywhere.com/static/img/checkmark.png";
    } else {
        popupImg.src = "http://24169codogrupo2vetpet.pythonanywhere.com/static/img/crossmark.png";
    }
    
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    popup.classList.add("open-popup");

    // Hacer fetch para obtener la URL de tabla_productos
    fetch('/urls')
        .then(response => response.json())
        .then(urls => {
            const urlTablaProductos = urls.tabla_productos;

            // Agregar el event listener al botón
            let boton = document.getElementById("btnPopup");
            boton.addEventListener("click", function() {
                // Cerrar el popup
                popup.classList.remove("open-popup");
                
                // Redirigir a la URL obtenida
                window.location.href = urlTablaProductos;
            });
        })
        .catch(error => console.error('Error fetching URLs:', error));
}

document.addEventListener("DOMContentLoaded", function() {
    
});