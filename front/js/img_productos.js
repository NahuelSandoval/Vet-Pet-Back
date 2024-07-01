

/* Array para las imagenes de los productos*/

let app = {
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
                <h3 class="producto-titulo"> ${producto.nombre}</h3>
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



// Función para capitalizar la primera letra de cada palabra
function capitalize(str) {
  return str.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

// Función para traducir categorías específicas, ESTO SE APLICO PARA CASOS COMO ESTE articulos_varios A Artículos varios

function translateCategory(category) {
  switch(category) {
      case 'articulos_varios':
          return 'Artículos varios';
      default:
          return capitalize(category);
  }
}

//CODIGO  AJUSTADO PARA  QUE TOME DE FORMA  CORRECTA A LOS TITULOS DE LOS PRODUCTOS
botonesCategorias.forEach(boton => {
boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
        const productosBoton = app.productosArray.filter(producto => producto.categoria === e.currentTarget.id);

        // Aquí usamos la categoría del primer producto filtrado para establecer el título
        if (productosBoton.length > 0) {
            tituloPrincipal.innerText = translateCategory(productosBoton[0].categoria);
        } else {
            tituloPrincipal.innerText = "Categoría vacía";
        }

        cargarProductos(productosBoton);
    } else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(app.productosArray);
    }
});
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
//-------------ESTO ES NUEVO, SI NO HAY STOCK SALTA UN POPUP AVISANDO QUE NO HAY STOCK--------------------------------------------
    if (!productosAgregadosCarrito) {
      openPopup(false, "Producto desconocido", `El producto con ID'${idBotonCarrito}' no se encontro.`)
      return;
    }

  // Verificar si hay suficiente stock
    if (productosAgregadosCarrito.stock <= 0) {
      openPopup(false, "Producto agotado", `El producto '${productosAgregadosCarrito.nombre}' está agotado.`)
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




//FUNCION DE POPUP(modificada para ecomerce)

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