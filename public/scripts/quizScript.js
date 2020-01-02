let timeSinceLoad = 0;
const timer = document.getElementById('timer');
setInterval(() => {
    timeSinceLoad += 0.01;
    timer.innerHTML = timeSinceLoad.toFixed(0);
}, 10);

let responses = [];

let questionCounter = 0;
toggleHide(questionCounter);

document.querySelector('input[type=submit]').addEventListener("click", () => {
    event.preventDefault();

    saveResponse();
    if (questionCounter >= 9) {
        document.querySelector('#data').value = JSON.stringify({ time: timeSinceLoad.toFixed(2), responses: responses });
        document.querySelector('#dataForm').submit();
        document.querySelector('#leaderboard-form').classList.toggle('hidden');
        document.querySelector('#loading').classList.toggle('hidden');
    }
    document.querySelector('input[type=text]').value = '';
    toggleHide(questionCounter);
    questionCounter += 1;
    toggleHide(questionCounter);
})

function toggleHide(n) {
    if (n < 10) {
        document.querySelector(`#question${n}`).classList.toggle('hidden');
    }
}

function saveResponse() {
    responses.push(document.querySelector('input[type=text]').value);
    document.querySelector('input[type=text]').value = '';
}