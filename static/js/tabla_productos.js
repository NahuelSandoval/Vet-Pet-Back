const { createApp } = Vue;

createApp({
    data() {
        return {
            url: "http://127.0.0.1:5000/productos", // Retorna todos los registros de la tabla productos
            productos: [],
            error: false,
            cargando: true,
            productIdToDelete: null
        };
    },
    created() {
        console.log("Componente creado");
        this.fetchData(this.url);
    },
    methods: {
        fetchData(url) {
            console.log("Llamada a fetchData");
            this.productos = []; // Reinicializa la lista de productos
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Datos recibidos:", data);
                    this.productos = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error("Error al cargar los datos:", err);
                    this.error = true;
                });
        },
        showDeleteConfirmation(id) {
            this.productIdToDelete = id;
            openPopup(false, "Eliminar producto", "¿Desea eliminar este producto?", ["No", "Si"]);
        },
        confirmDelete() {
            if (this.productIdToDelete !== null) {
                this.eliminar(this.productIdToDelete);
                this.productIdToDelete = null;
            }
        },
        eliminar(id) {
            const url = 'http://localhost:5000/borrar/' + id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text())
                .then(res => {
                    this.fetchData(this.url); // Actualizar la lista de productos
                    openPopup(true, "", "El producto ha sido eliminado", ["Cerrar"]);
                })
                .catch(err => {
                    console.error("Error al eliminar el producto:", err);
                    openPopup(false, "Error al eliminar", "Hubo un problema al intentar eliminar el producto.", ["Cerrar"]);
                });
        },
        closePopup() {
            document.getElementById("popup").classList.remove("open-popup");
        }
    }
}).mount('#app');

function openPopup(success, title, message, buttons) {
    let popup = document.getElementById("popup");
    let popupImg = document.getElementById("popup-img");
    let popupTitle = popup.querySelector(".popup-title");
    let popupMessage = popup.querySelector(".popup-message");

    popupImg.src = success ? "http://24169codogrupo2vetpet.pythonanywhere.com/static/img/checkmark.png" : "http://24169codogrupo2vetpet.pythonanywhere.com/static/img/crossmark.png";
    popupTitle.textContent = title;
    popupMessage.textContent = message;

    popup.classList.add("open-popup");

    document.getElementById("btnPopupNo").style.display = buttons.includes("No") ? "inline-block" : "none";
    document.getElementById("btnPopupSi").style.display = buttons.includes("Si") ? "inline-block" : "none";
    document.getElementById("btnPopupCerrar").style.display = buttons.includes("Cerrar") ? "inline-block" : "none";
}