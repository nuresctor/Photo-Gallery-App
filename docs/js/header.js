import {sessionManager} from "/js/utils/session.js";
" use strict ";

const cabecera ={

     showUser: function() {

        let title = document.getElementById("navbar-title") ;
        //console.log(title);
        let text;
    
        if ( sessionManager.isLogged() ) {
            let username = sessionManager.getLoggedUser().username;
            let id=sessionManager.getLoggedUser().userId;
            let xdios='';
            text = "Hola, @" + username;
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
        
    },

    //FUNCION DE CERRAR SESIÓN

     addLogoutHandler: function() {

        let logoutButton = document.getElementById(" navbar-logout ") ;

        logoutButton.addEventListener("click", function () {
            sessionManager.logout() ;
            window.location.href = "index.html";
        }) ;
    
    },

     hideHeaderOptions: function() {
    
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

};

export {cabecera}