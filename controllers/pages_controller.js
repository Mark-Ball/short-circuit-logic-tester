const Quiz = require('./../classes/Quiz');
const quiz1 = new Quiz();

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    const { questions } = quiz1;
    res.render('quiz', { questions });
}

function leaderboard(req, res) {
    res.render('leaderboard');
}

function checkResponses(req, res) {
    console.log('checkResponses hit');
    console.log(req.body.responses);
    let quizResponse = { 
        score: 0,
        time: req.body.time,
        responses: req.body.responses,
        questions: [],
        answers: [],
        redirectUrl: '/report'
    };

    for (i in quiz1.questions) {
        quizResponse.questions.push(quiz1.questions[i].text);
        quizResponse.answers.push(quiz1.questions[i].correctAnswer);
        if (`"${quiz1.questions[i].correctAnswer}"` === `"${req.body.responses[i]}"`) {
            quizResponse.score += 1;
        }
    }
    res.send({ quizResponse });
}

function report(req, res) {
    res.render('report');
}

module.exports = {
    landing,
    quiz,
    leaderboard,
    checkResponses,
    report,
    test
}