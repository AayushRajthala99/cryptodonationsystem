const express = require("express");
const router = express.Router();

const {
  index,
  update,
} = require("../controllers/ChangePasswordController");

const {
  linkSchemaUpdate,
  validateUpdate,
} = require('../middleware/changepassword');

router.get("/", index);
router.post("/", validateUpdate(linkSchemaUpdate), update);

module.exports = router;