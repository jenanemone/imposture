
const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysis"); // need this later for straight to dvd version
const practicaController = require("../controllers/practica"); // need this later for straight to dvd version

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, practicaController.getPractica);

module.exports = router;