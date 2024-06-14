let currentQuiz = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const option1 = document.getElementById('option-1');
const option2 = document.getElementById('option-2');
const option3 = document.getElementById('option-3');
const option4 = document.getElementById('option-4');
const submitBtn = document.getElementById('submit');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');

// Load the current quiz question
function loadQuiz() {
    clearInterval(timer);
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    option1.innerText = currentQuizData.a;
    option2.innerText = currentQuizData.b;
    option3.innerText = currentQuizData.c;
    option4.innerText = currentQuizData.d;

    // Reset and start the timer
    timeLeft = 10;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(updateTimer, 1000);
}

// Deselect previously selected answers
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Get the selected answer
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Update the timer every second
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(timer);
        // Move to the next question automatically if time runs out
        submitAnswer();
    }
}

// Submit answer and proceed to next question or end quiz
function submitAnswer() {
    const answer = getSelected();

    if (answer === quizData[currentQuiz].correct) {
        score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        // Show results with a centered reload button
        document.getElementById('quiz').innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
            <div class="btn-container">
                <button id="reload" onclick="location.reload()">Reload</button>
            </div>
        `;

        // Apply inline CSS styles to the reload button
        const reloadBtn = document.getElementById('reload');
        reloadBtn.style.backgroundColor = 'blueviolet';
        reloadBtn.style.color = 'white';
        reloadBtn.style.padding = '10px 20px';
        reloadBtn.style.fontSize = '1.5rem';
        reloadBtn.style.border = 'none';
        reloadBtn.style.borderRadius = '50px';
        reloadBtn.style.cursor = 'pointer';
        reloadBtn.style.marginTop = '20px';

        // Apply flexbox centering to the button container
        const btnContainer = document.querySelector('.btn-container');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.marginTop = '20px';
    }

    // Update score display
    scoreDisplay.innerText = `Score: ${score}`;
}

// Load the first question
loadQuiz();

// Event listener for the submit button
submitBtn.addEventListener('click', () => {
    clearInterval(timer);
    submitAnswer();
});
