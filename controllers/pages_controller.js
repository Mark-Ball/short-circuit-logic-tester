const Quiz = require('./../classes/Quiz');
const ScorerModel = require('./../database/models/scorer_model');
const QuizModel = require('./../database/models/quiz_model');

function landing(req, res) {
    res.render('landing');
}

async function quiz(req, res) {
    quiz1 = new Quiz();
    const { questions } = quiz1;
    const { _id: quizId } = await QuizModel.create({
        quiz: quiz1
    });

    res.render('quiz', { questions, quizId });
}

async function checkResponses(req, res) {
    // find the correct quiz from the database
    const quiz1 = await QuizModel.findById(req.body.quizId);
    const questions = quiz1.quiz.questions;

    // find the time the player took and the responses they gave
    const { time, responses } = JSON.parse(req.body.data);

    //initialise the quizResponse object, which will be sent to the report page
    let quizResponse = {
        score: 0,
        time: time,
        questions: []
    };

    // iterate through all questions, add text, answers, and response to the questionData object
    for (i in questions) {
        let questionData = {};
        questionData.text = questions[i].text;
        questionData.answer = `${questions[i].correctAnswer}`;
        if (questionData.answer === '') {
            questionData.answer = '""';
        }
        questionData.response = responses[i];

        // push questionData object onto array inside quizResponse
        quizResponse.questions.push(questionData);

        // score the responses provided
        if (`"${questions[i].correctAnswer}"` === `"${responses[i]}"`) {
            quizResponse.score += 1;
        }
    }

    // write score and time to the database
    // name will be added in an update
    const { _id: scorerId } = await ScorerModel.create({
        name: 'Placeholder',
        score: quizResponse.score,
        time: quizResponse.time
    });

    res.render('report', { quizResponse, scorerId });
}

// since the score and time were recorded in the previous method
// this method only updates the name
async function recordScore(req, res) {
    const name = req.body.name === '' ? 'Unknown' : req.body.name;
    await ScorerModel.findByIdAndUpdate(req.body.scorerId, {
        name: name
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