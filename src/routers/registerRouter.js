const express = require("express");
const router = express.Router();

const {
    index,
    store,
} = require("../controllers/RegisterController");

const {
    schemaValidation
} = require('../middleware/register');

router.get("/", index);
router.post("/", schemaValidation, store);
// router.post("/", store);

module.exports = router;