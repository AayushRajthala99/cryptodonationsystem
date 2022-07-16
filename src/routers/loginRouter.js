const express = require("express");
const router = express.Router();

const {
  index,
  view
} = require("../controllers/LoginController");

const {
  linkSchemaStore,
  validateStore,
} = require('../middleware/login');


router.get("/", index);
router.post("/",validateStore(linkSchemaStore), view);

module.exports = router; 