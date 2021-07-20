/*
Cada tarjeta de este estilo está compuesta de un total de 7 nodos HTML, cada uno de
ellos con una serie de atributos y texto. Sin duda, crearlos todos manualmente en el código
sería tedioso. Por ello, en estos casos se suele almacenar una representación en forma de
cadena del código HTML, y usar una función que interprete esa cadena, generando el nodo raíz y todos los que se encuentren en su interior automáticamente, para poder entonces
colocarlos en el DOM.
La plantilla de proyecto Silence incluye esta función, llamada parseHTML()

    En el código para renderizar nuestra galería, comenzaremos creando un elemento <div>
    que contendrá todas las filas de la galería, al que daremos clase photo-gallery. Crearemos
    también una fila inicial para insertar las fotos
*/

/* ---------------------------------- CABECERA ---------------------------------------------- */
import {parseHTML} from "/js/utils/parseHTML.js";
import {photoRender} from "/js/renderers/photos.js";
import {sessionManager} from "/js/utils/session.js";
" use strict ";

/* ---------------------------------- CUERPO ---------------------------------------------- */

const galleryRender = {
    
    asCardGallery: function (photos) {

        let galleryContainer = parseHTML('<div class= "photo-gallery"> </div >');
        let row = parseHTML('<div class= "row"> </div >');

        galleryContainer.appendChild(row);

        let counter = 0;
        for (let photo of photos) {
            //console.log("visibilidad="+photo.visibility);
            if(photo.visibility=='Public'){
                let card = photoRender.asCard(photo);
            row.appendChild(card);
            counter+=1;
            if (counter%3 === 0) {
                row = parseHTML('<div class= "row"> </div >');
                galleryContainer.appendChild(row);
            }
            }

        }
        return galleryContainer;
    },

    asCardGallery2: function (photos) { //VER LAS FOTOS DE UN USUARIO

        let userId = sessionManager.getLoggedId() ;
        let galleryContainer = parseHTML('<div class= "photo-gallery"> </div >');
        let row = parseHTML('<div class= "row"> </div >');

        galleryContainer.appendChild(row);

        let counter = 0;
        for (let photo of photos) { //No asustarse, todo este código es por lo del candado
          
            if(photo.userId==userId){
                if(photo.visibility=='Private'){

                    let card = photoRender.asCard3(photo);
                row.appendChild(card);
                counter+=1;
                if (counter%3 === 0) {
                    row = parseHTML('<div class= "row"> </div >');
                    galleryContainer.appendChild(row);
                }

                }
                else{

                    let card = photoRender.asCard2(photo);
                row.appendChild(card);
                counter+=1;
                if (counter%3 === 0) {
                    row = parseHTML('<div class= "row"> </div >');
                    galleryContainer.appendChild(row);
                }

                }
                
            }
        }
        return galleryContainer;
        }
    };

export {galleryRender};