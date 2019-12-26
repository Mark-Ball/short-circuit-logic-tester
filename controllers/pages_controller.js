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
    let score = 0;
    console.log(req.body);
    for (i in quiz1.questions) {
        console.log(`Answer: "${quiz1.questions[i].correctAnswer}"`);
        console.log(`Response: "${req.body.responses[i]}"`);
        console.log(`"${quiz1.questions[i].correctAnswer}"` === `"${req.body.responses[i]}"`);
        if (`"${quiz1.questions[i].correctAnswer}"` === `"${req.body.responses[i]}"`) {
            score += 1;
        }
    }
    console.log(score);
    res.render('report');
}

function report(req, res) {
    res.render('report');
}

module.exports = {
    landing,
    quiz,
    leaderboard,
    checkResponses,
    report
}