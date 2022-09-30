const express = require("express");
//const home = require("../controllers/home");
const router = express.Router();
const homeController = require("../controllers/home");
const practicaController = require("../controllers/practica");

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, homeController.getHome);

router.get("/publicSpeech", ensureAuth, homeController.getPublicSpeech);

router.get("/pastPractica", ensureAuth, homeController.getPastPractica);


module.exports = router;