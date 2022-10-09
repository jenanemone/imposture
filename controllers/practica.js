// Create Practicum

// Insert into Mongo

// Reroute to analysis
const Practicum = require('../models/Practicum');
//const script = require('../models/Script');
//const Analysis = require('../models/Analysis');

module.exports = {
    getPractica: async (req, res) => {
        try {
            const practica = await Practicum.find({ user: req.user.id }).lean();
            res.render("practica.ejs", { practica: practica, user: req. user });
          } catch (err) {
            console.log(err);
          }
    },
    
    createPracticum: async (req, res) => {
        try {
            await Practicum.create( {
                // stuff goes in here
                user: req.user.id,
                file: req.body.file,
            })
            console.log("practice has been stored in Mongo");
            res.redirect('/speech');
        } catch (err) {
            console.log(err);
        }
    },
    deletePracticum: async (req, res) => {
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
      createPractica: async (req, res) => {
        try {
          await req.body.allSegments.forEach((e,i) => {
              e = Practicum.create( {
              // stuff goes in here
              user: req.user.id,
              segment: req.body.allSegments[i],
          })
          console.log("practice has been stored in Mongo");
          })
            
            res.redirect('/speech');
        } catch (err) {
            console.log(err);
        }
    },
}