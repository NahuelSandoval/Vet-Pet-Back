function modificar() {
    let id = document.getElementById("id").value
    let nombre_ingresado = document.getElementById("nombre").value
    let precio_ingresado = document.getElementById("precio").value 
    let stock_ingresado = document.getElementById("stock").value 
    let imagen_ingresada = document.getElementById("imagen").value 
    let categoria_ingresada = document.getElementById("categoria").value 


    let datos = {
        nombre: nombre_ingresado,
        precio:precio_ingresado,
        stock:stock_ingresado,
        imagen:imagen_ingresada,
        categoria:categoria_ingresada
    }

    console.log(datos);

    let url = "http://localhost:5000/update/"+id
    var options = {
        body: JSON.stringify(datos),
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json' },
        // el navegador seguirá automáticamente las redirecciones y
        // devolverá el recurso final al que se ha redirigido.
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            openPopup(true, "Producto modificado", "Los cambios se realizaron con éxito")
        
        })
        .catch(err => {
            this.error = true
            console.error(err);
            openPopup(false, "Error al modificar", "Intente mas tarde")
        })   
    
        
        
}

//FUNCION POPUP DE EDITAR

//success puede ser true si se validan los datos y false caso contrario
//asi que los tres parametros los defino en el fetch
function openPopup(success, title, message){
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
        window.location.href = "./tabla_productos.html";
    //Puedes utilizar window.location.href para obtener la URL actual, redirigir a otras páginas
    })  
};