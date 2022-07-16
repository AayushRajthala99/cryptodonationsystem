const yup = require('yup');
const {
    getColumnInfo,
} = require('../utils/utils');

let inputLength = {
    min: 3,
    max: 60
}

//Validation Schema for Change Password...
const linkSchemaUpdate = yup.object({
    body: yup.object({
        oldpassword: yup
            .string()
            .min(inputLength.min, '* INVALID VALUE LENGTH!')
            .max(inputLength.max, '* INVALID VALUE LENGTH!')
            .required('* OLD PASSWORD REQUIRED!')
            // .test('* INCORRECT PASSWORD!', '* INCORRECT PASSWORD!', () => {
            //     return userArray.result.length === 1;
            // })
            ,

        newpassword: yup
            .string()
            .min(inputLength.min, '* INVALID VALUE LENGTH!')
            .max(inputLength.max, '* INVALID VALUE LENGTH!')
            .required('* PASSWORD REQUIRED!'),

        confirmpassword: yup
            .string()
            .min(inputLength.min, '* INVALID VALUE LENGTH!')
            .max(inputLength.max, '* INVALID VALUE LENGTH!')
            .oneOf([yup.ref('newpassword'), null], '* PASSWORD MISMATCH!')
            .required('* PASSWORD REQUIRED!'),
    })
});

// Validation Function for Change Password Update...
const validateUpdate = (schema) => async (req, res, next) => {
    try {
        const {
            oldpassword,
            newpassword,
            confirmpassword,
        } = req.body;
        // let id = req.sessionID || req.session.id;

        const result = {
            oldpassword: oldpassword,
            newpassword: newpassword,
            confirmpassword: confirmpassword,
        };

        // userArray = await getColumnInfo('login', 'user_id', 'user_id', id);
        // if (userArray.status) {
        try {
            await schema.validate({
                body: req.body,
            }, {
                abortEarly: false
            }, );
            return next();
        } catch (error) {
            const errorMessage = {
                oldpassword: null,
                newpassword: null,
                confirmpassword: null,
            };

            // Storing error message...
            error.inner.forEach((e) => {
                if (e.path.slice(5) == 'oldpassword') {
                    errorMessage.oldpassword = e.errors[0];
                } else if (e.path.slice(5) == 'newpassword') {
                    errorMessage.newpassword = e.errors[0];
                } else if (e.path.slice(5) == 'confirmpassword') {
                    errorMessage.confirmpassword = e.errors[0];
                }
            });

            res.render('changepassword', {
                result: result,
                errorMessage: errorMessage
            });
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    linkSchemaUpdate,
    validateUpdate,
}