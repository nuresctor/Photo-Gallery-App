/* ---------------------------------- CABECERA ---------------------------------------------- */
"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {photosAPI} from "/js/api/photos.js";
import {usersAPI} from "/js/api/users.js";
/* ---------------------------------- CUERPO ---------------------------------------------- */

const userRender ={

    asDetails: function (user) {
        let html = `<div class= "navbar-brand">
        <a href= "user_profile.html?userId=${user.userId}">
        <h6 >username: ${user.username} </h6 >
        <h6 >email: ${user.email} </h6 >
        <h6 >telephone: ${user.telephone} </h6 >
        <hr >
        </div >`;

        console.log(user.telephone);
        let userDetails = parseHTML(html);
        console.log(userDetails);
        return userDetails;
    }

};

export {userRender}
