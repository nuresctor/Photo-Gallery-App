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

let urlParams = new URLSearchParams(window.location.search) ;
let photoId = urlParams.get("photoId") ;
let userId = sessionManager.getLoggedId() ;

    ///////////////////////////////// FUNCIONES AUXILIARRES////////////////////////////////////////////

    function hideActionsColumn() {
        let actions_col = document.getElementById(" actions-col ") ;
        let coment_col = document.getElementById("form-coment") ;
        
        //console.log(actions_col);
        if (!sessionManager.isLogged() ) {
            actions_col.style.display = "none";
            coment_col.style.display="none";
            
        }

        photosAPI.getAll().then((data=>{
            for(let f of data){
                if(f.visibility=='Private'){
                    coment_col.style.display="none";
                }
            }
        })).catch(error=>console.log(error));
        
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

    hideActionsColumn() ; 

    /*
LO QUE TENIA ANTES PUESTO DE LOS BOTONES POR SI FALLA ALGO

    <button id="button-edit"  class= "btn btn-primary "> Edit this photo </button >
    <button id="button-delete" class= "btn btn-danger "> Delete this photo </button >  

    let deleteBtn = document.querySelector("#button-delete") ;
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit") ;
    editBtn.onclick = handleEdit;
    */

     let sendBtn = document.querySelector("#button-send") ; //boton de enviar comentario
    sendBtn.onclick = handleSend;
    
    let form=document.getElementById("form-rating");
    form.onsubmit=handleRate;

    //código para añadir los comentarios de esa foto

    let container = document.querySelector("div.container2");

    comentsAPI.getAll()
    .then( coments => {
        //console.log(coments);
        
                let gallery = comentRender.asCardGallery(coments, photoId);
                container.appendChild(gallery);
        
    }).catch( error => console.log(error) ) ;

    //código para mostrar en detalle cualquier foto solo proporcinando el id MUESTRA LA FOTO 

    let photoContainer = document.querySelector("#photo-details-column");

    photosAPI.getById( photoId )
    .then( photos => {
        let photoDetails = photoRender.asDetails( photos[0]) ; // la API siempre devuelve un array de fotos
        photoContainer.appendChild( photoDetails ) ;

        //CODIGO PARA AÑADIR LOS BOTONES DE EDITAR Y BORRAR ARRIBA, QUE QUEDA MEJOR

            //console.log("Foto cargada");
            //document.getElementById ("borrar_foto").addEventListener ("click",console.log("Foto cargada2"));
            document.getElementById ("borrar_foto").addEventListener ("click",handleDelete);
            document.getElementById ("editar_foto").addEventListener ("click",handleEdit);

            if (!sessionManager.isLogged() ) {
    
                document.getElementById ("borrar_foto").style.display="none";
                document.getElementById ("editar_foto").style.display="none";
            }
        
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
    