// Fetches the index, aka the landing page

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