// Fetches the index, aka the landing page

//const { ensureGuest } = require("../middleware/auth");


module.exports = {
    getIndex: (req, res) => {
        if (req.user) {
            res.redirect("/login");
        }
        else {
            res.render("index.ejs")
        }
    } 
}