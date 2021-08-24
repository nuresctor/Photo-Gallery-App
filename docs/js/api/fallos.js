" use_strict ";
import {BASE_URL,requestOptions} from "./common.js";

/*--------------------------------------------CUERPO------------------------------------------------------------------ */
const fallosAPI = {

    getAll: function() {
    return new Promise( function ( resolve , reject ) {
    axios
    .get(`${BASE_URL}/fallos`, requestOptions)
    .then( response => resolve( response.data ) )
    .catch( error => reject( error.response.data.message )) ;
    });
    } ,

   
};

export { fallosAPI };
    