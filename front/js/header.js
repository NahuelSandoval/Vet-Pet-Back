
//Contenido del encabezado

let headerContent = `<header class="header" id="header">
        <nav class="nav container">
            <a href="#" class="nav__logo">Vet-Pet</a>

            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">

                    <li class="nav__item">
                        <a href="../index.html#home" class="nav__link">
                            <i class='bx bx-home nav__icon'></i>
                            <span class="nav__name">Home</span>
                        </a>
                    </li>

                    <li class="nav__item">
                        <a href="../index.html#contacto" class="nav__link">
                            <i class='bx bx-envelope nav__icon'></i>
                            <span class="nav__name">Contacto</span>
                        </a>
                    </li>

                    <li class="nav__item">
                        <a href="./index_producto_y_servicio.html" class="nav__link">
                            <i class="bx bx-cart nav__icon"></i>
                            <span class="nav__name">Productos</span>
                        </a>
                    </li>
                    <li class="nav__item">
                        <a href="./servicios2.html" class="nav__link">
                            <i class='bx bxl-baidu nav__icon'></i>
                            <span class="nav__name">Servicios</span>
                        </a>
                    </li>

                    <li class="nav__item">
                        <a href="./tabla_productos.html" class="nav__link">
                            <i class='bx bx-edit nav__icon'></i>
                            <span class="nav__name">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </div>
            <img src="../img/pet-house.png" alt="" class="nav__img">
        </nav>
    </header>`;

//se agrega el contenido del encabezado al principio del body

document.body.insertAdjacentHTML(`afterbegin`, headerContent);