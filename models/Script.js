// If a practicum requires a script, this will be available. Otherwise it will populate after the practice has been initiated.

const mongoose = require('mongoose')

const PracticumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    tableau: {
        type: String,
        default: 'publicSpeaking',
        enum: ['publicSpeaking', 'heartToHeart', 'audition', 'interview']
    },
    results: {
        type: Object
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Practicum', PracticumSchema, 'practicii')