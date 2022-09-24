// Create Practicum

// Insert into Mongo

// Reroute to analysis

const Practicum = require('../models/Practicum');
//const script = require('../models/Script');
//const Analysis = require('../models/Analysis');

module.exports = {
    getPractica: async (req, res) => {
        try {
            const practica = await Practicum.find().sort({ createdAt: "desc" }).lean();
            res.render("promptCentral.ejs", { practica: practica});
          } catch (err) {
            console.log(err);
          }
    },
    createPractice: async (req, res) => {
        try {
            await Practicum.create( {
                // stuff goes in here
                user: req.user.id,
                fileRef: req.body.fileRef,
                status: 'raw',
            })
            console.log("practice has been stored in Mongo");
            res.redirect('/publicSpeech');
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
    },
    addTitle: async (req, res) => {
        try {
          await Practicum.findOneAndUpdate(
            { _id: req.params.id },
            {
              $inc: { title: req.body.fileTitle },
            }
          );
          console.log(`title added: ${req.body.fileTitle}`);
          res.redirect(`/analysis`);
        } catch (err) {
          console.log(err);
        }
      },
}