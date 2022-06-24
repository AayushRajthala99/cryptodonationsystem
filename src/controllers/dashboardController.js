async function index(req, res, next) {
  try {
    res.render("dashboard/index");
  } catch (err) {
    res.send("ERROR LOADING PAGE");
  }
}

module.exports = {
  index,
};
