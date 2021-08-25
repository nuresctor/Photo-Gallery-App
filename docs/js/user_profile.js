import {sessionManager} from "/js/utils/session.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {usersAPI} from "/js/api/users.js";
import {photosAPI} from "/js/api/photos.js";
import {userRender} from "/js/renderers/users.js";
import {galleryRender} from "/js/renderers/gallery.js";
import {cabecera} from "/js/header.js";

/* CODIGO PARA VER POR CONSOLA EL ID DEL USUARIO
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let userId = urlParams.get("userId");
console.log("The user ID to load is: " + userId );

//FUNCIONES AUXILIARES

function handleMouseEnter(event) {
    let card = event.target;
    
    card.style.backgroundColor = "black";
    card.style.color = "white";
}

function handleMouseLeave(event) {
    let card = event.target;
    card.style.backgroundColor = "white";
    card.style.color = "black";
}

function fotos_usuario() {

    //código para mostrar en detalle 

    let userContainer = document.querySelector("#user-details-column");
    let photosContainer = document.querySelector("#photos-details-column");

//Columna de datos del usuario

    usersAPI.getById(userId)
    .then( users => {
        let userDetails = userRender.asDetails(users[0]) ; 
        userContainer.appendChild(userDetails) ;
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

///columna de fotos del usuario

    photosAPI.getAll()
    .then( photos => {
        let gallery = galleryRender.asCardGallery2(photos);
        photosContainer.appendChild(gallery);

        //ESTO ES POR LO DEL RATON

        let cards = document.querySelectorAll("div.card") ;
    
    for (let card of cards) {
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }
        
        //ver cuantas fotos tiene subidas un user
        
    let cont = document.getElementsByClassName("card");
    //console.log(cont);
    //console.log(cont.length);
    let tam=cont.length;
    console.log("nº de fotos subidas="+tam);
    
    }).catch( error => messageRenderer.showErrorMessage( error ) ) ;


}

function main () {
    
    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

    fotos_usuario();

}

document.addEventListener("DOMContentLoaded", main);
