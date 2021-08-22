/*-------------------------------------------CABECERA--------------------------------------------------------------- */
" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

/*--------------------------------------------MODULO FOTOS API-------------------------------------------------------------- */
const comentsAPI = { //MODULO PARA EXPORTAR FUNCIONES
    getAll: function () {
        return new Promise(function(resolve , reject) {
        axios
        .get(`${BASE_URL}/coments`, requestOptions )
        .then(response => resolve(response.data))
        .catch( error => reject(error.response.data.message));
        });
    },

    create: function( formData ) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .post(`${BASE_URL}/coments`, formData , requestOptions )
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
        } ,

    };

    export {comentsAPI};

    //DE MOMENTO SOLO SE PUEDEN CREAR COMENTARIOS