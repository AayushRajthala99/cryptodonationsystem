const { logger } = require("../utils/logger");

const {
  getLoginInfo,
} = require('../models/Login.model');

async function index(req, res) {
  try {
    res.render('login');
  } catch (err) {
    logger.error(`${err}`);
    res.render('error', {
      error: "ERROR LOADING LOGIN PAGE"
    });
  }
}

async function view(req, res) {
  try {
    const {
      email,
      password
    } = req.body;

    const loginInfo = await getLoginInfo(email);

    if (loginInfo.status && (email == loginInfo.result[0].email) && (password == loginInfo.result[0].password)) {
      res.redirect('/dashboard');
    }
  } catch (error) {
    logger.error(`${err}`);
    res.render('error', {
      error: "This User Doesn't Exist"
    });
  }
}

module.exports = {
  index,
  view
};