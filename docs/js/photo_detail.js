/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photoRender} from "/js/renderers/photos.js";

/* ---------------------------------- CUERPO ---------------------------------------------- */

function main () {

    let photoContainer = document.querySelector("#photo-details-column");

    let photo = {
    title: " Samoyed ",
    description: "A very good boy. ",
    userId: 1 ,
    url: " https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
    date: "12/01/1996"
    };

    let photoDetails = photoRender.asDetails(photo);
    photoContainer.appendChild(photoDetails);

}

    document.addEventListener("DOMContentLoaded", main);