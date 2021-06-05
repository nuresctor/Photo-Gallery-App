" use strict ";
import {messageRenderer} from "/js/renderers/messages.js";
import {userValidator} from "/js/validators/users.js";
import {sessionManager} from "/js/utils/session.js";
import {authAPI} from "/js/api/auth.js";

function showUser() {

    let title = document.getElementById("navbar-title") ;
    console.log(title);
    let text;

    if ( sessionManager.isLogged() ) {
        let username = sessionManager.getLoggedUser().username;
        text = "Hi, @" + username;
    } else {
        text = "Anonymous";
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
    
    console.log("HOLA");

    if ( sessionManager.isLogged() ) {
        headerRegister.style.display = "none";
        headerLogin.style.display = "none";
    } else {
        headerRecent.style.display = "none";
        headerCreate.style.display = "none";
        headerLogout.style.display = "none";
    }

}

function main(){

    showUser();
    addLogoutHandler();
    hideHeaderOptions();

    let form=document.getElementById("register-form");
    form.onsubmit=formHandler;
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

document.addEventListener("DOMContentLoaded",main);