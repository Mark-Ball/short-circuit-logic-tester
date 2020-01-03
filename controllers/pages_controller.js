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

    quizTime = 0;
    const { questions } = quiz1;
    res.render('quiz', { questions, quiz1 });
}

function checkResponses(req, res) {
    console.log(req.body.quiz);
    // console.log(Object.keys(req.body.quiz));
    // console.log(req.body.quiz['0']);
    quizScore = 0;
    const { time, responses } = JSON.parse(req.body.data);
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

async function recordScore(req, res) {
    const name = req.body.name === '' ? 'Unknown' : req.body.name;
    await ScorerModel.create({
        name: name,
        score: quizScore,
        time: quizTime
    });
    res.redirect('/leaderboard');
}

async function leaderboard(req, res) {
    let scores = await ScorerModel.find();
    scores.sort((a, b) => {
        if (a.score === b.score) {
            return a.time - b.time
        }
        return b.score - a.score
    });
    const top10 = scores.slice(0, 10);
    res.render('leaderboard', { top10 });
}

module.exports = {
    landing,
    quiz,
    checkResponses,
    recordScore,
    leaderboard
}