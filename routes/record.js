const express = require("express");
const router = express.Router();
const recordings = require("../controllers/record");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/recordings", ensureAuth, recordings.loadSeshRecordings);
router.post("/", ensureAuth, recordings.createRecording);

module.exports = router;