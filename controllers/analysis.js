// Create Analysis local obj

// Run utils to generate everything

// Create Analysis doc for Mongo

const Analysis = require("../models/Analysis");

module.exports = {
    getFillers: async (req, res) => {
        try {
            // grab those fillers
            const fillerWords = Analysis
            res.render("publicSpeech.ejs", 
            {
                user: req.user,
    
            })
        } catch (error) { console.log(error) }
      },
      createAnalysis: async (req, res) => {
        try {
            await Analysis.create({
                words: words,
                user: req.user.id,
                relevantFillers: identifiedFillers,
                fillersDetected: fillers,
            })
        } catch (error) { console.log(error) }
      },
}
