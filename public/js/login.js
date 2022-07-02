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

    let nameErrorFlag, passwordErrorFlag;

    //Login Form Value Acquisition...
    let userName = loginForm.querySelector("#username");

    let password = loginForm.querySelector("#password");
  

    let userNameValue = userName.value.trim();
    let passwordValue = password.value.trim();
    

    //Validation for usernames...
    if (userNameValue === '') {
        nameErrorFlag = true;
        setErrorFor(userName, '* NAME REQUIRED!');
    } else {
        nameErrorFlag = false;
        setSuccessFor(userName);
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

 

    if (nameErrorFlag == false  && passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}