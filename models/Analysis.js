const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // relevantFillers: {
    //     listFillerWords: ["like", 
    //     "maybe", 
    //     "think", 
    //     "might",
    //     "um",
    //     "uh",
    //     "could", 
    //     "well"]
    // },
    // words: {
    //     words: words},
    // fillersDected: {fillers: fillers},
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
});

module.exports = mongoose.model('Analysis', AnalysisSchema, 'analyses');