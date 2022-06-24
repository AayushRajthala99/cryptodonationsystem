async function index(req, res) {
  try {
    res.render("../views/login");
  } catch (err) {
    res.send("ERROR LOADING LOGIN PAGE");
  }
}

module.exports = {
  index,
};
