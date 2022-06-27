"use strict";

const registrationForm = document.querySelector("#registrationform");

registrationForm.addEventListener('submit', event => {
    const correctSubmissionFlag = registrationFormValidation();
    if (correctSubmissionFlag) {
        registrationForm.submit();
    }
    event.preventDefault();
})

function registrationFormValidation() {

    let walletIDErrorFlag, emailErrorFlag, passwordErrorFlag;
    //Registration Form Value Acquisition...

    let fullName = registrationForm.querySelector("#fullname");
    let walletID = registrationForm.querySelector("#walletid");
    let email = registrationForm.querySelector("#email");
    let password = registrationForm.querySelector("#password");
    let confirmpassword = registrationForm.querySelector("#confirmpassword");

    let fullNameValue = fullName.value.trim();
    let walletIDValue = walletID.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let confirmpasswordValue = confirmpassword.value.trim();

    //Validation for WalletID...
    if (walletIDValue === '') {
        walletIDErrorFlag = true;
        setErrorFor(walletID, '* WALLET ID REQUIRED!');
    } else if (!isWalletID(walletIDValue)) {
        walletIDErrorFlag = true;
        setErrorFor(walletID, '* INVALID FORMAT');
    } else {
        walletIDErrorFlag = false;
        setSuccessFor(walletID);
    }

    //Validation for Email...
    if (emailValue === '') {
        emailErrorFlag = true;
        setErrorFor(email, '* EMAIL REQUIRED!');
    } else if (!isEmail(emailValue)) {
        emailErrorFlag = true;
        setErrorFor(email, '* INVALID FORMAT');
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

    //Validation for Confirm Password...
    if (passwordValue && confirmpasswordValue === '') {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* CONFIRM PASSWORD REQUIRED!');
    } else if (!passwordCheck(passwordValue, confirmpasswordValue)) {
        passwordErrorFlag = true;
        setErrorFor(confirmpassword, '* PASSWORD MISMATCH');
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

    if (walletIDErrorFlag == false || emailErrorFlag == false || passwordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}