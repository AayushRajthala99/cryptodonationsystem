const yup = require("yup");
const {
  getColumnInfo
} = require("../utils/utils");

let inputLength = {
  min: 3,
  max: 60,
};

//Validation Schema for login...
const linkSchemaLogin = yup.object({
  body: yup.object({
    email: yup
      .string()
      .min(inputLength.min, "* INVALID VALUE LENGTH!")
      .max(inputLength.max, "* INVALID VALUE LENGTH!")
      .required("* EMAIL REQUIRED!")
      .test("* USER DOESN'T EXIST!", "* USER DOESN'T EXIST!", () => {
        return userArray.result.length !== 0;
      }),

    password: yup
      .string()
      .min(inputLength.min, "* INVALID VALUE LENGTH!")
      .max(inputLength.max, "* INVALID VALUE LENGTH!")
      .required("* PASSWORD REQUIRED!"),
  }),
});

// Validation Function for login store ...
const validateLogin = (schema) => async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;

    const result = {
      email: email,
      password: password,
    };

    userArray = await getColumnInfo("user", "email", "email", email);
    if (userArray.status) {
      try {
        await schema.validate({
          body: req.body,
        }, {
          abortEarly: false,
        });
        return next();
      } catch (error) {
        const errorMessage = {
          email: null,
          password: null,
        };

        // Storing error message...
        error.inner.forEach((e) => {
          if (e.path.slice(5) == "email") {
            errorMessage.email = e.errors[0];
          } else if (e.path.slice(5) == "password") {
            errorMessage.password = e.errors[0];
          }
        });
        res.render("login", {
          result: result,
          errorMessage: errorMessage,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  linkSchemaLogin,
  validateLogin,
};