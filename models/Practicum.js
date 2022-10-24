// The raw stream information is held in Mongo here.

const mongoose = require('mongoose');

const PracticumSchema = new mongoose.Schema({
    data: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'raw',
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

module.exports = mongoose.model("Practicum", PracticumSchema, "practica");