const Quiz = require('./../classes/Quiz');
let quiz1;

function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    quiz1 = new Quiz();
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
        questionData.answer = `${quiz1.questions[i].correctAnswer}`;
        if (questionData.answer === '') {
            questionData.answer = '""';
        }
        questionData.response = responses[i];
        quizResponse.questions.push(questionData);

        if (`"${quiz1.questions[i].correctAnswer}"` === `"${responses[i]}"`) {
            quizResponse.score += 1;
        }       
    }
    console.log(quizResponse);
    console.log(quiz1.questions);

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