const express = require("express");
const { getNumbers } = require("../controllers/numberController");

const router = express.Router();

router.get("/", getNumbers);

module.exports = router;
