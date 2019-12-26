const Quiz = require('./../classes/Quiz');
const quiz1 = new Quiz();

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    // const { questions } = new Quiz();
    const { questions } = quiz1;
    res.render('quiz', { questions });
}

function leaderboard(req, res) {
    res.render('leaderboard');
}

function checkResponses(req, res) {
    console.log('checkResponses hit');
    let score = 0;
    for (i in quiz1.questions) {
        console.log(`"${quiz1.questions[i].correctAnswer}"`);
        if (`"${quiz1.questions[i].correctAnswer}"` === req.body[i]) {
            score += 1;
        }
    }
    console.log('Responses:');
    console.log(req.body);
    console.log(score);
    res.render('leaderboard');
}

module.exports = {
    landing,
    quiz,
    leaderboard,
    checkResponses
}