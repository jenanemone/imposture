
const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysis"); // need this later for straight to dvd version
const practicaController = require("../controllers/practica"); 

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, practicaController.getPractica);
router.post('/createPracticum', ensureAuth, practicaController.createPracticum);
router.delete('/deletePracticum/:key', practicaController.deletePracticum);

module.exports = router;