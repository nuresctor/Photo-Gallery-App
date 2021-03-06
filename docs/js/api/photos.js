//Para almacenar todas las operaciones contra los endpoints relativos a las fotos

/*

/API/V1/PHOTOS GETALL GETBYID CREATE POST PUT DELETE

Esta función devuelve una promesa, que se usa para encapsular código asíncrono.
Como ha aprendido en teoría, una promesa se define en base a una función con dos
parámetros, resolve y reject, que son funciones. El interior de estas funciones contiene
el código que ha de ser ejecutado de manera asíncrona.
En el interior de la función asociada a la promesa se efectúa la petición AJAX usando la
librería axios=facilita todo tipo de operaciones como cliente HTTP.

*/

/*-------------------------------------------CABECERA--------------------------------------------------------------- */
" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

/*--------------------------------------------MODULO FOTOS API-------------------------------------------------------------- */
const photosAPI = { //MODULO PARA EXPORTAR FUNCIONES

    getAll: function () {
        return new Promise(function(resolve , reject) {
        axios
        .get(`${BASE_URL}/photos`, requestOptions )
        .then(response => resolve(response.data))
        .catch( error => reject(error.response.data.message));
        });
    },

    getById: function (photoId) {

        return new Promise(function(resolve , reject) { //la promesa puede ser resuelta o rechazada
        axios
        .get(`${BASE_URL}/photos/${photoId}`, requestOptions) //URL del endpoint que queremos
        .then(response => resolve(response.data)) //En este caso, resolvemos afirmativamente la promesa devolviendo los datos que ha proporcionado el servidor.
        .catch(error => reject(error.response.data.message)); //caso de que recibamos objetos de tipo error

        });
    },

    //////////////////////////FUNCIONES DE POST PUT DELETE PARA LAS FOTOS///////////////////////////////////////////

    create: function( formData ) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .post(`${BASE_URL}/photos`, formData , requestOptions )
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
        } ,
        
    update: function ( photoId , formData ) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .put(`${BASE_URL}/photos/${photoId}`, formData ,requestOptions )
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
        } ,

    delete: function ( photoId ) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .delete(`${BASE_URL}/photos/${photoId}`, requestOptions)
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
        }

};

export {photosAPI};