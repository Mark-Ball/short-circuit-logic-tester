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
    let quizData = { 
        score: 0,
        time: req.body.time,
        responses: req.body.responses,
        questions: [],
        answers: []
    };

    for (i in quiz1.questions) {
        quizData.questions.push(quiz1.questions[i].text);
        quizData.answers.push(quiz1.questions[i].correctAnswer);
        if (`"${quiz1.questions[i].correctAnswer}"` === `"${req.body.responses[i]}"`) {
            quizData.score += 1;
        }
    }
    console.log(quizData);
    res.redirect('report');
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