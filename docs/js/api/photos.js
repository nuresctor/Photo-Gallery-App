//Para almacenar todas las operaciones contra los endpoints relativos a las fotos

/*

Esta función devuelve una promesa, que se usa para encapsular código asíncrono.
Como ha aprendido en teoría, una promesa se define en base a una función con dos
parámetros, resolve y reject, que son funciones. El interior de estas funciones contiene
el código que ha de ser ejecutado de manera asíncrona.
En el interior de la función asociada a la promesa se efectúa la petición AJAX usando la
librería axios

*/

/*-------------------------------------------CABECERA--------------------------------------------------------------- */
" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

/*--------------------------------------------CUERPO------------------------------------------------------------------ */
const photosAPI = {

    getAll: function () {
        return new Promise(function(resolve , reject) {
        axios
        .get(`${BASE_URL}/photos`, requestOptions )
        .then(response => resolve(response.data))
        .catch( error => reject(error.response.data.message));
        });
    },

    getById: function (photoId) {
        return new Promise(function(resolve , reject) {
        axios
        .get(`${BASE_URL}/photos/${photoId}`, requestOptions)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response.data.message));
        });
    }

};

export {photosAPI};