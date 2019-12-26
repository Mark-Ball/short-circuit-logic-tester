let timeSinceLoad = 0;
const timer = document.getElementById('timer');
setInterval(() => {
    timeSinceLoad += 1;
    timer.innerHTML = timeSinceLoad
}, 1000);

let responses = [];

let questionCounter = 0;
toggleHide(questionCounter);

document.querySelector('input[type=submit]').addEventListener("click", () => {
    event.preventDefault();

    saveResponse();
    if (questionCounter >= 9) {
        sendResponses()
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
    console.log(responses);
    document.querySelector('input[type=text]').value = '';
}

function sendResponses() {
    axios.post('/quiz', responses);
}