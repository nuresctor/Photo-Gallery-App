/* 

Un array es una lista ordenada de elementos, que no tienen por qué ser del mismo tipo (aunque se recomienda que lo sean, por
consistencia). Un Object es similar a un diccionario

Podemos entonces usar la función para convertir una cadena, representando HTML,
en un objeto correspondiente a un nodo HTML que podemos manipular mediante JS como
hemos visto anteriormente

document.createElement() no hace que éste aparezca inmediatamente en el documento HTML. Hasta que no se introduzca dentro de algún otro elemento de la página, el
elemento creado no será visible --> .append

IDEA=El resultado es el mismo que en el apartado anterior, pero el código para generar el nodo
HTML queda abstraído.

Pese a que ahora mismo parece una sobrecarga de código para lograr lo que ya estaba
conseguido anteriormente usando sólo HTML, en posteriores laboratorios veremos que ésta
estructura de código facilita enormemente poder cargar cualquier foto en esta vista mediante
una consulta a la API del proyecto.

*/

/* ---------------------------------- CABECERA ---------------------------------------------- */

import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRender} from "/js/renderers/photos.js";
import {galleryRender} from "/js/renderers/gallery.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
" use strict ";

/* ---------------------------------- FUNCIONES AUXILIARES ---------------------------------------------- */



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

//MUESTRA QUIÉN ESTÁ LOGUEADO USUARIO-ANÓNIMO

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

//FUNCION DE CERRAR SESIÓN

    function addLogoutHandler() {

        let logoutButton = document.getElementById(" navbar-logout ") ;

        logoutButton.addEventListener("click", function () {
            sessionManager.logout() ;
            window.location.href = "index.html";
        }) ;
    
    }

    //OCULTA BOTONES 
    
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
            //headerRecent.style.display = "none";
            headerCreate.style.display = "none";
            headerLogout.style.display = "none";
        }
    
    }

    //MAIN SE EJECUTA CUANDO LA PÁGINA ESTÁ TOTALMENTE CARGADA

function main () {

    let prueba=sessionManager.getLoggedUser();
    console.log("usuario logueado: " + prueba);
    
    
    showUser(); //MUESTRA QUIÉN ESTÁ LOGUEADO USUARIO-ANÓNIMO
    addLogoutHandler(); //FUNCION DE CERRAR SESIÓN
    hideHeaderOptions();   //OCULTA BOTONES 

    

    /*---------------------------------CODIGO PARA RELLENAR LA RENDER GALLERY--------------------------------------- */

    let container = document.querySelector("div.container");

    /*

    diferencia esta en que getElementById() tienes que hacer referencia a un elemento que tenga un id unico.
Con querySelector() te devolvera el primer elemento que cumpla la condicion que especifiques... por ejemplo:
1
2
document.querySelector("input") # devolvera el primer input
document.querySelector(".class") # devolvera el primer elemento con la clase de css .class

    */

    /*
    renderizar el array
    de fotos obtenido de la API como una galería, y colocarla en el lugar correspondiente de la página. En caso de error, se mostrará en el <div id="errors"> creado gracias al renderizador
    de mensajes
    */

    photosAPI.getAll()
    .then( photos => {
        let gallery = galleryRender.asCardGallery(photos);
        container.appendChild(gallery);

          /*----------------------------------CODIGO PARA EVENTOS DE RATON------------------------------------- */

    let cards = document.querySelectorAll("div.card") ;

    console.log("cards="+cards);

for (let card of cards) {
    console.log(card);
    card.onmouseenter = handleMouseEnter;
    card.onmouseleave = handleMouseLeave;
}
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

  

}

document.addEventListener("DOMContentLoaded", main);

/*
    let photos = [
        {
        title: " Samoyed ",
        description: "A very good boy. ",
        userId: 1 ,
        url: "https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
        date: "15/08/2020"} ,
        {
        title: " Spanish tortilla ",
        description: " With onion ",
        userId: 2 ,
        url: "https://llevatilde.es/imagetexts/2/2f/otra.png",
        date: "01/01/2021"} ,
        {
        title: " Seville ",
        description: "The beautiful city of Seville ",
        userId: 3 ,
        url: "https://urbansevilla.es/wp-content/uploads/2019/03/urban-sevilla-foto-ciudad.jpg",
        date: "03/02/2019"} ,
        {
        title: " Abstract art ",
        description: " Clipart ",
        userId: 4 ,
        url: "https://clipartart.com/images/worst-clipart-ever-1.jpg",
        date: "14/08/2019"} ,
        ];
    */