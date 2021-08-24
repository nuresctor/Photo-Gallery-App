/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {photoRender} from "/js/renderers/photos.js";
import {photosAPI} from "/js/api/photos.js";
import {ratingsAPI} from "/js/api/ratings.js";
import {comentsAPI} from "/js/api/coments.js";
import {messageRenderer} from "/js/renderers/messages.js";
import {sessionManager} from "/js/utils/session.js";
import {cabecera} from "/js/header.js";
import { comentRender } from "./renderers/coments.js";
import {wordValidator} from "/js/validators/words.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

/* CODIGO PARA VER POR CONSOLA EL ID DE LA FOTO - NECESARIO 
            El objeto URLSearchParams sirve para acceder más fácilmente a los parámetros de URL,
            que se encuentran en window.location.search. Con este objeto, podemos acceder a un
            parámetro determinado usando urlParams.get(). Esto hará que se muestre por consola el
            ID de la foto que debemos mostrar
*/

let urlParams = new URLSearchParams(window.location.search) ;
let photoId = urlParams.get("photoId") ;
let userId = sessionManager.getLoggedId() ;
//console.log("The photo ID to load is: " + photoId );


    ///////////////////////////////// FUNCIONES AUXILIARRES////////////////////////////////////////////

   
    
    function hideActionsColumn() {
        let actions_col = document.getElementById(" actions-col ") ;
        let coment_col = document.getElementById("form-coment") ;
        //console.log(actions_col);
        if (!sessionManager.isLogged() ) {
            actions_col.style.display = "none";
            coment_col.style.display="none";
        }
    }

    function handleDelete(event) {
       
        let answer = confirm("Do you really want to delete this photo ?") ;

        if(answer) {
        photosAPI.delete(photoId)
        .then( data => window.location.href = "index.html")
        .catch( error => console.log(error));
        }
    };
    
    function handleEdit(event) {
        window.location.href = "edit_photo.html?photoId=" + photoId;
    };

    function handleSend(event) {

        event.preventDefault();
        let form=document.getElementById("form-coment");
        let formData=new FormData(form);
        let fecha=new Date;
        console.log(form);
        console.log(document.getElementById("ID").value);

        formData.append("userId", userId ) ;
        formData.append("date", formatDate(fecha)) ;
        formData.append("photoId", photoId) ;
        formData.append("value", document.getElementById("ID").value ) ;

        console.log(formData);
        for(let p of formData.entries()){
            console.log(p);
        }

        //Ya tengo el formData relleno

        wordValidator.validateRegister2(formData);


    };

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function handleRate(event) {

        event.preventDefault();
        let form=event.target;
        let formData=new FormData(form);
        let fecha=new Date;
        console.log(form);

        formData.append("userId", userId ) ;
        formData.append("date", formatDate(fecha)) ;
        formData.append("photoId", photoId) ;

        console.log(formData);
        for(let p of formData.entries()){
            console.log(p);
        }

        //LIMITE DE VALORACIONES POR PERSONA

        ratingsAPI.getAll().then(data=>{
            console.log(data);
            let lista= [];
            for(let p of data){
                //console.log(p.photoId);
                //console.log(photoId);
                if(photoId==p.photoId){
                    lista.push(p.userId);
                }
            }
            //console.log(lista);
            if(lista.includes(userId)){
                //console.log("YA VOTO WEI");
                alert("YA HA VALORADO ESTA FOTO");

            } else{
                ratingsAPI.create(formData)
                .then(Data=>{
                    alert("Valoración guardada correctamente");
                    window.location.href=window.location.search; //esto me refresca la pagina para actualizar la rating
                   
                })
                .catch(error=>console.log(error));
            }
    
        }).catch(error=>console.log(error));

       

 
};


function main () {

    cabecera.showUser();
    cabecera.addLogoutHandler();
    cabecera.hideHeaderOptions();

    hideActionsColumn() ; //oculta las opciones de editar, borrar y valorar foto

    /*
    CODIGO PARA  En el caso del botón de borrado, crearemos
una función que pregunte al usuario si realmente desea eliminar la foto mediante la función
confirm()1
. En el caso de una respuesta afirmativa, usaremos el módulo de API para emitir
una petición DELETE y devolveremos al usuario a la página principal

En ese caso, el botón para editar foto de photo_detail.js se limitará a redireccionar a
esta vista, proporcionando el ID de foto correspondiente a la foto actual:
    */

    

    let deleteBtn = document.querySelector("#button-delete") ;
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit") ;
    editBtn.onclick = handleEdit;

    
     let sendBtn = document.querySelector("#button-send") ;
    sendBtn.onclick = handleSend;
    

    let form=document.getElementById("form-rating");
    form.onsubmit=handleRate;

    //código para añadir los comentarios de esa foto

    let container = document.querySelector("div.container2");

    comentsAPI.getAll()
    .then( coments => {
        console.log(coments);
        
                let gallery = comentRender.asCardGallery(coments, photoId);
                container.appendChild(gallery);
        

    })
    .catch( error => console.log(error) ) ;

    //código para mostrar en detalle cualquier foto solo proporcinando el id MUESTRA LA FOTO 

    let photoContainer = document.querySelector("#photo-details-column");

    photosAPI.getById( photoId )
    .then( photos => {
        let photoDetails = photoRender.asDetails( photos[0]) ; // la API siempre devuelve un array de fotos
        photoContainer.appendChild( photoDetails ) ;
        ratingsAPI.getById( photoId ).then( //este codigo es para añadir el score
            data => {
    
                console.log(data[0]);
                var h = document.createElement("H1");
                h.className = "texto-encima";
                var t = document.createTextNode("⭐"+data[0].avgrating+" ");
                h.appendChild(t);
                photoContainer.appendChild( h);
            }
        ) .catch( error => messageRenderer.showErrorMessage( error ) ) ;
       
    })
    .catch( error => messageRenderer.showErrorMessage( error ) ) ;

}

    document.addEventListener("DOMContentLoaded", main);

    /*
    let photo = {
        title: " Samoyed ",
        description: "A very good boy. ",
        userId: 1 ,
        url: " https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
        date: "12/01/1996"
    };
    */
        