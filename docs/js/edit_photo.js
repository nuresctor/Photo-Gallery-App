/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photoRender} from "/js/renderers/photos.js";
import {photosAPI} from "/js/api/photos.js";
import {wordValidator} from "/js/validators/words.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
/* ---------------------------------- FUNCIONES AUXILIARES ---------------------------------------------- */

/*FUNCIONES PARA OCULTAR COSAS DE LA CABECERA*/

function showUser() {

    let title = document.getElementById("navbar-title") ;
    //console.log(title);
    let text;

    if ( sessionManager.isLogged() ) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi, @" + username;
    } else {
        text = "Anonymous";
    }
    
    title.textContent = text;
    
}

function addLogoutHandler() {

    let logoutButton = document.getElementById(" navbar-logout ") ;

    logoutButton.addEventListener("click", function () {
        sessionManager.logout() ;
        window.location.href = "index.html";
    }) ;

}

function hideHeaderOptions() {

    let headerRegister = document.getElementById(" navbar-register ") ;
    let headerLogin = document.getElementById(" navbar-login ") ;
    let headerLogout = document.getElementById(" navbar-logout ") ;
    let headerRecent = document.getElementById(" navbar-recent ") ;
    let headerCreate = document.getElementById(" navbar-create ") ;
    
    if ( sessionManager.isLogged() ) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
    }

}

/*FUNCION DESTINADA A GESTIONAR EL ENVIO DEL FORMULARIO DE CREACIÓN DE FOTOS

    En esta función, crearemos un objeto FormData a partir del formulario que está siendo
enviado, y usaremos el módulo de API para enviarlo mediante una petición POST. Si la petición tiene éxito, redirigiremos al usuario de nuevo a la página principal para que pueda ver la
nueva foto creada. Si hay algún fallo, mostraremos el mensaje

*/

function handleSubmitPhoto(event) {

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    if ( currentPhoto === null ) { // SI LA FOTO NO EXISTE

        // Add the current user 's ID
        
        formData.append("userId", sessionManager.getLoggedId()) ;

        //antes de crear quiero que pase la validacion de las palabras

        /*MENSAJES DE ERROR EN PANTALLA - Pone una cadena inicial vacia en la cabecera de register.html que para cada error, se va sustituyendo */
            
            let errors = wordValidator.validateRegister(formData);

            if(errors.length > 0) {

                console.log("Viendo como coge el valor del selector");
                let tempo=document.getElementById("input-visibility");
                //TEMPO.VALUE es lo que me guarda el public/private
                console.log(tempo.value);

                console.log(errors);
                let errorsDiv = document.getElementById("errors"); 
                errorsDiv.innerHTML = "";
                //para cada error, renderizalo
                for(let error of errors) {
                    messageRenderer.showErrorMessage(error);
                }
            }  else{

                alert(" Foto creada !") ;

                //creacion de foto-la añade al back

                photosAPI.create( formData )
                    .then( data => window.location.href = "index.html")
                    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

    }

        } else { //Si la foto existe, se edita

            //antes quiero que pase el validator por si se edita el titulo o la descripcion
            
            formData.append("userId", sessionManager.getLoggedId()) ;

            if (sessionManager.isLogged()){

            }

            formData.append(" userId ", currentPhoto.userId ) ;
            formData.append(" date ", currentPhoto.date ) ;

            //antes de crear quiero que pase la validacion de las palabras

        /*MENSAJES DE ERROR EN PANTALLA - Pone una cadena inicial vacia en la cabecera de register.html que para cada error, se va sustituyendo */

        let errors = wordValidator.validateRegister(formData);
            console.log("ERRORES="+errors);
        if(errors.length > 0) {

            //console.log(errors);
            let errorsDiv = document.getElementById("errors"); 
            errorsDiv.innerHTML = "";
            //para cada error, renderizalo
            for(let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }  else{

            alert(" Foto editada !") ;

            //creacion de foto-la añade al back

            photosAPI.update(photoId,formData)
                .then( data => window.location.href = "index.html")
                .catch( error => messageRenderer.showErrorAsAlert( error ) ) ;
            }

            
        }

}

/*
                                        FUNCION DESTINADA A 

Modificar el título de la página para que sea “Editando una foto” en lugar de “Creando
una nueva foto”.

Consultar la foto con el ID recibido a la API.

Almacenar la foto en la variable currentPhoto.

Editar los campos del formulario para establecer sus valores iniciales a aquellos que
tenga la foto que estamos editando.

*/

function loadCurrentPhoto() {

    let pageTitle = document.getElementById("page-title") ;
    let urlInput = document.getElementById("input-url") ;
    let titleInput = document.getElementById("input-title") ;
    let descriptionInput = document.getElementById("input-description") ;
    let visibilityInput = document.getElementById("input-visibility");

    pageTitle.textContent = " Editing a photo ";

    photosAPI.getById( photoId )
        .then( photos => {
        currentPhoto = photos[0];
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
        })
        .catch( error => messageRenderer.showErrorMessage( error ) ) ;
}

/* CODIGO PARA VER POR CONSOLA EL ID DE LA FOTO
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let photoId = urlParams.get("photoId") ;
let currentPhoto=null; //almacena los atributos de la foto que estamos editando

function main() {

    showUser();
    addLogoutHandler();
    hideHeaderOptions();

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

    if (photoId!==null ) { 
        loadCurrentPhoto();
    }

}

document.addEventListener("DOMContentLoaded", main ) ;
