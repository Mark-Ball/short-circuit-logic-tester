const { Schema } = require('mongoose');

const ScorersSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }

});

module.exports = ScorersSchema;