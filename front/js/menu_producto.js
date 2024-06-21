const openMenu = document.querySelector("#open-menu-productos");
const closeMenu = document.querySelector("#close-menu-productos");
const aside = document.querySelector("aside");
/*const aside_carrito  = document.querySelector("aside_carrito ");*/

openMenu.addEventListener("click", () =>{

    aside.classList.add("aside-visible");

})

closeMenu.addEventListener("click", () =>{

    aside.classList.remove("aside-visible");

})

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {

    aside.classList.remove("aside-visible");

}))


