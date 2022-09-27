const express = require("express");
const router = express.Router();
const recordings = require("../controllers/record");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/fetchSesh", ensureAuth, recordings.loadSeshRecordings);
router.post("/saveTake", ensureAuth, recordings.createRecording);

module.exports = router;