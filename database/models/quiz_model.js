const mongoose = require('mongoose');
const QuizSchema = require('./../schemas/quiz_schema');

const QuizModel = mongoose.model('quiz', QuizSchema);

module.exports = QuizModel;