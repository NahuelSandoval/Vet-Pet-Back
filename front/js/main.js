/* CAMBIAR DE CLASE DE ICONOS CUANDO SE HACE SCROLL */

const sections = document.querySelectorAll("section[id]")

function scrollActive(){
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link")
        }else{
            document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link")
        }
    })
}
window.addEventListener("scroll", scrollActive)

/* CAMBIAR EL FONDO DEL HEADER */

function scrollHeader(){
    const header = document.getElementById("header")
    /* CUANDO EL SCROLL ES MAYOR A 80VH AGREGAR LA CLASE SCROLL-HEADER A LA ETIQUETA HEADER */
    if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

