// Estado del componente
const state = {
    url: "http://127.0.0.1:5000/productos",
    productos: [],
    error: false,
    cargando: true,
    productIdToDelete: null
};

// Función equivalente a created()
function init() {
    console.log("Componente creado");
    fetchData(state.url);
}

// Función para obtener productos desde el servidor
function obtenerProductos() {
    fetch(state.url)
        .then(response => response.json())
        .then(data => {
            state.productos = data;
            state.cargando = false;
            renderizarProductos();
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
            state.error = true;
            renderizarError();
        });
}

function renderizarProductos() {
    const tablaProductos = document.getElementById('tabla-productos');
    tablaProductos.innerHTML = ''; // Limpiar tabla antes de renderizar

    state.productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>
            <td><img src="${producto.imagen}" alt=""></td>
            <td>
                <a class="boton-delete" href="#" onclick="showDeleteConfirmation(${producto.id})"><i class='bx bx-trash'></i></a>
                <a class="boton-edit" href="/editar_producto?id=${producto.id}&nombre=${producto.nombre}&precio=${producto.precio}&stock=${producto.stock}&imagen=${producto.imagen}&categoria=${producto.categoria}"><i class='bx bx-edit'></i></a>
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}


// Función para renderizar mensaje de error
function renderizarError() {
    const errorSection = document.getElementById('error');
    errorSection.textContent = 'Lo sentimos, se produjo un error al cargar los productos.';
}


// Función para mostrar confirmación de eliminación
function showDeleteConfirmation(id) {
    const productoAEliminar = state.productos.find(producto => producto.id === id);
    if (!productoAEliminar) {
        console.error('Producto no encontrado para eliminar.');
        return;
    }

    if (confirm(`¿Desea eliminar el producto "${productoAEliminar.nombre}"?`)) {
        eliminarProducto(id);
    }
}

// Función para confirmar eliminación
function confirmDelete() {
    if (state.productIdToDelete !== null) {
        eliminar(state.productIdToDelete);
        state.productIdToDelete = null;
    }
}

// Función para eliminar producto
function eliminarProducto(id) {
    const urlEliminar = `http://localhost:5000/borrar/${id}`;
    fetch(urlEliminar, { method: 'DELETE' })
        .then(response => response.text())
        .then(data => {
            console.log('Producto eliminado correctamente:', data);
            obtenerProductos(); // Volver a cargar los productos después de eliminar
            mostrarPopup(true, '', 'El producto ha sido eliminado.', ['Cerrar']);
        })
        .catch(error => {
            console.error('Error al eliminar producto:', error);
            mostrarPopup(false, 'Error al eliminar', 'Hubo un problema al intentar eliminar el producto.', ['Cerrar']);
        });
}

// Función para cerrar el popup
function closePopup() {
    document.getElementById("popup").classList.remove("open-popup");
}

// Función para abrir el popup
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

// Función para renderizar los datos
function init() {
    obtenerProductos();
}


// Llamada para inicializar el componente
init();
