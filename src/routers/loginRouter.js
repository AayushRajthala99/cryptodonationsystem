const express = require("express");
const router = express.Router();

const {
  index,
  view
} = require("../controllers/LoginController");

const {
  linkSchemaLogin,
  validateLogin,
} = require('../middleware/login');


router.get("/", index);
router.post("/", validateLogin(linkSchemaLogin), view);

module.exports = router;