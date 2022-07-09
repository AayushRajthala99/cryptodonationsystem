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
                (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
            )
            .test('* EXISTING EMAIL!', async (res, value) => {
                return !userArray.result.includes(value.originalValue);
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

        const results = {
            fullname: fullname,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
        };

        userArray = await getColumnInfo('email', email);
        // console.log("USER ARRAY === ",userArray);
        if (userArray.status) {
            try {
                await schema.validate({
                    body: req.body,
                }, {
                    abortEarly: false
                }, );
                return next();
            } catch (error) {
                let errorMessage = {
                    fullname: null,
                    email: null,
                    password: null,
                    confirmpassword: null,
                };
                // console.log(error.inner);

                res.render('../views/register/index', {
                    results: [results], errorMessage : errorMessage
                });
                // return res.status(400).json({
                //     error
                // });
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