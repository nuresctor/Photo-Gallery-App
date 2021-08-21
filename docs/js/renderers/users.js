/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

const userRender ={

    asDetails: function (user) {

        if(user.avatarUrl === ""){
            user.avatarUrl = "https://www.movilzona.es/app/uploads-movilzona.es/2019/05/Foto-de-Perfil-en-WhatsApp.jpg?x=480&y=375&quality=20";
        }

        let html = `<div class= "navbar-brand">
        <img style="border: 2px solid; color: black;" src="${user.avatarUrl}" alt="Foto de perfil" width="200" height="200">
        <h6 >&#64${user.username} </h6 >
        <h6 >&#128100 ${user.firstName} ${user.lastName} </h6 >
        <h6 >&#128232 ${user.email} </h6 >
        <h6 >&#9742 ${user.telephone} </h6 >
        <hr >
        </div >`;

        console.log(user.telephone);
        console.log(user.avatarUrl);
        let userDetails = parseHTML(html);
        console.log(userDetails);
        return userDetails;
    }

};

export {userRender}
