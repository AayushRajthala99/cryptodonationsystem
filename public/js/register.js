"use strict";
let inputLength = {
    min: 3,
    max: 60
}

const registrationForm = document.querySelector("#registrationform");

registrationForm.addEventListener('submit', event => {
    event.preventDefault();
    const correctSubmissionFlag = registrationFormValidation();

    if (correctSubmissionFlag) {
        registrationForm.submit();
    }
})

function registrationFormValidation() {

    let nameErrorFlag, emailErrorFlag, passwordErrorFlag;

    //Registration Form Value Acquisition...
    let fullName = registrationForm.querySelector("#fullname");
    let email = registrationForm.querySelector("#email");
    let password = registrationForm.querySelector("#password");
    let confirmpassword = registrationForm.querySelector("#confirmpassword");

    let fullNameValue = fullName.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let confirmpasswordValue = confirmpassword.value.trim();

    //Validation for FullName...
    if (fullNameValue === '') {
        nameErrorFlag = true;
        setErrorFor(fullName, '* NAME REQUIRED!');
    } else if (valueLength(fullNameValue) < inputLength.min || valueLength(fullNameValue) > inputLength.max) {
        nameErrorFlag = true;
        setErrorFor(fullName, '* INVALID VALUE LENGTH!');
    } else {
        nameErrorFlag = false;
        setSuccessFor(fullName);
    }

    //Validation for Email...
    if (emailValue === '') {
        emailErrorFlag = true;
        setErrorFor(email, '* EMAIL REQUIRED!');
    } else if (!isEmail(emailValue)) {
        emailErrorFlag = true;
        setErrorFor(email, '* INVALID FORMAT!');
    } else if (valueLength(emailValue) < inputLength.min || valueLength(emailValue) > inputLength.max) {
        emailErrorFlag = true;
        setErrorFor(email, '* INVALID VALUE LENGTH!');
    } else {
        emailErrorFlag = false;
        setSuccessFor(email);
    }

    //Validation for Password...
    if (passwordValue === '') {
        passwordErrorFlag = true;
        setErrorFor(password, '* PASSWORD REQUIRED!');
    } else if (valueLength(passwordValue) < inputLength.min || valueLength(passwordValue) > inputLength.max) {
        passwordErrorFlag = true;
        setErrorFor(password, '* INVALID VALUE LENGTH!');
    } else {
        setSuccessFor(password);
    }

    //Validation for Confirm Password...
    if (confirmpasswordValue === '') {
        passwordErrorFlag = true;
        if (passwordValue) {
            setErrorFor(confirmpassword, '* PASSWORD MISMATCH!');
        } else {
            setErrorFor(confirmpassword, '* PASSWORD REQUIRED!');
        }
    } else if (!passwordCheck(passwordValue, confirmpasswordValue)) {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* PASSWORD MISMATCH!');
    } else if (valueLength(confirmpasswordValue) < inputLength.min || valueLength(confirmpasswordValue) > inputLength.max) {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* INVALID VALUE LENGTH!');
    } else {
        passwordErrorFlag = false;
        setSuccessFor(confirmpassword);
    }

    function setErrorFor(input, message) {
        const formControl = registrationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = registrationForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
    }

    function isWalletID(id) {
        return /^0x[a-fA-F0-9]{40}$/g.test(id);
    }

    function isEmail(email) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
    }

    function passwordCheck(password1, password2) {
        if (password1 === password2) {
            return true;
        } else {
            return false;
        }
    }

    function valueLength(value) {
        return value.toString().length;
    }

    if (nameErrorFlag == false && emailErrorFlag == false && passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}