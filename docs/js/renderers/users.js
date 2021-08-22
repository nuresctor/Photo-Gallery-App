/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

const userRender ={

    asDetails: function (user) { //DATOS USUARIO

        if(user.avatarUrl === ""){ //SI NO SE AÑADE FOTO DE PERFIL, SE AÑADE ESA
            user.avatarUrl = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
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
