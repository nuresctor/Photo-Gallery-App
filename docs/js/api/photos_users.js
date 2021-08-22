/*
Esta operación requiere realizar una consulta GET al endpoint de usuarios, para poder
conocer el nombre de un determinado usuario dado su ID

DA ERROR
*/

/*-------------------------------------------CABECERA--------------------------------------------------------------- */
" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

/*--------------------------------------------CUERPO------------------------------------------------------------------ */
const photos_usersAPI = {

    getAll: function() {
    return new Promise( function ( resolve , reject ) {
    axios
    .get(`${BASE_URL}/photos_users`, requestOptions)
    .then( response => resolve( response.data ) )
    .catch( error => reject( error.response.data.message )) ;
    });
    } ,

    getById: function(userId) {
        return new Promise( function ( resolve , reject ) {
        axios
        .get(`${BASE_URL}/photos_users/${userId}`, requestOptions)
        .then( response => resolve( response.data ) )
        .catch( error => reject( error.response.data.message )) ;
        });
        } 
};

export { photos_usersAPI };
    