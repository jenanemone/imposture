const express = require("express");
const router = express.Router();

const speechController = require("../controllers/speech");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, speechController.getSpeech);

module.exports = router;