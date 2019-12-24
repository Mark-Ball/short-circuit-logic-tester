console.log('test script ran');

const Quiz = require('./../classes/Quiz');
const quiz1 = new Quiz();

let timeSinceLoad = 0;
const timer = document.getElementById('timer');
setInterval(() => {
    timeSinceLoad += 1;
    timer.innerHTML = timeSinceLoad
}, 1000);

let questionCounter = 0;

document.querySelector('input[type=submit]').addEventListener("click", () => {
    event.preventDefault();
    document.querySelector('input[type=text]').value = '';
    questionCounter += 1;
    updateQuestion(quiz1.questions[questionCounter]);
    console.log('input clicked');
})

function updateQuestion(text) {
    document.getElementById('question').innerHTML = text;
}