const yup = require('yup');

const {
    getColumnInfo,
} = require('../models/Register.model');

//Validation Schema for User Registration...
const linkSchemaStore = yup.object({
    body: yup.object({
        fullname: yup
            .string()
            .required('* NAME REQUIRED!'),

        email: yup
            .string()
            .required('* EMAIL REQUIRED!')
            .test("* INVALID EMAIL!",
                (value) => {/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)}
            )
            .test('* EXISTING EMAIL!', async (res, value) => {
                return !userArray.result.includes(value);
            }),

        password: yup
            .string()
            .required('* PASSWORD REQUIRED!'),

        confirmpassword: yup
            .string()
            .required('* PASSWORD REQUIRED')
            .matches([yup.ref('password')], '* PASSWORD MISMATCH!'),
    })
});

// Validation Function for Registration Store...
const validateStore = (schema) => async (req, res, next) => {
    try {
        const {
            fullname,
            email,
            password,
            confirmpassword,
        } = req.body;

        const result = {
            fullname: fullname,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        };

        userArray = await getColumnInfo('email', email);
        if (userArray.status) {
            try {
                await schema.validate({
                    body: req.body,
                }, {
                    abortEarly: false
                }, );
                return next();
            } catch (error) {
                const errorMessage = {
                    fullname: null,
                    email: null,
                    password: null,
                    confirmpassword: null,
                };

                // Storing error message
                error.inner.forEach((e) => {
                    console.log(e.errors[0]);
                    if (e.path.slice(5) == 'fullname') {
                        errorMessage.fullname = e.errors[0];
                    }
                    if (e.path.slice(5) == 'email') {
                        errorMessage.email = e.errors[0];
                    }
                    if (e.path.slice(5) == 'password') {
                        errorMessage.password = e.errors[0];
                    }
                    if (e.path.slice(5) == 'confirmpassword') {
                        errorMessage.confirmpassword = e.errors[0];
                    }
                });

                res.render('../views/register/index', {
                    result: result,
                    errorMessage: errorMessage
                });
            }
        } else {
            res.render('error');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    linkSchemaStore,
    validateStore,
}