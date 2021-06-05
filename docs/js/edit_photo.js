/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photoRender} from "/js/renderers/photos.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
/* ---------------------------------- FUNCIONES AUXILIARES ---------------------------------------------- */

/*FUNCIONES PARA OCULTAR COSAS DE LA CABECERA*/

function showUser() {

    let title = document.getElementById("navbar-title") ;
    console.log(title);
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
    
    console.log("HOLA");

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

    if ( currentPhoto === null ) { // Creating a new photo

        // Add the current user 's ID
        console.log("estoy por aqui"+sessionManager.getLoggedId());
        formData.append("userId", sessionManager.getLoggedId()) ;

        photosAPI.create( formData )
            .then( data => window.location.href = "index.html")
            .catch( error => messageRenderer.showErrorMessage( error ) ) ;

        } else { // Updating an existing photo

            formData.append(" userId ", currentPhoto.userId ) ;
            formData.append(" date ", currentPhoto.date ) ;

            photosAPI.update(photoId,formData)
                .then( data => window.location.href = "index.html")
                .catch( error => messageRenderer.showErrorAsAlert( error ) ) ;
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

    console.log(pageTitle);
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
console.log(photoId);
let currentPhoto=null; //almacena los atributos de la foto que estamos editando

function main() {

    showUser();
    addLogoutHandler();
    hideHeaderOptions();

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

    console.log("hola");

    if (photoId!==null ) { 
        loadCurrentPhoto();
    }

}

document.addEventListener("DOMContentLoaded", main ) ;
