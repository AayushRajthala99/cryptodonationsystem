const yup = require('yup');

const register = require("../models/Register.model");

async function columnValues(column, email) {
    try {
        const result = await register.findAll({
            attributes: [column],
            where: {
                email: email,
                deleted_at: null
            }
        })
        return {
            status: true,
            result: result.map((value) => value[column])
        };
    } catch (error) {
        throw error;
    }
}

// Server side validation for New User Registration...
const linkSchemaStore = yup.object({
    body: yup.object({
        fullname: yup
            .string()
            .required('* NAME REQUIRED!'),
        email: yup
            .string()
            .test(
                "* INVALID EMAIL!",
                (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
            )
            .test('* EXISTING EMAIL!', async (res, value) => {
                return !fromArray.result.includes(value.originalValue);
            })
            .required('* EMAIL REQUIRED!'),
        password: yup
            .string()
            .required('* PASSWORD REQUIRED!'),
        confirmpassword: yup
            .string()
            .required('* PASSWORD REQUIRED')
            .matches([yup.ref('password')], '* PASSWORD MISMATCH!')
    })
});

// Validation function for create
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

        fromArray = await columnValues('email', email);
        if (fromArray.status) {
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
                console.log(error);

                res.render('../views/register/index', {
                    results: [results],
                });
                return res.status(400).json({
                    error
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