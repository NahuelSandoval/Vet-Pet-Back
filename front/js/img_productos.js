
/* Array para las imagenes de los productos*/

const app = {
    url: "http://127.0.0.1:5000/productos",
    productosArray: [],
  
    init() {
      this.fetchData(this.url);
    },
  
    fetchData(url) {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.productosArray = data; // Almacena los productos obtenidos en el array
          this.renderProductos(); // Llama a la función para renderizar los productos
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        });
    },
  
    renderProductos() {
      // Simplemente imprime los productos en la consola para este ejemplo
      cargarProductos(this.productosArray);
    }
    
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    app.init();
  });



/* Declaración de variables*/

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria"); /****Este es un Array ***/
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar ");
const numerito = document.querySelector("#numerito");


/* Función para cargar productos*/
function cargarProductos(productosCategorias) {

    /**Primero vacío el contenedor de productos */
    contenedorProductos.innerHTML = "";

    /*utilizo función flecha*/
    productosCategorias.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-detalle">
                <h3 class="producto-titulo">${producto.nombre}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <p class="producto-stock"> Stock: ${producto.stock}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>`
            ;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
    console.log(actualizarBotonesAgregar);
}

//--------OTRO CAMBIO, SE LE AGREGA "app." A "productosArray" POR QUE ES UNA VARIABLE LOCAL----------------------------------------------------------------------------------------------
//--------ANTES TOMABA EL ARRAY DE "productosArray" ----------------------------
//--------SE HACE ESTE CAMBIO EN TODOS LOS LUGARES QUE SE LLAMABA AL ARRAY "productosArray"---------------------------------
cargarProductos(app.productosArray);

botonesCategorias.forEach(boton => {

    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        /**Agrego un condicional */
        if (e.currentTarget.id != "todos") {
//--------ESTO SE MODIFICA, "PRODUCTO.CATEGORIA.ID" SE CAMBIA POR "PRODUCTO.CATEGORIA" QUE ES EL UNICO ATRIBUTO QUE DEJO EN LA DB--------------------------------------------------------------------------------------------------
            /** filtro por categoría ***/
            const productosCategorias = app.productosArray.find(producto => producto.categoria === e.currentTarget.id)
            tituloPrincipal.innerText = productosCategorias.categoria;

            const productosBoton = app.productosArray.filter(producto => producto.categoria === e.currentTarget.id);
//-----------------------------------------------------------------------------------------------------------------------

            /* console.log("funcionando")*/

            cargarProductos(productosBoton);

        } else {

            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(app.productosArray);
        }


    })

});

/**Para actualizar los productos al carrito */

function actualizarBotonesAgregar() {

    botonesAgregar = document.querySelectorAll(".producto-agregar ");

    botonesAgregar.forEach(boton => {

        boton.addEventListener("click", agregarAlcarrito);


    }
    )

}

/** variables */

let productosEnCarrito;

/**declaración de variables */
let productosEnCarritoLS= localStorage.getItem("productos-en-carrito");


/**condicional */

if(productosEnCarritoLS){

    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();

}else{

    productosEnCarrito = [];

}

/**Función para agregar al carrito */

function agregarAlcarrito(e) {
//-----------------------ACA SE CAMBIA AGREGANDO EL "paseInt" PARA QUE TOME VALOR NUMERICO, SINO, NO FUNCIONA
    const idBotonCarrito = parseInt(e.currentTarget.id);
    /*console.log(idBotonCarrito);*/

    const productosAgregadosCarrito = app.productosArray.find(producto => producto.id === idBotonCarrito);
//-------------ESTO ES NUEVO, SI NO HAY STOCK SALTA UN ALERT AVISANDO QUE NO HAY STOCK--------------------------------------------
    if (!productosAgregadosCarrito) {
      alert(`Producto con ID ${idBotonCarrito} no encontrado.`);
      return;
    }

  // Verificar si hay suficiente stock
    if (productosAgregadosCarrito.stock <= 0) {
      alert(`El producto "${productosAgregadosCarrito.nombre}" está agotado.`);
      return;
    }
//---------Y CUANDO SE ACTIVA EL EVENTO(e) SE DESCUENTA EN MENOS 1 LA CANTIDAD EN EL STOCK-------------------------------
    productosAgregadosCarrito.stock--;
//---------------------------------------------------------------------------------------------------------------------------------

    /**Agrego un condicional */
    
    if (productosEnCarrito.some(producto => producto.id === idBotonCarrito)) {

      const  index = productosEnCarrito.findIndex(producto => producto.id === idBotonCarrito);
      /*console.log(index);*/
      productosEnCarrito[index].cantidad++;
    } else {

        productosAgregadosCarrito.cantidad = 1;

        productosEnCarrito.push(productosAgregadosCarrito);  /**para cargar al carrito */

    }
    

    actualizarNumerito();

    /*console.log(productosEnCarrito);*/

    /**Para almacenamiento en el localStorage */

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    cargarProductos(app.productosArray);
}

/** Función para que se actualice el número del carrito */

function actualizarNumerito(){

    let nuevoNumerito = productosEnCarrito.reduce((contador, producto) => contador+ producto.cantidad, 0); 
    
    numerito.innerText= nuevoNumerito;

    console.log(numerito);
}

