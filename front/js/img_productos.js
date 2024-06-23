
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

const productosArra = [


    /**Categoría alimentos**/
    {
        id: "alimento-01",
        titulo: "Alimento 01",
        imagen: "../static/img/Alimentos/alimento.jpg",
        categoria: {

            nombre: "Alimentos",
            id: "alimentos"
        },

        precio: 42000,
        
    },

    {
        id: "alimento-02",
        titulo: "Alimento 02",
        imagen: "../static/img/Alimentos/images3.jpg",
        categoria: {

            nombre: "Alimentos",
            id: "alimentos"
        },

        precio: 55000

    },
    {
        id: "alimento-03",
        titulo: "Alimento 03",
        imagen: "../static/img/Alimentos/images4.jpg",
        categoria: {

            nombre: "Alimentos",
            id: "alimentos"
        },

        precio: 37500

    },
    {
        id: "alimento-04",
        titulo: "Alimento 04",
        imagen: "../static/img/Alimentos/Sin título3.jpg",
        categoria: {

            nombre: "Alimentos",
            id: "alimentos"
        },

        precio: 48500

    },


    /**Categoría laboratorio**/

    {
        id: "laboratorio-01",
        titulo: "Laboratorio 01",
        imagen: "../static/img/Laboratorio/images.jpg",
        categoria: {

            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 12000

    },

    {
        id: "laboratorio-02",
        titulo: "Laboratorio 02",
        imagen: "../static/img/Laboratorio/images5.jpg",
        categoria: {

            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 7800

    },
    {
        id: "laboratorio-03",
        titulo: "Laboratorio 03",
        imagen: "../static/img/Laboratorio/images6.jpg",
        categoria: {

            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 9000

    },
    {
        id: "laboratorio-04",
        titulo: "Laboratorio 04",
        imagen: "../static/img/Laboratorio/images8.jpg",
        categoria: {

            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 12500

    },
    {
        id: "laboratorio-05",
        titulo: "Laboratorio 05",
        imagen: "../static/img/Laboratorio/labyes-trihepat_2020ARG_FrascoBlanco.jpg",
        categoria: {

            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 11000

    },

    {
        id: "laboratorio-06",
        titulo: "Laboratorio 06",
        imagen: "../static/img/Laboratorio/pack-azitromicina.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 15000

    },

    {
        id: "laboratorio-07",
        titulo: "Laboratorio 07",
        imagen: "../static/img/Laboratorio/pack-GrupoC72dpi-WEB.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 19000

    },

    {
        id: "laboratorio-08",
        titulo: "Laboratorio 08",
        imagen: "../static/img/Laboratorio/pack-labyderm-skin-soldier.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 19000

    },

    {
        id: "laboratorio-09",
        titulo: "Laboratorio 09",
        imagen: "../static/img/Laboratorio/pack-ocubiotic-se-global.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 19750

    },

    {
        id: "laboratorio-10",
        titulo: "Laboratorio 10",
        imagen: "../static/img/Laboratorio/Sin título.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 17750

    },

    {
        id: "laboratorio-11",
        titulo: "Laboratorio 11",
        imagen: "../static/img/Laboratorio/Sin título2.jpg",

        categoria: {
            nombre: "Laboratorio",
            id: "laboratorio"
        },

        precio: 22750

    },

    /**Categoría articulos varios**/


    {
        id: "articulo-vario-01",
        titulo: "Articulo vario 01",
        imagen: "../static/img/Articulos varios/juego.jpg",

        categoria: {
            nombre: "Artículos varios",
            id: "articulos_varios"
        },

        precio: 37500

    },

    {
        id: "articulo-vario-02",
        titulo: "Articulo vario 02",
        imagen: "../static/img/Articulos varios/kennel.jpg",

        categoria: {
            nombre: "Artículos varios",
            id: "articulos_varios"
        },

        precio: 19500

    },

    {
        id: "articulo-vario-03",
        titulo: "Articulo vario 03",
        imagen: "../static/img/Articulos varios/para paseo.jpg",

        categoria: {
            nombre: "Artículos varios",
            id: "articulos_varios"
        },

        precio: 15600

    },


    {
        id: "articulo-vario-04",
        titulo: "Articulo vario 04",
        imagen: "../static/img/Articulos varios/Peine.jpg",

        categoria: {
            nombre: "Artículos varios",
            id: "articulos_varios"
        },

        precio: 5600

    },
]


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



cargarProductos(app.productosArray);

botonesCategorias.forEach(boton => {

    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        /**Agrego un condicional */
        if (e.currentTarget.id != "todos") {

            /** filtro por categoría ***/
            const productosCategorias = app.productosArray.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productosCategorias.categoria.nombre;

            const productosBoton = app.productosArray.filter(producto => producto.categoria.id === e.currentTarget.id);

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

    const idBotonCarrito = e.currentTarget.id;
    /*console.log(idBotonCarrito);*/

    const productosAgregadosCarrito = app.productosArray.find(producto => producto.id === idBotonCarrito);

   
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
}

/** Función para que se actualice el número del carrito */

function actualizarNumerito(){

    let nuevoNumerito = productosEnCarrito.reduce((contador, producto) => contador+ producto.cantidad, 0); 
    
    numerito.innerText= nuevoNumerito;

    console.log(numerito);
}

