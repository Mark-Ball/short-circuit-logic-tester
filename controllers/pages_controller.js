const Quiz = require('./../classes/Quiz');

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    const { questions } = new Quiz();
    res.render('quiz', { questions });
}

module.exports = {
    landing,
    quiz
}