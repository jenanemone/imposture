const Analysis = require("../models/Analysis");


module.exports = {
    getSpeech: async (req, res) => {
        try {
            res.render("publicSpeech.ejs", { user: req.user, files: req.body.files });
            
        } catch (err) {
            console.log(err);
        }
        console.log("entered getspeech");
      },

}

