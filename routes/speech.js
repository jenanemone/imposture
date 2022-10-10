// // Once a series of recordings is made into a session

// // Create Practicum for each session

// // Once Practicum is created....

// // Add option to analyze, which will
// // => Link to single practice analysis page (depending on user's click)

const express = require("express");
const router = express.Router();
const speechController = require("../controllers/speech");
const practicaController = require("../controllers/practica");
const analysisController = require("../controllers/analysis"); // need this later for straight to dvd version
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, speechController.getSpeech);

// router.post("/createPractica", ensureAuth, practicaController.createPractica)

module.exports = router;
