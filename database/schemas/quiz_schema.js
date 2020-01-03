const { Schema } = require('mongoose');

const QuizSchema = new Schema({
    quiz: {
        type: Object,
        required: true
    }
})

module.exports = QuizSchema;