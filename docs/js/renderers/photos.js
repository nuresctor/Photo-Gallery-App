/* 

El const define una clase o módulo, y dentro tenemos una funcion

Esto nos permite añadir una foto a la galería dados sus atributos, sin tener que preocuparnos de generar su estructura HTML

*/

/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */
    

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
        <p class= "text-right user-name">${photo.userId} </p >
        </div >
        </div >
        </div >`;
    
        let card = parseHTML(html);
        loadUsernameCard(card , photo.userId ) ;
    
        return card;
    },

    asDetails: function (photo) {
        let html = `<div class= "photo-details">
        <h3 >${photo.title} </h3 >
        <h6 >${photo.description} </h6 >
        <p> Uploaded by <a href= "user_profile.html" class= "user-link user-name">
        ${photo.userId} </a > on ${photo.date} </p >
        <hr >
        <img src= "${photo.url}" class= "img-fluid">
        </div >`;

        let photoDetails = parseHTML(html);
        loadUsernameCardDetail(photoDetails , photo.userId ) ;
        return photoDetails;
    }

};

/*
    función para añadir el nombre de usuario a una tarjeta ya creada de manera asíncrona, dadas
    la tarjeta en sí (ya convertida en un nodo DOM) y el ID de usuario cuyo nombre deseamos
    obtener
*/

function loadUsernameCard(card , userId ) {
    usersAPI.getById(userId)
    .then( users => {
        let username = users[0].username;
        console.log(username);
        let p = card.querySelector("p.user-name") ;
        p.textContent = "@" + username;

    });

}

function loadUsernameCardDetail(card , userId ) {
    usersAPI.getById(userId)
    .then( users => {
        let username = users[0].username;
        console.log(username);
        let p = card.querySelector("a.user-name") ;
        console.log(card.querySelector("a.user-name"));
        console.log(p.textContent);
        p.textContent = "@" + username;

    });

}

export {photoRender}