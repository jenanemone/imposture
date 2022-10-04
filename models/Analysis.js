const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fillers: {
        fillerWords: ["like", 
        "maybe", 
        "think", 
        "might",
        "um",
        "uh",
        "could", 
        "well"]
    },
    words: {
        words: []
    },
});

module.exports = mongoose.model('Analysis', AnalysisSchema, 'analyses');