const Quiz = require('./../classes/Quiz');

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    const quiz1 = new Quiz();
    // console.log(quiz1.questions[0].ask());
    res.render('quiz', { quiz1 });
}

module.exports = {
    landing,
    quiz
}