const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    practicum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Practicum"
    },
    fillersDetected: {
        type: Array
    },
    fillerWords: {
        type: Array
    },
    words: {
        type: Object
    }
});

module.exports = mongoose.model('Analysis', AnalysisSchema, 'analyses');