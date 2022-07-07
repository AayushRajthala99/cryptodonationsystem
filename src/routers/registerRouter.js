const express = require("express");
const router = express.Router();

const {
    index,
    store,
} = require("../controllers/RegisterController");

const {
    linkSchemaStore,
    validateStore,
} = require('../middleware/register');

router.get("/", index);
// router.post("/", validateStore(linkSchemaStore), store);
router.post("/", store);

module.exports = router;