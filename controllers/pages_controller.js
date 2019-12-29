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
    const { time, responses } = JSON.parse(req.body.data[0]);
    let quizResponse = {
        score: 0,
        time: time,
        questions: []
    };

    for (i in quiz1.questions) {
        let questionData = {};
        questionData.text = quiz1.questions[i].text;
        questionData.answer = quiz1.questions[i].correctAnswer;
        questionData.response = responses[i];
        quizResponse.questions.push(questionData);

        if (`"${quiz1.questions[i].correctAnswer}"` === `"${responses[i]}"`) {
            quizResponse.score += 1;
        }       
    }

    res.render('report', { quizResponse });
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