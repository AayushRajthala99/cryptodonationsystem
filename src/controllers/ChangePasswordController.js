async function index(req, res) {
  try {
    res.render("../views/changepassword.ejs");
  } catch (err) {
    res.send("ERROR LOADING CHANGE PASSWORD PAGE");
  }
}

module.exports = {
  index
};