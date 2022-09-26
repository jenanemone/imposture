const express = require("express");
const dashboard = require("../controllers/dashboard");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const practicaController = require("../controllers/practica");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, dashboardController.getDashboard)

router.get("/publicSpeech", ensureAuth, dashboardController.getPublicSpeech)

router.get("/recordings", ensureAuth, )

router.get("/pastPractica", ensureAuth, dashboardController.getPastPractica)

module.exports = router;