async function index(req, res, next) {
  try {
    res.render('dashboard/index');
  } catch (err) {
    res.render('error', {
      error: "ERROR LOADING DASHBOARD"
    });
  }
}

module.exports = {
  index
};