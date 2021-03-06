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
import {userValidator} from "/js/validators/users.js";
import {sessionManager} from "/js/utils/session.js";
import {authAPI} from "/js/api/auth.js";
import {cabecera} from "/js/header.js";
/* ---------------------------------- FUNCIONES AUXILIARES  ---------------------------------------------- */

/*FUNCIONES PARA OCULTAR COSAS DE LA CABECERA*/


/*
respuesta tiene dos atributos: “sessionToken”, que
contiene el token de sesión, y “user”, que contiene los datos del usuario. Estos dos parámetros
son los requeridos por el método login() del módulo de gestión de sesiones, explicado en la
Sección 5. Así, podemos guardarlos como variables y usarlos para iniciar sesión
*/

function sendRegister( formData ) {
    authAPI.register( formData )
    .then( loginData => {
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        sessionManager.login( sessionToken , loggedUser ) ;
        window.location.href = "index.html";
        })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;
    }

function handleSubmitRegister(event) {

    event.preventDefault();  //Para que no me refresque solo

    let form = event.target;
    let formData = new FormData(form);

    /*MENSAJES DE ERROR EN PANTALLA - Pone una cadena inicial vacia en la cabecera de register.html que para cada error, se va sustituyendo */

    let errors = userValidator.validateRegister(formData);

    if(errors.length > 0) {
        console.log(errors);
        let errorsDiv = document.getElementById("errors"); 
        errorsDiv.innerHTML = "";
        //para cada error, renderizalo
        for(let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }  else{

        sendRegister(formData) ;
        alert(" Form sent !") ;

    }

}

///////////////////////////////////////// MAIN ////////////////////////////////////////////////////////

function main () {
    
    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

    let registerForm = document.getElementById("register-form") ;
    registerForm.onsubmit = handleSubmitRegister;

    }

document.addEventListener("DOMContentLoaded", main);