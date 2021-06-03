/* 
Pese a que se puede escribir directamente el código a ejecutar fuera de cualquier función,
esta no es una buena práctica. Se recomienda definir una función main, que se ejecutará
cuando la página esté completamente cargada

Un array es una lista ordenada de elementos, que no tienen por qué ser del mismo tipo (aunque se recomienda que lo sean, por
consistencia). Un Object es similar a un diccionario

Podemos entonces usar la función para convertir una cadena, representando HTML,
en un objeto correspondiente a un nodo HTML que podemos manipular mediante JS como
hemos visto anteriormente

document.createElement() no hace que éste aparezca inmediatamente en el documento HTML. Hasta que no se introduzca dentro de algún otro elemento de la página, el
elemento creado no será visible

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
import {galleryRender} from '/js/renderers/gallery.js';
" use strict ";

/* ---------------------------------- CUERPO ---------------------------------------------- */

function main () {

    /*---------------------------------CODIGO PARA RELLENAR LA RENDER GALLERY--------------------------------------- */

    let container = document.querySelector("div.container");

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

        let gallery = galleryRender.asCardGallery(photos);
        container.appendChild(gallery);

    /*----------------------------------CODIGO PARA EVENTOS DE RATON------------------------------------- */

    let cards = document.querySelectorAll(" div.card ") ;

    for (let card of cards) {
        card.onmouseenter = handleMouseEnter;
        card.onmouseleave = handleMouseLeave;
    }

    function handleMouseEnter ( event ) {
        let card = event.target;
        card.style.backgroundColor = " black ";
        card.style.color = " white ";
    }

    function handleMouseLeave ( event ) {
        let card = event.target;
        card.style.backgroundColor = " white ";
        card.style.color = " black ";
    }


}

document.addEventListener("DOMContentLoaded", main);