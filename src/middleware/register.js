const {
    check,
    validationResult
} = require('express-validator');

const register = require("../models/Register");

const getUserInfo = require("../models/Register");

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

// // Server side validation for New User Registration...
// const linkSchemaStore = yup.object({
//     body: yup.object({
//         fullname: yup
//             .required('* NAME REQUIRED!'),
//         email: yup
//             .test(
//                 "* INVALID EMAIL!",
//                 (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
//             )
//             .test('* EXISTING EMAIL!', async (res, value) => {
//                 return !fromArray.result.includes(value.originalValue);
//             })
//             .required('* EMAIL REQUIRED!'),
//         password: yup
//             .required('* PASSWORD REQUIRED!'),
//         confirmpassword: yup
//             .required('* PASSWORD REQUIRED')
//             .matches([yup.ref('password')], '* PASSWORD MISMATCH!')
//     })
// });

async function schemaValidation() {
    try {
        const email = req.body;
        let userInfo = await getUserInfo(email);
        if (userInfo.status) {
            check('fullname')
                .isEmpty()
                .withMessage('* NAME REQUIRED!')

            check('email')
                .isEmpty()
                .withMessage('* EMAIL REQUIRED!')
                .test(
                    "* INVALID EMAIL!",
                    (email) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)
                )
                .test('* EXISTING EMAIL!', async (res, value) => {
                    return !fromArray.result.includes(value.originalValue);
                })

            check('password')
                .isEmpty()
                .withMessage('* PASSWORD REQUIRED!')

            check('confirmpassword')
                .isEmpty()
                .withMessage('* PASSWORD REQUIRED!')
                .equals(confirmpassword)
                .withMessage('* PASSWORD MISMATCH!');
        } else {
            console.log("User Info Fetch Error");
        }
    } catch (error) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            })
        }
    }
}

module.exports = {
    schemaValidation
}