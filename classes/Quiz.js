const Question = require('./Question');
const readlineSync = require('readline-sync');

class Quiz {
    constructor() {
        this.score = 0;
        this.questions = [];
        for (let i = 0; i < 10; i++) {
            this.questions.push(new Question());
        }
    }

    run() {
        for (let qstn of this.questions) {
            let response = readlineSync.question(qstn.ask());
            qstn.evaluateResponse(response);
        }
    }

}

module.exports = Quiz;