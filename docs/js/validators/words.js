/* ---------------------------------- CABECERA ---------------------------------------------- */
" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {wordsAPI} from "/js/api/words.js";
import {photosAPI} from "/js/api/photos.js";

/* ---------------------------------- CUERPO ---------------------------------------------- */
const wordValidator = {
    validateRegister: function (formData) {

        console.log(formData);

        let arrayDB=[];

        //funcion que me saca las badwords del db
        wordsAPI.getAll()
        .then( words => {
            
            for(let w of words){
                //console.log("palabra="+w);
                arrayDB.push(w.palabra);
            }

            console.log("array del db="+arrayDB);

            let errors = [];
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
                    errors.push("Palabra inapropiada="+palabra);
                }
            }

            //comprobacion de numero de fotos

            

            
        console.log("numero de errores="+errors.length);

        if(errors.length > 0) {

            console.log("Viendo como coge el valor del selector");
            let tempo=document.getElementById("input-visibility");
            //TEMPO.VALUE es lo que me guarda el public/private
            console.log(tempo.value);

            console.log(errors);
            let errorsDiv = document.getElementById("errors"); 
            errorsDiv.innerHTML = "";
            //para cada error, renderizalo
            for(let error of errors) {
                messageRenderer.showErrorMessage(error);
            }
        }  else{

            alert(" Foto creada !") ;

            //creacion de foto-la añade al back

            photosAPI.create( formData )
                .then( data => window.location.href = "index.html")
                .catch( error => messageRenderer.showErrorMessage( error ) ) ;

}

    
        return errors;

        })
        .catch( error => messageRenderer.showErrorMessage( error ) ) ;

    }
};

export { wordValidator };