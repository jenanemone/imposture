// Create Practicum

// Insert into Mongo

// Reroute to analysis


const Practicum = require('../models/Practicum');
//const script = require('../models/Script');
const Analysis = require('../models/Analysis');

module.exports = {
    getPractica: async (req, res) => {
        try {
            const practica = await Practicum.find().sort({ createdAt: "desc" }).lean();
            res.render("promptCentral.ejs", { posts: posts });
          } catch (err) {
            console.log(err);
          }
    },
    createPractice: async (req, res) => {
        try {
            await Practicum.create( {
                // stuff goes in here
                user: req.body.user
            })
        } catch (err) {
            console.log(err);
        }
    },
    deletePractice: async (req, res) => {
        try {
            const practicum = await Practicum.findById( { _id: req.params.id } );
            await Practicum.remove( { _id: req.params.id } );
            console.log('deleted practice')

            res.redirect('/promptCentral');
        } catch (err) {
            console.log('no deletay for you')
        }
    }
}