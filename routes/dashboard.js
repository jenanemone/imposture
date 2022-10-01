const express = require("express");
const dashboard = require("../controllers/dashboard");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");
const practicaController = require("../controllers/practica");
const speechController = require("../controllers/speech");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, dashboardController.getDashboard);

//router.get("/speech", ensureAuth, speechController.getSpeech);

router.get("/pastPractica", ensureAuth, dashboardController.getPastPractica);


module.exports = router;