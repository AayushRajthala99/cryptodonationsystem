const express = require("express");
const router = express.Router();

const {
  index
} = require("../controllers/ChangePasswordController");

router.get("/", index);

module.exports = router;