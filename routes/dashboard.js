const express = require("express");
const dashboard = require("../controllers/dashboard");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const practicaController = require("../controllers/practica");
const recordController = require("../controllers/record");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, dashboardController.getDashboard);

router.get("/publicSpeech", ensureAuth, dashboardController.getPublicSpeech);

//router.get("/publicSpeech/recordings", ensureAuth, recordController.loadSeshRecordings);
//router.post("/publicSpeech/createRecording", ensureAuth, recordController.createRecording);

router.get("/pastPractica", ensureAuth, dashboardController.getPastPractica);


module.exports = router;