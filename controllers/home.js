// Fetches the index, aka the landing page

const { ensureGuest } = require("../middleware/auth");


module.exports = {
    getIndex: (req, res) => {
        res.render("index", {
            layout: 'main'
        })
    }
}