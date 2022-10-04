// Create Analysis local obj

// Run utils to generate everything

// Create Analysis doc for Mongo

const Analysis = require("../models/Analysis");

module.exports = {
    getFillers: async (req, res) => {
        try {
            // create an analysis object
            const fillerWords = Analysis
            res.render("publicSpeech.ejs", 
            {
                user: req.user,
    
            })
        } catch (error) { console.log(error) }
      },
      createAnalysis: async (req, res) => {
        try {

        } catch (error) { console.log(error) }
      },
}
