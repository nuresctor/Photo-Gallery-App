/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {cabecera} from "/js/header.js";
import {photosAPI} from "/js/api/photos.js";
import {fallosAPI} from "/js/api/fallos.js";
import {photos_usersAPI} from "/js/api/photos_users.js";
import {wordValidator} from "/js/validators/words.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";

/* ---------------------------------- FUNCIONES AUXILIARES ---------------------------------------------- */

/* CODIGO PARA VER POR CONSOLA EL ID DE LA FOTO
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let photoId = urlParams.get("photoId") ;
let userId = sessionManager.getLoggedId() ;
let currentPhoto=null; //almacena los atributos de la foto que estamos editando

function handleSubmitPhoto(event) {

    /*FUNCION DESTINADA A GESTIONAR EL ENVIO DEL FORMULARIO DE CREACIÓN DE FOTOS

    En esta función, crearemos un objeto FormData a partir del formulario que está siendo
enviado, y usaremos el módulo de API para enviarlo mediante una petición POST. Si la petición tiene éxito, redirigiremos al usuario de nuevo a la página principal para que pueda ver la
nueva foto creada. Si hay algún fallo, mostraremos el mensaje

*/

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    for(let p of formData.entries()){
        console.log(p);
    } 
 
    if ( currentPhoto === null ) { // CREACION DE FOTO

        // Add the current user 's ID
        
        formData.append("userId", sessionManager.getLoggedId()) ;

        //antes de crear quiero que pase la validacion de las palabras

        /*MENSAJES DE ERROR EN PANTALLA - Pone una cadena inicial vacia en la cabecera de register.html que para cada error, se va sustituyendo */

        //CODIGO PARA ESTABLECER UN LIMITE DE FOTOS POR USUARIO 

        let dic={}; //Contiene los usuarios que han subido fotos y el numero de 

        fallosAPI.getAll().then(
            data=>{
               
                for(let d of data){
                    //console.log(d);
                    //Tengo la tabla
                    dic[d.userId] = d.NUM;
                }
                console.log(dic);
            }
        ).catch(error=>console.log(error));

        if(dic.hasOwnProperty(userId)){ //si el usuario ya ha subido alguna foto, quiero verifique la restriccion del limite de fotos
            console.log("EY");

            photos_usersAPI.getById(userId)
            .then( data => {
        
                if(data.length<2){
                    //Deja crear la foto
                    wordValidator.validateRegister(formData, photoId, currentPhoto);
                }
        
                else if(data.length>=2) { //si supera el límite
                    alert("HA SUPERADO EL LIMITE DE FOTOS QUE PUEDE SUBIR");
                }
                
            }).catch(  error => messageRenderer.showErrorMessage( error ));
        
        } else{ //quiere decir que el usuario todavia no ha subido una, asi que solo que pase el badwords
            wordValidator.validateRegister(formData, photoId, currentPhoto);
        }

    } else if (currentPhoto !== null){ //EDICION DE FOTO
            
            formData.append(" userId ", currentPhoto.userId ) ;
            formData.append(" date ", currentPhoto.date ) ;

            //antes de crear quiero que pase la validacion de las palabras
      
            wordValidator.validateRegister(formData, photoId, currentPhoto);

            
    }

}

function loadCurrentPhoto() { 

    /*
                                        FUNCION DESTINADA A 

Modificar el título de la página para que sea “Editando una foto” en lugar de “Creando
una nueva foto”.

Consultar la foto con el ID recibido a la API.

Almacenar la foto en la variable currentPhoto.

Editar los campos del formulario para establecer sus valores iniciales a aquellos que
tenga la foto que estamos editando.

*/

    // document.getElementById están a null porque se toma como base el de creacion

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



function main() {

    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

    let registerForm = document.getElementById("form-photo-upload");
    
    if (photoId!==null ) { //EDICION DE FOTO
        loadCurrentPhoto();
    }

    registerForm.onsubmit = handleSubmitPhoto; //CREACION DE FOTO

}

document.addEventListener("DOMContentLoaded", main ) ;
