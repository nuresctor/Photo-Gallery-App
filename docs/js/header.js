import {sessionManager} from "/js/utils/session.js";
" use strict ";

const cabecera ={

     showUser: function() { //FUNION QUE AÑADE LA PERSONA QUE ESTA LOGUEADA EN LA CABECERA

        let title = document.getElementById("navbar-title") ;
        let text;
    
        if ( sessionManager.isLogged() ) {
            let username = sessionManager.getLoggedUser().username;
            let id=sessionManager.getLoggedUser().userId;
            let xdios='';
            text = "Hola, @" + username;
            title.removeAttribute("href");
     
            xdios=xdios+'user_profile.html?userId='+id;
        
            title.setAttribute("href",xdios);
     
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