/*
Los objetos FormData son utilizados para capturar un formulario HTML y enviarlo utilizando fetch u otro método de red, que aceptan un objeto FormData como cuerpo

Podemos usar los métodos formData.get() para acceder a los campos introducidos por el
usuario. Este método recibe el atributo name del input

Para plasmar estos errores, existe un renderizador incluído por defecto en el proyecto, en
el archivo js/renderers/messages.js. Este renderizador permite mostrar mensajes de información, error o éxito, que aparecerán automáticamente en cualquier <div> con id=errors
que haya en la página

RESUMEN: código para validar un formulario se suele encapsular
en una función, que accede a los campos relevantes para realizar una serie de comprobaciones, y genera una serie de errores que deben ser mostrados al usuario para su subsanación.
*/

/* ---------------------------------- CABECERA ---------------------------------------------- */
" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

function main () {

    let registerForm = document.getElementById("register-form") ;
    registerForm.onsubmit = handleSubmitRegister;

    }

function handleSubmitRegister(event) {

    let form = event.target;
    let formData = new FormData(form);

    let errors = [];

    /*VARIABLES FORMDATA INPUTS FORM */
    let firstName = formData.get("firstName");
    let lastName = formData.get("lastName");
    let password = formData.ge("password");
    let password2 = formData.get("password2");

    console.log(formData.get("firstName"));


    /*COMPROBACIONES DE ATRIBUTOS */
    if(firstName.length < 3 || lastName.length < 3) {
        errors.push("The first and last name should have more than 3 characters ");
    }

    if(password !== password2) {
        errors.push("The passwords must match ");
    }

    /*MENSAJES DE ERROR EN PANTALLA - Pone una cadena inicial vacia en la cabecera de register.html que para cada error, se va sustituyendo */
    if(errors.length > 0) {
        console.log(errors);
        let errorsDiv = document.getElementById("errors"); 
        errorsDiv.innerHTML = "";
        //para cada error, renderizalo
        for(let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }   

    alert(" Form sent !") ;

}

document.addEventListener("DOMContentLoaded", main);