/*IMPORTACIONES*/

" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {userValidator} from "/js/validators/users.js";
import {sessionManager} from "/js/utils/session.js";
import {authAPI} from "/js/api/auth.js";

/*FUNCIONES AUXILIARES*/

function showUser() {

    let title = document.getElementById("navbar-title") ;
    //console.log(title);
    let text;

    if ( sessionManager.isLogged() ) {
        let username = sessionManager.getLoggedUser().username;
        let id=sessionManager.getLoggedUser().userId;
        let xdios='';
        text = "Hi, @" + username;
        title.removeAttribute("href");
    //console.log("HOLAAA"+sessionManager.getLoggedUser().userId);
    //console.log("HOLAAA"+title.hasAttribute("href"));
    xdios=xdios+'user_profile.html?userId='+id;
    //console.log("ADIOSSS"+xdios);
    title.setAttribute("href",xdios);
    //console.log("HOLAAA"+title.hasAttribute("href"));
    } else {
        text = "Anonymous";
        title.removeAttribute("href");
       
    }
    
    title.textContent = text;
    
}


function addLogoutHandler() {

    let logoutButton = document.getElementById(" navbar-logout ") ;

    logoutButton.addEventListener("click", function () {
        sessionManager.logout() ;
        window.location.href = "index.html";
    }) ;

}

function hideHeaderOptions() {

    let headerRegister = document.getElementById(" navbar-register ") ;
    let headerLogin = document.getElementById(" navbar-login ") ;
    let headerLogout = document.getElementById(" navbar-logout ") ;
    let headerRecent = document.getElementById(" navbar-recent ") ;
    let headerCreate = document.getElementById(" navbar-create ") ;

    if ( sessionManager.isLogged() ) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        //headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
    }

}

function formHandler(event){
    event.preventDefault();
    let form=event.target;
    let formData=new FormData(form);
    sendLogin(formData);
}

function sendLogin(formData){
    authAPI.login(formData)
        .then(loginData=>{
            let sessionToken=loginData.sessionToken;
            let loggedUser=loginData.user;
            sessionManager.login(sessionToken,loggedUser);
            window.location.href="index.html";
        })
        .catch(error=>messageRenderer.showErrorMessage(error));
}

function main(){

    showUser();
    addLogoutHandler();
    hideHeaderOptions();

    let form=document.getElementById("register-form");
    form.onsubmit=formHandler;
}

document.addEventListener("DOMContentLoaded",main);