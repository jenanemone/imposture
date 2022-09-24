// Record a session

// Create Practicum

// Once Practicum is created....
// => Link to single practice analysis page
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const practicaController = require("../controllers/practica");
const analysisController = require("../controllers/analysis");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//router.get("/publicSpeech", ensureAuth, (practicaController.getPractica) )
//router.post()
