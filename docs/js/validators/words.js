/* ---------------------------------- CABECERA ---------------------------------------------- */
" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {wordsAPI} from "/js/api/words.js";
import {photosAPI} from "/js/api/photos.js";
import {comentsAPI} from "/js/api/coments.js";
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

                arrayDB.push(w.palabra);
            }

            console.log("Palabras no permitidas="+arrayDB);

            //let arrayDB=["caca","culo","peo","pis"];
    
            /*VARIABLES FORMDATA INPUTS FORM */
    
            let titulo = formData.get("title");
            let descripcion = formData.get("description");
    
            /*COMPROBACIONES DE ATRIBUTOS */
            for(let palabra of arrayDB){
               
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
        }   else if (currentPhoto === null && errors.length === 0 ){ //SI NO HAY BAD WORDS, CREA/EDITA LA FOTO
    
            //creacion de foto-la añade al back

            photosAPI.create(formData).then( data => {
                    alert(" Foto creada !") ;
                    window.location.href = "index.html"
                }
                   ).catch( error => messageRenderer.showErrorMessage(error));
        } else if(currentPhoto !== null && errors.length === 0) {
    
                alert(" Foto editada !") ;
    
                //editacion de la foto-la añade al back
    
                photosAPI.update(photoId,formData)
                    .then( data => window.location.href = "index.html")
                    .catch( error => messageRenderer.showErrorMessage(error));
    
        }


        })
        .catch( error => messageRenderer.showErrorMessage( error ) ) ;

    },

    validateRegister2: function (formData) {
        let arrayDB=[];
        let errors = [];

        //funcion que me saca las badwords del db
        wordsAPI.getAll()
        .then( words => {
            
            for(let w of words){

                arrayDB.push(w.palabra);
            }
        let textarea = formData.get("value");

        for(let palabra of arrayDB){
               
            if(textarea.match(palabra)) {

                errors.push(palabra);
            }

        }
        if(errors.length > 0) {

            let errorsDiv = document.getElementById("errors"); 
            errorsDiv.innerHTML = "";
            //para cada error, renderizalo 
            for(let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }else{
            comentsAPI.create(formData).then(data=>{
                alert("Comentario guardado correctamente");
                window.location.href=window.location.search;
            }
                ).catch(error=>console.log(error));
        }
    }).catch( error => messageRenderer.showErrorMessage( error ) ) ;
    }
};

export { wordValidator };