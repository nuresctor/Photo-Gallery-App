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

    getById: function (photoId) {

        return new Promise(function(resolve , reject) { //la promesa puede ser resuelta o rechazada
        axios
        .get(`${BASE_URL}/coments/${photoId}`, requestOptions) //URL del endpoint que queremos
        .then(response => resolve(response.data)) //En este caso, resolvemos afirmativamente la promesa devolviendo los datos que ha proporcionado el servidor.
        .catch(error => reject(error.response.data.message)); //caso de que recibamos objetos de tipo error

        });
    },

    delete: function ( comentId ) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .delete(`${BASE_URL}/coments/${comentId}`, requestOptions)
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
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