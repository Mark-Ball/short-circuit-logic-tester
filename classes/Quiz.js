const Question = require('./Question');

class Quiz {
    constructor() {
        this.questions = [];
        for (let i = 0; i < 10; i++) {
            this.questions.push(new Question());
        }
    }
}

module.exports = Quiz;