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

function showUser() {

    let title = document.getElementById("navbar-title") ;
    //console.log(title);
    let text;

    if ( sessionManager.isLogged() ) {
        let username = sessionManager.getLoggedUser().username;
        let id=sessionManager.getLoggedUser().userId;
        let xdios='';
        text = "Hi, @" + username;
        title.removeAttribute("href");
    //console.log("HOLAAA"+sessionManager.getLoggedUser().userId);
    //console.log("HOLAAA"+title.hasAttribute("href"));
    xdios=xdios+'user_profile.html?userId='+id;
    //console.log("ADIOSSS"+xdios);
    title.setAttribute("href",xdios);
    //console.log("HOLAAA"+title.hasAttribute("href"));
    } else {
        text = "Anonymous";
        title.removeAttribute("href");
       
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
        console.log("Detalles de usuario= "+userDetails);
        userContainer.appendChild(userDetails) ;
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

///columna de fotos del usuario

    photosAPI.getAll()
    .then( photos => {
        console.log(photos);
        let gallery = galleryRender.asCardGallery2(photos);
        photosContainer.appendChild(gallery);

        //ESTO ES POR LO DEL RATON

        let cards = document.querySelectorAll("div.card") ;

        console.log("cards="+cards);
    
    for (let card of cards) {
        console.log(card);
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }
        

        //ver cuantas fotos tiene subidas un user
        
    let cont = document.getElementsByClassName("card");
    //console.log(cont);
    //console.log(cont.length);
    let tam=cont.length;
        console.log("nº de fotos subidas="+tam);
    
        
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
