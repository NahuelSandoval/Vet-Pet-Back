/**declaro las variables */

let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito =JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorcarritoCamprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector(".carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar= document.querySelector("#carrito-acciones-comprar");

/*console.log(productosEnCarrito );*/

/**Creo la siguiente función */

function cargarProductosCarritos() {

    /** en el paso siguiente no hace falta hacer la validación */
    if (productosEnCarrito && productosEnCarrito.length > 0 ) {
        /*productosEnCarrito =JSON.parse(productosEnCarrito);*/

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorcarritoCamprado.classList.add("disabled");


        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div"); /**es para agregar el div que estaba en el html carrito */

            div.classList.add("carrito-producto");

            div.innerHTML = `
                            <img class="carrito-producto-imagen" src=" ${producto.imagen}" alt="${producto.titulo}">

                            <div class="carrito-producto-titulo">
                                <small>Título</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>$ ${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>$ ${producto.precio * producto.cantidad}</p>
                            </div>

                            <!--Agrego botón para eliminar producto-->
                            <button class="carrito-producto-eliminar" id="${producto.id}"><span class="material-symbols-outlined">
                                    delete
                                </span></button>
                            
                    `;
            contenedorCarritoProductos.append(div);



        })


    } else {

        /** esto es para los casos cuando el carrito este vacío */
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorcarritoCamprado.classList.add("disabled");


    }
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarritos();


/**Función para eliminar los productos al carrito */

function actualizarBotonesEliminar() {

    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {

        boton.addEventListener("click", eliminarDelCarrito);


    }
    )

}

function eliminarDelCarrito(e){

    const idBotonCarrito = e.currentTarget.id;
    /*console.log(idBotonCarrito);*/

    console.log(productosEnCarrito);
    const index = productosEnCarrito.findIndex(producto => producto.id === idBotonCarrito);
    productosEnCarrito.splice(index, 1);

    cargarProductosCarritos();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

/**agrego un nuevo evento*/

botonVaciar.addEventListener("click", vaciarCarrito);

/** Función para vaciar el carrito 🧺 */
function vaciarCarrito(){

    productosEnCarrito.length =0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarritos();
}

/** Fución para actualizar el total */

function actualizarTotal(){

    /**declaración de variable */
    const totalCalculado= productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    /**acc = acumulador */
    total.innerText= `$${totalCalculado}`;
    
}

/**función comprar */

/**agrego un nuevo evento*/

botonComprar.addEventListener("click", comprarCarrito);

/** Función para vaciar el carrito 🧺 */
function comprarCarrito(){

    productosEnCarrito.length =0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    /** esto es para los casos cuando el carrito este vacío */
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorcarritoCamprado.classList.remove("disabled");

}
