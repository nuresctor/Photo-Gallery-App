/* 

Podemos entonces usar la función para convertir una cadena, representando HTML,
en un objeto correspondiente a un nodo HTML que podemos manipular mediante JS como
hemos visto anteriormente

document.createElement() no hace que éste aparezca inmediatamente en el documento HTML. Hasta que no se introduzca dentro de algún otro elemento de la página, el
elemento creado no será visible --> .append


Pese a que ahora mismo parece una sobrecarga de código para lograr lo que ya estaba
conseguido anteriormente usando sólo HTML, en posteriores laboratorios veremos que ésta
estructura de código facilita enormemente poder cargar cualquier foto en esta vista mediante
una consulta a la API del proyecto.

*/

/* ---------------------------------- CABECERA ---------------------------------------------- */

import {galleryRender} from "/js/renderers/gallery.js";
import {photosAPI} from "/js/api/photos.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {cabecera} from "/js/header.js";
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

    //MAIN SE EJECUTA CUANDO LA PÁGINA ESTÁ TOTALMENTE CARGADA

function main () {
    
    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

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
