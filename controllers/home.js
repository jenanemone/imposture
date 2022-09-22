// Fetches the index, aka the landing page


module.exports = {
    getIndex: (req, res) => {
        res.render("index.hbs");
    }
}