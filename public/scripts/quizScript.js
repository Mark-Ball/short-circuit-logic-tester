let timeSinceLoad = 0;
const timer = document.getElementById('timer');
setInterval(() => {
    timeSinceLoad += 1;
    timer.innerHTML = timeSinceLoad
}, 1000);

let questionCounter = 0;
toggleHide(questionCounter);

document.querySelector('input[type=submit]').addEventListener("click", () => {
    event.preventDefault();
    document.querySelector('input[type=text]').value = '';
    toggleHide(questionCounter);
    questionCounter += 1;
    toggleHide(questionCounter);
    console.log('input clicked');
})

function toggleHide(n) {
    document.querySelector(`#question${n}`).classList.toggle('hidden');
}