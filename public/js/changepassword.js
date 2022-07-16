"use strict";
let inputLength = {
    min: 3,
    max: 60
}

const changepasswordForm = document.querySelector("#changepasswordform");

changepasswordForm.addEventListener('submit', event => {
    event.preventDefault();
    const correctSubmissionFlag = changepasswordFormValidation();

    if (correctSubmissionFlag) {
        changepasswordForm.submit();
    }
})

function changepasswordFormValidation() {

    let oldpasswordErrorFlag, newpasswordErrorFlag, confirmpasswordErrorFlag;

    //Registration Form Value Acquisition...
    let oldpassword = changepasswordForm.querySelector("#oldpassword");
    let newpassword = changepasswordForm.querySelector("#newpassword");
    let confirmpassword = changepasswordForm.querySelector("#confirmpassword");

    let oldpasswordValue = oldpassword.value.trim();
    let newpasswordValue = newpassword.value.trim();
    let confirmpasswordValue = confirmpassword.value.trim();

    //Validation for Old Password...
    if (oldpasswordValue === '') {
        oldpasswordErrorFlag = true;
        setErrorFor(oldpassword, '* PASSWORD REQUIRED!');
    } else if (valueLength(oldpasswordValue) < inputLength.min || valueLength(oldpasswordValue) > inputLength.max) {
        oldpasswordErrorFlag = true;
        setErrorFor(oldpassword, '* INVALID VALUE LENGTH!');
    } else {
        setSuccessFor(oldpassword);
    }

    //Validation for New Password...
    if (newpasswordValue === '') {
        newpasswordErrorFlag = true;
        setErrorFor(newpassword, '* PASSWORD REQUIRED!');
    } else if (valueLength(newpasswordValue) < inputLength.min || valueLength(newpasswordValue) > inputLength.max) {
        newpasswordErrorFlag = true;
        setErrorFor(newpassword, '* INVALID VALUE LENGTH!');
    } else {
        setSuccessFor(newpassword);
    }

    //Validation for Confirm Password...
    if (confirmpasswordValue === '') {
        confirmpasswordErrorFlag = true;
        if (newpasswordValue) {
            setErrorFor(confirmpassword, '* PASSWORD MISMATCH!');
        } else {
            setErrorFor(confirmpassword, '* PASSWORD REQUIRED!');
        }
    } else if (!passwordCheck(newpasswordValue, confirmpasswordValue)) {
        confirmpasswordErrorFlag = true;
        setErrorFor(confirmpassword, '* PASSWORD MISMATCH!');
    } else if (valueLength(confirmpasswordValue) < inputLength.min || valueLength(confirmpasswordValue) > inputLength.max) {
        confirmpasswordErrorFlag = true;
        setErrorFor(confirmpassword, '* INVALID VALUE LENGTH!');
    } else {
        confirmpasswordErrorFlag = false;
        setSuccessFor(confirmpassword);
    }

    function setErrorFor(input, message) {
        const formControl = changepasswordForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = message;
    }

    function setSuccessFor(input) {
        const formControl = changepasswordForm.querySelector("#labelcontainer" + input.id);
        const errordiv = formControl.querySelector('.form-error');
        errordiv.innerText = "";
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

    if (oldpasswordErrorFlag == false && newpasswordErrorFlag == false && confirmpasswordErrorFlag == false) {
        return true;
    } else {
        return false;
    }
}