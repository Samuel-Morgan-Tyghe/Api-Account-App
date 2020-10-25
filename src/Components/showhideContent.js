











 export function showLogin(){
    document.getElementById('loginVisibility').style.display = 'flex';
    document.getElementById('createAccountVisibility').style.display = 'none';
    document.getElementById('emailValidate').style.display = 'none';

}


export function showCreateAccount(){
    document.getElementById('createAccountVisibility').style.display = 'flex';
    document.getElementById('loginVisibility').style.display = 'none';
    document.getElementById('emailValidate').style.display = 'none';

    
}
export function showLoginRedirect(){

    document.getElementById('emailInUse').style.display = 'flex';
    document.getElementById('loginRedirect').style.display = 'flex';
}


export function showCreateAccountRedirect(){

    document.getElementById('emailNotInUse').style.display = 'flex';
    document.getElementById('CreateAccountRedirect').style.display = 'flex';
}

export function showIncorrectPassword(){

    document.getElementById('passwordIncorrect').style.display = 'flex';

}



export function hideRedirect(){
    document.getElementById('emailNotInUse').style.display = 'none';
    document.getElementById('CreateAccountRedirect').style.display = 'none';
    document.getElementById('emailInUse').style.display = 'none';
    document.getElementById('loginRedirect').style.display = 'none';
    document.getElementById('passwordIncorrect').style.display = 'none';



}


function showHomepage(){

    // show homepage elements , login 
    //api , create update delete 

}

function hideHomepage(){

    // hide homepage elements , logout

}




