/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

const userRender ={

    asDetails: function (user) {
        let html = `<div class= "navbar-brand">
        <h6 >&#64${user.username} </h6 >
        <h6 >&#128100 ${user.firstName} ${user.lastName} </h6 >
        <h6 >&#128232 ${user.email} </h6 >
        <h6 >&#9742 ${user.telephone} </h6 >
        <hr >
        </div >`;

        console.log(user.telephone);
        let userDetails = parseHTML(html);
        console.log(userDetails);
        return userDetails;
    }

};

export {userRender}
