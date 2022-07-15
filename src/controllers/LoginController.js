const {
  getLoginInfo,
} = require('../models/Login.model');

async function index(req, res) {
  try {
    res.render("../views/login.ejs");
  } catch (err) {
    res.send("ERROR LOADING LOGIN PAGE");
  }
}

async function view(req,res) {
  try {
    const {
      email,
      password
    } = req.body;
    
    const loginInfo = await getLoginInfo(email);
    console.log(loginInfo.result);
    if(loginInfo.status && (email == loginInfo.result[0].email) && (password == loginInfo.result[0].password)){
      res.redirect('/dashboard');
    }
  } catch (error) {
    res.send("This User Doesn't Exist");
  }
}

module.exports = {
  index,
  view
};