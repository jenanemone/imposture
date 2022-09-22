// Create Practicum

// Insert into Mongo

// Reroute to analysis


const practice = require('../models/Practicum');
const script = require('../models/Script');
const vault = require('../models/Vault');

module.exports = {
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

            res.redirect('/dashboard');
        } catch (err) {
            console.log('no deletay for you')
        }
    }
}