const { createApp } = Vue

  createApp({
    data() {
      return {
        url:"http://127.0.0.1:5000/productos", // Retorna todos los registro de la tabla productos
        productos:[],
        error:false,
        cargando:true
      }
    },
    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
    created() {
        this.fetchData(this.url)  // Invocando al método
    },
    methods: {
        fetchData(url) {
            // Acá se consume la Api  /productos
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                });
        },
        // el id se necesita para buscar en la DB y eliminarlo
        eliminar(id) {
            
            const url = 'http://localhost:5000/borrar/'+id;
            var options = {
                method: 'DELETE',
                
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    openPopup(true, "Eliminado correctamente", "El producto a sido eliminado");
                    /* alert("Eliminado correctamente")  */
                    location.reload();
                })
                .catch(err => {
                    console.error(err);
                    // Mostrar el popup con error si falla la eliminación
                    openPopup(false, "Error al eliminar", "Hubo un problema al intentar eliminar el producto.");
                });
        }


    },
    



  }).mount('#app')


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
    })  
};