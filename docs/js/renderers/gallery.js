/*
    En el código para renderizar nuestra galería, comenzaremos creando un elemento <div>
    que contendrá todas las filas de la galería, al que daremos clase photo-gallery. Crearemos
    también una fila inicial para insertar las fotos
*/

/* ---------------------------------- CABECERA ---------------------------------------------- */
import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRender} from "/js/renderers/photos.js";
" use strict ";

/* ---------------------------------- CUERPO ---------------------------------------------- */

const galleryRender = {
    
    asCardGallery: function (photos) {

        let galleryContainer = parseHTML('<div class= "photo-gallery"> </div >');
        let row = parseHTML('<div class= "row"> </div >');

        galleryContainer.appendChild(row);

        let counter = 0;
        for (let photo of photos) {
            let card = photoRender.asCard(photo);
            row.appendChild(card);
            counter+=1;
            if (counter%3 === 0) {
                row = parseHTML('<div class= "row"> </div >');
                galleryContainer.appendChild(row);
            }
        }
        return galleryContainer;
    }

};

export {galleryRender};