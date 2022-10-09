// The raw stream information is held in Mongo here.

const mongoose = require('mongoose');

const PracticumSchema = new mongoose.Schema({
    segment: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'raw',
        enum: ['raw', 'analyzed']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    analysis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analysis',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Practicum", PracticumSchema, "practica");