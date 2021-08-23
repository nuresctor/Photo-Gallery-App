" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

const ratingsAPI = { //MODULO PARA EXPORTAR FUNCIONES
    create: function(formData) {
        return new Promise ( function ( resolve , reject ) {
        axios
            .post(`${BASE_URL}/ratings` , formData, requestOptions )
            .then( response => resolve ( response.data ) )
            .catch( error => reject ( error.response.data.message )) ;
        }) ;
        } ,
    getById: function (photoId) {

        return new Promise(function(resolve , reject) { //la promesa puede ser resuelta o rechazada
        axios
        .get(`${BASE_URL}/ratings/${photoId}`, requestOptions) //URL del endpoint que queremos
        .then(response => resolve(response.data)) //En este caso, resolvemos afirmativamente la promesa devolviendo los datos que ha proporcionado el servidor.
        .catch(error => reject(error.response.data.message)); //caso de que recibamos objetos de tipo error

        });
    },

    getAll: function () {
        return new Promise(function(resolve , reject) {
        axios
        .get(`${BASE_URL}/ratings`, requestOptions )
        .then(response => resolve(response.data))
        .catch( error => reject(error.response.data.message));
        });
    },
    
}

export {ratingsAPI};