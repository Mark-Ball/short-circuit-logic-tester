function landing(req, res) {
    res.render('landing');
}

function quiz(req, res) {
    res.render('quiz');
}

module.exports = {
    landing,
    quiz
}