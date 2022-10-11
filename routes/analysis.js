// Create an analysis
const express = require('express');
const router = express.Router();
const Practicum = require('../models/Practicum');
//const script = require('../models/Script');
const analysisController = require('../models/Analysis');

const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureAuth, analysisController.getAnalysis);

router.post("/createAnalysis", ensureAuth, analysisController.createAnalysis);