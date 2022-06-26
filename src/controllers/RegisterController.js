async function index(req, res, next) {
  try {
    res.render("../views/register/index");
  } catch (err) {
    res.send("ERROR LOADING SIGNUP PAGE");
  }
}

async function create(req, res, next) {
  console.log("User Registered Successfully");
}

module.exports = {
  index,
  create,
};