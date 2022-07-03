"use strict";

const loginForm = document.querySelector("#loginform");

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const correctSubmissionFlag = loginFormValidation();
    console.log(correctSubmissionFlag);

    if (correctSubmissionFlag) {
        loginForm.submit();
    }
})

function loginFormValidation() {

    let emailErrorFlag, passwordErrorFlag;

    //Login Form Value Acquisition...
    let email = loginForm.querySelector("#email");

    let password = loginForm.querySelector("#password");
  

    let emailNameValue = email.value.trim();
    let passwordValue = password.value.trim();
    

    //Validation for usernames...
    if (emailNameValue === '') {
        emailErrorFlag = true;
        setErrorFor(email, '* EMAIl REQUIRED!');
    } else {
        emailErrorFlag = false;
        setSuccessFor(email);
    }


    //Validation for Password...
    if (passwordValue === '') {
        passwordErrorFlag = true;
        setErrorFor(password, '* PASSWORD REQUIRED!');
    } else {
        setSuccessFor(password);
    }


    function setErrorFor(input, message) {
        const formControl = loginForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = loginForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

 

    if (emailErrorFlag == false  && passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}