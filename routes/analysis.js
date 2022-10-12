// Create an analysis
const express = require('express');
const router = express.Router();
const analysisController = require("../controllers/analysis");


const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, analysisController.getAnalysis);

router.post("/createAnalysis:id", ensureAuth, analysisController.createAnalysis);