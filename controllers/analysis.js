// Run utils to generate everything

// Create Analysis doc for Mongo

const Analysis = require("../models/Analysis");

module.exports = {
    // getPractica: async (req, res) => {
    //     try {
    //         const practica = await Practicum.find({ user: req.user.id }).lean();
    //       let speech = {}
    //       for (let i = 0; i < practica.length; i++){
    //         let s = practica[i].data.words,
    //             id = practica[i]._id,
    //             status = practica[i].status,
    //             allWords = []
    //           for (let j = 0; j < s.length; j++){
    //             allWords.push(s[j].value)
    //           }
    //           allWords = allWords.join(' ')
    //           speech[id] = allWords
    //       }

    //         res.render("practica.ejs", { speech: speech, user: req.user.id });
    //       } catch (err) {
    //         console.log(err);
    //       }
    // },
    
    createAnalysis: async (req, res) => {
      console.log('createAnalysis reached', req.body)
      
      fillers = ['ABSOLUTELY', 'ACTUAL', 'ACTUALLY', 'ALMOST', 'ALRIGHT', 'AMAZING', 'ANYHOW', 'ANYWAY', 'APPARENTLY', 'APPROXIMATELY', 'ASSUMING', 'BASICALLY', 'BELIEVE', 'CERTAINLY', 'CLEARLY', 'COULD', 'DEARLY', 'EASILY', 'EFFECTIVELY', 'ENTIRELY', 'ER', 'ESPECIALLY', 'ESSENTIALLY', 'EXACTLY', 'EXTREMELY', 'FACTUALLY', 'FAIRLY', 'FRANKLY', 'FULLY', 'GET', 'GUESS', 'HARDLY', 'HIGHLY', 'HMM', 'HOPE', 'HOPEFULLY', 'JUST', 'KINDA', 'KNOW', 'LIKE', 'MAINLY', 'MAYBE', 'MEAN', 'MEAN', 'MIGHT', 'MOSTLY', 'NEARLY', 'OBVIOUSLY', 'OKAY', 'PARTICULARLY', 'POSSIBLY', 'PRIMARILY', 'PROBABLE', 'PROBABLY', 'QUITE', 'REAL', 'REALLY', 'RELATIVELY', 'RIGHT', 'SEE', 'SEEM', 'SERIOUSLY', 'SHOULD', 'SIMPLY', 'SLIGHTLY', 'SO', "SOME", 'SOMETHING', 'SOMEWHAT', 'SORRY', 'SORTA', 'STUFF', 'SURE', 'SURELY', 'THINGS', 'THINK', 'TOTALLY', 'TRY', 'UH', 'UM', 'VERY', 'VIRTUALLY', 'WELL', 'WHATEVER', 'WHENEVER', 'WHOEVER', 'WIDELY']

        try {
            const practice = await practica.findById( { _id: req.body.key }).lean();
            console.log(practice)
            console.log(practice.status)
            // grab full words
            let wordsObj = practice.data.words;
            let allWords = [];
            let detectedFillers = [];
            for (let obj of wordsObj) {
                let word = obj.value.toLowerCase();
                allWords.push(word);
                if (word in fillers) {
                    detectedFillers.push(word.toUpperCase());
                }
            }

            const status = "analyzed";

            const id = practice._id
            const analysis = await Analysis.create( {
                // stuff goes in here
                practicum: req.body.id,
                data: req.body,
            })
            console.log("analysis has been stored in Mongo");
            res.sendStatus(200);
        } catch (err) {
            console.log(err);
        }
    },
    deleteAnalysis: async (req, res) => {
        try {
            const analysis = await Analysis.findById( { _id: req.params.key } );
            console.log(analysis, "This is the practicum console log")
            await Analysis.remove( { _id: req.params.key } );
            res.redirect('/practica');
        } catch (err) {
            console.log('no deletay for you')
        }
    },
}
