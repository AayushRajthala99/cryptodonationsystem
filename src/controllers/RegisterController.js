const db = require('../../config/mysql');

const {
  userRegistration,
} = require('../models/Register');


async function index(req, res, next) {
  try {
    res.render("../views/register/index");
  } catch (err) {
    res.send("ERROR LOADING SIGNUP PAGE");
  }
}

async function create(req, res, next) {
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
}

module.exports = {
  index,
  create,
};