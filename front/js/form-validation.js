const formValidation = () => {

    const form = document.querySelector("form");

    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        //No hacer nada si el formulario no esta validado
        if(!validateForm(form)) return;
        //Si el formulario esta validado, submit
        openPopup();
        //Abre el popup cuando se envian los datos
        document.querySelector("form").reset();
        //Resetea el formulario cuando se envia
    });
    
    const validateForm = (form) =>{
        let valid = true;
        //chequea por inputs vacios
        let name = form.querySelector(".name");
        let message = form.querySelector(".message");
        let email = form.querySelector(".email");
        let options = form.querySelector("input[name='options']:checked")
        let select = form.querySelector("#mascotaSelect");
    
        if (name.value === ""){
            giveError(name, "Ingrese su nombre");
            valid = false;
        }
    
        if (message.value === ""){
            giveError(message, "Ingrese su consulta");
            valid = false;
        }

        //chequea que sea un formato valido de email
        let emailReject = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailValue = email.value;
        if(!emailReject.test(emailValue)){
            giveError(email, "Ingrese un email válido")
            valid = false;
        }
        
        if (!options) {
            giveError(form.querySelector("input[name='options']"), "Elija una opción");
            valid = false;
        }

        if (select.value === ""){
            giveError(form.querySelector(".select"), "Elija una opcion");
            valid = false;
        } else
            giveError(form.querySelector(".select"), "");


        //SI ES VALIDO RETORNA TRUE
        if(valid){
            return true;
        }
    }
    
    const giveError = (field, message) => {
        let parentElement = field.parentElement;
        parentElement.classList.add("error");
    
        // Si el error ya existe, removerlo
        let existingError = parentElement.querySelector(".err-msg");
        if(existingError){
            existingError.remove();
        }
    
        let error = document.createElement("error")
        error.textContent = message;
        error.classList.add("err-msg");
        parentElement.appendChild(error);
    }
    
    //Remover error en los inputs
    
    const inputs = document.querySelectorAll("input");
    const textarea = document.querySelectorAll("textarea");
    
    let allfields = [...inputs, ...textarea]
    
    allfields.forEach((field) => {
        field.addEventListener("input", () => {
            removeError(field);
        });
    });
    const removeError = (field) => {
        let parentElement = field.parentElement;
        parentElement.classList.remove("error");
        let error = parentElement.querySelector(".err-msg")
        if(error){
            error.remove();
        }
    }


    /* FUNCIONES PARA ABRIR Y CERRAR POPUP */
    /* SE LLAMAN DESPUES DE LA VALIDACION */


    let popup = document.getElementById("popup");
    function openPopup(){
        popup.classList.add("open-popup");
        //cuando se valida el form, abre el popup
    }
    let boton = document.getElementById("btnPopup");
    boton.addEventListener("click", function() {
        popup.classList.remove("open-popup");
        //cuando se aprieta el acptar cierra el popup
    });
}