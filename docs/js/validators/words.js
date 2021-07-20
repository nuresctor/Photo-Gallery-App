/* ---------------------------------- CABECERA ---------------------------------------------- */
" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {wordsAPI} from "/js/api/words.js";

/* ---------------------------------- CUERPO ---------------------------------------------- */
const wordValidator = {
    validateRegister: function (formData) {

        //console.log(formData);

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
            
        //console.log("numero de errores="+errors.length);
        console.log("errores de word="+errors);

        let num = errors.length;

        return num;

        })
        .catch( error => messageRenderer.showErrorMessage( error ) ) ;

    }
};

export { wordValidator };