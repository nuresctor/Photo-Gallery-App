/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {photoRender} from "/js/renderers/photos.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
import {cabecera} from "/js/header.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

/* CODIGO PARA VER POR CONSOLA EL ID DE LA FOTO - NECESARIO 
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let photoId = urlParams.get("photoId") ;
//console.log("The photo ID to load is: " + photoId );


    ///////////////////////////////// FUNCIONES AUXILIARRES////////////////////////////////////////////

   
    
    function hideActionsColumn() {
        let actions_col = document.getElementById(" actions-col ") ;
        //console.log(actions_col);
        if (!sessionManager.isLogged() ) {
            actions_col.style.display = "none";
        }
    }

    function handleDelete(event) {

        let answer = confirm("Do you really want to delete this photo ?") ;

        if(answer) {
        photosAPI.delete(photoId)
        .then( data => window.location.href = "index.html")
        .catch( error => messageRenderer.showErrorMessage(error));
        }
    }
    
    function handleEdit(event) {
        window.location.href = "edit_photo.html?photoId=" + photoId;
    };

    function handleRate(event) {
        /*
        quiero que me guarde:
            valoracion
            fecha
            foto
        */
       
    };

function main () {

    let prueba = document.querySelector("form-control.option") ;
    console.log("LO QUE QUIERO="+prueba);

    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

    hideActionsColumn() ; //oculta las opciones de editar, borrar y valorar foto

    /*
    CODIGO PARA  En el caso del botón de borrado, crearemos
una función que pregunte al usuario si realmente desea eliminar la foto mediante la función
confirm()1
. En el caso de una respuesta afirmativa, usaremos el módulo de API para emitir
una petición DELETE y devolveremos al usuario a la página principal

En ese caso, el botón para editar foto de photo_detail.js se limitará a redireccionar a
esta vista, proporcionando el ID de foto correspondiente a la foto actual:
    */

    let deleteBtn = document.querySelector("#button-delete") ;
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit") ;
    editBtn.onclick = handleEdit;

    let rateBtn = document.querySelector("#button-rate") ;
    rateBtn.onclick = handleRate;



    //código para mostrar en detalle cualquier foto solo proporcinando el id MUESTRA LA FOTO 

    let photoContainer = document.querySelector("#photo-details-column");

    photosAPI.getById( photoId )
    .then( photos => {
        let photoDetails = photoRender.asDetails( photos[0]) ; // la API siempre devuelve un array de fotos
        photoContainer.appendChild( photoDetails ) ;
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

}

    document.addEventListener("DOMContentLoaded", main);

    /*
    let photo = {
        title: " Samoyed ",
        description: "A very good boy. ",
        userId: 1 ,
        url: " https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
        date: "12/01/1996"
    };
    */
        