// Show dashboard

// Reroute to publicSpeech

// Reroute to analysis


const Practicum = require('../models/Practicum');
const practica = require('./practica');
//const script = require('../models/Script');
//const Analysis = require('../models/Analysis');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

module.exports = {
    getDashboard: async (req, res) => {
        try {
            res.render("dashboard.ejs", { user: req.user });
        }
        catch (err) {
        console.log(err);
    }
    console.log("entered dashboard");
  },
  getPublicSpeech: async (req, res) => {
    try {
        res.render("publicSpeech.ejs", { user: req.user });
        
    } catch (err) {
        console.log(err);
    }
    console.log("entered getPublicSpeech");
  },
  getPastPractica: async (req, res) => {
    try {
        res.render("pastPractica.ejs", { practica: practica, user: req.user })
    } catch (err) {
        console.log(err);
    }
  },
}