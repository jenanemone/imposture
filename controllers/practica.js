// Reroute to analysis
const Practicum = require('../models/Practicum');
//const script = require('../models/Script');
//const Analysis = require('../models/Analysis');

module.exports = {
    getPractica: async (req, res) => {
        try {
            const practica = await Practicum.find({ user: req.user.id }).lean();
          let speech = {}
          for (let i = 0; i < practica.length; i++){
            let s = practica[i].data.words,
                id = practica[i]._id,
                // status = practica[i].status,
                allWords = []
                //speech.status = status;
              for (let j = 0; j < s.length; j++){
                allWords.push(s[j].value)
              }
              allWords = allWords.join(' ')
              speech[id] = allWords
          }

            res.render("practica.ejs", { speech: speech, user: req.user.id });
          } catch (err) {
            console.log(err);
          }
    },
    
    createPracticum: async (req, res) => {
      console.log('createPracticum reached', req.body)
        try {
            await Practicum.create( {
                // stuff goes in here
                user: req.user.id,
                data: req.body,
            })
            console.log("practice has been stored in Mongo");
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
        }
    },
    deletePracticum: async (req, res) => {
        try {
            const practicum = await Practicum.findById( { _id: req.params.key } );
            console.log(practicum, "This is the practicum console log")
            await Practicum.remove( { _id: req.params.key } );
            res.redirect('/practica');
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