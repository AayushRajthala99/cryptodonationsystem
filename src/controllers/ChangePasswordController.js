async function index(req, res) {
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

    res.render("../views/changepassword", {
      result: result,
      errorMessage: errorMessage
    });
  } catch (err) {
    res.render('error', {
      error: 'ERROR LOADING CHANGE PASSWORD PAGE'
    });
  }
}

async function update(req, res, next) {
  res.send("HELLO WORLD");
}

module.exports = {
  index,
  update,
};