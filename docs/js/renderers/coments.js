"use strict"
import {parseHTML} from "/js/utils/parseHTML.js"
import {comentsAPI} from "/js/api/coments.js";
import {usersAPI} from "/js/api/users.js";

const comentRender = {
    

    asCardGallery: function (coments, photoId) {

        function asCard(c,user,f){
            
            console.log("HOLA");
            let html = `<li>
            <article class="comment-inner">
            <div class= "flex-rox align-top">
            <div class= "flex-col">
            <div class= "comment-author mr-half"> 
            <a class="basura">🗑</a>
            <img src= "${user.avatarUrl}" class= "img-circle" width="50" height="50" > <h6 style="font-weight:50"> ${c.date} </h6 > 
            
            <div class= "flex-col flex-grow">
            <cite class="strong fn">
            <a href= "user_profile.html?userId=${c.userId}" class= "user-link user-name" >
            ${user.username} </a >
            <span class="says">dice:</span>
            <div class= "comment-content">
            <p style="font-weight:100"> ${c.value} </p >
            <hr>
            </div>
            </cite>
            </div >
            </div >
            </div >
            </div >
            </article >
            </li >`;
           
            let card = parseHTML(html);
            console.log("HOLA2");
            return card;
        }

        let comentContainer = parseHTML('<div class= "coment-gallery"> </div >');
        let row = parseHTML('<h1 > COMENTARIOS </h1 >');
        let row1 = parseHTML('<hr>');
        let row2 = parseHTML('<ol class="comment-list">');
        //let row2 = parseHTML('</ol>');

        comentContainer.appendChild(row);
        comentContainer.appendChild(row1);
        comentContainer.appendChild(row2);

        

        for(let c of coments){
            //console.log("COMENTARIO "+c.value);
            usersAPI.getById(c.userId) //persona que ha escrito ese comentario
            .then( users => {

                if(photoId==c.photoId){ //muestrame solo los comentarios de esa foto

             
                    let card = asCard(c,users[0]);
                    row.appendChild(card);
        
                    }

                users[0]
            })
            .catch( error => console.log(error) ) ;

        }

        //comentContainer.appendChild(row2);

        return comentContainer;
    },
}
export {comentRender};