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

    res.render('register/index', {
      result: result,
      errorMessage: errorMessage
    });
  } catch (err) {
    res.render('error', {
      error: "ERROR LOADING SIGNUP PAGE"
    });
  }
}

async function store(req, res, next) {
  try {
    const {
      fullname,
      email,
      confirmpassword,
    } = req.body;

    const result = await userRegistration(fullname, email, confirmpassword);
    if (result.status) {
      res.redirect('/');
    }
  } catch (err) {
    res.render('error', {
      error: "Something Went Wrong While Registering User"
    });
  }
}

module.exports = {
  index,
  store,
};