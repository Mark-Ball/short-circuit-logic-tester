const Quiz = require('./../classes/Quiz');
const ScorerModel = require('./../database/models/scorer_model');
let quiz1;
let quizScore;
let quizTime;

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    quiz1 = new Quiz();
    quizScore = 0;
    quizTime = 0;
    const { questions } = quiz1;
    res.render('quiz', { questions });
}

function checkResponses(req, res) {
    const { time, responses } = JSON.parse(req.body.data[0]);
    quizTime = time;
    let quizResponse = {
        score: 0,
        time: time,
        questions: []
    };

    for (i in quiz1.questions) {
        let questionData = {};
        questionData.text = quiz1.questions[i].text;
        questionData.answer = `${quiz1.questions[i].correctAnswer}`;
        if (questionData.answer === '') {
            questionData.answer = '""';
        }
        questionData.response = responses[i];
        quizResponse.questions.push(questionData);

        if (`"${quiz1.questions[i].correctAnswer}"` === `"${responses[i]}"`) {
            quizResponse.score += 1;
            quizScore += 1;
        }
    }
    res.render('report', { quizResponse });
}

function report(req, res) {
    res.render('report');
}

async function recordScore(req, res) {
    await ScorerModel.create({
        name: req.body.name,
        score: quizScore,
        time: quizTime
    });
    res.redirect('/leaderboard');
}

function leaderboard(req, res) {
    res.render('leaderboard');
}

module.exports = {
    landing,
    quiz,
    checkResponses,
    report,
    recordScore,
    leaderboard
}