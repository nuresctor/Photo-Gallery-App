import {sessionManager} from "/js/utils/session.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {photoRender} from "/js/renderers/photos.js";
import {usersAPI} from "/js/api/users.js";
import {photosAPI} from "/js/api/photos.js";
import {userRender} from "/js/renderers/users.js";
import {galleryRender} from "/js/renderers/gallery.js";
/* CODIGO PARA VER POR CONSOLA EL ID DEL USUARIO
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let userId = sessionManager.getLoggedId() ;
console.log("The user ID to load is: " + userId );

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

function fotos_usuario() {

    //código para mostrar en detalle cualquier usuario solo proporcinando el id 

    let userContainer = document.querySelector("#user-details-column");
    let photosContainer = document.querySelector("#photos-details-column");
//Columna de datos del usuario
    usersAPI.getById(userId)
    .then( users => {
        let userDetails = userRender.asDetails(users[0]) ; // ¿?
        console.log(userDetails);
        userContainer.appendChild(userDetails) ;
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;
///columna de fotos del usuario
    photosAPI.getAll()
    .then( photos => {
        console.log(photos);
        let gallery = galleryRender.asCardGallery2(photos);
        photosContainer.appendChild(gallery);

        //ver cuantas fotos tiene subidas un user
        
    let cont = document.getElementsByClassName("card");
    //console.log(cont);
    //console.log(cont.length);
    let tam=cont.length;
        console.log("Tamaño="+tam);
    return tam;
        
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;


}

function main () {
    

    showUser();
    addLogoutHandler();
    hideHeaderOptions();
    fotos_usuario();

    /*---------------------------------CODIGO PARA RELLENAR LA RENDER GALLERY--------------------------------------- */

}

document.addEventListener("DOMContentLoaded", main);
