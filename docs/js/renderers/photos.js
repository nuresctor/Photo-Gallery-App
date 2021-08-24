/* 
AÑADIR LO DEL ID EN EL LINK DE LOS USUARIOS

El const define una clase o módulo, y dentro tenemos una funcion

Esto nos permite añadir una foto a la galería dados sus atributos, sin tener que preocuparnos de generar su estructura HTML

*/

/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

/*
    función para añadir el nombre de usuario a una tarjeta ya creada de manera asíncrona, dadas
    la tarjeta en sí (ya convertida en un nodo DOM) y el ID de usuario cuyo nombre deseamos
    obtener @usuario en la card y en la descripcion vaya
*/

function loadUsernameCard(card , userId ) {
    usersAPI.getById(userId)
    .then( datos => {
        let username = datos[0].username;
        let p = card.querySelector("a.user-name") ;
        p.textContent = "@" + username;

    });

}

function loadUsernameCardDetail(card , userId ) {
    usersAPI.getById(userId)
    .then( users => {
        let username = users[0].username;
        //console.log("usuario="+username);
        let p = card.querySelector("a.user-name") ;
        //console.log(card.querySelector("a.user-name"));
        //console.log(p.textContent);
        p.textContent = "@" + username;

    });

}


const photoRender ={

    asCard: function(photo) {

        let html = `<div class="col-md-4">
        <div class= "card">
        <a href= "photo_detail.html?photoId=${photo.photoId}">
        <img src= "${photo.url}" class= "card-img-top">
        </a >
        <div class= "card-body">
        <h5 class= "card-title text-center">${photo.title} </h5 >
        <p class= "card-text">${photo.description} </p >
        <a href= "user_profile.html?userId=${photo.userId}" class= "user-link user-name">
        ${photo.userId} </a >
        </div >
        </div >
        </div >`;
       
        let card = parseHTML(html);
        loadUsernameCard(card , photo.userId ) ;
    
        return card;
    },

    asCard2: function(photo) { //QUITA EL @ 

        let html = `<div class="col-md-4">
        <div class= "card">
        <a href= "photo_detail.html?photoId=${photo.photoId}">
        <img src= "${photo.url}" class= "card-img-top">
        </a >
        <div class= "card-body">
        <h5 class= "card-title text-center"> ${photo.title} </h5 >
        <p class= "card-text">${photo.description} </p >
        </div >
        </div >
        </div >`;
    
        let card = parseHTML(html);
        loadUsernameCard(card , photo.userId ) ;
    
        return card;
    },

    asCard3: function(photo) { //QUITA EL @ Y PONE EL CANDADO

        let html = `<div class="col-md-4">
        <div class= "card">
        <a href= "photo_detail.html?photoId=${photo.photoId}">
        <img src= "${photo.url}" class= "card-img-top">
        </a >
        <div class= "card-body">
        <h5 class= "card-title text-center">&#128274 ${photo.title} </h5 >
        <p class= "card-text">${photo.description} </p >
        </div >
        </div >
        </div >`;
    
        let card = parseHTML(html);
        loadUsernameCard(card , photo.userId ) ;
    
        return card;
    },

    asDetails: function (photo) {

        function f(event) {
       
            let answer = confirm("Do you really want to delete this photo ?") ;
    
            if(answer) {
            photosAPI.delete(photoId)
            .then( data => window.location.href = "index.html")
            .catch( error => console.log(error));
            }
        };

        let html = `<div class= "photo-details">
        <h3 >${photo.title} </h3 >
        <h6 >${photo.description} </h6 >
        <p> Uploaded by <a href= "user_profile.html?userId=${photo.userId}" class= "user-link user-name">
        ${photo.userId} </a > on ${photo.date} </p >
        <a id="editar_foto">&#128396 Editar</a> <a id="borrar_foto"  >&#128465 Borrar</a>
        <hr >
        <img src= "${photo.url}" class= "img-fluid">
        </div >`;

        let photoDetails = parseHTML(html);
        loadUsernameCardDetail(photoDetails , photo.userId ) ;
        return photoDetails;
    }

};

//<a href="edit_photo.html?photoId=${photo.photoId}" + photoId;">&#128396 Editar</a> <a (click)='${f}' href="index.html">Borrar </a>



export {photoRender}