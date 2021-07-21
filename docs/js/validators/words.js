/* ---------------------------------- CABECERA ---------------------------------------------- */
" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {wordsAPI} from "/js/api/words.js";
import {photosAPI} from "/js/api/photos.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */
const wordValidator = {
    validateRegister: function (formData, photoId, currentPhoto) {

        //console.log(formData);

        let arrayDB=[];
           let errors = [];

        //funcion que me saca las badwords del db
        wordsAPI.getAll()
        .then( words => {
            
            for(let w of words){
                //console.log("palabra="+w);
                arrayDB.push(w.palabra);
            }

            console.log("array del db="+arrayDB);

            //let words=["caca","culo","peo","pis"];
    
            /*VARIABLES FORMDATA INPUTS FORM */
    
            let titulo = formData.get("title");
            let descripcion = formData.get("description");
    
            //console.log(words);
    
            /*COMPROBACIONES DE ATRIBUTOS */
            for(let palabra of arrayDB){
                //console.log(palabra);
                if(titulo.match(palabra) || descripcion.match(palabra)) {
                    console.log("titulo="+titulo);
                    console.log("descripcion="+descripcion);
                    console.log("palabra="+palabra);
                    errors.push(palabra);
                }
            }
            
        console.log("WORDS errores="+errors);

        if(errors.length > 0) {

            let errorsDiv = document.getElementById("errors"); 
            errorsDiv.innerHTML = "";
            //para cada error, renderizalo 
            for(let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }  else if (currentPhoto === null){
            alert(" Foto creada !") ;
    
            //creacion de foto-la añade al back

            photosAPI.create(formData)
                .then( data => window.location.href = "index.html")
                .catch( error => messageRenderer.showErrorMessage( error ) ) ;
        } else {
    
                alert(" Foto editada !") ;
    
                //creacion de foto-la añade al back
    
                photosAPI.update(photoId,formData)
                    .then( data => window.location.href = "index.html")
                    .catch( error => messageRenderer.showErrorAsAlert( error ) ) ;
    
        }


        })
        .catch( error => messageRenderer.showErrorMessage( error ) ) ;

    }
};

export { wordValidator };