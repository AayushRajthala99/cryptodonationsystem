const db = require('../../config/mysql');

const {
  userRegistration,
} = require('../models/Register.model');


async function index(req, res, next) {
  try {
    const result = {
      fullname: null,
      email: null,
      password: null,
      confirmpassword: null,
    }

    const errorMessage = {
      fullname: null,
      email: null,
      password: null,
      confirmpassword: null,
    };

    res.render("../views/register/index", {
      result: result, errorMessage: errorMessage
    });
  } catch (err) {
    res.send("ERROR LOADING SIGNUP PAGE");
  }
}

async function store(req, res, next) {
  try {
    const {
      fullname,
      email,
      password,
      confirmpassword,
    } = req.body;

    if (password === confirmpassword) {
      const result = await userRegistration(fullname, email, confirmpassword);
      if (result.status) {
        res.redirect('/');
      } else {
        console.log("Something Went Wrong While Registering User");
      }
    } else {
      console.log("Password Mismatch");
    }
  } catch (err) {
    res.send("ERROR REGISTERING USER");
  }
}

module.exports = {
  index,
  store,
};